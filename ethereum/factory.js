import web3 from './web3';
import LottoCoinFactory from './build/LottoCoinFactory.json';

const instance = new web3.eth.Contract(
	JSON.parse(LottoCoinFactory.interface),
	'0x9D915e3A0d4e1904Bda647ACd6FeB3e02E5143bf'
);

export default instance;
