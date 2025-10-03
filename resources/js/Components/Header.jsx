import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [language, setLanguage] = useState("ar");

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



    useEffect(() => {
        localStorage.setItem("language", language);
    }, [language]);
    return (
        <header>
            <div className="container">
                <div className="header-content">
                    <Link href="/" className="logo">{t('KingNumberOne')}</Link>

                    <button className="mobile-menu-btn" onClick={toggleMenu}>
                        <i className="fas fa-bars"></i>
                    </button>

                    <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
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
                                                    🇬🇧 {t("tr")}
                                                </option>
                                            </select>

                                        </div>

                            </div>
                    </ul>

                </div>
            </div>
        </header>
    );
};

export default Header;
