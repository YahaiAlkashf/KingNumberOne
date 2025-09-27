import React, { useState, useEffect } from "react";
import AdminLayout from "./layout";
import axios from "axios";
import { usePage } from "@inertiajs/react";
import {
    XMarkIcon,
    PlusIcon,
    PencilIcon,
    TrashIcon,
    EyeIcon,
    LinkIcon,
    MapPinIcon,
    PhoneIcon,
    EnvelopeIcon,
    ClockIcon,
    LanguageIcon
} from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

export default function Contact() {
    const { app_url, auth } = usePage().props;
    const { t, i18n } = useTranslation();

    // States for Social Links
    const [socialLinks, setSocialLinks] = useState([]);
    const [socialModal, setSocialModal] = useState(false);
    const [editingSocial, setEditingSocial] = useState(null);
    const [newSocial, setNewSocial] = useState({
        platform: "",
        url: "",
        icon: "",
        name_ar: "",
        name_en: "",
        name_tr: ""
    });

    // States for Contact Info
    const [contactInfo, setContactInfo] = useState([]);
    const [contactModal, setContactModal] = useState(false);
    const [editingContact, setEditingContact] = useState(null);
    const [newContact, setNewContact] = useState({
        type: "",
        value_ar: "",
        value_en: "",
        value_tr: "",
        icon: "",
        title_ar: "",
        title_en: "",
        title_tr: ""
    });

    // States for FAQ
    const [faqs, setFaqs] = useState([]);
    const [faqModal, setFaqModal] = useState(false);
    const [editingFaq, setEditingFaq] = useState(null);
    const [newFaq, setNewFaq] = useState({
        question_ar: "",
        question_en: "",
        question_tr: "",
        answer_ar: "",
        answer_en: "",
        answer_tr: ""
    });

    // States for Messages
    const [messages, setMessages] = useState([]);
    const [messageModal, setMessageModal] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);

    const [errors, setErrors] = useState({});
    const [currentTab, setCurrentTab] = useState("social");
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLang, setCurrentLang] = useState(i18n.language || 'ar');
    const rowsPerPage = 10;

    // Platform options for social links
    const platformOptions = [
        { value: "facebook", label: "Facebook", icon: "🔵" },
        { value: "whatsapp", label: "WhatsApp", icon: "🟢" },
        { value: "instagram", label: "Instagram", icon: "🟣" },
        { value: "twitter", label: "Twitter", icon: "🔵" },
        { value: "linkedin", label: "LinkedIn", icon: "🔵" },
        { value: "youtube", label: "YouTube", icon: "🔴" },
        { value: "location", label: "Location", icon: "🔴" },
    ];

    // Contact type options
    const contactTypeOptions = [
        { value: "address", label: "العنوان", icon: "📍" },
        { value: "phone", label: "الهاتف", icon: "📞" },
        { value: "email", label: "البريد الإلكتروني", icon: "✉️" },
        { value: "hours", label: "ساعات العمل", icon: "🕒" },
        { value: "location", label: "الموقع", icon: "🗺️" }
    ];

    // Language options
    const languageOptions = [
        { value: "ar", label: "العربية", flag: "🇸🇦" },
        { value: "en", label: "English", flag: "🇺🇸" },
        { value: "tr", label: "Türkçe", flag: "🇹🇷" }
    ];

    // Helper function to get text based on current language
    const getTextByLang = (item, field) => {
        const langField = `${field}_${currentLang}`;
        return item[langField] || item[field] || t('لا توجد ترجمة');
    };

    // Fetch data functions
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

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`${app_url}/contact-messages`);
            setMessages(response.data.messages);
        } catch (error) {
            console.log(t("Error fetching messages:"), error);
        }
    };

    useEffect(() => {
        fetchSocialLinks();
        fetchContactInfo();
        fetchFaqs();
        fetchMessages();
    }, []);

    // Common modal handlers
    const closeModal = () => {
        setSocialModal(false);
        setContactModal(false);
        setFaqModal(false);
        setMessageModal(false);
        setEditingSocial(null);
        setEditingContact(null);
        setEditingFaq(null);
        setSelectedMessage(null);
        setErrors({});
        setNewSocial({ platform: "", url: "", icon: "", name_ar: "", name_en: "", name_tr: "" });
        setNewContact({ type: "", value_ar: "", value_en: "", value_tr: "", icon: "", title_ar: "", title_en: "", title_tr: "" });
        setNewFaq({ question_ar: "", question_en: "", question_tr: "", answer_ar: "", answer_en: "", answer_tr: "" });
    };

    // Social Links handlers
    const handleAddSocial = () => setSocialModal(true);

    const handleEditSocial = (social) => {
        setEditingSocial(social);
        setNewSocial({
            platform: social.platform,
            url: social.url,
            icon: social.icon,
            name_ar: social.name_ar || "",
            name_en: social.name_en || "",
            name_tr: social.name_tr || ""
        });
        setSocialModal(true);
    };

    const handleSaveSocial = async () => {
        try {
            if (editingSocial) {
                await axios.post(`${app_url}/social-links/${editingSocial.id}`, newSocial);
            } else {
                await axios.post(`${app_url}/social-links`, newSocial);
            }
            closeModal();
            fetchSocialLinks();
        } catch (error) {
            setErrors(error.response?.data?.errors || {});
        }
    };

    const handleDeleteSocial = async (social) => {
        if (window.confirm(t("هل أنت متأكد من حذف رابط التواصل هذا؟"))) {
            try {
                await axios.delete(`${app_url}/social-links/${social.id}`);
                fetchSocialLinks();
            } catch (error) {
                console.log(t("Error deleting social link:"), error);
            }
        }
    };

    // Contact Info handlers
    const handleAddContact = () => setContactModal(true);

    const handleEditContact = (contact) => {
        setEditingContact(contact);
        setNewContact({
            type: contact.type,
            value_ar: contact.value_ar || "",
            value_en: contact.value_en || "",
            value_tr: contact.value_tr || "",
            icon: contact.icon,
            title_ar: contact.title_ar || "",
            title_en: contact.title_en || "",
            title_tr: contact.title_tr || ""
        });
        setContactModal(true);
    };

    const handleSaveContact = async () => {
        try {
            if (editingContact) {
                await axios.post(`${app_url}/contact-info/${editingContact.id}`, newContact);
            } else {
                await axios.post(`${app_url}/contact-info`, newContact);
            }
            closeModal();
            fetchContactInfo();
        } catch (error) {
            setErrors(error.response?.data?.errors || {});
        }
    };

    const handleDeleteContact = async (contact) => {
        if (window.confirm(t("هل أنت متأكد من حذف معلومات الاتصال هذه؟"))) {
            try {
                await axios.delete(`${app_url}/contact-info/${contact.id}`);
                fetchContactInfo();
            } catch (error) {
                console.log(t("Error deleting contact info:"), error);
            }
        }
    };

    // FAQ handlers
    const handleAddFaq = () => setFaqModal(true);

    const handleEditFaq = (faq) => {
        setEditingFaq(faq);
        setNewFaq({
            question_ar: faq.question_ar || "",
            question_en: faq.question_en || "",
            question_tr: faq.question_tr || "",
            answer_ar: faq.answer_ar || "",
            answer_en: faq.answer_en || "",
            answer_tr: faq.answer_tr || ""
        });
        setFaqModal(true);
    };

    const handleSaveFaq = async () => {
        try {
            if (editingFaq) {
                await axios.post(`${app_url}/contact-faqs/${editingFaq.id}`, newFaq);
            } else {
                await axios.post(`${app_url}/contact-faqs`, newFaq);
            }
            closeModal();
            fetchFaqs();
        } catch (error) {
            setErrors(error.response?.data?.errors || {});
        }
    };

    const handleDeleteFaq = async (faq) => {
        if (window.confirm(t("هل أنت متأكد من حذف هذا السؤال؟"))) {
            try {
                await axios.delete(`${app_url}/contact-faqs/${faq.id}`);
                fetchFaqs();
            } catch (error) {
                console.log(t("Error deleting FAQ:"), error);
            }
        }
    };

    // Message handlers
    const handleViewMessage = (message) => {
        setSelectedMessage(message);
        setMessageModal(true);
    };

    const handleDeleteMessage = async (message) => {
        if (window.confirm(t("هل أنت متأكد من حذف هذه الرسالة؟"))) {
            try {
                await axios.delete(`${app_url}/contact-messages/${message.id}`);
                fetchMessages();
            } catch (error) {
                console.log(t("Error deleting message:"), error);
            }
        }
    };

    // Pagination and search
    const getFilteredData = () => {
        let data = [];
        switch (currentTab) {
            case "social": data = socialLinks; break;
            case "contact": data = contactInfo; break;
            case "faq": data = faqs; break;
            case "messages": data = messages; break;
            default: data = [];
        }

        return data.filter(item => {
            const searchTerm = search.toLowerCase();
            return (
                (item.platform?.toLowerCase().includes(searchTerm)) ||
                (item.url?.toLowerCase().includes(searchTerm)) ||
                (item.type?.toLowerCase().includes(searchTerm)) ||
                (item.value_ar?.toLowerCase().includes(searchTerm)) ||
                (item.value_en?.toLowerCase().includes(searchTerm)) ||
                (item.value_tr?.toLowerCase().includes(searchTerm)) ||
                (item.title_ar?.toLowerCase().includes(searchTerm)) ||
                (item.title_en?.toLowerCase().includes(searchTerm)) ||
                (item.title_tr?.toLowerCase().includes(searchTerm)) ||
                (item.question_ar?.toLowerCase().includes(searchTerm)) ||
                (item.question_en?.toLowerCase().includes(searchTerm)) ||
                (item.question_tr?.toLowerCase().includes(searchTerm)) ||
                (item.answer_ar?.toLowerCase().includes(searchTerm)) ||
                (item.answer_en?.toLowerCase().includes(searchTerm)) ||
                (item.answer_tr?.toLowerCase().includes(searchTerm)) ||
                (item.full_name?.toLowerCase().includes(searchTerm)) ||
                (item.email?.toLowerCase().includes(searchTerm)) ||
                (item.phone?.toLowerCase().includes(searchTerm)) ||
                (item.service_type?.toLowerCase().includes(searchTerm)) ||
                (item.message?.toLowerCase().includes(searchTerm))
            );
        });
    };

    const filteredData = getFilteredData();
    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // Language switcher component
    const LanguageSwitcher = () => (
        <div className="flex items-center space-x-2 mb-4">
            <LanguageIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t("اللغة:")}</span>
            <div className="flex space-x-1">
                {languageOptions.map((lang) => (
                    <button
                        key={lang.value}
                        onClick={() => setCurrentLang(lang.value)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                            currentLang === lang.value
                                ? "bg-primary text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                        }`}
                    >
                        <span className="mr-1">{lang.flag}</span>
                        {lang.label}
                    </button>
                ))}
            </div>
        </div>
    );

    // Render functions for each table
    const renderSocialTable = () => (
        <div className="overflow-x-auto">
            <table className="min-w-full table-fixed">

                <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
                    <tr>
                        <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">#</th>
                        <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("المنصة")}</th>
                        <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("الرابط")}</th>
                        <th className="px-4 py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("الإجراءات")}</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {currentItems.map((social, idx) => (
                        <tr key={social.id} className={`transition-colors duration-200 ${idx % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700"} hover:bg-gray-100 dark:hover:bg-gray-600`}>
                            <td className="px-4 py-3 text-right text-gray-500 dark:text-gray-400">{idx + 1 + (currentPage - 1) * rowsPerPage}</td>
                            <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200 font-medium">
                                    {social.platform}
                               
                            </td>
                            <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-300">
                                <a href={social.url} target="_blank" rel="noopener noreferrer" >
                                    {social.url}
                                </a>
                            </td>
                            <td className="px-4 py-3 text-xs font-semibold text-gray-600 dark:text-gray-300 text-center">
                                <div className="flex justify-center space-x-2">
                                    <button onClick={() => handleEditSocial(social)} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors">
                                        <PencilIcon className="h-4 w-4" />
                                    </button>
                                    <button onClick={() => handleDeleteSocial(social)} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors">
                                        <TrashIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {filteredData.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">{t("لا توجد بيانات لعرضها")}</div>
            )}
        </div>
    );

    const renderContactTable = () => (
        <div className="overflow-x-auto">
            <table className="min-w-full table-fixed">
                <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
                    <tr>
                        <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">#</th>
                        <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("النوع")}</th>
                        <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("القيمة بالعربى")}</th>
                        <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("القيمة بالانجليزى")}</th>
                        <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("القيمة بالتركى")}</th>
                        <th className="px-4 py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("الإجراءات")}</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {currentItems.map((contact, idx) => (
                        <tr key={contact.id} className={`transition-colors duration-200 ${idx % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700"} hover:bg-gray-100 dark:hover:bg-gray-600`}>
                            <td className="px-4 py-3 text-right text-gray-500 dark:text-gray-400">{idx + 1 + (currentPage - 1) * rowsPerPage}</td>
                            <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-300">
                                
                                   {contact.type} 
                            </td>
                            <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-300">
                                {contact.value_ar}
                            </td>
                            <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-300">
                                {contact.value_en}
                            </td>
                            <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-300">
                                {contact.value_tr}
                            </td>
                            <td className="px-4 py-3 text-xs font-semibold text-gray-600 dark:text-gray-300 text-center">
                                <div className="flex justify-center space-x-2">
                                    <button onClick={() => handleEditContact(contact)} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors">
                                        <PencilIcon className="h-4 w-4" />
                                    </button>
                                    <button onClick={() => handleDeleteContact(contact)} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors">
                                        <TrashIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {filteredData.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">{t("لا توجد بيانات لعرضها")}</div>
            )}
        </div>
    );

    const renderFaqTable = () => (
        <div className="overflow-x-auto">
            <table className="min-w-full table-fixed">
                <colgroup>
                    <col className="w-16" />
                    <col className="w-2/5" />
                    <col className="w-2/5" />
                    <col className="w-1/5" />
                </colgroup>
                <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
                    <tr>
                        <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">#</th>
                        <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("السؤال بالعربى")}</th>
                        <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("السؤال بالانجليزى")}</th>
                        <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("السؤال بالتركى")}</th>
                        <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("الإجابة بالعربى")}</th>
                        <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("الإجابة بالانجليزى")}</th>
                        <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("الإجابة بالتركى")}</th>
                        <th className="px-4 py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("الإجراءات")}</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {currentItems.map((faq, idx) => (
                        <tr key={faq.id} className={`transition-colors duration-200 ${idx % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700"} hover:bg-gray-100 dark:hover:bg-gray-600`}>
                            <td className="px-4 py-3 text-right text-gray-500 dark:text-gray-400">{idx + 1 + (currentPage - 1) * rowsPerPage}</td>
                            <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200 font-medium">
                                {faq.question_ar}
                            </td>
                            <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200 font-medium">
                                {faq.question_en}
                            </td>
                            <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200 font-medium">
                                {faq.question_tr}
                            </td>
                            <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-300 truncate max-w-xs">
                                {faq.answer_ar}
                            </td>
                             <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-300 truncate max-w-xs">
                                {faq.answer_en}
                            </td>
                            <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-300 truncate max-w-xs">
                                {faq.answer_tr}
                            </td>
                            <td className="px-4 py-3 text-xs font-semibold text-gray-600 dark:text-gray-300 text-center">
                                <div className="flex justify-center space-x-2">
                                    <button onClick={() => handleEditFaq(faq)} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors">
                                        <PencilIcon className="h-4 w-4" />
                                    </button>
                                    <button onClick={() => handleDeleteFaq(faq)} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors">
                                        <TrashIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {filteredData.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">{t("لا توجد بيانات لعرضها")}</div>
            )}
        </div>
    );

    const renderMessagesTable = () => (
        <div className="overflow-x-auto">
            <table className="min-w-full table-fixed">
                <colgroup>
                    <col className="w-16" />
                    <col className="w-1/6" />
                    <col className="w-1/6" />
                    <col className="w-1/6" />
                    <col className="w-1/6" />
                    <col className="w-1/6" />
                    <col className="w-1/6" />
                </colgroup>
                <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
                    <tr>
                        <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">#</th>
                        <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("الاسم الكامل")}</th>
                        <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("البريد الإلكتروني")}</th>
                        <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("رقم الهاتف")}</th>
                        <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("نوع الخدمة")}</th>
                        <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("الرسالة")}</th>
                        <th className="px-4 py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("الإجراءات")}</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {currentItems.map((message, idx) => (
                        <tr key={message.id} className={`transition-colors duration-200 ${idx % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700"} hover:bg-gray-100 dark:hover:bg-gray-600`}>
                            <td className="px-4 py-3 text-right text-gray-500 dark:text-gray-400">{idx + 1 + (currentPage - 1) * rowsPerPage}</td>
                            <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200 font-medium">{message.full_name}</td>
                            <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-300">{message.email}</td>
                            <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-300">{message.phone}</td>
                            <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-300">{message.service_type}</td>
                            <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-300 truncate max-w-xs">{message.message}</td>
                            <td className="px-4 py-3 text-xs font-semibold text-gray-600 dark:text-gray-300 text-center">
                                <div className="flex justify-center space-x-2">
                                    <button onClick={() => handleViewMessage(message)} className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900 rounded-lg transition-colors">
                                        <EyeIcon className="h-4 w-4" />
                                    </button>
                                    <button onClick={() => handleDeleteMessage(message)} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors">
                                        <TrashIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {filteredData.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">{t("لا توجد بيانات لعرضها")}</div>
            )}
        </div>
    );

    // Render current table based on active tab
    const renderCurrentTable = () => {
        switch (currentTab) {
            case "social": return renderSocialTable();
            case "contact": return renderContactTable();
            case "faq": return renderFaqTable();
            case "messages": return renderMessagesTable();
            default: return null;
        }
    };

    // Get add button handler based on current tab
    const getAddButtonHandler = () => {
        switch (currentTab) {
            case "social": return handleAddSocial;
            case "contact": return handleAddContact;
            case "faq": return handleAddFaq;
            case "messages": return null; // No add button for messages
            default: return () => {};
        }
    };

    // Get modal title based on current tab
    const getModalTitle = () => {
        switch (currentTab) {
            case "social": return editingSocial ? t("تعديل رابط التواصل") : t("إضافة رابط تواصل جديد");
            case "contact": return editingContact ? t("تعديل معلومات الاتصال") : t("إضافة معلومات اتصال جديدة");
            case "faq": return editingFaq ? t("تعديل السؤال") : t("إضافة سؤال جديد");
            case "messages": return t("تفاصيل الرسالة");
            default: return "";
        }
    };

    // Render language tabs for forms
    const renderLanguageTabs = () => (
        <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
                {languageOptions.map((lang) => (
                    <button
                        key={lang.value}
                        onClick={() => setCurrentLang(lang.value)}
                        className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                            currentLang === lang.value
                                ? "border-primary text-primary"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                    >
                        <span className="mr-1">{lang.flag}</span>
                        {lang.label}
                    </button>
                ))}
            </nav>
        </div>
    );

    // Render modal based on current tab
    const renderModal = () => {
        if (!socialModal && !contactModal && !faqModal && !messageModal) return null;

        let formFields = null;
        let formData = {};
        let setFormData = () => {};
        let handleSave = () => {};

        switch (currentTab) {
            case "social":
                formData = newSocial;
                setFormData = setNewSocial;
                handleSave = handleSaveSocial;
                formFields = (
                    <>
                        {renderLanguageTabs()}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("المنصة")}</label>
                            <select
                                value={formData.platform}
                                onChange={(e) => {
                                    const selectedPlatform = platformOptions.find(p => p.value === e.target.value);
                                    setFormData({
                                        ...formData,
                                        platform: e.target.value,
                                        icon: selectedPlatform ? selectedPlatform.icon : ""
                                    });
                                }}
                                className="w-full px-8 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200"
                            >
                                <option value="">{t("اختر المنصة")}</option>
                                {platformOptions.map(platform => (
                                    <option key={platform.value} value={platform.value}>
                                        {platform.label}
                                    </option>
                                ))}
                            </select>
                            {errors.platform && <p className="text-red-500 text-xs mt-1">{errors.platform[0]}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {t("الاسم")} ({languageOptions.find(l => l.value === currentLang)?.label})
                            </label>
                            <input
                                type="text"
                                value={formData[`name_${currentLang}`] || ''}
                                onChange={(e) => setFormData({...formData, [`name_${currentLang}`]: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200"
                                placeholder={t("أدخل الاسم")}
                            />
                            {errors[`name_${currentLang}`] && <p className="text-red-500 text-xs mt-1">{errors[`name_${currentLang}`][0]}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("الرابط")}</label>
                            <input
                                type="url"
                                value={formData.url}
                                onChange={(e) => setFormData({...formData, url: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200"
                                placeholder="https://"
                            />
                            {errors.url && <p className="text-red-500 text-xs mt-1">{errors.url[0]}</p>}
                        </div>
                    </>
                );
                break;
            case "contact":
                formData = newContact;
                setFormData = setNewContact;
                handleSave = handleSaveContact;
                formFields = (
                    <>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("النوع")}</label>
                            <select
                                value={formData.type}
                                onChange={(e) => {
                                    const selectedType = contactTypeOptions.find(t => t.value === e.target.value);
                                    setFormData({
                                        ...formData,
                                        type: e.target.value,
                                        icon: selectedType ? selectedType.icon : ""
                                    });
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200"
                            >
                                <option value="">{t("اختر نوع المعلومات")}</option>
                                {contactTypeOptions.map(type => (
                                    <option key={type.value} value={type.value}>
                                        {type.label}
                                    </option>
                                ))}
                            </select>
                            {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type[0]}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("القيمة بالعربى")}</label>
                            {formData.type === 'hours' ? (
                                <textarea
                                    value={formData.value_ar}
                                    onChange={(e) => setFormData({...formData, value_ar: e.target.value})}
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200"
                                    placeholder="مثال: الأحد - الخميس: 9 ص - 5 م"
                                />
                            ) : (
                                <input
                                    type="text"
                                    value={formData.value_ar}
                                    onChange={(e) => setFormData({...formData, value_ar: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200"
                                    placeholder={formData.type === 'email' ? 'example@domain.com' : formData.type === 'phone' ? '+1234567890' : ''}
                                />
                            )}
                            {errors.value_ar && <p className="text-red-500 text-xs mt-1">{errors.value_ar[0]}</p>}
                        </div>
                         <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("القيمة بالانجليزى")}</label>
                            {formData.type === 'hours' ? (
                                <textarea
                                    value={formData.value_en}
                                    onChange={(e) => setFormData({...formData, value_en: e.target.value})}
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200"
                                    placeholder="مثال: الأحد - الخميس: 9 ص - 5 م"
                                />
                            ) : (
                                <input
                                    type="text"
                                    value={formData.value_en}
                                    onChange={(e) => setFormData({...formData, value_en: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200"
                                    placeholder={formData.type === 'email' ? 'example@domain.com' : formData.type === 'phone' ? '+1234567890' : ''}
                                />
                            )}
                            {errors.value_en && <p className="text-red-500 text-xs mt-1">{errors.value_en[0]}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("القيمة بالتركى")}</label>
                            {formData.type === 'hours' ? (
                                <textarea
                                    value={formData.value_tr}
                                    onChange={(e) => setFormData({...formData, value_tr: e.target.value})}
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200"
                                    placeholder="مثال: الأحد - الخميس: 9 ص - 5 م"
                                />
                            ) : (
                                <input
                                    type="text"
                                    value={formData.value_tr}
                                    onChange={(e) => setFormData({...formData, value_tr: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200"
                                    placeholder={formData.type === 'email' ? 'example@domain.com' : formData.type === 'phone' ? '+1234567890' : ''}
                                />
                            )}
                            {errors.value_tr && <p className="text-red-500 text-xs mt-1">{errors.value_tr[0]}</p>}
                        </div>
                    </>
                );
                break;
            case "faq":
                formData = newFaq;
                setFormData = setNewFaq;
                handleSave = handleSaveFaq;
                formFields = (
                    <>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("السؤال بالعربى")}</label>
                            <input
                                type="text"
                                value={formData.question_ar}
                                onChange={(e) => setFormData({...formData, question_ar: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200"
                            />
                            {errors.question_ar && <p className="text-red-500 text-xs mt-1">{errors.question_ar[0]}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("السؤال بالانجليزى")}</label>
                            <input
                                type="text"
                                value={formData.question_en}
                                onChange={(e) => setFormData({...formData, question_en: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200"
                            />
                            {errors.question_en && <p className="text-red-500 text-xs mt-1">{errors.question_en[0]}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("السؤال بالتركى")}</label>
                            <input
                                type="text"
                                value={formData.question_tr}
                                onChange={(e) => setFormData({...formData, question_tr: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200"
                            />
                            {errors.question_tr && <p className="text-red-500 text-xs mt-1">{errors.question_tr[0]}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("الإجابة بالعربى ")}</label>
                            <textarea
                                value={formData.answer_ar}
                                onChange={(e) => setFormData({...formData, answer_ar: e.target.value})}
                                rows="4"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200"
                            />
                            {errors.answer_ar && <p className="text-red-500 text-xs mt-1">{errors.answer_ar[0]}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("الإجابة بالانجليزى")}</label>
                            <textarea
                                value={formData.answer_en}
                                onChange={(e) => setFormData({...formData, answer_en: e.target.value})}
                                rows="4"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200"
                            />
                            {errors.answer_en && <p className="text-red-500 text-xs mt-1">{errors.answer_en[0]}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("الإجابة بالتركى")}</label>
                            <textarea
                                value={formData.answer_tr}
                                onChange={(e) => setFormData({...formData, answer_tr: e.target.value})}
                                rows="4"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200"
                            />
                            {errors.answer_tr && <p className="text-red-500 text-xs mt-1">{errors.answer_tr[0]}</p>}
                        </div>
                    </>
                );
                break;
            case "messages":
                formFields = (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("الاسم الكامل")}</label>
                                <p className="text-gray-900 dark:text-gray-100 font-medium">{selectedMessage?.full_name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("البريد الإلكتروني")}</label>
                                <p className="text-gray-900 dark:text-gray-100">{selectedMessage?.email}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("رقم الهاتف")}</label>
                                <p className="text-gray-900 dark:text-gray-100">{selectedMessage?.phone}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("نوع الخدمة")}</label>
                                <p className="text-gray-900 dark:text-gray-100">{selectedMessage?.service_type}</p>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("الرسالة")}</label>
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                <p className="text-gray-900 dark:text-gray-100 whitespace-pre-line">{selectedMessage?.message}</p>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("تاريخ الإرسال")}</label>
                            <p className="text-gray-900 dark:text-gray-100">{selectedMessage?.created_at}</p>
                        </div>
                    </div>
                );
                break;
            default:
                return null;
        }

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-2xl ${currentTab === 'messages' ? 'max-w-2xl' : 'max-w-md'} w-full max-h-[90vh] overflow-y-auto`}>
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">{getModalTitle()}</h3>
                        <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="p-6">
                        {formFields}
                    </div>
                    {currentTab !== 'messages' && (
                        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-3">
                            <button onClick={closeModal} className="flex-1 px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors">
                                {t("إلغاء")}
                            </button>
                            <button onClick={handleSave} className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                                {t("حفظ")}
                            </button>
                        </div>
                    )}
                    {currentTab === 'messages' && (
                        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-3">
                            <button onClick={closeModal} className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                                {t("إغلاق")}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <AdminLayout>
            <div className="mx-3 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-10">
                <div className="flex justify-between gap-4 mb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{t("إدارة صفحة تواصل معنا")}</h3>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">

                        <div className="flex flex-wrap gap-2">
                            {getAddButtonHandler() && (
                                <button onClick={getAddButtonHandler()} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors">
                                    <PlusIcon className="h-4 w-4 ml-1.5" />
                                    {t("إضافة")}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
                    <nav className="-mb-px flex space-x-8 overflow-x-auto">
                        {[
                            { id: "social", label: t("روابط التواصل") },
                            { id: "contact", label: t("معلومات الاتصال") },
                            { id: "faq", label: t("الأسئلة الشائعة") },
                            { id: "messages", label: t("الرسائل المرسلة") }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => {
                                    setCurrentTab(tab.id);
                                    setCurrentPage(1);
                                    setSearch("");
                                }}
                                className={`py-2 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                                    currentTab === tab.id
                                        ? "border-primary text-primary"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Table */}
                {renderCurrentTable()}

                {/* Pagination */}
                {filteredData.length > rowsPerPage && (
                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded disabled:opacity-50 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                            {t("السابق")}
                        </button>
                        <span className="text-gray-700 dark:text-gray-300">
                            {t("صفحة")} {currentPage} {t("من")} {Math.ceil(filteredData.length / rowsPerPage)}
                        </span>
                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === Math.ceil(filteredData.length / rowsPerPage)}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded disabled:opacity-50 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                            {t("التالي")}
                        </button>
                    </div>
                )}

                {/* Modal */}
                {renderModal()}
            </div>
        </AdminLayout>
    );
}
