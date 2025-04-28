import { withdrawYoda } from "../lib/withdrawYoda";
const WithdrawYodaButton = ({ contractAddress, walletAddress, ownerAddress }) => {
  const handleWithdraw = async () => {
    try {
      await withdrawYoda(contractAddress); // Attempt to withdraw yoda from contract
      alert("Withdrawal successful!");
    } catch (error) {
      alert("Withdrawal failed. Check console for details.");
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