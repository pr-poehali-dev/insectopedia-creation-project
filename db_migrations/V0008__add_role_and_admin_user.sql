ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'user';

INSERT INTO users (email, username, password_hash, full_name, role) 
VALUES ('andreiperelitza@gmail.com', 'admin', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'Андрей Перелица', 'admin')
ON CONFLICT (email) DO UPDATE SET role = 'admin';