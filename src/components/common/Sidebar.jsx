import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Sidebar = ({toggleSidebar, sidebarOpen}) => {

    const sidebarRef = useRef(null);

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
      className="bg-white/8 backdrop-blur-[30px] min-w-[450px] fixed top-0 bottom-0 right-0 z-40 translate-x-full will-change-transform hidden"
    >
    </div>
  )
}

export default Sidebar