CREATE OR REPLACE TABLE clients
(id INT AUTO_INCREMENT PRIMARY KEY, first_name VARCHAR(64), last_name VARCHAR(64), national_id BIGINT UNSIGNED UNIQUE, phone BIGINT UNSIGNED UNIQUE, email VARCHAR(255) UNIQUE, muutja VARCHAR(64), muutmisaeg DATE);

CREATE OR REPLACE FULLTEXT INDEX clients_first_name_index ON clients(first_name);

CREATE OR REPLACE FULLTEXT INDEX clients_last_name_index ON clients(last_name);