"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const CardFlip = ({ front, back }: { front: string; back: string }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  function handleFlip() {
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
      setIsAnimating(true);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[500px] cursor-pointer perspective-1000">
      <div
        className="relative w-[600px] h-[360px] transition-all duration-300"
        onClick={handleFlip}
      >
        <motion.div
          className="w-full h-full relative preserve-3d"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          onAnimationComplete={() => setIsAnimating(false)}
        >
          <div className="absolute inset-0 w-full h-full backface-hidden">
            <div className="w-full h-full bg-[#1A1635] border border-white/10 rounded-2xl p-8 flex flex-col justify-between shadow-2xl overflow-hidden">
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#4ade80]/10 blur-[80px] group-hover:bg-[#4ade80]/20 transition-colors" />
              
              <div className="flex justify-between items-center z-10">
                <span className="text-[#4ade80] text-xs font-bold uppercase tracking-widest bg-[#4ade80]/10 px-3 py-1 rounded-full">Question</span>
                <span className="text-gray-500 text-xs italic">Click to flip</span>
              </div>

              <div className="flex-1 flex items-center justify-center z-10">
                <h2 className="text-3xl font-semibold text-white text-center leading-snug">
                  {front}
                </h2>
              </div>

              
            </div>
          </div>

          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
            <div className="w-full h-full bg-[#4ade80] border border-white/20 rounded-2xl p-8 flex flex-col justify-between shadow-2xl overflow-hidden">
              <div className="flex justify-between items-center">
                <span className="text-[#15122D] text-xs font-bold uppercase  bg-black/10 px-3 py-1 rounded-full">Answer</span>
              </div>

              <div className="flex-1 flex items-center justify-center">
                <p className="text-[#15122D] text-2xl font-medium text-center ">
                  {back}
                </p>
              </div>

              
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CardFlip;