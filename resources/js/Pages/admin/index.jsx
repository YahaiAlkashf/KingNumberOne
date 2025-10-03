import React from 'react';
import { AcademicCapIcon , UserGroupIcon, BookOpenIcon,ClipboardDocumentListIcon, TagIcon  } from '@heroicons/react/24/outline';
import AdminLayout from './layout';


const stats = [
    {
        name: 'home',
        icon: ClipboardDocumentListIcon,
        color: 'from-green-500 to-green-700',
    },
    {
        name: 'aboute',
        icon: BookOpenIcon ,
        color: 'from-purple-500 to-purple-700',
    },
    {
        name: 'contact',
        icon: TagIcon,
        color: 'from-pink-500 to-pink-700',
    },
    {
        name: 'services',
        icon: TagIcon,
        color: 'from-pink-500 to-pink-700',
    },
];



export default function Index() {
    return (
        <AdminLayout>
        <div className=" px-3 max-w-7xl min-h-screen">

            {/* Stat Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-6 mb-10">
                {stats.map((stat, idx) => {
                    // Assign unique background colors for each box
                    const boxColors = [
                        'bg-blue-500',
                        'bg-green-500',
                        'bg-purple-500',
                        'bg-pink-500',
                    ];
                    return (
                        <div
                            key={stat.name}
                            className={`group relative overflow-hidden rounded-xl shadow-lg ${boxColors[idx]} text-white p-6 flex flex-col items-center justify-center transform transition duration-500 hover:scale-105 hover:shadow-2xl animate-fade-in-up`}
                            style={{ animationDelay: `${idx * 100}ms` }}
                        >
                            <stat.icon className="h-12 w-12 mb-3 text-white drop-shadow-lg transition-transform duration-300 group-hover:scale-110" />
                            <span className="text-lg font-semibold tracking-wide">{stat.name}</span>
                        </div>
                    );
                })}
            </div>



             {/* Animations */}
            <style>{`
                @keyframes fade-in-up {
                    0% { opacity: 0; transform: translateY(40px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.7s cubic-bezier(0.4,0,0.2,1) both;
                }
            `}</style>
        </div>
        </AdminLayout>

    );
}
