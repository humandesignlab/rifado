import web3 from "./web3";
import LottoCoinFactory from "./build/LottoCoinFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(LottoCoinFactory.interface),
  "0xF174d83EB6D945e629594A8Cc8e2e2618E1942D7"
);

export default instance;
