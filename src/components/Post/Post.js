import React, { useEffect, useState } from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';
import firebase from 'firebase';

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import NearMeOutlinedIcon from "@material-ui/icons/NearMeOutlined";
import TurnedInNotOutlinedIcon from "@material-ui/icons/TurnedInNotOutlined";

import { db } from '../../shared/firebase';
import { useStateValue } from '../../context/StateProvider';

const Post = ({ username, caption, imageUrl, postId }) => {

    const [comments, setComments] = useState([]); // For comments on each post
    const [comment, setComment] = useState(''); // For each individual comment

    const [{ user }, dispatch] = useStateValue();

    // Fetches comments of a specific post by id and sets the state to the comments accordingly
    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db
                .collection('posts')
                .doc(postId)
                .collection('comments')
                .orderBy('timestamp', 'desc')
                .onSnapshot(snapshot => {
                    setComments(snapshot.docs.map(doc => doc.data()));
                });
        }

        return () => { unsubscribe() }
    }, [postId]);

    // Posts a comment on a post
    const postComment = e => {
        e.preventDefault();
        if (user) { // Only post comment if user is authenticated
            db.collection('posts')
                .doc(postId)
                .collection('comments')
                .add({
                    text: comment,
                    username: user.displayName,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                })
            setComment('');
        }
    }

    return (
        <div className="post">
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt={username}
                    src="/static/images/avatar/1.jpg"
                />
                <h3>{username}</h3>
            </div>

            {/* The actual image of the post */}
            <img className="post__image" src={imageUrl} alt="" />

            {/* The like, comment,send and save button */}
            <div className="post__likes">
                <FavoriteBorderIcon className="post__likesItem" />
                <ModeCommentOutlinedIcon className="post__likesItem" />
                <NearMeOutlinedIcon className="post__likesItem" />
                <TurnedInNotOutlinedIcon className="post__likesItemSave" />
            </div>

            {/* The username and caption */}
            {caption && (<h4 className="post__text"><strong>{username}:</strong> {caption}</h4>)}

            {/* Already existing comments(if any) displayed */}
            <div className="post__comments">
                {comments.map(comment => (
                    // Reusing the post header styling to obtain a nice looking avatar beside each comment
                    <div className="post__header">
                        <Avatar
                            className="post__avatar"
                            alt={comment.username}
                            src="/static/images/avatar/1.jpg"
                        />
                        <strong>{comment.username}</strong> <span style={{ marginLeft: '5px' }}>{comment.text}</span>
                    </div>
                ))}
            </div>

            {/* Comment Box. User can comment here. Display only if user is authenticated */}
            {user && (
                <form className="post__commentBox">
                    <input
                        disabled={!user}
                        className='post__input'
                        type="text"
                        placeholder="Add a comment"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                    />
                    <button
                        disabled={!comment}
                        className="post__button"
                        type="submit"
                        onClick={postComment}
                    >
                        Post
                </button>
                </form>
            )}
        </div>
    )
}

export default Post
