DROP DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
	id INTEGER AUTO_INCREMENT NOT NULL,
	name VARCHAR(30),
	PRIMARY KEY(id)
);


CREATE TABLE role (
	id INTEGER AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(5,3),
    department_id INTEGER REFERENCES department(id),
	PRIMARY KEY(id)
);

CREATE TABLE employees  (
	id INTEGER AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
	role_id INTEGER REFERENCES role(title),
    manager_id INTEGER,
	PRIMARY KEY(id)
);