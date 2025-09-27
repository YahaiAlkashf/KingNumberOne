// import './Footer.css';

import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
    const [services, setServices] = useState([]);
    const [allServices, setAllServices] = useState([]);
    const [marketingServices, setMarketingServices] = useState([]);
    const [socialLinks, setSocialLinks] = useState([]);
    const [contactInfo, setContactInfo] = useState([]);
    const {t, i18n} = useTranslation();
    const {app_url} = usePage().props;
    
            const fetchMarketingServices = async () => {
                    try {
                        const response = await axios.get(`${app_url}/marketing-services`);
                        setMarketingServices(response.data.marketingServices || []);
                    } catch (error) {
                        console.log(t("Error fetching marketing services:"), error);
                    }
                };
            const fetchServices = async () => {
                    try {
                        const response = await axios.get(`${app_url}/services`);
                        setServices(response.data.services || []);
                    } catch (error) {
                        console.log(t("Error fetching services:"), error);
                    }
                };
            const fetchSocialLinks = async () => {
                try {
                    const response = await axios.get(`${app_url}/social-links`);
                    setSocialLinks(response.data.socialLinks);
                } catch (error) {
                    console.log(t("Error fetching social links:"), error);
                }
                };
            const fetchContactInfo = async () => {
                try {
                    const response = await axios.get(`${app_url}/contact-info`);
                    setContactInfo(response.data.contactInfo);
                } catch (error) {
                    console.log(t("Error fetching contact info:"), error);
                }
                };

            useEffect(()=>{
                fetchMarketingServices();
                fetchServices();
                fetchSocialLinks();
                fetchContactInfo();
            },[])
        useEffect(() => {
              setAllServices([...services, ...marketingServices]);
            }, [services, marketingServices]);
            const currentLang = i18n.language;
    return (
        <footer>
            <div className="container">
                <div className="footer-content">
                    <div className="footer-column">
                        <h3>{t('KingNumberOne')}</h3>
                        <p>{t('شركة رائدة في مجال البرمجة والتسويق الإلكتروني، نقدم حلولاً رقمية متكاملة تساعد عملك على النمو في العصر الرقمي.')}</p>
                        <div className="social-links">
                             
                    <div className="social-icons">
                        {socialLinks.map((link, index) => (
                            <div key={index}>
                                {link.platform === "twitter" && (
                                    <a href={link.url} target="_blank" className="social-icon">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                )}
                                {link.platform === "linkedin" && (
                                    <a href={link.url} target="_blank" className="social-icon">
                                        <i className="fab fa-linkedin-in"></i>
                                    </a>
                                )}
                                {link.platform === "facebook" && (
                                    <a href={link.url} target="_blank" className="social-icon">
                                        <i className="fab fa-facebook-f"></i>
                                    </a>
                                )}
                                {link.platform === "instagram" && (
                                    <a href={link.url} target="_blank" className="social-icon">
                                        <i className="fab fa-instagram"></i>
                                    </a>
                                )}
                                {link.platform === "youtube" && (
                                    <a href={link.url} target="_blank" className="social-icon">
                                        <i className="fab fa-youtube"></i>
                                    </a>
                                )}
                                {link.platform === "whatsapp" && (
                                    <a href={link.url} target="_blank" className="social-icon">
                                        <i className="fab fa-whatsapp"></i>
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                            
                        </div>
                    </div>

                    <div className="footer-column">
                        <h3>{t('روابط سريعة')}</h3>
                        <ul className="footer-links">
                        <li><Link href="/">{t('الرئيسية')}</Link></li>
                        <li><Link href="/aboutus">{t('من نحن')}</Link></li>
                        <li><Link href="/service">{t('خدماتنا')}</Link></li>
                        <li><Link href="/contact">{t('اتصل بنا')}</Link></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h3>{t('خدماتنا')}</h3>
                        <ul className="footer-links">
                           
                            <>
                                {allServices.map((allservice,index)=>(
                                    <li key={index} value={allservice.name_ar}>
                                        {currentLang === 'ar' ? allservice.name_ar : currentLang === 'en' ? allservice.name_en : allservice.name_tr}
                                    </li>
                                    ))}
                            </>
                          
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h3>{t('اتصل بنا')}</h3>
                        <ul className="footer-links">
                            {contactInfo.map((info, index) => (
                                <div key={index}>
                                {info.type === "address" && (
                                    <li><i className="fas fa-map-marker-alt"></i>                                                 {currentLang === "ar"
                                                    ? info.value_ar
                                                    : currentLang === "en"
                                                    ? info.value_en
                                                    : info.value_tr}</li>
                                )}
                                {info.type === "phone" && (
                                    <li><i className="fas fa-phone"></i>                                                 {currentLang === "ar"
                                                    ? info.value_ar
                                                    : currentLang === "en"
                                                    ? info.value_en
                                                    : info.value_tr}</li>
                                )}
                                {info.type === "email" && (
                                    <li><i className="fas fa-envelope"></i>                                                 {currentLang === "ar"
                                                    ? info.value_ar
                                                    : currentLang === "en"
                                                    ? info.value_en
                                                    : info.value_tr}</li>
                                )}
                                {info.type === "hours" && (
                                    <li><i className="fas fa-clock"></i>                                                 {currentLang === "ar"
                                                    ? info.value_ar
                                                    : currentLang === "en"
                                                    ? info.value_en
                                                    : info.value_tr}</li>
                                )}
                            </div>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="copyright">
                    <p>{t('جميع الحقوق محفوظة')} &copy; 2023 {t('KingNumberOne')}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
