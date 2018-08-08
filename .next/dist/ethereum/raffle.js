'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _web = require('./web3');

var _web2 = _interopRequireDefault(_web);

var _LottoCoin = require('./build/LottoCoin.json');

var _LottoCoin2 = _interopRequireDefault(_LottoCoin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (address) {
	return new _web2.default.eth.Contract(JSON.parse(_LottoCoin2.default.interface), address);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV0aGVyZXVtL3JhZmZsZS5qcyJdLCJuYW1lcyI6WyJ3ZWIzIiwiUmFmZmxlIiwiZXRoIiwiQ29udHJhY3QiLCJKU09OIiwicGFyc2UiLCJpbnRlcmZhY2UiLCJhZGRyZXNzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxBQUFPLEFBQVAsQUFBaUIsQUFBakI7Ozs7QUFDQSxBQUFPLEFBQVAsQUFBbUIsQUFBbkIsQUFFQTs7Ozs7O2tCQUFlLG1CQUFXLEFBQ3pCO1FBQU8sSUFBSSxjQUFLLEFBQUwsSUFBUyxBQUFiLFNBQXNCLEtBQUssQUFBTCxNQUFXLG9CQUFPLEFBQWxCLEFBQXRCLFlBQW9ELEFBQXBELEFBQVAsQUFDQTtBQUZEIiwiZmlsZSI6InJhZmZsZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvaHVtYmVydG9tYW5naW5vL0RvY3VtZW50cy9yaWZhcy9ldGhlci1yYWZmbGUifQ==