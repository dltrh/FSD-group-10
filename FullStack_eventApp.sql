-- Create and use the database
CREATE DATABASE IF NOT EXISTS EventApp;
USE EventApp;

-- User Table
CREATE TABLE User (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO User (email, password) VALUES
('alice@example.com', 'password123'),
('bob@example.com', 'securepass456'),
('charlie@example.com', 'letmein789'),
('diana@example.com', 'passw0rd'),
('eve@example.com', 'qwerty123');

-- Event Table
CREATE TABLE Event (
    eventId INT PRIMARY KEY AUTO_INCREMENT,
    organizerId INT,
    title VARCHAR(255),
    description TEXT,
    timeStart DATETIME,
    timeEnd DATETIME,
    eventType VARCHAR(100),
    eventTheme VARCHAR(100),
    budget DECIMAL(10, 2),
    location VARCHAR(255),
    maxPpl INT,
    attendeesList TEXT,
    canBring BOOLEAN,
    gifts TEXT,
    FOREIGN KEY (organizerId) REFERENCES User(id)
);

INSERT INTO Event (organizerId, title, description, timeStart, timeEnd, eventType, eventTheme, budget, location, maxPpl, attendeesList, canBring, gifts) VALUES
(1, 'Beach Picnic', 'Fun in the sun!', '2025-06-01 10:00:00', '2025-06-01 18:00:00', 'Outdoor', 'Summer Vibes', 250.00, 'Santa Monica Beach', 20, '2,3', TRUE, 'Towels, Sunglasses'),
(2, 'Board Game Night', 'Strategy and snacks!', '2025-05-10 18:00:00', '2025-05-10 22:00:00', 'Indoor', 'Geek Fun', 50.00, 'Bob\'s Place', 10, '1,4', FALSE, 'Board Games'),
(3, 'Potluck Dinner', 'Everyone brings something!', '2025-05-20 19:00:00', '2025-05-20 21:30:00', 'Indoor', 'Family Style', 0.00, 'Charlie\'s House', 15, '1,2,5', TRUE, 'Food, Drinks'),
(4, 'Coding Jam', 'Hackathon night!', '2025-06-15 17:00:00', '2025-06-16 01:00:00', 'Tech', 'Hack & Snack', 100.00, 'TechHub Room A', 30, '2,3,4', FALSE, 'Swag'),
(1, 'Worship Night', 'Sing and pray together.', '2025-07-01 19:00:00', '2025-07-01 21:00:00', 'Spiritual', 'Faith & Fellowship', 75.00, 'Community Hall', 25, '3,5', FALSE, 'Candles');

-- AttendList Table
CREATE TABLE AttendList (
    userId INT,
    eventId INT,
    PRIMARY KEY (userId, eventId),
    FOREIGN KEY (userId) REFERENCES User(id),
    FOREIGN KEY (eventId) REFERENCES Event(eventId)
);

INSERT INTO AttendList (userId, eventId) VALUES
(2, 1),
(3, 1),
(1, 2),
(4, 2),
(1, 3),
(2, 3),
(5, 3),
(2, 4),
(3, 4),
(4, 4),
(3, 5),
(5, 5);

-- OrganizeList Table
CREATE TABLE OrganizeList (
    userId INT,
    eventId INT,
    role VARCHAR(50),
    PRIMARY KEY (userId, eventId),
    FOREIGN KEY (userId) REFERENCES User(id),
    FOREIGN KEY (eventId) REFERENCES Event(eventId)
);

INSERT INTO OrganizeList (userId, eventId, role) VALUES
(1, 1, 'Host'),
(2, 2, 'Host'),
(3, 3, 'Host'),
(4, 4, 'Co-Host'),
(1, 5, 'Organizer');

-- Invitation Table
CREATE TABLE Invitation (
    inviteId INT PRIMARY KEY AUTO_INCREMENT,
    organizerId INT,
    receiverId INT,
    eventId INT,
    status VARCHAR(50),
    sentAt DATETIME,
    FOREIGN KEY (organizerId) REFERENCES User(id),
    FOREIGN KEY (receiverId) REFERENCES User(id),
    FOREIGN KEY (eventId) REFERENCES Event(eventId)
);

INSERT INTO Invitation (organizerId, receiverId, eventId, status, sentAt) VALUES
(1, 2, 1, 'Pending', '2025-04-20 14:00:00'),
(2, 1, 2, 'Accepted', '2025-04-15 09:30:00'),
(3, 5, 3, 'Declined', '2025-04-16 18:45:00'),
(4, 3, 4, 'Accepted', '2025-04-19 13:20:00'),
(1, 5, 5, 'Pending', '2025-04-21 12:00:00');

-- Notification Table
CREATE TABLE Notification (
    notiId INT PRIMARY KEY AUTO_INCREMENT,
    userId INT,
    eventId INT,
    message TEXT,
    sentAt DATETIME,
    FOREIGN KEY (userId) REFERENCES User(id),
    FOREIGN KEY (eventId) REFERENCES Event(eventId)
);

INSERT INTO Notification (userId, eventId, message, sentAt) VALUES
(2, 1, 'You have a new event invitation.', '2025-04-20 14:01:00'),
(1, 2, 'Invitation accepted by Bob.', '2025-04-15 09:35:00'),
(5, 3, 'Sorry you can’t make it.', '2025-04-16 18:50:00'),
(3, 4, 'Event starts soon!', '2025-06-15 16:00:00'),
(5, 5, 'Don’t forget Worship Night!', '2025-07-01 09:00:00');

-- Discussion Table
CREATE TABLE Discussion (
    discussId INT PRIMARY KEY AUTO_INCREMENT,
    userId INT,
    eventId INT,
    content TEXT,
    createdAt DATETIME,
    FOREIGN KEY (userId) REFERENCES User(id),
    FOREIGN KEY (eventId) REFERENCES Event(eventId)
);

INSERT INTO Discussion (userId, eventId, content, createdAt) VALUES
(2, 1, 'What should we bring for the picnic?', '2025-04-21 10:00:00'),
(1, 2, 'Can I bring a friend?', '2025-04-21 11:00:00'),
(5, 3, 'Any vegetarian options?', '2025-04-21 12:00:00'),
(3, 4, 'Will there be WiFi?', '2025-04-21 13:00:00'),
(4, 5, 'Can we carpool?', '2025-04-21 14:00:00');

-- QuestionThread Table
CREATE TABLE QuestionThread (
    id INT PRIMARY KEY AUTO_INCREMENT,
    discussId INT,
    questionContent TEXT,
    FOREIGN KEY (discussId) REFERENCES Discussion(discussId)
);

INSERT INTO QuestionThread (discussId, questionContent) VALUES
(1, 'Can we bring snacks too?'),
(2, 'Is it okay to bring +1?'),
(3, 'Do we need to bring our own plates?'),
(4, 'Is the code editor provided?'),
(5, 'Where’s the meeting point?');

-- Replies Table
CREATE TABLE Replies (
    id INT PRIMARY KEY AUTO_INCREMENT,
    questionId INT,
    repContent TEXT,
    createdAt DATETIME,
    FOREIGN KEY (questionId) REFERENCES QuestionThread(id)
);

INSERT INTO Replies (questionId, repContent, createdAt) VALUES
(1, 'Yes, snacks are welcome!', '2025-04-21 10:30:00'),
(2, 'Sure! Just let us know.', '2025-04-21 11:30:00'),
(3, 'Yes, we’ll provide plates.', '2025-04-21 12:30:00'),
(4, 'No, please bring your own setup.', '2025-04-21 13:30:00'),
(5, 'Main entrance of the hall.', '2025-04-21 14:30:00');
