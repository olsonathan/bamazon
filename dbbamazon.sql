DROP DATABASE IF EXISTS seinfield_db;
CREATE database seinfield_db;

USE seinfield_db;

CREATE TABLE actors (
item_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NULL,
  coolness_points int(11),
  attitude VARCHAR(100) NULL,
  PRIMARY KEY (item_id)
);


INSERT INTO actors (name, coolness_points, attitude)
VALUES ("Jerry", 10, "some");

INSERT INTO actors (name, coolness_points, attitude)
VALUES ("Kramer", 9, "strange");

INSERT INTO actors (name, coolness_points, attitude)
VALUES ("George", 8, "uptight");

INSERT INTO actors (name, coolness_points, attitude)
VALUES ("Elaine", 11, "needy");


SELECT * FROM `actors` order by coolness_points