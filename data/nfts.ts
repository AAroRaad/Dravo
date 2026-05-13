export type Nft = {
  id: string;
  img: string;
  name: string;
  artist: string;
  price: string;
  likes: number;
  category: "Art" | "Gaming" | "Photography" | "Collectibles";
};

const nft1 = "/assets/nft-1.jpg";
const nft2 = "/assets/nft-2.jpg";
const nft3 = "/assets/nft-3.jpg";
const nft4 = "/assets/nft-4.jpg";

const base: Nft[] = [
  { id: "1", img: nft1, name: "Cosmic Voyager #042", artist: "@nebula", price: "2.4", likes: 312, category: "Art" },
  { id: "2", img: nft2, name: "Polygon Ape #1108", artist: "@mosaic", price: "1.8", likes: 248, category: "Collectibles" },
  { id: "3", img: nft3, name: "Aether Dragon", artist: "@runic", price: "5.6", likes: 901, category: "Gaming" },
  { id: "4", img: nft4, name: "Neon Ronin", artist: "@bushido", price: "0.92", likes: 174, category: "Art" },
];

const extra: Nft[] = [
  { id: "5", img: nft3, name: "Stellar Drift #009", artist: "@orbit", price: "3.1", likes: 412, category: "Photography" },
  { id: "6", img: nft1, name: "Quantum Bloom", artist: "@flora", price: "1.2", likes: 188, category: "Art" },
  { id: "7", img: nft4, name: "Cyber Samurai", artist: "@edo", price: "4.5", likes: 720, category: "Gaming" },
  { id: "8", img: nft2, name: "Mosaic Tiger #77", artist: "@mosaic", price: "2.0", likes: 265, category: "Collectibles" },
  { id: "9", img: nft1, name: "Nova Mirage", artist: "@nebula", price: "0.78", likes: 143, category: "Art" },
  { id: "10", img: nft3, name: "Dragon Embers", artist: "@runic", price: "6.2", likes: 1024, category: "Gaming" },
  { id: "11", img: nft4, name: "Midnight Ronin", artist: "@bushido", price: "1.55", likes: 209, category: "Collectibles" },
  { id: "12", img: nft2, name: "Pixel Ape #042", artist: "@mosaic", price: "2.9", likes: 358, category: "Collectibles" },
];

export const featuredNfts: Nft[] = base;
export const allNfts: Nft[] = [...base, ...extra];
