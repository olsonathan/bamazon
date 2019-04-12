var allAnswers = []
var cost = 0

var mysql = require("mysql");
var inquirer = require("inquirer");

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
        "Make a sandwhich tray?",
        "Restock the items?",
        "exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Make a sandwhich tray?":
        makeSandwhich();
        break;

      case "Restock the items?":
        restock();
        break;

               
      case "exit":
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
      })
      console.log(" ")

    
      var questions = [
    {
      name: "bread",
      type: "list",
      message: "What kind of bread do you want for your sandwhich tray?",
      choices: [
        "White bread",
        "Rye bread",
        "Honey wheat",
        "Pumpernickel"
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
      console.log('\nOrder receipt:');
      console.log(JSON.stringify(answers, null, '  '));
      console.log(answers.bread)
      var a = (parseInt(answers.quantity * -1));
      console.log(a)
      var query = 'SELECT * FROM `products`WHERE product_name="White bread"';
        connection.query(query, function (err, res, fields) {
          for (var i = 0; i < res.length; i++) {

          console.log(res[i].price)
          cost = (parseFloat(res[i].price)) * (parseInt(answers.quantity)) + cost
          console.log(cost)
          
          }
      })

      chooseMeat()
      allAnswers.push(answers);
    //  changeOnhand(answers)

    })

    
};



function chooseMeat() {
  console.log("Choose your meat")
  var query = 'SELECT * FROM `products`WHERE department_name="deli"';
  connection.query(query, function (err, res, fields) {
      for (var i = 0; i < res.length; i++) {
          console.log("\nID: " + res[i].item_id + " || Product Name: " + res[i].product_name + " || Department Name: " + res[i].department_name + 
          " || Price: " + res[i].price + " || Unit: " + res[i].UM + " || Stock Qty: " + res[i].stock_quantity) ;
        }
      })
      console.log(" ")

    
      var questions = [
    {
      name: "meat",
      type: "list",
      message: "What kind of meat do you want for your sandwhich tray?",
      choices: [
        "Ham",
        "Roast beef",
        "Turkey",
        "Chicken",
        "Salami"
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
      console.log('\nOrder receipt:');
      console.log(JSON.stringify(answers, null, '  '));
      console.log(JSON.stringify(answers, null, '  '));
      allAnswers.push(answers);
      console.log(allAnswers)
     
      chooseProduce()
    })

    
};


function chooseProduce() {
  console.log("Choose your veggies")
  var query = 'SELECT * FROM `products`WHERE department_name="produce"';
  connection.query(query, function (err, res, fields) {
      for (var i = 0; i < res.length; i++) {
          console.log("\nID: " + res[i].item_id + " || Product Name: " + res[i].product_name + " || Department Name: " + res[i].department_name + 
          " || Price: " + res[i].price + " || Unit: " + res[i].UM + " || Stock Qty: " + res[i].stock_quantity) ;
        }
      })
      console.log(" ")

    
      var questions = [
    {
      name: "veg",
      type: "checkbox",
      message: "What kind of vegtables do you want for your sandwhich tray?",
      choices: [
        "Lettuce",
        "Tomato",
        "Onion",
        "Peppers",
        "Avocado"

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
      console.log('\nOrder receipt:');
      console.log(JSON.stringify(answers, null, '  '));
      console.log(JSON.stringify(answers, null, '  '));
      allAnswers.push(answers);
      console.log(allAnswers)
     chooseCheese()
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
      })
      console.log(" ")

    
      var questions = [
    {
      name: "cheese",
      type: "checkbox",
      message: "What kind of cheese do you want for your sandwhich tray?",
      choices: [
        "American cheese",
        "Swiss cheese", 
        "Provolone cheese",
        "Colby Jack Cheese"
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
      console.log('\nOrder receipt:');
      console.log(JSON.stringify(answers, null, '  '));
      console.log(JSON.stringify(answers, null, '  '));
      allAnswers.push(answers);
      console.log(allAnswers)
      condiments()
     
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
        })
        console.log(" ")
  
      
        var questions = [
      {
        name: "condiment",
        type: "checkbox",
        message: "What kind of condiments do you want for your sandwhich tray?",
        choices: [
          "Honey Mustard",
          "BBQ Sauce",
          "Italian Dressing",
          "Mayonaise"

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
        console.log('\nOrder receipt:');
        //console.log(JSON.stringify(answers, null, '  '));
        
        allAnswers.push(answers);
        console.log(allAnswers)
        console.log(JSON.stringify(allAnswers, null, '  '));
        continuePrompt();
      })
  
      
  
    };
  


    function continuePrompt() {
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
            console.log("Thanks for your business!");
            connection.end();
          }
      });
    }
 
    function restock() {
      console.log("Restocking to normal Qty...\n");
      var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: 20
          },
          {
            product_name: "Turkey"
          }
        ],
        function(err, res) {
          console.log(res.affectedRows + " we have more stuff\n");
          // Call deleteProduct AFTER the UPDATE completes
          
         // deleteProduct();
         start()
        }
      );
    
      // logs the actual query being run
      console.log(query.sql);
    
    }

    function changeOnhand() {
      console.log("update on-hand...\n");
      var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: answers[2]
          },
          {
            product_name: answers[1]
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