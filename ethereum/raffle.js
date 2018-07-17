import web3 from './web3';
import Raffle from './build/LottoCoin.json';

export default address => {
	return new web3.eth.Contract(JSON.parse(Raffle.interface), address);
};
