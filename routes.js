const routes = require('next-routes')();

routes
	.add('/raffles/new', '/raffles/new')
	.add('/raffles/:address', '/raffles/show');

module.exports = routes;
