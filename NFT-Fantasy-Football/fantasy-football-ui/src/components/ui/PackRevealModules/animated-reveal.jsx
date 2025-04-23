"use client";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index) => index === active;

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

  return (
    <div className="mx-auto max-w-2xl font-sans antialiased">
      <div className="relative w-[500px] h-[500px] mx-auto">
        <AnimatePresence mode="wait">
          {testimonials.map((testimonial, index) =>
            isActive(index) ? (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  z: -100,
                  rotate: randomRotateY(),
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  z: 0,
                  rotate: 0,
                  y: [0, -20, 0],
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  z: 100,
                  rotate: randomRotateY(),
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 origin-bottom rounded-3xl overflow-hidden shadow-lg bg-gray-900 text-white p-2 flex items-center justify-center"
              >
                {testimonial.content}
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex justify-center gap-4 pt-6">
        <button
          onClick={handlePrev}
          className="group/button flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
        >
          <IconArrowLeft className="h-5 w-5 text-black group-hover/button:rotate-12 dark:text-neutral-400 transition-transform duration-300" />
        </button>
        <button
          onClick={handleNext}
          className="group/button flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
        >
          <IconArrowRight className="h-5 w-5 text-black group-hover/button:-rotate-12 dark:text-neutral-400 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
};

export default AnimatedTestimonials;