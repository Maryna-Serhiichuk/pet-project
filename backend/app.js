const http = require('http');
const url = require('url');
const mysql = require('mysql');
const configDB = require('./config/db.js');

const conn = mysql.createConnection(configDB);

const dbNameTable = 'goods';



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

http.createServer( (req, res) => {
    let urlInfo = url.parse(req.url, true);
    // console.log(req)

    if(req.method == 'GET'){
        switch(urlInfo.pathname){
            case '/goods':
                getGoods(req, res);
                break;
            default:
                error404(req, res);
                break;
        }
    }
    else if (req.method == 'POST'){
        switch(urlInfo.pathname){
            case '/goods':
                addNewGoods(req, res)
                break;
            default:
                error404(req, res);
                break;
        }
    }
    else if (req.method == 'PUT'){
        switch(urlInfo.pathname){
            case '/goods':
                updateGoods(req, res);
                break;
            default:
                error404(req, res);
                break;
        }
    }
    else if (req.method == 'DELETE'){
        switch(urlInfo.pathname){
            case '/goods':
                deleteGoods(req, res)
                break;
            default:
                error404(req, res);
                break;
        }
    } else {
        error404(req, res)
    }
}).listen(3001, () => {
    console.log('work')
})

function error404(req, res){
    res.end('404 not found');
}

function getGoods(req, res){
    conn.query(`SELECT * FROM ${dbNameTable}`, (err, result, field) => {
        let content = JSON.stringify(result);
        res.end(content);
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
            res.end();
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
            res.end();
        })
    })
}

function deleteGoods(req, res){
    let urlInfo = url.parse(req.url, true);

    conn.query(`DELETE FROM ${dbNameTable} WHERE id = ${urlInfo.query.delete}`, (err, result, field) => {
        res.end();
    })
}