const fs = require('fs');
const mysql = require('mysql');
const csv = require('fast-csv');

let stream = fs.createReadStream("sandwhich.csv");
let myData = [];
let csvStream = csv
    .parse()
    .on("data", function (data) {
        myData.push(data);
    })
    .on("end", function () {
		//myData.shift();
		
		// create a new connection to the database
		const connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'root',
			database: 'bamazondb'
		});

        // open the connection
		connection.connect((error) => {
			if (error) {
			//	console.error(error);
			} else {
				let query = 'INSERT INTO products (item_id, product_name, department_name, price, UM, stock_quantity) VALUES ?';
				connection.query(query, [myData], (error, response) => {
				//	console.log(error || response);
					connection.end();
				});
			}
        });
       
   	});

stream.pipe(csvStream);




