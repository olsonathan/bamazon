 


# Welcome to the Bamazon Sandwhich Tray maker


![sandwhich](https://github.com/olsonathan/bamazon/blob/master/sandwich-clipart-burger_sandwich_PNG4138.png)
 


This is an App that uses the CLI to ask the user some questions to build out sandwhich trays.  The front end is some simple questions using the inquirer package, and the backend uses mysql to hold the values that the user has choosen.

On execution of the *node bamazon.js* the user has three choices.

![First](https://github.com/olsonathan/bamazon/blob/master/first.PNG)
 

Make a sandwhich tray--runs the user through the app.

Choosing *Make a sandwhich tray* will start the user being asked questions about the type of Bread, Meat, Vegtables, Cheese, and Condiments that they would like for their sandwhich tray.

 ![Second](https://github.com/olsonathan/bamazon/blob/master/second.PNG)



![Fourth](https://github.com/olsonathan/bamazon/blob/master/fourth.PNG)

once all the of the questions have been answered the user is given their total and asked if they would like to make another tray.

 

![Third](https://github.com/olsonathan/bamazon/blob/master/third.PNG)


If the user choice is *Manage the system*.  The user will be asked the manager password and with the correct password will have choices to *Check Stock, Restock the items, or go back to the main menu*

![Fifth]
(https://github.com/olsonathan/bamazon/blob/master/Fifth.PNG)


*Check Stock* will show all items on hand from the mysql database.
*Restock the items* will recreate the mysql table from the CSV file.






## bamazon