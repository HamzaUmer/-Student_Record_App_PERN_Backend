CREATE DATABASE studentrecord;

CREATE TABLE record(
    s_no SERIAL PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(355),
    discipline VARCHAR(255),
    fees NUMERIC (6 ,2)
);