console.log('will');
const express = require('express');
const fetch = require('node-fetch');
const redis = require('redis');
console.log('1');
const REDIS_PORT = process.env.REDIS_PORT || 6379;
console.log('2');
const client = redis.createClient(REDIS_PORT);
console.log('3');
const router = express.Router();
console.log('4');
// Set response
function setResponse(username, repos) {
    return `<h2>${username} has ${repos} Github repos</h2>`;
}

// Make request to the server for data
async function getItem(req, res, next) {
    try {
        console.log('Fetching Data...');

        const { bookId } = req.params;

        const response = await fetch(`http://localhost:8081/api/query/item/${bookId}`);

        // Set data to Redis
        client.set(bookId, 3600, response);


        res.json(response);
    } catch (err) {
        console.error(err);
        res.status(500);
    }
}

async function getItemBySub(req, res, next) {

}

// Cache middleware
function itemCache(req, res, next) {
    console.log('9');
    const { bookId } = req.params;
    console.log('will !!');
    client.get(JSON.stringify(bookId), (err, data) => {
        if (err) throw err;

        if (data !== null) {
            res.send(JSON.parse(data));
        } else {
            next();
        }
    });
}
console.log('8');
// Cache middleware
function subCache(req, res, next) {
    const { bookId } = req.params;
    console.log('will !!!');

    client.get(bookId, (err, data) => {
        if (err) throw err;

        if (data !== null) {
            res.send(setResponse(bookId, data));
        } else {
            next();
        }
    });
}

// router.get('/item', cache, getItems);


// Handles the get at api/query/item/{itemNumber}
console.log('5');
router.get('/item/:item', itemCache, getItem);
console.log('6');

// Handles the get at api/query/subject/{subjectName}
router.get('/subject/:subject', subCache, getItemBySub);
console.log('7');

module.exports = router;
