CREATE DATABASE IF NOT EXISTS nomnoms;

USE nomnoms;

DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS restaurants;

CREATE TABLE images (
  id INT NOT NULL AUTO_INCREMENT,
  user VARCHAR(30),
  image TEXT,
  description TEXT,
  posted DATE,
  category VARCHAR(30),
  restaurant INT,
  PRIMARY KEY (ID)
);

CREATE TABLE restaurants (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100),
  address TEXT,
  phone TEXT,
  website TEXT,
  lat DECIMAL(10, 6),
  lng DECIMAL(10, 6),
  cost INT,
  PRIMARY KEY (ID)
);