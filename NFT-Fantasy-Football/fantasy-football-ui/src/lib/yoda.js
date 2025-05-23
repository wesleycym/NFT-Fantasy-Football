import { toast } from "react-toastify"; // For alerts

export const approveYodaSpend = async (yoda, spender, amount) => {
  // Show toast immediately
  const toastId = toast.loading("Approving YODA spend...", {
    position: "top-left",
    theme: "dark",
  });

  try {
    const tx = await yoda.approve(spender, amount);

    // Have toast tell the user what is happening
    toast.info("⏳ Waiting for approval to confirm...", { 
      position: "top-left",
      autoClose: false,
      theme: "dark",
      autoClose: 3000,
    });

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

    // Send toast noti
    toast.update(toastId, {
      render: "❌ YODA approval failed",
      type: "error",
      isLoading: false,
      autoClose: 3000,
    });

    throw error; // Rethrow so handleMint can still catch it
  }
};