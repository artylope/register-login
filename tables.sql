CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    password TEXT,
	  created_at DATE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS recipes (
    id SERIAL PRIMARY KEY,
    title TEXT,
    instructions TEXT,
    user_id INTEGER,
	  created_at DATE DEFAULT now()
);
