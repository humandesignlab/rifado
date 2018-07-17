const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/LottoCoinFactory.json');

const provider = new HDWalletProvider(
	'satoshi dolphin various depth flip adjust salad auto syrup mother innocent scatter',
	'https://rinkeby.infura.io/slX4Yg2TpaOuyK2ubGen'
);

const web3 = new Web3(provider);

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();
	console.log('Attmpting to deploy from account: ', accounts[0]);

	const result = await new web3.eth.Contract(
		JSON.parse(compiledFactory.interface)
	)
		.deploy({ data: '0x' + compiledFactory.bytecode, arguments: ['Hi there!'] })
		.send({
			from: accounts[0]
		});
	console.log('Contract deployed to address: ', result.options.address);
};
deploy();
