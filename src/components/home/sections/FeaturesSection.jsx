import React, { useLayoutEffect, useRef } from 'react'
import SpotlightCard from '../SpotlightCard'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { features } from '../../../constants/Home';
gsap.registerPlugin(ScrollTrigger);

const FeaturesSection = () => {

    const containerRef = useRef(null);
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const container = containerRef.current;
            const section = sectionRef.current;
            const panels = gsap.utils.toArray(".panel");

            gsap.to(panels, {
            xPercent: -100 * (panels.length - 1),
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top 20%",
                end: () => "+=" + (container.scrollWidth) * 1.5,
                pin: true,
                scrub: true,
                anticipatePin: 1,
                snap: 1 / (panels.length - 1),
                markers: false,
                id: "horizontalScroll",
            },
            });

            panels.forEach((panel, i) => {
              gsap.from(panel, {
                opacity: 0,
                y: 50,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: ScrollTrigger.getById("horizontalScroll")?.animation,
                  start: "left 80%",
                  toggleActions: "play none none reverse"
                }
              });
            });
            
        }, sectionRef);


        return () => ctx.revert();
    }, []);

  return (
    <section ref={sectionRef} className="relative mb-20">
        <p className='font-archivo uppercase text-end pb-5'>What <span className='text-mainRed '>separates </span>us?</p>

        <div ref={containerRef} className="w-full flex gap-10 translate-x-[60%]">
            {
                features.map((feature) => (
                    <SpotlightCard className="rounded-lg bg-black panel min-w-[400px]" spotlightColor="rgba(243, 208, 83, 0.3)">
                        <div className='flex flex-col gap-2 items-center'>
                            <p className='font-archivo text-mainYellow'>{feature.heading}</p>
                            <p className='text-white/70 text-center'>{feature.desc}</p>
                        </div>
                    </SpotlightCard>
                ))
            }
      </div>
    </section>
  )
}

export default FeaturesSection