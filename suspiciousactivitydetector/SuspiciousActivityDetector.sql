-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 29, 2020 at 01:17 AM
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
  `activity_type` varchar(255) NOT NULL,
  `activity_number_of_people` int(3) NOT NULL,
  `activity_start_time` datetime NOT NULL,
  `activity_end_time` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `video_id` int(11) DEFAULT NULL,
  `camera_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `activity_reports`
--

CREATE TABLE `activity_reports` (
  `report_id` int(11) NOT NULL,
  `report_date` datetime NOT NULL,
  `report_filepath` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `camera_feeds`
--

CREATE TABLE `camera_feeds` (
  `camera_id` int(11) NOT NULL,
  `camera_name` varchar(255) DEFAULT NULL,
  `camera_number` int(1) NOT NULL,
  `camera_ip_address` varchar(15) NOT NULL COMMENT 'Will be used to prevent duplicate cameras from being added. The IP version that will be used is Ipv4.',
  `camera_date` date NOT NULL,
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
(2, 'Mikail', 'Busst', 'mikailbusst@icloud.com', '$2y$10$zeUIOxI/tfmv1Vr1ODvMpeISGxG9yoeyC.creLJTaPypiNMfI9CGS', '1', '2020-12-28');

-- --------------------------------------------------------

--
-- Table structure for table `Videos`
--

CREATE TABLE `Videos` (
  `video_id` int(11) NOT NULL,
  `video_filename` varchar(255) NOT NULL,
  `video_size` float NOT NULL COMMENT 'Size is in MB.',
  `video_duration` varchar(6) NOT NULL,
  `video_filepath` varchar(255) NOT NULL,
  `video_date` date NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
-- Indexes for table `camera_feeds`
--
ALTER TABLE `camera_feeds`
  ADD PRIMARY KEY (`camera_id`);

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
-- Indexes for table `Videos`
--
ALTER TABLE `Videos`
  ADD PRIMARY KEY (`video_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity_logs`
--
ALTER TABLE `activity_logs`
  MODIFY `activity_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `activity_reports`
--
ALTER TABLE `activity_reports`
  MODIFY `report_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `camera_feeds`
--
ALTER TABLE `camera_feeds`
  MODIFY `camera_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `system_reports`
--
ALTER TABLE `system_reports`
  MODIFY `sr_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Videos`
--
ALTER TABLE `Videos`
  MODIFY `video_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
