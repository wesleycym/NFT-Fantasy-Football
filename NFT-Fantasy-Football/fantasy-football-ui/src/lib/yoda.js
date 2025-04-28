import { toast } from "react-toastify"; // For alerts

export const approveYodaSpend = async (yoda, spender, amount) => {
  // Show toast immediately
  const toastId = toast.loading("Approving YODA spend...", {
    position: "top-left",
    theme: "dark",
  });

  try {
    const tx = await yoda.approve(spender, amount);
    await tx.wait();

    console.log("YODA approved for spending");

    toast.update(toastId, {
      render: "✅ YODA spend approved!",
      type: "success",
      isLoading: false,
      autoClose: 3000,
    });
  } catch (error) {
    console.error("YODA approval failed:", error);

    toast.update(toastId, {
      render: "❌ YODA approval failed",
      type: "error",
      isLoading: false,
      autoClose: 3000,
    });

    throw error; // important: rethrow so handleMint can still catch it
  }
};