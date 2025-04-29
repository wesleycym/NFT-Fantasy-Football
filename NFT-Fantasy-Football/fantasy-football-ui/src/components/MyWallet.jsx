import { useEffect, useState, useCallback } from "react";
import { ethers } from "ethers";
import FantasyFootballABI from "../contracts/FantasyFootball.json";
import WalletCard from "../components/WalletCard.jsx";
import { AnimatePresence, motion } from "framer-motion";

// Helper functions for sorting
import {extractFantasyPoints, sortByFantasyPoints, filterByRank,} from "../lib/sortNFTs";

function decodeBase64Unicode(str) {
    const binary = atob(str); // Decode base64 -> binary
    const bytes = Uint8Array.from(binary, char => char.charCodeAt(0)); // Convert to bytes
    const decoder = new TextDecoder(); // Browser decoder
    return decoder.decode(bytes); // Return string w/ emoji
  }

const MyWallet = ({ isOpen, onClose,walletAddress, contractAddress }) => {
    const [ownedNFTs, setOwnedNFTs] = useState([]); // Save owned NFTs
    const [rawNFTs, setRawNFTs] = useState([]); // Save unfiltered NFTs

    // Sort NFTs
    const handleSort = () => {
        setOwnedNFTs((prev) => sortByFantasyPoints(prev));
    };

    // Filter NFTs
    const handleFilter = (rankType) => {
        const filtered = filterByRank(rawNFTs, rankType);
        setOwnedNFTs(filtered);
    };

    const handleReset = () => setOwnedNFTs(rawNFTs); // Reset NFTs

    // Fetch owend NFTS
    const fetchNFTs = useCallback(async () => {
        if (!walletAddress) return; // No wallet connected

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, FantasyFootballABI.abi, signer);

        const tokenIds = await contract.getTokenIdsByOwner(walletAddress); // Gather all tokenIDs owned by user in the contract

        // Fetch metadata + decode emoji in name
        const nftData = await Promise.all(
        tokenIds.map(async (id) => {
            const uri = await contract.tokenURI(id);
            const json = JSON.parse(decodeBase64Unicode(uri.split(",")[1]));
            return { id, ...json };
        })
        );

        setRawNFTs(nftData); // Save unfiltered NFTs
        // Change state of owned NFTS
        setOwnedNFTs(nftData);
    }, [walletAddress, contractAddress]);

    useEffect(() => {
        fetchNFTs();
    }, [fetchNFTs]);

  return (
    <AnimatePresence>
        {isOpen && (
            <>
            {/* Backdrop */}
            <motion.div
                className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-md z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            />

            {/* Sidebar */}
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ 
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                }}
                className="fixed top-0 right-0 h-full w-full max-w-md bg-zinc-950 text-white shadow-lg z-50 p-6 overflow-y-auto"
            >

                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Your NFTs</h2>

                    <button
                        onClick={fetchNFTs}
                        className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded shadow transition duration-200 transform hover:scale-110 hover:rotate-3 will-change-transform origin-center"
                        >
                        Refresh
                    </button>

                    <button 
                        onClick={handleReset} 
                        className="text-sm bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded shadow transition duration-200 transform hover:scale-110 hover:rotate-3 will-change-transform origin-center"
                        >
                        Reset
                    </button>

                    <button
                        onClick={onClose}
                        className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded shadow transition duration-200 transform hover:scale-110 hover:rotate-3 will-change-transform origin-center"
                        >
                        Close
                    </button>

                </div>

                <div className="flex items-center justify-center gap-6 mt-4 py-4">
                    <button onClick={handleSort} className="w-10 h-10 flex items-center justify-center shadow transition duration-200 transform hover:scale-110 hover:rotate-3 will-change-transform origin-center">📈</button>
                    <button onClick={() => handleFilter("Hall of Fame")} className="w-10 h-10 flex items-center justify-center shadow transition duration-200 transform hover:scale-110 hover:rotate-3 will-change-transform origin-center">🏆</button>
                    <button onClick={() => handleFilter("All-Pro")} className="w-10 h-10 flex items-center justify-center shadow transition duration-200 transform hover:scale-110 hover:rotate-3 will-change-transform origin-center">💪</button>
                    <button onClick={() => handleFilter("Starter")} className="w-10 h-10 flex items-center justify-center shadow transition duration-200 transform hover:scale-110 hover:rotate-3 will-change-transform origin-center">🔒</button>
                    <button onClick={() => handleFilter("Bench")} className="w-10 h-10 flex items-center justify-center shadow transition duration-200 transform hover:scale-110 hover:rotate-3 will-change-transform origin-center">🛠️</button>
                    <button onClick={() => handleFilter("Practice Squad")} className="w-10 h-10 flex items-center justify-center shadow transition duration-200 transform hover:scale-110 hover:rotate-3 will-change-transform origin-center">📦</button>
                    <button onClick={() => handleFilter("Draft Bust")} className="w-10 h-10 flex items-center justify-center shadow transition duration-200 transform hover:scale-110 hover:rotate-3 will-change-transform origin-center">🧢</button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {ownedNFTs.length === 0 ? (
                        <p className="text-gray-400">You don't own any NFTs yet.</p>
                    ) : (
                        ownedNFTs.map((nft, idx) => <WalletCard key={idx} nft={nft} />)
                    )}
                </div>
            </motion.div>
            </>
        )}
    </AnimatePresence>
  );
};

export default MyWallet;