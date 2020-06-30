import config from '../config';
import axios from "axios";
import storage from "./storage";

let dlt = {
    createAccounts() {
        if (config.config.DLT_TYPE === 'iota') {
            // create account for FF-Farm
            if (storage.getItem(config.keys.ff_farm_account_address) == null) {
                axios.get(config.config.IOTA_CLIENT + '/account').then((res) => {
                    storage.setItem(config.keys.ff_farm_account_address, res.data.account),
                    storage.setItem(config.keys.ff_farm_account_private_key, res.data.seed)
                })
            }
            // create account for Bio-Pasta
            if (storage.getItem(config.keys.bio_pasta_account_address) == null) {
                axios.get(config.config.IOTA_CLIENT + '/account').then((res) => {
                    storage.setItem(config.keys.bio_pasta_account_address, res.data.account),
                    storage.setItem(config.keys.bio_pasta_account_private_key, res.data.seed)
                })
            }
            // create account for rewe
            if (storage.getItem(config.keys.rewe_account_address) == null) {
                axios.get(config.config.IOTA_CLIENT + '/account').then((res) => {
                    storage.setItem(config.keys.rewe_account_address, res.data.account),
                    storage.setItem(config.keys.rewe_account_private_key, res.data.seed)
                })
            }
        } else if (config.config.DLT_TYPE === 'eth') {
            axios.get(config.config.ETH_CLIENT + '/accounts').then((res) => {
                let accounts;
                accounts= res.data;
                // create account for FF-Farm
                if (storage.getItem(config.keys.ff_farm_account_address) == null) {
                    storage.setItem(config.keys.ff_farm_account_address, accounts[0]),
                    storage.setItem(config.keys.ff_farm_account_private_key, "*************************************")
                }
                // create account for Bio-Pasta
                if (storage.getItem(config.keys.bio_pasta_account_address) == null) {
                    storage.setItem(config.keys.bio_pasta_account_address, accounts[1]),
                    storage.setItem(config.keys.bio_pasta_account_private_key, "*************************************")
                }
                 // create account for rewe
                 if (storage.getItem(config.keys.rewe_account_address) == null) {
                    storage.setItem(config.keys.rewe_account_address, accounts[2]),
                    storage.setItem(config.keys.rewe_account_private_key, "*************************************")
                }
            });
        }
    },
};

export default dlt;