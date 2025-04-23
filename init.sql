-- taking the easy way: use the default database: postgres
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    hash CHAR(128) NOT NULL,
    salt CHAR(32) NOT NULL,
    role VARCHAR(10) CHECK (role IN ('user', 'admin')) NOT NULL DEFAULT 'user'
);

select * from users;

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
