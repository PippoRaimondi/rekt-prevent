CREATE SEQUENCE user_id_seq;
CREATE SEQUENCE token_id_seq;
CREATE SEQUENCE portfolio_id_seq;

CREATE TABLE "user" (
  id INT DEFAULT nextval('user_id_seq') PRIMARY KEY,
  full_name VARCHAR ( 255 ) NOT NULL,
  email VARCHAR ( 255 ) NOT NULL,
  pass VARCHAR ( 255 ) NOT NULL,
  app_token VARCHAR ( 255 ) NOT NULL
);

CREATE TABLE "Token" (
  id INT DEFAULT nextval('token_id_seq') PRIMARY KEY,
  token_desc VARCHAR ( 50 ) NOT NULL,
  chain VARCHAR ( 50 ) NOT NULL,
  initial_price FLOAT NOT NULL
);

CREATE TABLE portfolio (
  id INT DEFAULT nextval('portfolio_id_seq') PRIMARY KEY,
  name VARCHAR ( 255 ) NOT NULL,
  FOREIGN KEY (user_id)
      REFERENCES "User" (id),
);

CREATE TABLE tokenstatus (
  updated_date DATETIME NOT NULL,
  current_price FLOAT NOT NULL,
  FOREIGN KEY (token_id)
      REFERENCES "Token" (id),
);

CREATE TABLE portfoliotoken (
  FOREIGN KEY (token_id)
      REFERENCES token (id),
  FOREIGN KEY (portfolio_id)
      REFERENCES portfolio (id),      
);
