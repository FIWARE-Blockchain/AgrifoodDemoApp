import {status, 
    setNewProvider,
    setNewTcpProvider,
    createNewAccount, 
    createAccountWithExistingSeed,
    createNewTransaction,
    fetchExistingTransaction,
    decodeTransactionHash,
    createNewMamTransaction,
    fetchExistingMamTransaction } from '../controllers/index';

import { wrapAsync } from '../utils/index';
import {notification} from '../service/contextBroker';

module.exports = api => {
api.route('/status').get(wrapAsync(status));
api.route('/provider').post(wrapAsync(setNewProvider));
api.route('/zmqprovider').post(wrapAsync(setNewTcpProvider));
api.route('/account').get(wrapAsync(createNewAccount));
api.route('/account/:seed').get(wrapAsync(createAccountWithExistingSeed));
api.route('/transaction').post(wrapAsync(createNewTransaction));
api.route('/transaction/:address').get(wrapAsync(fetchExistingTransaction));
api.route('/decodetransaction/:hash').get(wrapAsync(decodeTransactionHash));
api.route('/mam').post(wrapAsync(createNewMamTransaction));
api.route('/mam/fetch').post(wrapAsync(fetchExistingMamTransaction));

api.route('/subscription/:type').post(wrapAsync(notification));
};
