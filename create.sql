CREATE DATABASE test
CHARACTER SET utf8
COLLATE utf8_general_ci;

USE test;

CREATE TABLE test.user (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(50) DEFAULT NULL,
  email varchar(50) UNIQUE,
  password varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB;