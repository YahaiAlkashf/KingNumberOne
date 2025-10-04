import { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { useTranslation } from 'react-i18next';
import { usePage } from '@inertiajs/react';
import ThreeBackground from '@/Components/ThreeBackground';
import FloatingButtons from '@/Components/FloatingButtons';
const AboutUs = () => {
    const { t , i18n} = useTranslation();
    const [ourJourney, setOurJourney] = useState([]);
    const [ourValues, setOurValues] = useState([]);
    const [aboutUs, setAboutUs] = useState(null);
    const [ourNumbers, setOurNumbers] = useState([]);
    const [socialLinks, setSocialLinks] = useState([]);

    const {app_url} = usePage().props;
        const fetchAboutUs = async () => {
            try {
                const response = await axios.get(`${app_url}/about-us`);
                setAboutUs(response.data.aboutUs);
            } catch (error) {
                console.log(t("Error fetching about us:"), error);
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
        const fetchOurValues = async () => {
            try {
                const response = await axios.get(`${app_url}/our-values`);
                setOurValues(response.data.ourValues);
            } catch (error) {
                console.log(t("Error fetching our values:"), error);
            }
        };

        const fetchOurJourney = async () => {
            try {
                const response = await axios.get(`${app_url}/our-journey`);
                setOurJourney(response.data.ourJourney);
            } catch (error) {
                console.log(t("Error fetching our journey:"), error);
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
        const currentLang = i18n.language;
    useEffect(() => {
        fetchAboutUs();
        fetchOurValues();
        fetchOurJourney();
        fetchOurNumbers();
        fetchSocialLinks();

        const animatedElements = document.querySelectorAll('.content-text, .value-card, .leader-card, .stat-item, .timeline-content');

        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        animatedElements.forEach(element => {
            element.style.opacity = 0;
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(element);
        });

        createFloatingStars();

        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent);
            let current = 0;
            const increment = target / 50;

            const updateNumber = () => {
                if (current < target) {
                    current += increment;
                    stat.textContent = Math.ceil(current) + '+';
                    setTimeout(updateNumber, 30);
                } else {
                    stat.textContent = target + '+';
                }
            };

            const statObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateNumber();
                        statObserver.unobserve(entry.target);
                    }
                });
            });

            statObserver.observe(stat.parentElement);
        });

        function createFloatingStars() {
            const spaceBg = document.querySelector('.space-background');
            const starCount = 15;

            for (let i = 0; i < starCount; i++) {
                const star = document.createElement('div');
                star.style.position = 'absolute';
                star.style.width = Math.random() * 3 + 1 + 'px';
                star.style.height = star.style.width;
                star.style.backgroundColor = i % 3 === 0 ? 'var(--neon-blue)' :
                                           i % 3 === 1 ? 'var(--nebula-orange)' : 'var(--cosmic-purple)';
                star.style.borderRadius = '50%';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.opacity = Math.random() * 0.7 + 0.3;
                star.style.animation = `twinkle ${Math.random() * 5 + 3}s ease-in-out infinite alternate`;
                star.style.animationDelay = Math.random() * 5 + 's';

                spaceBg.appendChild(star);
            }
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <>
        <ThreeBackground />
        <div className="about-page p-[20px]">

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

            <Header />

            <div className="container">

                            <section className="hero">
                <div className="container">
                    <h1 className="logo">KingNumberOne</h1>
                    <h1 className="hero-title">{t("من نحن")}</h1>
                    <p className="hero-subtitle">{t("شركة رائدة في مجال البرمجة والتسويق الإلكتروني، نسعى دائمًا لتحقيق التميز وابتكار حلول رقمية تتحدى التوقعات")}</p>
                </div>
            </section>
                <section className="content-section">
                    <div className="content-text">
                        <h3 className="section-title">{t("قصتنا")}</h3>
                        {aboutUs?.our_story_ar && <p className="section-text">{currentLang === 'ar' ? aboutUs.our_story_ar : currentLang === 'en' ? aboutUs.our_story_en : aboutUs.our_story_tr }</p>}
                    </div>
                    <div className="content-visual">
                        <svg className="visual-svg" viewBox="0 0 400 300">
                            <path d="M200 50 Q300 30 350 150 Q300 270 200 250 Q100 270 50 150 Q100 30 200 50 Z"
                                  fill="none" stroke="var(--neon-blue)" strokeWidth="3" strokeDasharray="10,5" />
                            <circle cx="200" cy="150" r="80" fill="rgba(31, 40, 51, 0.8)" stroke="var(--cosmic-purple)" strokeWidth="2" />
                            <path d="M150 120 L200 150 L250 120" stroke="var(--nebula-orange)" strokeWidth="3" fill="none" />
                            <path d="M150 180 L200 150 L250 180" stroke="var(--nebula-orange)" strokeWidth="3" fill="none" />
                            <circle cx="200" cy="150" r="30" fill="none" stroke="var(--neon-blue)" strokeWidth="2" />
                            <text x="200" y="155" textAnchor="middle" fill="var(--light-text)" fontSize="14" fontWeight="bold">KNO</text>
                        </svg>
                    </div>
                </section>


                <section className="content-section">
                    <div className="content-visual">
                        <svg className="visual-svg" viewBox="0 0 400 300">
                            <path d="M100 100 L300 100 L250 200 L150 200 Z" fill="none" stroke="var(--cosmic-purple)" strokeWidth="3" />
                            <circle cx="200" cy="150" r="60" fill="none" stroke="var(--nebula-orange)" strokeWidth="2" />
                            <path d="M140 150 L200 110 L260 150 L200 190 Z" fill="none" stroke="var(--neon-blue)" strokeWidth="3" />
                            <line x1="200" y1="110" x2="200" y2="190" stroke="var(--light-text)" strokeWidth="2" />
                            <line x1="140" y1="150" x2="260" y2="150" stroke="var(--light-text)" strokeWidth="2" />
                        </svg>
                    </div>
                    <div className="content-text">
                        <h3 className="section-title">{t("رؤيتنا")}</h3>
                        {aboutUs?.our_vision_ar && <p className="section-text">{currentLang === 'ar' ? aboutUs.our_vision_ar : currentLang === 'en' ? aboutUs.our_vision_en : aboutUs.our_story_tr }</p>}

                        <h3 className="section-title" style={{marginTop: '2rem'}}>{t("رسالتنا")}</h3>
                        {aboutUs?.our_mission_ar && <p className="section-text">{currentLang === 'ar' ? aboutUs.our_mission_ar : currentLang === 'en' ? aboutUs.our_mission_en : aboutUs.our_mission_tr }</p>}
                    </div>
                </section>


                <section>
                    <h2 className="section-title" style={{textAlign: 'center', fontSize: '2.5rem', marginBottom: '2rem'}}>{t("قيمنا")}</h2>

                    <div className="values-grid">
                        {ourValues.map((value, index) =>(
                        <div className="value-card">
                            {value.image ?
                             <img src={`${app_url}/storage/${value.image}`} alt="" className="value-image" /> :
                             (
                            <svg className="value-icon" viewBox="0 0 100 100">
                                <path d="M50 15 L85 40 L85 80 L50 95 L15 80 L15 40 Z" fill="var(--nebula-orange)" />
                                <path d="M40 50 L47 57 L60 43" stroke="white" strokeWidth="4" strokeLinecap="round" />
                            </svg>
                             )}

                            <h3 className="value-title"> {currentLang === 'ar' ? value.name_ar : currentLang === 'en' ? value.name_en : value.name_tr }</h3>
                            <p>{currentLang === 'ar' ? value.description_ar : currentLang === 'en' ? value.description_en : value.description_tr }</p>
                        </div>

                        ))}


                        <div className="value-card">
                            <svg className="value-icon" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="40" fill="var(--neon-blue)" />
                                <path d="M35 50 L45 60 L65 40" stroke="white" strokeWidth="5" strokeLinecap="round" />
                            </svg>
                            <h3 className="value-title">{t("الجودة")}</h3>
                            <p>{t("نلتزم بأعلى معايير الجودة في كل ما نقدمه، بدءًا من التصميم وصولاً إلى التسليم النهائي وخدمات ما بعد البيع.")}</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="section-title" style={{textAlign: 'center', fontSize: '2.5rem', marginBottom: '2rem'}}>{t("رحلتنا")}</h2>

                    <div className="timeline">
                        {ourJourney.map((journey, index) => (
                        <div className="timeline-item">
                            <div className="timeline-content">
                                <div className="timeline-year">{journey.year}</div>
                                <h4 className="timeline-title">{currentLang === 'ar' ? journey.name_ar : currentLang === 'en' ? journey.name_en : journey.name_tr }</h4>
                                <p>{currentLang === 'ar' ? journey.description_ar : currentLang === 'en' ? journey.description_ar : journey.description_ar }</p>
                            </div>
                        </div>
                        ))}
                    </div>
                </section>


                <section>
                    <h2 className="section-title" style={{textAlign: 'center', fontSize: '2.5rem', marginBottom: '2rem'}}>{t("إحصائياتنا")}</h2>


                    <div className="stats-grid">

                    {ourNumbers.map(number=>(
                            <div key={number.id} className="stat-item">
                                <div className="stat-number">{number.number}+</div>
                                <div className="stat-label">{currentLang === 'ar' ? number.name_ar : currentLang === 'en' ? number.name_en : number.name_tr }</div>
                            </div>
                        ))}

                    </div>
                </section>





                <section className="cta-section">
                    <h2 className="cta-title">{t("انضم إلى رحلتنا نحو التميز الرقمي")}</h2>
                    <p style={{fontSize: '1.2rem', marginBottom: '2rem', opacity: '0.9'}}>{t("نحن هنا لمساعدتك في تحقيق أهدافك الرقمية وتحويل أفكارك إلى واقع ملموس")}</p>

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
        <Footer />
        </>
    );
};

export default AboutUs;
