CREATE DATABASE test
CHARACTER SET latin1
COLLATE latin1_swedish_ci;

USE test;

CREATE TABLE test.user (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(50) DEFAULT NULL,
  email varchar(50) UNIQUE,
  password varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB;