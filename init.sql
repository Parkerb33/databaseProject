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

INSERT INTO users (username, email, hash, salt, role) VALUES ('user1', 'user1@gmail.com', 'abb465e061e919082d30911ad9e47f9c578a07e3d090d88091dabd422a13bfd1ec81543fa36f7dd518f16216949649c361e98a5be77646ee0be1e5efd48fab12', '20771cd6b3a2a65eb7b16001246be184', 'user');
INSERT INTO users (username, email, hash, salt, role) VALUES ('admin1', 'admin1@gmail.com', '2d2cfaf98432a4b9c8d12a9c36321675e5d588e04dca96f8211a5619d4739208f564fe959c52dc3fd389d90221cfc8c06a7b4e29818005e0daa5bdc9915b585a', '465f6c9310986b130f11a90e83dae3b7', 'admin');

-- Listings by user1 and admin1
INSERT INTO listings (username, email, phone, category, price, desci, picture) VALUES
('user1', 'user1@gmail.com', '555-1234', 'Books', 25, 'Used Calculus textbook, 7th edition', 'calc7.jpg'),
('user1', 'user1@gmail.com', '555-2345', 'Electronics', 120, 'Wireless headphones, like new', 'headphones.jpg'),
('user1', 'user1@gmail.com', NULL, 'Furniture', 60, 'Compact study desk with drawer', 'desk.jpg'),
('user1', 'user1@gmail.com', '555-9876', 'Books', 15, 'Intro to Philosophy paperback', 'philo_book.jpg'),
('user1', 'user1@gmail.com', '555-3210', 'Clothing', 35, 'Brand new winter jacket, size M', 'jacket.jpg'),

('admin1', 'admin1@gmail.com', '555-8765', 'Books', 30, 'Organic Chemistry, 8th Edition', 'ochem8.jpg'),
('admin1', 'admin1@gmail.com', '555-1122', 'Electronics', 300, 'Used iPad Pro, 64GB', 'ipad.jpg'),
('admin1', 'admin1@gmail.com', NULL, 'Appliances', 45, 'Mini fridge, works perfectly', 'fridge.jpg'),
('admin1', 'admin1@gmail.com', '555-3344', 'Books', 10, 'Old SAT prep book, 2021 version', 'sat_book.jpg'),
('admin1', 'admin1@gmail.com', '555-6677', 'Sports', 80, 'Mountain bike helmet, barely used', 'helmet.jpg');

CREATE TABLE textbook_listings AS
    SELECT * FROM listings
    WHERE category = 'Books';
    
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
