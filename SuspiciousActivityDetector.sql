-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 22, 2021 at 11:05 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.4.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `SuspiciousActivityDetector`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity_logs`
--

CREATE TABLE `activity_logs` (
  `activity_id` int(11) NOT NULL,
  `activity_name` varchar(255) NOT NULL,
  `report_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `activity_logs`
--

INSERT INTO `activity_logs` (`activity_id`, `activity_name`, `report_ID`) VALUES
(10, '15 Not Fighting', 16),
(11, '30 No person detected', 16),
(12, '45 Not Fighting', 16),
(13, '75 Not Fighting', 16),
(14, '90 Not Fighting', 16),
(15, '105 No person detected', 16),
(16, '135 Not Fighting', 16),
(17, '150 No person detected', 16),
(18, '15 Not Fighting', 17),
(19, '30 No person detected', 17),
(20, '45 Not Fighting', 17),
(21, '75 Not Fighting', 17),
(22, '90 Not Fighting', 17),
(23, '105 No person detected', 17),
(24, '135 Not Fighting', 17),
(25, '150 No person detected', 17),
(26, '15 Not Fighting', 18),
(27, '30 No person detected', 18),
(28, '45 Not Fighting', 18),
(29, '75 Not Fighting', 18),
(30, '90 Not Fighting', 18),
(31, '105 No person detected', 18),
(32, '135 Not Fighting', 18),
(33, '150 No person detected', 18),
(34, '15 Not Fighting', 19),
(35, '30 No person detected', 19),
(36, '45 Not Fighting', 19),
(37, '75 Not Fighting', 19),
(38, '90 Not Fighting', 19),
(39, '105 No person detected', 19),
(40, '135 Not Fighting', 19),
(41, '150 No person detected', 19),
(42, '15 Not Fighting', 20),
(43, '30 No person detected', 20),
(44, '45 Not Fighting', 20),
(45, '75 Not Fighting', 20),
(46, '90 Not Fighting', 20),
(47, '105 No person detected', 20),
(48, '135 Not Fighting', 20),
(49, '150 No person detected', 20),
(50, '15 Not Fighting', 21),
(51, '30 No person detected', 21),
(52, '45 Not Fighting', 21),
(53, '75 Not Fighting', 21),
(54, '90 Not Fighting', 21),
(55, '105 No person detected', 21),
(56, '135 Not Fighting', 21),
(57, '150 No person detected', 21),
(58, '15 Not Fighting', 22),
(59, '30 No person detected', 22),
(60, '45 Not Fighting', 22),
(61, '75 Not Fighting', 22),
(62, '90 Not Fighting', 22),
(63, '105 No person detected', 22),
(64, '135 Not Fighting', 22),
(65, '150 No person detected', 22);

-- --------------------------------------------------------

--
-- Table structure for table `activity_reports`
--

CREATE TABLE `activity_reports` (
  `report_id` int(11) NOT NULL,
  `report_date` datetime NOT NULL,
  `video_name` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `activity_reports`
--

INSERT INTO `activity_reports` (`report_id`, `report_date`, `video_name`, `user_id`) VALUES
(16, '2021-02-20 05:20:04', 'V_978.mp4', 2),
(17, '2021-02-20 09:33:33', 'V_978.mp4', 2),
(18, '2021-02-20 09:41:04', 'V_978.mp4', 2),
(19, '2021-02-20 09:47:39', 'V_978.mp4', 2),
(20, '2021-02-20 09:50:53', 'V_978.mp4', 2),
(21, '2021-02-20 10:03:20', 'V_978.mp4', 2),
(22, '2021-02-20 10:06:24', 'V_978.mp4', 2);

-- --------------------------------------------------------

--
-- Table structure for table `reset_password`
--

CREATE TABLE `reset_password` (
  `rp_ID` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `system_reports`
--

CREATE TABLE `system_reports` (
  `sr_id` int(11) NOT NULL,
  `sr_date` datetime NOT NULL,
  `sr_filepath` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_first_name` varchar(255) NOT NULL,
  `user_last_name` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL COMMENT 'Will be unique across system.',
  `user_password` varchar(1000) NOT NULL,
  `user_status` char(1) NOT NULL COMMENT 'Will be used to differentiate between regular users and admins. ',
  `user_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_first_name`, `user_last_name`, `user_email`, `user_password`, `user_status`, `user_date`) VALUES
(2, 'Mikail', 'Busst', 'mikailbusst@icloud.com', '$2y$10$u2rj.7/7oGUSXmTOKmRkYuVT8EIfnxsfZt.UOswL.9F/vIhQiofZa', '1', '2020-12-28'),
(3, 'Mikail', 'Busst', 'mikailbusst2@gmail.com', '$2y$10$mcoUPDOtxR6VT625WZYq2.jdLzJyl0ojXv96YBk7GzmWDxz2e5BVy', '0', '2021-02-22');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD PRIMARY KEY (`activity_id`);

--
-- Indexes for table `activity_reports`
--
ALTER TABLE `activity_reports`
  ADD PRIMARY KEY (`report_id`);

--
-- Indexes for table `reset_password`
--
ALTER TABLE `reset_password`
  ADD PRIMARY KEY (`rp_ID`);

--
-- Indexes for table `system_reports`
--
ALTER TABLE `system_reports`
  ADD PRIMARY KEY (`sr_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity_logs`
--
ALTER TABLE `activity_logs`
  MODIFY `activity_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `activity_reports`
--
ALTER TABLE `activity_reports`
  MODIFY `report_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `reset_password`
--
ALTER TABLE `reset_password`
  MODIFY `rp_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `system_reports`
--
ALTER TABLE `system_reports`
  MODIFY `sr_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
