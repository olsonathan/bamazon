DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT(11) NOT NULL,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  UM varchar(100) null,
  stock_quantity int(10) NULL,
  PRIMARY KEY (item_id)
);

SELECT * FROM products;