var allAnswers = []
var cost = 0
var nm;
var a;
var quan;
var b = 0

var mysql = require("mysql");
var inquirer = require("inquirer");
//var CVS = require("./csv_insert.js");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazondb"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});



function start() {
  
  
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Make a sandwich tray?",
        "Manage the system",
        "Exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Make a sandwich tray?":
        makeSandwhich();
        break;

      case "Manage the system":
        password();
        break;

               
      case "Exit":
           console.log(" ")
            console.log("\x1b[43m\x1b[30m","Thanks for your business!")
            console.log("\x1b[0m", " ")
        connection.end();
        break;
      }
    });
}

function makeSandwhich() {
  console.log("Choose your bread")
  var query = 'SELECT * FROM `products`WHERE department_name="bakery"';
  connection.query(query, function (err, res, fields) {
      for (var i = 0; i < res.length; i++) {
          console.log("\nID: " + res[i].item_id + " || Product Name: " + res[i].product_name + " || Department Name: " + res[i].department_name + 
          " || Price: " + res[i].price + " || Unit: " + res[i].UM + " || Stock Qty: " + res[i].stock_quantity) ;
          
        }
        console.log(" ")
      })
      console.log(" ")

    
      var questions = [
    {
      name: "bread",
      type: "list",
      message: "What kind of bread do you want for your sandwich tray?",
      choices: [
        "White bread",
        "Rye bread",
        "Honey wheat",
        "Pumpernickel",
        "None"
      ]
    },
    {
      type: 'input',
      name: 'quantity',
      message: 'How many loafs do you need?',
      validate: function(value) {
        var valid = !isNaN(parseFloat(value));
        return valid || 'Please enter a number';
      },
      filter: Number
    },
  ];
    inquirer.prompt(questions).then(answers => {
    //  console.log('\nOrder receipt:');
    //  console.log(JSON.stringify(answers, null, '  '));
    //  console.log(answers.bread)

       nm = answers.bread
      var a = (parseInt(answers.quantity));
     if(nm === "None"){
      chooseMeat()
     }
     else{

    //  console.log(a)
      var query = 'SELECT * FROM `products`WHERE  ?';
        connection.query(query, {product_name: answers.bread}, function (err, res, fields) {
          for (var i = 0; i < res.length; i++) {
            if((res[i].stock_quantity-a) >= 0){
             // console.log( "I'm sorry we don't have enough stock")
             allAnswers.push(answers);
            
           // else{
          b = res[i].stock_quantity
         // console.log(b)
          quan = (b-a)
          cost = (res[i].price * a) + cost
           // }
           setTimeout(changeOnhand, 2000);
           chooseMeat()
            }
    //      console.log(cost)
          else{
            console.log(" ")
            console.log("\x1b[31m%s\x1b[0m", "I'm sorry we don't have enough stock please try again")
            console.log(" ")
            
            makeSandwhich()
          }

          }
          
         
      })

      
    }
    
      
    //  changeOnhand(answers)
   // chooseMeat()  
    })
  
    
    
};



function chooseMeat() {
  changeOnhand()
  console.log("Choose your meat")
  var query = 'SELECT * FROM `products`WHERE department_name="deli"';
  connection.query(query, function (err, res, fields) {
      for (var i = 0; i < res.length; i++) {
          console.log("\nID: " + res[i].item_id + " || Product Name: " + res[i].product_name + " || Department Name: " + res[i].department_name + 
          " || Price: " + res[i].price + " || Unit: " + res[i].UM + " || Stock Qty: " + res[i].stock_quantity) ;
        }
        console.log(" ")
      })
      console.log(" ")

    
      var questions = [
    {
      name: "meat",
      type: "list",
      message: "What kind of meat do you want for your sandwich tray?",
      choices: [
        "Ham",
        "Roast beef",
        "Turkey",
        "Chicken",
        "Salami",
        "None"
      ]
    },
    {
      type: 'input',
      name: 'quantity',
      message: 'How many pounds do you need?',
      validate: function(value) {
        var valid = !isNaN(parseFloat(value));
        return valid || 'Please enter a number';
      },
      filter: Number
    },
  ];
    inquirer.prompt(questions).then(answers => {
    //  console.log('\nOrder receipt:');
    //  console.log(JSON.stringify(answers, null, '  '));
    //  console.log(JSON.stringify(answers, null, '  '));
    
    //  console.log(allAnswers)
    nm = answers.meat
      var a = (parseInt(answers.quantity ));
      if(nm === "None"){
        chooseProduce()
       }
       else{

    //  console.log(a)
      var query = 'SELECT * FROM `products`WHERE ?';

        connection.query(query, {product_name: answers.meat},  function (err, res, fields) {
           for (var i = 0; i < res.length; i++) {
              if((res[i].stock_quantity-a) >= 0){
                allAnswers.push(answers);
    //      console.log(res[i].price)
          b = res[i].stock_quantity
          quan = (b-a)
          cost = (res[i].price * a) + cost
    //      console.log(cost)
            setTimeout(changeOnhand, 2000);
            chooseProduce()

              }
        else{
          console.log(" ")
          console.log("\x1b[31m%s\x1b[0m", "I'm sorry we don't have enough stock please try again")
      console.log(" ")
      chooseMeat()
    }
         
          }
        //  setTimeout(changeOnhand, 2000);
        })
      }
    //  changeOnhand()
   
    })

    
};


function chooseProduce() {
  console.log("Choose your veggies")
  var query = 'SELECT * FROM `products`WHERE department_name="Produce"';
  connection.query(query, function (err, res, fields) {
      for (var i = 0; i < res.length; i++) {
          console.log("\nID: " + res[i].item_id + " || Product Name: " + res[i].product_name + " || Department Name: " + res[i].department_name + 
          " || Price: " + res[i].price + " || Unit: " + res[i].UM + " || Stock Qty: " + res[i].stock_quantity) ;
        }
        console.log(" ")
      })
      console.log(" ")

    
      var questions = [
    {
      name: "veg",
      type: "list",
      message: "What kind of vegtables do you want for your sandwich tray?",
      choices: [
        "Lettuce",
        "Tomato",
        "Onion",
        "Peppers",
        "Avocado",
        "None"

      ]
    },
    {
      type: 'input',
      name: 'quantity',
      message: 'How much do you need?',
      validate: function(value) {
        var valid = !isNaN(parseFloat(value));
        return valid || 'Please enter a number';
      },
      filter: Number
    },
  ];
    inquirer.prompt(questions).then(answers => {
    //  console.log('\nOrder receipt:');
    //  console.log(JSON.stringify(answers, null, '  '));
    //  console.log(JSON.stringify(answers, null, '  '));
      
    //  console.log(allAnswers)
    nm = answers.veg
    var a = (parseInt(answers.quantity));

    if(nm === "None"){
      chooseCheese()
     }
     else{

      var query = 'SELECT * FROM `products`WHERE ?';
        connection.query(query, {product_name: answers.veg}, function (err, res, fields) {
          for (var i = 0; i < res.length; i++) {
           if((res[i].stock_quantity-a) >= 0){
          //    console.log( "I'm sorry we don't have enough stock")
            //  chooseProduce()
          //  }
          allAnswers.push(answers);
    //      console.log(res[i].price)
          b = res[i].stock_quantity
          quan = (b-a)
          cost = (res[i].price * a) + cost
    //      console.log(cost)
            setTimeout(changeOnhand, 2000);
            moreVeg()
          }
          else{
            console.log(" ")
            console.log("\x1b[31m%s\x1b[0m", "I'm sorry we don't have enough stock please try again")
            console.log(" ")
            chooseProduce()
          }


          }
         // 
        })

      }


    // changeOnhand()
    // chooseCheese()
    })

    
};


function chooseCheese() {
  console.log("Choose your Cheese")
  var query = 'SELECT * FROM `products`WHERE department_name="Cheese Monger"';
  connection.query(query, function (err, res, fields) {
      for (var i = 0; i < res.length; i++) {
          console.log("\nID: " + res[i].item_id + " || Product Name: " + res[i].product_name + " || Department Name: " + res[i].department_name + 
          " || Price: " + res[i].price + " || Unit: " + res[i].UM + " || Stock Qty: " + res[i].stock_quantity) ;
        }
        console.log(" ")
      })
      console.log(" ")

    
      var questions = [
    {
      name: "cheese",
      type: "list",
      message: "What kind of cheese do you want for your sandwich tray?",
      choices: [
        "American cheese",
        "Swiss cheese", 
        "Provolone cheese",
        "Colby Jack Cheese",
        "None"
      ]
    },
    {
      type: 'input',
      name: 'quantity',
      message: 'How many pounds do you need?',
      validate: function(value) {
        var valid = !isNaN(parseFloat(value));
        return valid || 'Please enter a number';
      },
      filter: Number
    },
  ];
    inquirer.prompt(questions).then(answers => {
    //  console.log('\nOrder receipt:');
    //  console.log(JSON.stringify(answers, null, '  '));
    //  console.log(JSON.stringify(answers, null, '  '));
     
    //  console.log(allAnswers)
    nm = answers.cheese
    var a = (parseInt(answers.quantity));
    if(nm === "None"){
      condiments()
     }
     else{

      var query = 'SELECT * FROM `products`WHERE ?';
      connection.query(query, {product_name: answers.cheese}, function (err, res, fields) {
        for (var i = 0; i < res.length; i++) {
          if((res[i].stock_quantity-a) >= 0){
        //    console.log( "I'm sorry we don't have enough stock")
           // chooseCheese()
        //  }
        allAnswers.push(answers);
      //  console.log(res[i].price)
        b = res[i].stock_quantity
        quan = (b-a)
        cost = (res[i].price * a) + cost
      //  console.log(cost)
      setTimeout(changeOnhand, 2000);
      condiments()
        }
      
        else{
          console.log(" ")
          console.log("\x1b[31m%s\x1b[0m", "I'm sorry we don't have enough stock please try again")
          console.log(" ")
          chooseCheese()
        }


        }
      })

    }
     // changeOnhand()
   //   condiments()
     
    })

  

  };

  function condiments() {
    console.log("Choose your Condiments")
    var query = 'SELECT * FROM `products`WHERE department_name="Grocery"';
    connection.query(query, function (err, res, fields) {
        for (var i = 0; i < res.length; i++) {
            console.log("\nID: " + res[i].item_id + " || Product Name: " + res[i].product_name + " || Department Name: " + res[i].department_name + 
            " || Price: " + res[i].price + " || Unit: " + res[i].UM + " || Stock Qty: " + res[i].stock_quantity) ;
          }
          console.log(" ")
        })
        console.log(" ")
  
      
        var questions = [
      {
        name: "condiment",
        type: "list",
        message: "What kind of condiments do you want for your sandwich tray?",
        choices: [
          "Honey Mustard",
          "BBQ Sauce",
          "Italian Dressing",
          "Mayonaise",
          "None"

        ]
      },
      {
        type: 'input',
        name: 'quantity',
        message: 'How much do you need?',
        validate: function(value) {
          var valid = !isNaN(parseFloat(value));
          return valid || 'Please enter a number';
        },
        filter: Number
      },
    ];
      inquirer.prompt(questions).then(answers => {
      //  console.log('\nOrder receipt:');
        //console.log(JSON.stringify(answers, null, '  '));
        nm = answers.condiment
        var a = (parseInt(answers.quantity));
        if(nm === "None"){
          setTimeout(continuePrompt, 3000);
         }
         else{
    
        
      //  console.log(allAnswers)
      //  console.log(JSON.stringify(allAnswers, null, '  '));
        var query = 'SELECT * FROM `products`WHERE ?';
        connection.query(query, {product_name: answers.condiment}, function (err, res, fields) {
          for (var i = 0; i < res.length; i++) {
            if((res[i].stock_quantity-a) >= 0){
         //     console.log( "I'm sorry we don't have enough stock")
         //    // condiments()
         //   }
         allAnswers.push(answers);
        //  console.log(res[i].price)
          b = res[i].stock_quantity
          quan = (b-a)
          cost = (res[i].price * a) + cost
          
        //  console.log(cost)
        setTimeout(changeOnhand, 2000);
        setTimeout(continuePrompt, 3000);
            }
            else{
              console.log(" ")
              console.log("\x1b[31m%s\x1b[0m", "I'm sorry we don't have enough stock please try again")
              console.log(" ")
              condiments()
            }

          }
        })

      }
         
      })
  
      
  
    };
  


    function continuePrompt() {
      console.log('\nOrder receipt:');
      console.log(allAnswers);
      console.log(" ")
      console.log("\x1b[33m", " Your order Total is:  $" + (cost.toFixed(2)))
      console.log("\x1b[0m", " ")
          

      inquirer.prompt([
          {
            name: "continue",
            type: "list",
            message: "Would you like to make another tray?",
            choices: ["Yes", "No"]
          }
        ])
       
      .then(data => {
          if(data.continue === "Yes") {
           
            start();
          } else {
            console.log(" ")
            console.log("\x1b[43m\x1b[30m","Thanks for your business!")
            console.log("\x1b[0m", " ")
          
            connection.end();
          }
      });
      
    }
 
    function restock() {
      console.log("Restocking to normal Qty...\n");
      var sql = "DROP TABLE products";
       connection.query(sql, function (err, result) {
        if (err) throw err;
       //   console.log("Table deleted");
       });
       
      
        
         var sql = "CREATE TABLE products (item_id INT(11) NOT NULL, product_name VARCHAR(100) NULL, department_name VARCHAR(100) NULL, price DECIMAL(10,2) NULL, UM varchar(100) null, stock_quantity int(10) NULL, PRIMARY KEY (item_id))";
          
          connection.query(sql, function (err, result) {
            if (err) throw err;
         //   console.log("Table created");
          });
          

          setTimeout(csv, 3000);
               
         console.log("Everything is fully stocked")
         manager()
        }
 

        function csv(){
          var CVS = require("./csv_insert.js");

        }



    function changeOnhand() {
    //  console.log("update on-hand...\n");
      var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: quan
          },
          {
            product_name: nm
          }
        ],
       
      );
    
      // logs the actual query being run
    //  console.log(query.sql);
    }

    function moreVeg() {
       

      inquirer.prompt([
          {
            name: "continue",
            type: "list",
            message: "Do you need more vegtables?",
            choices: ["Yes", "No"]
          }
        ])
       
      .then(data => {
          if(data.continue === "Yes") {
            chooseProduce()
            
          } else {
                      
            chooseCheese()
          }
      });
      
    }

    function password(){

        inquirer
          .prompt({
            name: "password",
            type: "password",
            message: "Enter your manager password: 1234"
           
          })
          .then(function(answer) {
            if (answer.password === "1234"){
                manager()

            }

        else{
            console.log("Please try again")
            password()
        }

            })
    
        };
    
    
    
    
    
    
    function manager() {
  
        

        inquirer
          .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
              "Check Stock",
              "Restock the items?",
              "Enter a sandwich order"
            ]
          })
          .then(function(answer) {
            switch (answer.action) {
            case "Check Stock":
              checkStock();
              break;
      
            case "Restock the items?":
              restock();
              break;
      
                     
            case "Enter a sandwich order":
                start()
              break;
            }
          });
      }


      function checkStock(){
        var query = 'SELECT * FROM `products`';
            connection.query(query, function (err, res, fields) {
        for (var i = 0; i < res.length; i++) {
            console.log("\nID: " + res[i].item_id + " || Product Name: " + res[i].product_name + " || Department Name: " + res[i].department_name + 
            " || Price: " + res[i].price + " || Unit: " + res[i].UM + " || Stock Qty: " + res[i].stock_quantity) ;
          }


      })
      manager()
    };