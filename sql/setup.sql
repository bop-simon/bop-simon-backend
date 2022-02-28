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
    notes TEXT,
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
('hoosier_mama', 'urgency'),
('hogwarts_dropout', 'harrypotter'),
('kiss_my_axe', 'axekissing');

INSERT INTO profiles(user_id, score, bio)
VALUES ('1', '1500', 'simon the all time master of the bop'),
('2', '1300', 'second in command was never better than simon but tries hard to be'),
('3', '1200', 'a dropout of hogwarts who realized magic was not for him'),
('4', '1000', 'kiss my axe ... no pun intended');

INSERT INTO fav_songs( user_id, notes)
VALUES ('1', 'c2, c4, d2, e2, f2, g3, a2, b3' ),
('2', 'c1, d3, e2, f3, g1, a2, b4'),
('3','c3, d1, e3, f3, g4, a1, b2'),
('4', 'c2, d3, e2, f2, g2, a4, b1');
