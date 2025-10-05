import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import FloatingButtons from './FloatingButtons';
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [language, setLanguage] = useState("ar");
     const { app_url } = usePage().props;
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const { t, i18n } = useTranslation();
        const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem("i18nextLng", lang);
    };
    useEffect(() => {
        const savedLang = localStorage.getItem("language");
        if (savedLang) setLanguage(savedLang);
    }, []);



    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    const navClasses = scrolled
        ? 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-100 dark:border-gray-700'
        : 'bg-transparent border-b border-transparent';


    return (
        <nav className={`fixed w-full z-50 top-0 start-0 transition-all duration-300 ${navClasses}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    <Link href="/" className='flex gap-2 justify-center items-center' >
                    <img src="1.png" alt="imag" className='w-15 h-10 md:w-20 md:h-16  '/>
                    <h1 className="logo !text-[34px] !my-6">KingNumberOne</h1>
                    </Link>

                    <button className="mobile-menu-btn" onClick={toggleMenu}>
                        <i className="fas fa-bars"></i>
                    </button>

                    <ul className={`nav-links ${isMenuOpen ? 'active' : ''} flex items-center justify-center gap-4`}>
                        <li><Link href="/">{t('الرئيسية')}</Link></li>
                        <li><Link href="/aboutus">{t('من نحن')}</Link></li>
                        <li><Link href="/service">{t('خدماتنا')}</Link></li>
                        <li><Link href="/contact">{t('اتصل بنا')}</Link></li>
                            <div className="flex items-center justify-center gap-4">
                                <div className="relative ">
                                    <select
                                            value={i18n.language}
                                        onChange={(e) => changeLanguage(e.target.value)}
                                                className="appearance-none w-36 px-4 py-2 pr-8 rounded-xl
                                        border border-gray-300 dark:border-gray-700
                                         bg-gray-800
                                         text-gray-200 text-sm font-medium
                                        shadow-md transition duration-200
                                        hover:border-[#4F2BED]
                                        focus:ring-2 focus:ring-[#4F2BED] focus:outline-none"
                                            >
                                                <option
                                                    value="ar"
                                                    className="py-2 px-3  bg-gray-800 hover:bg-[#4F2BED] hover:text-white"
                                                >
                                                    🇪🇬 {t("عربي")}
                                                </option>
                                                <option
                                                    value="en"
                                                    className="py-2 px-3  bg-gray-800 hover:bg-[#4F2BED] hover:text-white"
                                                >
                                                    🇬🇧 {t("English")}
                                                </option>
                                                <option
                                                    value="tr"
                                                    className="py-2 px-3  bg-gray-800 hover:bg-[#4F2BED] hover:text-white"
                                                >
                                                    🇹🇷 {t("tr")}
                                                </option>
                                            </select>

                                        </div>

                            </div>
                    </ul>

                </div>
            </div>
        </nav>

    );
};

export default Header;
