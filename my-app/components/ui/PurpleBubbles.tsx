// "use client";
// import { useEffect, useRef } from "react";
// import gsap from "gsap";

// export default function EnergyBackground() {
//   const waves = useRef([]);
//   const sparkles = useRef([]);
  

//   useEffect(() => {
   
//     waves.current.forEach((wave, i) => {
//       gsap.to(wave, {
//         x: i % 2 === 0 ? "+=180" : "-=180",
//         y: "+=60",
//         duration: 18 + i * 4,
//         repeat: -1,
//         yoyo: true,
//         ease: "sine.inOut",
//       });
//     });

//     // ✨ Sparkle drift
//     sparkles.current.forEach((dot) => {
//       gsap.to(dot, {
//         x: `+=${Math.random() * 300 - 150}`,
//         y: `+=${Math.random() * 300 - 150}`,
//         duration: 1.5 + Math.random() * 1.5,
//         repeat: -1,
//         yoyo: true,
//         ease: "power2.inOut"

//       });
//     });

//     // 🖱 Hover interaction (speed + pull)
//     const onMouseMove = (e) => {
//       const speed = 0.05;

//       waves.current.forEach((wave, i) => {
//         gsap.to(wave, {
//           x: e.clientX * speed * (i + 1),
//           duration: 1.6,
//           ease: "power3.out",
//         });
//       });

//       sparkles.current.forEach((dot) => {
//         gsap.to(dot, {
//           x: `+=${(Math.random() - 0.5) * 20}`,
//           y: `+=${(Math.random() - 0.5) * 20}`,
//           duration: 0.15,
//           ease: "power4.out",
//         });
//       });
//       ;
//     };

//     window.addEventListener("mousemove", onMouseMove);
//     return () => window.removeEventListener("mousemove", onMouseMove);
//   }, []);

//   return (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none">
//       {/* 🌊 Energy Waves */}
//       {[...Array(3)].map((_, i) => (
//         <div
//           key={i}
//           ref={(el) => (waves.current[i] = el)}
//           className="
//             absolute
//             w-[1200px]
//             h-[500px]
//             rounded-full
//             blur-[120px]
//             opacity-80
//             bg-[radial-gradient(ellipse,_rgba(168,85,247,0.45),_transparent_70%)]
//           "
//           style={{
//             top: `${20 + i * 20}%`,
//             left: i === 0 ? "-30%" : "40%",
//             transform: `rotate(${i * 15 - 20}deg)`,
//           }}
//         />
//       ))}

//       {/* ✨ Light Threads */}
//       {[...Array(10)].map((_, i) => (
//         <div
//           key={`line-${i}`}
//           className="
//             absolute top-0
//             w-[5px] h-[100%]
//             bg-gradient-to-b
//             from-transparent
//             via-purple-500/70
//             to-transparent
//             blur-sm
//             shadow-[0_0_60px_rgba(168,85,247,1)]
//           "
//           style={{ left: `${15 + i * 14}%` }}
//         />
//       ))}

//       {/* ✨ Sparkles */}
//       {[...Array(155)].map((_, i) => (
//         <div
//           key={`spark-${i}`}
//           ref={(el) => (sparkles.current[i] = el)}
//           className="
//             absolute
//             w-0.5 h-0.5
//             rounded-full
//             bg-purple-400
//             blur-[1px]
//             shadow-[0_0_18px_rgba(168,85,247,1)]
//           "
//           style={{
//             top: `${Math.random() * 100}%`,
//             left: `${Math.random() * 100}%`,
//           }}
//         />
//       ))}
//     </div>
//   );
// }
