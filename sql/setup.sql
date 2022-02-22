-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS levels CASCADE;

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email TEXT NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE levels (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    easy VARCHAR NOT NULL,
    medium VARCHAR NOT NULL,
    hard VARCHAR NOT NULL
);
