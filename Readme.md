# Agrifood Supply Chain (DEMO)

The project is to demo demonstrate how FIWARE can be integrate with a blockchain/DLTs for FIWARE wednesday webinars.


# Prerequisite
  - NodeJS version 10
  - NPM version 6
  - docker
  - docker-compose
  - git
  - postman

# Usage
```sh
$ git clone https://github.com/FIWARE-Blockchain/AgrifoodDemoApp
```

and import [api-collection](https://github.com/FIWARE-Blockchain/AgrifoodDemoApp/blob/master/FIWARE%20Integration%20with%20Blockchain-DLTs.postman_collection.json) in the postman client.

**For IOTA**
```sh
$ cd iota
$ docker-compose up
```

**For ETH**
```sh
$ cd eth
$ docker-compose up
```

# Frontend Application
The frontend application is developed using vue-cli.
# Config
you can find the configuration at src/config.js 
```sh
$    ORION : process.env.CONTEXT_BROKER || "http://localhost:1026",
$    IOTA_CLIENT: process.env.IOTA_CLIENT || "http://localhost:3001",
$    ETH_CLIENT: process.env.ETH_CLIENT || "http://localhost:3002",
$    DLT_TYPE: process.env.DLT_TYPE || "iota", // or eth
```



# Usage
```sh
$ cd Agrifood
$ npm install
$ npm start
```
# Access
    http://localhost:8080
    
# License
MIT © 2020 FIWARE Foundation e.V.