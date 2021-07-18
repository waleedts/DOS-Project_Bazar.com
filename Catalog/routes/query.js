const express = require('express');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database/Catalog.sqlite')

const router = express.Router();

/* GET users listing. */
// Handles the get at api/query/item
router.get('/item', (req, res,next) =>{
    db.all("SELECT * FROM 'Catalog'", (error, row) => {
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
// Handles the get at api/query/item/{itemNumber}
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
// Handles the get at api/query/subject/{subjectName}
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