-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS songs CASCADE;

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE songs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    notes TEXT NOT NULL,
    level INT NOT NULL
);

CREATE TABLES scores (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    song_id INT NOT NULL,
    FOREIGN KEY (song_id) REFERENCES users(id),
    score BIGINT NOT NULL
)
