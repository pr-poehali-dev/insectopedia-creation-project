-- Таблица пользователей
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

-- Таблица отрядов насекомых
CREATE TABLE insect_orders (
    id SERIAL PRIMARY KEY,
    name_ru VARCHAR(255) NOT NULL,
    name_latin VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT
);

-- Таблица насекомых
CREATE TABLE insects (
    id SERIAL PRIMARY KEY,
    name_ru VARCHAR(255) NOT NULL,
    name_latin VARCHAR(255) NOT NULL,
    order_id INTEGER REFERENCES insect_orders(id),
    description TEXT,
    habitat TEXT,
    size_mm VARCHAR(100),
    lifespan VARCHAR(100),
    diet TEXT,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    views INTEGER DEFAULT 0
);

-- Таблица сообщений обратной связи
CREATE TABLE contact_messages (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT false
);

-- Вставка начальных данных отрядов
INSERT INTO insect_orders (name_ru, name_latin, description, image_url) VALUES
('Жесткокрылые', 'Coleoptera', 'Самый многочисленный отряд насекомых, включающий жуков и их личинок', ''),
('Чешуекрылые', 'Lepidoptera', 'Бабочки и мотыльки с чешуйчатыми крыльями', ''),
('Перепончатокрылые', 'Hymenoptera', 'Пчёлы, осы, муравьи и шмели', ''),
('Двукрылые', 'Diptera', 'Мухи, комары и мошки с одной парой крыльев', ''),
('Прямокрылые', 'Orthoptera', 'Кузнечики, сверчки и саранча', '');

-- Вставка примеров насекомых
INSERT INTO insects (name_ru, name_latin, order_id, description, habitat, size_mm, lifespan, diet, image_url) VALUES
('Майский жук', 'Melolontha melolontha', 1, 'Крупный жук с характерным коричневым окрасом, активен в мае', 'Леса, парки, сады', '20-30', '5-7 недель', 'Личинки питаются корнями, взрослые - листьями', ''),
('Божья коровка', 'Coccinellidae', 1, 'Небольшой яркий жук, полезный хищник тли', 'Поля, сады, луга', '4-10', '1-2 года', 'Тля и мелкие насекомые', ''),
('Монарх', 'Danaus plexippus', 2, 'Знаменитая бабочка с оранжево-черными крыльями, совершает дальние миграции', 'Луга, поля с молочаем', 'Размах 90-100', '2-6 недель', 'Нектар цветов', ''),
('Медоносная пчела', 'Apis mellifera', 3, 'Общественное насекомое, производит мед и опыляет растения', 'Ульи, цветущие растения', '12-15', 'Рабочие 6 недель', 'Нектар и пыльца', ''),
('Обыкновенный комар', 'Culex pipiens', 4, 'Распространенный кровососущий вид', 'Вблизи водоемов', '3-7', '2-4 недели', 'Кровь (самки), нектар (самцы)', '');
