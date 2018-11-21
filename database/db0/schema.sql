
DROP DATABASE IF EXISTS nomnoms;
CREATE DATABASE nomnoms;

USE nomnoms;

DROP TABLE IF EXISTS restaurants;
DROP TABLE IF EXISTS images;

CREATE TABLE restaurants (
  id SERIAL,
  name VARCHAR(100),
  lat DECIMAL(10, 6),
  lng DECIMAL(10, 6),
  address TEXT,
  cost INT,
  phone TEXT,
  website TEXT,
  PRIMARY KEY (id)
);

CREATE TABLE images (
  id SERIAL,
  src TEXT,
  restaurant_id BIGINT UNSIGNED,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);

LOAD DATA INFILE '/Users/wgodfrey/Documents/HackReactor/immersive/hrsf105-system-design-capstone/nomnoms-overview/database/seed/restaurants.csv'
INTO TABLE restaurants 
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(name, lat, lng, address, cost, phone, website);

LOAD DATA INFILE '/Users/wgodfrey/Documents/HackReactor/immersive/hrsf105-system-design-capstone/nomnoms-overview/database/seed/images.csv'
INTO TABLE images
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(src, restaurant_id);