import React from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    HomeIcon,
    UserGroupIcon,
    ClipboardDocumentListIcon,
    Bars3Icon,
    ChartBarIcon,
    BookOpenIcon,
    DocumentTextIcon,
    UserIcon,
    MegaphoneIcon,
    LinkIcon,
    Cog6ToothIcon,
    ChatBubbleLeftRightIcon
} from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

export default function Sidebar({ isOpen, setIsOpen }) {
    const { t } = useTranslation();
    const { url } = usePage();
    const sidebarWidth = isOpen ? "w-56" : "w-20";
    const { auth } = usePage().props;
    let navItems =[];

    navItems = [
    { name: t("لوحة التحكم"), icon: HomeIcon, path: "/admin" },
    { name: t("الرئيسية"), icon: UserGroupIcon, path: "/admin/home" },
    { name: t("الخدمات"), icon: ClipboardDocumentListIcon, path: "/admin/services" },
    { name: t("من نحن"), icon: DocumentTextIcon, path: "/admin/about" },
    { name: t("تواصل معنا"), icon: BookOpenIcon, path: "/admin/contact" },
    ];



    return (
        <div
            className={`fixed top-0 right-0 h-full z-40 flex flex-col
        bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ${sidebarWidth} ${
                isOpen ? "block" : "hidden sm:block"
            }`}
        >
            <div
                className={`flex items-center ${
                    isOpen ? "justify-between" : "justify-center"
                }
        px-4 py-4 border-b border-gray-200 dark:border-gray-700`}
            >
                <span
                    className={`text-xl font-bold text-gray-800 dark:text-gray-200 transition-all duration-300
          ${isOpen ? "opacity-100" : "opacity-0 hidden"}`}
                >
                    {t("لوحة التحكم")}
                </span>
                <button
                    className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle sidebar"
                >
                    <Bars3Icon className="h-6 w-6 text-gray-700 dark:text-gray-200" />
                </button>
            </div>

            <nav className="flex-1 flex flex-col gap-2 mt-4">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = url === item.path;
                    return (
                        <div key={item.name} className="relative group">
                            <Link
                                href={item.path}
                                className={`flex items-center gap-4 px-4 py-3 mx-2 rounded-lg transition-all duration-200
                ${
                    isActive
                        ? "bg-primary text-white"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                } ${isOpen ? "" : "justify-center"}`}
                            >
                                <Icon className="h-5 w-5 flex-shrink-0" />
                                <span
                                    className={`text-sm font-medium transition-all duration-200
                ${isOpen ? "opacity-100" : "opacity-0 hidden"}`}
                                >
                                    {item.name}
                                </span>
                            </Link>

                            {!isOpen && (
                                <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3
                                    opacity-0 invisible group-hover:opacity-100 group-hover:visible
                                    transition-all duration-300 z-50">
                                    <div className="bg-gray-900 text-white text-sm font-medium py-2 px-3
                                        rounded-lg shadow-lg whitespace-nowrap relative">
                                        {item.name}

                                        <div className="absolute top-1/2 -right-1 -translate-y-1/2
                                            w-2 h-2 bg-gray-900 rotate-45"></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>
        </div>
    );
}
