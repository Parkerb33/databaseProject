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
    username VARCHAR(100) NOT NULL, --listing title not actually username
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NULL, 
    category VARCHAR(255),
    price INT, 
    desci VARCHAR(255) NULL, 
    picture VARCHAR(255) NULL
);

INSERT INTO users (username, email, hash, salt, role) VALUES ('user1', 'user1@gmail.com', 'abb465e061e919082d30911ad9e47f9c578a07e3d090d88091dabd422a13bfd1ec81543fa36f7dd518f16216949649c361e98a5be77646ee0be1e5efd48fab12', '20771cd6b3a2a65eb7b16001246be184', 'user');
INSERT INTO users (username, email, hash, salt, role) VALUES ('admin1', 'admin1@gmail.com', '2d2cfaf98432a4b9c8d12a9c36321675e5d588e04dca96f8211a5619d4739208f564fe959c52dc3fd389d90221cfc8c06a7b4e29818005e0daa5bdc9915b585a', '465f6c9310986b130f11a90e83dae3b7', 'admin');

-- Listings by user1
INSERT INTO listings (username, email, phone, category, price, desci, picture) VALUES
('Calc Book', 'user1@gmail.com', '555-0001', 'Books', 25, 'Used Calculus textbook, 7th edition', 'calc7.jpg'),
('Blue Airpod Max', 'user1@gmail.com', '555-0001', 'Electronics', 120, 'Wireless headphones, like new', 'headphones.jpg'),
('Lamp', 'user1@gmail.com', '555-0001', 'Furniture', 60, 'Compact study lamp with charger', 'desk.jpg'),
('Philosophy Book', 'user1@gmail.com', '555-0001', 'Books', 15, 'Intro to Philosophy paperback', 'philo_book.jpg'),
('Northface Jacket', 'user1@gmail.com', '555-0001', 'Clothing', 35, 'Brand new winter jacket, size M', 'jacket.jpg'),
('Gaming Chair', 'user1@gmail.com', '555-0001', 'Furniture', 150, 'Ergonomic gaming chair, black and red', 'chair.jpg'),
('TI-84 Calculator', 'user1@gmail.com', '555-0001', 'Electronics', 45, 'Graphing calculator, good condition', 'calculator.jpg'),
('Econ Textbook', 'user1@gmail.com', '555-0001', 'Books', 20, 'Microeconomics, 5th edition', 'econ_book.jpg'),
('Nike Sneakers', 'user1@gmail.com', '555-0001', 'Clothing', 55, 'Size 10, barely worn', 'sneakers.jpg'),
('Blender', 'user1@gmail.com', '555-0001', 'Appliances', 25, 'Small kitchen blender, 3-speed', 'blender.jpg');

-- Listings by admin1 
INSERT INTO listings (username, email, phone, category, price, desci, picture) VALUES
('Chem Book', 'admin1@gmail.com', '555-0002', 'Books', 30, 'Organic Chemistry, 8th Edition', 'ochem8.jpg'),
('Ipad', 'admin1@gmail.com', '555-0002', 'Electronics', 300, 'Used iPad Pro, 64GB', 'ipad.jpg'),
('Mini Fridge', 'admin1@gmail.com', '555-0002', 'Appliances', 45, 'Mini fridge with freezer, works perfectly', 'fridge.jpg'),
('SAT Prep Book', 'admin1@gmail.com', '555-0002', 'Books', 10, 'Old SAT prep book, 2021 version', 'sat_book.jpg'),
('Helmet', 'admin1@gmail.com', '555-0002', 'Sports', 80, 'Mountain bike helmet, barely used', 'helmet.jpg'),
('Desk Organizer', 'admin1@gmail.com', '555-0002', 'Furniture', 10, 'Desk tray set, black mesh', 'organizer.jpg'),
('Hiking Boots', 'admin1@gmail.com', '555-0002', 'Clothing', 40, 'Waterproof boots, size 9', 'boots.jpg'),
('Stats Book', 'admin1@gmail.com', '555-0002', 'Books', 18, 'Statistics for Life Sciences, 4th ed.', 'stats_book.jpg'),
('Smartwatch', 'admin1@gmail.com', '555-0002', 'Electronics', 85, 'Fitness tracker with heart monitor', 'watch.jpg'),
('Air Purifier', 'admin1@gmail.com', '555-0002', 'Appliances', 70, 'HEPA filter purifier, for small rooms', 'purifier.jpg');




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
