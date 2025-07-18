import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const AuroraBackground: React.FC = () => {
  const particlesInit = async (main: any) => {
    await loadFull(main);
  };

  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-950 opacity-90"></div>

      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          particles: {
            number: { value: 80 },
            color: { value: ["#facc15", "#ec4899", "#8b5cf6"] },
            shape: { type: "circle" },
            opacity: { value: 0.2 },
            size: { value: { min: 1, max: 4 } },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              outModes: "out",
              random: true,
              straight: false,
            },
            links: {
              enable: true,
              distance: 150,
              color: "#facc15",
              opacity: 0.2,
              width: 1,
            },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              onClick: { enable: true, mode: "push" },
            },
            modes: {
              repulse: { distance: 100 },
              push: { quantity: 4 },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
};

export default AuroraBackground;
