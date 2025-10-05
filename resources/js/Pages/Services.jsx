import Footer from '@/Components/Footer';
import Header from '@/Components/Header';
import { usePage, Head } from '@inertiajs/react';
import ThreeBackground from '@/Components/ThreeBackground';
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import FloatingButtons from '@/Components/FloatingButtons';
import ButtomTop from '@/Components/ButtomTop';
// Helper to apply reveal-on-scroll animation
const useRevealOnScroll = (ref) => {

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    element.classList.add('is-visible');
                    observer.unobserve(element);
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [ref]);
};

const StatCounter = ({ target, label, suffix = '+' }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !hasAnimated.current) {
                hasAnimated.current = true;
                let start = 0;
                const duration = 2000; // 2 seconds
                const incrementTime = 30; // ms
                const totalIncrements = duration / incrementTime;
                const incrementValue = target / totalIncrements;

                const timer = setInterval(() => {
                    start += incrementValue;
                    if (start >= target) {
                        setCount(target);
                        clearInterval(timer);
                    } else {
                        setCount(Math.ceil(start));
                    }
                }, incrementTime);
            }
        }, { threshold: 0.5 });

        observer.observe(element);

        return () => observer.disconnect();
    }, [target, suffix]);

    return (
        <div ref={ref} className="text-center p-8 bg-[rgba(31,40,51,0.5)] rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="text-5xl font-bold text-[#FF6F61] mb-2">{count}{suffix}</div>
            <div className="text-lg opacity-90">{label}</div>
        </div>
    );
};

const Services = () => {

        const [services, setServices] = useState([]);
        const [faqs, setFaqs] = useState([]);
        const [marketingServices, setMarketingServices] = useState([]);
        const {app_url} = usePage().props;
        const [ourNumbers, setOurNumbers] = useState([]);
        const [socialLinks, setSocialLinks] = useState([]);
          const [showButton ,setShowButton] = useState(false);
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

                const fetchOurNumbers = async () => {
                    try {

                        const response = await axios.get(`${app_url}/our-numbers`);
                        setOurNumbers(response.data.ourNumbers);
                    } catch (error) {
                        console.log(t("Error fetching our numbers:"), error);
                    }
                };
        const fetchMarketingServices = async () => {
            try {
                const response = await axios.get(`${app_url}/marketing-services`);
                setMarketingServices(response.data.marketingServices || []);
            } catch (error) {
                console.log(t("Error fetching marketing services:"), error);
            }
        };

        const fetchFaqs = async () => {
            try {
                const response = await axios.get(`${app_url}/faqs`);
                setFaqs(response.data.faqs || []);
            } catch (error) {
                console.log(t("Error fetching FAQs:"), error);
            }
        };
    useEffect(() => {
        fetchServices();
        fetchMarketingServices();
        fetchFaqs();
        fetchOurNumbers();
        fetchSocialLinks();
    }, []);
    const { t ,i18n} = useTranslation();
     const  currentLang = i18n.language;
    const sections = {
        hero: useRef(null),
        services: useRef(null),
        marketing: useRef(null),
        faq: useRef(null),
        team: useRef(null),
        stats: useRef(null),
        clients: useRef(null),
        cta: useRef(null),
    };

    useRevealOnScroll(sections.services);
    useRevealOnScroll(sections.marketing);
    useRevealOnScroll(sections.team);
    useRevealOnScroll(sections.stats);
    useRevealOnScroll(sections.clients);
    useRevealOnScroll(sections.cta);
    useRevealOnScroll(sections.faq);

    const [activeFaq, setActiveFaq] = useState(null);

    const toggleFaq = (index) => {
        setActiveFaq(activeFaq === index ? null : index);
    };
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
        <Header />
        <div  className=" text-[#EEEEEE] p-[20px] font-['Cairo'] relative overflow-x-hidden">
            <Head>
                <title>Our Services - KingNumberOne | Digital & Marketing Solutions</title>
                <meta name="description" content="Explore the wide range of digital and marketing services offered by KingNumberOne. From web development to online marketing, we turn your ideas into reality." />
                <meta name="keywords" content="KingNumberOne Services, Digital Services, Marketing Services, Web Development, Online Marketing, SEO Services, Custom Solutions" />
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
            <style>{`
                @keyframes twinkle { 0% { opacity: 0.5; } 100% { opacity: 1; } }
                @keyframes nebulaFloat { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(-20px, 10px) scale(1.05); } }
                @keyframes logoGlow { 0% { text-shadow: 0 0 5px rgba(0, 173, 181, 0.5); } 100% { text-shadow: 0 0 20px rgba(199, 0, 255, 0.8), 0 0 30px rgba(255, 111, 97, 0.6); } }
                @keyframes floating { 0% { transform: translateY(0px); } 50% { transform: translateY(-15px); } 100% { transform: translateY(0px); } }
                .animate-logoGlow { animation: logoGlow 3s ease-in-out infinite alternate; }
                .reveal-on-scroll { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
                .reveal-on-scroll.is-visible { opacity: 1; transform: translateY(0); }
                .faq-answer { max-height: 0; overflow: hidden; transition: max-height 0.3s ease, padding 0.3s ease; }
                .faq-item.active .faq-answer { max-height: 500px; padding: 1.5rem; }
                .faq-item.active .faq-toggle { transform: rotate(45deg); }
                `}</style>



            <div className="container mx-auto px-4 sm:px-8 py-8">
                <section ref={sections.hero} className="text-center py-20 relative">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#00ADB5] via-[#C700FF] to-[#FF6F61] animate-logoGlow">KingNumberOne</h1>
                    <p className="text-2xl opacity-90 max-w-2xl mx-auto" style={{ textShadow: '0 0 10px currentColor' }}>{t("نحو آفاق جديدة في البرمجة والتسويق الإلكتروني")}</p>
                </section>

                <section ref={sections.services} className="reveal-on-scroll my-16">
                    <h2 className="text-4xl font-bold text-center mb-12 text-[#00ADB5] relative after:content-[''] after:block after:w-24 after:h-1 after:bg-gradient-to-r after:from-[#00ADB5] after:to-[#C700FF] after:mx-auto after:mt-4 after:rounded-sm" style={{ textShadow: '0 0 10px currentColor' }}>{t("خدماتنا")}</h2>
                    <div className="services-grid">
                        {services.map(service=>(
                        <div   key={service.id} className="service-card">
                            {services.image ? (
                                <img src={`${app_url}/storage/${services.image}`} alt="" width={"100%"} height={"100%"}/>
                            ) : (
                                <>
                            <svg className="service-icon" viewBox="0 0 100 100">
                                <path d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z"
                                      fill="none" stroke="var(--neon-blue)" strokeWidth="5" />
                                <circle cx="50" cy="50" r="20" fill="none" stroke="var(--nebula-orange)" strokeWidth="3" />
                                <path d="M35 50 L45 60 L65 40" stroke="var(--cosmic-purple)" strokeWidth="5" strokeLinecap="round" />
                            </svg>
                            </>
                            ) }

                            <h3 className="service-title">{currentLang === 'ar' ? service.name_ar : currentLang === 'en' ? service.name_en : service.name_tr }</h3>
                            <p className="service-description">{currentLang === 'ar' ? service.description_ar : currentLang === 'en' ? service.description_en  : service.description_tr  }</p>
                            <a href="#" className="service-link">{t("اكتشف المزيد")} <i className="fas fa-arrow-left"></i></a>
                        </div>
                        ))}

                    </div>
                </section>

                <section ref={sections.marketing} className="reveal-on-scroll my-16">
                    <h2 className="text-4xl font-bold text-center mb-12 text-[#00ADB5] relative after:content-[''] after:block after:w-24 after:h-1 after:bg-gradient-to-r after:from-[#00ADB5] after:to-[#C700FF] after:mx-auto after:mt-4 after:rounded-sm" style={{ textShadow: '0 0 10px currentColor' }}>{t("خدمات التسويق الإلكتروني")}</h2>
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {marketingServices.map((feature, index) => (
                            <div key={index} className="bg-[rgba(31,40,51,0.5)] p-6 rounded-xl text-center transition-all duration-300 hover:-translate-x-1 hover:shadow-lg border-l-4 border-[#FF6F61]">
                                {feature.image &&
                                <img src={`${app_url}/storage/${feature.image}`} alt="" width={"100%"} height={"100%"} />
                                }

                                <h3 className="text-xl font-bold mb-2 text-[#00ADB5]">{currentLang === 'ar' ? feature.name_ar : currentLang === 'en' ? feature.name_en : feature.name_tr }</h3>
                                <p className="opacity-90">{currentLang === 'ar' ? feature.name_ar : currentLang === 'en' ? feature.name_en : feature.name_tr }</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section ref={sections.faq} className="reveal-on-scroll my-16">
                    <h2 className="text-4xl font-bold text-center mb-12 text-[#00ADB5] relative after:content-[''] after:block after:w-24 after:h-1 after:bg-gradient-to-r after:from-[#00ADB5] after:to-[#C700FF] after:mx-auto after:mt-4 after:rounded-sm" style={{ textShadow: '0 0 10px currentColor' }}>{t("الأسئلة الشائعة")}</h2>
                    <div className="max-w-3xl mx-auto">
                        {faqs.map((faq, index) => (
                            <div key={index} className={`faq-item bg-[rgba(31,40,51,0.7)] mb-4 rounded-xl overflow-hidden border border-white/10 ${activeFaq === index ? 'active' : ''}`}>
                                <div  className="p-6 cursor-pointer flex justify-between items-center font-semibold transition-all duration-300 hover:bg-white/5" onClick={() => toggleFaq(index)}>
                                    <span>{currentLang === 'ar' ? faq.question_ar : currentLang === 'en' ? faq.question_en : faq.question_tr }</span>
                                    <span className="text-2xl transition-transform duration-300">+</span>
                                </div>
                                <div className="faq-answer">
                                    <p className="opacity-90">{currentLang === 'ar' ? faq.answer_ar	 : currentLang === 'en' ? faq.answer_en	 : faq.answer_tr }</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>


            <section className="stats">
                <div className="container">
                    <h2 className="section-title">{t("أرقامنا تتحدث")}</h2>

                    <div className="stats-grid">

                    {ourNumbers.map(number=>(
                        <div key={number.id} className="stat-item">
                            <div className="stat-number">{number.number}+</div>
                            <div className="stat-label">{currentLang === 'ar' ? number.name_ar : currentLang === 'en' ? number.name_en : number.name_tr }</div>
                        </div>
                        ))}


                    </div>
                </div>
            </section>


                <section ref={sections.cta} className="reveal-on-scroll text-center py-16 sm:py-20 bg-[rgba(31,40,51,0.5)] rounded-3xl my-16 sm:my-24 relative overflow-hidden">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#FF6F61] to-[#C700FF]">{t("مستعد لبدء رحلتك الرقمية؟")}</h2>
                    <p className="text-lg sm:text-xl mb-8 opacity-90 max-w-3xl mx-auto">{t("تواصل معنا اليوم لتحويل أفكارك إلى واقع ملموس")}</p>
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
         <FloatingButtons />
          {showButton && <ButtomTop />}
            <Footer />
        </>
    );
};

export default Services;
