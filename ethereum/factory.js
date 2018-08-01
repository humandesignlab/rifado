import web3 from './web3';
import LottoCoinFactory from './build/LottoCoinFactory.json';

const instance = new web3.eth.Contract(
	JSON.parse(LottoCoinFactory.interface),
	'0xFea8234BD4355ab2A45eFB4F05D86F8AEc6717EF'
);

export default instance;
