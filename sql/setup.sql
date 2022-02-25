-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS notes CASCADE;


CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    score BIGINT,
    songs BIGINT

);

CREATE TABLE notes (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    notes TEXT NOT NULL,
    level INT NOT NULL
);


INSERT INTO users (username, password_hash, score, songs)
VALUES ('jakethesnake', 'helloworld', '1500', '5');

INSERT INTO users (username, password_hash, score, songs)
VALUES ('hoosier_mama', 'plaintext', '1250', '4');

INSERT INTO users (username, password_hash, score, songs)
VALUES ('hogwarts_dropout', 'musician', '1000', '4');

INSERT INTO users (username, password_hash, score, songs)
VALUES ('kiss_my_axe', 'rustynail', '1000', '5');

INSERT INTO users (username, password_hash, score, songs)
VALUES ('hairypoppins', 'notmarypoppins', '900', '3');
