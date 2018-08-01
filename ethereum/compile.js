const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const rafflePath = path.resolve(__dirname, 'contracts', 'Raffle.sol');
const source1 = fs.readFileSync(rafflePath, 'utf8');

const oraclizePath = path.resolve(
	__dirname,
	'contracts',
	'oraclizeAPI_0.5.sol'
);
const source2 = fs.readFileSync(oraclizePath, 'utf8');

const input = {
	sources: {
		'Raffle.sol': source1,
		'oraclizeAPI_0.5.sol': source2
	}
};

const output = solc.compile(input, 1).contracts;
fs.ensureDirSync(buildPath);

for (let contract in output) {
	fs.outputJsonSync(
		path.resolve(
			buildPath,
			contract.replace(/oraclizeAPI_0.5.sol:|Raffle.sol:/gi, '') + '.json'
		),
		output[contract]
	);
}
