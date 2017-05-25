CREATE DATABASE plaudit_test;

CREATE TABLE plaudit_test.employees
(
id int NOT NULL AUTO_INCREMENT,
employee_name varchar(255) NOT NULL,
employee_email varchar(255) NOT NULL,
employee_password varchar(255) NOT NULL,
PRIMARY KEY (id)
);

SELECT * FROM plaudit_test.employees;

INSERT INTO plaudit_test.employees (employee_name, employee_email, employee_password) VALUES ('Rebecca', 'rkpalmore@gmail.com', 'password');

INSERT INTO plaudit_test.employees (employee_name, employee_email, employee_password) VALUES ('Tom', 'rkpalmore@yahoo.com', 'password2');












