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
    PhotoIcon
} from "@heroicons/react/24/outline";
import {    DocumentIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { useTranslation } from "react-i18next";

export default function Home() {
    const { app_url, auth } = usePage().props;
    const { t } = useTranslation();

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
        description_tr:"",
        image: null
    });

    // States for Why Choose Us
    const [whyChooseUs, setWhyChooseUs] = useState([]);
    const [whyChooseUsModal, setWhyChooseUsModal] = useState(false);
    const [editingWhyChoose, setEditingWhyChoose] = useState(null);
    const [newWhyChoose, setNewWhyChoose] = useState({
        name_ar: "",
        name_en: "",
        name_tr: "",
        description_ar: "",
        description_en: "",
        description_tr: "",
        image: null
    });

    // States for Projects
    const [projects, setProjects] = useState([]);
    const [projectsModal, setProjectsModal] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [newProject, setNewProject] = useState({
        name_ar: "",
        name_en: "",
        name_tr: "",
        description_ar: "",
        description_en: "",
        description_tr: "",
        category_ar: "",
        category_en: "",
        category_tr: "",
        image: null,
        project_url: ""
    });

    // States for Our Numbers
    const [ourNumbers, setOurNumbers] = useState([]);
    const [ourNumbersModal, setOurNumbersModal] = useState(false);
    const [editingNumber, setEditingNumber] = useState(null);
    const [newNumber, setNewNumber] = useState({
        number: "",
        name_ar: "",
        name_en: "",
        name_tr: ""
    });

    const [errors, setErrors] = useState({});
    const [currentTab, setCurrentTab] = useState("services");
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const rowsPerPage = 10;

    // Fetch data functions
    const fetchServices = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${app_url}/services`);
            setServices(response.data.services);
        } catch (error) {
            console.log(t("Error fetching services:"), error);
        } finally {
            setLoading(false);
        }
    };

    const fetchWhyChooseUs = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${app_url}/why-choose-us`);
            setWhyChooseUs(response.data.whyChooseUs);
        } catch (error) {
            console.log(t("Error fetching why choose us:"), error);
        } finally {
            setLoading(false);
        }
    };

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${app_url}/projects`);
            setProjects(response.data.projects);
        } catch (error) {
            console.log(t("Error fetching projects:"), error);
        } finally {
            setLoading(false);
        }
    };

    const fetchOurNumbers = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${app_url}/our-numbers`);
            setOurNumbers(response.data.ourNumbers);
        } catch (error) {
            console.log(t("Error fetching our numbers:"), error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
        fetchWhyChooseUs();
        fetchProjects();
        fetchOurNumbers();
    }, []);

    // Common modal handlers
    const closeModal = () => {
        setServicesModal(false);
        setWhyChooseUsModal(false);
        setProjectsModal(false);
        setOurNumbersModal(false);
        setEditingService(null);
        setEditingWhyChoose(null);
        setEditingProject(null);
        setEditingNumber(null);
        setErrors({});
        setImagePreview(null);
        setNewService({ name_ar: "",name_en: "",name_tr: "",description_ar: "",description_en: "",description_tr: "",image: null });
        setNewWhyChoose({ name_ar: "", name_en: "", name_tr: "", description_ar: "", description_en: "", description_tr: "", image: null });
        setNewProject({ name_ar: "",name_en: "",name_tr: "", description_ar: "", description_en: "", description_tr: "", category_ar: "",category_en: "",category_tr: "", image: null, project_url: "" });
        setNewNumber({ number: "", name_ar: "", name_en: "", name_tr });
    };

    // Image preview handler
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
        if (window.confirm(t("Are you sure you want to delete this service?"))) {
            try {
                await axios.delete(`${app_url}/services/${service.id}`);
                fetchServices();
            } catch (error) {
                console.log(t("Error deleting service:"), error);
            }
        }
    };

    // Why Choose Us handlers
    const handleAddWhyChoose = () => setWhyChooseUsModal(true);

    const handleEditWhyChoose = (item) => {
        setEditingWhyChoose(item);
        setNewWhyChoose({
            name_ar: item.name_ar,
            name_en: item.name_en,
            name_tr: item.name_tr,
            description_ar: item.description_ar,
            description_en: item.description_en,
            description_tr: item.description_tr,
            image: item.image_url   || null
        });
        setImagePreview(item.image_url || null);
        setWhyChooseUsModal(true);
    };

    const handleSaveWhyChoose = async () => {
        try {
            const formData = new FormData();
            formData.append('name_ar', newWhyChoose.name_ar);
            formData.append('name_en', newWhyChoose.name_en);
            formData.append('name_tr', newWhyChoose.name_tr);
            formData.append('description_ar', newWhyChoose.description_ar);
            formData.append('description_en', newWhyChoose.description_en);
            formData.append('description_tr', newWhyChoose.description_tr);
            if (newWhyChoose.image) {
                formData.append('image', newWhyChoose.image);
            }

            if (editingWhyChoose) {
                await axios.post(`${app_url}/why-choose-us/${editingWhyChoose.id}`, formData);
            } else {
                await axios.post(`${app_url}/why-choose-us`, formData);
            }
            closeModal();
            fetchWhyChooseUs();
        } catch (error) {
            setErrors(error.response?.data?.errors || {});
        }
    };

    const handleDeleteWhyChoose = async (item) => {
        if (window.confirm(t("Are you sure you want to delete this item?"))) {
            try {
                await axios.delete(`${app_url}/why-choose-us/${item.id}`);
                fetchWhyChooseUs();
            } catch (error) {
                console.log(t("Error deleting item:"), error);
            }
        }
    };

    // Projects handlers
    const handleAddProject = () => setProjectsModal(true);

    const handleEditProject = (project) => {
        setEditingProject(project);
        setNewProject({
            name_ar: project.name_ar,
            name_en: project.name_en,
            name_tr: project.name_tr,
            description_ar: project.description_ar,
            description_en: project.description_en,
            description_tr: project.description_tr,
            category_ar: project.category_ar,
            category_en: project.category_en,
            category_tr: project.category_tr,
            project_url: project.project_url,
            image: null
        });
        setImagePreview(project.image_url || null);
        setProjectsModal(true);
    };

    const handleSaveProject = async () => {
        try {
            const formData = new FormData();
            formData.append('name_ar', newProject.name_ar);
            formData.append('name_en', newProject.name_en);
            formData.append('name_tr', newProject.name_tr);
            formData.append('description_ar', newProject.description_ar);
            formData.append('description_en', newProject.description_en);
            formData.append('description_tr', newProject.description_tr);
            formData.append('category_ar', newProject.category_ar);
            formData.append('category_en', newProject.category_en);
            formData.append('category_tr', newProject.category_tr);
            formData.append('project_url', newProject.project_url);
            if (newProject.image) {
                formData.append('image', newProject.image);
            }

            if (editingProject) {
                await axios.post(`${app_url}/projects/${editingProject.id}`, formData);
            } else {
                await axios.post(`${app_url}/projects`, formData);
            }
            closeModal();
            fetchProjects();
        } catch (error) {
            setErrors(error.response?.data?.errors || {});
        }
    };

    const handleDeleteProject = async (project) => {
        if (window.confirm(t("هل أنت متأكد من حذف هذا المشروع؟"))) {
            try {
                await axios.delete(`${app_url}/projects/${project.id}`);
                fetchProjects();
            } catch (error) {
                console.log(t("Error deleting project:"), error);
            }
        }
    };

    // Our Numbers handlers
    const handleAddNumber = () => setOurNumbersModal(true);

    const handleEditNumber = (number) => {
        setEditingNumber(number);
        setNewNumber({
            number: number.number,
            name_ar: number.name_ar,
            name_en: number.name_en,
            name_tr: number.name_tr,
        });
        setOurNumbersModal(true);
    };

    const handleSaveNumber = async () => {
        try {
            if (editingNumber) {
                await axios.post(`${app_url}/our-numbers/${editingNumber.id}`, newNumber);
            } else {
                await axios.post(`${app_url}/our-numbers`, newNumber);
            }
            closeModal();
            fetchOurNumbers();
        } catch (error) {
            setErrors(error.response?.data?.errors || {});
        }
    };

    const handleDeleteNumber = async (number) => {
        if (window.confirm(t("هل أنت متأكد من حذف هذا الرقم؟"))) {
            try {
                await axios.delete(`${app_url}/our-numbers/${number.id}`);
                fetchOurNumbers();
            } catch (error) {
                console.log(t("Error deleting number:"), error);
            }
        }
    };

    // Pagination and search
    const getFilteredData = () => {
        let data = [];
        switch (currentTab) {
            case "services": data = services; break;
            case "whyChooseUs": data = whyChooseUs; break;
            case "projects": data = projects; break;
            case "ourNumbers": data = ourNumbers; break;
            default: data = [];
        }

        if (!search) {
            return data;
        }

        return data.filter(item => {
            const lowerCaseSearch = search.toLowerCase();
            return (
                item.name_ar?.toLowerCase().includes(lowerCaseSearch) ||
                item.name_en?.toLowerCase().includes(lowerCaseSearch) ||
                item.name_tr?.toLowerCase().includes(lowerCaseSearch) ||
                item.description_ar?.toLowerCase().includes(lowerCaseSearch) ||
                item.description_en?.toLowerCase().includes(lowerCaseSearch) ||
                item.description_tr?.toLowerCase().includes(lowerCaseSearch) ||
                item.category_ar?.toLowerCase().includes(lowerCaseSearch) ||
                item.category_en?.toLowerCase().includes(lowerCaseSearch) ||
                item.category_tr?.toLowerCase().includes(lowerCaseSearch) ||
                item.number?.toString().includes(lowerCaseSearch)
            );
        });
    };

    const filteredData = getFilteredData();
    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // Render functions for each table
const renderServicesTable = () => (
    <div className="overflow-x-auto rounded-lg shadow-md transition-all duration-300">
        <table className="min-w-full table-fixed">
            <colgroup>
                <col className="w-12" />
                <col className="w-16" />
                <col className="w-48" />
                <col className="w-48" />
                <col className="w-48" />
                <col className="w-64" />
                <col className="w-64" />
                <col className="w-64" />
                <col className="w-24" />
            </colgroup>
            <thead className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 sticky top-0 z-10">
                <tr>
                    <th className="px-3 py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">#</th>
                    <th className="px-3 py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("الصورة")}</th>
                    <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("الاسم بالعربى")}</th>
                    <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("الاسم بالانجليزى")}</th>
                    <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("الاسم بالتركى")}</th>
                    <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("الوصف بالعربى")}</th>
                    <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("الوصف بالانجليزى")}</th>
                    <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("الوصف بالتركى")}</th>
                    <th className="px-3 py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("الإجراءات")}</th>
                </tr>
            </thead>
            <tbody className="  dark:divide-gray-700">
                {currentItems.map((service, idx) => (
                    <tr key={service.id} className={`transition-all duration-300 transform hover:scale-[1.01] ${idx % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700"} hover:bg-blue-50 dark:hover:bg-gray-600`}>
                        <td className="px-3 py-3 text-center text-sm text-gray-500 dark:text-gray-400">{idx + 1 + (currentPage - 1) * rowsPerPage}</td>
                        <td className="px-3 py-3 text-center">
                            {service.image? (
                                <div className="relative group mx-auto w-10 h-10">
                                    <img
                                        src={`${app_url}/storage/${service.image}`}
                                        alt={"image"}
                                        className="w-10 h-10 rounded-full object-cover shadow-md transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-full transition-all duration-300 flex items-center justify-center">
                                        <EyeIcon className="h-4 w-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                </div>
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mx-auto">
                                    <PhotoIcon className="h-4 w-4 text-gray-400" />
                                </div>
                            )}
                        </td>
                        <td className="px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-200 font-medium truncate" title={service.name_ar}>
                            {service.name_ar}
                        </td>
                        <td className="px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-200 font-medium truncate" title={service.name_en}>
                            {service.name_en}
                        </td>
                        <td className="px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-200 font-medium truncate" title={service.name_tr}>
                            {service.name_tr}
                        </td>
                        <td className="px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-200 font-medium truncate" title={service.name_tr}>
                            {service.description_ar}
                        </td>
                        <td className="px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-200 font-medium truncate" title={service.name_tr}>
                            {service.description_en}
                        </td>
                        <td className="px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-200 font-medium truncate" title={service.name_tr}>
                            {service.description_tr}
                        </td>

                        <td className="px-3 py-3 text-center">
                            <div className="flex justify-center space-x-1">
                                <button
                                    onClick={() => handleEditService(service)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-all duration-300 hover:shadow-md"
                                    title={t("تعديل")}
                                >
                                    <PencilIcon className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => handleDeleteService(service)}
                                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-all duration-300 hover:shadow-md"
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
            <div className="text-center py-12 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800">
                <div className="animate-pulse">
                    <DocumentIcon className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                    <p className="text-lg">{t("لا توجد بيانات لعرضها")}</p>
                </div>
            </div>
        )}
    </div>
);

const renderWhyChooseUsTable = () => (
    <div className="overflow-x-auto rounded-lg shadow-md transition-all duration-300">
        <table className="min-w-full table-fixed">
            <colgroup>
                <col className="w-12" />
                <col className="w-16" />
                <col className="w-48" />
                <col className="w-48" />
                <col className="w-48" />
                <col className="w-64" />
                <col className="w-64" />
                <col className="w-64" />
                <col className="w-24" />
            </colgroup>
            <thead className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-gray-700 dark:to-gray-800 sticky top-0 z-10">
                <tr>
                    <th className="px-3 py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">#</th>
                    <th className="px-3 py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("الصورة")}</th>
                    <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("الاسم بالعربى")}</th>
                    <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("الاسم بالانجليزى")}</th>
                    <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("الاسم بالتركى")}</th>
                    <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("الوصف بالعربى")}</th>
                    <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("الوصف بالانجليزى")}</th>
                    <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("الوصف بالتركى")}</th>
                    <th className="px-3 py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("الإجراءات")}</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {currentItems.map((item, idx) => (
                    <tr key={item.id} className={`transition-all duration-300 transform hover:scale-[1.01] ${idx % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700"} hover:bg-green-50 dark:hover:bg-gray-600`}>
                        <td className="px-3 py-3 text-center text-sm text-gray-500 dark:text-gray-400">{idx + 1 + (currentPage - 1) * rowsPerPage}</td>
                        <td className="px-3 py-3 text-center">
                            {item.image ? (
                                <div className="relative group mx-auto w-10 h-10">
                                    <img
                                        src={`${app_url}/storage/${item.image}`}
                                        alt={"image"}
                                        className="w-10 h-10 rounded-full object-cover shadow-md transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-full transition-all duration-300 flex items-center justify-center">
                                        <EyeIcon className="h-4 w-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                </div>
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mx-auto">
                                    <PhotoIcon className="h-4 w-4 text-gray-400" />
                                </div>
                            )}
                        </td>
                        <td className="px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-200 font-medium truncate" title={item.name_ar}>
                            {item.name_ar}
                        </td>
                        <td className="px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-200 font-medium truncate" title={item.name_en}>
                            {item.name_en}
                        </td>
                        <td className="px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-200 font-medium truncate" title={item.name_tr}>
                            {item.name_tr}
                        </td>
                        <td className="px-4 py-3 text-right text-sm text-gray-600 dark:text-gray-300 line-clamp-2" title={item.description_ar}>
                            {item.description_ar}
                        </td>
                        <td className="px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-200 font-medium truncate" title={item.name_tr}>
                            {item.description_en}
                        </td>
                        <td className="px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-200 font-medium truncate" title={item.name_tr}>
                            {item.description_tr}
                        </td>

                        <td className="px-3 py-3 text-center">
                            <div className="flex justify-center space-x-1">
                                <button
                                    onClick={() => handleEditWhyChoose(item)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-all duration-300 hover:shadow-md"
                                    title={t("تعديل")}
                                >
                                    <PencilIcon className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => handleDeleteWhyChoose(item)}
                                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-all duration-300 hover:shadow-md"
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
            <div className="text-center py-12 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800">
                <div className="animate-pulse">
                    <DocumentIcon className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                    <p className="text-lg">{t("لا توجد بيانات لعرضها")}</p>
                </div>
            </div>
        )}
    </div>
);

const renderProjectsTable = () => (
    <div className="overflow-x-auto rounded-lg shadow-md transition-all duration-300">
        <table className="min-w-full table-fixed">
            <colgroup>
                <col className="w-12" />
                <col className="w-16" />
                <col className="w-40" />
                <col className="w-40" />
                <col className="w-40" />
                <col className="w-56" />
                <col className="w-56" />
                <col className="w-56" />
                <col className="w-40" />
                <col className="w-40" />
                <col className="w-40" />
                <col className="w-32" />
                <col className="w-24" />
            </colgroup>
            <thead className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-800 sticky top-0 z-10">
                <tr>
                    <th className="px-3 py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">#</th>
                    <th className="px-3 py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("الصورة")}</th>
                    <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("الاسم بالعربى")}</th>
                    <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("الاسم بالانجليزى")}</th>
                    <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("الاسم بالتركى")}</th>
                    <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("الوصف بالعربى")}</th>
                    <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("الوصف بالانجليزى")}</th>
                    <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("الوصف بالتركى")}</th>
                    <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("الفئة بالعربى")}</th>
                    <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("الفئة بالانجليزى")}</th>
                    <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("الفئة بالتركى")}</th>
                    <th className="px-4 py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("رابط المشروع")}</th>
                    <th className="px-3 py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("الإجراءات")}</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {currentItems.map((project, idx) => (
                    <tr key={project.id} className={`transition-all duration-300 transform hover:scale-[1.01] ${idx % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700"} hover:bg-purple-50 dark:hover:bg-gray-600`}>
                        <td className="px-3 py-3 text-center text-sm text-gray-500 dark:text-gray-400">{idx + 1 + (currentPage - 1) * rowsPerPage}</td>
                        <td className="px-3 py-3 text-center">
                            {project.image ? (
                                <div className="relative group mx-auto w-10 h-10">
                                    <img
                                        src={`${app_url}/storage/${project.image}`}
                                        alt={"image"}
                                        className="w-10 h-10 rounded-full object-cover shadow-md transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-full transition-all duration-300 flex items-center justify-center">
                                        <EyeIcon className="h-4 w-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                </div>
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mx-auto">
                                    <PhotoIcon className="h-4 w-4 text-gray-400" />
                                </div>
                            )}
                        </td>
                        <td className="px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-200 font-medium truncate" title={project.name_ar}>
                            {project.name_ar}
                        </td>
                        <td className="px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-200 font-medium truncate" title={project.name_en}>
                            {project.name_en}
                        </td>
                        <td className="px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-200 font-medium truncate" title={project.name_tr}>
                            {project.name_tr}
                        </td>
                        <td className="px-4 py-3 text-right text-sm text-gray-600 dark:text-gray-300 line-clamp-2" title={project.description_ar}>
                            {project.description_ar}
                        </td>
                        <td className="px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-200 font-medium truncate" title={project.name_tr}>
                            {project.description_en}
                        </td>
                        <td className="px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-200 font-medium truncate" title={project.name_tr}>
                            {project.description_tr}
                        </td>
                        <td className="px-4 py-3 text-right text-sm text-gray-600 dark:text-gray-300 truncate" title={project.category_ar}>
                            {project.category_ar}
                        </td>
                        <td className="px-4 py-3 text-right text-sm text-gray-600 dark:text-gray-300 truncate" title={project.category_en}>
                            {project.category_en}
                        </td>
                        <td className="px-4 py-3 text-right text-sm text-gray-600 dark:text-gray-300 truncate" title={project.category_tr}>
                            {project.category_tr}
                        </td>
                        <td className="px-4 py-3 text-center">
                            {project.project_url ? (
                                <a
                                    href={project.project_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-all duration-300 hover:shadow-md"
                                >
                                    <ArrowTopRightOnSquareIcon className="h-3 w-3 ml-1" />
                                    {t("عرض")}
                                </a>
                            ) : (
                                <span className="text-gray-400 text-xs">-</span>
                            )}
                        </td>
                        <td className="px-3 py-3 text-center">
                            <div className="flex justify-center space-x-1">
                                <button
                                    onClick={() => handleEditProject(project)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-all duration-300 hover:shadow-md"
                                    title={t("تعديل")}
                                >
                                    <PencilIcon className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => handleDeleteProject(project)}
                                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-all duration-300 hover:shadow-md"
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
            <div className="text-center py-12 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800">
                <div className="animate-pulse">
                    <DocumentIcon className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                    <p className="text-lg">{t("لا توجد بيانات لعرضها")}</p>
                </div>
            </div>
        )}
    </div>
);

const renderOurNumbersTable = () => (
    <div className="overflow-x-auto rounded-lg shadow-md transition-all duration-300">
        <table className="min-w-full table-fixed">
            <colgroup>
                <col className="w-12" />
                <col className="w-32" />
                <col className="w-64" />
                <col className="w-64" />
                <col className="w-64" />
                <col className="w-24" />
            </colgroup>
            <thead className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-700 dark:to-gray-800 sticky top-0 z-10">
                <tr>
                    <th className="px-3 py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">#</th>
                    <th className="px-4 py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("الرقم")}</th>
                    <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("الاسم بالعربى")}</th>
                    <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("الاسم بالانجليزى")}</th>
                    <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("الاسم بالتركى")}</th>
                    <th className="px-3 py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{t("الإجراءات")}</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {currentItems.map((number, idx) => (
                    <tr key={number.id} className={`transition-all duration-300 transform hover:scale-[1.01] ${idx % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700"} hover:bg-orange-50 dark:hover:bg-gray-600`}>
                        <td className="px-3 py-3 text-center text-sm text-gray-500 dark:text-gray-400">{idx + 1 + (currentPage - 1) * rowsPerPage}</td>
                        <td className="px-4 py-3 text-center">
                            <span className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900 dark:to-red-900 rounded-full text-2xl font-bold text-orange-600 dark:text-orange-300 border-2 border-orange-200 dark:border-orange-700">
                                {number.number}
                            </span>
                        </td>
                        <td className="px-4 py-3 text-right text-sm text-gray-600 dark:text-gray-300 font-medium truncate" title={number.name_ar}>
                            {number.name_ar}
                        </td>
                        <td className="px-4 py-3 text-right text-sm text-gray-600 dark:text-gray-300 font-medium truncate" title={number.name_en}>
                            {number.name_en}
                        </td>
                        <td className="px-4 py-3 text-right text-sm text-gray-600 dark:text-gray-300 font-medium truncate" title={number.name_tr}>
                            {number.name_tr}
                        </td>
                        <td className="px-3 py-3 text-center">
                            <div className="flex justify-center space-x-1">
                                <button
                                    onClick={() => handleEditNumber(number)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-all duration-300 hover:shadow-md"
                                    title={t("تعديل")}
                                >
                                    <PencilIcon className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => handleDeleteNumber(number)}
                                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-all duration-300 hover:shadow-md"
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
            <div className="text-center py-12 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800">
                <div className="animate-pulse">
                    <DocumentIcon className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                    <p className="text-lg">{t("لا توجد بيانات لعرضها")}</p>
                </div>
            </div>
        )}
    </div>
);

    // Render current table based on active tab
    const renderCurrentTable = () => {
        if (loading) {
            return (
                <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            );
        }

        switch (currentTab) {
            case "services": return renderServicesTable();
            case "whyChooseUs": return renderWhyChooseUsTable();
            case "projects": return renderProjectsTable();
            case "ourNumbers": return renderOurNumbersTable();
            default: return null;
        }
    };

    // Get add button handler based on current tab
    const getAddButtonHandler = () => {
        switch (currentTab) {
            case "services": return handleAddService;
            case "whyChooseUs": return handleAddWhyChoose;
            case "projects": return handleAddProject;
            case "ourNumbers": return handleAddNumber;
            default: return () => {};
        }
    };

    // Get modal title based on current tab
    const getModalTitle = () => {
        switch (currentTab) {
            case "services": return editingService ? t("تعديل الخدمة") : t("إضافة خدمة جديدة");
            case "whyChooseUs": return editingWhyChoose ? t("تعديل العنصر") : t("إضافة عنصر جديد");
            case "projects": return editingProject ? t("تعديل المشروع") : t("إضافة مشروع جديد");
            case "ourNumbers": return editingNumber ? t("تعديل الرقم") : t("إضافة رقم جديد");
            default: return "";
        }
    };

    // Render modal based on current tab
    const renderModal = () => {
        if (!servicesModal && !whyChooseUsModal && !projectsModal && !ourNumbersModal) return null;

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
            case "whyChooseUs":
                formData = newWhyChoose;
                setFormData = setNewWhyChoose;
                handleSave = handleSaveWhyChoose;
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
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("الاسم بالتركى ")}</label>
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
            case "projects":
                formData = newProject;
                setFormData = setNewProject;
                handleSave = handleSaveProject;
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
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("الوصف")}</label>
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
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("الفئة بالعربى")}</label>
                            <input
                                type="text"
                                value={formData.category_ar}
                                onChange={(e) => setFormData({...formData, category_ar: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            {errors.category_ar && <p className="text-red-500 text-xs mt-1 animate-pulse">{errors.category_ar[0]}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("الفئة بالانجليزى")}</label>
                            <input
                                type="text"
                                value={formData.category_en}
                                onChange={(e) => setFormData({...formData, category_en: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            {errors.category_en && <p className="text-red-500 text-xs mt-1 animate-pulse">{errors.category_en[0]}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("الفئة بالتركى")}</label>
                            <input
                                type="text"
                                value={formData.category_tr}
                                onChange={(e) => setFormData({...formData, category_tr: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            {errors.category_tr && <p className="text-red-500 text-xs mt-1 animate-pulse">{errors.category_tr[0]}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("رابط المشروع")}</label>
                            <input
                                type="url"
                                value={formData.project_url}
                                onChange={(e) => setFormData({...formData, project_url: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            {errors.project_url && <p className="text-red-500 text-xs mt-1 animate-pulse">{errors.project_url[0]}</p>}
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
            case "ourNumbers":
                formData = newNumber;
                setFormData = setNewNumber;
                handleSave = handleSaveNumber;
                formFields = (
                    <>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("الرقم")}</label>
                            <input
                                type="number"
                                value={formData.number}
                                onChange={(e) => setFormData({...formData, number: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            {errors.number && <p className="text-red-500 text-xs mt-1 animate-pulse">{errors.number[0]}</p>}
                        </div>
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
                        <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors duration-300">
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="p-6 max-h-[70vh] overflow-y-auto">
                        {formFields}
                    </div>
                    <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-3">
                        <button onClick={closeModal} className="flex-1 px-4 py-2 bg-gray-100 text-gray-800 rounded-lg transition-all duration-300 hover:bg-gray-200">
                            {t("إلغاء")}
                        </button>
                        <button onClick={handleSave} className="flex-1 px-4 py-2 bg-primary text-white rounded-lg transition-all duration-300 hover:bg-primary-dark">
                            {t("حفظ")}
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <AdminLayout>
            <div className="mx-3 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-10 transition-all duration-300">
                <div className="flex justify-between gap-4 mb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{t("إدارة محتوى الصفحة الرئيسية")}</h3>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                        <div className="flex flex-wrap gap-2">
                            <button onClick={getAddButtonHandler()} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-all duration-300 transform hover:scale-105 shadow-md">
                                <PlusIcon className="h-4 w-4 ml-1.5" />
                                {t("إضافة")}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
                    <nav className="-mb-px flex space-x-8 overflow-x-auto">
                        {[
                            { id: "services", label: t("الخدمات") },
                            { id: "whyChooseUs", label: t("لماذا تختار KingNumberOne") },
                            { id: "projects", label: t("المشاريع") },
                            { id: "ourNumbers", label: t("أرقامنا") }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => {
                                    setCurrentTab(tab.id);
                                    setCurrentPage(1);
                                    setSearch("");
                                }}
                                className={`py-2 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-all duration-300 ${
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
                <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
                    {renderCurrentTable()}
                </div>

                {/* Pagination */}
                {filteredData.length > rowsPerPage && (
                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded disabled:opacity-50 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
                        >
                            {t("السابق")}
                        </button>
                        <span className="text-gray-700 dark:text-gray-300">
                            {t("صفحة")} {currentPage} {t("من")} {Math.ceil(filteredData.length / rowsPerPage)}
                        </span>
                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === Math.ceil(filteredData.length / rowsPerPage)}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded disabled:opacity-50 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
                        >
                            {t("التالي")}
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
                    animation: scaleIn 0.3s ease-out;
                }

                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </AdminLayout>
    );
}
