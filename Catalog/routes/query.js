const express = require('express');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database/Catalog.sqlite')

const router = express.Router();

/* GET users listing. */
router.get('/item/:item', (req, res,next) =>{
    db.get("SELECT * FROM 'Catalog' where ID=?",req.params.item, (error, row) => {
        if(error){
            next(error)
            return;
        }
        if(row.length===0){
            next();
            return;
        }
        res.json(row)
    });
});
router.get('/subject/:subject', (req, res,next) =>{
    db.all("SELECT * FROM 'Catalog' where topic=?",req.params.subject,(error, rows) => {
            if(error){
                next(error)
                return;
            }
            if(rows.length===0){
                next();
                return;
            }
            res.json(rows)
        }
    );
});
module.exports = router;