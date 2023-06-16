CREATE DATABASE restfulapi;
CREATE TABLE Users(
  user_id INT PRIMARY KEY,
  username VARCHAR(50),
  email VARCHAR(50),
  password VARCHAR(50),

);
CREATE TABLE Posts(
	post_id INT PRIMARY KEY,
	title VARCHAR(50),
	content VARCHAR(50),
	user_id INT,
	FOREIGN KEY (user_id)
	 REFERENCES Users(user_id)  ON DELETE CASCADE
);
CREATE TABLE Comments(
	comment_id INT PRIMARY KEY,
	content VARCHAR(50),
	user_id INT,
	post_id INT,
	FOREIGN KEY (user_id)
	 REFERENCES Users(user_id) ,
	FOREIGN KEY (post_id)
	 REFERENCES Posts(post_id)  ON DELETE CASCADE
);
INSERT INTO Users (user_id,username,email,password) VALUES (1,'delo','del@gmail.com','pass');