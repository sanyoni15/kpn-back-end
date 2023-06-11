-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 11, 2023 at 03:03 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kpn_practical`
--

-- --------------------------------------------------------

--
-- Table structure for table `testimonial`
--

CREATE TABLE `testimonial` (
  `id` int(11) NOT NULL,
  `photo` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `post` enum('CEO','FirstPrinciples') NOT NULL DEFAULT 'CEO',
  `description` varchar(255) NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT 1,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `testimonial`
--

INSERT INTO `testimonial` (`id`, `photo`, `name`, `post`, `description`, `active`, `created_at`, `updated_at`) VALUES
(1, 'car1.jpg', 'test4', 'CEO', 'test1', 0, '2023-06-10 10:26:59.376418', '2023-06-11 13:02:56.347425'),
(2, 'car2.jpg', 'Car2', 'CEO', 'Car2', 1, '2023-06-10 11:51:15.879661', '2023-06-11 11:22:25.061656'),
(7, 'car2.jpg', 'Car2', 'CEO', 'Car2', 1, '2023-06-11 11:27:16.090336', '2023-06-11 11:27:16.090336'),
(8, 'car2.jpg', 'Car2', 'CEO', 'Car2', 1, '2023-06-11 11:27:17.082244', '2023-06-11 11:27:17.082244'),
(9, 'car2.jpg', 'Car2', 'CEO', 'Car2', 1, '2023-06-11 11:27:18.006087', '2023-06-11 11:27:18.006087'),
(10, 'car2.jpg', 'Car2', 'CEO', 'Car2', 1, '2023-06-11 11:27:18.942147', '2023-06-11 11:27:18.942147');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `testimonial`
--
ALTER TABLE `testimonial`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `testimonial`
--
ALTER TABLE `testimonial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
