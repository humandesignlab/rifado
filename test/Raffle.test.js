require('events').EventEmitter.defaultMaxListeners = 0;
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/LottoCoinFactory.json');
const compiledRaffle = require('../ethereum/build/LottoCoin.json');

let accounts;
let factory;
let raffleAddress;
let raffle;

beforeEach(async () => {
	accounts = await web3.eth.getAccounts();

	factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
		.deploy({ data: compiledFactory.bytecode })
		.send({ from: accounts[0], gas: '1000000' });

	await factory.methods
		.createRaffle(10)
		.send({ from: accounts[0], gas: '1000000' });

	const addresses = await factory.methods.getDeployedRaffles().call();
	raffleAddress = addresses[0];
	raffle = new web3.eth.Contract(
		JSON.parse(compiledRaffle.interface),
		raffleAddress
	);
});

describe('LottoCoin Raffles', () => {
	it('Deploys a factory and a raffle', () => {
		assert.ok(factory.options.address);
		assert.ok(raffle.options.address);
	});

	it('marks caller as the Raffle manager', async () => {
		const manager = await raffle.methods.manager().call();
		assert.equal(accounts[0], manager);
	});

	it('can create a ticket block', async () => {
		let getNewValue = await raffle.methods.getTicketBlockLength().call();
		assert.equal(getNewValue, 10);
	});

	it('can buy 5 tickets', async () => {
		let getNewValue = [];
		for (let i = 0; i < 5; i++) {
			await raffle.methods
				.buyTicket(i)
				.send({ from: accounts[i], gas: 3000000, value: '110000000000000000' });
			getNewValue[i] = await raffle.methods.getFirstBoughtTicket(i).call();
			assert.equal(getNewValue[i], true);
		}
	});

	it('picks a winner ticket', async () => {
		await raffle.methods
			.buyTicket(5)
			.send({ from: accounts[0], gas: 3000000, value: '110000000000000000' });
		let getWinner = await raffle.methods.getWinner(5).call();
		assert.equal(getWinner[1], 5);
	});
});
