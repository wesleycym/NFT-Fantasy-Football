import PackReveal from "./pack-reveal";

const PackDisplay = ({ revealData, onClose }) => {
  if (!revealData) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
      <div className="w-full max-w-3xl p-4">
        <PackReveal
          player={revealData.player}
          fantasyPoints={revealData.fantasyPoints}
          rank={revealData.rank}
          breakdown={revealData.breakdown}
        />
        <div className="flex justify-center mt-11">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white text-black rounded hover:bg-gray-200 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackDisplay;