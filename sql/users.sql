CREATE OR REPLACE TABLE users
(name VARCHAR(64) PRIMARY KEY, pass VARCHAR(255) NOT NULL, is_admin BOOL NOT NULL DEFAULT 0);

CREATE OR REPLACE PROCEDURE create_user(p_name VARCHAR(64), p_pass VARCHAR(255))
REPLACE INTO users SET name = p_name, pass = p_pass;

CREATE OR REPLACE PROCEDURE delete_user(p_name VARCHAR(64))
DELETE FROM users WHERE name = p_name;

CREATE OR REPLACE PROCEDURE get_user(p_name VARCHAR(64), OUT p_pass VARCHAR(255), OUT p_is_admin BOOL)
SELECT pass, is_admin INTO p_pass, p_is_admin FROM users WHERE name = p_name;

CREATE OR REPLACE PROCEDURE set_user_admin(p_name VARCHAR(64), p_admin BOOL)
UPDATE users SET is_admin = p_admin WHERE name = p_name;