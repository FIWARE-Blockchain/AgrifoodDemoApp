import fs from 'fs';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import { setProvider, setTcpProvider } from 'iota-lib'
import config from './config';

const api = express();

api.use(cors());
api.use(compression());
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());

api.listen(config.server.port, err => {
	if (err) {
		console.error(err);
		process.exit(1);
	}

	fs.readdirSync(path.join(__dirname, 'routes')).map(file => {
		require('./routes/' + file)(api);
	});
	setProvider({provider: config.server.provider});
	setTcpProvider({provider: config.server.tcpProvider});
	console.log(`API is now running on port ${config.server.port} in ${config.env} mode`);
});

module.exports = api;
