CREATE TABLE category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES category(id)
);

CREATE TABLE variant_courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    price DECIMAL(10, 2) NOT NULL,
    duration INT NOT NULL,
    number_of_students INT NOT NULL,
    type VARCHAR(255) NOT NULL,
    photo VARCHAR(255),
    courses_id INT,
    FOREIGN KEY (courses_id) REFERENCES courses(id)
);

INSERT INTO category (id, name, description)
VALUES
(1, 'NodeJS & ExpressJS', 'Các khóa học về Node.js và Express.js cho phát triển backend, bao gồm xây dựng ứng dụng web và API.'),
(2, 'ReactJS', 'Các khóa học về React cho phát triển frontend, tập trung vào việc tạo giao diện người dùng tương tác bằng cách sử dụng các thành phần.'),
(3, 'Angular', 'Các khóa học về Angular cho phát triển frontend, bao gồm xây dựng ứng dụng web động với một framework toàn diện.'),
(4, 'VueJS', 'Các khóa học về Vue.js cho phát triển frontend, tập trung vào việc xây dựng giao diện người dùng và ứng dụng một trang với framework dễ tiếp cận.'),
(5, 'Django', 'Các khóa học về Django cho phát triển backend bằng Python, nhấn mạnh vào việc phát triển nhanh và thiết kế sạch.'),
(6, 'Flask', 'Các khóa học về Flask cho phát triển backend với Python, nổi bật với sự đơn giản và linh hoạt trong việc xây dựng ứng dụng web.'),
(7, 'Spring Boot', 'Các khóa học về Spring Boot cho phát triển backend với Java, tập trung vào việc tạo ứng dụng sẵn sàng sản xuất một cách dễ dàng.'),
(8, 'Ruby on Rails', 'Các khóa học về Ruby on Rails cho phát triển backend, bao gồm một framework toàn diện để xây dựng ứng dụng web dựa trên cơ sở dữ liệu.'),
(9, 'Laravel', 'Các khóa học về Laravel cho phát triển backend với PHP, nhấn mạnh vào cú pháp thanh lịch và các công cụ thân thiện với nhà phát triển.'),
(10, 'ASP.NET Core', 'Các khóa học về ASP.NET Core cho việc xây dựng ứng dụng web đa nền tảng với hiệu suất cao và các tính năng hiện đại.'),
(11, 'Flutter', 'Các khóa học về Flutter cho phát triển ứng dụng natively compiled cho di động, web và desktop từ một mã nguồn duy nhất.'),
(12, 'React Native', 'Các khóa học về React Native cho việc xây dựng ứng dụng di động bằng JavaScript, cho phép phát triển đa nền tảng.'),
(13, 'Swift', 'Các khóa học về Swift cho phát triển ứng dụng iOS và macOS, tập trung vào việc tạo ứng dụng hiệu suất cao cho các nền tảng của Apple.'),
(14, 'Kotlin', 'Các khóa học về Kotlin cho phát triển Android, cung cấp một ngôn ngữ lập trình hiện đại cho việc xây dựng ứng dụng di động.'),
(15, 'Unity', 'Các khóa học về Unity cho phát triển game, cung cấp công cụ để tạo ra các trò chơi hấp dẫn trên nhiều nền tảng.'),
(16, 'Unreal Engine', 'Các khóa học về Unreal Engine cho phát triển game, tập trung vào đồ họa chất lượng cao và cơ chế game phức tạp.'),
(17, 'TensorFlow', 'Các khóa học về TensorFlow cho học máy, cung cấp công cụ để xây dựng và đào tạo các mạng nơ-ron.'),
(18, 'PyTorch', 'Các khóa học về PyTorch cho học sâu, tập trung vào việc xây dựng và đào tạo các mạng nơ-ron với một framework linh hoạt.'),
(19, 'Hadoop', 'Các khóa học về Hadoop cho big data, bao gồm lưu trữ và xử lý dữ liệu phân tán với các cụm phần cứng.'),
(20, 'Spark', 'Các khóa học về Apache Spark cho xử lý big data, tập trung vào việc phân tích dữ liệu lớn với tốc độ nhanh và bộ nhớ trong.'),
(21, 'Docker', 'Các khóa học về Docker cho container hóa, cho phép đóng gói và triển khai ứng dụng trong các môi trường cô lập.');

INSERT INTO courses (id, name, category_id)
VALUES
(1, 'NodeJS & ExpressJS', 1),
(2, 'ReactJS', 2),
(3, 'Angular', 3),
(4, 'VueJS', 4),
(5, 'Django', 5),
(6, 'Flask', 6),
(7, 'Spring Boot', 7),
(8, 'Ruby on Rails', 8),
(9, 'Laravel', 9),
(10, 'ASP.NET Core', 10),
(11, 'Flutter', 11),
(12, 'React Native', 12),
(13, 'Swift', 13),
(14, 'Kotlin', 14),
(15, 'Unity', 15),
(16, 'Unreal Engine', 16),
(17, 'TensorFlow', 17),
(18, 'PyTorch', 18),
(19, 'Hadoop', 19),
(20, 'Spark', 20),
(21, 'Docker', 21);

INSERT INTO variant_courses (id, price, duration, number_of_students, type, photo, courses_id)
VALUES
(1, 100000, 2, 30, 'Backend', 'https://i.ytimg.com/vi/Oe421EPjeBE/maxresdefault.jpg', 1),
(2, 80000, 3, 25, 'Frontend', 'https://s3-sgn09.fptcloud.com/codelearnstorage/Upload/Blog/react-js-co-ban-phan-1-63738082145.3856.jpg', 2),
(3, 90000, 4, 20, 'Frontend', 'https://d585tldpucybw.cloudfront.net/sfimages/default-source/blogs/2023/2023-11/angular-logo-1200-628.png?sfvrsn=bf64b1ee_3', 3),
(4, 75000, 3, 22, 'Frontend', 'https://mevn-public.s3-ap-southeast-1.amazonaws.com/marketenterprise.vn/wp-images/2021/04/06170614/vuejs.png', 4),
(5, 95000, 5, 18, 'Backend', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9XeELcp51xMR6GcbG86ssM_CLpG0QqiN9dw&s', 5),
(6, 70000, 2, 20, 'Backend', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXXz9sK7EvyDicWnQ60W9RMFSzzZ0nReybQw&s', 6),
(7, 110000, 6, 15, 'Backend', 'https://photo2.tinhte.vn/data/attachment-files/2021/04/5423466_Spring_Boot_la_gi_2.png', 7),
(8, 100000, 4, 17, 'Backend', 'https://upload.wikimedia.org/wikipedia/commons/6/62/Ruby_On_Rails_Logo.svg', 8),
(9, 85000, 4, 23, 'Backend', 'https://picperf.io/https://laravelnews.s3.amazonaws.com/images/laravel-featured.png', 9),
(10, 105000, 5, 16, 'Backend', 'https://imic.edu.vn/Contents/images/news/khoa-hoc-lap-trinh-hoc-asp-net-core-tai-imic.png', 10),
(11, 90000, 3, 21, 'Mobile', 'https://api.reliasoftware.com/uploads/what_is_flutter_fcb6c7a4b8.png', 11),
(12, 95000, 3, 19, 'Mobile', 'https://images.ctfassets.net/aq13lwl6616q/2gqVi4hhjq9vgvdh63UoKZ/c763c6f7e98a80eb2800bbe5eb9d690d/react_native_zero_to_mastery.png', 12),
(13, 85000, 4, 20, 'Mobile', 'https://www.fullsail.edu/assets/ext/share/mobile-development-degree-an-early-adopter-of-apples-swift-programming-language-hero.jpg', 13),
(14, 90000, 4, 18, 'Mobile', 'https://topdev.vn/blog/wp-content/uploads/2023/05/kotlin-la-gi-1.png', 14),
(15, 95000, 6, 14, 'Game Development', 'https://cdn.geekwire.com/wp-content/uploads/2023/09/09-2023_Blog_Hero-image_Penguin_Option-3-1230x410-1.jpeg', 15),
(16, 100000, 6, 12, 'Game Development', 'https://bairesdev.mo.cloudinary.net/blog/2022/08/ue-logo-1400x788-1400x788-8f185e1e3635-1.jpg?tx=w_1920,q_auto', 16),
(17, 120000, 5, 10, 'Data Science', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEsqbuvRgmIsxTT1R_bCdv8txFKkw2ylx5Lg&s', 17),
(18, 115000, 5, 11, 'Data Science', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmkiVt1AvK6s2mToxnmLk_kcp10WU3l03iGg&s', 18),
(19, 130000, 7, 8, 'Big Data', 'https://topdev.vn/blog/wp-content/uploads/2019/06/Hadoop.jpg', 19),
(20, 125000, 6, 9, 'Big Data', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk8KLrz1OYfFRDTNayIdRwdanvCy0_Jk8ajg&s', 20),
(21, 105000, 3, 20, 'DevOps', 'https://logos-world.net/wp-content/uploads/2021/02/Docker-Logo.png', 21);