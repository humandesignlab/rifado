import web3 from './web3';
import LottoCoinFactory from './build/LottoCoinFactory.json';

const instance = new web3.eth.Contract(
	JSON.parse(LottoCoinFactory.interface),
	'0x344F245F790Def86C9d163b8D7a65264CB569b2E'
);

export default instance;
