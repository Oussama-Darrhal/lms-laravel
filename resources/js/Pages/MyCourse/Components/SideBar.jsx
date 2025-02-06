import { Head, usePage } from '@inertiajs/react';
import { BookOpen, ChevronDown, Search, Trophy, Clock, Calendar, BarChart, TrendingUp, Star, User, LogOut } from 'lucide-react';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Bell, LayoutDashboard, Settings, HelpCircle, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BarChart2, PlayCircle
} from 'lucide-react';

const SIDEBAR = {
    COLLAPSED_WIDTH: 84,
    MIN_WIDTH: 200,
    MAX_WIDTH: 400,
    DEFAULT_WIDTH: 240
};


const Sidebar = ({ width, isCollapsed, setWidth, setIsCollapsed, lastWidthBeforeCollapse, setLastWidthBeforeCollapse }) => {
    const [activeItem, setActiveItem] = useState('dashboard');
    const [isResizing, setIsResizing] = useState(false);
    const [currentWidth, setCurrentWidth] = useState(width);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const startResizing = useCallback((e) => {
        if (!isMobile) {
            e.preventDefault();
            setIsResizing(true);
        }
    }, [isMobile]);

    const resize = useCallback((e) => {
        if (isResizing && !isMobile) {
            const newWidth = Math.min(
                Math.max(e.clientX, SIDEBAR.MIN_WIDTH),
                SIDEBAR.MAX_WIDTH
            );
            setCurrentWidth(newWidth);
        }
    }, [isResizing, isMobile]);

    const stopResizing = useCallback(() => {
        if (!isMobile) {
            setIsResizing(false);
            setWidth(currentWidth);
        }
    }, [setWidth, currentWidth, isMobile]);

    const handleToggleCollapse = () => {
        if (isMobile) {
            setShowMobileMenu(!showMobileMenu);
        } else {
            if (isCollapsed) {
                setWidth(lastWidthBeforeCollapse);
                setCurrentWidth(lastWidthBeforeCollapse);
                setIsCollapsed(false);
            } else {
                setLastWidthBeforeCollapse(width);
                setWidth(SIDEBAR.COLLAPSED_WIDTH);
                setCurrentWidth(SIDEBAR.COLLAPSED_WIDTH);
                setIsCollapsed(true);
            }
        }
    };

    useEffect(() => {
        const handleResize = () => {
            const newIsMobile = window.innerWidth < 1024;
            setIsMobile(newIsMobile);
            if (newIsMobile) {
                setIsCollapsed(true);
                setWidth(SIDEBAR.COLLAPSED_WIDTH);
                setShowMobileMenu(false);
            } else {
                setIsCollapsed(false);
                setWidth(lastWidthBeforeCollapse);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [setIsCollapsed, setWidth, lastWidthBeforeCollapse]);

    useEffect(() => {
        if (isResizing) {
            window.addEventListener('mousemove', resize);
            window.addEventListener('mouseup', stopResizing);
            document.body.style.cursor = 'ew-resize';
            document.body.style.userSelect = 'none';
        }

        return () => {
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResizing);
            document.body.style.cursor = 'default';
            document.body.style.userSelect = 'auto';
        };
    }, [isResizing, resize, stopResizing]);

    useEffect(() => {
        setCurrentWidth(width);
    }, [width]);

    // Mobile menu overlay
    const MobileMenu = () => (
        <div
            className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity z-40 ${showMobileMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            onClick={() => setShowMobileMenu(false)}
        />
    );

    return (
        <>
            <MobileMenu />
            <div
                className={`fixed z-50 transition-all duration-300 ${isMobile
                    ? `bottom-6 left-6 ${showMobileMenu ? 'w-64 h-auto rounded-2xl' : 'w-14 h-14 rounded-full'
                    }`
                    : 'left-0 top-0 h-screen'
                    }`}
                style={!isMobile ? { width: `${currentWidth}px` } : undefined}
            >
                <div className={`h-full bg-gradient-to-b from-[#1a1b41] to-[#2d2e6f] text-white ${isMobile ? (showMobileMenu ? 'rounded-2xl' : 'rounded-full') : ''
                    } shadow-2xl`}>
                    <div className={`flex items-center justify-between ${isMobile && !showMobileMenu ? 'h-14 w-14 p-0' : 'h-16 p-6'
                        }`}>
                        {(!isCollapsed || (isMobile && showMobileMenu)) && (
                            <h1 className="hidden lg:block text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200">
                                INSTRUCTLY
                            </h1>
                        )}
                        <button
                            onClick={handleToggleCollapse}
                            className={`text-white transition-colors ${isMobile && !showMobileMenu
                                ? 'w-14 h-14 flex items-center justify-center hover:bg-white/10 rounded-full'
                                : 'p-2 rounded-lg hover:bg-white/10'
                                }`}
                        >
                            {isCollapsed || (isMobile && !showMobileMenu) ? (
                                <Menu className="w-6 h-6" />
                            ) : (
                                <X className="w-6 h-6" />
                            )}
                        </button>
                    </div>

                    {(!isCollapsed || (isMobile && showMobileMenu)) && (
                        <nav className="space-y-1 px-4 pb-6">
                            {[
                                { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                                { id: 'courses', icon: BookOpen, label: 'My Courses' },
                                { id: 'events', icon: Calendar, label: 'Events' },
                                { id: 'settings', icon: Settings, label: 'Settings' },
                                { id: 'help', icon: HelpCircle, label: 'Support' }
                            ].map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        setActiveItem(item.id);
                                        if (isMobile) setShowMobileMenu(false);
                                    }}
                                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl ${activeItem === item.id
                                        ? 'bg-white/20 backdrop-blur-sm shadow-inner'
                                        : 'hover:bg-white/10'
                                        }`}
                                >
                                    <item.icon size={20} className="flex-shrink-0" />
                                    <span className="text-sm font-medium">{item.label}</span>
                                </button>
                            ))}
                        </nav>
                    )}

                    {!isMobile && (
                        <div
                            className="absolute right-0 top-0 w-2 h-full cursor-ew-resize hover:bg-white/20 active:bg-white/30"
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default Sidebar;
