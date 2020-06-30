import { getNodeInfo,
		 setProvider,
		 setTcpProvider,
		 generateSeed, 
		 createNewAddress, 
		 createTransaction,
		 fetchTransaction,
		 extractTransactionHashInfo,
	     createMamTransaction,
		 fetchMamTransaction,
		 decodeMessage,
		 encodeMessage } from 'iota-lib';
import * as HttpStatus from 'http-status-codes';
import { isUrl , isNotEmpty, isModeValid } from '../utils/index';

	const status = async (req, res) => {
		getNodeInfo().then((result) => {
			res.status(HttpStatus.OK).send(result);
		}).catch((err) => {
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
		});
	}

	const setNewProvider = async (req, res) => {
		const provider = (isUrl(req.body.provider)) ? req.body.provider : res.status(HttpStatus.BAD_REQUEST).send({error: 'provider is incorrect or missing'}); 
		res.status(HttpStatus.OK).send(setProvider({provider: provider}));
	}

	const setNewTcpProvider = async (req, res) => {
		const provider = (isUrl(req.body.provider)) ? req.body.provider : res.status(HttpStatus.BAD_REQUEST).send({error: 'tcp provider is incorrect or missing'}); 
		res.status(HttpStatus.OK).send(setTcpProvider({provider: provider}));
	}

	const createNewAccount = async (req, res) => {
		const seed = generateSeed();
		createNewAddress(seed).then((result) => {
			res.status(HttpStatus.OK).send({account: result[0], seed: seed});
		}).catch((err) => {
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
		});
	}

	const createAccountWithExistingSeed = async (req, res) => {
		let seed = '';
		if (req.params.seed) {
			seed = req.params.seed;
		} else {
		   res.status(HttpStatus.BAD_REQUEST).send({error: 'seed phrase is missing'});
		}
		createNewAddress(seed).then((result) => {
			res.status(HttpStatus.OK).send({account: result[0], seed: seed});
		}).catch((err) => {
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
		});
	}

	const createNewTransaction = async (req, res) => {
		const address = (req.body.address) ? req.body.address : res.status(HttpStatus.BAD_REQUEST).send({error: 'address is missing'});
		const seed = (req.body.seed) ? req.body.seed : res.status(HttpStatus.BAD_REQUEST).send({error: 'seed phrase is missing'});
		const data = (req.body.data) ? req.body.data : res.status(HttpStatus.BAD_REQUEST).send({error: 'data is missing'});
 		createTransaction(address, seed, data).then((result) => {
			res.status(HttpStatus.OK).send(result);
		 }).catch((err) => {
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
		 });
	}

	const fetchExistingTransaction = async(req, res) => {
		const address = (req.params.address) ? req.params.address : res.status(HttpStatus.BAD_REQUEST).send({error: 'address is missing'});
		fetchTransaction(address).then((result) => {
			res.status(HttpStatus.OK).send(result);
		 }).catch((err) => {
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
		 });
	}

	const decodeTransactionHash = async(req, res) => {
		const tailTransactionHash = (req.params.hash) ? req.params.hash : res.status(HttpStatus.BAD_REQUEST).send({error: 'hash is missing'});
		extractTransactionHashInfo(tailTransactionHash).then((result) => {
			res.status(HttpStatus.OK).send(result);
		}).catch((err) => {
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
		})
	}

	const createNewMamTransaction = async (req, res) => {
		const data = (req.body.data) ? req.body.data : res.status(HttpStatus.BAD_REQUEST).send({error: 'data is missing'});
		const mode = (isModeValid(isNotEmpty(req.body.mode))) ? req.body.mode : res.status(HttpStatus.BAD_REQUEST).send({error: 'invalid mode, could be public or restricted'});
		const secret = (isNotEmpty(req.body.secret) && req.body.hasOwnProperty('secret')) ? req.body.secret : '';
		if(mode === 'restricted' && secret === '') {
			res.status(HttpStatus.BAD_REQUEST).send({error: 'in restricted mode, secret can not be empty'});
		}	
		createMamTransaction(data, {mode : mode, secret : secret} ).then((result) => {
			res.status(HttpStatus.OK).send(result);
		}).catch((err) => {
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
		 });
	}

	const fetchExistingMamTransaction = async (req, res) => {
		const hash = (req.body.hash) ? req.body.hash : res.status(HttpStatus.BAD_REQUEST).send({error: 'hash is missing'});
		const mode = (isModeValid(isNotEmpty(req.body.mode))) ? req.body.mode : res.status(HttpStatus.BAD_REQUEST).send({error: 'invalid mode, could be public or restricted'});
		const secret = (isNotEmpty(req.body.secret) && req.body.hasOwnProperty('secret')) ? req.body.secret : null;
		if(mode === 'restricted' && secret === '') {
			res.status(HttpStatus.BAD_REQUEST).send({error: 'in restricted mode, secret can not be empty'});
		}	
		fetchMamTransaction(hash, mode, secret, (result) => {
			res.status(HttpStatus.OK).send({result: decodeMessage(result)});
		});
	}

	export {
		status,
		setNewProvider,
		setNewTcpProvider,
		createAccountWithExistingSeed,
		createNewTransaction,
		createNewAccount,
		fetchExistingTransaction,
		decodeTransactionHash,
		createNewMamTransaction,
		fetchExistingMamTransaction,
	}