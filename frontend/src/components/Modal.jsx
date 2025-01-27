import React from 'react';

const Modal = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h2>¡Error!</h2>
                <p>{message}</p>
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
};

export default Modal;
