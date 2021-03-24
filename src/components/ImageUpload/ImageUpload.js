import { Button, makeStyles, Avatar } from '@material-ui/core';
import React, { createRef, useState } from 'react';
import firebase from "firebase";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

import './ImageUpload.css';
import { db, storage } from '../../shared/firebase';
import { useStateValue } from '../../context/StateProvider';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },

    large: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    },

}));

const ImageUpload = (props) => {

    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);

    const [{ user }, dispatch] = useStateValue(); // State obtained via Context API

    // Runs when a file is selected
    const onChangeHandler = e => {
        const file = e.target.files[0];

        if (file) {
            const fileType = file["type"];
            const validImageTypes = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png'];

            if (validImageTypes.includes(fileType)) { // Valid only if an image is selected
                setError('');
                setImage(file);
            } else {
                console.log('Error: Please upload an image');
            }
        }
    }

    const onUploadHandler = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        if (image) {
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // progress function ...
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(progress);
                },
                (error) => {
                    // error function ...
                    console.log(error.message);
                    setError(error.message);
                },
                () => {
                    // complete function ...
                    storage
                        .ref("images")
                        .child(image.name)
                        .getDownloadURL()
                        .then(url => {
                            // post image inside db
                            db.collection('posts').add({
                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                caption: caption,
                                imageUrl: url,
                                username: user.displayName
                            });
                            setProgress(0);
                            setCaption('');
                            setImage(null);
                        })
                }
            )
        } else {
            setError('Error: Please Select an image');
        }
    }

    const classes = useStyles();
    const fileInputRef = createRef(); // Used since we don't want the default file picker, so a ref is created.

    return (
        <div className="imageUpload">
            <div className="imageUpload__top">
                <Avatar
                    alt={user?.displayName}
                    src="/images/randomImageName.png"
                    className={classes.large}
                />
                <textarea
                    cols="4"
                    rows="1"
                    placeholder="What's on your mind?"
                    value={caption}
                    onChange={event => setCaption(event.target.value)}
                    className="imageUpload__caption"
                ></textarea>
            </div>
            <div className="imageUpload__content">

                {/* Selects the below mentioned file picker input via ref */}
                <Button
                    onClick={() => fileInputRef.current.click()}
                    startIcon={<AddAPhotoIcon />}
                    className={classes.button}
                    color="primary"
                    variant="contained"
                >
                    Upload Photo
                </Button>

                <input type="file" onChange={onChangeHandler} hidden ref={fileInputRef} />


                <Button
                    variant="contained"
                    onClick={onUploadHandler}
                    color="secondary"
                    className={classes.button}
                    disabled={!image}
                >
                    Create Post
                </Button>
            </div>

            <br />

            {/* Error message displayed, if any */}
            {error && (
                <p style={{ color: 'red' }}>{error}</p>
            )}

            {/* Show Progress Bar only if progress > 0 */}
            {(progress > 0) && (
                <center>
                    <progress value={progress} className="imageUpload__progress" max="100" />
                </center>
            )}
        </div>
    )
}

export default ImageUpload
