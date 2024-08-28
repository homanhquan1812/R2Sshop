-- Users' Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phonenumber VARCHAR(20),
    cart JSONB DEFAULT '{"totalPrice": 0, "items": []}',  -- Default value as JSON
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admins' Table
CREATE TABLE admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phonenumber VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Course Tables
CREATE TABLE category (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(100) NOT NULL
);

CREATE TABLE course_info (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    photo VARCHAR(255),
    category_id UUID,
    FOREIGN KEY (category_id) REFERENCES category(id)
);

CREATE TABLE r2s_course (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    price DECIMAL(10, 2) NOT NULL,
    duration INT NOT NULL,
    number_of_students INT NOT NULL,
    course_id UUID,
    FOREIGN KEY (course_id) REFERENCES course_info(id)
);

WITH inserted_categories AS (
    INSERT INTO category (type)
    VALUES
    ('Backend'),
    ('Frontend'),
    ('Mobile'),
    ('Game Development'),
    ('Data Science'),
    ('Big Data'),
    ('DevOps')
    RETURNING id, type
)

INSERT INTO course_info (name, description, photo, category_id)
SELECT 
    c.name, 
    c.description, 
    c.photo, 
    ic.id
FROM (VALUES
    ('NodeJS & ExpressJS', 'Các khóa học về Node.js và Express.js cho phát triển backend, bao gồm xây dựng ứng dụng web và API.', 'https://i.ytimg.com/vi/Oe421EPjeBE/maxresdefault.jpg', 'Backend'),
    ('ReactJS', 'Các khóa học về React cho phát triển frontend, tập trung vào việc tạo giao diện người dùng tương tác bằng cách sử dụng các thành phần.', 'https://s3-sgn09.fptcloud.com/codelearnstorage/Upload/Blog/react-js-co-ban-phan-1-63738082145.3856.jpg', 'Frontend'),
    ('Angular', 'Các khóa học về Angular cho phát triển frontend, bao gồm xây dựng ứng dụng web động với một framework toàn diện.', 'https://d585tldpucybw.cloudfront.net/sfimages/default-source/blogs/2023/2023-11/angular-logo-1200-628.png?sfvrsn=bf64b1ee_3', 'Frontend'),
    ('VueJS', 'Các khóa học về Vue.js cho phát triển frontend, tập trung vào việc xây dựng giao diện người dùng và ứng dụng một trang với framework dễ tiếp cận.', 'https://mevn-public.s3-ap-southeast-1.amazonaws.com/marketenterprise.vn/wp-images/2021/04/06170614/vuejs.png', 'Frontend'),
    ('Django', 'Các khóa học về Django cho phát triển backend bằng Python, nhấn mạnh vào việc phát triển nhanh và thiết kế sạch.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9XeELcp51xMR6GcbG86ssM_CLpG0QqiN9dw&s', 'Backend'),
    ('Flask', 'Các khóa học về Flask cho phát triển backend với Python, nổi bật với sự đơn giản và linh hoạt trong việc xây dựng ứng dụng web.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXXz9sK7EvyDicWnQ60W9RMFSzzZ0nReybQw&s', 'Backend'),
    ('Spring Boot', 'Các khóa học về Spring Boot cho phát triển backend với Java, tập trung vào việc tạo ứng dụng sẵn sàng sản xuất một cách dễ dàng.', 'https://photo2.tinhte.vn/data/attachment-files/2021/04/5423466_Spring_Boot_la_gi_2.png', 'Backend'),
    ('Ruby on Rails', 'Các khóa học về Ruby on Rails cho phát triển backend, bao gồm một framework toàn diện để xây dựng ứng dụng web dựa trên cơ sở dữ liệu.', 'https://upload.wikimedia.org/wikipedia/commons/6/62/Ruby_On_Rails_Logo.svg', 'Backend'),
    ('Laravel', 'Các khóa học về Laravel cho phát triển backend với PHP, nhấn mạnh vào cú pháp thanh lịch và các công cụ thân thiện với nhà phát triển.', 'https://picperf.io/https://laravelnews.s3.amazonaws.com/images/laravel-featured.png', 'Backend'),
    ('ASP.NET Core', 'Các khóa học về ASP.NET Core cho việc xây dựng ứng dụng web đa nền tảng với hiệu suất cao và các tính năng hiện đại.', 'https://imic.edu.vn/Contents/images/news/khoa-hoc-lap-trinh-hoc-asp-net-core-tai-imic.png', 'Backend'),
    ('Flutter', 'Các khóa học về Flutter cho phát triển ứng dụng natively compiled cho di động, web và desktop từ một mã nguồn duy nhất.', 'https://api.reliasoftware.com/uploads/what_is_flutter_fcb6c7a4b8.png', 'Mobile'),
    ('React Native', 'Các khóa học về React Native cho việc xây dựng ứng dụng di động bằng JavaScript, cho phép phát triển đa nền tảng.', 'https://images.ctfassets.net/aq13lwl6616q/2gqVi4hhjq9vgvdh63UoKZ/c763c6f7e98a80eb2800bbe5eb9d690d/react_native_zero_to_mastery.png', 'Mobile'),
    ('Swift', 'Các khóa học về Swift cho phát triển ứng dụng iOS và macOS, tập trung vào việc tạo ứng dụng hiệu suất cao cho các nền tảng của Apple.', 'https://www.fullsail.edu/assets/ext/share/mobile-development-degree-an-early-adopter-of-apples-swift-programming-language-hero.jpg', 'Mobile'),
    ('Kotlin', 'Các khóa học về Kotlin cho phát triển Android, cung cấp một ngôn ngữ lập trình hiện đại cho việc xây dựng ứng dụng di động.', 'https://topdev.vn/blog/wp-content/uploads/2023/05/kotlin-la-gi-1.png', 'Mobile'),
    ('Unity', 'Các khóa học về Unity cho phát triển game, cung cấp công cụ để tạo ra các trò chơi hấp dẫn trên nhiều nền tảng.', 'https://cdn.geekwire.com/wp-content/uploads/2023/09/09-2023_Blog_Hero-image_Penguin_Option-3-1230x410-1.jpeg', 'Game Development'),
    ('Unreal Engine', 'Các khóa học về Unreal Engine cho phát triển game, tập trung vào đồ họa chất lượng cao và cơ chế game phức tạp.', 'https://bairesdev.mo.cloudinary.net/blog/2022/08/ue-logo-1400x788-1400x788-8f185e1e3635-1.jpg?tx=w_1920,q_auto', 'Game Development'),
    ('TensorFlow', 'Các khóa học về TensorFlow cho học máy, cung cấp công cụ để xây dựng và đào tạo các mạng nơ-ron.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEsqbuvRgmIsxTT1R_bCdv8txFKkw2ylx5Lg&s', 'Data Science'),
    ('PyTorch', 'Các khóa học về PyTorch cho học sâu, tập trung vào việc xây dựng và đào tạo các mạng nơ-ron với một framework linh hoạt.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmkiVt1AvK6s2mToxnmLk_kcp10WU3l03iGg&s', 'Data Science'),
    ('Hadoop', 'Các khóa học về Hadoop cho big data, bao gồm lưu trữ và xử lý dữ liệu phân tán với các cụm phần cứng.', 'https://topdev.vn/blog/wp-content/uploads/2019/06/Hadoop.jpg', 'Big Data'),
    ('Spark', 'Các khóa học về Apache Spark cho xử lý big data, tập trung vào việc phân tích dữ liệu lớn với tốc độ nhanh và bộ nhớ trong.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk8KLrz1OYfFRDTNayIdRwdanvCy0_Jk8ajg&s', 'Big Data'),
    ('Docker', 'Các khóa học về Docker cho container hóa, cho phép đóng gói và triển khai ứng dụng trong các môi trường cô lập.', 'https://logos-world.net/wp-content/uploads/2021/02/Docker-Logo.png', 'DevOps')
) AS c(name, description, photo, category_type)
JOIN inserted_categories ic ON ic.type = c.category_type;

WITH course_ids AS (
    SELECT id, name FROM course_info
)

INSERT INTO r2s_course (price, duration, number_of_students, course_id)
SELECT 
    v.price, v.duration, v.number_of_students, c.id
FROM (VALUES
    (100000, 2, 30, 'NodeJS & ExpressJS'),
    (80000, 3, 25, 'ReactJS'),
    (90000, 4, 20, 'Angular'),
    (75000, 3, 22, 'VueJS'),
    (95000, 5, 18, 'Django'),
    (70000, 2, 20, 'Flask'),
    (110000, 6, 15, 'Spring Boot'),
    (100000, 4, 17, 'Ruby on Rails'),
    (85000, 4, 23, 'Laravel'),
    (105000, 5, 16, 'ASP.NET Core'),
    (90000, 3, 21, 'Flutter'),
    (95000, 3, 19, 'React Native'),
    (85000, 4, 20, 'Swift'),
    (90000, 4, 18, 'Kotlin'),
    (95000, 6, 14, 'Unity'),
    (100000, 6, 12, 'Unreal Engine'),
    (120000, 5, 10, 'TensorFlow'),
    (115000, 5, 11, 'PyTorch'),
    (130000, 7, 8, 'Hadoop'),
    (125000, 6, 9, 'Spark'),
    (105000, 3, 20, 'Docker')
) AS v(price, duration, number_of_students, course_name)
JOIN course_ids c ON c.name = v.course_name;

-- Users' Orders Table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phonenumber VARCHAR(20),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    cart JSONB DEFAULT '{"totalPrice": 0, "items": []}',  -- Default value as JSON
    status BOOLEAN DEFAULT FALSE,  -- Added status column with default value
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);