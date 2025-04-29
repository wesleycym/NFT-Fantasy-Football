import { CardContainer, CardBody, CardItem } from "./ui/PackRevealModules/pack-3d-card.jsx";

const WalletCard = ({ nft }) => {
  return (
    <CardContainer className="w-[500px] h-[500px]">
        
      <CardBody className="bg-zinc-900 text-white rounded-xl p-6 shadow-lg flex flex-col items-center justify-center space-y-4">

        <CardItem translateZ={20}>
          <img src={nft.image} alt={nft.name} className="w-48 h-48 rounded-full object-cover shadow-md" />
        </CardItem>

        <CardItem translateZ={10}>
          <h2 className="text-xl font-bold">{nft.name}</h2>
        </CardItem>

        <CardItem translateZ={8}>
          <p className="text-sm text-center">{nft.description}</p>
        </CardItem>

      </CardBody>
    </CardContainer>
  );
};

export default WalletCard;