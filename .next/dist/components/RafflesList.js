'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _web = require('../ethereum/web3');

var _web2 = _interopRequireDefault(_web);

var _routes = require('../routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/humbertomangino/Documents/rifas/ether-raffle/components/RafflesList.js';


var RafflesList = function (_Component) {
	(0, _inherits3.default)(RafflesList, _Component);

	function RafflesList() {
		var _ref;

		var _temp, _this, _ret;

		(0, _classCallCheck3.default)(this, RafflesList);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = RafflesList.__proto__ || (0, _getPrototypeOf2.default)(RafflesList)).call.apply(_ref, [this].concat(args))), _this), _this.state = { raffles: [] }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	}

	(0, _createClass3.default)(RafflesList, [{
		key: 'componentWillMount',
		value: function () {
			var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
				var _this2 = this;

				var getRaffles, raffles;
				return _regenerator2.default.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								_context2.next = 2;
								return _factory2.default.methods.getDeployedRaffles().call();

							case 2:
								getRaffles = _context2.sent;
								raffles = getRaffles.map(function () {
									var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(address) {
										var raffle, res, raffleObj;
										return _regenerator2.default.wrap(function _callee$(_context) {
											while (1) {
												switch (_context.prev = _context.next) {
													case 0:
														raffle = (0, _raffle2.default)(address);
														_context.next = 3;
														return raffle.methods.getRaffleSummary().call();

													case 3:
														res = _context.sent;
														_context.next = 6;
														return {
															raffleAddress: res[0],
															raffleBalance: _web2.default.utils.fromWei(res[1], 'ether'),
															soldTickets: res[2],
															remainingNumberOfTickets: res[3],
															ticketsBlock: res[4],
															soldTicketsNumbers: res[5]
														};

													case 6:
														raffleObj = _context.sent;
														_context.next = 9;
														return _this2.state.raffles.push(raffleObj);

													case 9:
													case 'end':
														return _context.stop();
												}
											}
										}, _callee, _this2);
									}));

									return function (_x) {
										return _ref3.apply(this, arguments);
									};
								}());

							case 4:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function componentWillMount() {
				return _ref2.apply(this, arguments);
			}

			return componentWillMount;
		}()
	}, {
		key: 'render',
		value: function render() {
			_react2.default.createElement('h3', {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 36
				}
			}, 'Open raffles');
			var items = this.state.raffles.map(function (raffle, index) {
				return {
					key: index,
					header: _react2.default.createElement('div', {
						__source: {
							fileName: _jsxFileName,
							lineNumber: 41
						}
					}, _react2.default.createElement(_semanticUiReact.Responsive, (0, _extends3.default)({
						as: _semanticUiReact.Label,
						size: 'large',
						attached: 'top',
						textAlign: 'left'
					}, _semanticUiReact.Responsive.onlyComputer, {
						__source: {
							fileName: _jsxFileName,
							lineNumber: 42
						}
					}), 'Raffle: ', raffle.raffleAddress), _react2.default.createElement(_semanticUiReact.Responsive, {
						minWidth: 320,
						maxWidth: 991,
						as: _semanticUiReact.Label,
						size: 'small',
						attached: 'top',
						textAlign: 'left',
						__source: {
							fileName: _jsxFileName,
							lineNumber: 51
						}
					}, 'Raffle: ', raffle.raffleAddress), _react2.default.createElement('p', {
						__source: {
							fileName: _jsxFileName,
							lineNumber: 61
						}
					}, 'This is the raffle description ')),
					description: _react2.default.createElement('div', {
						__source: {
							fileName: _jsxFileName,
							lineNumber: 65
						}
					}, _react2.default.createElement(_semanticUiReact.Responsive, (0, _extends3.default)({
						as: _semanticUiReact.Segment.Group
					}, _semanticUiReact.Responsive.onlyComputer, {
						horizontal: true,
						__source: {
							fileName: _jsxFileName,
							lineNumber: 66
						}
					}), _react2.default.createElement(_semanticUiReact.Segment, { inverted: true, color: 'teal', textAlign: 'center', __source: {
							fileName: _jsxFileName,
							lineNumber: 71
						}
					}, _react2.default.createElement(_semanticUiReact.Statistic, { inverted: true, size: 'tiny', __source: {
							fileName: _jsxFileName,
							lineNumber: 72
						}
					}, _react2.default.createElement(_semanticUiReact.Statistic.Value, {
						__source: {
							fileName: _jsxFileName,
							lineNumber: 73
						}
					}, _react2.default.createElement(_semanticUiReact.Icon, { name: 'ethereum', __source: {
							fileName: _jsxFileName,
							lineNumber: 74
						}
					}), ' ', raffle.raffleBalance, ' ETH'), _react2.default.createElement(_semanticUiReact.Statistic.Label, {
						__source: {
							fileName: _jsxFileName,
							lineNumber: 76
						}
					}, 'Accumulated Prize'))), _react2.default.createElement(_semanticUiReact.Segment, { textAlign: 'center', __source: {
							fileName: _jsxFileName,
							lineNumber: 79
						}
					}, _react2.default.createElement(_semanticUiReact.Statistic, {
						color: raffle.remainingNumberOfTickets === '0' ? 'grey' : 'green',
						size: 'tiny',
						__source: {
							fileName: _jsxFileName,
							lineNumber: 80
						}
					}, _react2.default.createElement(_semanticUiReact.Statistic.Value, {
						__source: {
							fileName: _jsxFileName,
							lineNumber: 86
						}
					}, _react2.default.createElement(_semanticUiReact.Icon, { name: 'ticket', __source: {
							fileName: _jsxFileName,
							lineNumber: 87
						}
					}), ' ', raffle.remainingNumberOfTickets), _react2.default.createElement(_semanticUiReact.Statistic.Label, {
						__source: {
							fileName: _jsxFileName,
							lineNumber: 89
						}
					}, 'Remaining tickets'))), _react2.default.createElement(_semanticUiReact.Segment, { textAlign: 'center', __source: {
							fileName: _jsxFileName,
							lineNumber: 92
						}
					}, _react2.default.createElement(_semanticUiReact.Statistic, { size: 'tiny', __source: {
							fileName: _jsxFileName,
							lineNumber: 93
						}
					}, _react2.default.createElement(_semanticUiReact.Statistic.Value, {
						__source: {
							fileName: _jsxFileName,
							lineNumber: 94
						}
					}, _react2.default.createElement(_semanticUiReact.Icon, { color: 'green', name: 'check circle', __source: {
							fileName: _jsxFileName,
							lineNumber: 95
						}
					}), ' 1 in', ' ', raffle.ticketsBlock), _react2.default.createElement(_semanticUiReact.Statistic.Label, {
						__source: {
							fileName: _jsxFileName,
							lineNumber: 98
						}
					}, 'Chances per Ticket'))), _react2.default.createElement(_semanticUiReact.Segment, { textAlign: 'center', __source: {
							fileName: _jsxFileName,
							lineNumber: 101
						}
					}, _react2.default.createElement(_semanticUiReact.Statistic, { size: 'tiny', __source: {
							fileName: _jsxFileName,
							lineNumber: 102
						}
					}, _react2.default.createElement(_semanticUiReact.Statistic.Value, {
						__source: {
							fileName: _jsxFileName,
							lineNumber: 103
						}
					}, _react2.default.createElement(_semanticUiReact.Icon, { color: 'green', name: 'calendar', __source: {
							fileName: _jsxFileName,
							lineNumber: 104
						}
					}), ' 12/12/18'), _react2.default.createElement(_semanticUiReact.Statistic.Label, {
						__source: {
							fileName: _jsxFileName,
							lineNumber: 106
						}
					}, 'Draw date')))), _react2.default.createElement(_semanticUiReact.Responsive, { as: _semanticUiReact.Segment.Group, minWidth: 320, maxWidth: 991, __source: {
							fileName: _jsxFileName,
							lineNumber: 111
						}
					}, _react2.default.createElement(_semanticUiReact.Segment, { inverted: true, color: 'teal', textAlign: 'center', __source: {
							fileName: _jsxFileName,
							lineNumber: 112
						}
					}, _react2.default.createElement(_semanticUiReact.Statistic, { inverted: true, size: 'tiny', __source: {
							fileName: _jsxFileName,
							lineNumber: 113
						}
					}, _react2.default.createElement(_semanticUiReact.Statistic.Value, {
						__source: {
							fileName: _jsxFileName,
							lineNumber: 114
						}
					}, _react2.default.createElement(_semanticUiReact.Icon, { name: 'ethereum', __source: {
							fileName: _jsxFileName,
							lineNumber: 115
						}
					}), ' ', raffle.raffleBalance, ' ETH'), _react2.default.createElement(_semanticUiReact.Statistic.Label, {
						__source: {
							fileName: _jsxFileName,
							lineNumber: 117
						}
					}, 'Accumulated Prize'))), _react2.default.createElement(_semanticUiReact.Segment, { textAlign: 'center', __source: {
							fileName: _jsxFileName,
							lineNumber: 120
						}
					}, _react2.default.createElement(_semanticUiReact.Statistic, {
						color: raffle.remainingNumberOfTickets === '0' ? 'grey' : 'green',
						size: 'tiny',
						__source: {
							fileName: _jsxFileName,
							lineNumber: 121
						}
					}, _react2.default.createElement(_semanticUiReact.Statistic.Value, {
						__source: {
							fileName: _jsxFileName,
							lineNumber: 127
						}
					}, _react2.default.createElement(_semanticUiReact.Icon, { name: 'ticket', __source: {
							fileName: _jsxFileName,
							lineNumber: 128
						}
					}), ' ', raffle.remainingNumberOfTickets), _react2.default.createElement(_semanticUiReact.Statistic.Label, {
						__source: {
							fileName: _jsxFileName,
							lineNumber: 130
						}
					}, 'Remaining tickets'))), _react2.default.createElement(_semanticUiReact.Segment, { textAlign: 'center', __source: {
							fileName: _jsxFileName,
							lineNumber: 133
						}
					}, _react2.default.createElement(_semanticUiReact.Statistic, { size: 'tiny', __source: {
							fileName: _jsxFileName,
							lineNumber: 134
						}
					}, _react2.default.createElement(_semanticUiReact.Statistic.Value, {
						__source: {
							fileName: _jsxFileName,
							lineNumber: 135
						}
					}, _react2.default.createElement(_semanticUiReact.Icon, { color: 'green', name: 'check circle', __source: {
							fileName: _jsxFileName,
							lineNumber: 136
						}
					}), ' 1 in', ' ', raffle.ticketsBlock), _react2.default.createElement(_semanticUiReact.Statistic.Label, {
						__source: {
							fileName: _jsxFileName,
							lineNumber: 139
						}
					}, 'Chances per Ticket'))), _react2.default.createElement(_semanticUiReact.Segment, { textAlign: 'center', __source: {
							fileName: _jsxFileName,
							lineNumber: 142
						}
					}, _react2.default.createElement(_semanticUiReact.Statistic, { size: 'tiny', __source: {
							fileName: _jsxFileName,
							lineNumber: 143
						}
					}, _react2.default.createElement(_semanticUiReact.Statistic.Value, {
						__source: {
							fileName: _jsxFileName,
							lineNumber: 144
						}
					}, _react2.default.createElement(_semanticUiReact.Icon, { color: 'green', name: 'calendar', __source: {
							fileName: _jsxFileName,
							lineNumber: 145
						}
					}), ' 12/12/18'), _react2.default.createElement(_semanticUiReact.Statistic.Label, {
						__source: {
							fileName: _jsxFileName,
							lineNumber: 147
						}
					}, 'Draw date')))), _react2.default.createElement(_routes.Link, { route: '/raffles/' + raffle.raffleAddress, __source: {
							fileName: _jsxFileName,
							lineNumber: 152
						}
					}, _react2.default.createElement('a', {
						__source: {
							fileName: _jsxFileName,
							lineNumber: 153
						}
					}, 'View raffle details'))),
					fluid: true
				};
			});
			console.log('items ', items);
			return _react2.default.createElement('div', {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 162
				}
			}, _react2.default.createElement('h3', {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 163
				}
			}, 'Open raffles'), ' ', _react2.default.createElement(_semanticUiReact.Card.Group, { stackable: true, keys: items.id, items: items, __source: {
					fileName: _jsxFileName,
					lineNumber: 164
				}
			}));
		}
	}]);

	return RafflesList;
}(_react.Component);

exports.default = RafflesList;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvUmFmZmxlc0xpc3QuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJDb21wb25lbnQiLCJDYXJkIiwiTGFiZWwiLCJTZWdtZW50IiwiU3RhdGlzdGljIiwiUmVzcG9uc2l2ZSIsIkljb24iLCJmYWN0b3J5IiwiUmFmZmxlIiwid2ViMyIsIkxpbmsiLCJSYWZmbGVzTGlzdCIsInN0YXRlIiwicmFmZmxlcyIsIm1ldGhvZHMiLCJnZXREZXBsb3llZFJhZmZsZXMiLCJjYWxsIiwiZ2V0UmFmZmxlcyIsIm1hcCIsImFkZHJlc3MiLCJyYWZmbGUiLCJnZXRSYWZmbGVTdW1tYXJ5IiwicmVzIiwicmFmZmxlQWRkcmVzcyIsInJhZmZsZUJhbGFuY2UiLCJ1dGlscyIsImZyb21XZWkiLCJzb2xkVGlja2V0cyIsInJlbWFpbmluZ051bWJlck9mVGlja2V0cyIsInRpY2tldHNCbG9jayIsInNvbGRUaWNrZXRzTnVtYmVycyIsInJhZmZsZU9iaiIsInB1c2giLCJpdGVtcyIsImluZGV4Iiwia2V5IiwiaGVhZGVyIiwib25seUNvbXB1dGVyIiwiZGVzY3JpcHRpb24iLCJHcm91cCIsImZsdWlkIiwiY29uc29sZSIsImxvZyIsImlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBUzs7OztBQUNoQixBQUNDLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQTs7QUFFRCxBQUFPLEFBQWE7Ozs7QUFDcEIsQUFBTyxBQUFZOzs7O0FBQ25CLEFBQU8sQUFBVTs7OztBQUNqQixBQUFTLEFBQVk7Ozs7Ozs7SUFFZixBOzs7Ozs7Ozs7Ozs7OztvTkFDTCxBLFFBQVEsRUFBRSxTQUFTLEEsQUFBWDs7Ozs7Ozs7Ozs7Ozs7O2VBRWtCLGtCQUFBLEFBQVEsUUFBUixBQUFnQixxQixBQUFoQixBQUFxQzs7WUFBeEQ7QSwrQkFDQTtBLDZCQUFVLEFBQVcsZ0JBQVg7OEZBQWUsaUJBQUEsQUFBTSxTQUFOOzJCQUFB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O0FBQUEsUUE1QkgsQUFzQkMsQUFDQyxBQUtDLEFBR0YseUNBQUEsQUFBQywwQ0FBUSxXQUFULEFBQW1CO2lCQUFuQjttQkFBQSxBQUNDO0FBREQ7d0JBQ0MsQUFBQyw0Q0FBVSxNQUFYLEFBQWdCO2lCQUFoQjttQkFBQSxBQUNDO0FBREQ7d0JBQ0UsY0FBRCwyQkFBQSxBQUFXOztpQkFBWDttQkFBQSxBQUNDO0FBREQ7QUFBQSx3QkFDQyxBQUFDLHVDQUFLLE9BQU4sQUFBWSxTQUFRLE1BQXBCLEFBQXlCO2lCQUF6QjttQkFERCxBQUNDO0FBQUE7U0FGRixBQUNDLEFBR0EsOEJBQUMsY0FBRCwyQkFBQSxBQUFXOztpQkFBWDttQkFBQTtBQUFBO0FBQUEsUUFsRkosQUE4Q0MsQUErQkMsQUFDQyxBQUlDLEFBS0gsaUNBQUEsQUFBQyw4QkFBSyxxQkFBbUIsT0FBekIsQUFBZ0M7aUJBQWhDO21CQUFBLEFBQ0M7QUFERDt3QkFDQyxjQUFBOztpQkFBQTttQkFBQTtBQUFBO0FBQUEsUUFuSEcsQUEyQkwsQUF1RkMsQUFDQyxBQUlIO1lBdkhELEFBQU8sQUF1SEMsQUFFUjtBQXpITyxBQUNOO0FBRkYsQUFBYyxBQTJIZCxJQTNIYztXQTJIZCxBQUFRLElBQVIsQUFBWSxVQUFaLEFBQXNCLEFBQ3RCOzBCQUNDLGNBQUE7O2VBQUE7aUJBQUEsQUFDQztBQUREO0FBQUEsSUFBQSxrQkFDQyxjQUFBOztlQUFBO2lCQUFBO0FBQUE7QUFBQSxNQURELEFBQ0MsQUFBc0IsaUJBRHZCLEFBRUMsbUNBQUEsQUFBQyxzQkFBRCxBQUFNLFNBQU0sV0FBWixBQUF1QixNQUFNLE1BQU0sTUFBbkMsQUFBeUMsSUFBSSxPQUE3QyxBQUFvRDtlQUFwRDtpQkFIRixBQUNDLEFBRUMsQUFHRjtBQUhFOzs7Ozs7QUFySnNCLEEsQUEySjFCOztrQkFBQSxBQUFlIiwiZmlsZSI6IlJhZmZsZXNMaXN0LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9odW1iZXJ0b21hbmdpbm8vRG9jdW1lbnRzL3JpZmFzL2V0aGVyLXJhZmZsZSJ9