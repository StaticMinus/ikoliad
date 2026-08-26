import React, { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.85, 0.98] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 0.8], [18, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 0.8], [0, -80]);

  return (
    <div
      className="min-h-[65rem] md:min-h-[85rem] flex items-center justify-center relative p-3 sm:p-6 md:p-12 selection:bg-[#0082FF] selection:text-white"
      ref={containerRef}
    >
      <div
        className="py-6 sm:py-10 md:py-24 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: string | React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="max-w-5xl mx-auto text-center px-4 mb-8 sm:mb-12"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 12px 28px #00000030, 0 45px 50px #00000025, 0 95px 70px #00000015, 0 180px 100px #0000000a",
      }}
      className="max-w-6xl -mt-6 sm:-mt-10 md:-mt-12 mx-auto h-[38rem] sm:h-[44rem] md:h-[50rem] w-full border-2 sm:border-4 border-slate-700/60 p-2 sm:p-4 md:p-6 bg-[#0E131F] rounded-[28px] sm:rounded-[36px] shadow-2xl overflow-hidden backdrop-blur-xl"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-[#090D16] border border-white/10 relative flex flex-col">
        {children}
      </div>
    </motion.div>
  );
};
