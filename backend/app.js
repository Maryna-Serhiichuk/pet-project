const http = require('http');
const url = require('url');
const mysql = require('mysql');
const configDB = require('./config/db.js');

const conn = mysql.createConnection(configDB);

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended:true});

const dbNameTable = 'goods';

app.listen(3001);

app.route('/goods')
    .get((req, res) => {
        getGoods(req, res);
    })
    .post(urlencodedParser, (req, res) => {
        addNewGoods(req, res);
    })
    .put(urlencodedParser, (req, res) => {
        updateGoods(req, res);
    })
    .delete((req, res) => {
        deleteGoods(req, res);
    })

function getGoods(req, res){
    conn.query(`SELECT * FROM ${dbNameTable}`, (err, result, field) => {
        let content = JSON.stringify(result);
        res.send(content);
    })
}

function addNewGoods(req, res){
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    })
    req.on('end', () => {
        let result = JSON.parse(body);
        conn.query(`INSERT INTO ${dbNameTable} (title, price, info, image) VALUES ('${result.title}', '${result.price}', '${result.info}', '${result.image}');`, (err, result, field) => {
            console.log(err)
            res.send();
        })
    })
}

function updateGoods(req, res){
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    })
    req.on('end', () => {
        let result = JSON.parse(body);

        conn.query(`UPDATE ${dbNameTable} SET title = '${result.title}', price = ${result.price}, info = '${result.info}', image = '${result.image}' WHERE id = ${result.id}`, (err, result, field) => {
            res.send();
        })
    })
}

function deleteGoods(req, res){
    let urlInfo = url.parse(req.url, true);

    conn.query(`DELETE FROM ${dbNameTable} WHERE id = ${urlInfo.query.delete}`, (err, result, field) => {
        res.send();
    })
}

// CREATE TABLE goods ( // створення таблички
// 	id INT NOT NULL AUTO_INCREMENT,
//     title VARCHAR (30),
//     price INT,
//     info TEXT,
//     date DATETIME DEFAULT CURRENT_TIMESTAMP, 
//     PRIMARY KEY (id)
// );

// INSERT INTO goods (title, price, info) VALUES // додаєм товар
// ('New York City','2','New Yorkes eat'), 
// ('Paris City','6','Paris eat'), 
// ('London City','5','London eat'), 
// ('Hachapuri','1','Station eat'), 
// ('Gamburger','12','McDonalds ate');