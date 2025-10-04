
import React, { useState, useEffect } from "react";
import AdminLayout from "./layout";
import axios from "axios";
import { usePage } from "@inertiajs/react";
import {
    XMarkIcon,
    PlusIcon,
    PencilIcon,
    TrashIcon,
    ChevronDownIcon,
    ChevronUpIcon
} from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

export default function Services() {
    const { app_url, auth } = usePage().props;
    const { t } = useTranslation();
    const [imagePreview, setImagePreview] = useState(null);
    // States for Services
    const [services, setServices] = useState([]);
    const [servicesModal, setServicesModal] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [newService, setNewService] = useState({
        name_ar: "",
        name_en: "",
        name_tr: "", 
        description_ar: "",
        description_en: "",
        description_tr: "",
        icon: null
    });

    // States for Marketing Services
    const [marketingServices, setMarketingServices] = useState([]);
    const [marketingModal, setMarketingModal] = useState(false);
    const [editingMarketing, setEditingMarketing] = useState(null);
    const [newMarketing, setNewMarketing] = useState({
        name_ar: "",
        name_en: "",
        name_tr: "",
        description_ar: "",
        description_en: "",
        description_tr: "",
        image: null
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
        answer_tr: "",
    });

    const [errors, setErrors] = useState({});
    const [currentTab, setCurrentTab] = useState("services");
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedFaqs, setExpandedFaqs] = useState({});
    const rowsPerPage = 10;

    // Fetch data functions
    const fetchServices = async () => {
        try {
            const response = await axios.get(`${app_url}/services`);
            setServices(response.data.services || []);
        } catch (error) {
            console.log(t("Error fetching services:"), error);
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
    }, []);

        const handleImageChange = (e, setFormData, formData) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({...formData, image: file});

            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };
    // Common modal handlers
    const closeModal = () => {
        setServicesModal(false);
        setMarketingModal(false);
        setFaqModal(false);
        setEditingService(null);
        setEditingMarketing(null);
        setEditingFaq(null);
        setErrors({});
        setNewService({
            name_ar: "",
            name_en: "",
            name_tr: "",
            description_ar: "",
            description_en: "",
            description_tr: "",
            icon: null
        });
        setNewMarketing({
            name_ar: "",
            name_en: "",
            name_tr: "",
            description_ar: "",
            description_en: "",
            description_tr: "",
            image: null
        });
        setNewFaq({
            question_ar: "",
            question_en: "",
            question_tr: "",
            answer_ar: "",
            answer_en: "",
            answer_tr: ""
        });
    };

    // Services handlers
    const handleAddService = () => setServicesModal(true);

    const handleEditService = (service) => {
        setEditingService(service);
        setNewService({
            name_ar: service.name_ar,
            name_en: service.name_en,
            name_tr: service.name_tr,
            description_ar: service.description_ar,
            description_en: service.description_en,
            description_tr: service.description_tr,
            image: service.image||null
        });
        setImagePreview(service.image || null);
        setServicesModal(true);
    };

    const handleSaveService = async () => {
        try {
            const formData = new FormData();
            formData.append('name_ar', newService.name_ar);
            formData.append('name_en', newService.name_en);
            formData.append('name_tr', newService.name_tr);
            formData.append('description_ar', newService.description_ar);
            formData.append('description_en', newService.description_en);
            formData.append('description_tr', newService.description_tr);
            if (newService.image) {
                formData.append('image', newService.image);
            }

            if (editingService) {
                await axios.post(`${app_url}/services/${editingService.id}`, formData);
            } else {
                await axios.post(`${app_url}/services`, formData);
            }
            closeModal();
            fetchServices();
        } catch (error) {
            setErrors(error.response?.data?.errors || {});
            console.log(error);
        }
    };

    const handleDeleteService = async (service) => {
        if (window.confirm(t("هل أنت متأكد من حذف هذه الخدمة؟"))) {
            try {
                await axios.delete(`${app_url}/services/${service.id}`);
                fetchServices();
            } catch (error) {
                console.log(t("Error deleting service:"), error);
            }
        }
    };

    // Marketing Services handlers
    const handleAddMarketing = () => setMarketingModal(true);

    const handleEditMarketing = (service) => {
        setEditingMarketing(service);
        setNewMarketing({
            name_ar: service.name_ar || "",
            name_en: service.name_en || "",
            name_tr: service.name_tr || "",
            description_ar: service.description_ar || "",
            description_en: service.description_en || "",
            description_tr: service.description_tr || "",
            image: null
        });
        setMarketingModal(true);
    };

    const handleSaveMarketing = async () => {
        try {
            const formData = new FormData();
            formData.append('name_ar', newMarketing.name_ar);
            formData.append('name_en', newMarketing.name_en);
            formData.append('name_tr', newMarketing.name_tr);
            formData.append('description_ar', newMarketing.description_ar);
            formData.append('description_en', newMarketing.description_en);
            formData.append('description_tr', newMarketing.description_tr);
            if (newMarketing.image) {
                formData.append('image', newMarketing.image);
            }

            if (editingMarketing) {
                await axios.post(`${app_url}/marketing-services/${editingMarketing.id}`, formData);
            } else {
                await axios.post(`${app_url}/marketing-services`, formData);
            }
            closeModal();
            fetchMarketingServices();
        } catch (error) {
            setErrors(error.response?.data?.errors || {});
        }
    };

    const handleDeleteMarketing = async (service) => {
        if (window.confirm(t("هل أنت متأكد من حذف خدمة التسويق هذه؟"))) {
            try {
                await axios.delete(`${app_url}/marketing-services/${service.id}`);
                fetchMarketingServices();
            } catch (error) {
                console.log(t("Error deleting marketing service:"), error);
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
                await axios.post(`${app_url}/faqs/${editingFaq.id}`, newFaq);
            } else {
                await axios.post(`${app_url}/faqs`, newFaq);
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
                await axios.delete(`${app_url}/faqs/${faq.id}`);
                fetchFaqs();
            } catch (error) {
                console.log(t("Error deleting FAQ:"), error);
            }
        }
    };

    // Toggle FAQ expansion
    const toggleFaq = (id) => {
        setExpandedFaqs(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const getFilteredData = () => {
        let data = [];
        switch (currentTab) {
            case "services": data = services; break;
            case "marketing": data = marketingServices; break;
            case "faq": data = faqs; break;
            default: data = [];
        }

        if (!search.trim()) return data;

        return data.filter(item => {
            const searchTerm = search.toLowerCase();
            return (
                (item.name_ar || '').toLowerCase().includes(searchTerm) ||
                (item.name_en || '').toLowerCase().includes(searchTerm) ||
                (item.name_tr || '').toLowerCase().includes(searchTerm) ||
                (item.title_ar || '').toLowerCase().includes(searchTerm) ||
                (item.title_en || '').toLowerCase().includes(searchTerm) ||
                (item.title_tr || '').toLowerCase().includes(searchTerm) ||
                (item.question_ar || '').toLowerCase().includes(searchTerm) ||
                (item.question_en || '').toLowerCase().includes(searchTerm) ||
                (item.question_tr || '').toLowerCase().includes(searchTerm) ||
                (item.description_ar || '').toLowerCase().includes(searchTerm) ||
                (item.description_en || '').toLowerCase().includes(searchTerm) ||
                (item.description_tr || '').toLowerCase().includes(searchTerm) ||
                (item.answer_ar || '').toLowerCase().includes(searchTerm) ||
                (item.answer_en || '').toLowerCase().includes(searchTerm) ||
                (item.answer_tr || '').toLowerCase().includes(searchTerm)
            );
        });
    };

    const filteredData = getFilteredData();
    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // Render functions for each table
    const renderServicesTable = () => (
        <div  className="overflow-x-auto rounded-lg shadow-md transition-all duration-300">
            <table className="min-w-full table-fixed">
                <thead className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-800 sticky top-0 z-10">
                    <tr>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">#</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t("العنوان بالعربى")}</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t("العنوان بالانجليزى")}</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t("العنوان بالتركى")}</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t("الوصف بالعربى")}</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t("الوصف بالانجليزى")}</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t("الوصف بالتركى")}</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t("الأيقونة")}</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t("الإجراءات")}</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {currentItems.map((service, idx) => (
                        <tr key={service.id} className={`transition-colors duration-200 ${idx % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700"} hover:bg-gray-100 dark:hover:bg-gray-600`}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{idx + 1 + (currentPage - 1) * rowsPerPage}</td>
                            <td className="px-3 py-3 text-center text-sm text-gray-500 dark:text-gray-400">{service.name_ar}</td>
                            <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-300">{service.name_en}</td>
                            <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-300">{service.name_tr}</td>
                            <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-300">{service.description_ar}</td>
                            <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-300">{service.description_en}</td>
                            <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-300">{service.description_tr}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                {service.image && (
                                    <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                                        <img src={`${app_url}/storage/${service.image}`} alt="service icon" className="w-6 h-6 object-contain"/>
                                    </div>
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                                <div className="flex justify-center space-x-2">
                                    <button
                                        onClick={() => handleEditService(service)}
                                        className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                        title={t("تعديل")}
                                    >
                                        <PencilIcon className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteService(service)}
                                        className="text-red-600 hover:text-red-900 dark:hover:text-red-400 transition-colors p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                                        title={t("حذف")}
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {filteredData.length === 0 && (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <div className="text-4xl mb-2">📋</div>
                    <p>{t("لا توجد خدمات لعرضها")}</p>
                </div>
            )}
        </div>
    );

    const renderMarketingTable = () => (
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">#</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t("الاسم بالعربى")}</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t("الاسم بالانجليزى")}</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t("الاسم بالتركى")}</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t("الوصف بالعربى")}</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t("الوصف بالانجليزى")}</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t("الوصف بالتركى")}</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t("الصورة")}</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t("الإجراءات")}</th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                    {currentItems.map((service, idx) => (
                        <tr key={service.id} className={`transition-colors duration-200 ${idx % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700"} hover:bg-gray-100 dark:hover:bg-gray-600`}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{idx + 1 + (currentPage - 1) * rowsPerPage}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{service.name_ar}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{service.name_en}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{service.name_tr}</td>
                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">{service.description_ar}</td>
                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">{service.description_en}</td>
                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">{service.description_tr}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                {service.image && (
                                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center overflow-hidden">
                                        <img src={`${app_url}/storage/${service.image}`} alt="service image" className="w-full h-full object-cover"/>
                                    </div>
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                                <div className="flex justify-center space-x-2">
                                    <button
                                        onClick={() => handleEditMarketing(service)}
                                        className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                        title={t("تعديل")}
                                    >
                                        <PencilIcon className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteMarketing(service)}
                                        className="text-red-600 hover:text-red-900 dark:hover:text-red-400 transition-colors p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                                        title={t("حذف")}
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {filteredData.length === 0 && (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <div className="text-4xl mb-2"></div>
                    <p>{t("لا توجد خدمات تسويق لعرضها")}</p>
                </div>
            )}
        </div>
    );

    const renderFaqTable = () => (
        <div className="space-y-4">
            {currentItems.map((faq, idx) => (
                <div key={faq.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div
                        className="p-4 flex justify-between items-center cursor-pointer dark:hover:bg-gray-750 transition-colors"
                        onClick={() => toggleFaq(faq.id)}
                    >
                        <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mr-3">{idx + 1 + (currentPage - 1) * rowsPerPage}</span>
                            <div className="space-y-1">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100"><strong>ar : </strong> {faq.question_ar}</h3>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100"><strong>en : </strong> {faq.question_en}</h3>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100"><strong>tr : </strong> {faq.question_tr}</h3>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditFaq(faq);
                                }}
                                className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                title={t("تعديل")}
                            >
                                <PencilIcon className="h-4 w-4" />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteFaq(faq);
                                }}
                                className="text-red-600 hover:text-red-900 dark:hover:text-red-400 transition-colors p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                                title={t("حذف")}
                            >
                                <TrashIcon className="h-4 w-4" />
                            </button>
                            {expandedFaqs[faq.id] ? (
                                <ChevronUpIcon className="h-5 w-5 text-gray-400" />
                            ) : (
                                <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                            )}
                        </div>
                    </div>
                    {expandedFaqs[faq.id] && (
                        <div className="px-4 pb-4">
                            <div className="pl-7 border-l-2 border-primary space-y-2">
                                <p className="text-gray-600 dark:text-gray-300"><strong>ar : </strong> {faq.answer_ar}</p>
                                <p className="text-gray-600 dark:text-gray-300"><strong>en : </strong> {faq.answer_en}</p>
                                <p className="text-gray-600 dark:text-gray-300"><strong>tr : </strong> {faq.answer_tr}</p>
                            </div>
                        </div>
                    )}
                </div>
            ))}
            {filteredData.length === 0 && (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <div className="text-4xl mb-2"></div>
                    <p>{t("لا توجد أسئلة شائعة لعرضها")}</p>
                </div>
            )}
        </div>
    );

    // Render current table based on active tab
    const renderCurrentTable = () => {
        switch (currentTab) {
            case "services": return renderServicesTable();
            case "marketing": return renderMarketingTable();
            case "faq": return renderFaqTable();
            default: return null;
        }
    };

    // Get add button handler based on current tab
    const getAddButtonHandler = () => {
        switch (currentTab) {
            case "services": return handleAddService;
            case "marketing": return handleAddMarketing;
            case "faq": return handleAddFaq;
            default: return () => {};
        }
    };

    // Get modal title based on current tab
    const getModalTitle = () => {
        switch (currentTab) {
            case "services": return editingService ? t("تعديل الخدمة") : t("إضافة خدمة جديدة");
            case "marketing": return editingMarketing ? t("تعديل خدمة التسويق") : t("إضافة خدمة تسويق جديدة");
            case "faq": return editingFaq ? t("تعديل السؤال") : t("إضافة سؤال جديد");
            default: return "";
        }
    };

    // Render modal based on current tab
    const renderModal = () => {
        if (!servicesModal && !marketingModal && !faqModal) return null;

        let formFields = null;
        let formData = {};
        let setFormData = () => {};
        let handleSave = () => {};

        switch (currentTab) {
            case "services":
                formData = newService;
                setFormData = setNewService;
                handleSave = handleSaveService;
                formFields = (
                    <>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("الاسم بالعربى")}</label>
                            <input
                                type="text"
                                value={formData.name_ar}
                                onChange={(e) => setFormData({...formData, name_ar: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            {errors.name_ar && <p className="text-red-500 text-xs mt-1 animate-pulse">{errors.name_ar[0]}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("الاسم بالانجليزى")}</label>
                            <input
                                type="text"
                                value={formData.name_en}
                                onChange={(e) => setFormData({...formData, name_en: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            {errors.name_en && <p className="text-red-500 text-xs mt-1 animate-pulse">{errors.name_en[0]}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("الاسم بالتركى")}</label>
                            <input
                                type="text"
                                value={formData.name_tr}
                                onChange={(e) => setFormData({...formData, name_tr: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            {errors.name_tr && <p className="text-red-500 text-xs mt-1 animate-pulse">{errors.name_tr[0]}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("الوصف بالعربى")}</label>
                            <textarea
                                value={formData.description_ar}
                                onChange={(e) => setFormData({...formData, description_ar: e.target.value})}
                                rows="3"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            {errors.description_ar && <p className="text-red-500 text-xs mt-1 animate-pulse">{errors.description_ar[0]}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("الوصف بالانجليزى")}</label>
                            <textarea
                                value={formData.description_en}
                                onChange={(e) => setFormData({...formData, description_en: e.target.value})}
                                rows="3"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            {errors.description_en && <p className="text-red-500 text-xs mt-1 animate-pulse">{errors.description_en[0]}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("الوصف بالتركى")}</label>
                            <textarea
                                value={formData.description_tr}
                                onChange={(e) => setFormData({...formData, description_tr: e.target.value})}
                                rows="3"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            {errors.description_tr && <p className="text-red-500 text-xs mt-1 animate-pulse">{errors.description_tr[0]}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("الصورة")}</label>
                            {imagePreview && (
                                <div className="mb-2 relative group">
                                    <img src={imagePreview} alt="Preview" className="w-20 h-20 rounded-lg object-cover shadow-md" />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setImagePreview(null);
                                            setFormData({...formData, image: null});
                                        }}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    >
                                        <XMarkIcon className="h-3 w-3" />
                                    </button>
                                </div>
                            )}
                            <input
                                type="file"
                                onChange={(e) => handleImageChange(e, setFormData, formData)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            {errors.image && <p className="text-red-500 text-xs mt-1 animate-pulse">{errors.image[0]}</p>}
                        </div>
                    </>
                );
                break;
            case "marketing":
                formData = newMarketing;
                setFormData = setNewMarketing;
                handleSave = handleSaveMarketing;
                formFields = (
                    <>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("اسم خدمة التسويق بالعربى")}</label>
                            <input
                                type="text"
                                value={formData.name_ar}
                                onChange={(e) => setFormData({...formData, name_ar: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                                placeholder={t("أدخل اسم خدمة التسويق بالعربى")}
                            />
                            {errors.name_ar && <p className="text-red-500 text-xs mt-1">{errors.name_ar[0]}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("اسم خدمة التسويق بالانجليزى")}</label>
                            <input
                                type="text"
                                value={formData.name_en}
                                onChange={(e) => setFormData({...formData, name_en: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                                placeholder={t("أدخل اسم خدمة التسويق بالنجليزى")}
                            />
                            {errors.name_en && <p className="text-red-500 text-xs mt-1">{errors.name_en[0]}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("اسم خدمة التسويق بالتركى ")}</label>
                            <input
                                type="text"
                                value={formData.name_tr}
                                onChange={(e) => setFormData({...formData, name_tr: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                                placeholder={t("أدخل اسم خدمة التسويق بالتركى")}
                            />
                            {errors.name_tr && <p className="text-red-500 text-xs mt-1">{errors.name_tr[0]}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("وصف خدمة التسويق بالعربى")}</label>
                            <textarea
                                value={formData.description_ar}
                                onChange={(e) => setFormData({...formData, description_ar: e.target.value})}
                                rows="4"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                                placeholder={t("أدخل وصف خدمة التسويق بالعربى")}
                            />
                            {errors.description_ar && <p className="text-red-500 text-xs mt-1">{errors.description_ar[0]}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("وصف خدمة التسويق بالانجليزى")}</label>
                            <textarea
                                value={formData.description_en}
                                onChange={(e) => setFormData({...formData, description_en: e.target.value})}
                                rows="4"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                                placeholder={t("أدخل وصف خدمة التسويق بالانجليزى")}
                            />
                            {errors.description_en && <p className="text-red-500 text-xs mt-1">{errors.description_en[0]}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("وصف خدمة التسويق بالتركى")}</label>
                            <textarea
                                value={formData.description_tr}
                                onChange={(e) => setFormData({...formData, description_tr: e.target.value})}
                                rows="4"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                                placeholder={t("أدخل وصف خدمة التسويق بالتركى")}
                            />
                            {errors.description_tr && <p className="text-red-500 text-xs mt-1">{errors.description_tr[0]}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("صورة خدمة التسويق ")}</label>
                            <input
                                type="file"
                                onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                                accept="image/*"
                            />
                            {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image[0]}</p>}
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                                placeholder={t("أدخل السؤال بالعربى")}
                            />
                            {errors.question_ar && <p className="text-red-500 text-xs mt-1">{errors.question_ar[0]}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("السؤال بالانجليزى")}</label>
                            <input
                                type="text"
                                value={formData.question_en}
                                onChange={(e) => setFormData({...formData, question_en: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                                placeholder={t("أدخل السؤال بالانجليزى")}
                            />
                            {errors.question_en && <p className="text-red-500 text-xs mt-1">{errors.question_en[0]}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("السؤال بالتركى")}</label>
                            <input
                                type="text"
                                value={formData.question_tr}
                                onChange={(e) => setFormData({...formData, question_tr: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                                placeholder={t("أدخل السؤال بالتركي")}
                            />
                            {errors.question_tr && <p className="text-red-500 text-xs mt-1">{errors.question_tr[0]}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("الجواب بالعربى")}</label>
                            <textarea
                                value={formData.answer_ar}
                                onChange={(e) => setFormData({...formData, answer_ar: e.target.value})}
                                rows="5"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                                placeholder={t("أدخل الجواب بالعربى")}
                            />
                            {errors.answer_ar && <p className="text-red-500 text-xs mt-1">{errors.answer_ar[0]}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("الجواب بالانجليزى")}</label>
                            <textarea
                                value={formData.answer_en}
                                onChange={(e) => setFormData({...formData, answer_en: e.target.value})}
                                rows="5"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                                placeholder={t("أدخل الجواب بالانجليزى")}
                            />
                            {errors.answer_en && <p className="text-red-500 text-xs mt-1">{errors.answer_en[0]}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("الجواب بالتركى")}</label>
                            <textarea
                                value={formData.answer_tr}
                                onChange={(e) => setFormData({...formData, answer_tr: e.target.value})}
                                rows="5"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                                placeholder={t("أدخل الجواب بالتركى")}
                            />
                            {errors.answer_tr && <p className="text-red-500 text-xs mt-1">{errors.answer_tr[0]}</p>}
                        </div>
                    </>
                );
                break;
            default:
                return null;
        }

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full animate-scaleIn">
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">{getModalTitle()}</h3>
                        <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="p-6 max-h-[70vh] overflow-y-auto">
                        {formFields}
                    </div>
                    <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-3">
                        <button onClick={closeModal} className="flex-1 px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors">
                            {t("إلغاء")}
                        </button>
                        <button onClick={handleSave} className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                            {t("حفظ")}
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <AdminLayout>
            <div className="mx-3 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-10 animate-fadeIn">
                <div className="flex  justify-between  gap-4 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{t("إدارة الخدمات والأسئلة الشائعة")}</h3>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                        <div className="flex flex-wrap gap-2">
                            <button onClick={getAddButtonHandler()} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors shadow-md hover:shadow-lg">
                                <PlusIcon className="h-4 w-4 ml-1.5" />
                                {t("إضافة")}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                    <nav className="-mb-px flex space-x-8 overflow-x-auto">
                        {[
                            { id: "services", label: t("خدماتنا"), icon: "" },
                            { id: "marketing", label: t("خدمات التسويق الإلكتروني"), icon: "" },
                            { id: "faq", label: t("الأسئلة الشائعة"), icon: "" }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => {
                                    setCurrentTab(tab.id);
                                    setCurrentPage(1);
                                    setSearch("");
                                }}
                                className={`py-3 px-2 border-b-2 font-medium text-sm whitespace-nowrap flex items-center transition-colors ${
                                    currentTab === tab.id
                                        ? "border-primary text-primary"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                                }`}
                            >
                                <span className="ml-2">{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Table */}
                <div className="mb-6">
                    {renderCurrentTable()}
                </div>

                {/* Pagination */}
                {filteredData.length > rowsPerPage && (
                    <div className="flex justify-between items-center mt-6">
                        <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg disabled:opacity-50 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center"
                        >
                            <span>{t("السابق")}</span>
                        </button>
                        <span className="text-gray-700 dark:text-gray-300">
                            {t("صفحة")} {currentPage} {t("من")} {Math.ceil(filteredData.length / rowsPerPage)}
                        </span>
                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === Math.ceil(filteredData.length / rowsPerPage)}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg disabled:opacity-50 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center"
                        >
                            <span>{t("التالي")}</span>
                        </button>
                    </div>
                )}

                {/* Modal */}
                {renderModal()}
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleIn {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
                .animate-scaleIn {
                    animation: scaleIn 0.2s ease-out;
                }
            `}</style>
        </AdminLayout>
    );
}
