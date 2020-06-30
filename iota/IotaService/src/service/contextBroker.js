import * as _ from 'lodash';
import config from '../config';
import { createTransaction } from 'iota-lib';
import axios from 'axios';
import parallel from 'async/parallel';

/*
** Notification reciver
*/
const notification = async (req, res) => {
    if (req.params.type === "createAsset") {
        parallel(SubmitAndUpdateContext(req, res));
    }
    res.status(204).send();
}

const SubmitAndUpdateContext = (req, res) => {
    let account_address = '';
    let account_private_key = '';
    // type of notifications want to recive from context broker
    _.forEach(req.body.data, item => {
        // filter the data wan to persist in DLT
        console.log('item', JSON.stringify(item));
        if (item.owner.value === 'ff_farm') {
            account_address = config.accounts.ff_farm.account_address;
            account_private_key = config.accounts.ff_farm.account_private_key;
        }
        if (item.owner.value === 'bio_pasta') {
            account_address = config.accounts.bio_past.account_address;
            account_private_key = config.accounts.bio_past.account_private_key;
        }
        // create a transaction
        createTransaction(account_address, account_private_key, item).then((result) => {
            // updating the context broker with transaction details
            console.log('transactionHash' + result[0].hash);
            axios.patch(config.context_broker + '/v2/entities/' + item.id + '/attrs',
                {
                    "address": {
                        "value": result[0].address.toString(),
                        "type": "String"
                    },
                    "transactionHash": {
                        "value": result[0].hash.toString(),
                        "type": "String"
                    }
                })
        });
    });
}

export {
    notification,
}