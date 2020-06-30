const config = {
    ORION : process.env.CONTEXT_BROKER || "http://localhost:1026",
    IOTA_CLIENT: process.env.IOTA_CLIENT || "http://localhost:3001",
    ETH_CLIENT: process.env.ETH_CLIENT || "http://localhost:3002",
    DLT_TYPE: process.env.DLT_TYPE || "iota",
}

const keys = {
    // ff farm demo account
    ff_farm_account_address: 'ff_farm_account_address',
    ff_farm_account_private_key: 'ff_farm_account_private_key',
    // bio-past demo account
    bio_pasta_account_address: 'bio_pasta_account_address',
    bio_pasta_account_private_key: 'bio_pasta_account_private_key',
    //rewe demo account
    rewe_account_address: 'rewe_account_address',
    rewe_account_private_key: 'rewe_account_private_key',
}

module.exports = {
    config,
    keys
}