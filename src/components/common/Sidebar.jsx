import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';
import { sideLinks } from '../../constants/Sidebar';

const Sidebar = ({toggleSidebar, sidebarOpen}) => {

    const sidebarRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (sidebarOpen) {
            gsap.set(sidebarRef.current, { display: 'block' });
            gsap.fromTo(
                sidebarRef.current,
                { x: '100%' },
                { x: '0%', duration: 0.5, ease: 'power3.out' }
            );
        } else {
            gsap.to(sidebarRef.current, {
                x: '100%',
                duration: 0.5,
                ease: 'power3.in',
                onComplete: () => {
                    gsap.set(sidebarRef.current, { display: 'none' });
                },
            });
        }
    }, [sidebarOpen]);

  return (
    <div
      ref={sidebarRef}
      className="bg-white/8 backdrop-blur-[30px] min-w-[450px] fixed top-0 bottom-0 right-0 z-40 translate-x-full will-change-transform hidden">
      <div className='pt-12 px-4'>
        <p className="text-xs uppercase border-b border-white/70 text-white/70 py-2 font-poppins">Navigation</p>

        <div className="flex flex-col gap-8 items-start font-archivo mt-5 px-4">
            {
                sideLinks.map(link => (
                    <p className="text-4xl cursor-pointer font-semibold uppercase"
                    onClick={() => {
                        navigate(link.link)
                        toggleSidebar();
                    }}>{link.name}</p>
                ))
            }
        </div>
      </div>
    </div>
  )
}

export default Sidebar