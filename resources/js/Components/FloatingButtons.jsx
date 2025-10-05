import { usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { FaArrowUp, FaWhatsapp, FaFacebook } from "react-icons/fa";

export default function FloatingButtons() {
    const [socialLinks, setSocialLinks] = useState([]);
    const {app_url} = usePage().props;
    const fetchSocialLinks = async () => {
        try {
            const response = await axios.get(`${app_url}/social-links`);
            setSocialLinks(response.data.socialLinks);
        } catch (error) {
            console.log(t("Error fetching social links:"), error);
        }
    };
    useEffect(() => {
        fetchSocialLinks();
    }, []);

    return (
        <div style={{
            position: 'fixed',
            bottom: '100px', 
            right: '30px',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
        }}>
             {socialLinks.map((link, index) => (
                <div key={index}>
                {link.platform === "whatsapp" && (
            <a
                href={link.url}
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
                )}

          {link.platform === "facebook" && (
            <a
                href={link.url}
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
          )}
            </div>
             ))}
        </div>
    );
}