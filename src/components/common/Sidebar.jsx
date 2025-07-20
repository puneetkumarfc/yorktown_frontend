import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useNavigate, useLocation } from 'react-router-dom';
import { sideLinks } from '../../constants/Sidebar';
import { XMarkIcon, HomeIcon, BookOpenIcon, ShoppingBagIcon, PhoneIcon } from '@heroicons/react/24/outline';

const linkIcons = {
  Home: HomeIcon,
  Menu: BookOpenIcon,
  Bag: ShoppingBagIcon,
  'Contact Us': PhoneIcon,
};

const Sidebar = ({toggleSidebar, sidebarOpen}) => {
    const sidebarRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (sidebarOpen) {
            gsap.set(sidebarRef.current, { display: 'block' });
            gsap.fromTo(
                sidebarRef.current,
                { x: '100%', opacity: 0 },
                { x: '0%', opacity: 1, duration: 0.28, ease: 'power3.out' }
            );
        } else {
            gsap.to(sidebarRef.current, {
                x: '100%',
                opacity: 0,
                duration: 0.18,
                ease: 'power3.in',
                onComplete: () => {
                    gsap.set(sidebarRef.current, { display: 'none' });
                },
            });
        }
    }, [sidebarOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/20 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleSidebar}
        aria-label="Close sidebar overlay"
      />
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className="fixed top-0 bottom-0 right-0 z-50 w-[300px] max-w-full h-full bg-primaryBg backdrop-blur-2xl shadow-2xl border-l border-customBeige/80 flex flex-col transition-all duration-300 will-change-transform hidden rounded-l-3xl overflow-hidden"
        style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.07)' }}
      >
        {/* Close button */}
        <button
          className="absolute top-5 right-5 text-customOrange hover:text-mainRed transition-colors p-2 rounded-full bg-customBeige/60 hover:bg-mainYellow/40"
          onClick={toggleSidebar}
          aria-label="Close sidebar"
        >
          <XMarkIcon className="w-7 h-7" />
        </button>
        {/* Logo */}
        <div className="px-8 pt-10 pb-6">
          <span className="text-2xl font-bold font-archivo text-primary tracking-wide">York<span className="text-customOrange">T</span>own</span>
        </div>
        <div className="flex-1 flex flex-col gap-2 px-6 mt-2">
          {sideLinks.map(link => {
            const Icon = linkIcons[link.name] || HomeIcon;
            const isActive = location.pathname === link.link;
            return (
              <button
                key={link.name}
                className={`flex items-center gap-4 w-full px-4 py-3 rounded-2xl text-lg font-semibold font-archivo transition-all duration-200
                  ${isActive ? 'bg-mainYellow/40 text-customOrange shadow-lg' : 'bg-customBeige/40 text-primary hover:bg-mainYellow/20 hover:text-customOrange'}`}
                onClick={() => {
                  navigate(link.link);
                  toggleSidebar();
                }}
              >
                <Icon className="w-7 h-7" />
                <span>{link.name}</span>
              </button>
            );
          })}
        </div>
        <div className="px-8 py-6 text-xs text-primary/40 font-poppins border-t border-customBeige/80 mt-6">
          &copy; {new Date().getFullYear()} YorkTown. All rights reserved.
        </div>
      </div>
    </>
  )
}

export default Sidebar