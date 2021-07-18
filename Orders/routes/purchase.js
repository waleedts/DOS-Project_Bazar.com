const express = require('express');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database/Orders.sqlite')
const router = express.Router();
const axios = require('axios').default;

// Handles the post at api/purchase/items
router.post('/item/:item', (req, res,next) =>{
    axios.get('http://catalog:3000/api/query/item/'+req.params.item).then(response => {
        axios.patch('http://catalog:3000/api/update/item/'+req.params.item,{"InStock":response.data.InStock-1}).then(() =>{
            let query ="INSERT INTO \"Orders\"  (transTime, bookType, price) VALUES (?, ?, ?);"
            let params =[Date(),response.data.ID,response.data.cost]
            db.run(query,params, (error) => {
                if(error){
                    next(error)
                }
            });
        }).catch(error => next(error))
    }).catch(error => next(error))
    res.json()
});

module.exports = router;
