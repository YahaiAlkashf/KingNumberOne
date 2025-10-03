import React, { useContext, useState, useEffect } from "react";
import {
    SunIcon,
    MoonIcon,
    Bars3Icon,
    BellIcon,
} from "@heroicons/react/24/outline";
import { Link, usePage } from "@inertiajs/react";
import ThemeContext from "../../../Context/ThemeContext";
import axios from "axios";
import { useTranslation } from "react-i18next";


export default function Header({ isOpen, setIsOpen }) {
    const user = { name: "Jane Doe", avatar: null };
    const initials = user.name
        .split(" ")
        .map((n) => n[0])
        .join("");
    const { auth } = usePage().props;
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { app_url } = usePage().props;
    const [language, setLanguage] = useState("ar");
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

    const headerPosition = isOpen ? "sm:right-56" : "sm:right-20";
    const headerWidth = isOpen
        ? "sm:w-[calc(100%-14rem)]"
        : "sm:w-[calc(100%-5rem)]";

    return (
        <header
            className={`fixed top-0 left-0 w-full ${headerPosition} ${headerWidth}
                z-30 flex items-center justify-between
                px-6 py-4 bg-white dark:bg-gray-800
                shadow-md transition-all duration-300`}
        >
            <div>
                <h1 className="text-2xl font-semibold text-[#4F2BED] dark:text-primary-dark">
                   KingNumberOne
                </h1>
            </div>
            <div className="flex items-center gap-4">
                <div className="relative">
                    <select
                    value={i18n.language}
                onChange={(e) => changeLanguage(e.target.value)}
                        className="appearance-none w-36 px-4 py-2 pr-8 rounded-xl
                   border border-gray-300 dark:border-gray-700
                   bg-white dark:bg-gray-800
                   text-gray-700 dark:text-gray-200 text-sm font-medium
                   shadow-md transition duration-200
                   hover:border-[#4F2BED]
                   focus:ring-2 focus:ring-[#4F2BED] focus:outline-none"
                    >
                        <option
                            value="ar"
                            className="py-2 px-3 bg-white dark:bg-gray-800 hover:bg-[#4F2BED] hover:text-white"
                        >
                            🇪🇬 {t("عربي")}
                        </option>
                        <option
                            value="en"
                            className="py-2 px-3 bg-white dark:bg-gray-800 hover:bg-[#4F2BED] hover:text-white"
                        >
                            🇬🇧 {t("English")}
                        </option>
                        <option
                            value="tr"
                            className="py-2 px-3 bg-white dark:bg-gray-800 hover:bg-[#4F2BED] hover:text-white"
                        >
                            🇬🇧 {t("tr")}
                        </option>
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                        ▼
                    </span>
                </div>



                {/* Dark/Light Mode Toggle */}
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    aria-label="Toggle dark mode"
                >
                    {theme === "dark" ? (
                        <SunIcon className="h-6 w-6 text-yellow-400" />
                    ) : (
                        <MoonIcon className="h-6 w-6 text-[#4F2BED]" />
                    )}
                </button>


                {/* Profile Picture */}
                <div
                    className="h-10 w-10 rounded-full bg-[#4F2BED] flex items-center justify-center
                                text-white font-bold text-lg shadow"
                >


                        {initials}
                        

                </div>

                {/* Logout Button */}
                <Link
                    href={route("logout")}
                    method="post"
                    className="ml-2 px-4 py-2 bg-[#4F2BED] hover:bg-[#3c20c9]
                               text-white rounded-lg font-semibold shadow transition"
                >
                    {t("تسجيل الخروج")}
                </Link>
            </div>
        </header>
    );
}
