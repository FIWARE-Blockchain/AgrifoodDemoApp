'use strict';

var _index = require('../controllers/index');

var _index2 = require('../utils/index');

module.exports = api => {
    api.route('/status').get((0, _index2.wrapAsync)(_index.status));
    api.route('/provider').post((0, _index2.wrapAsync)(_index.setNewProvider));
    api.route('/zmqprovider').post((0, _index2.wrapAsync)(_index.setNewTcpProvider));
    api.route('/account').get((0, _index2.wrapAsync)(_index.createNewAccount));
    api.route('/account/:seed').get((0, _index2.wrapAsync)(_index.createAccountWithExistingSeed));
    api.route('/transaction').post((0, _index2.wrapAsync)(_index.createNewTransaction));
    api.route('/transaction/:address').get((0, _index2.wrapAsync)(_index.fetchExistingTransaction));
    api.route('/mam').post((0, _index2.wrapAsync)(_index.createNewMamTransaction));
    api.route('/mam/fetch').post((0, _index2.wrapAsync)(_index.fetchExistingMamTransaction));
};