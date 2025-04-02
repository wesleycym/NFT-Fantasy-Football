
import { cn } from "../../lib/utils";
import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";

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

export const CardBody = ({ children, className, player }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div
      className={cn(
        "relative h-96 w-96 rounded-xl overflow-hidden [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]",
        "before:absolute before:inset-0 before:rounded-xl before:border before:border-pink-500 before:animate-pulse",
        className
      )}
    >
      {children}

      {/* Info + Buy Buttons */}
      <div className="absolute bottom-4 left-4 flex gap-2 z-10">
        <button
          onClick={() => setShowInfo(true)}
          className="px-3 py-1 bg-white text-black rounded shadow"
        >
          ℹ️ Info
        </button>
        <button
          onClick={() => alert("Buy functionality here")}
          className="px-3 py-1 bg-pink-500 text-white rounded shadow"
        >
          Buy
        </button>
      </div>

      {/* Info Modal */}
      {showInfo && (
        <div className="absolute inset-0 bg-black/80 text-white flex flex-col justify-center items-center z-20 p-4 rounded-xl">
          <h2 className="text-xl font-bold mb-2">{player.name}</h2>
          <p>{player.position} – {player.team}</p>
          <p>Fantasy Points: {player.fantasyPoints}</p>
          <p className="text-sm break-words mt-2">Owner: {player.owner}</p>
          <button
            onClick={() => setShowInfo(false)}
            className="mt-4 px-4 py-1 bg-white text-black rounded"
          >
            Close
          </button>
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
