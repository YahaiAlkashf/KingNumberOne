import { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { useTranslation } from 'react-i18next';
import { Link, usePage, Head } from "@inertiajs/react";
import ThreeBackground from '@/Components/ThreeBackground';
import FloatingButtons from '@/Components/FloatingButtons';
import ButtomTop from '@/Components/ButtomTop';

function Home() {
    const { t, i18n  } = useTranslation();
        const [services, setServices] = useState([]);
        const [ourNumbers, setOurNumbers] = useState([]);
        const [whyChooseUs, setWhyChooseUs] = useState([]);
        const [projects, setProjects] = useState([]);
        const [socialLinks, setSocialLinks] = useState([]);
        const [showButton ,setShowButton] = useState(false);
        const {app_url} = usePage().props;
        const fetchServices = async () => {
            try {
                const response = await axios.get(`${app_url}/services`);
                setServices(response.data.services);
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
        const fetchWhyChooseUs = async () => {
                try {

                    const response = await axios.get(`${app_url}/why-choose-us`);
                    setWhyChooseUs(response.data.whyChooseUs);
                } catch (error) {
                    console.log(t("Error fetching why choose us:"), error);
                }
            };
                const fetchProjects = async () => {
                    try {

                        const response = await axios.get(`${app_url}/projects`);
                        setProjects(response.data.projects);
                    } catch (error) {
                        console.log(t("Error fetching projects:"), error);
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
        fetchServices();
        fetchWhyChooseUs();
        fetchProjects();
        fetchOurNumbers();
        fetchSocialLinks();
        const animatedElements = document.querySelectorAll('.service-card, .feature-item, .project-card, .stat-item, .blog-card');

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

        // createFloatingStars();

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
        <div className="App !mt-28">
            <Head>
                <title>KingNumberOne: Programming and Digital Marketing Solutions</title>
                <meta name="description" content="KingNumberOne offers integrated digital solutions, combining creativity and technology to achieve your business goals. We specialize in programming and e-marketing." />
                <meta name="keywords" content="Digital Marketing, Programming, Web Development, E-marketing, SEO, KingNumberOne, Digital Solutions" />
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



            <section className="hero">
                <div className="container">
                    <h1 className="hero-title">{t("نحو آفاق جديدة في البرمجة والتسويق الإلكتروني")}</h1>
                    <p className="hero-subtitle">{t("نحن شركة KingNumberOne نقدم حلولاً رقمية متكاملة تجمع بين الإبداع والتقنية لتحقيق أهداف عملك في العصر الرقمي")}</p>
                                        {socialLinks.map((link, index) => (
                        <div>
                         {link.platform === "whatsapp" && (
                            <div className="hero-buttons">
                                <a href={link.url} target="_blank"className="btn btn-primary">{t("ابدأ مشروعك الآن")}</a>
                                <a href={link.url} target="_blank" className="btn btn-secondary">{t("استكشف خدماتنا")}</a>
                            </div>
                         )}
                         </div>
                    ))}

                </div>
            </section>

            <section className="services">
                <div className="container">
                    <h2 className="section-title">{t("خدماتنا")}</h2>

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
                </div>
            </section>


            <section className="why-us">
                <div className="container">
                    <h2 className="section-title">{t("لماذا تختار KingNumberOne؟")}</h2>

                    <div className="features-grid">
                        {whyChooseUs.map(item=>(
                        <div className="feature-item">
                                {item.image ? (
                                    <div className="feature-icon">
                                    <img src={`${app_url}/storage/${item.image}`} alt=""  className="!h-52 !w-80" />
                                    </div>
                                ) : (
                                    <div className="feature-icon">
                                         <i className="fas fa-rocket " ></i>
                                      </div>
                                )}
                            <h3 className="feature-title">{currentLang === 'ar' ? item.name_ar : currentLang === 'en' ? item.name_en : item.name_tr }</h3>
                            <p>{currentLang === 'ar' ? item.description_ar : currentLang === 'en' ? item.description_en : item.description_tr }</p>
                        </div>
                        ))}

                    </div>
                </div>
            </section>

            {/* projects section*/}
<section className="projects py-20 ">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
            <h2 className="section-title text-4xl font-bold text-gray-800 dark:text-white mb-4">
                {t("مشاريعنا الأخيرة")}
            </h2>
        </div>

        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(project => (
                <div key={project.id} className="group">
                    <a
                        href={project.project_url || "#"}
                        target='_blank'
                        rel="noopener noreferrer"
                        className="project-card block bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden h-full"
                    >
                        <div className="project-image relative overflow-hidden">
                            {project.image ? (
                                <img
                                    src={`${app_url}/storage/${project.image}`}
                                    alt={currentLang === 'ar' ? project.name_ar : currentLang === 'en' ? project.name_en : project.name_tr}
                                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                            ) : (
                                <div className="w-full h-64 bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                                    <i className="fas fa-shopping-cart text-white text-6xl opacity-80"></i>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                        </div>

                        <div className="project-content p-6">
                            <div className="flex items-start justify-between mb-3">
                                <h3 className="project-title text-xl font-bold text-gray-800 dark:text-white line-clamp-2 leading-tight">
                                    {currentLang === 'ar' ? project.name_ar : currentLang === 'en' ? project.name_en : project.name_tr}
                                </h3>
                                <span className="ml-2 flex-shrink-0">
                                    <i className="fas fa-external-link-alt text-primary text-sm"></i>
                                </span>
                            </div>

                            <p className="project-category text-primary font-semibold text-sm mb-3">
                                {currentLang === 'ar' ? project.category_ar : currentLang === 'en' ? project.category_en : project.category_tr}
                            </p>

                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                                {currentLang === 'ar' ? project.description_ar : currentLang === 'en' ? project.description_en : project.description_tr}
                            </p>

                            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                <span className="inline-flex items-center text-primary text-sm font-medium">
                                    {t("عرض المشروع")}
                                    <i className="fas fa-arrow-left mr-2 text-xs transition-transform group-hover:-translate-x-1"></i>
                                </span>
                            </div>
                        </div>
                    </a>
                </div>
            ))}
        </div>

        {projects.length === 0 && (
            <div className="text-center py-16">
                <i className="fas fa-inbox text-6xl text-gray-300 dark:text-gray-600 mb-4"></i>
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                    {t("لا توجد مشاريع لعرضها حالياً")}
                </p>
            </div>
        )}
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




            <section className="contact-cta">
                <div className="container">
                    <h2 className="section-title">{t("مستعد لبدء مشروعك؟")}</h2>
                    <p>{t("تواصل معنا اليوم للحصول على استشارة مجانية ومناقشة مشروعك مع خبرائنا")}</p>
                    {socialLinks.map((link, index) => (
                        <div>
                         {link.platform === "whatsapp" && (
                                    <a href={link.url} target="_blank" className="cta-button">
                                        {t("ابدأ الآن")}
                                    </a>
                         )}
                         </div>
                    ))}
                </div>
            </section>

        </div>
        <FloatingButtons />
      {showButton && <ButtomTop />}
        <Footer />
        </>
    );
}

export default Home;
