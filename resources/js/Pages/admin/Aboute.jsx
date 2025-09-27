import React, { useState, useEffect } from "react";
import AdminLayout from "./layout";
import axios from "axios";
import { usePage } from "@inertiajs/react";
import {
    XMarkIcon,
    PlusIcon,
    PencilIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

export default function Aboute() {
    const { app_url, auth } = usePage().props;
    const { t } = useTranslation();

    // States for About Us
    const [aboutUs, setAboutUs] = useState(null);
    const [aboutUsModal, setAboutUsModal] = useState(false);

    // States for Our Values
    const [ourValues, setOurValues] = useState([]);
    const [ourValuesModal, setOurValuesModal] = useState(false);
    const [editingValue, setEditingValue] = useState(null);
    const [newValue, setNewValue] = useState({
        name_ar: "",
        name_en: "",
        name_tr: "",
        description_ar: "",
        description_en: "",
        description_tr: ""
    });

    // States for Our Journey
    const [ourJourney, setOurJourney] = useState([]);
    const [ourJourneyModal, setOurJourneyModal] = useState(false);
    const [editingJourney, setEditingJourney] = useState(null);
    const [newJourney, setNewJourney] = useState({
        year: "",
        name_ar: "",
        name_en: "",
        name_tr: "",
        description_ar: "",
        description_en: "",
        description_tr: ""
    });

    const [errors, setErrors] = useState({});
    const [currentTab, setCurrentTab] = useState("about");
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [activeLang, setActiveLang] = useState("ar"); // Default language
    const rowsPerPage = 10;

    // Fetch data functions
    const fetchAboutUs = async () => {
        try {
            const response = await axios.get(`${app_url}/about-us`);
            setAboutUs(response.data.aboutUs);
        } catch (error) {
            console.log(t("Error fetching about us:"), error);
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

    useEffect(() => {
        fetchAboutUs();
        fetchOurValues();
        fetchOurJourney();
    }, []);

    // Common modal handlers
    const closeModal = () => {
        setAboutUsModal(false);
        setOurValuesModal(false);
        setOurJourneyModal(false);
        setEditingValue(null);
        setEditingJourney(null);
        setErrors({});
        setNewValue({
            name_ar: "",
            name_en: "",
            name_tr: "",
            description_ar: "",
            description_en: "",
            description_tr: ""
        });
        setNewJourney({
            year: "",
            name_ar: "",
            name_en: "",
            name_tr: "",
            description_ar: "",
            description_en: "",
            description_tr: ""
        });
    };

    // About Us handlers
    const handleEditAboutUs = () => {
        setAboutUsModal(true);
    };

    const handleSaveAboutUs = async () => {
        try {
            const formData = new FormData();
            formData.append('our_story_ar', aboutUs?.our_story_ar || '');
            formData.append('our_story_en', aboutUs?.our_story_en || '');
            formData.append('our_story_tr', aboutUs?.our_story_tr || '');
            formData.append('our_vision_ar', aboutUs?.our_vision_ar || '');
            formData.append('our_vision_en', aboutUs?.our_vision_en || '');
            formData.append('our_vision_tr', aboutUs?.our_vision_tr || '');
            formData.append('our_mission_ar', aboutUs?.our_mission_ar || '');
            formData.append('our_mission_en', aboutUs?.our_mission_en || '');
            formData.append('our_mission_tr', aboutUs?.our_mission_tr || '');

            await axios.post(`${app_url}/about-us`, formData);
            closeModal();
            fetchAboutUs();
        } catch (error) {
            setErrors(error.response?.data?.errors || {});
        }
    };

    // Our Values handlers
    const handleAddValue = () => setOurValuesModal(true);

    const handleEditValue = (value) => {
        setEditingValue(value);
        setNewValue({
            name_ar: value.name_ar || '',
            name_en: value.name_en || '',
            name_tr: value.name_tr || '',
            description_ar: value.description_ar || '',
            description_en: value.description_en || '',
            description_tr: value.description_tr || ''
        });
        setOurValuesModal(true);
    };

    const handleSaveValue = async () => {
        try {
            if (editingValue) {
                await axios.post(`${app_url}/our-values/${editingValue.id}`, newValue);
            } else {
                await axios.post(`${app_url}/our-values`, newValue);
            }
            closeModal();
            fetchOurValues();
        } catch (error) {
            setErrors(error.response?.data?.errors || {});
        }
    };

    const handleDeleteValue = async (value) => {
        if (window.confirm(t("هل أنت متأكد من حذف هذه القيمة؟"))) {
            try {
                await axios.delete(`${app_url}/our-values/${value.id}`);
                fetchOurValues();
            } catch (error) {
                console.log(t("Error deleting value:"), error);
            }
        }
    };

    // Our Journey handlers
    const handleAddJourney = () => setOurJourneyModal(true);

    const handleEditJourney = (journey) => {
        setEditingJourney(journey);
        setNewJourney({
            year: journey.year,
            name_ar: journey.name_ar || '',
            name_en: journey.name_en || '',
            name_tr: journey.name_tr || '',
            description_ar: journey.description_ar || '',
            description_en: journey.description_en || '',
            description_tr: journey.description_tr || ''
        });
        setOurJourneyModal(true);
    };

    const handleSaveJourney = async () => {
        try {
            if (editingJourney) {
                await axios.post(`${app_url}/our-journey/${editingJourney.id}`, newJourney);
            } else {
                await axios.post(`${app_url}/our-journey`, newJourney);
            }
            closeModal();
            fetchOurJourney();
        } catch (error) {
            setErrors(error.response?.data?.errors || {});
        }
    };

    const handleDeleteJourney = async (journey) => {
        if (window.confirm(t("هل أنت متأكد من حذف هذه المرحلة من الرحلة؟"))) {
            try {
                await axios.delete(`${app_url}/our-journey/${journey.id}`);
                fetchOurJourney();
            } catch (error) {
                console.log(t("Error deleting journey:"), error);
            }
        }
    };

    // Get text based on active language
    const getText = (item, field) => {
        const langField = `${field}_${activeLang}`;
        return item[langField] || item[field] || t("لا توجد بيانات");
    };

    // Pagination and search
    const getFilteredData = () => {
        let data = [];
        switch (currentTab) {
            case "values": data = ourValues; break;
            case "journey": data = ourJourney; break;
            default: data = [];
        }

        return data.filter(item =>
            getText(item, 'name').toLowerCase().includes(search.toLowerCase()) ||
            getText(item, 'description').toLowerCase().includes(search.toLowerCase()) ||
            item.year?.toString().includes(search)
        );
    };

    const filteredData = getFilteredData();
    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // Language tabs component
    const LanguageTabs = () => (
        <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-4">
                {[
                    { id: "ar", label: "العربية" },
                    { id: "en", label: "English" },
                    { id: "tr", label: "Türkçe" }
                ].map((lang) => (
                    <button
                        key={lang.id}
                        onClick={() => setActiveLang(lang.id)}
                        className={`py-2 px-3 border-b-2 font-medium text-sm whitespace-nowrap ${
                            activeLang === lang.id
                                ? "border-primary text-primary"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                    >
                        {lang.label}
                    </button>
                ))}
            </nav>
        </div>
    );

    // Render functions for each section
    const renderAboutUsSection = () => (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">{t("معلومات من نحن")}</h3>
                <button
                    onClick={handleEditAboutUs}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors"
                >
                    <PencilIcon className="h-4 w-4 ml-1.5" />
                    {t("تعديل")}
                </button>
            </div>

            <LanguageTabs />

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t("قصتنا")} ({activeLang.toUpperCase()})
                    </label>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg min-h-[100px]">
                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                            {aboutUs?.[`our_story_${activeLang}`] || aboutUs?.our_story || t("لا توجد بيانات")}
                        </p>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t("رؤيتنا")} ({activeLang.toUpperCase()})
                    </label>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg min-h-[100px]">
                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                            {aboutUs?.[`our_vision_${activeLang}`] || aboutUs?.our_vision || t("لا توجد بيانات")}
                        </p>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t("رسالتنا")} ({activeLang.toUpperCase()})
                    </label>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg min-h-[100px]">
                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                            {aboutUs?.[`our_mission_${activeLang}`] || aboutUs?.our_mission || t("لا توجد بيانات")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderOurValuesTable = () => (
        <div className="overflow-x-auto">
            <table className="min-w-full table-fixed">
                <colgroup>
                    <col className="w-16" />
                    <col className="w-1/4" />
                    <col className="w-1/2" />
                    <col className="w-1/4" />
                </colgroup>
                <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
                    <tr>
                        <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">#</th>
                        <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                            {t("الاسم")} ({activeLang.toUpperCase()})
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                            {t("الوصف")} ({activeLang.toUpperCase()})
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("الإجراءات")}</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {currentItems.map((value, idx) => (
                        <tr key={value.id} className={`transition-colors duration-200 ${idx % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700"} hover:bg-gray-100 dark:hover:bg-gray-600`}>
                            <td className="px-4 py-3 text-right text-gray-500 dark:text-gray-400">{idx + 1 + (currentPage - 1) * rowsPerPage}</td>
                            <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200 font-medium">
                                {getText(value, 'name')}
                            </td>
                            <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-300">
                                {getText(value, 'description')}
                            </td>
                            <td className="px-4 py-3 text-xs font-semibold text-gray-600 dark:text-gray-300 text-center">
                                <div className="flex justify-center space-x-2">
                                    <button onClick={() => handleEditValue(value)} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors">
                                        <PencilIcon className="h-4 w-4" />
                                    </button>
                                    <button onClick={() => handleDeleteValue(value)} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors">
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

    const renderOurJourneyTable = () => (
        <div className="overflow-x-auto">
            <table className="min-w-full table-fixed">
                <colgroup>
                    <col className="w-16" />
                    <col className="w-1/6" />
                    <col className="w-1/4" />
                    <col className="w-1/2" />
                    <col className="w-1/4" />
                </colgroup>
                <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
                    <tr>
                        <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">#</th>
                        <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("السنة")}</th>
                        <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                            {t("الاسم")} ({activeLang.toUpperCase()})
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                            {t("الوصف")} ({activeLang.toUpperCase()})
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("الإجراءات")}</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {currentItems.map((journey, idx) => (
                        <tr key={journey.id} className={`transition-colors duration-200 ${idx % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700"} hover:bg-gray-100 dark:hover:bg-gray-600`}>
                            <td className="px-4 py-3 text-right text-gray-500 dark:text-gray-400">{idx + 1 + (currentPage - 1) * rowsPerPage}</td>
                            <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200 font-medium">{journey.year}</td>
                            <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200 font-medium">
                                {getText(journey, 'name')}
                            </td>
                            <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-300">
                                {getText(journey, 'description')}
                            </td>
                            <td className="px-4 py-3 text-xs font-semibold text-gray-600 dark:text-gray-300 text-center">
                                <div className="flex justify-center space-x-2">
                                    <button onClick={() => handleEditJourney(journey)} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors">
                                        <PencilIcon className="h-4 w-4" />
                                    </button>
                                    <button onClick={() => handleDeleteJourney(journey)} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors">
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

    // Render current content based on active tab
    const renderCurrentContent = () => {
        switch (currentTab) {
            case "about": return renderAboutUsSection();
            case "values": return (
                <>
                    <LanguageTabs />
                    {renderOurValuesTable()}
                </>
            );
            case "journey": return (
                <>
                    <LanguageTabs />
                    {renderOurJourneyTable()}
                </>
            );
            default: return null;
        }
    };

    // Get add button handler based on current tab
    const getAddButtonHandler = () => {
        switch (currentTab) {
            case "values": return handleAddValue;
            case "journey": return handleAddJourney;
            default: return () => {};
        }
    };

    // Get modal title based on current tab
    const getModalTitle = () => {
        switch (currentTab) {
            case "about": return t("تعديل معلومات من نحن");
            case "values": return editingValue ? t("تعديل القيمة") : t("إضافة قيمة جديدة");
            case "journey": return editingJourney ? t("تعديل مرحلة الرحلة") : t("إضافة مرحلة جديدة");
            default: return "";
        }
    };

    // Render modal based on current tab
    const renderModal = () => {
        if (!aboutUsModal && !ourValuesModal && !ourJourneyModal) return null;

        let formFields = null;
        let formData = {};
        let setFormData = () => {};
        let handleSave = () => {};

        switch (currentTab) {
            case "about":
                handleSave = handleSaveAboutUs;
                formFields = (
                    <>
                        <div className="mb-6">
                            <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">{t("قصتنا")}</h4>
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">العربية</label>
                                    <textarea
                                        value={aboutUs?.our_story_ar || ''}
                                        onChange={(e) => setAboutUs({...aboutUs, our_story_ar: e.target.value})}
                                        rows="4"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200"
                                    />
                                    {errors.our_story_ar && <p className="text-red-500 text-xs mt-1">{errors.our_story_ar[0]}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">English</label>
                                    <textarea
                                        value={aboutUs?.our_story_en || ''}
                                        onChange={(e) => setAboutUs({...aboutUs, our_story_en: e.target.value})}
                                        rows="4"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200"
                                    />
                                    {errors.our_story_en && <p className="text-red-500 text-xs mt-1">{errors.our_story_en[0]}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Türkçe</label>
                                    <textarea
                                        value={aboutUs?.our_story_tr || ''}
                                        onChange={(e) => setAboutUs({...aboutUs, our_story_tr: e.target.value})}
                                        rows="4"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200"
                                    />
                                    {errors.our_story_tr && <p className="text-red-500 text-xs mt-1">{errors.our_story_tr[0]}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">{t("رؤيتنا")}</h4>
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">العربية</label>
                                    <textarea
                                        value={aboutUs?.our_vision_ar || ''}
                                        onChange={(e) => setAboutUs({...aboutUs, our_vision_ar: e.target.value})}
                                        rows="4"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200"
                                    />
                                    {errors.our_vision_ar && <p className="text-red-500 text-xs mt-1">{errors.our_vision_ar[0]}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">English</label>
                                    <textarea
                                        value={aboutUs?.our_vision_en || ''}
                                        onChange={(e) => setAboutUs({...aboutUs, our_vision_en: e.target.value})}
                                        rows="4"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200"
                                    />
                                    {errors.our_vision_en && <p className="text-red-500 text-xs mt-1">{errors.our_vision_en[0]}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Türkçe</label>
                                    <textarea
                                        value={aboutUs?.our_vision_tr || ''}
                                        onChange={(e) => setAboutUs({...aboutUs, our_vision_tr: e.target.value})}
                                        rows="4"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200"
                                    />
                                    {errors.our_vision_tr && <p className="text-red-500 text-xs mt-1">{errors.our_vision_tr[0]}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">{t("رسالتنا")}</h4>
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">العربية</label>
                                    <textarea
                                        value={aboutUs?.our_mission_ar || ''}
                                        onChange={(e) => setAboutUs({...aboutUs, our_mission_ar: e.target.value})}
                                        rows="4"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200"
                                    />
                                    {errors.our_mission_ar && <p className="text-red-500 text-xs mt-1">{errors.our_mission_ar[0]}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">English</label>
                                    <textarea
                                        value={aboutUs?.our_mission_en || ''}
                                        onChange={(e) => setAboutUs({...aboutUs, our_mission_en: e.target.value})}
                                        rows="4"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200"
                                    />
                                    {errors.our_mission_en && <p className="text-red-500 text-xs mt-1">{errors.our_mission_en[0]}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Türkçe</label>
                                    <textarea
                                        value={aboutUs?.our_mission_tr || ''}
                                        onChange={(e) => setAboutUs({...aboutUs, our_mission_tr: e.target.value})}
                                        rows="4"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200"
                                    />
                                    {errors.our_mission_tr && <p className="text-red-500 text-xs mt-1">{errors.our_mission_tr[0]}</p>}
                                </div>
                            </div>
                        </div>
                    </>
                );
                break;
            case "values":
                formData = newValue;
                setFormData = setNewValue;
                handleSave = handleSaveValue;
                formFields = (
                    <>
                        <div className="mb-6">
                            <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">{t("الاسم")}</h4>
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">العربية</label>
                                    <input
                                        type="text"
                                        value={formData.name_ar}
                                        onChange={(e) => setFormData({...formData, name_ar: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200"
                                    />
                                    {errors.name_ar && <p className="text-red-500 text-xs mt-1">{errors.name_ar[0]}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">English</label>
                                    <input
                                        type="text"
                                        value={formData.name_en}
                                        onChange={(e) => setFormData({...formData, name_en: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200"
                                    />
                                    {errors.name_en && <p className="text-red-500 text-xs mt-1">{errors.name_en[0]}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Türkçe</label>
                                    <input
                                        type="text"
                                        value={formData.name_tr}
                                        onChange={(e) => setFormData({...formData, name_tr: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200"
                                    />
                                    {errors.name_tr && <p className="text-red-500 text-xs mt-1">{errors.name_tr[0]}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">{t("الوصف")}</h4>
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">العربية</label>
                                    <textarea
                                        value={formData.description_ar}
                                        onChange={(e) => setFormData({...formData, description_ar: e.target.value})}
                                        rows="3"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200"
                                    />
                                    {errors.description_ar && <p className="text-red-500 text-xs mt-1">{errors.description_ar[0]}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">English</label>
                                    <textarea
                                        value={formData.description_en}
                                        onChange={(e) => setFormData({...formData, description_en: e.target.value})}
                                        rows="3"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200"
                                    />
                                    {errors.description_en && <p className="text-red-500 text-xs mt-1">{errors.description_en[0]}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Türkçe</label>
                                    <textarea
                                        value={formData.description_tr}
                                        onChange={(e) => setFormData({...formData, description_tr: e.target.value})}
                                        rows="3"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200"
                                    />
                                    {errors.description_tr && <p className="text-red-500 text-xs mt-1">{errors.description_tr[0]}</p>}
                                </div>
                            </div>
                        </div>
                    </>
                );
                break;
            case "journey":
                formData = newJourney;
                setFormData = setNewJourney;
                handleSave = handleSaveJourney;
                formFields = (
                    <>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("السنة")}</label>
                            <input
                                type="number"
                                value={formData.year}
                                onChange={(e) => setFormData({...formData, year: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200"
                            />
                            {errors.year && <p className="text-red-500 text-xs mt-1">{errors.year[0]}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("الاسم بالعربى")}</label>
                            <input
                                type="text"
                                value={formData.name_ar}
                                onChange={(e) => setFormData({...formData, name_ar: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200"
                            />
                            {errors.name_ar && <p className="text-red-500 text-xs mt-1">{errors.name_ar[0]}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("الاسم بالانجليزى")}</label>
                            <input
                                type="text"
                                value={formData.name_en}
                                onChange={(e) => setFormData({...formData, name_en: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200"
                            />
                            {errors.name_en && <p className="text-red-500 text-xs mt-1">{errors.name_en[0]}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("الاسم بالتركى")}</label>
                            <input
                                type="text"
                                value={formData.name_tr}
                                onChange={(e) => setFormData({...formData, name_tr: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200"
                            />
                            {errors.name_tr && <p className="text-red-500 text-xs mt-1">{errors.name_tr[0]}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("الوصف بالعربى")}</label>
                            <textarea
                                value={formData.description_ar}
                                onChange={(e) => setFormData({...formData, description_ar: e.target.value})}
                                rows="3"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200"
                            />
                            {errors.description_ar && <p className="text-red-500 text-xs mt-1">{errors.description_ar[0]}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("الوصف بالانجليزى")}</label>
                            <textarea
                                value={formData.description_en}
                                onChange={(e) => setFormData({...formData, description_en: e.target.value})}
                                rows="3"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200"
                            />
                            {errors.description_en && <p className="text-red-500 text-xs mt-1">{errors.description_en[0]}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("الوصف بالتركى")}</label>
                            <textarea
                                value={formData.description_tr}
                                onChange={(e) => setFormData({...formData, description_tr: e.target.value})}
                                rows="3"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200"
                            />
                            {errors.description_tr && <p className="text-red-500 text-xs mt-1">{errors.description_tr[0]}</p>}
                        </div>
                    </>
                );
                break;
            default:
                return null;
        }

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">{getModalTitle()}</h3>
                        <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="p-6">
                        {formFields}
                    </div>
                    <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-3 sticky bottom-0 bg-white dark:bg-gray-800">
                        <button onClick={closeModal} className="flex-1 px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                            {t("إلغاء")}
                        </button>
                        <button onClick={handleSave} className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
                            {t("حفظ")}
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <AdminLayout>
            <div className="mx-3 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-10">
                <div className="flex justify-between gap-4 mb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{t("إدارة محتوى صفحة من نحن")}</h3>
                    </div>

                    {(currentTab === "values" || currentTab === "journey") && (
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">

                            <div className="flex flex-wrap gap-2">
                                <button onClick={getAddButtonHandler()} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors">
                                    <PlusIcon className="h-4 w-4 ml-1.5" />
                                    {t("إضافة")}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
                    <nav className="-mb-px flex space-x-8">
                        {[
                            { id: "about", label: t("من نحن") },
                            { id: "values", label: t("قيمنا") },
                            { id: "journey", label: t("رحلتنا") }
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

                {/* Content */}
                {renderCurrentContent()}

                {/* Pagination for tables */}
                {(currentTab === "values" || currentTab === "journey") && filteredData.length > rowsPerPage && (
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
