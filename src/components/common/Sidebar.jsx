import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link, useLocation } from 'react-router-dom';
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
    const location = useLocation();

    useEffect(() => {
        if (sidebarOpen) {
            const tl = gsap.timeline();
            tl.set(sidebarRef.current, { display: 'block' })
              .to(
                sidebarRef.current,
                { x: '0%', opacity: 1, duration: 0.35, ease: 'power3.out' }
              )
              .fromTo(
                '.sidebar-link',
                { opacity: 0, x: 25 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.4,
                    stagger: 0.06,
                    ease: 'power3.out',
                },
                "-=0.2" // Start this animation slightly before the previous one ends
              );
        } else {
            gsap.to(sidebarRef.current, {
                x: '100%',
                opacity: 0,
                duration: 0.25,
                ease: 'power3.in',
                onComplete: () => gsap.set(sidebarRef.current, { display: 'none' }),
            });
        }
    }, [sidebarOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleSidebar}
        aria-label="Close sidebar overlay"
      />
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className="fixed top-0 bottom-0 right-0 z-50 w-[350px] max-w-full h-full bg-mainBg shadow-2xl border-l border-black/10 flex flex-col will-change-transform hidden"
      >
        {/* Header with Logo and Close Button */}
        <div className="flex items-center justify-between px-8 pt-6 pb-6 border-b border-black/10">
          <span className="text-xl font-bold font-roboto_serif text-black tracking-wide">York<span className="text-customOrange">T</span>own</span>
          <button
            className="text-black/60 hover:text-customOrange transition-colors p-2 rounded-full bg-customBeige/60 hover:bg-customBeige"
            onClick={toggleSidebar}
            aria-label="Close sidebar"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-1 flex flex-col gap-2 px-6 my-6">
          {sideLinks.map(link => {
            const Icon = linkIcons[link.name] || HomeIcon;
            const isActive = location.pathname === link.link;
            return (
              <Link
                key={link.name}
                to={link.link}
                onClick={toggleSidebar}
                className={`sidebar-link relative flex items-center gap-4 w-full px-4 py-3 rounded-lg text-base font-medium font-roboto transition-colors duration-200
                  ${isActive 
                    ? 'text-black bg-customBeige/35'
                    : 'text-black/60 hover:bg-black/5'
                  }`}
              >
                {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 bg-customBeige rounded-r-full"></div>}
                <Icon className="w-5 h-5" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="px-8 py-6 text-xs text-black/40 font-roboto border-t border-black/10 mt-auto">
          &copy; {new Date().getFullYear()} YorkTown. All rights reserved.
        </div>
      </div>
    </>
  )
}

export default Sidebar