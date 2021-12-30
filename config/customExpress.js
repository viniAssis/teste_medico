const express = require('express');
const consign = require('consign')
const bodyParser = require('body-parser')

module.exports = () =>{

    const server = express();
    server.use(express.json());
    server.use(express.urlencoded({ extended: true}))
    
    consign()
        .include('controllers')
        .into(server)

        

    

    return server;
}