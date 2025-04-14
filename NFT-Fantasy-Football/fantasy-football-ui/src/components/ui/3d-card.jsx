
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

export const CardBody = ({ children, className, player, walletAddress, isOwned, isConnected, onBuySuccess, contractAddress }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [isBuying, setIsBuying] = useState(false);

  const parsePrice = (input, fallback) => {
    const parsed = Number(input);
    return isNaN(parsed) || parsed < 0 ? fallback : parsed;
  };

  return (
    <div className={cn("h-96 w-72 relative [transform-style:preserve-3d]", className)}>
      {children}

      {/* Info + Buy Buttons */}
      <div className="absolute bottom-4 left-4 flex gap-2 z-10 [transform:translateZ(60px)]">
        <button
          onClick={() => setShowInfo(true)}
          className="px-3 py-1 bg-white text-black rounded shadow border border-black border-size-2 border-r-100"
        >
          ℹ️ Info
        </button>

        {!isConnected ? (
          <button
            disabled
            className="px-3 py-1 bg-gray-500 text-white rounded shadow border border-black border-size-2 border-r-100 opacity-50 cursor-not-allowed"
          >
            Connect Wallet
          </button>
        ) : isOwned ? (
          <button
            disabled
            className="px-3 py-1 bg-gray-400 text-white rounded shadow border border-black border-size-2 border-r-100 opacity-50 cursor-not-allowed"
          >
            Owned
          </button>
        ) : player.forSale ? (
          <button
            onClick={async () => {
              setIsBuying(true);
              await buyNFT(player.id, contractAddress);
              onBuySuccess(player.id, walletAddress);
              setIsBuying(false);
            }}
            disabled={isBuying}
            className={`px-3 py-1 rounded shadow border border-black border-size-2 border-r-100 ${
              isBuying
                ? "bg-gray-500 cursor-not-allowed text-white opacity-50"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {isBuying ? "Processing..." : `Buy (${player.salePrice})`}
          </button>
        ) : (
          <button
            disabled
            className="px-3 py-1 bg-gray-400 text-white rounded shadow border border-black border-size-2 border-r-100 opacity-50 cursor-not-allowed"
          >
            Not For Sale
          </button>
        )}
      </div>

      {/* Info Panel */}
      {showInfo && (
        <div className="absolute top-6 left-4 right-4 bottom-6 z-20 bg-black/80 text-white flex flex-col justify-center items-center p-4 rounded-xl [transform:translateZ(70px)]">
          <div className="w-full max-w-full text-center break-words overflow-hidden">
            <h2 className="text-xl font-bold mb-2">{player.name}</h2>
            <p>{player.position} - {player.team}</p>
            <p>Fantasy Points: {player.fantasyPoints}</p>
            <p>Sale Price: {player.salePrice}</p>
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

      {/* Owned Badge */}
      {isOwned && (
        <div className="absolute top-5 left-5 [transform:translateZ(60px)]">
          <CheckBadgeIcon className="w-6 h-6 text-green-400 border border-black rounded-full bg-black/80 p-[2px]" />
        </div>
      )}

      {/* List for Sale Toggle (Owner Only) */}
      {isOwned && (
        <div className="absolute top-5 right-5 [transform:translateZ(60px)] bg-black/70 p-2 rounded-lg text-xs text-white flex flex-col items-end space-y-1">
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={player.forSale}
              disabled={isBuying} // disabled while toggling
              onChange={async (e) => {
                const newStatus = e.target.checked;

                try {
                  setIsBuying(true);
                  const provider = new ethers.BrowserProvider(window.ethereum);
                  const signer = await provider.getSigner();
                  const contract = new ethers.Contract(contractAddress, FantasyFootballABI.abi, signer);

                  const tx = await contract.setForSale(player.id, newStatus, player.salePrice);
                  await tx.wait();

                  onBuySuccess(player.id, walletAddress); // Refresh UI

                  toast.success(
                    newStatus ? "✅ NFT listed for sale!" : "❎ NFT removed from sale",
                    { position: "top-right", autoClose: 2500 }
                  );
                } catch (err) {
                  console.error("Failed to toggle sale status:", err);
                  alert("Sale status update failed.");
                } finally {
                  setIsBuying(false);
                }
              }}
            />
            For Sale
          </label>

          <label className="text-white text-[10px] flex items-center gap-1">
            Price:
            <input
              type="number"
              className="w-16 px-1 py-[2px] text-black text-xs rounded"
              defaultValue={player.salePrice}
              disabled={isBuying}
              onBlur={async (e) => {
                const newPrice = parsePrice(e.target.value, player.salePrice);
                if (newPrice === Number(player.salePrice)) return;

                try {
                  setIsBuying(true);
                  const provider = new ethers.BrowserProvider(window.ethereum);
                  const signer = await provider.getSigner();
                  const contract = new ethers.Contract(contractAddress, FantasyFootballABI.abi, signer);

                  const tx = await contract.setForSale(player.id, player.forSale, newPrice);
                  await tx.wait();

                  onBuySuccess(player.id, walletAddress); // Refresh
                  toast.success(`✅ Price updated to ${newPrice}`, { position: "top-right", autoClose: 2500 });
                } catch (err) {
                  console.error("Failed to update price:", err);
                  alert("Price update failed.");
                } finally {
                  setIsBuying(false);
                }
              }}
            />
          </label>
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
