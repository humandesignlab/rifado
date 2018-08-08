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

var _Layout = require('../../components/Layout');

var _Layout2 = _interopRequireDefault(_Layout);

var _raffle = require('../../ethereum/raffle');

var _raffle2 = _interopRequireDefault(_raffle);

var _web = require('../../ethereum/web3');

var _web2 = _interopRequireDefault(_web);

var _routes = require('../../routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/humbertomangino/Documents/rifas/ether-raffle/pages/raffles/show.js?entry';


var RaffleShow = function (_Component) {
	(0, _inherits3.default)(RaffleShow, _Component);

	function RaffleShow() {
		var _ref,
		    _this2 = this;

		var _temp, _this, _ret;

		(0, _classCallCheck3.default)(this, RaffleShow);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = RaffleShow.__proto__ || (0, _getPrototypeOf2.default)(RaffleShow)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
			ticketBlockSize: '',
			errorMessage: '',
			loading: false,
			value: '',
			loadingMessage: '',
			hideStandByMessage: true
		}, _this.onSubmit = function () {
			var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(event) {
				var raffle, accounts;
				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								event.preventDefault();
								raffle = (0, _raffle2.default)(_this.props.raffleAddress);

								_this.setState({
									loading: true,
									errorMessage: '',
									hideStandByMessage: false,
									loadingMessage: 'Please stand by for the Blockchain to update.'
								});

								_context.prev = 3;
								_context.next = 6;
								return _web2.default.eth.getAccounts();

							case 6:
								accounts = _context.sent;
								_context.next = 9;
								return raffle.methods.buyTicket(_this.state.value).send({
									from: accounts[0],
									value: _web2.default.utils.toWei('0.011', 'ether')
								});

							case 9:
								_routes.Router.replaceRoute('/raffles/' + _this.props.raffleAddress);
								_context.next = 15;
								break;

							case 12:
								_context.prev = 12;
								_context.t0 = _context['catch'](3);

								_this.setState({ errorMessage: _context.t0.message });

							case 15:
								_this.setState({
									loading: false,
									value: '',
									loadingMessage: '',
									hideStandByMessage: true
								});

							case 16:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, _this2, [[3, 12]]);
			}));

			return function (_x) {
				return _ref2.apply(this, arguments);
			};
		}(), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	}

	(0, _createClass3.default)(RaffleShow, [{
		key: 'renderTicketNumbers',
		value: function renderTicketNumbers() {
			var _this3 = this;

			var ticketsArray = [];
			for (var i = 1; i <= this.props.raffleTicketsBlockLength; i++) {
				ticketsArray.push(i.toString());
			}

			var reminingTicketsArray = ticketsArray.filter(function (f) {
				return !_this3.props.raffleSoldTicketsNumbers.includes(f);
			});

			var items = reminingTicketsArray.map(function (item, index) {
				return _react2.default.createElement('option', { key: index, __source: {
						fileName: _jsxFileName,
						lineNumber: 85
					}
				}, item);
			});

			return _react2.default.createElement(_semanticUiReact.Segment, {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 89
				}
			}, _react2.default.createElement(_semanticUiReact.Label, { attached: 'top', __source: {
					fileName: _jsxFileName,
					lineNumber: 90
				}
			}, 'Buy a Ticket for this Raffle'), _react2.default.createElement(_semanticUiReact.Form, { onSubmit: this.onSubmit, error: !!this.state.errorMessage, __source: {
					fileName: _jsxFileName,
					lineNumber: 91
				}
			}, _react2.default.createElement(_semanticUiReact.Form.Group, {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 92
				}
			}, _react2.default.createElement(_semanticUiReact.Form.Field, {
				value: this.state.value,
				onChange: function onChange(event) {
					return _this3.setState({ value: event.target.value });
				},
				control: 'select',
				__source: {
					fileName: _jsxFileName,
					lineNumber: 93
				}
			}, _react2.default.createElement('option', { disabled: true, label: 'Select a ticket number:', __source: {
					fileName: _jsxFileName,
					lineNumber: 98
				}
			}), ';', items)), _react2.default.createElement(_semanticUiReact.Button, { disabled: this.state.loading, as: 'div', labelPosition: 'right', __source: {
					fileName: _jsxFileName,
					lineNumber: 102
				}
			}, _react2.default.createElement(_semanticUiReact.Button, { icon: true, loading: this.state.loading, __source: {
					fileName: _jsxFileName,
					lineNumber: 103
				}
			}, _react2.default.createElement(_semanticUiReact.Icon, { name: 'ticket', __source: {
					fileName: _jsxFileName,
					lineNumber: 104
				}
			}), 'Buy Ticket'), _react2.default.createElement(_semanticUiReact.Label, { as: 'a', basic: true, pointing: 'left', __source: {
					fileName: _jsxFileName,
					lineNumber: 107
				}
			}, '0.011 ETH')), _react2.default.createElement(_semanticUiReact.Message, {
				error: true,
				header: 'Something went wrong!',
				content: this.state.errorMessage,
				__source: {
					fileName: _jsxFileName,
					lineNumber: 111
				}
			}), _react2.default.createElement(_semanticUiReact.Message, {
				color: 'yellow',
				hidden: this.state.hideStandByMessage,
				header: 'Transaction is being processed on Ethereum Blockchain.',
				content: this.state.loadingMessage,
				__source: {
					fileName: _jsxFileName,
					lineNumber: 116
				}
			})));
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(_Layout2.default, {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 129
				}
			}, _react2.default.createElement(_semanticUiReact.Responsive, { as: _semanticUiReact.Segment, minWidth: 320, maxWidth: 991, __source: {
					fileName: _jsxFileName,
					lineNumber: 130
				}
			}, _react2.default.createElement(_semanticUiReact.Card, { fluid: true, __source: {
					fileName: _jsxFileName,
					lineNumber: 131
				}
			}, _react2.default.createElement(_semanticUiReact.Card.Content, {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 132
				}
			}, _react2.default.createElement(_semanticUiReact.Card.Header, {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 133
				}
			}, 'Raffle details:'), _react2.default.createElement(_semanticUiReact.Card.Meta, {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 134
				}
			}, this.props.raffleAddress))), this.renderTicketNumbers(), _react2.default.createElement(_semanticUiReact.Segment.Group, {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 138
				}
			}, _react2.default.createElement(_semanticUiReact.Segment, { textAlign: 'center', __source: {
					fileName: _jsxFileName,
					lineNumber: 139
				}
			}, _react2.default.createElement(_semanticUiReact.Statistic, { size: 'tiny', __source: {
					fileName: _jsxFileName,
					lineNumber: 140
				}
			}, _react2.default.createElement(_semanticUiReact.Statistic.Value, {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 141
				}
			}, _react2.default.createElement(_semanticUiReact.Icon, { name: 'ethereum', __source: {
					fileName: _jsxFileName,
					lineNumber: 142
				}
			}), this.props.raffleBalance, ' ETH'), _react2.default.createElement(_semanticUiReact.Statistic.Label, {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 145
				}
			}, 'Balance'))), _react2.default.createElement(_semanticUiReact.Segment, { textAlign: 'center', __source: {
					fileName: _jsxFileName,
					lineNumber: 148
				}
			}, _react2.default.createElement(_semanticUiReact.Statistic, { size: 'tiny', __source: {
					fileName: _jsxFileName,
					lineNumber: 149
				}
			}, _react2.default.createElement(_semanticUiReact.Statistic.Value, {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 150
				}
			}, _react2.default.createElement(_semanticUiReact.Icon, { name: 'users', __source: {
					fileName: _jsxFileName,
					lineNumber: 151
				}
			}), this.props.raffleSoldTickets), _react2.default.createElement(_semanticUiReact.Statistic.Label, {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 154
				}
			}, 'Players'))), _react2.default.createElement(_semanticUiReact.Segment, { textAlign: 'center', __source: {
					fileName: _jsxFileName,
					lineNumber: 157
				}
			}, _react2.default.createElement(_semanticUiReact.Statistic, { size: 'tiny', __source: {
					fileName: _jsxFileName,
					lineNumber: 158
				}
			}, _react2.default.createElement(_semanticUiReact.Statistic.Value, {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 159
				}
			}, _react2.default.createElement(_semanticUiReact.Icon, { name: 'ticket', __source: {
					fileName: _jsxFileName,
					lineNumber: 160
				}
			}), this.props.raffleRemainingTickets), _react2.default.createElement(_semanticUiReact.Statistic.Label, {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 163
				}
			}, 'Remaining tickets'))), _react2.default.createElement(_semanticUiReact.Segment, { textAlign: 'center', __source: {
					fileName: _jsxFileName,
					lineNumber: 166
				}
			}, _react2.default.createElement(_semanticUiReact.Statistic, { size: 'tiny', __source: {
					fileName: _jsxFileName,
					lineNumber: 167
				}
			}, _react2.default.createElement(_semanticUiReact.Statistic.Value, {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 168
				}
			}, _react2.default.createElement(_semanticUiReact.Icon, { name: 'calendar', __source: {
					fileName: _jsxFileName,
					lineNumber: 169
				}
			}), '12/12/18'), _react2.default.createElement(_semanticUiReact.Statistic.Label, {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 172
				}
			}, 'Draw date')))), _react2.default.createElement('p', {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 176
				}
			}, 'Created by: ', this.props.raffleManager)), _react2.default.createElement(_semanticUiReact.Responsive, (0, _extends3.default)({ as: _semanticUiReact.Segment }, _semanticUiReact.Responsive.onlyComputer, {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 179
				}
			}), _react2.default.createElement(_semanticUiReact.Card, { fluid: true, __source: {
					fileName: _jsxFileName,
					lineNumber: 180
				}
			}, _react2.default.createElement(_semanticUiReact.Card.Content, {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 181
				}
			}, _react2.default.createElement(_semanticUiReact.Card.Header, {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 182
				}
			}, 'Raffle details:'), _react2.default.createElement(_semanticUiReact.Card.Meta, {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 183
				}
			}, this.props.raffleAddress))), _react2.default.createElement(_semanticUiReact.Grid, { divided: 'vertically', __source: {
					fileName: _jsxFileName,
					lineNumber: 186
				}
			}, _react2.default.createElement(_semanticUiReact.Grid.Row, { columns: 2, divided: true, __source: {
					fileName: _jsxFileName,
					lineNumber: 187
				}
			}, _react2.default.createElement(_semanticUiReact.Grid.Column, { width: 10, __source: {
					fileName: _jsxFileName,
					lineNumber: 188
				}
			}, _react2.default.createElement(_semanticUiReact.Segment.Group, { horizontal: true, __source: {
					fileName: _jsxFileName,
					lineNumber: 189
				}
			}, _react2.default.createElement(_semanticUiReact.Segment, { textAlign: 'center', __source: {
					fileName: _jsxFileName,
					lineNumber: 190
				}
			}, _react2.default.createElement(_semanticUiReact.Statistic, { size: 'tiny', __source: {
					fileName: _jsxFileName,
					lineNumber: 191
				}
			}, _react2.default.createElement(_semanticUiReact.Statistic.Value, {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 192
				}
			}, _react2.default.createElement(_semanticUiReact.Icon, { name: 'ethereum', __source: {
					fileName: _jsxFileName,
					lineNumber: 193
				}
			}), this.props.raffleBalance, ' ETH'), _react2.default.createElement(_semanticUiReact.Statistic.Label, {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 196
				}
			}, 'Balance'))), _react2.default.createElement(_semanticUiReact.Segment, { textAlign: 'center', __source: {
					fileName: _jsxFileName,
					lineNumber: 199
				}
			}, _react2.default.createElement(_semanticUiReact.Statistic, { size: 'tiny', __source: {
					fileName: _jsxFileName,
					lineNumber: 200
				}
			}, _react2.default.createElement(_semanticUiReact.Statistic.Value, {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 201
				}
			}, _react2.default.createElement(_semanticUiReact.Icon, { name: 'users', __source: {
					fileName: _jsxFileName,
					lineNumber: 202
				}
			}), this.props.raffleSoldTickets), _react2.default.createElement(_semanticUiReact.Statistic.Label, {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 205
				}
			}, 'Players'))), _react2.default.createElement(_semanticUiReact.Segment, { textAlign: 'center', __source: {
					fileName: _jsxFileName,
					lineNumber: 208
				}
			}, _react2.default.createElement(_semanticUiReact.Statistic, { size: 'tiny', __source: {
					fileName: _jsxFileName,
					lineNumber: 209
				}
			}, _react2.default.createElement(_semanticUiReact.Statistic.Value, {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 210
				}
			}, _react2.default.createElement(_semanticUiReact.Icon, { name: 'ticket', __source: {
					fileName: _jsxFileName,
					lineNumber: 211
				}
			}), this.props.raffleRemainingTickets), _react2.default.createElement(_semanticUiReact.Statistic.Label, {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 214
				}
			}, 'Remaining tickets'))), _react2.default.createElement(_semanticUiReact.Segment, { textAlign: 'center', __source: {
					fileName: _jsxFileName,
					lineNumber: 217
				}
			}, _react2.default.createElement(_semanticUiReact.Statistic, { size: 'tiny', __source: {
					fileName: _jsxFileName,
					lineNumber: 218
				}
			}, _react2.default.createElement(_semanticUiReact.Statistic.Value, {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 219
				}
			}, _react2.default.createElement(_semanticUiReact.Icon, { name: 'calendar', __source: {
					fileName: _jsxFileName,
					lineNumber: 220
				}
			}), '12/12/18'), _react2.default.createElement(_semanticUiReact.Statistic.Label, {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 223
				}
			}, 'Draw date'))))), _react2.default.createElement(_semanticUiReact.Grid.Column, { width: 6, __source: {
					fileName: _jsxFileName,
					lineNumber: 228
				}
			}, this.renderTicketNumbers()))), _react2.default.createElement('p', {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 231
				}
			}, 'Created by: ', this.props.raffleManager)));
		}
	}], [{
		key: 'getInitialProps',
		value: function () {
			var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(props) {
				var raffle, summary, manager;
				return _regenerator2.default.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								raffle = (0, _raffle2.default)(props.query.address);
								_context2.next = 3;
								return raffle.methods.getRaffleSummary().call();

							case 3:
								summary = _context2.sent;
								_context2.next = 6;
								return raffle.methods.manager().call();

							case 6:
								manager = _context2.sent;

								console.log(summary);
								return _context2.abrupt('return', {
									raffleAddress: props.query.address,
									raffleBalance: _web2.default.utils.fromWei(summary[1], 'ether'),
									raffleSoldTickets: summary[2],
									raffleRemainingTickets: summary[3],
									raffleTicketsBlockLength: summary[4],
									raffleSoldTicketsNumbers: summary[5],
									raffleManager: manager
								});

							case 9:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function getInitialProps(_x2) {
				return _ref3.apply(this, arguments);
			}

			return getInitialProps;
		}()
	}]);

	return RaffleShow;
}(_react.Component);

exports.default = RaffleShow;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL3JhZmZsZXMvc2hvdy5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIkdyaWQiLCJJY29uIiwiTGlzdCIsIlN0YXRpc3RpYyIsIkNhcmQiLCJTZWdtZW50IiwiQnV0dG9uIiwiTGFiZWwiLCJEaXZpZGVyIiwiRm9ybSIsIk1lc3NhZ2UiLCJSZXNwb25zaXZlIiwiTGF5b3V0IiwiUmFmZmxlIiwid2ViMyIsIlJvdXRlciIsIlJhZmZsZVNob3ciLCJzdGF0ZSIsInRpY2tldEJsb2NrU2l6ZSIsImVycm9yTWVzc2FnZSIsImxvYWRpbmciLCJ2YWx1ZSIsImxvYWRpbmdNZXNzYWdlIiwiaGlkZVN0YW5kQnlNZXNzYWdlIiwib25TdWJtaXQiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwicmFmZmxlIiwicHJvcHMiLCJyYWZmbGVBZGRyZXNzIiwic2V0U3RhdGUiLCJldGgiLCJnZXRBY2NvdW50cyIsImFjY291bnRzIiwibWV0aG9kcyIsImJ1eVRpY2tldCIsInNlbmQiLCJmcm9tIiwidXRpbHMiLCJ0b1dlaSIsInJlcGxhY2VSb3V0ZSIsIm1lc3NhZ2UiLCJ0aWNrZXRzQXJyYXkiLCJpIiwicmFmZmxlVGlja2V0c0Jsb2NrTGVuZ3RoIiwicHVzaCIsInRvU3RyaW5nIiwicmVtaW5pbmdUaWNrZXRzQXJyYXkiLCJmaWx0ZXIiLCJyYWZmbGVTb2xkVGlja2V0c051bWJlcnMiLCJpbmNsdWRlcyIsImYiLCJpdGVtcyIsIm1hcCIsIml0ZW0iLCJpbmRleCIsInRhcmdldCIsInJlbmRlclRpY2tldE51bWJlcnMiLCJyYWZmbGVCYWxhbmNlIiwicmFmZmxlU29sZFRpY2tldHMiLCJyYWZmbGVSZW1haW5pbmdUaWNrZXRzIiwicmFmZmxlTWFuYWdlciIsIm9ubHlDb21wdXRlciIsInF1ZXJ5IiwiYWRkcmVzcyIsImdldFJhZmZsZVN1bW1hcnkiLCJjYWxsIiwic3VtbWFyeSIsIm1hbmFnZXIiLCJjb25zb2xlIiwibG9nIiwiZnJvbVdlaSJdLCJt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T0FBQSxBQUFPLFFBQVAsQUFBZSxtQixBQUFmLEFBQWtDOztZQUFsRDtBOztlQUNnQixPQUFBLEFBQU8sUUFBUCxBQUFlLFVBQVUsQSxBQUF6Qjs7WUFBaEI7QSw0QkFDTjs7Z0JBQUEsQUFBUSxJQUFSLEFBQVk7O3dCQUVJLE1BQUEsQUFBTSxNQURmLEFBQ3FCLEFBQzNCO3dCQUFlLGNBQUEsQUFBSyxNQUFMLEFBQVcsUUFBUSxRQUFuQixBQUFtQixBQUFRLElBRnBDLEFBRVMsQUFBK0IsQUFDOUM7NEJBQW1CLFFBSGIsQUFHYSxBQUFRLEFBQzNCO2lDQUF3QixRQUpsQixBQUlrQixBQUFRLEFBQ2hDO21DQUEwQixRQUxwQixBQUtvQixBQUFRLEFBQ2xDO21DQUEwQixRQU5wQixBQU1vQixBQUFRLEFBQ2xDO3dCQVBNLEFBT1MsQTtBQVBULEFBQ047Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFmc0IsQSxBQXlOekI7O2tCQUFBLEFBQWUiLCJmaWxlIjoic2hvdy5qcz9lbnRyeSIsInNvdXJjZVJvb3QiOiIvVXNlcnMvaHVtYmVydG9tYW5naW5vL0RvY3VtZW50cy9yaWZhcy9ldGhlci1yYWZmbGUifQ==