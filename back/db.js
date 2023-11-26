const mysql = require('mysql');

// Configura la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DB,
});

module.exports = db;

/*
CREATE TABLE users (
    id VARCHAR(20) PRIMARY KEY NOT NULL,
    name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(255),
    phone_number VARCHAR(20),
    line1 VARCHAR(255),
    line2 VARCHAR(255),
    postal_code INT,
    state VARCHAR(50),
    city VARCHAR(50),
    country_code CHAR(2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
*/

/*
CREATE TABLE charges (
    id VARCHAR(20) PRIMARY KEY NOT NULL,
    customer_id VARCHAR(20),
    order_id VARCHAR(50),	
    description VARCHAR(255),
    amount INT,
    method VARCHAR(20),
    reference BIGINT,
    currency CHAR(3),
    barcode_url VARCHAR(255),
    url_store VARCHAR(255),
    authorization VARCHAR(255),
    operation_type VARCHAR(5),
    transaction_type VARCHAR(50),
    status VARCHAR(50),
    conciliated BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
*/

/*
ALTER TABLE charges
ADD CONSTRAINT fk_customer
FOREIGN KEY (customer_id) REFERENCES users(id);
*/