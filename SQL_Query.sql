CREATE TABLE courses (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    price DECIMAL(10, 2),
    duration INT,
    number_of_students INT,
    description TEXT,
    type VARCHAR(255),
    photo VARCHAR(255)
);

INSERT INTO courses (id, name, price, duration, number_of_students, description, type, photo)
VALUES
(1, 'NodeJS & ExpressJS', 100000, 2, 30, 'Express.js là một framework Node.js giúp phát triển ứng dụng web và API dễ dàng hơn.', 'Backend', 'https://i.ytimg.com/vi/Oe421EPjeBE/maxresdefault.jpg'),
(2, 'ReactJS', 80000, 3, 25, 'React là một thư viện JavaScript để xây dựng giao diện người dùng. Nó giúp tạo ra các giao diện tương tác dễ dàng với kiến trúc dựa trên thành phần.', 'Frontend', 'https://s3-sgn09.fptcloud.com/codelearnstorage/Upload/Blog/react-js-co-ban-phan-1-63738082145.3856.jpg'),
(3, 'Angular', 90000, 4, 20, 'Angular là một nền tảng để xây dựng ứng dụng web di động và desktop. Nó cung cấp một khung toàn diện với các công cụ mạnh mẽ cho các ứng dụng phức tạp.', 'Frontend', 'https://d585tldpucybw.cloudfront.net/sfimages/default-source/blogs/2023/2023-11/angular-logo-1200-628.png?sfvrsn=bf64b1ee_3'),
(4, 'VueJS', 75000, 3, 22, 'Vue.js là một framework JavaScript tiến bộ được sử dụng để xây dựng giao diện người dùng và các ứng dụng một trang.', 'Frontend', 'https://mevn-public.s3-ap-southeast-1.amazonaws.com/marketenterprise.vn/wp-images/2021/04/06170614/vuejs.png'),
(5, 'Django', 95000, 5, 18, 'Django là một framework web Python cấp cao khuyến khích phát triển nhanh và thiết kế sạch, thực dụng.', 'Backend', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9XeELcp51xMR6GcbG86ssM_CLpG0QqiN9dw&s'),
(6, 'Flask', 70000, 2, 20, 'Flask là một framework web vi mô được viết bằng Python. Nó được thiết kế để bắt đầu nhanh chóng và dễ dàng, với khả năng mở rộng đến các ứng dụng phức tạp.', 'Backend', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXXz9sK7EvyDicWnQ60W9RMFSzzZ0nReybQw&s'),
(7, 'Spring Boot', 110000, 6, 15, 'Spring Boot giúp dễ dàng tạo ra các ứng dụng Spring độc lập, chất lượng sản xuất mà bạn có thể "chỉ cần chạy".', 'Backend', 'https://photo2.tinhte.vn/data/attachment-files/2021/04/5423466_Spring_Boot_la_gi_2.png'),
(8, 'Ruby on Rails', 100000, 4, 17, 'Rails là một framework toàn diện để phát triển các ứng dụng web dựa trên cơ sở dữ liệu theo mô hình Model-View-Controller (MVC).', 'Backend', 'https://upload.wikimedia.org/wikipedia/commons/6/62/Ruby_On_Rails_Logo.svg'),
(9, 'Laravel', 85000, 4, 23, 'Laravel là một framework ứng dụng web với cú pháp diễn đạt và thanh lịch. Nó nhằm làm cho quá trình phát triển trở nên thú vị cho nhà phát triển.', 'Backend', 'https://picperf.io/https://laravelnews.s3.amazonaws.com/images/laravel-featured.png'),
(10, 'ASP.NET Core', 105000, 5, 16, 'ASP.NET Core là một framework đa nền tảng, hiệu suất cao để xây dựng các ứng dụng hiện đại, dựa trên đám mây và kết nối Internet.', 'Backend', 'https://imic.edu.vn/Contents/images/news/khoa-hoc-lap-trinh-hoc-asp-net-core-tai-imic.png'),
(11, 'Flutter', 90000, 3, 21, 'Flutter là một bộ công cụ phát triển phần mềm giao diện người dùng mã nguồn mở do Google tạo ra. Nó được sử dụng để phát triển các ứng dụng đa nền tảng.', 'Mobile', 'https://api.reliasoftware.com/uploads/what_is_flutter_fcb6c7a4b8.png'),
(12, 'React Native', 95000, 3, 19, 'React Native là một framework ứng dụng di động mã nguồn mở do Facebook tạo ra. Nó được sử dụng để phát triển các ứng dụng cho Android, iOS và các nền tảng khác.', 'Mobile', 'https://images.ctfassets.net/aq13lwl6616q/2gqVi4hhjq9vgvdh63UoKZ/c763c6f7e98a80eb2800bbe5eb9d690d/react_native_zero_to_mastery.png'),
(13, 'Swift', 85000, 4, 20, 'Swift là một ngôn ngữ lập trình mạnh mẽ và trực quan cho macOS, iOS, watchOS và tvOS.', 'Mobile', 'https://www.fullsail.edu/assets/ext/share/mobile-development-degree-an-early-adopter-of-apples-swift-programming-language-hero.jpg'),
(14, 'Kotlin', 90000, 4, 18, 'Kotlin là một ngôn ngữ lập trình tĩnh dành cho các ứng dụng đa nền tảng hiện đại.', 'Mobile', 'https://topdev.vn/blog/wp-content/uploads/2023/05/kotlin-la-gi-1.png'),
(15, 'Unity', 95000, 6, 14, 'Unity là một engine game đa nền tảng được sử dụng để phát triển các trò chơi video cho PC, console, thiết bị di động và trang web.', 'Game Development', 'https://cdn.geekwire.com/wp-content/uploads/2023/09/09-2023_Blog_Hero-image_Penguin_Option-3-1230x410-1.jpeg'),
(16, 'Unreal Engine', 100000, 6, 12, 'Unreal Engine là một bộ công cụ phát triển hoàn chỉnh dành cho bất kỳ ai làm việc với công nghệ thời gian thực.', 'Game Development', 'https://bairesdev.mo.cloudinary.net/blog/2022/08/ue-logo-1400x788-1400x788-8f185e1e3635-1.jpg?tx=w_1920,q_auto'),
(17, 'TensorFlow', 120000, 5, 10, 'TensorFlow là một nền tảng mã nguồn mở từ đầu đến cuối cho học máy.', 'Data Science', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEsqbuvRgmIsxTT1R_bCdv8txFKkw2ylx5Lg&s'),
(18, 'PyTorch', 115000, 5, 11, 'PyTorch là một thư viện học máy mã nguồn mở dựa trên thư viện Torch.', 'Data Science', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmkiVt1AvK6s2mToxnmLk_kcp10WU3l03iGg&s'),
(19, 'Hadoop', 130000, 7, 8, 'Hadoop là một framework phần mềm mã nguồn mở để lưu trữ dữ liệu và chạy các ứng dụng trên các cụm phần cứng hàng hóa.', 'Big Data', 'https://topdev.vn/blog/wp-content/uploads/2019/06/Hadoop.jpg'),
(20, 'Spark', 125000, 6, 9, 'Apache Spark là một engine phân tích hợp nhất mã nguồn mở để xử lý dữ liệu lớn.', 'Big Data', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk8KLrz1OYfFRDTNayIdRwdanvCy0_Jk8ajg&s'),
(21, 'Docker', 105000, 3, 20, 'Docker là một tập hợp các sản phẩm nền tảng như một dịch vụ sử dụng ảo hóa cấp hệ điều hành để phân phối phần mềm trong các gói gọi là container.', 'DevOps', 'https://logos-world.net/wp-content/uploads/2021/02/Docker-Logo.png');