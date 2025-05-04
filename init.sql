-- taking the easy way: use the default database: postgres
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    hash CHAR(128) NOT NULL,
    salt CHAR(32) NOT NULL,
    role VARCHAR(10) CHECK (role IN ('user', 'admin')) NOT NULL DEFAULT 'user'
);

CREATE TABLE IF NOT EXISTS listings (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NULL, 
    category VARCHAR(255),
    price INT, 
    desci VARCHAR(255) NULL, 
    picture VARCHAR(255) NULL
);

CREATE TABLE textbook_listings AS
    SELECT * FROM listings
    WHERE category = 'Books';


-- INSERT INTO users (username, email, hash, salt, role) VALUES ('user1', 'user1@gmail.com', 'abb465e061e919082d30911ad9e47f9c578a07e3d090d88091dabd422a13bfd1ec81543fa36f7dd518f16216949649c361e98a5be77646ee0be1e5efd48fab12', '20771cd6b3a2a65eb7b16001246be184', 'user');
-- INSERT INTO users (username, email, hash, salt, role) VALUES ('admin1', 'admin1@gmail.com', '2d2cfaf98432a4b9c8d12a9c36321675e5d588e04dca96f8211a5619d4739208f564fe959c52dc3fd389d90221cfc8c06a7b4e29818005e0daa5bdc9915b585a', '465f6c9310986b130f11a90e83dae3b7', 'admin');


-- -- ALL LISTINGS TABLE
-- CREATE TABLE IF NOT EXISTS listings (
--     listing_id SERIAL PRIMARY KEY,
--     id INT NOT NULL,
--     category VARCHAR(255),
--     price INT,
--     quantity INT,
--     FOREIGN KEY (id) REFERENCES users(id)
-- );

-- -- BOOKMARKS TABLE
-- CREATE TABLE IF NOT EXISTS bookmarks (
--     id INT NOT NULL,
--     listing_id INT NOT NULL, 
--     list_title VARCHAR(50), 
--     PRIMARY KEY (id, listing_id),
--     FOREIGN KEY (id) REFERENCES users(id)
--     FOREIGN KEY (listing_id) REFERENCES listings(listing_id)
-- );
