
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
import { toast } from "react-toastify"; // For alerts
import { ethers } from "ethers";
import { buyNFT } from "../../lib/buyNFT"; // Import buyNFT
import FantasyFootballABI from "../../contracts/FantasyFootball.json";

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

export const CardBody = ({ children, className, player, walletAddress, isConnected, contractAddress }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [isBuying, setIsBuying] = useState(false);

  const handleBuy = async () => {
    try {
      setIsBuying(true);
      // Minting logic here
      console.log("Minting NFT for:", player.name);
    } catch (err) {
      console.error("Mint failed:", err);
    } finally {
      setIsBuying(false);
    }
  };

  return (
    <div className={cn("h-96 w-72 relative [transform-style:preserve-3d]", className)}>
      {children}

      {/* Info + Buy Buttons */}
      <div className="absolute bottom-4 left-4 flex gap-2 z-10 [transform:translateZ(60px)]">
        <button
          onClick={() => setShowInfo(true)}
          className="px-3 py-1 bg-white text-black rounded shadow border border-black"
        >
          ℹ️ Info
        </button>

        {!isConnected ? (
          <button
            disabled
            className="px-3 py-1 bg-gray-500 text-white rounded shadow border border-black opacity-50 cursor-not-allowed"
          >
            Connect Wallet
          </button>
        ) : (
          <button
            onClick={handleBuy}
            disabled={isBuying}
            className={`px-3 py-1 rounded shadow border border-black ${
              isBuying
                ? "bg-gray-500 cursor-not-allowed text-white opacity-50"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {isBuying ? "Processing..." : `Buy for (${player.mintPrice}) YODA`}
          </button>
        )}
      </div>

      {/* Info Panel */}
      {showInfo && (
        <div className="absolute top-6 left-4 right-4 bottom-6 z-20 bg-black/80 text-white flex flex-col justify-center items-center p-4 rounded-xl [transform:translateZ(70px)]">
          <div className="w-full max-w-full text-center break-words overflow-hidden">
            <h2 className="text-xl font-bold mb-2">{player.name}</h2>
            <p>{player.position} - {player.team}</p>
            <p className="mt-4 text-sm font-semibold underline">Rank Tiers</p>
            <ul className="text-xs leading-5">
              <li>🏆 Hall of Fame: 40+</li>
              <li>💪 All-Pro: 30–39</li>
              <li>🔒 Starter: 15–29</li>
              <li>🛠️ Bench: 8–14</li>
              <li>📦 Practice Squad: 5–7</li>
              <li>🧢 Draft Bust: &lt; 5</li>
            </ul>
            <button
              onClick={() => setShowInfo(false)}
              className="mt-4 px-4 py-1 bg-white text-black rounded"
            >
              Close
            </button>
          </div>
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
