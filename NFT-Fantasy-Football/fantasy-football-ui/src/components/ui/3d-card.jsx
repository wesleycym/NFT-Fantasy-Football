
import { cn } from "../../lib/utils";
import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";

// Hero icons:
import { CheckBadgeIcon } from "@heroicons/react/24/outline";


import { buyNFT } from "../../lib/buyNFT"; // Import buyNFT
const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS; // Contract address from .env

const MouseEnterContext = createContext(undefined);

export const CardContainer = ({
  children,
  className,
  containerClassName
}) => {
  const containerRef = useRef(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  };

  const handleMouseEnter = (e) => {
    setIsMouseEntered(true);
    if (!containerRef.current) return;
  };

  const handleMouseLeave = (e) => {
    if (!containerRef.current) return;
    setIsMouseEntered(false);
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
  };
  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn("py-20 flex items-center justify-center", containerClassName)}
        style={{
          perspective: "1000px",
        }}>
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "flex items-center justify-center relative transition-all duration-200 ease-linear",
            className
          )}
          style={{
            transformStyle: "preserve-3d",
          }}>
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

export const CardBody = ({ children, className, player, isOwnedType }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div
      className={cn(
        "h-96 w-72 relative [transform-style:preserve-3d]",
        className
      )}
    >
      {children}

      {/* Info + Buy Buttons */}
      <div className="absolute bottom-4 left-4 flex gap-2 z-10 [transform:translateZ(60px)]">
        <button
          onClick={() => setShowInfo(true)}
          className="px-3 py-1 bg-white text-black rounded shadow border border-black border-size-2 border-r-100"
        >
          ℹ️ Info
        </button>
        <button
          onClick={() => buyNFT(player.id, CONTRACT_ADDRESS)}
          className="px-3 py-1 bg-green-600 text-white rounded shadow border border-black border-size-2 border-r-100"
        >
          Buy
        </button>
      </div>

      {/* Info Panel - on top of card */}
      {showInfo && (
        <div className="absolute top-6 left-4 right-4 bottom-6 z-20 bg-black/80 text-white flex flex-col justify-center items-center p-4 rounded-xl [transform:translateZ(70px)]">
          <div className="w-full max-w-full text-center break-words overflow-hidden">
            <h2 className="text-xl font-bold mb-2">{player.name}</h2>
            <p>{player.position} - {player.team}</p>
            <p>Fantasy Points: {player.fantasyPoints}</p>
            <p className="text-sm break-words mt-2">Owner: {player.owner}</p>
            <button
              onClick={() => setShowInfo(false)}
              className="mt-4 px-4 py-1 bg-white text-black rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Owned badge -> Debugging & displaying if user owns the NFT */}
      {isOwnedType && (
        <div className="absolute top-2 left-2 z-20 bg-black/70 rounded-full p-1 animate-pulse">
          <CheckBadgeIcon className="w-5 h-5 text-green-400" />
        </div>
      )}

    </div>
  );
};

export const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}) => {
  const ref = useRef(null);
  const [isMouseEntered] = useMouseEnter();

  useEffect(() => {
    handleAnimations();
  }, [isMouseEntered]);

  const handleAnimations = () => {
    if (!ref.current) return;
    if (isMouseEntered) {
      ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    } else {
      ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
    }
  };

  return (
    <Tag
      ref={ref}
      className={cn("w-fit transition duration-200 ease-linear", className)}
      {...rest}>
      {children}
    </Tag>
  );
};

// Create a hook to use the context
export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider");
  }
  return context;
};
