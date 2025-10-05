import React from "react";
import { FaArrowUp, FaWhatsapp, FaFacebook } from "react-icons/fa";

export default function ButtomTop() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
        }}>
            <button
                onClick={scrollToTop}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: '#EF4444',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    fontSize: '20px'
                }}
            >
                <FaArrowUp />
            </button>
        </div>
    );
}