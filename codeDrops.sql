CREATE DATABASE knex_test

-- Create database --
CREATE TABLE users (
  id serial unique,
  name text not null
);  

-- Insert content --
INSERT INTO users (name) values ('Wend');

-- Selecting --
SELECT * FROM users

-- Update rows --
UPDATE users SET name = 'Wendler' WHERE id = '1';

-- delete user
DELETE FROM users WHERE id = '1';

-- create table
CREATE TABLE projects (
	id serial unique,
	user_id integer references users(id),
	title text not null
);

-- select all projects
SELECT * FROM projects;

-- add project to user
INSERT INTO projects (user_id, title) values ('1', 'Meu Projeto');

-- relation user with project
SELECT projects.*, users.name 
FROM projects
JOIN users ON projects.user_id = users.id;

-- drop
DROP TABLE users;
DROP TABLE projects;
DROP DATABASE knex_test