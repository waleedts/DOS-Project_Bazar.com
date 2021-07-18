const express = require('express');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database/Catalog.sqlite')
const router = express.Router();
const createError = require('http-errors');


router.patch('/item/:item', (req, res,next) =>{
    let query =""
    let params=""
    // Returns an error when a wrong value is entered
    if(req.body.cost<0 || req.body.InStock <=0){
        res.json(createError(406))
    }
    // Checks if the body has a new cost or stock or both
    if(req.body.cost){
        query="UPDATE 'Catalog' set cost = ? where ID=?"
        params= [req.body.cost, req.params.item];
    }else if(req.body.InStock){
        query="UPDATE 'Catalog' set InStock=? where ID=?"
        params= [req.body.InStock, req.params.item];
    }else if(req.body.cost && req.body.InStock){
        query="UPDATE 'Catalog' set cost=?,InStock=? where ID=?"
        params= [req.body.cost,req.body.InStock, req.params.item];
    }
    // Database query, then checking for an error and returning the correct response
    db.run(query,params, (error,row) => {
        if(error){
            next(error)
            return
        }
        res.json(row)
    });
});

module.exports = router;
