import { makeStyles, Modal } from '@material-ui/core';
import React, { useState } from 'react';
import './Modal.css';

//  Modal Styling Begins
function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
})); // Modal Styling Ends

const ModalComponent = ({ openModal, closeModal, children }) => {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);

    return (
        <Modal
            open={openModal}
            onClose={closeModal}
        >
            <div style={modalStyle} className={classes.paper}>
                <form className="modal__signUp">
                    <center>
                        <img
                            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                            alt=""
                            className="modal__headerImage"
                        />
                    </center>
                    {children}
                </form>
            </div>
        </Modal>
    )
}

export default ModalComponent
