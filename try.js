var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  port : 3306,
  user     : 'root',
  password : 'root',
  database : 'bamazondb'
});

var main = process.argv[2];
var def = process.argv[3];

connection.connect(function(err) {
    if (err) throw err;{
   console.log("connected as id " + connection.threadId);
  
    }
   
    if (main == undefined){

        console.log("I need an input")



        connection.end();


      }


  else if (main === "create"){

    createProduct();
  }
  
  else if(main === "update"){
    updateProduct()
  }
  
  else if(main === "delete"){
    deleteProduct()
  }

  else if(main === "read"){
    readProducts()
  }
  
  });


  /*function afterConnection() {
    connection.query("SELECT * FROM playlist", function(err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
      });
    
    };
    */


    function createProduct() {
        console.log("Inserting a new song...\n");
        var query = connection.query(
          "INSERT INTO playlist SET ?",
          {
            title: "Waterfalls",
            artist: "TLC",
            genre: "R&B"
          },
          function(err, res) {
            console.log(res.affectedRows + " song inserted!\n");
            // Call updateProduct AFTER the INSERT completes
            readProducts();
         //   updateProduct();
          }
        );
      
        // logs the actual query being run
        console.log(query.sql);
      }
      
      function updateProduct() {
        console.log("Updating song Title...\n");
        var query = connection.query(
          "UPDATE playlist SET ? WHERE ?",
          [
            {
              title: "Bad Company"
            },
            {
              artist: "Five Finger Death Punch"
            }
          ],
          function(err, res) {
            console.log(res.affectedRows + " song updated!\n");
            // Call deleteProduct AFTER the UPDATE completes
            readProducts();
           // deleteProduct();
          }
        );
      
        // logs the actual query being run
        console.log(query.sql);
      }
      
      function deleteProduct() {
        console.log("Deleting song...\n");
        connection.query(
          "DELETE FROM playlist WHERE ?",
          {
            genre: "R&B"
          },
          function(err, res) {
            console.log(res.affectedRows + "  songs deleted!\n");
            // Call readProducts AFTER the DELETE completes
            readProducts();
          }
        );
      }
      
      
      function readProducts() {
        //console.log("Selecting all playlist...\n");
                
        var query = 'SELECT * FROM `products`';
        connection.query(query, function (err, res, fields) {
            for (var i = 0; i < res.length; i++) {
                console.log("ID: " + res[i].item_id + " || Product Name: " + res[i].product_name + " || Department Name: " + res[i].department_name + 
                " || Price: " + res[i].price + " || Unit: " + res[i].UM + " || Stock Qty: " + res[i].stock_quantity) ;
              }
          
          
          // Log all results of the SELECT statement
         // console.log(results);



         connection.end();
        });
      }
  
    //  'SELECT * FROM `books` WHERE `author` = "David"'