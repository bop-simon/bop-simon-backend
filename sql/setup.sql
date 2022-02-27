DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS fav_songs CASCADE;


CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE fav_songs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    notes VARCHAR[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE profiles (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    score BIGINT,
    bio TEXT
);




INSERT INTO users (username, password_hash)
VALUES ('bop-simon', 'helloworld'),
('hola-lola', 'urgency');

INSERT INTO profiles(user_id, score, bio)
VALUES ('1', '15000', 'simon the all time master of the bop'),
('2', '13000', 'second in command');

INSERT INTO fav_songs( user_id, notes)
VALUES ('1', ARRAY['c2', 'd2', 'e2']),
('1', ARRAY['c3', 'd2', 'e2']),
('2', ARRAY['c2', 'd3', 'f2']);




-- INSERT INTO users (username, password_hash, score, songs)
-- VALUES ('hoosier_mama', 'plaintext', '1250', '4');

-- INSERT INTO users (username, password_hash, score, songs)
-- VALUES ('hogwarts_dropout', 'musician', '1000', '4');

-- INSERT INTO users (username, password_hash, score, songs)
-- VALUES ('kiss_my_axe', 'rustynail', '1000', '5');
