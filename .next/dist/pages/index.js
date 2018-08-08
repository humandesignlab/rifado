'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _factory = require('../ethereum/factory');

var _factory2 = _interopRequireDefault(_factory);

var _raffle = require('../ethereum/raffle');

var _raffle2 = _interopRequireDefault(_raffle);

var _Layout = require('../components/Layout');

var _Layout2 = _interopRequireDefault(_Layout);

var _RafflesList = require('../components/RafflesList');

var _RafflesList2 = _interopRequireDefault(_RafflesList);

var _routes = require('../routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/humbertomangino/Documents/rifas/ether-raffle/pages/index.js?entry';


var RaffleIndex = function (_Component) {
	(0, _inherits3.default)(RaffleIndex, _Component);

	function RaffleIndex() {
		(0, _classCallCheck3.default)(this, RaffleIndex);

		return (0, _possibleConstructorReturn3.default)(this, (RaffleIndex.__proto__ || (0, _getPrototypeOf2.default)(RaffleIndex)).apply(this, arguments));
	}

	(0, _createClass3.default)(RaffleIndex, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(_Layout2.default, {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 11
				}
			}, _react2.default.createElement('div', {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 12
				}
			}, _react2.default.createElement(_semanticUiReact.Segment, {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 13
				}
			}, _react2.default.createElement(_routes.Link, { route: '/', __source: {
					fileName: _jsxFileName,
					lineNumber: 14
				}
			}, _react2.default.createElement('a', {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 15
				}
			}, _react2.default.createElement(_semanticUiReact.Button, { content: 'See all raffles', icon: 'eye', primary: true, __source: {
					fileName: _jsxFileName,
					lineNumber: 16
				}
			}))), _react2.default.createElement(_routes.Link, { route: '/raffles/new', __source: {
					fileName: _jsxFileName,
					lineNumber: 19
				}
			}, _react2.default.createElement('a', {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 20
				}
			}, _react2.default.createElement(_semanticUiReact.Button, {
				floated: 'left',
				content: 'Create a new raffle',
				icon: 'add circle',
				primary: true,
				__source: {
					fileName: _jsxFileName,
					lineNumber: 21
				}
			})))), _react2.default.createElement(_semanticUiReact.Segment, { vertical: true, __source: {
					fileName: _jsxFileName,
					lineNumber: 31
				}
			}, _react2.default.createElement(_RafflesList2.default, {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 32
				}
			}))));
		}
	}]);

	return RaffleIndex;
}(_react.Component);

exports.default = RaffleIndex;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2luZGV4LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiQ2FyZCIsIkJ1dHRvbiIsIlNlZ21lbnQiLCJmYWN0b3J5IiwiUmFmZmxlIiwiTGF5b3V0IiwiUmFmZmxlc0xpc3QiLCJMaW5rIiwiUmFmZmxlSW5kZXgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTyxBQUFTOzs7O0FBQ2hCLEFBQVMsQUFBTSxBQUFROztBQUN2QixBQUFPLEFBQWE7Ozs7QUFDcEIsQUFBTyxBQUFZOzs7O0FBQ25CLEFBQU8sQUFBWTs7OztBQUNuQixBQUFPLEFBQWlCOzs7O0FBQ3hCLEFBQVMsQUFBWTs7Ozs7OztJLEFBQ2Y7Ozs7Ozs7Ozs7OzJCQUNJLEFBQ1I7MEJBQ0MsQUFBQzs7ZUFBRDtpQkFBQSxBQUNDO0FBREQ7QUFBQSxJQUFBLGtCQUNDLGNBQUE7O2VBQUE7aUJBQUEsQUFDQztBQUREO0FBQUEsc0JBQ0MsQUFBQzs7ZUFBRDtpQkFBQSxBQUNDO0FBREQ7QUFBQSxzQkFDQyxBQUFDLDhCQUFLLE9BQU4sQUFBWTtlQUFaO2lCQUFBLEFBQ0M7QUFERDtzQkFDQyxjQUFBOztlQUFBO2lCQUFBLEFBQ0M7QUFERDtBQUFBLHNCQUNDLEFBQUMseUNBQU8sU0FBUixBQUFnQixtQkFBa0IsTUFBbEMsQUFBdUMsT0FBTSxTQUE3QyxBQUFzRDtlQUF0RDtpQkFISCxBQUNDLEFBQ0MsQUFDQyxBQUdGO0FBSEU7eUJBR0YsQUFBQyw4QkFBSyxPQUFOLEFBQVk7ZUFBWjtpQkFBQSxBQUNDO0FBREQ7c0JBQ0MsY0FBQTs7ZUFBQTtpQkFBQSxBQUNDO0FBREQ7QUFBQSxzQkFDQyxBQUFDO2FBQUQsQUFDUyxBQUNSO2FBRkQsQUFFUyxBQUNSO1VBSEQsQUFHTSxBQUNMO2FBSkQsQUFJVTs7ZUFKVjtpQkFUSixBQUNDLEFBTUMsQUFDQyxBQUNDLEFBVUg7QUFWRztBQUNDLDBCQVNKLEFBQUMsMENBQVEsVUFBVDtlQUFBO2lCQUFBLEFBQ0M7QUFERDtzQkFDQyxBQUFDOztlQUFEO2lCQXRCSixBQUNDLEFBQ0MsQUFtQkMsQUFDQyxBQUtKO0FBTEk7QUFBQTs7Ozs7QUF4Qm9CLEEsQUFnQzFCOztrQkFBQSxBQUFlIiwiZmlsZSI6ImluZGV4LmpzP2VudHJ5Iiwic291cmNlUm9vdCI6Ii9Vc2Vycy9odW1iZXJ0b21hbmdpbm8vRG9jdW1lbnRzL3JpZmFzL2V0aGVyLXJhZmZsZSJ9