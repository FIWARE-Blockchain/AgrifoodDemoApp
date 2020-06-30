'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	env: process.env.NODE_ENV || 'development',
	server: {
		port: process.env.PORT || 3001,
		provider: process.env.IOTA_PROVIDER || 'https://nodes.devnet.iota.org:443',
		tcpProvider: process.env.IOTA_ZMQ_PROVIDER || 'tcp://zmq.devnet.iota.org:5556'
	}
};