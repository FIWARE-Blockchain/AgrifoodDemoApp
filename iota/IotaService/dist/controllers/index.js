'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.fetchExistingMamTransaction = exports.createNewMamTransaction = exports.fetchExistingTransaction = exports.createNewAccount = exports.createNewTransaction = exports.createAccountWithExistingSeed = exports.setNewTcpProvider = exports.setNewProvider = exports.status = undefined;

var _iotaLib = require('iota-lib');

var _httpStatusCodes = require('http-status-codes');

var HttpStatus = _interopRequireWildcard(_httpStatusCodes);

var _index = require('../utils/index');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const status = async (req, res) => {
	(0, _iotaLib.getNodeInfo)().then(result => {
		res.status(HttpStatus.OK).send(result);
	}).catch(err => {
		res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
	});
};

const setNewProvider = async (req, res) => {
	const provider = (0, _index.isUrl)(req.body.provider) ? req.body.provider : res.status(HttpStatus.BAD_REQUEST).send({ error: 'provider is incorrect or missing' });
	res.status(HttpStatus.OK).send((0, _iotaLib.setProvider)({ provider: provider }));
};

const setNewTcpProvider = async (req, res) => {
	const provider = (0, _index.isUrl)(req.body.provider) ? req.body.provider : res.status(HttpStatus.BAD_REQUEST).send({ error: 'tcp provider is incorrect or missing' });
	res.status(HttpStatus.OK).send((0, _iotaLib.setTcpProvider)({ provider: provider }));
};

const createNewAccount = async (req, res) => {
	const seed = (0, _iotaLib.generateSeed)();
	(0, _iotaLib.createNewAddress)(seed).then(result => {
		console.log('result' + result);
		res.status(HttpStatus.OK).send({ account: result[0], seed: seed });
	}).catch(err => {
		res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
	});
};

const createAccountWithExistingSeed = async (req, res) => {
	let seed = '';
	if (req.params.seed) {
		seed = req.params.seed;
	} else {
		res.status(HttpStatus.BAD_REQUEST).send({ error: 'seed phrase is missing' });
	}
	(0, _iotaLib.createNewAddress)(seed).then(result => {
		console.log('result' + result);
		res.status(HttpStatus.OK).send({ account: result[0], seed: seed });
	}).catch(err => {
		res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
	});
};

const createNewTransaction = async (req, res) => {
	const address = req.body.address ? req.body.address : res.status(HttpStatus.BAD_REQUEST).send({ error: 'address is missing' });
	const seed = req.body.seed ? req.body.seed : res.status(HttpStatus.BAD_REQUEST).send({ error: 'seed phrase is missing' });
	const data = req.body.data ? req.body.data : res.status(HttpStatus.BAD_REQUEST).send({ error: 'data is missing' });
	(0, _iotaLib.createTransaction)(address, seed, data).then(result => {
		res.status(HttpStatus.OK).send(result);
	}).catch(err => {
		res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
	});
};

const fetchExistingTransaction = async (req, res) => {
	const address = req.params.address ? req.params.address : res.status(HttpStatus.BAD_REQUEST).send({ error: 'address is missing' });
	(0, _iotaLib.fetchTransaction)(address).then(result => {
		res.status(HttpStatus.OK).send(result);
	}).catch(err => {
		res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
	});
};

const createNewMamTransaction = async (req, res) => {
	const data = req.body.data ? req.body.data : res.status(HttpStatus.BAD_REQUEST).send({ error: 'data is missing' });
	const mode = (0, _index.isModeValid)((0, _index.isNotEmpty)(req.body.mode)) ? req.body.mode : res.status(HttpStatus.BAD_REQUEST).send({ error: 'invalid mode, could be public or restricted' });
	const secret = (0, _index.isNotEmpty)(req.body.secret) && req.body.hasOwnProperty('secret') ? req.body.secret : '';
	if (mode === 'restricted' && secret === '') {
		res.status(HttpStatus.BAD_REQUEST).send({ error: 'in restricted mode, secret can not be empty' });
	}
	(0, _iotaLib.createMamTransaction)(data, { mode: mode, secret: secret }).then(result => {
		res.status(HttpStatus.OK).send(result);
	}).catch(err => {
		res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
	});
};

const fetchExistingMamTransaction = async (req, res) => {
	const hash = req.body.hash ? req.body.hash : res.status(HttpStatus.BAD_REQUEST).send({ error: 'hash is missing' });
	const mode = (0, _index.isModeValid)((0, _index.isNotEmpty)(req.body.mode)) ? req.body.mode : res.status(HttpStatus.BAD_REQUEST).send({ error: 'invalid mode, could be public or restricted' });
	const secret = (0, _index.isNotEmpty)(req.body.secret) && req.body.hasOwnProperty('secret') ? req.body.secret : null;
	if (mode === 'restricted' && secret === '') {
		res.status(HttpStatus.BAD_REQUEST).send({ error: 'in restricted mode, secret can not be empty' });
	}
	(0, _iotaLib.fetchMamTransaction)(hash, mode, secret, result => {
		res.status(HttpStatus.OK).send({ result: (0, _iotaLib.decodeMessage)(result) });
	});
};

exports.status = status;
exports.setNewProvider = setNewProvider;
exports.setNewTcpProvider = setNewTcpProvider;
exports.createAccountWithExistingSeed = createAccountWithExistingSeed;
exports.createNewTransaction = createNewTransaction;
exports.createNewAccount = createNewAccount;
exports.fetchExistingTransaction = fetchExistingTransaction;
exports.createNewMamTransaction = createNewMamTransaction;
exports.fetchExistingMamTransaction = fetchExistingMamTransaction;