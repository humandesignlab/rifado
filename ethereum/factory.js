import web3 from "./web3";
import LottoCoinFactory from "./build/LottoCoinFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(LottoCoinFactory.interface),
  "0x9c3EF2D815295F54017D1738864576baa5fC439E"
);

export default instance;
