-- Create the 'user' table
CREATE TABLE `user` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL
);

-- Create the 'cart' table
CREATE TABLE `cart` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL,
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
);

-- Create the 'token' table
CREATE TABLE `token` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `token` VARCHAR(255) NOT NULL,
    `user_id` BIGINT NOT NULL,
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
);

-- Insert sample users
INSERT INTO `user` (`username`, `password`) VALUES
('user1', '$2a$10$EIX/ZgUuyz.f0uJflx1O0Oo2VO0kIQbMGFF6c45w7.qCmQyMUp4Uu'), -- password: password123
('user2', '$2a$10$EIX/ZgUuyz.f0uJflx1O0Oo2VO0kIQbMGFF6c45w7.qCmQyMUp4Uu'); -- password: password123

-- Insert sample cart data
INSERT INTO `cart` (`user_id`) VALUES
(1),
(2);

-- Insert sample token data
INSERT INTO `token` (`token`, `user_id`) VALUES
('sampleToken1', 1),
('sampleToken2', 2);
