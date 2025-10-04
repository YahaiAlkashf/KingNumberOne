import React from "react";
import { FaArrowUp, FaWhatsapp, FaFacebook } from "react-icons/fa";

export default function FloatingButtons() {
    const scrollToTop = () => {
        document.body.scrollTop = 0;
    };

    return (
        <div style={{
            position: 'fixed',
            bottom: '50px',
            right: '30px',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
        }}>
            <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: '#25D366',
                    color: 'white',
                    textDecoration: 'none',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    fontSize: '24px'
                }}
            >
                <FaWhatsapp />
            </a>

          
            <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: '#1877F2',
                    color: 'white',
                    textDecoration: 'none',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    fontSize: '24px'
                }}
            >
                <FaFacebook />
            </a>

           
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