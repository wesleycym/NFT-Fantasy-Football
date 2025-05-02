import { CardContainer, CardBody, CardItem } from "./ui/PackRevealModules/pack-3d-card.jsx";

const WalletCard = ({ nft }) => {

    // Pull fantasy points from description
    const fantasyPoints = (() => {
        const match = nft.description.match(/Fantasy Points: (\d+)/);
        return match ? match[1] : null;
      })();

  return (
    <CardContainer className="w-[350px] h-[400px]">
      <CardBody className="bg-zinc-900 text-white rounded-xl p-4 shadow-lg flex flex-col items-center justify-start space-y-3 w-[400px] h-[375px]">

        <CardItem translateZ={20}>
          <img 
            src={nft.image} 
            alt={nft.name} 
            className="object-cover rounded-md shadow-md" 
          />
        </CardItem>

        <CardItem translateZ={10}>
          <h2 className="text-lg font-bold text-center">
            {nft.name} {fantasyPoints ? `- ${fantasyPoints} FP` : ""}
            </h2>
        </CardItem>

      </CardBody>
    </CardContainer>
  );
};

export default WalletCard;