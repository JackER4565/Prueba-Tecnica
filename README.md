
# Technical Test

Result of the required technical test.
The login credentials are: 
```bash
email: test@test.com
password: test
```
routes are protected with JWT.

## Installation

To install all the dependencies run the following command in the **front** and **back** folder:

```bash
  npm install
```
    
## Authors

- [@Fabrizio Rondinella](https://github.com/JackER4565)

## Endpoints

This are the endpoints of this repository:

# /customers (protected)

|Method|Route|Description|
|---|---|---|
|GET|/|Gets all customers from DB|
|GET|/DB|Gets all customers from openpay|
|POST|/id|Create one customer to both|
|DELETE|/id|Deletes one customer from both|
|PUT|/id|Updates one customer from both|

# /charges (protected)

|Method|Route|Description|
|---|---|---|
|POST|/id|Create one charge to DB and openpay|
|GET|/|Get all charges from DB|

# /login

|Method|Route|Description|
|---|---|---|
|POST|/|Logs in to get token|


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file


`OPENPAY_ID=mhlndou0crqlhtohpekx`

`OPENPAY_PRIVATE=sk_afa279bf82764d54b4118e23d218b0bc`

`OPENPAY_PUBLIC=pk_a896f2180a0248a980cfe1874621fe86`

`OPENPAY_URL=https://sandbox-api.OPENPAY.mx/v1/`

`DB_HOST=db4free.net`

`DB_USER=fabriziotechtest`

`DB_PASS=contraseniatechtest`

`DB_DB=fabriziotechtest`

`SECRETORPRIVATEKEY=2JqNUYRvXuQyZzGcHBCe6qBpReFgawvD`
## Database Configuration

The MySql database was created with [DB4free](https://www.db4free.net/signup.php).



```sql
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
```

```sql
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
```

```sql
ALTER TABLE charges
ADD CONSTRAINT fk_customer
FOREIGN KEY (customer_id) REFERENCES users(id);
```

