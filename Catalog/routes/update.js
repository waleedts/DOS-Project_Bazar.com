const express = require('express');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database/Catalog.sqlite')
const router = express.Router();


router.patch('/item/:item', (req, res,next) =>{
    let query =""
    let params=""
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
    db.run(query,params, (error,row) => {
        if(error){
            next(error)
        }
        res.json(row)
    });
});

module.exports = router;