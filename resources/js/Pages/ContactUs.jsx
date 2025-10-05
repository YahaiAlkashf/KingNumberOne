import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import { usePage, Head } from "@inertiajs/react";
import { all } from "axios";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ThreeBackground from '@/Components/ThreeBackground';
import FloatingButtons from '@/Components/FloatingButtons';
import ButtomTop from "@/Components/ButtomTop";
const ContactUs = () => {
    const { app_url } = usePage().props;
    const { t, i18n } = useTranslation();
    const [socialLinks, setSocialLinks] = useState([]);
    const [contactInfo, setContactInfo] = useState([]);
    const [faqs, setFaqs] = useState([]);
    const [services, setServices] = useState([]);
    const [allServices, setAllServices] = useState([]);
    const [marketingServices, setMarketingServices] = useState([]);
    const [success,setSuccess]=useState(false);
    const [showButton ,setShowButton] = useState(false);
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

    const fetchFaqs = async () => {
        try {
            const response = await axios.get(`${app_url}/contact-faqs`);
            setFaqs(response.data.faqs);
        } catch (error) {
            console.log(t("Error fetching FAQs:"), error);
        }
    };


    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        phone: "",
        service_type: "",
        message: "",
    });

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

    useEffect(() => {
        fetchSocialLinks();
        fetchContactInfo();
        fetchFaqs();
        fetchMarketingServices();
        fetchServices();
        const animatedElements = document.querySelectorAll(
            ".contact-form, .contact-info, .faq-item, .info-item"
        );

        const observerOptions = {
            threshold: 0.2,
            rootMargin: "0px 0px -50px 0px",
        };

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = "translateY(0)";
                }
            });
        }, observerOptions);

        animatedElements.forEach((element) => {
            element.style.opacity = 0;
            element.style.transform = "translateY(20px)";
            element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
            observer.observe(element);
        });

        createFloatingStars();

        const socialIcons = document.querySelectorAll(".social-icon");
        socialIcons.forEach((icon) => {
            icon.addEventListener("mouseenter", function () {
                this.style.transform = "translateY(-5px) scale(1.1)";
            });

            icon.addEventListener("mouseleave", function () {
                this.style.transform = "translateY(0) scale(1)";
            });
        });

        return () => {
            observer.disconnect();
        };
    }, []);
        useEffect(() => {
    setAllServices([...services, ...marketingServices]);
    }, [services, marketingServices]);

    const createFloatingStars = () => {
        const spaceBg = document.querySelector(".space-background");
        if (!spaceBg) return;

        const starCount = 15;

        for (let i = 0; i < starCount; i++) {
            const star = document.createElement("div");
            star.style.position = "absolute";
            star.style.width = Math.random() * 3 + 1 + "px";
            star.style.height = star.style.width;
            star.style.backgroundColor =
                i % 3 === 0
                    ? "var(--neon-blue)"
                    : i % 3 === 1
                    ? "var(--nebula-orange)"
                    : "var(--cosmic-purple)";
            star.style.borderRadius = "50%";
            star.style.left = Math.random() * 100 + "%";
            star.style.top = Math.random() * 100 + "%";
            star.style.opacity = Math.random() * 0.7 + 0.3;
            star.style.animation = `twinkle ${
                Math.random() * 5 + 3
            }s ease-in-out infinite alternate`;
            star.style.animationDelay = Math.random() * 5 + "s";

            spaceBg.appendChild(star);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();



       try{
        const response = await axios.post('/submit-message',formData);
        setSuccess(true);
       }catch(error){
        console.log(error);
       }

        setFormData({
            full_name: "",
            email: "",
            phone: "",
            service_type: "",
            message: "",
        });
    };
    const currentLang = i18n.language;
useEffect(() => {
  const handleScroll = () => {
    console.log("Scroll Y:", window.scrollY);
    if (window.scrollY > 200) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);



    return (
        <>
         <ThreeBackground />
        <div className="contact-page p-[20px]">
            <Head>
                <title>Contact Us - KingNumberOne | Get in Touch</title>
                <meta name="description" content="Contact KingNumberOne for all your digital marketing and programming needs. Reach out to us for a free consultation and let's start your project today." />
                <meta name="keywords" content="Contact KingNumberOne, KingNumberOne support, Get in touch, Digital Marketing contact, Programming help, Free consultation" />
            </Head>
            <div className="space-background">
                <div className="stars"></div>
                <div className="nebula"></div>

                <svg className="star-svg" width="100" height="100" viewBox="0 0 100 100" style={{top: '10%', left: '15%'}}>
                    <path d="M50 10 L55 40 L85 40 L60 55 L70 85 L50 65 L30 85 L40 55 L15 40 L45 40 Z"
                          fill="var(--neon-blue)" className="floating" />
                </svg>

                <svg className="star-svg" width="80" height="80" viewBox="0 0 80 80" style={{top: '70%', left: '80%'}}>
                    <path d="M40 5 L44 32 L68 32 L48 44 L56 68 L40 52 L24 68 L32 44 L12 32 L36 32 Z"
                          fill="var(--nebula-orange)" className="floating" style={{animationDelay: '0.5s'}} />
                </svg>

                <svg className="star-svg" width="60" height="60" viewBox="0 0 60 60" style={{top: '30%', left: '85%'}}>
                    <path d="M30 3 L33 24 L51 24 L36 33 L42 51 L30 39 L18 51 L24 33 L9 24 L27 24 Z"
                          fill="var(--cosmic-purple)" className="floating" style={{animationDelay: '1s'}} />
                </svg>
            </div>

            <div className="container">


        <Header />
            <section className="hero">
                <div className="container">
                    <h1 className="logo">KingNumberOne</h1>
                    <h1 className="hero-title">{t("اتصل بنا")}</h1>
                    <p className="hero-subtitle">                        {t(
                            "نحن هنا للإجابة على جميع استفساراتك وتقديم الحلول المناسبة لاحتياجاتك الرقمية. تواصل معنا اليوم وابدأ رحلتك نحو التميز"
                        )}</p>
                </div>
            </section>
                <div className="contact-content">
                    <section className="contact-form">
                        <h3 className="form-title">{t("أرسل رسالة")}</h3>
                        {success && (
                            <h2 className="bg-emerald-500 text-white p-4 rounded-md text-center">{t('تم ارسال الرسالة بنجاح سوف يتم التواصل معك فى اقرب وقت')}</h2>
                            )}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="full_name" className="form-label">
                                    {t("الاسم الكامل")}
                                </label>
                                <input
                                    type="text"
                                    id="full_name"
                                    name="full_name"
                                    className="form-input"
                                    placeholder={t("أدخل اسمك الكامل")}
                                    value={formData.full_name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="form-label">
                                    {t("البريد الإلكتروني")}
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-input"
                                    placeholder={t("example@domain.com")}
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone" className="form-label">
                                    {t("رقم الهاتف")}
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    className="form-input"
                                    placeholder={t("+966 5X XXX XXXX")}
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="service_type" className="form-label">
                                    {t("نوع الخدمة المطلوبة")}
                                </label>
                                <select
                                    id="service_type"
                                    name="service_type"
                                    className="form-input"
                                    value={formData.service_type}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">{t("اختر الخدمة")}</option>
                                    {allServices.map((allservice,index)=>(
                                    <option key={index} value={allservice.name_ar}>
                                        {currentLang === 'ar' ? allservice.name_ar : currentLang === 'en' ? allservice.name_en : allservice.name_tr}
                                    </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="message" className="form-label">
                                    {t("الرسالة")}
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    className="form-textarea"
                                    placeholder={t(
                                        "أخبرنا عن مشروعك أو استفسارك بالتفصيل..."
                                    )}
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" className="submit-btn">
                                {t("إرسال الرسالة")}
                            </button>
                        </form>
                    </section>

                    <section className="contact-info">
                        <h3 className="info-title">{t("معلومات الاتصال")}</h3>
                        {contactInfo.map((info, index) => (
                            <div key={index}>
                                {info.type === "address" && (
                                    <div className="info-item gap-4">
                                        <div className="info-icon">
                                            <i className="fas fa-map-marker-alt"></i>
                                        </div>
                                        <div className="info-content">
                                            <h3>{t("عنواننا")}</h3>
                                            <p>
                                                {currentLang === "ar"
                                                    ? info.value_ar
                                                    : currentLang === "en"
                                                    ? info.value_en
                                                    : info.value_tr}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {info.type === "phone" && (
                                    <div className="info-item gap-4">
                                        <div className="info-icon">
                                            <i className="fas fa-phone"></i>
                                        </div>
                                        <div className="info-content">
                                            <h3>{t("هاتفنا")}</h3>
                                            <p>
                                                {currentLang === "ar"
                                                    ? info.value_ar
                                                    : currentLang === "en"
                                                    ? info.value_en
                                                    : info.value_tr}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {info.type === "email" && (
                                    <div className="info-item gap-4">
                                        <div className="info-icon">
                                            <i className="fas fa-envelope"></i>
                                        </div>
                                        <div className="info-content">
                                            <h3>{t("البريد الإلكتروني")}</h3>
                                            <p>
                                                {currentLang === "ar"
                                                    ? info.value_ar
                                                    : currentLang === "en"
                                                    ? info.value_en
                                                    : info.value_tr}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {info.type === "hours" && (
                                    <div className="info-item gap-4">
                                        <div className="info-icon">
                                            <i className="fas fa-clock"></i>
                                        </div>
                                        <div className="info-content">
                                            <h3>{t("ساعات العمل")}</h3>
                                            <p>
                                                {currentLang === "ar"
                                                    ? info.value_ar
                                                    : currentLang === "en"
                                                    ? info.value_en
                                                    : info.value_tr}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </section>
                </div>

                <section className="social-section">
                    <h3 className="social-title">
                        {t("تابعنا على وسائل التواصل")}
                    </h3>
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
                </section>

                    <section className="map-section w-100" style={{ width: '100%', height: '500px' }}>
                    <div className="map-placeholder w-100" style={{ width: '100%', height: '100%' }}>
                        {socialLinks.map((link, index) => (
                        link.platform === "location" && (
                            <div key={index} className="map-item" style={{ width: '100%', height: '100%' }}>
                            <iframe
                                src={link.url}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy">
                            </iframe>
                            </div>
                        )
                        ))}
                    </div>
                    </section>



                <section className="contact-faq">
                    <h3 className="faq-title">
                        {t("أسئلة شائعة حول الاتصال بنا")}
                    </h3>
                    <div className="faq-grid">
                        {faqs.map((faq, index) => (
                        <div key={index} className="faq-item">
                            <h4 className="faq-question">
                                {currentLang === "ar"
                                   ? faq.question_ar
                                     : currentLang === "en"
                                     ? faq.question_en
                                    : faq.question_tr}
                            </h4>
                            <p>
                                {currentLang === "ar"
                                   ? faq.answer_ar
                                     : currentLang === "en"
                                     ? faq.answer_en
                                    : faq.answer_tr}
                            </p>
                        </div>
                        ))}
                    </div>
                </section>

                <section className="cta-section">
                    <h2 className="cta-title">
                        {t("مستعد لبدء مشروعك الرقمي؟")}
                    </h2>
                    <p
                        style={{
                            fontSize: "1.2rem",
                            marginBottom: "2rem",
                            opacity: "0.9",
                        }}
                    >
                        {t(
                            "اتصل بنا اليوم واحصل على استشارة مجانية لتطوير مشروعك"
                        )}
                    </p>
                      {socialLinks.map((link, index) => (
                        <div>
                         {link.platform === "whatsapp" && (
                                    <a href={link.url} target="_blank" className="cta-button">
                                        {t("ابدأ الآن")}
                                    </a>
                         )}
                         </div>
                        ))}
                </section>
            </div>
        </div>
        <div></div>

         <FloatingButtons  />
            {
                showButton && (
                    <ButtomTop />
                )
            }
        <Footer />
        </>
    );
};

export default ContactUs;
