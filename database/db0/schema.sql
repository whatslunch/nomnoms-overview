CREATE DATABASE IF NOT EXISTS nomnoms;

USE nomnoms;

DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS restaurants;

CREATE TABLE images (
  id SERIAL,
  user VARCHAR(30),
  image TEXT,
  description TEXT,
  posted DATE,
  category VARCHAR(30),
  restaurant INT,
  PRIMARY KEY (ID)
);

CREATE TABLE restaurants (
  id SERIAL,
  name VARCHAR(100),
  lat DECIMAL(10, 6),
  lng DECIMAL(10, 6),
  address TEXT,
  cost INT,
  phone TEXT,
  website TEXT,
  PRIMARY KEY (ID)
);

LOAD DATA INFILE '/Users/wgodfrey/Documents/HackReactor/immersive/hrsf105-system-design-capstone/nomnoms-overview/database/seed/restaurants.csv'
INTO TABLE restaurants
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;