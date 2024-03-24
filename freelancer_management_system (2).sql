-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 24, 2024 at 08:16 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `freelancer management system`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `aid` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`aid`, `name`, `email`, `password`) VALUES
(1, 'Abdulla shafaz', 'shafaz@gmail.com', '$2a$08$chotM6vgy9HdSVLNUXkTqud5ZWTq57ZLkJjFNHr3Oykh89X2HTtZO'),
(5, 'Anargh E', 'anargh@gmail.com', '$2a$08$UJpXDzqCdP3lXzKnC.vgHeHUrLVCXxGLagPnB/AvzSvaUSD10EVMm'),
(6, 'Fahiz', 'fahiz@gmail.com', '$2a$08$7CH0yZJQM92x3mO2uXtvqusjWaQa/035EQA7Npno13cfW6vCrbyvm');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `cid` int(11) NOT NULL,
  `type` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`cid`, `type`) VALUES
(17, 'Animation'),
(24, 'Content Marketing'),
(6, 'Content Writing'),
(13, 'Copywriting'),
(11, 'Customer Support'),
(8, 'Data Entry'),
(20, 'Digital Marketing'),
(3, 'Graphic Design'),
(15, 'Illustration'),
(2, 'Logo Design'),
(4, 'Mobile App Development'),
(22, 'Photography'),
(21, 'SEO Service'),
(10, 'Transcription'),
(14, 'Translation'),
(18, 'UI/UX Design'),
(12, 'Video Editing'),
(9, 'Virtual Assistance'),
(16, 'Voice Over'),
(25, 'Web Development'),
(19, 'Website Design');

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `cid` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `company_name` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`cid`, `name`, `email`, `company_name`, `password`) VALUES
(1, 'fahiz', 'fahiz@gmail.com', 'abcd', '$2a$08$SozpgYu8Ec.g56/JxZkN9OnebaLIumgE/PtBmV5tCeylxgZbB80x6'),
(5, 'Abhin M', 'abhin@gmail.com', 'xyz', '$2a$08$HPMREff8Ms2DfXCJ7cMfJ.hK8dAXBb6Ns8fehF0RgVhysZNhMMId2');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `feid` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `content` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`feid`, `name`, `email`, `content`) VALUES
(2, 'sabith', 'sabith@gmail.com', 'its very nice');

-- --------------------------------------------------------

--
-- Table structure for table `freelancers`
--

CREATE TABLE `freelancers` (
  `fid` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `freelancers`
--

INSERT INTO `freelancers` (`fid`, `name`, `email`, `password`) VALUES
(1, 'shafaz', 'shafaz@gmail.com', '$2a$08$CMFFuaR4mTnuMJg7wipjMe6VoG70.yfwaiQKyreMNjea9EMhfCqxS'),
(2, 'Muhammed Sabith', 'sabith@gmail.com', '$2a$08$5ijFjBpUpUoEYU.aUCd4U.iOIEnCNt7QYZmFgVvVN6EUekprADoBK'),
(3, 'John', 'john@example.com', '$2a$08$CMFFuaR4mTnuMJg7wipjMe6VoG70.yfwaiQKyreMNjea9EMhfCqxS'),
(4, 'Emma', 'emma@example.com', '$2a$08$CMFFuaR4mTnuMJg7wipjMe6VoG70.yfwaiQKyreMNjea9EMhfCqxS'),
(5, 'Michael', 'michael@example.com', '$2a$08$CMFFuaR4mTnuMJg7wipjMe6VoG70.yfwaiQKyreMNjea9EMhfCqxS'),
(6, 'Sophia', 'sophia@example.com', '$2a$08$CMFFuaR4mTnuMJg7wipjMe6VoG70.yfwaiQKyreMNjea9EMhfCqxS'),
(7, 'Olivia', 'olivia@example.com', '$2a$08$CMFFuaR4mTnuMJg7wipjMe6VoG70.yfwaiQKyreMNjea9EMhfCqxS'),
(8, 'James', 'james@example.com', '$2a$08$CMFFuaR4mTnuMJg7wipjMe6VoG70.yfwaiQKyreMNjea9EMhfCqxS'),
(9, 'William', 'william@example.com', '$2a$08$CMFFuaR4mTnuMJg7wipjMe6VoG70.yfwaiQKyreMNjea9EMhfCqxS'),
(11, 'Alexander', 'alexander@example.com', '$2a$08$CMFFuaR4mTnuMJg7wipjMe6VoG70.yfwaiQKyreMNjea9EMhfCqxS'),
(12, 'Mia', 'mia@example.com', '$2a$08$CMFFuaR4mTnuMJg7wipjMe6VoG70.yfwaiQKyreMNjea9EMhfCqxS'),
(13, 'Sophie', 'sophie@example.com', '$2a$08$CMFFuaR4mTnuMJg7wipjMe6VoG70.yfwaiQKyreMNjea9EMhfCqxS'),
(14, 'Noah', 'noah@example.com', '$2a$08$CMFFuaR4mTnuMJg7wipjMe6VoG70.yfwaiQKyreMNjea9EMhfCqxS'),
(15, 'Isabella', 'isabella@example.com', '$2a$08$CMFFuaR4mTnuMJg7wipjMe6VoG70.yfwaiQKyreMNjea9EMhfCqxS'),
(16, 'Liam', 'liam@example.com', '$2a$08$CMFFuaR4mTnuMJg7wipjMe6VoG70.yfwaiQKyreMNjea9EMhfCqxS'),
(17, 'Charlotte', 'charlotte@example.com', '$2a$08$CMFFuaR4mTnuMJg7wipjMe6VoG70.yfwaiQKyreMNjea9EMhfCqxS'),
(18, 'Ethan', 'ethan@example.com', '$2a$08$CMFFuaR4mTnuMJg7wipjMe6VoG70.yfwaiQKyreMNjea9EMhfCqxS'),
(20, 'Benjamin', 'benjamin@example.com', '$2a$08$CMFFuaR4mTnuMJg7wipjMe6VoG70.yfwaiQKyreMNjea9EMhfCqxS'),
(21, 'Ella', 'ella@example.com', '$2a$08$CMFFuaR4mTnuMJg7wipjMe6VoG70.yfwaiQKyreMNjea9EMhfCqxS');

-- --------------------------------------------------------

--
-- Table structure for table `gigs`
--

CREATE TABLE `gigs` (
  `gid` int(11) NOT NULL,
  `fid` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `cid` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `description` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gigs`
--

INSERT INTO `gigs` (`gid`, `fid`, `title`, `cid`, `price`, `description`) VALUES
(4, 4, 'Mobile App Development for iOS', 4, 800, 'Develop a custom mobile app for iOS platform'),
(13, 2, 'Mobile App Development for Android', 4, 700, 'Develop a custom mobile app for Android platform'),
(17, 1, 'Logo Design for Company A', 2, 150, 'Design a professional logo for Company A'),
(31, 1, 'Content Writing for Blog Posts', 6, 150, 'Write engaging blog posts for various topics'),
(32, 2, 'Social Media Marketing for Small Businesses', 20, 250, 'Create and manage social media campaigns for small businesses'),
(33, 3, 'Graphic Design for Logo', 3, 200, 'Design a professional logo for a company or brand'),
(34, 4, 'Mobile App Development for Android', 4, 1000, 'Develop a custom mobile app for the Android platform'),
(35, 5, 'Photography Services for Events', 22, 300, 'Capture high-quality photographs for events and occasions'),
(36, 6, 'SEO Optimization for Website', 21, 200, 'Optimize website content and structure for better search engine visibility'),
(38, 8, 'Virtual Assistance for Administrative Tasks', 9, 50, 'Provide virtual assistance for administrative duties such as email management and data entry'),
(39, 9, 'Logo Design for Startup', 2, 150, 'Design a unique and memorable logo for a startup company'),
(41, 11, 'Illustration for Children\'s Book', 15, 200, 'Create colorful and imaginative illustrations for a children\'s book'),
(42, 12, 'Voice Over for Podcast', 16, 80, 'Record professional voice-overs for podcast episodes'),
(43, 13, 'Web Design for Portfolio Website', 19, 400, 'Design a visually appealing and user-friendly website for showcasing portfolios'),
(44, 14, 'Copywriting for Product Descriptions', 13, 100, 'Write compelling and informative product descriptions to boost sales'),
(45, 15, 'Mobile App UI/UX Redesign', 18, 600, 'Revamp the user interface and experience design of a mobile application'),
(46, 16, 'Video Editing for YouTube Channel', 12, 120, 'Edit and enhance video content for a YouTube channel to attract more viewers'),
(48, 18, 'Translation of Business Documents', 14, 80, 'Translate business documents and correspondence accurately and fluently'),
(49, 9, 'Logo Design for Startup', 2, 150, 'Design a unique and memorable logo for a startup company'),
(50, 12, 'Voice Over for Podcast', 16, 80, 'Record professional voice-overs for podcast episodes'),
(51, 14, 'Copywriting for Product Descriptions', 13, 100, 'Write compelling and informative product descriptions to boost sales'),
(52, 18, 'Data Entry for Spreadsheet Management', 8, 50, 'Perform accurate data entry tasks for managing spreadsheets and databases'),
(53, 21, 'Logo Animation for Brand Intro', 17, 200, 'Create dynamic logo animations for brand introductions in videos or presentations'),
(55, 1, 'Full Stack Web Development', 25, 1000, 'I can create a website in a matter of time');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`aid`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`cid`),
  ADD UNIQUE KEY `UNIQUE` (`type`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`cid`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`feid`);

--
-- Indexes for table `freelancers`
--
ALTER TABLE `freelancers`
  ADD PRIMARY KEY (`fid`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `gigs`
--
ALTER TABLE `gigs`
  ADD PRIMARY KEY (`gid`),
  ADD KEY `cid` (`cid`),
  ADD KEY `fid` (`fid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `cid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `cid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `feid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `freelancers`
--
ALTER TABLE `freelancers`
  MODIFY `fid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `gigs`
--
ALTER TABLE `gigs`
  MODIFY `gid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `gigs`
--
ALTER TABLE `gigs`
  ADD CONSTRAINT `cid` FOREIGN KEY (`cid`) REFERENCES `category` (`cid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fid` FOREIGN KEY (`fid`) REFERENCES `freelancers` (`fid`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
