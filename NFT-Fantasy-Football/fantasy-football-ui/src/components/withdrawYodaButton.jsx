import { withdrawYoda } from "../lib/withdrawYoda";
import { ToastContainer, toast } from "react-toastify";

const WithdrawYodaButton = ({ contractAddress, walletAddress, ownerAddress }) => {
  const handleWithdraw = async () => {
    try {
      await withdrawYoda(contractAddress); // Attempt to withdraw yoda from contract
      toast.success("YODA withdrawn to contract owner", {
        position: "top-left",
        autoClose: 3000,
        theme: "dark",
      });
    } catch (error) {
      toast.error("Failed to withdraw YODA", {
        position: "top-left",
        autoClose: 3000,
        theme: "dark",
      })
    }
  };

  if (walletAddress.toLowerCase() !== ownerAddress.toLowerCase()) {
    return null; // Only show to owner
  }

  return (
    <button
      onClick={handleWithdraw}
      className="px-3 py-1 bg-blue-600 text-white rounded shadow border border-black hover:bg-blue-700"
    >
      Withdraw YODA
    </button>
  );
};

export default WithdrawYodaButton;