-- phpMyAdmin SQL Dump
-- version 4.0.10.18
-- https://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 14, 2017 at 10:39 AM
-- Server version: 5.5.52
-- PHP Version: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `orderapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(16) NOT NULL AUTO_INCREMENT,
  `menu_id` int(11) NOT NULL,
  `name_en` varchar(255) DEFAULT NULL,
  `name_he` varchar(255) DEFAULT NULL,
  `sort` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `menu_id` (`menu_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=30 ;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `menu_id`, `name_en`, `name_he`, `sort`) VALUES
(1, 1, 'Angus Salads', 'סלטים', 100),
(2, 1, 'Angus Burgers', 'המבורגרים', 101),
(3, 1, 'Angus Tortilla', 'טורטייה', 102),
(4, 1, 'Angus Sides', 'תוספות', 105),
(5, 1, 'Angus Drinks', 'שתיה', 104),
(6, 1, 'Angus Sandwiches', 'סנדוויצים', 103),
(7, 2, 'Meshulashim Pizza', 'פיצה', 106),
(8, 2, 'Meshulashim Toasts', 'טוסטים', 107),
(9, 2, 'Meshulashim Salads', 'סלטים', 108),
(10, 2, 'Meshulashim Pastas', 'פסטות', 109),
(11, 2, 'Meshulashim Extras', 'תוספות', 110),
(12, 2, 'Meshulashim Drinks', 'שתיה', 111),
(13, 2, 'Meshulashim Kid''s Meal', 'ארוחת ילדים', 112),
(14, 3, 'Bandora Grill', 'על הגריל', 113),
(15, 3, 'Bandora Salad', 'סלטים', 114),
(16, 3, 'Bandora Chummus', 'צלחת חומוס', 115),
(17, 3, 'Bandora Drinks', 'שתיה', 116),
(18, 4, 'Roza Appetizers', 'מנות ראשונות', 117),
(19, 4, 'Roza Sandwiches', 'סנדוויצים', 118),
(20, 4, 'Roza Hamburgers', 'המבורגר', 119),
(21, 4, 'Roza Tortillas', 'טורטיות', 120),
(22, 4, 'Roza Salads', 'סלטים\n', 121),
(23, 4, 'Roza Pastas', 'פסטות', 122),
(24, 4, 'Roza Stir Fry', 'מוקפצים', 123),
(25, 4, 'Roza Foccacias', 'הפוקצות של רוזה\n', 124),
(26, 4, 'Roza Specials', 'מיוחדים', 125),
(27, 4, 'Roza Snacks', 'נשנושים', 126),
(28, 4, 'Roza Kid''s meals', 'מנות ילדים\n', 127),
(29, 4, 'Roza Drinks', 'שתייה', 128);

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE IF NOT EXISTS `company` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `url` text NOT NULL,
  `voting_start` varchar(255) NOT NULL,
  `voting_end` varchar(255) NOT NULL,
  `ordering_end` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`id`, `name`, `url`, `voting_start`, `voting_end`, `ordering_end`) VALUES
(1, 'cisco', 'http://dev.biz.orderapp.com/?biz=cisco', '07:01:00', '08:03:00', '15:06:00'),
(2, 'josh', 'http://dev.biz.orderapp.com/?biz=josh', '02:00:00', '21:00:00', '24:30:00');

-- --------------------------------------------------------

--
-- Table structure for table `company_voting`
--

CREATE TABLE IF NOT EXISTS `company_voting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `restaurant_id` int(11) NOT NULL,
  `vote_count` int(11) NOT NULL,
  `voting_date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=77 ;

--
-- Dumping data for table `company_voting`
--

INSERT INTO `company_voting` (`id`, `company_id`, `restaurant_id`, `vote_count`, `voting_date`) VALUES
(5, 1, 1, 63, '2017-02-12'),
(6, 1, 2, 41, '2017-02-12'),
(7, 1, 3, 341, '2017-02-12'),
(8, 1, 4, 16, '2017-02-12'),
(9, 2, 1, 2, '2017-02-13'),
(10, 2, 2, 1, '2017-02-13'),
(11, 2, 3, 1, '2017-02-13'),
(12, 2, 4, 0, '2017-02-13'),
(57, 1, 1, 1, '2017-02-13'),
(58, 1, 2, 0, '2017-02-13'),
(59, 1, 3, 0, '2017-02-13'),
(60, 1, 4, 0, '2017-02-13'),
(73, 1, 1, 0, '2017-02-14'),
(74, 1, 2, 0, '2017-02-14'),
(75, 1, 3, 0, '2017-02-14'),
(76, 1, 4, 1, '2017-02-14');

-- --------------------------------------------------------

--
-- Table structure for table `coupons`
--

CREATE TABLE IF NOT EXISTS `coupons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(222) NOT NULL,
  `starting_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ending_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `discount` int(11) DEFAULT NULL,
  `type` varchar(222) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `coupons`
--

INSERT INTO `coupons` (`id`, `name`, `starting_date`, `ending_date`, `discount`, `type`) VALUES
(1, 'alex20', '2017-02-12 13:58:00', '2017-03-09 00:00:00', 30, 'percentage'),
(2, 'alex50', '2017-02-12 13:58:06', '2017-03-21 00:00:00', 50, 'amount');

-- --------------------------------------------------------

--
-- Table structure for table `extras`
--

CREATE TABLE IF NOT EXISTS `extras` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` int(11) NOT NULL,
  `name_en` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `price_replace` tinyint(1) DEFAULT '0',
  `name_he` varchar(255) NOT NULL,
  `sort` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `item_id` (`item_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=232 ;

--
-- Dumping data for table `extras`
--

INSERT INTO `extras` (`id`, `item_id`, `name_en`, `type`, `price_replace`, `name_he`, `sort`) VALUES
(2, 1, 'Add On', 'Multiple', 0, 'תוספות', 101),
(3, 1, 'Sauces', 'Multiple', 0, 'רטבים', 102),
(4, 1, 'Vegetables', 'Multiple', 0, 'ירקות', 103),
(5, 2, 'Add On', 'Multiple', 0, 'תוספות', 104),
(6, 2, 'Sauces', 'Multiple', 0, 'רטבים', 105),
(7, 2, 'Vegetables', 'Multiple', 0, 'ירקות', 106),
(8, 3, 'Add On', 'Multiple', 0, 'תוספות', 107),
(9, 3, 'Sauces', 'Multiple', 0, 'רטבים', 108),
(10, 3, 'Vegetables', 'Multiple', 0, 'ירקות', 109),
(11, 4, 'Add On', 'Multiple', 0, 'תוספות', 110),
(12, 4, 'Sauces', 'Multiple', 0, 'רטבים', 111),
(13, 4, 'Vegetables', 'Multiple', 0, 'ירקות', 112),
(14, 7, 'Add On', 'Multiple', 0, 'תוספות', 113),
(15, 7, 'Sauces', 'Multiple', 0, 'רטבים', 114),
(16, 7, 'Vegetables', 'Multiple', 0, 'ירקות', 115),
(17, 8, 'Add On', 'Multiple', 0, 'תוספות', 116),
(18, 8, 'Sauces', 'Multiple', 0, 'רטבים', 117),
(19, 8, 'Vegetables', 'Multiple', 0, 'ירקות', 118),
(20, 9, 'Add On', 'Multiple', 0, 'תוספות', 119),
(21, 9, 'Sauces', 'Multiple', 0, 'רטבים', 120),
(22, 9, 'Vegetables', 'Multiple', 0, 'ירקות', 121),
(23, 10, 'Add On', 'Multiple', 0, 'תוספות', 122),
(24, 10, 'Sauces', 'Multiple', 0, 'רטבים', 123),
(25, 10, 'Vegetables', 'Multiple', 0, 'ירקות', 124),
(26, 11, 'Add On', 'Multiple', 0, 'תוספות', 125),
(27, 11, 'Sauces', 'Multiple', 0, 'רטבים', 126),
(28, 11, 'Vegetables', 'Multiple', 0, 'ירקות', 127),
(29, 12, 'Add On', 'Multiple', 0, 'תוספות', 128),
(30, 12, 'Sauces', 'Multiple', 0, 'רטבים', 129),
(31, 12, 'Vegetables', 'Multiple', 0, 'ירקות', 130),
(32, 13, 'Add On', 'Multiple', 0, 'תוספות', 131),
(33, 13, 'Sauces', 'Multiple', 0, 'רטבים', 132),
(34, 13, 'Vegetables', 'Multiple', 0, 'ירקות', 133),
(35, 5, 'Add On', 'Multiple', 0, 'תוספות', 134),
(36, 5, 'Sauces', 'Multiple', 0, 'רטבים', 135),
(37, 5, 'Vegetables', 'Multiple', 0, 'ירקות', 136),
(38, 6, 'Add On', 'Multiple', 0, 'תוספות', 137),
(39, 6, 'Sauces', 'Multiple', 0, 'רטבים', 138),
(40, 6, 'Vegetables', 'Multiple', 0, 'ירקות', 139),
(41, 28, 'Add On', 'Multiple', 0, 'תוספות', 140),
(43, 29, 'Add On', 'Multiple', 0, 'תוספות', 141),
(45, 30, 'Add On', 'Multiple', 0, 'תוספות', 142),
(47, 31, 'Add On', 'Multiple', 0, 'תוספות', 143),
(49, 32, 'Add On', 'Multiple', 0, 'תוספות', 144),
(51, 33, 'Add On', 'Multiple', 0, 'תוספות', 145),
(53, 34, 'Add On', 'Multiple', 0, 'תוספות', 146),
(55, 35, 'Add On', 'Multiple', 0, 'תוספות', 147),
(57, 36, 'Add On', 'Multiple', 0, 'תוספות', 148),
(59, 37, 'Add On', 'Multiple', 0, 'תוספות', 149),
(61, 38, 'Add On', 'Multiple', 0, 'תוספות', 150),
(63, 39, 'Add On', 'Multiple', 0, 'תוספות', 151),
(65, 40, 'Add On', 'Multiple', 0, 'תוספות', 152),
(67, 40, 'Pasta Type', 'One', 0, 'סוג הפסטה', 153),
(68, 41, 'Add On', 'Multiple', 0, 'תוספות', 154),
(70, 41, 'Pasta Type', 'One', 0, 'סוג הפסטה', 155),
(71, 42, 'Add On', 'Multiple', 0, 'תוספות', 156),
(73, 42, 'Pasta Type', 'One', 0, 'סוג הפסטה', 157),
(74, 43, 'Add On', 'Multiple', 0, 'תוספות', 158),
(76, 43, 'Pasta Type', 'One', 0, 'סוג הפסטה', 159),
(77, 44, 'Add On', 'Multiple', 0, 'תוספות', 160),
(79, 44, 'Pasta Type', 'One', 0, 'סוג הפסטה', 161),
(80, 45, 'Add On', 'Multiple', 0, 'תוספות', 162),
(82, 46, 'Add On', 'Multiple', 0, 'תוספות', 163),
(84, 47, 'Add On', 'Multiple', 0, 'תוספות', 164),
(86, 48, 'Add On', 'Multiple', 0, 'תוספות', 165),
(88, 49, 'Add On', 'Multiple', 0, 'תוספות', 166),
(90, 50, 'Add On', 'Multiple', 0, 'תוספות', 167),
(105, 58, 'Bread Type', 'One', 1, 'לחם', 168),
(106, 58, 'Meat Type', 'One', 0, 'בשר', 169),
(107, 58, 'Addons', 'Multiple', 0, 'תוספות', 170),
(108, 58, 'Sauces', 'Multiple', 0, 'רטבים', 171),
(110, 59, 'Bread Type', 'One', 1, 'לחם', 172),
(111, 59, 'Meat Type', 'One', 0, 'בשר', 173),
(112, 59, 'Addons', 'Multiple', 0, 'תוספות', 174),
(113, 59, 'Sauces', 'Multiple', 0, 'רטבים', 175),
(115, 60, 'Bread Type', 'One', 1, 'לחם', 176),
(116, 60, 'Meat Type', 'One', 0, 'בשר', 177),
(117, 60, 'Addons', 'Multiple', 0, 'תוספות', 178),
(118, 60, 'Sauces', 'Multiple', 0, 'רטבים', 179),
(120, 61, 'Bread Type', 'One', 1, 'לחם', 180),
(121, 61, 'Meat Type', 'One', 0, 'בשר', 181),
(122, 61, 'Addons', 'Multiple', 0, 'תוספות', 182),
(123, 61, 'Sauces', 'Multiple', 0, 'רטבים', 183),
(125, 62, 'Bread Type', 'One', 1, 'לחם', 184),
(126, 62, 'Meat Type', 'One', 0, 'בשר', 185),
(127, 62, 'Addons', 'Multiple', 0, 'תוספות', 186),
(128, 62, 'Sauces', 'Multiple', 0, 'רטבים', 187),
(130, 63, 'Bread Type', 'One', 1, 'לחם', 188),
(131, 63, 'Meat Type', 'One', 0, 'בשר', 189),
(132, 63, 'Addons', 'Multiple', 0, 'תוספות', 190),
(133, 63, 'Sauces', 'Multiple', 0, 'רטבים', 191),
(135, 64, 'Bread Type', 'One', 1, 'לחם', 192),
(136, 64, 'Meat Type', 'One', 0, 'בשר', 193),
(137, 64, 'Addons', 'Multiple', 0, 'תוספות', 194),
(138, 64, 'Sauces', 'Multiple', 0, 'רטבים', 195),
(140, 65, 'Meat Type', 'One', 0, 'בשר', 196),
(141, 65, 'Addons', 'Multiple', 0, 'תוספות', 197),
(142, 65, 'Sauces', 'Multiple', 0, 'רטבים', 198),
(144, 66, 'Meat Type', 'One', 0, 'בשר', 199),
(145, 66, 'Addons', 'Multiple', 0, 'תוספות', 200),
(146, 66, 'Sauces', 'Multiple', 0, 'רטבים', 201),
(148, 67, 'Meat Type', 'One', 0, 'בשר', 202),
(149, 67, 'Addons', 'Multiple', 0, 'תוספות', 203),
(150, 67, 'Sauces', 'Multiple', 0, 'רטבים', 204),
(154, 70, 'Meat Type', 'One', 0, 'בשר', 205),
(155, 87, 'Vegetables', 'Multiple', 0, 'ירקות', 206),
(156, 87, 'Sauces', 'Multiple', 0, 'רטבים', 207),
(157, 87, 'Addons', 'Multiple', 0, 'תוספות', 208),
(158, 87, 'Roza Deal', 'One', 0, 'רוזה דיל', 209),
(159, 88, 'Vegetables', 'Multiple', 0, 'ירקות', 210),
(160, 88, 'Sauces', 'Multiple', 0, 'רטבים', 211),
(161, 88, 'Addons', 'Multiple', 0, 'תוספות', 212),
(162, 88, 'Roza Deal', 'One', 0, 'רוזה דיל', 213),
(163, 89, 'Vegetables', 'Multiple', 0, 'ירקות', 214),
(164, 89, 'Sauces', 'Multiple', 0, 'רטבים', 215),
(165, 89, 'Addons', 'Multiple', 0, 'תוספות', 216),
(166, 89, 'Roza Deal', 'One', 0, 'רוזה דיל', 217),
(167, 90, 'Vegetables', 'Multiple', 0, 'ירקות', 218),
(168, 90, 'Sauces', 'Multiple', 0, 'רטבים', 219),
(169, 90, 'Addons', 'Multiple', 0, 'תוספות', 220),
(170, 90, 'Roza Deal', 'One', 0, 'רוזה דיל', 221),
(171, 91, 'Vegetables', 'Multiple', 0, 'ירקות', 222),
(172, 91, 'Sauces', 'Multiple', 0, 'רטבים', 223),
(173, 91, 'Addons', 'Multiple', 0, 'תוספות', 224),
(174, 91, 'Roza Deal', 'One', 0, 'רוזה דיל', 225),
(175, 92, 'Vegetables', 'Multiple', 0, 'ירקות', 226),
(176, 92, 'Sauces', 'Multiple', 0, 'רטבים', 227),
(177, 92, 'Addons', 'Multiple', 0, 'תוספות', 228),
(178, 92, 'Roza Deal', 'One', 0, 'רוזה דיל', 229),
(179, 93, 'Vegetables', 'Multiple', 0, 'ירקות', 230),
(180, 93, 'Sauces', 'Multiple', 0, 'רטבים', 231),
(181, 93, 'Addons', 'Multiple', 0, 'תוספות', 232),
(182, 93, 'Roza Deal', 'One', 0, 'רוזה דיל', 233),
(183, 94, 'Vegetables', 'Multiple', 0, 'ירקות', 234),
(184, 94, 'Sauces', 'Multiple', 0, 'רטבים', 235),
(185, 94, 'Addons', 'Multiple', 0, 'תוספות', 236),
(186, 94, 'Roza Deal', 'One', 0, 'רוזה דיל', 237),
(187, 95, 'Vegetables', 'Multiple', 0, 'ירקות', 238),
(188, 95, 'Sauces', 'Multiple', 0, 'רטבים', 239),
(189, 95, 'Addons', 'Multiple', 0, 'תוספות', 240),
(190, 95, 'Roza Deal', 'One', 0, 'רוזה דיל', 241),
(191, 96, 'Vegetables', 'Multiple', 0, 'ירקות', 242),
(192, 96, 'Sauces', 'Multiple', 0, 'רטבים', 243),
(193, 96, 'Addons', 'Multiple', 0, 'תוספות', 244),
(194, 96, 'Roza Deal', 'One', 0, 'רוזה דיל', 245),
(195, 97, 'Vegetables', 'Multiple', 0, 'ירקות', 246),
(196, 97, 'Sauces', 'Multiple', 0, 'רטבים', 247),
(197, 97, 'Addons', 'Multiple', 0, 'תוספות', 248),
(198, 97, 'Roza Deal', 'One', 0, 'רוזה דיל', 249),
(199, 98, 'Vegetables', 'Multiple', 0, 'ירקות', 250),
(200, 98, 'Sauces', 'Multiple', 0, 'רטבים', 251),
(201, 98, 'Addons', 'Multiple', 0, 'תוספות', 252),
(202, 98, 'Roza Deal', 'One', 0, 'רוזה דיל', 253),
(203, 99, 'Vegetables', 'Multiple', 0, 'ירקות', 254),
(204, 99, 'Sauces', 'Multiple', 0, 'רטבים', 255),
(205, 99, 'Addons', 'Multiple', 0, 'תוספות', 256),
(206, 99, 'Roza Deal', 'One', 0, 'רוזה דיל', 257),
(207, 100, 'Bread', 'One', 0, 'לחם לתשלום', 258),
(208, 100, 'Roza Deal', 'One', 0, 'רוזה דיל', 259),
(209, 101, 'Bread', 'One', 0, 'לחם לתשלום', 260),
(210, 101, 'Roza Deal', 'One', 0, 'רוזה דיל', 261),
(211, 102, 'Bread', 'One', 0, 'לחם לתשלום', 262),
(212, 102, 'Roza Deal', 'One', 0, 'רוזה דיל', 263),
(213, 103, 'Bread', 'One', 0, 'לחם לתשלום', 264),
(214, 103, 'Roza Deal', 'One', 0, 'רוזה דיל', 265),
(215, 104, 'Bread', 'One', 0, 'לחם לתשלום', 266),
(216, 104, 'Roza Deal', 'One', 0, 'רוזה דיל', 267),
(217, 105, 'Bread', 'One', 0, 'לחם לתשלום', 268),
(218, 105, 'Roza Deal', 'One', 0, 'רוזה דיל', 269),
(219, 106, 'Bread', 'One', 0, 'לחם לתשלום', 270),
(220, 106, 'Roza Deal', 'One', 0, 'רוזה דיל', 271),
(221, 107, 'Roza Deal', 'One', 0, 'רוזה דיל', 272),
(222, 108, 'Roza Deal', 'One', 0, 'רוזה דיל', 273),
(223, 109, 'Roza Deal', 'One', 0, 'רוזה דיל', 274),
(224, 110, 'Roza Deal', 'One', 0, 'רוזה דיל', 275),
(225, 111, 'Roza Deal', 'One', 0, 'רוזה דיל', 276),
(226, 112, 'Roza Deal', 'One', 0, 'רוזה דיל', 277),
(227, 113, 'Roza Deal', 'One', 0, 'רוזה דיל', 278),
(228, 114, 'Roza Deal', 'One', 0, 'רוזה דיל', 279),
(229, 115, 'Roza Deal', 'One', 0, 'רוזה דיל', 280),
(230, 116, 'Roza Deal', 'One', 0, 'רוזה דיל', 281),
(231, 117, 'Roza Deal', 'One', 0, 'רוזה דיל', 282);

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE IF NOT EXISTS `items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL,
  `name_en` varchar(255) NOT NULL,
  `name_he` varchar(255) NOT NULL,
  `desc_en` text NOT NULL,
  `desc_he` text NOT NULL,
  `price` float NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `sort` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=148 ;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `category_id`, `name_en`, `name_he`, `desc_en`, `desc_he`, `price`, `image_url`, `sort`) VALUES
(1, 2, 'Angus Burger', 'אנגוס בורגר', 'Angus Burger\n250 grams of quality entrecote beef with mayonnaise, mustard, barbecue, lettuce, onions, fried onions, pickles and tomatoes.', 'אנגוס בורגר\n250 גרם בשר אנטריקוט איכותי.  בתוספת מיונז, חרדל, ברביקיו, חסה, בצל, בצל מטוגן, מלפפון חמוץ ועגבניה.\nתוספות בתשלום לבחירה: פורטובלו 4 ₪ | ביצה 4 ₪ | 50 גר'' חזה אווז 8 ₪', 40, 'img/angus_items/angus_burger.png', 100),
(2, 3, 'Angus Tortilla', 'טורטיה אנגוס', 'Angus Tortilla: 150 grams of quality Angus entrecote beef with mayonnaise, mustard, chimichurri, lettuce and tomato.', 'טורטיה אנגוס\n150 גרם נתחי אנטריקוט אנגוס איכותיים. בתוספת מיונז, חרדל, צ''ימיצ''ורי, חסה ועגבניה.\nתוספות בתשלום לבחירה: פורטובלו 4 ₪ | ביצה 4 ₪', 36, 'img/angus_items/tortilla.png', 101),
(3, 3, 'Pargit Tortilla', 'טורטיה פרגית', 'Spring Chicken Tortilla: \n150 grams of chicken marinated in Moroccan spices with mayonnaise, mustard, chimichurri, lettuce and tomato.', 'טורטיה פרגית\n150 גרם פרגיות במרינדה של תבלינים מרוקאים.  בתוספת מיונז, חרדל, צ''ימיצ''ורי, חסה ועגבניה.\nתוספות בתשלום לבחירה: פורטובלו 4 ₪ | ביצה 4 ₪', 34, 'restapi/images/test.png', 102),
(4, 3, 'Chicken Tortilla', 'טורטיה עוף', 'Chicken Tortilla\n150 grams of chicken in honey sauce marunade with mayonnaise, mustard, chipotle pepper, lettuce and tomato.\n', 'טורטיה עוף\n150 גרם נתחי חזה עוף במרינדת דבש.  בתוספת מיונז, חרדל, צ''יפוטלה, חסה ועגבניה.\nתוספות בתשלום לבחירה: פורטובלו 4 ₪ | ביצה 4 ₪', 32, 'restapi/images/test.png', 103),
(5, 1, 'Angus Salad', 'סלט אנגוס', 'Angus salad\n150 gram entrecote/spring chicken/goose breast.\nLettuce, baby greens, tomatoes, sacks, onion and mushrooms. Served with bread, chimmichuri,  and plenty of sauces to choose from.', 'סלט אנגוס\n150 גרם נתחי אנטריקוט | פרגית | חזה אווז.\nעלי חסה, עלי בייבי, עגבניות שקי, בצל סגול ופטריות. מוגש בתוספת לחם צי''מיצ''ורי ורטבים לבחירה. \nתוספות בתשלום לבחירה: 150 גרם חזה אווז או אטנריקוט 19 ₪ | 80 גר'' כבד אווז 30 ₪', 44, 'img/angus_items/angus_salad.png', 104),
(6, 1, 'Chicken Salad', 'סלט עוף', 'Chicken Salad\n170 grams of sweet chicken breast. Chopped lettuce, mesculin, cucumber, cherry tomatoes, red onion and mushrooms. Served with garlic bread and sauces.', 'סלט עוף\n170 גרם חזה חות מתוק. עלי חסה קצוצים, עלי בייבי, רצועות מלפפון, עגבניות שרי, בצל סגול ופטריות. מוגש בתוספת לחם שום ורטבים.\nתוספות בתשלום לבחירה: פורטובלו 4 ₪ | ביצה 4 ₪ | 170 גר'' חזה עוף 18 ₪', 42, 'img/angus_items/chicken_salad.png', 105),
(7, 6, 'Angus Sandwich', 'אנגוס סנדוויץ', 'Angus Sandwich: 150 grams of quality Angus entrecote meat with mustard, chimichuri, lettuce, and tomatoes', 'סנדוויץ'' אנגוס\n150 גרם נתחי אנטריקוט אנגוס איכותיים. בתוספת חרדל, צ''ימיצ''ורי , חסה ועגבניה.\nתוספות בתשלום לבחירה: 50 גר'' חזה אווז 8 ₪ | 150 גר'' חזה אווז או אנטריקוט 19 ₪ | ביצה 4 ₪ | פורטובלו 4 ₪', 37, 'restapi/images/test.png', 106),
(8, 6, 'Double angus sandwich', 'דאבל אנגוס סנדוויץ', 'Double Angus Sandwich: 300 grams of quality Angus entrecote meat with mayonaise, mustard, chimichuri, lettuce, and tomatoes ', 'סנדוויץ'' דאבל אנגוס\n300 גרם נתחי אנטריקוט אנגוס איכותיים. בתוספת מיונז, חרדל, צ''ימיצ''ורי , חסה ועגבניה.\nתוספות בתשלום לבחירה: 50 גר'' חזה אווז 8 ₪  | ביצה 4 ₪ | פורטובלו 4 ₪\n', 56, 'restapi/images/test.png', 107),
(9, 6, 'King angus sandwich', 'קינג אנגוס סנדוויץ', 'King Angus Sandwich: 150 grams of quality Angus entrecote meat and 80 grams of goose liver with mayonaise, mustard, chimichuri, lettuce, and tomatoes ', 'סנדוויץ'' קינג אנגוס\n150 גרם נתחי אנטריקוט + 80 גר'' כבד אווז. בתוספת מיונז, חרדל, צ''ימיצ''ורי , חסה ועגבניה.\nתוספות בתשלום לבחירה: 50 גר'' חזה אווז 8 ₪  | ביצה 4 ₪ | פורטובלו 4 ₪', 67, 'restapi/images/test.png', 108),
(10, 6, 'chicken sandwich', 'סנדוויץ עוף', 'Chicken Sandwich: 170 grams of sweet chicken breast with mayonaise, sweet chilli sauce, garlic, lettuce, and tomatoes.', 'סנדוויץ'' עוף\n170 גרם חזה עוף מתוק.  בתוספת מיונז, צ''ילי מתוק, שום, חסה ועגבניה.\nתוספות בתשלום לבחירה: 170 גר'' חזה עוף 18 ₪ | פורטובלו 4 ₪', 33, 'img/angus_items/chicken_sandwich.png', 109),
(11, 6, 'mallard sandwich', 'סנדוויץ'' מולארד', 'Mallard Sandwich: 150 grams of quality goose breast with mayonaise, mustard, chimichuri, lettuce, and tomatoes ', 'סנדוויץ'' מולארד\n150 גר'' נתחי חזה אווז איכותיים.  בתוספת מיונז, חרדל, צ''ימיצ''ורי, חסה ועגבניה.\nתוספות בתשלום לבחירה: 50 גר'' חזה אווז 8 ₪ | ביצה 4 ₪ | פורטובלו 4 ₪', 37, 'restapi/images/test.png', 110),
(12, 6, 'mediterranean sandwich', 'סנדוויץ ים תיכוני', 'Mediterranean Sandwich: 150 grams spring chicken with our special home made spice blend. Comes with mayonaise, tehina, spicy chilli sauce, lettuce, and tomatoes', 'סנדוויץ'' ים תיכוני\n150 גר'' פרגיות בתיבול הבית.  בתוספת מיונז, טחינה, צ''ילי חריף, חסה ועגבניה.\nתוספות בתשלום לבחירה:  פורטובלו 4 ₪', 35, 'restapi/images/test.png', 111),
(13, 6, 'Vegetarian sandwich', 'סנדוויץ'' צמחוני', 'Vegetarian Sandwich: Mesclun leaves, red onion, tomatoes, portobello mushroom, lettuce, onion rings, and a fried egg.', 'סנדוויץ'' צמחוני\nעלי בייבי, בצל סגול, עגבניות, פורטובלו, חסה, טבעות בצל, ביצת עין ועגבניות טריות.\nרטבים לבחירה: מיונז|  פסטו | ברביקיו | צ''ילי מתוק\n', 33, 'restapi/images/test.png', 112),
(14, 5, 'Coca Cola Zero', 'קוקה קולה', '', '', 8, 'img/drinks/download.png', 113),
(15, 5, 'Fuze Tea', 'פיוז טה', '', '', 8, 'img/drinks/CC063.png', 114),
(16, 5, 'Prigat Grape', 'פריגת ענבים', '', '', 8, 'img/drinks/Prigan_grapefruit.png', 115),
(17, 5, 'Coca Cola Zero', 'קוקה קולה זירו', '', '', 8, 'img/drinks/download.png', 116),
(18, 5, 'Diet Coke', 'דייט קוקה קולה', '', '', 8, 'img/drinks/coca-cola-diet-1-75-litre.png', 117),
(19, 5, 'Fanta', 'פנטה', '', '', 12, 'img/drinks/download (1).png', 118),
(20, 5, 'Large Coca Cola', 'בקבוק קוקה קולה גדול', '', '', 12, 'img/drinks/PDP_Coca-Cola-HFCS-1.25-Liter-Bottle.png', 119),
(21, 5, 'Large Coca Cola Zero', 'בקבוק פיוז טה גדול', '', '', 12, 'img/drinks/download.png', 120),
(22, 4, 'Small Sweet potato fries', 'צ''יפס בטטה- קטן\n', '', '', 14, 'img/angus_items/sweet_potato_fries.png', 121),
(23, 4, 'American fries', 'צ''יפס אמריקאי', '', '', 14, 'img/angus_items/american_fries.png', 122),
(24, 4, 'onion rings', 'טבעות בצל', '', '', 14, 'restapi/images/test.png', 123),
(25, 4, 'Mexican nachos', 'נאצ''וס מקסיקני מטוגן', '', '', 12, 'restapi/images/test.png', 124),
(26, 4, 'crispy chicken wings', 'כנפי עוף קריספיות ברוטב', '', '', 25, 'restapi/images/test.png', 125),
(27, 4, 'Large Sweet Potato fries', 'צ''יפס בטטה- גדול', '', '', 25, 'restapi/images/test.png', 126),
(28, 7, 'XL Pie', 'XL פאי', '', '', 56, 'img/mesh_items/XL_pie.png', 127),
(29, 7, 'XL + Toppings', 'XL + תוספות', '', '', 75, 'img/mesh_items/XL_toppings.png', 128),
(30, 7, 'Meshulashim Pie', 'פאי משלושים', 'Tomato sauce, mozzarella, garlic confit, sun-dried tomatoes and spicy peppers', 'רוטב עגבניות, מוצרלה, שום קונפי, עגבניות מיובשות ופלפלים חריפים', 32, 'img/mesh_items/meshulashim_pie.png', 129),
(31, 7, 'Margarita', 'מרגריטה', 'Tomato sauce, mozzarella, basil and olive oil', 'רוטב עגבניות, מוצרלה, בזיליקום ושמן זית', 28, 'img/mesh_items/margarita.png', 130),
(32, 7, 'Gluten Free', 'ללא גלוטן', 'Tomato sauce, mozzarella and olive oil', 'רוטב עגבניות, מוצרלה ושמן זית', 35, 'img/mesh_items/gluten_free.png', 131),
(33, 8, 'Meshulashim Toast', 'משולשים טוסט', 'Bagel toasted with Bulgarian spread and mozzarella, tomatoes, Kalamata olives, Za''atar and olive oil', 'בייגל פתוח, בולגרית למריחה מוצרלה, עגבנייה, זיתי קלמטה, זעתר ושמן זית', 25, 'img/mesh_items/meshulashim_toast.png', 132),
(34, 8, 'Bagel Toast', 'בייגל טוסט', 'Bagel with tomato sauce, mozzarella, basil and olive oil, served with 2 toppings of your choice', 'רוטב עגבניות, מוצרלה, בזיליקום ושמן זית מוגש עם שתי תוספות לבחירה', 25, 'img/mesh_items/bagel_toast.png', 133),
(35, 8, 'Crispy Capricci', 'קריספי קפרזה', 'Oven baked foccaccia with cherry tomatoes, Kalamata olives, feta cheese, basil, oregano and olive oil', 'פוקצ''ה עשיה בתנור לבנים, עגבניות שרי, זיתי קלמטה, גבינת פטה, בזיליקום, אורוגולה ושמן זית', 25, 'img/mesh_items/crispy_capricci.png', 134),
(36, 9, 'Meshulashim Salad', 'סלט משולשים', 'Selection of market vegetables, olive oil and lemon, bulgarian cheese', 'מבחר ירקות השוק, שמן זית לימון וגבינה בולגרית', 28, 'img/mesh_items/meshulashim_salad.png', 135),
(37, 9, 'Tuna Salad', 'סלט טונה', 'Mixed leaves, cherry tomatoes, cucumbers, peppers, purple onion, hard-boiled egg, seasoned tuna, lemon and olive oil', 'שלל עלים, עגבניות שרי, מלפפון, פלפלים, בצל סגול, ביצה קשה וטונה מתובלים בלימון ושמן זית', 28, 'img/mesh_items/tuna_salad.png', 136),
(38, 9, 'Greek Salad', 'סלט יווני', 'Cucumbers and chopped tomatoes on a bed of lettuce, feta cheese, red onion, roasted peppers, Kalamata olives, za''atar, lemon and olive oil', 'מלפפון ועגבניות קצוצים על מצע חסות, פטה מגורדת,\nבצל סגול, פלפל קלוי, זיתי קלמטה, זעתר, לימון ושמן זית', 28, 'img/mesh_items/greek_salad.png', 137),
(39, 10, 'Meshulashim Pasta', 'משולשים פסטה', 'Stir-fried mushrooms, onion and sun-dried tomatoes with herbs, garlic and olive oil', 'פטריות בצל ועגבניות מיובשות מוקפצים בעשבי תיבול שום ושמן זית', 28, 'img/mesh_items/meshulashim_pasta.png', 138),
(40, 10, 'Alfredo', 'אלפרדו', 'Stir-fried champignon mushrooms in a creamy garlic and wine sauce', 'בצל ופטריות שמפניון מוקפצים, שמנת, שום ויין לבן', 28, 'img/mesh_items/alfredo.png', 139),
(41, 10, 'Pasta Roza', 'פסטה רוזה', 'Creamy tomato sauce, seasoned with garlic and white wine', 'רוטב עגבניות שמנת שום ויין לבן', 28, 'img/mesh_items/pasta_roza.png', 140),
(42, 10, 'Arrabiata', 'ארביאטה', 'Tomato sauce, garlic, basil and olive oil', 'רוטב עגבניות שום, בזיליקום ושמן זית', 28, 'img/mesh_items/arrabiata.png', 141),
(43, 10, 'Cheese Ravioli', 'רביולי גבינה', 'In a cream sauce, seasoned with garlic and fresh basil', 'שמנת, שום, ובזיליקום טרי', 32, 'img/mesh_items/ravioli.png', 142),
(44, 10, 'Sweet Potato Ravioli', 'רביולי בטטה', 'Creamy sauce ', 'רוטב שמנת', 32, 'img/mesh_items/sweet_potato_ravioli.png', 143),
(45, 11, 'Cheese Bureka', 'בורקס גבינה', '', '', 10, 'img/mesh_items/borekas.png', 144),
(46, 11, 'Potato Bureka', 'בורקס תפו״א', '', '', 10, 'restapi/images/test.png', 145),
(47, 11, 'Deluxe Bureka', 'בורקס פינוק', 'Deluxe Borekas - tehina, tomato, pickles, harisa, hard boiled egg', 'בורקס פינוק - טחינה, עגבנייה, מלפפון, חמוץ, אריסה, ביצה קשה', 18, 'restapi/images/test.png', 146),
(48, 11, 'Edamame', 'אדממה', 'Seasoned with salt and lemon juice', 'בתיבול מלח ולימון', 15, 'restapi/images/test.png', 147),
(49, 11, 'Home Fries', 'הום פרייז', '', '', 28, 'img/mesh_items/home_fries.png', 148),
(50, 11, 'Fries', 'צ''פס', '', '', 18, 'img/mesh_items/fries.png', 149),
(51, 12, 'Coca Cola', 'קוקה קולה', '', '', 10, 'img/drinks/1-100x100.png', 150),
(52, 12, 'Coca Cola Zero', 'קוקה קולה זירו', '', '', 10, 'img/drinks/download.png', 151),
(53, 12, 'Fuze Tea', 'פיוז טה', '', '', 10, 'img/drinks/CC063.png', 152),
(54, 12, 'Prigat Grape', 'פריגת ענבים', '', '', 10, 'img/drinks/Prigan_grapefruit.png', 153),
(55, 12, 'Diet Coke', 'דייט קוקה קולה', '', '', 10, 'img/drinks/coca-cola-diet-1-75-litre.png', 154),
(56, 12, 'Sprite', 'ספרייט', '', '', 10, 'img/drinks/3-1.png', 155),
(57, 13, 'Kid''s Meal', 'ארוחת ילדים', 'Pasta in tomato sauce / toast / pizza, with cup of ''Vitaminchik'', cut vegetables', 'פסטה עגבניות / טוסט / פיצה מוגש עם כוס ויטמינצ''יק וירקות פרוסים', 25, 'img/mesh_items/kids_meal.png', 156),
(58, 14, 'Shawarma', 'שווארמה', 'Bandora Shawarma: Veal or spring chicken', 'שווארמה בנדורה: עגל/ פרגיות', 0, 'img/bandora_items/shawarma.png', 157),
(59, 14, 'Super Spicy Bandora', 'בנדורה חריף אש', 'Bandora Supreme: Pieces of veal/spring chicken shawarma, grilled onion, spicy pepper, and grilled tomatoes', 'בנדורה מחוזקת - לרציניים בלבד!! נתחי עגל/פרגית מחוזקת בטעמים על פלאנצ׳ה לוהטת בתוספת בצל, פלפל חריף אש ועגבנית צלויות על פחמים (צמרמורת!!)', 0, 'img/bandora_items/super_spicy_bandora.png', 158),
(60, 14, 'Bandura mixed grill', 'בנדורה מעורב על הגריל', 'Bandora the Barbarian''s Mixed Grill: chicken hearts, livers, sauted onion, grill spices from the Levinsky Market, and seared herbs', 'מעורב בנדורה של הברברי : לבבות, כבדים ובצל שרוף, תערובת תבלינים משוק לווינסקי ועשבי תיבול זרוקים על פחמים', 0, 'img/bandora_items/bandura_mixed_grill.png', 159),
(61, 14, 'beef kabab', 'קבב בשר', 'Kebab: a mix of ground meat with grilled vegetables', 'קבב שעושים ביד: תערובת בשר טחון של הטורקי וירקות צלויים ', 0, 'img/bandora_items/beef_kabob.png', 160),
(62, 14, 'Merguez Sausage', 'נקנקיות מרגז', 'Merguez Sausage', 'נקניקיות מרגז', 0, 'img/bandora_items/merguez_sausage.png', 161),
(63, 14, 'chicken skewers', 'שיפודי עוף', 'Jumbo Marakesh Spring Chicken Skewers: skewers spiced with harissa, cumin, hawaij, garlic, and herbs', 'שיפוד פרגית ג׳מבו מרקש: שיפוד פרגית מתובלת בתבלין אריסה, כמון, שום ועשבי תבול', 0, 'img/bandora_items/chicken_skewers.png', 162),
(64, 14, 'chicken breast', 'חזה עוף', 'Marinated Chicken Breast: chicken breast spiced with paprika, cumin, hawaij, and coarse black pepper', 'חזה עוף במרינדה של תבליני שוק: פרוסות חזה עוף מתובל בפפריקה, כמון, חוואייג׳ ופלפל שחור גרוס. ', 0, 'img/bandora_items/chicken_breasts.png', 163),
(65, 15, 'Bandora Express', 'סלט נדורה', 'Bandora Express: green salad dressed with olive oil and lemon, pieces of shawarma/spring chicken/turkey strips, grilled onion, tehina, sumak, and parsley ', 'בנדורה אקספרס: סלט ירקות חתוך דק מתובל בשמן זית ולימון, נתחי שווארמה פרגית או רצועות חזה עוף, בצל שרוף, טחינה של סעיד, סומק ופטרוזיליה', 42, 'img/bandora_items/bandora_express.png', 164),
(66, 15, 'Amami Salad', 'סלט עממי', 'Ammami Salad: green salad dressed with za''atar and lemon, pita chips, pieces of shawarma/spring chicken, grilled onion, pinenuts, and tehina', 'סלט עממי שיושב טוב בבטן: סלט ירקות חתוך דק מתובל בזעתר ולימון, שברי פיתה צלויה, נתחי שווארמה עגל או רצועות חזה עוף, בצל שרוף, צנוברים, טחינה של סעיד, סומק ופטרוזיליה', 42, 'restapi/images/test.png', 165),
(67, 15, 'Medura', 'מדורה', 'Medura Plate: Tomatoes, onions, hot peppers, and tehina, garnished with a sprig of parsley', 'צלחת מדורה: עגבניות, בצלים ופלפ אש שרופים, בים של טחינה וקצת פטרוזיליה לפינוק', 19, 'restapi/images/test.png', 166),
(68, 16, 'Chummus and Techina', 'חומוס עם טחינה', 'Chummus, tehina, olive oil, and pinenuts', 'חומוס, טחינה, שמן זית וסחרחורת של צנוברים', 25, 'img/bandora_items/chummus_and _techina.png', 167),
(69, 16, 'Mixed meat chummus', 'חומוס עם בשר מעורב', 'Mixed Grill Chummus', 'חומוס מעורב (בתקרית בטחונית) בתוספת רצועות הודו, טחול, ללבות ובצל שרוף על פחמים', 39, 'restapi/images/test.png', 168),
(70, 16, 'Chummus Bandora', 'חומוס בנדורה', 'Chummus Bandora', 'חומוס בנדורה - חומוס, נתחי שווארמה עגל/פרגיות עסיסיים בתוספת בצל שרוף וצנוברים', 39, 'restapi/images/test.png', 169),
(71, 17, 'Coca Cola', 'קוקה קולה', '', '', 10, 'img/drinks/1-100x100.png', 170),
(72, 17, 'Fuze Tea', 'פיוז טה', '', '', 10, 'img/drinks/CC063.png', 171),
(73, 17, 'Prigat Grape', 'פריגת ענבים', '', '', 10, 'img/drinks/Prigan_grapefruit.png', 172),
(74, 17, 'Coca Cola Zero', 'קוקה קולה זירו', '', '', 10, 'img/drinks/download.png', 173),
(75, 17, 'Diet Coke', 'דייט קוקה קולה', '', '', 10, 'img/drinks/coca-cola-diet-1-75-litre.png', 174),
(76, 17, 'Fanta', 'פנטה', '', '', 10, 'img/drinks/download (1).png', 175),
(77, 17, 'Large Coca Cola', 'בקבוק קוקה קולה גדול', '', '', 14, 'img/drinks/PDP_Coca-Cola-HFCS-1.25-Liter-Bottle.png', 176),
(78, 17, 'Large Fuze Tea', 'בקבוק פיוז טי גדול', '', '', 14, 'restapi/images/test.png', 177),
(79, 18, 'Baladi eggplant in tahini', 'חציל בלאדי בטחינה ירוקה', 'Plus salsa and olive oil', 'בתוספת סלסה ושמן זית', 22, 'restapi/images/test.png', 178),
(80, 18, 'Cauliflower tahini', 'כרובית בטחינה', 'With sweet chili', 'בליווי צ''ילי מתוק', 26, 'restapi/images/test.png', 179),
(81, 18, 'Sourdough bread and four homemade dips', 'לחם מחמצת וארבעה מטבלי הבית', '', '', 18, 'restapi/images/test.png', 180),
(82, 18, 'Focaccias', 'פוקצ''ה מתבלים', 'Comes with five types of dips', 'חמישה סוגי מטבלים משתנים', 28, 'img/roza_items/roza_foccacia.JPG', 181),
(83, 18, 'Sweet potato fries with a touch of maple', 'צ''יפס בטטה בנגיעות מייפל', '', '', 22, 'restapi/images/test.png', 182),
(84, 18, 'Soup of the day', 'מרק היום- שאל את הטלפן', '', '', 22, 'restapi/images/test.png', 183),
(85, 18, 'Tempura chicken fillet', 'פילה עוף טמפורה', 'Drizzled with sweet chili', 'על מצע צ''ילי מתוק', 28, 'restapi/images/test.png', 184),
(86, 18, 'Stir fried mushrooms', 'פטריות מוקפצות', 'Portobello Mushrooms and teriyaki sauce', 'שמפיניון ופורטובלו ברוטב טריאקי', 33, 'restapi/images/test.png', 185),
(87, 19, 'Sandwich chicken', 'סנדוויץ'' עוף', 'Chicken strips grilled with fried onion spread with guacamole and roasted peppers', 'נתחי עוף בגריל עם בצל מטוגן, ממרח גוואקאמולי ופלפל קלוי', 45, 'img/roza_items/roza_chicken_sandwich.JPG', 186),
(88, 19, 'Steak sandwich', 'סטייק סנדוויץ''', 'Entrecote strips stirfried together with fried onion and Dijonnaise sauce', 'נתחי אנטריקוט מוקפצים עם בצל מטוגן בממרח דיז''ונז''', 48, 'restapi/images/test.png', 187),
(89, 19, 'Sandwich sloppy joe', 'סנדוויץ'' סלופי ג''ו', 'Chopped lamb pieces in a salsa and Dijonnaise sauce', 'נתחי טלה קצוצים ברוטב סלסה וממרח דיז''ונז''', 45, 'restapi/images/test.png', 188),
(90, 19, 'Sandwich Schnitzel Rosa', 'סנדוויץ'' שניצל רוזה', 'Shnitzel with house blend spices served wiht a choice of sauces and green vegetables', 'שניצל בתיבול ביתי מוגש עם מבחר רטבים בליווי ירקות טריים', 43, 'restapi/images/test.png', 189),
(91, 20, 'House burger 150g', 'המבורגר הבית 150 גרם', '100% fresh beef from select cuts', '100% בשר בקר טרי מחלקים מובחרים', 34, 'restapi/images/test.png', 190),
(92, 20, 'The house burger 250g', 'המבורגר הבית 250 גרם', '100% fresh beef from select cuts', '100% בשר בקר טרי מחלקים מובחרים', 42, 'restapi/images/test.png', 191),
(93, 20, 'Rosa Burger 220 grams', 'המבורגר רוזה 220 גרם', '100% lamb meat with house blend spices', '100% בשר טלה משובח בתיבות הבית', 42, 'img/roza_items/roza_burger.jpg', 192),
(94, 20, '220 gram entrecote hamburger', 'המבורגר אנטריקוט 220 גרם', '', '', 44, 'restapi/images/test.png', 193),
(95, 21, 'Tortilla Chicken', 'טורטיה עוף', 'Chicken strips stirfried with onion and tehina', 'נתחי חזה עוף מוקפצים עם בצל וטחינה', 45, 'img/roza_items/roza_chicken_tortilla.JPG', 194),
(96, 21, 'Tortilla Chicken liver', 'טורטיה כבד עוף', 'Chicken liver stirfried with onion and our house sauces', 'כבדי עוף מוקפצים עם בצל ברטבי הבית', 41, 'restapi/images/test.png', 195),
(97, 21, 'Tortilla kebab', 'טורטיה קבב', 'Small kebabs with tehina and salsa', 'קבבונים בטחינה ביתית וסלסה', 46, 'restapi/images/test.png', 196),
(98, 21, 'Tortilla entrecote', 'טורטיה אנטריקוט', 'Entrecote strips stirfried with onion and Dijonnaise sauce', 'נתחי אנטריקוט מוקפצים עם בצל מטוגן בממרח דיז''ונז''', 48, 'restapi/images/test.png', 197),
(99, 21, 'Tortilla lamb', 'טורטיה טלה', 'Spicy lamb sausages spread with guacamole', 'נקניקיות טלה פיקנטיות וממרח גוואקמולי', 44, 'restapi/images/test.png', 198),
(100, 22, 'Satay Chicken Salad', 'סלט סאטה עוף', 'Chicken breast coated in peanut sauce on a base of green salad', 'חזה עוף מושרה בחמאת בוטנים על מצע סלט ירוק', 47, 'restapi/images/test.png', 199),
(101, 22, 'Veal Salad', 'סלט נתחי עגל', 'Stirfried veal pieces with onion on a bed of greens with peanut sauce and gourmet tehina', 'נתחי עגל מוקפצים עם בצל על מצע סלט ירוק ברוטב חמאת בוטנים וטחינה גולמית', 49, 'restapi/images/test.png', 200),
(102, 22, 'Chicken and Goose Breast Salad', 'סלט עוף עם חזה אווז', 'Stirfried pieces of chicken and aged goose breast on a green salad base, mixed with roasted peppers', 'נתחי עוף מוקפצים עם חזה אווז מעושן על מצע סלט ירוק ופלפל קלוי', 49, 'restapi/images/test.png', 201),
(103, 22, 'Roast beef salad', 'סלט רוסטביף', 'Hot roast beef on a bed of greens, roast peppers, topped with a fried egg, croutons and Dijonnaise sauce', 'רוסטביף חם על מצע סלט ירוק ופלפל קלוי בתוספת ביצת עין , קרוטונים ודיזו''נז''', 47, 'restapi/images/test.png', 202),
(104, 22, 'Chicken liver salad', 'סלט כבדי עוף', 'Chicken livers in maple sauce, pears, walnuts and cranberries on a bed of greens', 'כבדי עוף בניחוח מייפל, אגסים, אגוזי מלך וחמוציות על מצע של סלט ירוק', 44, 'restapi/images/test.png', 203),
(105, 22, 'green salad', 'סלט ירוק', 'Lettuce, baby leaves, purple onion, cherry tomatoes, cucumber, avocado (when in season) in a mustard vinaigrette sauce', 'חסה, עלי בייבי, בצל סגול, עגבניות שרי, מלפפון, אבוקדו (בעונה)', 27, 'restapi/images/test.png', 204),
(106, 22, 'Israeli salad', 'סלט ערבי', 'Cucumbers, tomatoes, parsley, onoin in olive oil and lemon sauce', 'מלפפון, עגבניות, פטרוזיליה, בצל ברוטב שמן זית ולימון', 32, 'restapi/images/test.png', 205),
(107, 23, 'Fettuccini in Tomato Sauce', 'פטוצ''יני עגבניות', 'Made with grilled plum tomatoes and garlic with olive oil and fresh herbs.', 'עגבניות תמר צלויות בגריל עם שום, שמן זית וריחן טרי', 38, 'restapi/images/test.png', 206),
(108, 23, 'Chicken Fettuccini ', 'פטוצ''יני עוף', 'Stirfried chicken pieces in olive oil, seasoned with green herbs', 'נתחי עוף מוקפצים בעשבי תיבול ושמן זית', 49, 'restapi/images/test.png', 207),
(109, 23, 'Bolognese', 'בולונז', 'Fettuccini with minced lamb meat in a roasted plum tomato sauce', 'בשר טלה טחון במקום, פטוצ''יני ברוטב עגבניות תמר צלויות', 49, 'restapi/images/test.png', 208),
(110, 23, 'Fettuccini with Chicken Livers', 'פטוצ''יני כבד עוף', 'Chicken Livers, Mirin sauce, fresh herbs and mushrooms', 'כבד עוף, מירין, עשבי תיבול ופטריות', 49, 'restapi/images/test.png', 209),
(111, 23, 'Fettuccini Entrecote', 'פטוצ''יני אנטריקוט', 'With pan-seared entrecot pieces and shallots, champignon mushrooms and Mirin sauce', 'נתחי אנטריקוט צרובים במחבת לצד בצלי שאלוט, פטריות שמפניון ומירין', 52, 'restapi/images/test.png', 210),
(112, 24, 'Vegetarian Noodles', 'נודלס צמחוני', 'Egg noodles stirfried with carrot, variety of peppers and soya sauce', 'אטריות ביצים מוקפצות עם גזר, בצל ופלפלים צבעוניים ברוטב סויה', 39, 'restapi/images/test.png', 211),
(113, 24, 'Chicken Noodles', 'נודלס עוף', 'Egg noodles stirfried with carrot, variety of peppers, soya sauce and chicken pieces', 'אטריות ביצים מוקפצות עם גזר, בצל, פלפלים צבעוניים ברוטב סויה עם נתחי עוף', 49, 'img/roza_items/roza_chicken_noodles.jpg', 212),
(114, 24, 'Beef Noodles', 'נודלס בקר', 'Egg noodles stirfried with carrot, variety of peppers, soya sauce and beef pieces', 'אטריות ביצים מוקפצות עם גזר, בצל ופלפלים צבעוניים ברוטב סויה עם נתחי בקר', 52, 'restapi/images/test.png', 213),
(115, 25, 'Jerusalem Foccaccia', 'פוקצ''ה ירושלמית', 'Jerusalem Mix with tehina, amba sauce and parsley', 'מעורב ירושלמי בתוספת טחינה, עמבה ופטרוזיליה', 52, 'restapi/images/test.png', 214),
(116, 25, 'Lamb sausage Foccaccia (spicy)', 'פוקצ''ה נקניקיות טלה (חריף)', 'Lamb sausage, baby leaves, onion and Dijonnaise sauce', 'נקניקיות טלה, עלי בייבי, שרי, בצל וממרח דיז''ונז''', 52, 'restapi/images/test.png', 215),
(117, 25, 'Kebab Foccaccia', 'פוקצ''ה קבב', 'Kebab on a bed of baladi eggplant, salsa and parsley', 'קבב על מצע חציל באלדי, סלסה ופטרוזיליה', 52, 'restapi/images/test.png', 216),
(118, 26, 'Spring Chicken with Green Herbs', 'פרגיות בעשבי תיבול', 'One a bed of green rice ', 'על מצע אורז ירוק', 58, 'restapi/images/test.png', 217),
(119, 26, 'Spring Chicken with Peanut Butter Sauce', 'פרגיות בחמאת בוטנים', 'On a bed of noodles', 'על מצע נודלס', 58, 'restapi/images/test.png', 218),
(120, 26, 'Home Style Schnitzel', 'שניצל הבית', 'Chicken breast fried with panko and breadcrumbs and herbs on a bed of mashed potato ', 'חזה עוף מטוגן מציפוי פירורי לחם ופנקו בתיבול הבית. מוגש עם פירה וסלט אישי', 56, 'restapi/images/test.png', 219),
(121, 26, 'Entrecote skewer', 'שיפוד אנטריקוט', 'With a side of potato salad and chimichurri sauce', 'צוגש בתוספת פוטטו וסלט אישי בליווי רוטב צ''ימיצ''ורי', 48, 'restapi/images/test.png', 220),
(122, 26, 'Entrecote', 'סטייק אנטריקוט', 'Comes with potatos and salad', 'בתוספת פוטטו וסלט אישי', 95, 'restapi/images/test.png', 221),
(123, 27, 'Chicken nuggets', 'שניצלונים', '', '', 35, 'restapi/images/test.png', 222),
(124, 27, 'Wings', 'כנפיים', '', '', 28, 'restapi/images/test.png', 223),
(125, 27, 'Home fries (Potatoes)', 'צ''יפס הבית (פוטטוס)', '', '', 15, 'restapi/images/test.png', 224),
(126, 27, 'Onion rings', 'טבעות בצל', '', '', 17, 'restapi/images/test.png', 225),
(127, 27, 'American fries', 'צ''יפס אמריקאי', '', '', 17, 'restapi/images/test.png', 226),
(128, 28, 'American fries + chicken nuggets', 'שניצלונים + צ''יפס אמריקאי', '', '', 41, 'restapi/images/test.png', 227),
(129, 28, 'American Burger + Chips', 'בורגר + צ''יפס אמריקאי', '', '', 41, 'restapi/images/test.png', 228),
(130, 28, 'Fettuccine Tomato', 'פטוצ''יני עגבניות', '', '', 31, 'restapi/images/test.png', 229),
(131, 29, 'Coca-Cola 0.5 liters', 'קוקה קולה 0.5 ליטר', '', '', 11, 'restapi/images/test.png', 230),
(132, 29, '0.5 liters of Diet Coke', 'דיאט קולה 0.5 ליטר', '', '', 11, 'restapi/images/test.png', 231),
(133, 29, 'Coke Zero 0.5 liters', 'קולה זירו 0.5 ליטר', '', '', 11, 'restapi/images/test.png', 232),
(134, 29, 'Sprite 0.5 liters', 'ספרייט 0.5 ליטר', '', '', 11, 'restapi/images/test.png', 233),
(135, 29, 'Diet Sprite 0.5 liters', 'דיאט ספרייט 0.5 ליטר', '', '', 11, 'restapi/images/test.png', 234),
(136, 29, 'Diet Sprite 0.5 liters', 'דיאט ספרייט 0.5 ליטר', '', '', 11, 'restapi/images/test.png', 235),
(137, 29, 'Fanta 0.5 liters', 'פאנטה 0.5 ליטר', '', '', 11, 'restapi/images/test.png', 236),
(138, 29, 'Prigat 0.5 liters of orange', 'פריגת תפוזים 0.5 ליטר', '', '', 11, 'restapi/images/test.png', 237),
(139, 29, 'Prigat grapes 0.5 liters', 'פריגת ענבים 0.5 ליטר', '', '', 11, 'restapi/images/test.png', 238),
(140, 29, 'Prigat grapefruit 0.5 liters', 'פריגת אשכוליות 0.5 ליטר', '', '', 11, 'restapi/images/test.png', 239),
(141, 29, 'Nestea peach 0.5 l', 'נסטי אפרסק 0.5 ליטר', '', '', 11, 'restapi/images/test.png', 240),
(142, 29, 'Peach flavored water 0.5 liter', 'מים בטעם אפרסק 0.5 ליטר', '', '', 11, 'restapi/images/test.png', 241),
(143, 29, 'Apple flavored water 0.5 liter', 'מים בטעם תפוח 0.5 ליטר', '', '', 11, 'restapi/images/test.png', 242),
(144, 29, 'Grape flavored water 0.5 liter', 'מים בטעם ענבים 0.5 ליטר', '', '', 11, 'restapi/images/test.png', 243),
(145, 29, 'Personal mineral water', 'מים מינרליים אישי', '', '', 9, 'restapi/images/test.png', 244),
(146, 29, 'Personal soda', 'סודה אישי', '', '', 9, 'restapi/images/test.png', 245),
(147, 29, 'Malt', 'בירה שחורה', '', '', 12, 'restapi/images/test.png', 246);

-- --------------------------------------------------------

--
-- Table structure for table `menus`
--

CREATE TABLE IF NOT EXISTS `menus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `restaurant_id` int(11) NOT NULL,
  `name_en` varchar(255) NOT NULL,
  `name_he` varchar(255) NOT NULL,
  `sort` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `restaurant_id` (`restaurant_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `menus`
--

INSERT INTO `menus` (`id`, `restaurant_id`, `name_en`, `name_he`, `sort`) VALUES
(1, 1, 'Lunch', 'ארוחת צהריים', 100),
(2, 2, 'Lunch', 'ארוחת צהריים', 101),
(3, 3, 'Lunch', 'ארוחת צהריים', 102),
(4, 4, 'Lunch', 'ארוחת צהריים', 103);

-- --------------------------------------------------------

--
-- Table structure for table `order_detail`
--

CREATE TABLE IF NOT EXISTS `order_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `item` varchar(255) NOT NULL,
  `sub_total` int(11) NOT NULL,
  `sub_items` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=34 ;

-- --------------------------------------------------------

--
-- Table structure for table `restaurants`
--

CREATE TABLE IF NOT EXISTS `restaurants` (
  `id` int(16) NOT NULL AUTO_INCREMENT,
  `name_en` varchar(255) NOT NULL,
  `name_he` varchar(255) NOT NULL,
  `logo` varchar(255) NOT NULL,
  `description_en` text NOT NULL,
  `description_he` text NOT NULL,
  `address_en` varchar(255) NOT NULL,
  `address_he` varchar(255) NOT NULL,
  `hechsher_en` varchar(255) NOT NULL,
  `hechsher_he` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `restaurants`
--

INSERT INTO `restaurants` (`id`, `name_en`, `name_he`, `logo`, `description_en`, `description_he`, `address_en`, `address_he`, `hechsher_en`, `hechsher_he`) VALUES
(1, 'Angus', 'אנגוס', 'http://dev.bot2.orderapp.com/img/angos_logo.png', 'Angus is an entrecote bar located in the heart of Bet Shemesh. \nWe have a large selection of fresh, excellent quality chicken and meat dishes. Choose from: chicken tortilla, chicken sandwiches, entrecote sandwiches, duck breast sandwiches, decadent salads, a variety of side dishes and more. That''s not all - try our delicious business options!', 'מסעדת אנגוס אנטריקוט בר הכשרה בבית-שמש ידועה בתפריט העשיר והמפתה שלה, הכולל מבחר נתחי בשר ועוף טריים ואיכותיים. לבחירתכם: טורטייה במילוי פרגית ועוף, כריכים מעולים עם שלל מילויים (אנטריקוט, חזה אווז ופרגית), סלטים מפנקים, מגוון תוספות ועוד. זה לא הכול – נסו את העסקיות המשתלמות של אנגוס!', '\nYitzhak Rabin through 5, Beit Shemesh', 'דרך יצחק רבין 5,בית שמש', 'Rabbanut Bet Shemesh', 'רבנות בית שמש'),
(2, 'Meshulashim', 'פיצה משולשים', 'http://dev.bot2.orderapp.com/img/meshulashim_logo.png', 'The best pizza in Bet Shemesh. We only use fresh products in our classic dishes. It''s the type of place Bet Shemesh has been yearning for. Try one of the creative ones such as our spicy pizza or go classic with our margarita pizza. Either way, you gotta get a pizza here!', 'הפיצריה כשרה ומגישה מבחר של מנות כגון פיצות, פסטות ברטבים עשירים, סלטים מירקות טריים הנחתכים במקום, בורקסים בטעמים וכן גם טוסטים. ניתן להזמין את הפיצות הטעימות של משולשים גם ללא גלוטן.', '\nSderot Yigal Allon 6, Beit Shemesh', 'שד'' יגאל אלון 6, קניון שער העיר, בית שמש', 'Mehadrin Rav Landau', 'כשר למהדרין הרב לנדא '),
(3, 'Bandora', 'בנדורה', 'http://dev.bot2.orderapp.com/img/bandora_logo.png', 'Bandora is known for its high-quality meats. Our traditional charcoal grill gives the shawarma a unique flavor and aroma; flavors reminiscent of homecooked meals made in distant villages in Turkey, Jordan, Syria and Egypt.', 'בנדורה היא שילוב מנצח של בשר שווארמה איכותי, אשר שוכב על גחלים וניצלה בצורה מסורתית, המעניק לבשר השווארמה טעמים וארומה ייחודיים, טעמים המגיעים אלנו מהכפרים הרחוקים של תורכיה, ירדן, סוריה ומצרים.', '\nSderot Yigal Allon 6, Canyon Gate City, Beit Shemesh', 'שד'' יגאל אלון 6, קניון שער העיר, בית שמש', 'Badatz Beit Yosef', 'בד"ץ בית יוסף'),
(4, 'Roza', 'רוזה', 'http://dev.bot2.orderapp.com/img/roza_logo.png', 'Restaurant serving you a meat menu that includes sandwiches, different types of meat, salads, pastas, burgers, children''s meals & more', 'מסעדה המגיש לכם מנות בשריות אשר כוללות סנדוויצ''ים  ,סוגים שונים של בשרים, סלטים , פסטות, המבורגרים , ארוחות ילדים ועוד', 'Sderot Yigal Allon 3,  Beit Shemesh', 'קניון ביג פאשן, יגאל אלון 3', 'Mehadrin Harav Mutzafi', ' בד"ץ הרב מוצפי');

-- --------------------------------------------------------

--
-- Table structure for table `restaurant_gallery`
--

CREATE TABLE IF NOT EXISTS `restaurant_gallery` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `restaurant_id` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `restaurant_id` (`restaurant_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=41 ;

--
-- Dumping data for table `restaurant_gallery`
--

INSERT INTO `restaurant_gallery` (`id`, `restaurant_id`, `url`) VALUES
(2, 1, 'img/angus_gallery/ang_1.png'),
(3, 1, 'img/angus_gallery/ang_2.png'),
(4, 1, 'img/angus_gallery/ang_3.png'),
(5, 1, 'img/angus_gallery/ang_4.png'),
(6, 1, 'img/angus_gallery/ang_5.png'),
(7, 1, 'img/angus_gallery/ang_6.png'),
(8, 1, 'img/angus_gallery/ang_7.png'),
(9, 3, 'img/bandora_gallery/band_1.png'),
(10, 3, 'img/bandora_gallery/band_2.png'),
(11, 3, 'img/bandora_gallery/band_3.png'),
(12, 2, 'img/mesh_gallery/mesh_1.png'),
(13, 2, 'img/mesh_gallery/mesh_2.png'),
(21, 4, 'img/roza_gallery/roza_1.jpg'),
(22, 4, 'img/roza_gallery/roza_10.JPG'),
(23, 4, 'img/roza_gallery/roza_11.JPG'),
(24, 4, 'img/roza_gallery/roza_12.JPG'),
(25, 4, 'img/roza_gallery/roza_13.jpg'),
(26, 4, 'img/roza_gallery/roza_14.jpg'),
(27, 4, 'img/roza_gallery/roza_15.jpg'),
(28, 4, 'img/roza_gallery/roza_16.JPG'),
(29, 4, 'img/roza_gallery/roza_17.JPG'),
(30, 4, 'img/roza_gallery/roza_18.JPG'),
(31, 4, 'img/roza_gallery/roza_19.JPG'),
(32, 4, 'img/roza_gallery/roza_2.jpg'),
(33, 4, 'img/roza_gallery/roza_20.jpg'),
(34, 4, 'img/roza_gallery/roza_3.JPG'),
(35, 4, 'img/roza_gallery/roza_4.JPG'),
(36, 4, 'img/roza_gallery/roza_5.JPG'),
(37, 4, 'img/roza_gallery/roza_6.jpg'),
(38, 4, 'img/roza_gallery/roza_7.JPG'),
(39, 4, 'img/roza_gallery/roza_8.JPG'),
(40, 4, 'img/roza_gallery/roza_9.JPG');

-- --------------------------------------------------------

--
-- Table structure for table `restaurant_tags`
--

CREATE TABLE IF NOT EXISTS `restaurant_tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `restaurant_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `restaurant_id` (`restaurant_id`),
  KEY `tag_id` (`tag_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `restaurant_tags`
--

INSERT INTO `restaurant_tags` (`id`, `restaurant_id`, `tag_id`) VALUES
(2, 1, 1),
(3, 1, 2),
(4, 1, 3),
(5, 1, 4),
(6, 3, 2),
(7, 3, 5),
(8, 3, 6),
(9, 2, 7);

-- --------------------------------------------------------

--
-- Table structure for table `subitems`
--

CREATE TABLE IF NOT EXISTS `subitems` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `extra_id` int(11) NOT NULL,
  `name_en` varchar(255) NOT NULL,
  `name_he` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `sort` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `extra_id` (`extra_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=788 ;

--
-- Dumping data for table `subitems`
--

INSERT INTO `subitems` (`id`, `extra_id`, `name_en`, `name_he`, `price`, `sort`) VALUES
(1, 4, 'Lettuce', 'חסה', 0, 100),
(2, 4, 'tomato', 'עגבניות', 0, 101),
(3, 4, 'onions', 'בצל', 0, 102),
(4, 4, 'Pickles', 'חמוצים', 0, 103),
(5, 4, 'fried onions', 'בצל מטוגן', 0, 104),
(6, 7, 'Lettuce', 'חסה', 0, 105),
(7, 7, 'tomato', 'עגבניות', 0, 106),
(8, 7, 'onions', 'בצל', 0, 107),
(9, 7, 'Pickles', 'חמוצים', 0, 108),
(10, 7, 'fried onions', 'בצל מטוגן', 0, 109),
(11, 10, 'Lettuce', 'חסה', 0, 110),
(12, 10, 'tomato', 'עגבניות', 0, 111),
(13, 10, 'onions', 'בצל', 0, 112),
(14, 10, 'Pickles', 'חמוצים', 0, 113),
(15, 10, 'fried onions', 'בצל מטוגן', 0, 114),
(16, 13, 'Lettuce', 'חסה', 0, 115),
(17, 13, 'tomato', 'עגבניות', 0, 116),
(18, 13, 'onions', 'בצל', 0, 117),
(19, 13, 'Pickles', 'חמוצים', 0, 118),
(20, 13, 'fried onions', 'בצל מטוגן', 0, 119),
(21, 16, 'Lettuce', 'חסה', 0, 120),
(22, 16, 'tomato', 'עגבניות', 0, 121),
(23, 16, 'onions', 'בצל', 0, 122),
(24, 16, 'Pickles', 'חמוצים', 0, 123),
(25, 16, 'fried onions', 'בצל מטוגן', 0, 124),
(26, 19, 'Lettuce', 'חסה', 0, 125),
(27, 19, 'tomato', 'עגבניות', 0, 126),
(28, 19, 'onions', 'בצל', 0, 127),
(29, 19, 'Pickles', 'חמוצים', 0, 128),
(30, 19, 'fried onions', 'בצל מטוגן', 0, 129),
(31, 22, 'Lettuce', 'חסה', 0, 130),
(32, 22, 'tomato', 'עגבניות', 0, 131),
(33, 22, 'onions', 'בצל', 0, 132),
(34, 22, 'Pickles', 'חמוצים', 0, 133),
(35, 22, 'fried onions', 'בצל מטוגן', 0, 134),
(36, 25, 'Lettuce', 'חסה', 0, 135),
(37, 25, 'tomato', 'עגבניות', 0, 136),
(38, 25, 'onions', 'בצל', 0, 137),
(39, 25, 'Pickles', 'חמוצים', 0, 138),
(40, 25, 'fried onions', 'בצל מטוגן', 0, 139),
(41, 28, 'Lettuce', 'חסה', 0, 140),
(42, 28, 'tomato', 'עגבניות', 0, 141),
(43, 28, 'onions', 'בצל', 0, 142),
(44, 28, 'Pickles', 'חמוצים', 0, 143),
(45, 28, 'fried onions', 'בצל מטוגן', 0, 144),
(46, 31, 'Lettuce', 'חסה', 0, 145),
(47, 31, 'tomato', 'עגבניות', 0, 146),
(48, 31, 'onions', 'בצל', 0, 147),
(49, 31, 'Pickles', 'חמוצים', 0, 148),
(50, 31, 'fried onions', 'בצל מטוגן', 0, 149),
(51, 34, 'Lettuce', 'חסה', 0, 150),
(52, 34, 'tomato', 'עגבניות', 0, 151),
(53, 34, 'onions', 'בצל', 0, 152),
(54, 34, 'Pickles', 'חמוצים', 0, 153),
(55, 34, 'fried onions', 'בצל מטוגן', 0, 154),
(56, 14, 'Lettuce', 'חסה', 0, 155),
(57, 14, 'tomato', 'עגבניות', 0, 156),
(58, 14, 'onions', 'בצל', 0, 157),
(59, 14, 'Pickles', 'חמוצים', 0, 158),
(60, 14, 'fried onions', 'בצל מטוגן', 0, 159),
(61, 3, 'Ketchup', 'קטשופ', 0, 160),
(62, 3, 'BBQ', 'ברביקיו', 0, 161),
(63, 3, 'Thousand island', 'אלף האיים', 0, 162),
(64, 3, 'Garlic Mayo', 'רוטב שום', 0, 163),
(65, 3, 'sweet chilli', 'צ''ילי מתוק', 0, 164),
(66, 3, 'spicy chilli', 'צ''ילי חריף', 0, 165),
(67, 3, 'jalpeño', 'חלפניו', 0, 166),
(68, 3, 'pickled spicy pepper', 'פלפל חריף כבוש', 0, 167),
(69, 3, 'herb', 'עשבי תיבול', 0, 168),
(70, 6, 'Ketchup', 'קטשופ', 0, 169),
(71, 6, 'BBQ', 'ברביקיו', 0, 170),
(72, 6, 'Thousand island', 'אלף האיים', 0, 171),
(73, 6, 'Garlic Mayo', 'רוטב שום', 0, 172),
(74, 6, 'sweet chilli', 'צ''ילי מתוק', 0, 173),
(75, 6, 'spicy chilli', 'צ''ילי חריף', 0, 174),
(76, 6, 'jalpeño', 'חלפניו', 0, 175),
(77, 6, 'pickled spicy pepper', 'פלפל חריף כבוש', 0, 176),
(78, 6, 'herb', 'עשבי תיבול', 0, 177),
(79, 9, 'Ketchup', 'קטשופ', 0, 178),
(80, 9, 'BBQ', 'ברביקיו', 0, 179),
(81, 9, 'Thousand island', 'אלף האיים', 0, 180),
(82, 9, 'Garlic Mayo', 'רוטב שום', 0, 181),
(83, 9, 'sweet chilli', 'צ''ילי מתוק', 0, 182),
(84, 9, 'spicy chilli', 'צ''ילי חריף', 0, 183),
(85, 9, 'jalpeño', 'חלפניו', 0, 184),
(86, 9, 'pickled spicy pepper', 'פלפל חריף כבוש', 0, 185),
(87, 9, 'herb', 'עשבי תיבול', 0, 186),
(88, 12, 'Ketchup', 'קטשופ', 0, 187),
(89, 12, 'BBQ', 'ברביקיו', 0, 188),
(90, 12, 'Thousand island', 'אלף האיים', 0, 189),
(91, 12, 'Garlic Mayo', 'רוטב שום', 0, 190),
(92, 12, 'sweet chilli', 'צ''ילי מתוק', 0, 191),
(93, 12, 'spicy chilli', 'צ''ילי חריף', 0, 192),
(94, 12, 'jalpeño', 'חלפניו', 0, 193),
(95, 12, 'pickled spicy pepper', 'פלפל חריף כבוש', 0, 194),
(96, 12, 'herb', 'עשבי תיבול', 0, 195),
(97, 15, 'Ketchup', 'קטשופ', 0, 196),
(98, 15, 'BBQ', 'ברביקיו', 0, 197),
(99, 15, 'Thousand island', 'אלף האיים', 0, 198),
(100, 15, 'Garlic Mayo', 'רוטב שום', 0, 199),
(101, 15, 'sweet chilli', 'צ''ילי מתוק', 0, 200),
(102, 15, 'spicy chilli', 'צ''ילי חריף', 0, 201),
(103, 15, 'jalpeño', 'חלפניו', 0, 202),
(104, 15, 'pickled spicy pepper', 'פלפל חריף כבוש', 0, 203),
(105, 15, 'herb', 'עשבי תיבול', 0, 204),
(106, 18, 'Ketchup', 'קטשופ', 0, 205),
(107, 18, 'BBQ', 'ברביקיו', 0, 206),
(108, 18, 'Thousand island', 'אלף האיים', 0, 207),
(109, 18, 'Garlic Mayo', 'רוטב שום', 0, 208),
(110, 18, 'sweet chilli', 'צ''ילי מתוק', 0, 209),
(111, 18, 'spicy chilli', 'צ''ילי חריף', 0, 210),
(112, 18, 'jalpeño', 'חלפניו', 0, 211),
(113, 18, 'pickled spicy pepper', 'פלפל חריף כבוש', 0, 212),
(114, 18, 'herb', 'עשבי תיבול', 0, 213),
(115, 21, 'Ketchup', 'קטשופ', 0, 214),
(116, 21, 'BBQ', 'ברביקיו', 0, 215),
(117, 21, 'Thousand island', 'אלף האיים', 0, 216),
(118, 21, 'Garlic Mayo', 'רוטב שום', 0, 217),
(119, 21, 'sweet chilli', 'צ''ילי מתוק', 0, 218),
(120, 21, 'spicy chilli', 'צ''ילי חריף', 0, 219),
(121, 21, 'jalpeño', 'חלפניו', 0, 220),
(122, 21, 'pickled spicy pepper', 'פלפל חריף כבוש', 0, 221),
(123, 21, 'herb', 'עשבי תיבול', 0, 222),
(124, 24, 'Ketchup', 'קטשופ', 0, 223),
(125, 24, 'BBQ', 'ברביקיו', 0, 224),
(126, 24, 'Thousand island', 'אלף האיים', 0, 225),
(127, 24, 'Garlic Mayo', 'רוטב שום', 0, 226),
(128, 24, 'sweet chilli', 'צ''ילי מתוק', 0, 227),
(129, 24, 'spicy chilli', 'צ''ילי חריף', 0, 228),
(130, 24, 'jalpeño', 'חלפניו', 0, 229),
(131, 24, 'pickled spicy pepper', 'פלפל חריף כבוש', 0, 230),
(132, 24, 'herb', 'עשבי תיבול', 0, 231),
(133, 27, 'Ketchup', 'קטשופ', 0, 232),
(134, 27, 'BBQ', 'ברביקיו', 0, 233),
(135, 27, 'Thousand island', 'אלף האיים', 0, 234),
(136, 27, 'Garlic Mayo', 'רוטב שום', 0, 235),
(137, 27, 'sweet chilli', 'צ''ילי מתוק', 0, 236),
(138, 27, 'spicy chilli', 'צ''ילי חריף', 0, 237),
(139, 27, 'jalpeño', 'חלפניו', 0, 238),
(140, 27, 'pickled spicy pepper', 'פלפל חריף כבוש', 0, 239),
(141, 27, 'herb', 'עשבי תיבול', 0, 240),
(142, 30, 'Ketchup', 'קטשופ', 0, 241),
(143, 30, 'BBQ', 'ברביקיו', 0, 242),
(144, 30, 'Thousand island', 'אלף האיים', 0, 243),
(145, 30, 'Garlic Mayo', 'רוטב שום', 0, 244),
(146, 30, 'sweet chilli', 'צ''ילי מתוק', 0, 245),
(147, 30, 'spicy chilli', 'צ''ילי חריף', 0, 246),
(148, 30, 'jalpeño', 'חלפניו', 0, 247),
(149, 30, 'pickled spicy pepper', 'פלפל חריף כבוש', 0, 248),
(150, 30, 'herb', 'עשבי תיבול', 0, 249),
(151, 33, 'Ketchup', 'קטשופ', 0, 250),
(152, 33, 'BBQ', 'ברביקיו', 0, 251),
(153, 33, 'Thousand island', 'אלף האיים', 0, 252),
(154, 33, 'Garlic Mayo', 'רוטב שום', 0, 253),
(155, 33, 'sweet chilli', 'צ''ילי מתוק', 0, 254),
(156, 33, 'spicy chilli', 'צ''ילי חריף', 0, 255),
(157, 33, 'jalpeño', 'חלפניו', 0, 256),
(158, 33, 'pickled spicy pepper', 'פלפל חריף כבוש', 0, 257),
(159, 33, 'herb', 'עשבי תיבול', 0, 258),
(160, 2, '50g Goose Breast', '50 גר'' חזה אווז', 8, 259),
(161, 2, 'Egg', 'ביצה', 4, 260),
(162, 2, 'Portobello Mushroom', 'פורטובלו', 4, 261),
(163, 5, 'Egg', 'ביצה', 4, 262),
(164, 5, 'Portobello Mushroom', 'פורטובלו', 4, 263),
(165, 8, 'Egg', 'ביצה', 4, 264),
(166, 8, 'Portobello Mushroom', 'פורטובלו', 4, 265),
(167, 11, 'Egg', 'ביצה', 4, 266),
(168, 11, 'Portobello Mushroom', 'פורטובלו', 4, 267),
(169, 14, '50 grams goose breast', '50 גר'' חזה אווז', 8, 268),
(170, 14, '150 grams goose breast or entrecote', '150 גר'' חזה אווז או אנטריקוט', 19, 269),
(171, 14, 'egg', 'ביצה', 4, 270),
(172, 14, 'portobello mushroom', 'פורטובלו', 4, 271),
(173, 17, '50 grams goose breast', '50 גר'' חזה אווז', 8, 272),
(174, 17, 'egg', 'ביצה', 4, 273),
(175, 17, 'portobello mushroom', 'פורטובלו', 4, 274),
(176, 20, '50 grams goose breast', '50 גר'' חזה אווז', 8, 275),
(177, 20, 'egg', 'ביצה', 4, 276),
(178, 20, 'portobello mushroom', 'פורטובלו', 4, 277),
(179, 23, '50 grams goose breast', '50 גר'' חזה אווז', 8, 278),
(180, 23, 'egg', 'ביצה', 4, 279),
(181, 23, 'portobello mushroom', 'פורטובלו', 4, 280),
(182, 26, '50 grams goose breast', '50 גר'' חזה אווז', 8, 281),
(183, 26, 'egg', 'ביצה', 4, 282),
(184, 26, 'portobello mushroom', 'פורטובלו', 4, 283),
(185, 29, 'portobello mushroom', 'פורטובלו', 4, 284),
(186, 35, '80 grams goose liver', '80 גר'' כבד אווז', 30, 285),
(187, 35, '150 grams goose breast or entrecote', '150 גרם חזה אווז או אטנריקוט', 19, 286),
(188, 38, '170 grams chicken breast', '170 גר'' חזה עוף', 18, 287),
(189, 38, 'egg', 'ביצה', 4, 288),
(190, 38, 'portobello mushroom', 'פורטובלו', 4, 289),
(191, 41, 'Onions', 'בצל', 5, 290),
(192, 41, 'Mushrooms', 'פטריות', 5, 291),
(193, 41, 'Olives', 'זיתים', 5, 292),
(194, 41, 'Tomatoes', 'עגבניות', 5, 293),
(195, 41, 'Corn', 'תירס', 5, 294),
(196, 41, 'Vegan Cheese', 'גבינה טבעונית', 10, 295),
(197, 41, 'Egg', 'ביצה', 1, 296),
(198, 43, 'Onions', 'בצל', 0, 297),
(199, 43, 'Mushrooms', 'פטריות', 0, 298),
(200, 43, 'Olives', 'זיתים', 0, 299),
(201, 43, 'Tomatoes', 'עגבניות', 0, 300),
(202, 43, 'Corn', 'תירס', 0, 301),
(203, 43, 'Vegan Cheese', 'גבינה טבעונית', 0, 302),
(204, 43, 'Egg', 'ביצה', 1, 303),
(205, 45, 'Onions', 'בצל', 5, 304),
(206, 45, 'Mushrooms', 'פטריות', 5, 305),
(207, 45, 'Olives', 'זיתים', 5, 306),
(208, 45, 'Tomatoes', 'עגבניות', 5, 307),
(209, 45, 'Corn', 'תירס', 5, 308),
(210, 45, 'Vegan Cheese', 'גבינה טבעונית', 10, 309),
(211, 45, 'Egg', 'ביצה', 1, 310),
(212, 47, 'Onions', 'בצל', 5, 311),
(213, 47, 'Mushrooms', 'פטריות', 5, 312),
(214, 47, 'Olives', 'זיתים', 5, 313),
(215, 47, 'Tomatoes', 'עגבניות', 5, 314),
(216, 47, 'Corn', 'תירס', 5, 315),
(217, 47, 'Vegan Cheese', 'גבינה טבעונית', 10, 316),
(218, 47, 'Onions', 'בצל', 5, 317),
(219, 47, 'Mushrooms', 'פטריות', 5, 318),
(220, 47, 'Olives', 'זיתים', 5, 319),
(221, 47, 'Tomatoes', 'עגבניות', 5, 320),
(222, 47, 'Corn', 'תירס', 5, 321),
(223, 47, 'Vegan Cheese', 'גבינה טבעונית', 10, 322),
(224, 49, 'Onions', 'בצל', 5, 323),
(225, 49, 'Mushrooms', 'פטריות', 5, 324),
(226, 49, 'Olives', 'זיתים', 5, 325),
(227, 49, 'Tomatoes', 'עגבניות', 5, 326),
(228, 49, 'Corn', 'תירס', 5, 327),
(229, 49, 'Vegan Cheese', 'גבינה טבעונית', 10, 328),
(230, 51, 'Onions', 'בצל', 5, 329),
(231, 51, 'Mushrooms', 'פטריות', 5, 330),
(232, 51, 'Olives', 'זיתים', 5, 331),
(233, 51, 'Tomatoes', 'עגבניות', 5, 332),
(234, 51, 'Corn', 'תירס', 5, 333),
(235, 51, 'Vegan Cheese', 'גבינה טבעונית', 10, 334),
(236, 51, 'Egg', 'ביצה', 1, 335),
(237, 53, 'Onions', 'בצל', 5, 336),
(238, 53, 'Mushrooms', 'פטריות', 5, 337),
(239, 53, 'Olives', 'זיתים', 5, 338),
(240, 53, 'Tomatoes', 'עגבניות', 5, 339),
(241, 53, 'Corn', 'תירס', 5, 340),
(242, 53, 'Vegan Cheese', 'גבינה טבעונית', 10, 341),
(243, 53, 'Egg', 'ביצה', 1, 342),
(244, 55, 'Onions', 'בצל', 5, 343),
(245, 55, 'Mushrooms', 'פטריות', 5, 344),
(246, 55, 'Olives', 'זיתים', 5, 345),
(247, 55, 'Tomatoes', 'עגבניות', 5, 346),
(248, 55, 'Corn', 'תירס', 5, 347),
(249, 55, 'Vegan Cheese', 'גבינה טבעונית', 10, 348),
(250, 55, 'Egg', 'ביצה', 1, 349),
(251, 57, 'Onions', 'בצל', 5, 350),
(252, 57, 'Mushrooms', 'פטריות', 5, 351),
(253, 57, 'Olives', 'זיתים', 5, 352),
(254, 57, 'Tomatoes', 'עגבניות', 5, 353),
(255, 57, 'Corn', 'תירס', 5, 354),
(256, 57, 'Vegan Cheese', 'גבינה טבעונית', 10, 355),
(257, 57, 'Egg', 'ביצה', 1, 356),
(258, 59, 'Onions', 'בצל', 5, 357),
(259, 59, 'Mushrooms', 'פטריות', 5, 358),
(260, 59, 'Olives', 'זיתים', 5, 359),
(261, 59, 'Tomatoes', 'עגבניות', 5, 360),
(262, 59, 'Corn', 'תירס', 5, 361),
(263, 59, 'Vegan Cheese', 'גבינה טבעונית', 10, 362),
(264, 59, 'Egg', 'ביצה', 1, 363),
(265, 61, 'Onions', 'בצל', 5, 364),
(266, 61, 'Mushrooms', 'פטריות', 5, 365),
(267, 61, 'Olives', 'זיתים', 5, 366),
(268, 61, 'Tomatoes', 'עגבניות', 5, 367),
(269, 61, 'Corn', 'תירס', 5, 368),
(270, 61, 'Vegan Cheese', 'גבינה טבעונית', 10, 369),
(271, 61, 'Egg', 'ביצה', 1, 370),
(272, 63, 'Onions', 'בצל', 5, 371),
(273, 63, 'Mushrooms', 'פטריות', 5, 372),
(274, 63, 'Olives', 'זיתים', 5, 373),
(275, 63, 'Tomatoes', 'עגבניות', 5, 374),
(276, 63, 'Corn', 'תירס', 5, 375),
(277, 63, 'Vegan Cheese', 'גבינה טבעונית', 10, 376),
(278, 63, 'Egg', 'ביצה', 1, 377),
(279, 65, 'Onions', 'בצל', 5, 378),
(280, 65, 'Mushrooms', 'פטריות', 5, 379),
(281, 65, 'Olives', 'זיתים', 5, 380),
(282, 65, 'Tomatoes', 'עגבניות', 5, 381),
(283, 65, 'Corn', 'תירס', 5, 382),
(284, 65, 'Vegan Cheese', 'גבינה טבעונית', 10, 383),
(285, 65, 'Egg', 'ביצה', 1, 384),
(286, 67, 'Penne', 'פנה', 0, 385),
(287, 67, 'Linguine', 'לינגוויני', 0, 386),
(288, 67, 'Fettuccine', 'לינגוויני', 0, 387),
(289, 68, 'Onions', 'בצל', 5, 388),
(290, 68, 'Mushrooms', 'פטריות', 5, 389),
(291, 68, 'Olives', 'זיתים', 5, 390),
(292, 68, 'Tomatoes', 'עגבניות', 5, 391),
(293, 68, 'Corn', 'תירס', 5, 392),
(294, 68, 'Vegan Cheese', 'גבינה טבעונית', 10, 393),
(295, 68, 'Egg', 'ביצה', 1, 394),
(296, 70, 'Penne', 'פנה', 0, 395),
(297, 70, 'Linguine', 'לינגוויני', 0, 396),
(298, 70, 'Fettuccine', 'לינגוויני', 0, 397),
(299, 71, 'Onions', 'בצל', 5, 398),
(300, 71, 'Mushrooms', 'פטריות', 5, 399),
(301, 71, 'Olives', 'זיתים', 5, 400),
(302, 71, 'Tomatoes', 'עגבניות', 5, 401),
(303, 71, 'Corn', 'תירס', 5, 402),
(304, 71, 'Vegan Cheese', 'גבינה טבעונית', 10, 403),
(305, 71, 'Egg', 'ביצה', 1, 404),
(306, 73, 'Penne', 'פנה', 0, 405),
(307, 73, 'Linguine', 'לינגוויני', 0, 406),
(308, 73, 'Fettuccine', 'לינגוויני', 0, 407),
(309, 74, 'Onions', 'בצל', 5, 408),
(310, 74, 'Mushrooms', 'פטריות', 5, 409),
(311, 74, 'Olives', 'זיתים', 5, 410),
(312, 74, 'Tomatoes', 'עגבניות', 5, 411),
(313, 74, 'Corn', 'תירס', 5, 412),
(314, 74, 'Vegan Cheese', 'גבינה טבעונית', 10, 413),
(315, 74, 'Egg', 'ביצה', 1, 414),
(316, 76, 'Penne', 'פנה', 0, 415),
(317, 76, 'Linguine', 'לינגוויני', 0, 416),
(318, 76, 'Fettuccine', 'לינגוויני', 0, 417),
(319, 77, 'Onions', 'בצל', 5, 418),
(320, 77, 'Mushrooms', 'פטריות', 5, 419),
(321, 77, 'Olives', 'זיתים', 5, 420),
(322, 77, 'Tomatoes', 'עגבניות', 5, 421),
(323, 77, 'Corn', 'תירס', 5, 422),
(324, 77, 'Vegan Cheese', 'גבינה טבעונית', 10, 423),
(325, 77, 'Egg', 'ביצה', 1, 424),
(326, 79, 'Penne', 'פנה', 0, 425),
(327, 79, 'Linguine', 'לינגוויני', 0, 426),
(328, 79, 'Fettuccine', 'לינגוויני', 0, 427),
(329, 80, 'Onions', 'בצל', 5, 428),
(330, 80, 'Mushrooms', 'פטריות', 5, 429),
(331, 80, 'Olives', 'זיתים', 5, 430),
(332, 80, 'Tomatoes', 'עגבניות', 5, 431),
(333, 80, 'Corn', 'תירס', 5, 432),
(334, 80, 'Vegan Cheese', 'גבינה טבעונית', 10, 433),
(335, 80, 'Egg', 'ביצה', 1, 434),
(336, 82, 'Onions', 'בצל', 5, 435),
(337, 82, 'Mushrooms', 'פטריות', 5, 436),
(338, 82, 'Olives', 'זיתים', 5, 437),
(339, 82, 'Tomatoes', 'עגבניות', 5, 438),
(340, 82, 'Corn', 'תירס', 5, 439),
(341, 82, 'Vegan Cheese', 'גבינה טבעונית', 10, 440),
(342, 82, 'Egg', 'ביצה', 1, 441),
(343, 84, 'Onions', 'בצל', 5, 442),
(344, 84, 'Mushrooms', 'פטריות', 5, 443),
(345, 84, 'Olives', 'זיתים', 5, 444),
(346, 84, 'Tomatoes', 'עגבניות', 5, 445),
(347, 84, 'Corn', 'תירס', 5, 446),
(348, 84, 'Vegan Cheese', 'גבינה טבעונית', 10, 447),
(349, 84, 'Egg', 'ביצה', 1, 448),
(350, 86, 'Onions', 'בצל', 5, 449),
(351, 86, 'Mushrooms', 'פטריות', 5, 450),
(352, 86, 'Olives', 'זיתים', 5, 451),
(353, 86, 'Tomatoes', 'עגבניות', 5, 452),
(354, 86, 'Corn', 'תירס', 5, 453),
(355, 86, 'Vegan Cheese', 'גבינה טבעונית', 10, 454),
(356, 86, 'Egg', 'ביצה', 1, 455),
(357, 88, 'Onions', 'בצל', 5, 456),
(358, 88, 'Mushrooms', 'פטריות', 5, 457),
(359, 88, 'Olives', 'זיתים', 5, 458),
(360, 88, 'Tomatoes', 'עגבניות', 5, 459),
(361, 88, 'Corn', 'תירס', 5, 460),
(362, 88, 'Vegan Cheese', 'גבינה טבעונית', 10, 461),
(363, 88, 'Egg', 'ביצה', 1, 462),
(364, 90, 'Onions', 'בצל', 5, 463),
(365, 90, 'Mushrooms', 'פטריות', 5, 464),
(366, 90, 'Olives', 'זיתים', 5, 465),
(367, 90, 'Tomatoes', 'עגבניות', 5, 466),
(368, 90, 'Corn', 'תירס', 5, 467),
(369, 90, 'Vegan Cheese', 'גבינה טבעונית', 10, 468),
(370, 90, 'Egg', 'ביצה', 1, 469),
(371, 105, 'Pita', 'פיתה', 33, 470),
(372, 105, 'Baguette', 'בגט', 39, 471),
(373, 105, 'Laffa', 'לאפה', 39, 472),
(374, 105, 'Plate', 'צלחת', 45, 473),
(375, 106, 'Veal', 'בשר עגל', 0, 474),
(376, 106, 'Spring Chicken', 'פרגיות', 0, 475),
(377, 106, 'Mix', 'מעורב', 0, 476),
(378, 107, 'French Fries', 'צ''יפס', 0, 477),
(379, 107, 'Fried onions', 'בצל מטוגן', 0, 478),
(380, 107, 'Tomatoes', 'עגבניות', 0, 479),
(381, 107, 'Roasted Peppers', 'פלפל על האש', 0, 480),
(382, 108, 'Techina', 'טחינה', 0, 481),
(383, 108, 'Chummus', 'חומוס', 0, 482),
(384, 108, 'Amba', 'אמבה', 0, 483),
(385, 108, 'Spicy', 'חריף', 0, 484),
(386, 108, 'Babaghanoush', 'באבא גנוש', 0, 485),
(387, 110, 'Pita', 'פיתה', 35, 486),
(388, 110, 'Baguette', 'בגט', 39, 487),
(389, 110, 'Laffa', 'לאפה', 39, 488),
(390, 110, 'Plate', 'צלחת', 49, 489),
(391, 111, 'Veal', 'בשר עגל', 0, 490),
(392, 111, 'Spring Chicken', 'פרגיות', 0, 491),
(393, 111, 'Mix', 'מעורב', 0, 492),
(394, 112, 'French Fries', 'צ''יפס', 0, 493),
(395, 112, 'Fried onions', 'בצל מטוגן', 0, 494),
(396, 112, 'Tomatoes', 'עגבניות', 0, 495),
(397, 112, 'Roasted Peppers', 'פלפל על האש', 0, 496),
(398, 113, 'Techina', 'טחינה', 0, 497),
(399, 113, 'Chummus', 'חומוס', 0, 498),
(400, 113, 'Amba', 'אמבה', 0, 499),
(401, 113, 'Spicy', 'חריף', 0, 500),
(402, 113, 'Babaghanoush', 'באבא גנוש', 0, 501),
(403, 115, 'Pita', 'פיתה', 33, 502),
(404, 115, 'Baguette', 'בגט', 39, 503),
(405, 115, 'Laffa', 'לאפה', 39, 504),
(406, 115, 'Plate', 'צלחת', 45, 505),
(407, 116, 'Veal', 'בשר עגל', 0, 506),
(408, 116, 'Spring Chicken', 'פרגיות', 0, 507),
(409, 116, 'Mix', 'מעורב', 0, 508),
(410, 117, 'French Fries', 'צ''יפס', 0, 509),
(411, 117, 'Fried onions', 'בצל מטוגן', 0, 510),
(412, 117, 'Tomatoes', 'עגבניות', 0, 511),
(413, 117, 'Roasted Peppers', 'פלפל על האש', 0, 512),
(414, 118, 'Techina', 'טחינה', 0, 513),
(415, 118, 'Chummus', 'חומוס', 0, 514),
(416, 118, 'Amba', 'אמבה', 0, 515),
(417, 118, 'Spicy', 'חריף', 0, 516),
(418, 118, 'Babaghanoush', 'באבא גנוש', 0, 517),
(419, 120, 'Pita', 'פיתה', 35, 518),
(420, 120, 'Baguette', 'בגט', 39, 519),
(421, 120, 'Laffa', 'לאפה', 39, 520),
(422, 120, 'Plate', 'צלחת', 45, 521),
(423, 121, 'Veal', 'בשר עגל', 0, 522),
(424, 121, 'Spring Chicken', 'פרגיות', 0, 523),
(425, 121, 'Mix', 'מעורב', 0, 524),
(426, 122, 'French Fries', 'צ''יפס', 0, 525),
(427, 122, 'Fried onions', 'בצל מטוגן', 0, 526),
(428, 122, 'Tomatoes', 'עגבניות', 0, 527),
(429, 122, 'Roasted Peppers', 'פלפל על האש', 0, 528),
(430, 123, 'Techina', 'טחינה', 0, 529),
(431, 123, 'Chummus', 'חומוס', 0, 530),
(432, 123, 'Amba', 'אמבה', 0, 531),
(433, 123, 'Spicy', 'חריף', 0, 532),
(434, 123, 'Babaghanoush', 'באבא גנוש', 0, 533),
(435, 125, 'Pita', 'פיתה', 35, 534),
(436, 125, 'Baguette', 'בגט', 39, 535),
(437, 125, 'Laffa', 'לאפה', 39, 536),
(438, 125, 'Plate', 'צלחת', 45, 537),
(439, 126, 'Veal', 'בשר עגל', 0, 538),
(440, 126, 'Spring Chicken', 'פרגיות', 0, 539),
(441, 126, 'Mix', 'מעורב', 0, 540),
(442, 127, 'French Fries', 'צ''יפס', 0, 541),
(443, 127, 'Fried onions', 'בצל מטוגן', 0, 542),
(444, 127, 'Tomatoes', 'עגבניות', 0, 543),
(445, 127, 'Roasted Peppers', 'פלפל על האש', 0, 544),
(446, 128, 'Techina', 'טחינה', 0, 545),
(447, 128, 'Chummus', 'חומוס', 0, 546),
(448, 128, 'Amba', 'אמבה', 0, 547),
(449, 128, 'Spicy', 'חריף', 0, 548),
(450, 128, 'Babaghanoush', 'באבא גנוש', 0, 549),
(451, 130, 'Pita', 'פיתה', 35, 550),
(452, 130, 'Baguette', 'בגט', 39, 551),
(453, 130, 'Laffa', 'לאפה', 39, 552),
(454, 130, 'Plate', 'צלחת', 45, 553),
(455, 131, 'Veal', 'בשר עגל', 0, 554),
(456, 131, 'Spring Chicken', 'פרגיות', 0, 555),
(457, 131, 'Mix', 'מעורב', 0, 556),
(458, 132, 'French Fries', 'צ''יפס', 0, 557),
(459, 132, 'Fried onions', 'בצל מטוגן', 0, 558),
(460, 132, 'Tomatoes', 'עגבניות', 0, 559),
(461, 132, 'Roasted Peppers', 'פלפל על האש', 0, 560),
(462, 133, 'Techina', 'טחינה', 0, 561),
(463, 133, 'Chummus', 'חומוס', 0, 562),
(464, 133, 'Amba', 'אמבה', 0, 563),
(465, 133, 'Spicy', 'חריף', 0, 564),
(466, 133, 'Babaghanoush', 'באבא גנוש', 0, 565),
(467, 135, 'Pita', 'פיתה', 33, 566),
(468, 135, 'Baguette', 'בגט', 39, 567),
(469, 135, 'Laffa', 'לאפה', 39, 568),
(470, 135, 'Plate', 'צלחת', 45, 569),
(471, 136, 'Veal', 'בשר עגל', 0, 570),
(472, 136, 'Spring Chicken', 'פרגיות', 0, 571),
(473, 136, 'Mix', 'מעורב', 0, 572),
(474, 137, 'French Fries', 'צ''יפס', 0, 573),
(475, 137, 'Fried onions', 'בצל מטוגן', 0, 574),
(476, 137, 'Tomatoes', 'עגבניות', 0, 575),
(477, 137, 'Roasted Peppers', 'פלפל על האש', 0, 576),
(478, 138, 'Techina', 'טחינה', 0, 577),
(479, 138, 'Chummus', 'חומוס', 0, 578),
(480, 138, 'Amba', 'אמבה', 0, 579),
(481, 138, 'Spicy', 'חריף', 0, 580),
(482, 138, 'Babaghanoush', 'באבא גנוש', 0, 581),
(483, 140, 'Veal', 'בשר עגל', 0, 582),
(484, 140, 'Spring Chicken', 'פרגיות', 0, 583),
(485, 140, 'Mix', 'מעורב', 0, 584),
(486, 141, 'French Fries', 'צ''יפס', 0, 585),
(487, 141, 'Fried onions', 'בצל מטוגן', 0, 586),
(488, 141, 'Tomatoes', 'עגבניות', 0, 587),
(489, 141, 'Roasted Peppers', 'פלפל על האש', 0, 588),
(490, 142, 'Techina', 'טחינה', 0, 589),
(491, 142, 'Chummus', 'חומוס', 0, 590),
(492, 142, 'Amba', 'אמבה', 0, 591),
(493, 142, 'Spicy', 'חריף', 0, 592),
(494, 142, 'Babaghanoush', 'באבא גנוש', 0, 593),
(495, 144, 'Veal', 'בשר עגל', 0, 594),
(496, 144, 'Spring Chicken', 'פרגיות', 0, 595),
(497, 144, 'Mix', 'מעורב', 0, 596),
(498, 145, 'French Fries', 'צ''יפס', 0, 597),
(499, 145, 'Fried onions', 'בצל מטוגן', 0, 598),
(500, 145, 'Tomatoes', 'עגבניות', 0, 599),
(501, 145, 'Roasted Peppers', 'פלפל על האש', 0, 600),
(502, 146, 'Techina', 'טחינה', 0, 601),
(503, 146, 'Chummus', 'חומוס', 0, 602),
(504, 146, 'Amba', 'אמבה', 0, 603),
(505, 146, 'Spicy', 'חריף', 0, 604),
(506, 146, 'Babaghanoush', 'באבא גנוש', 0, 605),
(507, 148, 'Veal', 'בשר עגל', 0, 606),
(508, 148, 'Spring Chicken', 'פרגיות', 0, 607),
(509, 148, 'Mix', 'מעורב', 0, 608),
(510, 149, 'French Fries', 'צ''יפס', 0, 609),
(511, 149, 'Fried onions', 'בצל מטוגן', 0, 610),
(512, 149, 'Tomatoes', 'עגבניות', 0, 611),
(513, 149, 'Roasted Peppers', 'פלפל על האש', 0, 612),
(514, 150, 'Techina', 'טחינה', 0, 613),
(515, 150, 'Chummus', 'חומוס', 0, 614),
(516, 150, 'Amba', 'אמבה', 0, 615),
(517, 150, 'Spicy', 'חריף', 0, 616),
(518, 150, 'Babaghanoush', 'באבא גנוש', 0, 617),
(519, 154, 'Veal', 'בשר עגל', 0, 618),
(520, 154, 'Spring Chicken', 'פרגיות', 0, 619),
(521, 154, 'Mix', 'מעורב', 0, 620),
(522, 155, 'Lettuce', 'חסה', 0, 621),
(523, 155, 'Tomatoes', 'עגבניות', 0, 622),
(524, 155, 'Pickles', 'חמוץ', 0, 623),
(525, 155, 'Pickled Jalapeño', 'חלפיניו כבושים', 0, 624),
(526, 156, 'Pesto', 'פסטו', 0, 625),
(527, 156, 'Chimichurri', 'צ''ימיצ''ורי', 0, 626),
(528, 156, 'Ketchup', 'קטשופ', 0, 627),
(529, 156, 'Mustard', 'חרדל', 0, 628),
(530, 156, 'Tehina', 'טחינה', 0, 629),
(531, 156, 'Salsa', 'סלסה', 0, 630),
(532, 156, 'Dijon mustard and mayo mix', 'חרדל דיז''ון ומיונז', 0, 631),
(533, 156, 'Sweet chili', 'צ''ילי מתוק', 0, 632),
(534, 156, 'Hot peppers spread', 'ממרח פלפלים', 0, 633),
(535, 156, 'BBQ', 'מנגל', 0, 634),
(536, 157, 'Guacamole', 'סלט אבוקדו', 5, 635),
(537, 157, 'Fried egg', 'ביצה מטוגנת', 7, 636),
(538, 157, 'Portobello mushroom', 'פטריות פורטובלו אווז', 8, 637),
(539, 158, 'Roza Deal : Upgrade to a meal including chips onion rings and a drink', 'רוזה דיל : שדרוג לארוחה הכוללת צ''יפס / טבעות בצל ובקבוק שתיה ', 23, 638),
(540, 159, 'Lettuce', 'חסה', 0, 639),
(541, 159, 'Tomatoes', 'עגבניות', 0, 640),
(542, 159, 'Pickles', 'חמוץ', 0, 641),
(543, 159, 'Pickled Jalapeño', 'חלפיניו כבושים', 0, 642),
(544, 160, 'Pesto', 'פסטו', 0, 643),
(545, 160, 'Chimichurri', 'צ''ימיצ''ורי', 0, 644),
(546, 160, 'Ketchup', 'קטשופ', 0, 645),
(547, 160, 'Mustard', 'חרדל', 0, 646),
(548, 160, 'Tehina', 'טחינה', 0, 647),
(549, 160, 'Salsa', 'סלסה', 0, 648),
(550, 160, 'Dijon mustard and mayo mix', 'חרדל דיז''ון ומיונז', 0, 649),
(551, 160, 'Sweet chili', 'צ''ילי מתוק', 0, 650),
(552, 160, 'Hot peppers spread', 'ממרח פלפלים', 0, 651),
(553, 160, 'BBQ', 'מנגל', 0, 652),
(554, 161, 'Guacamole', 'סלט אבוקדו', 5, 653),
(555, 161, 'Fried egg', 'ביצה מטוגנת', 7, 654),
(556, 161, 'Portobello mushroom', 'פטריות פורטובלו אווז', 8, 655),
(557, 162, 'Roza Deal : Upgrade to a meal including chips onion rings and a drink', 'רוזה דיל : שדרוג לארוחה הכוללת צ''יפס / טבעות בצל ובקבוק שתיה ', 23, 656),
(558, 163, 'Lettuce', 'חסה', 0, 657),
(559, 163, 'Tomatoes', 'עגבניות', 0, 658),
(560, 163, 'Pickles', 'חמוץ', 0, 659),
(561, 163, 'Pickled Jalapeño', 'חלפיניו כבושים', 0, 660),
(562, 164, 'Pesto', 'פסטו', 0, 661),
(563, 164, 'Chimichurri', 'צ''ימיצ''ורי', 0, 662),
(564, 164, 'Ketchup', 'קטשופ', 0, 663),
(565, 164, 'Mustard', 'חרדל', 0, 664),
(566, 164, 'Tehina', 'טחינה', 0, 665),
(567, 164, 'Salsa', 'סלסה', 0, 666),
(568, 164, 'Dijon mustard and mayo mix', 'חרדל דיז''ון ומיונז', 0, 667),
(569, 164, 'Sweet chili', 'צ''ילי מתוק', 0, 668),
(570, 164, 'Hot peppers spread', 'ממרח פלפלים', 0, 669),
(571, 164, 'BBQ', 'מנגל', 0, 670),
(572, 165, 'Guacamole', 'סלט אבוקדו', 5, 671),
(573, 165, 'Fried egg', 'ביצה מטוגנת', 7, 672),
(574, 165, 'Portobello mushroom', 'פטריות פורטובלו אווז', 8, 673),
(575, 166, 'Roza Deal : Upgrade to a meal including chips onion rings and a drink', 'רוזה דיל : שדרוג לארוחה הכוללת צ''יפס / טבעות בצל ובקבוק שתיה ', 23, 674),
(576, 167, 'Lettuce', 'חסה', 0, 675),
(577, 167, 'Tomatoes', 'עגבניות', 0, 676),
(578, 167, 'Pickles', 'חמוץ', 0, 677),
(579, 167, 'Pickled Jalapeño', 'חלפיניו כבושים', 0, 678),
(580, 168, 'Pesto', 'פסטו', 0, 679),
(581, 168, 'Chimichurri', 'צ''ימיצ''ורי', 0, 680),
(582, 168, 'Ketchup', 'קטשופ', 0, 681),
(583, 168, 'Mustard', 'חרדל', 0, 682),
(584, 168, 'Tehina', 'טחינה', 0, 683),
(585, 168, 'Salsa', 'סלסה', 0, 684),
(586, 168, 'Dijon mustard and mayo mix', 'חרדל דיז''ון ומיונז', 0, 685),
(587, 168, 'Sweet chili', 'צ''ילי מתוק', 0, 686),
(588, 168, 'Hot peppers spread', 'ממרח פלפלים', 0, 687),
(589, 168, 'BBQ', 'מנגל', 0, 688),
(590, 169, 'Guacamole', 'סלט אבוקדו', 5, 689),
(591, 169, 'Fried egg', 'ביצה מטוגנת', 7, 690),
(592, 169, 'Portobello mushroom', 'פטריות פורטובלו אווז', 8, 691),
(593, 170, 'Roza Deal : Upgrade to a meal including chips onion rings and a drink', 'רוזה דיל : שדרוג לארוחה הכוללת צ''יפס / טבעות בצל ובקבוק שתיה ', 23, 692),
(594, 171, 'Lettuce', 'חסה', 0, 693),
(595, 171, 'Tomatoes', 'עגבניות', 0, 694),
(596, 171, 'Pickles', 'חמוץ', 0, 695),
(597, 171, 'Pickled Jalapeño', 'חלפיניו כבושים', 0, 696),
(598, 172, 'Pesto', 'פסטו', 0, 697),
(599, 172, 'Chimichurri', 'צ''ימיצ''ורי', 0, 698),
(600, 172, 'Ketchup', 'קטשופ', 0, 699),
(601, 172, 'Mustard', 'חרדל', 0, 700),
(602, 172, 'Tehina', 'טחינה', 0, 701),
(603, 172, 'Salsa', 'סלסה', 0, 702),
(604, 172, 'Dijon mustard and mayo mix', 'חרדל דיז''ון ומיונז', 0, 703),
(605, 172, 'Sweet chili', 'צ''ילי מתוק', 0, 704),
(606, 172, 'Hot peppers spread', 'ממרח פלפלים', 0, 705),
(607, 172, 'BBQ', 'מנגל', 0, 706),
(608, 173, 'Guacamole', 'סלט אבוקדו', 5, 707),
(609, 173, 'Fried egg', 'ביצה מטוגנת', 7, 708),
(610, 173, 'Portobello mushroom', 'פטריות פורטובלו אווז', 8, 709),
(611, 174, 'Roza Deal : Upgrade to a meal including chips onion rings and a drink', 'רוזה דיל : שדרוג לארוחה הכוללת צ''יפס / טבעות בצל ובקבוק שתיה ', 23, 710),
(612, 175, 'Lettuce', 'חסה', 0, 711),
(613, 175, 'Tomatoes', 'עגבניות', 0, 712),
(614, 175, 'Pickles', 'חמוץ', 0, 713),
(615, 175, 'Pickled Jalapeño', 'חלפיניו כבושים', 0, 714),
(616, 176, 'Pesto', 'פסטו', 0, 715),
(617, 176, 'Chimichurri', 'צ''ימיצ''ורי', 0, 716),
(618, 176, 'Ketchup', 'קטשופ', 0, 717),
(619, 176, 'Mustard', 'חרדל', 0, 718),
(620, 176, 'Tehina', 'טחינה', 0, 719),
(621, 176, 'Salsa', 'סלסה', 0, 720),
(622, 176, 'Dijon mustard and mayo mix', 'חרדל דיז''ון ומיונז', 0, 721),
(623, 176, 'Sweet chili', 'צ''ילי מתוק', 0, 722),
(624, 176, 'Hot peppers spread', 'ממרח פלפלים', 0, 723),
(625, 176, 'BBQ', 'מנגל', 0, 724),
(626, 177, 'Guacamole', 'סלט אבוקדו', 5, 725),
(627, 177, 'Fried egg', 'ביצה מטוגנת', 7, 726),
(628, 177, 'Portobello mushroom', 'פטריות פורטובלו אווז', 8, 727),
(629, 178, 'Roza Deal : Upgrade to a meal including chips onion rings and a drink', 'רוזה דיל : שדרוג לארוחה הכוללת צ''יפס / טבעות בצל ובקבוק שתיה ', 23, 728),
(630, 179, 'Lettuce', 'חסה', 0, 729),
(631, 179, 'Tomatoes', 'עגבניות', 0, 730),
(632, 179, 'Pickles', 'חמוץ', 0, 731),
(633, 179, 'Pickled Jalapeño', 'חלפיניו כבושים', 0, 732),
(634, 180, 'Pesto', 'פסטו', 0, 733),
(635, 180, 'Chimichurri', 'צ''ימיצ''ורי', 0, 734),
(636, 180, 'Ketchup', 'קטשופ', 0, 735),
(637, 180, 'Mustard', 'חרדל', 0, 736),
(638, 180, 'Tehina', 'טחינה', 0, 737),
(639, 180, 'Salsa', 'סלסה', 0, 738),
(640, 180, 'Dijon mustard and mayo mix', 'חרדל דיז''ון ומיונז', 0, 739),
(641, 180, 'Sweet chili', 'צ''ילי מתוק', 0, 740),
(642, 180, 'Hot peppers spread', 'ממרח פלפלים', 0, 741),
(643, 180, 'BBQ', 'מנגל', 0, 742),
(644, 181, 'Guacamole', 'סלט אבוקדו', 5, 743),
(645, 181, 'Fried egg', 'ביצה מטוגנת', 7, 744),
(646, 181, 'Portobello mushroom', 'פטריות פורטובלו אווז', 8, 745),
(647, 182, 'Roza Deal : Upgrade to a meal including chips onion rings and a drink', 'רוזה דיל : שדרוג לארוחה הכוללת צ''יפס / טבעות בצל ובקבוק שתיה ', 23, 746),
(648, 183, 'Lettuce', 'חסה', 0, 747),
(649, 183, 'Tomatoes', 'עגבניות', 0, 748),
(650, 183, 'Pickles', 'חמוץ', 0, 749),
(651, 183, 'Pickled Jalapeño', 'חלפיניו כבושים', 0, 750),
(652, 184, 'Pesto', 'פסטו', 0, 751),
(653, 184, 'Chimichurri', 'צ''ימיצ''ורי', 0, 752),
(654, 184, 'Ketchup', 'קטשופ', 0, 753),
(655, 184, 'Mustard', 'חרדל', 0, 754),
(656, 184, 'Tehina', 'טחינה', 0, 755),
(657, 184, 'Salsa', 'סלסה', 0, 756),
(658, 184, 'Dijon mustard and mayo mix', 'חרדל דיז''ון ומיונז', 0, 757),
(659, 184, 'Sweet chili', 'צ''ילי מתוק', 0, 758),
(660, 184, 'Hot peppers spread', 'ממרח פלפלים', 0, 759),
(661, 184, 'BBQ', 'מנגל', 0, 760),
(662, 185, 'Guacamole', 'סלט אבוקדו', 5, 761),
(663, 185, 'Fried egg', 'ביצה מטוגנת', 7, 762),
(664, 185, 'Portobello mushroom', 'פטריות פורטובלו אווז', 8, 763),
(665, 186, 'Roza Deal : Upgrade to a meal including chips onion rings and a drink', 'רוזה דיל : שדרוג לארוחה הכוללת צ''יפס / טבעות בצל ובקבוק שתיה ', 23, 764),
(666, 187, 'Lettuce', 'חסה', 0, 765),
(667, 187, 'Tomatoes', 'עגבניות', 0, 766),
(668, 187, 'Pickles', 'חמוץ', 0, 767),
(669, 187, 'Pickled Jalapeño', 'חלפיניו כבושים', 0, 768),
(670, 188, 'Pesto', 'פסטו', 0, 769),
(671, 188, 'Chimichurri', 'צ''ימיצ''ורי', 0, 770),
(672, 188, 'Ketchup', 'קטשופ', 0, 771),
(673, 188, 'Mustard', 'חרדל', 0, 772),
(674, 188, 'Tehina', 'טחינה', 0, 773),
(675, 188, 'Salsa', 'סלסה', 0, 774),
(676, 188, 'Dijon mustard and mayo mix', 'חרדל דיז''ון ומיונז', 0, 775),
(677, 188, 'Sweet chili', 'צ''ילי מתוק', 0, 776),
(678, 188, 'Hot peppers spread', 'ממרח פלפלים', 0, 777),
(679, 188, 'BBQ', 'מנגל', 0, 778),
(680, 189, 'Guacamole', 'סלט אבוקדו', 5, 779),
(681, 189, 'Fried egg', 'ביצה מטוגנת', 7, 780),
(682, 189, 'Portobello mushroom', 'פטריות פורטובלו אווז', 8, 781),
(683, 190, 'Roza Deal : Upgrade to a meal including chips onion rings and a drink', 'רוזה דיל : שדרוג לארוחה הכוללת צ''יפס / טבעות בצל ובקבוק שתיה ', 23, 782),
(684, 191, 'Lettuce', 'חסה', 0, 783),
(685, 191, 'Tomatoes', 'עגבניות', 0, 784),
(686, 191, 'Pickles', 'חמוץ', 0, 785),
(687, 191, 'Pickled Jalapeño', 'חלפיניו כבושים', 0, 786),
(688, 192, 'Pesto', 'פסטו', 0, 787),
(689, 192, 'Chimichurri', 'צ''ימיצ''ורי', 0, 788),
(690, 192, 'Ketchup', 'קטשופ', 0, 789),
(691, 192, 'Mustard', 'חרדל', 0, 790),
(692, 192, 'Tehina', 'טחינה', 0, 791),
(693, 192, 'Salsa', 'סלסה', 0, 792),
(694, 192, 'Dijon mustard and mayo mix', 'חרדל דיז''ון ומיונז', 0, 793),
(695, 192, 'Sweet chili', 'צ''ילי מתוק', 0, 794),
(696, 192, 'Hot peppers spread', 'ממרח פלפלים', 0, 795),
(697, 192, 'BBQ', 'מנגל', 0, 796),
(698, 193, 'Guacamole', 'סלט אבוקדו', 5, 797),
(699, 193, 'Fried egg', 'ביצה מטוגנת', 7, 798),
(700, 193, 'Portobello mushroom', 'פטריות פורטובלו אווז', 8, 799),
(701, 194, 'Roza Deal : Upgrade to a meal including chips onion rings and a drink', 'רוזה דיל : שדרוג לארוחה הכוללת צ''יפס / טבעות בצל ובקבוק שתיה ', 23, 800),
(702, 195, 'Lettuce', 'חסה', 0, 801),
(703, 195, 'Tomatoes', 'עגבניות', 0, 802),
(704, 195, 'Pickles', 'חמוץ', 0, 803),
(705, 195, 'Pickled Jalapeño', 'חלפיניו כבושים', 0, 804),
(706, 196, 'Pesto', 'פסטו', 0, 805),
(707, 196, 'Chimichurri', 'צ''ימיצ''ורי', 0, 806),
(708, 196, 'Ketchup', 'קטשופ', 0, 807),
(709, 196, 'Mustard', 'חרדל', 0, 808),
(710, 196, 'Tehina', 'טחינה', 0, 809),
(711, 196, 'Salsa', 'סלסה', 0, 810),
(712, 196, 'Dijon mustard and mayo mix', 'חרדל דיז''ון ומיונז', 0, 811),
(713, 196, 'Sweet chili', 'צ''ילי מתוק', 0, 812),
(714, 196, 'Hot peppers spread', 'ממרח פלפלים', 0, 813),
(715, 196, 'BBQ', 'מנגל', 0, 814),
(716, 197, 'Guacamole', 'סלט אבוקדו', 5, 815),
(717, 197, 'Fried egg', 'ביצה מטוגנת', 7, 816),
(718, 197, 'Portobello mushroom', 'פטריות פורטובלו אווז', 8, 817),
(719, 198, 'Roza Deal : Upgrade to a meal including chips onion rings and a drink', 'רוזה דיל : שדרוג לארוחה הכוללת צ''יפס / טבעות בצל ובקבוק שתיה ', 23, 818),
(720, 199, 'Lettuce', 'חסה', 0, 819),
(721, 199, 'Tomatoes', 'עגבניות', 0, 820),
(722, 199, 'Pickles', 'חמוץ', 0, 821),
(723, 199, 'Pickled Jalapeño', 'חלפיניו כבושים', 0, 822),
(724, 200, 'Pesto', 'פסטו', 0, 823),
(725, 200, 'Chimichurri', 'צ''ימיצ''ורי', 0, 824),
(726, 200, 'Ketchup', 'קטשופ', 0, 825),
(727, 200, 'Mustard', 'חרדל', 0, 826),
(728, 200, 'Tehina', 'טחינה', 0, 827),
(729, 200, 'Salsa', 'סלסה', 0, 828),
(730, 200, 'Dijon mustard and mayo mix', 'חרדל דיז''ון ומיונז', 0, 829),
(731, 200, 'Sweet chili', 'צ''ילי מתוק', 0, 830),
(732, 200, 'Hot peppers spread', 'ממרח פלפלים', 0, 831),
(733, 200, 'BBQ', 'מנגל', 0, 832),
(734, 201, 'Guacamole', 'סלט אבוקדו', 5, 833),
(735, 201, 'Fried egg', 'ביצה מטוגנת', 7, 834),
(736, 201, 'Portobello mushroom', 'פטריות פורטובלו אווז', 8, 835),
(737, 202, 'Roza Deal : Upgrade to a meal including chips onion rings and a drink', 'רוזה דיל : שדרוג לארוחה הכוללת צ''יפס / טבעות בצל ובקבוק שתיה ', 23, 836),
(738, 203, 'Lettuce', 'חסה', 0, 837),
(739, 203, 'Tomatoes', 'עגבניות', 0, 838),
(740, 203, 'Pickles', 'חמוץ', 0, 839),
(741, 203, 'Pickled Jalapeño', 'חלפיניו כבושים', 0, 840),
(742, 204, 'Pesto', 'פסטו', 0, 841),
(743, 204, 'Chimichurri', 'צ''ימיצ''ורי', 0, 842),
(744, 204, 'Ketchup', 'קטשופ', 0, 843),
(745, 204, 'Mustard', 'חרדל', 0, 844),
(746, 204, 'Tehina', 'טחינה', 0, 845),
(747, 204, 'Salsa', 'סלסה', 0, 846),
(748, 204, 'Dijon mustard and mayo mix', 'חרדל דיז''ון ומיונז', 0, 847),
(749, 204, 'Sweet chili', 'צ''ילי מתוק', 0, 848),
(750, 204, 'Hot peppers spread', 'ממרח פלפלים', 0, 849),
(751, 204, 'BBQ', 'מנגל', 0, 850),
(752, 205, 'Guacamole', 'סלט אבוקדו', 5, 851),
(753, 205, 'Fried egg', 'ביצה מטוגנת', 7, 852),
(754, 205, 'Portobello mushroom', 'פטריות פורטובלו אווז', 8, 853),
(755, 206, 'Roza Deal : Upgrade to a meal including chips onion rings and a drink', 'רוזה דיל : שדרוג לארוחה הכוללת צ''יפס / טבעות בצל ובקבוק שתיה ', 23, 854),
(756, 207, 'White ciabatta', 'ג''בטה לבנה', 7, 855),
(757, 207, 'Multi-grain', 'כפרית', 7, 856),
(758, 208, 'Roza Deal: Upgrade to a full meal including oven baked Italian ciabetta and a bottled drink', 'רוזה דיל: שדרוג לארוחת רוזה דיל הכוללת ג''בטה איטלקית בתנור + בקבוק שתייה ב 17 ₪', 17, 857),
(759, 209, 'White ciabatta', 'ג''בטה לבנה', 7, 858),
(760, 209, 'Multi-grain', 'כפרית', 7, 859),
(761, 210, 'Roza Deal: Upgrade to a full meal including oven baked Italian ciabetta and a bottled drink', 'רוזה דיל: שדרוג לארוחת רוזה דיל הכוללת ג''בטה איטלקית בתנור + בקבוק שתייה ב 17 ₪', 17, 860),
(762, 211, 'White ciabatta', 'ג''בטה לבנה', 7, 861),
(763, 211, 'Multi-grain', 'כפרית', 7, 862),
(764, 212, 'Roza Deal: Upgrade to a full meal including oven baked Italian ciabetta and a bottled drink', 'רוזה דיל: שדרוג לארוחת רוזה דיל הכוללת ג''בטה איטלקית בתנור + בקבוק שתייה ב 17 ₪', 17, 863),
(765, 213, 'White ciabatta', 'ג''בטה לבנה', 7, 864),
(766, 213, 'Multi-grain', 'כפרית', 7, 865),
(767, 214, 'Roza Deal: Upgrade to a full meal including oven baked Italian ciabetta and a bottled drink', 'רוזה דיל: שדרוג לארוחת רוזה דיל הכוללת ג''בטה איטלקית בתנור + בקבוק שתייה ב 17 ₪', 17, 866),
(768, 215, 'White ciabatta', 'ג''בטה לבנה', 7, 867),
(769, 215, 'Multi-grain', 'כפרית', 7, 868),
(770, 216, 'Roza Deal: Upgrade to a full meal including oven baked Italian ciabetta and a bottled drink', 'רוזה דיל: שדרוג לארוחת רוזה דיל הכוללת ג''בטה איטלקית בתנור + בקבוק שתייה ב 17 ₪', 17, 869),
(771, 217, 'White ciabatta', 'ג''בטה לבנה', 7, 870),
(772, 217, 'Multi-grain', 'כפרית', 7, 871),
(773, 218, 'Roza Deal: Upgrade to a full meal including oven baked Italian ciabetta and a bottled drink', 'רוזה דיל: שדרוג לארוחת רוזה דיל הכוללת ג''בטה איטלקית בתנור + בקבוק שתייה ב 17 ₪', 17, 872),
(774, 219, 'White ciabatta', 'ג''בטה לבנה', 7, 873),
(775, 219, 'Multi-grain', 'כפרית', 7, 874),
(776, 220, 'Roza Deal: Upgrade to a full meal including oven baked Italian ciabetta and a bottled drink', 'רוזה דיל: שדרוג לארוחת רוזה דיל הכוללת ג''בטה איטלקית בתנור + בקבוק שתייה ב 17 ₪', 17, 875),
(777, 221, 'Roza Deal: Upgrade to a full meal including oven baked Italian ciabetta and a bottled drink', 'רוזה דיל: שדרוג לארוחת רוזה דיל הכוללת ג''בטה איטלקית בתנור + בקבוק שתייה ב 17 ₪', 17, 876),
(778, 222, 'Roza Deal: Upgrade to a full meal including oven baked Italian ciabetta and a bottled drink', 'רוזה דיל: שדרוג לארוחת רוזה דיל הכוללת ג''בטה איטלקית בתנור + בקבוק שתייה ב 17 ₪', 17, 877),
(779, 223, 'Roza Deal: Upgrade to a full meal including oven baked Italian ciabetta and a bottled drink', 'רוזה דיל: שדרוג לארוחת רוזה דיל הכוללת ג''בטה איטלקית בתנור + בקבוק שתייה ב 17 ₪', 17, 878),
(780, 224, 'Roza Deal: Upgrade to a full meal including oven baked Italian ciabetta and a bottled drink', 'רוזה דיל: שדרוג לארוחת רוזה דיל הכוללת ג''בטה איטלקית בתנור + בקבוק שתייה ב 17 ₪', 17, 879),
(781, 225, 'Roza Deal: Upgrade to a full meal including oven baked Italian ciabetta and a bottled drink', 'רוזה דיל: שדרוג לארוחת רוזה דיל הכוללת ג''בטה איטלקית בתנור + בקבוק שתייה ב 17 ₪', 17, 880),
(782, 226, 'Roza Deal: Upgrade to a full meal including oven baked Italian ciabetta and a bottled drink', 'רוזה דיל: שדרוג לארוחת רוזה דיל הכוללת ג''בטה איטלקית בתנור + בקבוק שתייה ב 17 ₪', 17, 881),
(783, 227, 'Roza Deal: Upgrade to a full meal including oven baked Italian ciabetta and a bottled drink', 'רוזה דיל: שדרוג לארוחת רוזה דיל הכוללת ג''בטה איטלקית בתנור + בקבוק שתייה ב 17 ₪', 17, 882),
(784, 228, 'Roza Deal: Upgrade to a full meal including oven baked Italian ciabetta and a bottled drink', 'רוזה דיל: שדרוג לארוחת רוזה דיל הכוללת ג''בטה איטלקית בתנור + בקבוק שתייה ב 17 ₪', 17, 883),
(785, 229, 'Roza Deal: Upgrade to a full meal including a personal salad and a bottled drink', 'רוזה דיל: שדרוג לארוחת רוזה דיל הכוללת סלט אישי + בקבוק שתייה', 21, 884),
(786, 230, 'Roza Deal: Upgrade to a full meal including a personal salad and a bottled drink', 'רוזה דיל: שדרוג לארוחת רוזה דיל הכוללת סלט אישי + בקבוק שתייה', 21, 885),
(787, 231, 'Roza Deal: Upgrade to a full meal including a personal salad and a bottled drink', 'רוזה דיל: שדרוג לארוחת רוזה דיל הכוללת סלט אישי + בקבוק שתייה', 21, 886);

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE IF NOT EXISTS `tags` (
  `id` int(16) NOT NULL AUTO_INCREMENT,
  `name_en` varchar(255) NOT NULL,
  `name_he` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`id`, `name_en`, `name_he`) VALUES
(1, 'Sandwiches', 'כריכים'),
(2, 'Meat', 'בָּשָׂר'),
(3, 'Burgers', 'בורגרס'),
(4, 'Wraps', 'כורך'),
(5, 'Grill', 'גְרִיל'),
(6, 'Steak', 'סטֵייק'),
(7, 'Pizza', 'פִּיצָה');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(16) NOT NULL AUTO_INCREMENT,
  `smooch_id` varchar(255) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `state` int(16) NOT NULL DEFAULT '0',
  `language` varchar(255) NOT NULL DEFAULT 'english',
  `payment_url` varchar(255) DEFAULT NULL,
  `extras` varchar(255) DEFAULT NULL,
  `restaurant_id` int(16) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `restaurant_id` (`restaurant_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=255 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `smooch_id`, `contact`, `address`, `state`, `language`, `payment_url`, `extras`, `restaurant_id`, `role_id`) VALUES
(233, 'eaba97fb7ab217e0bbe46926', '0548086730', NULL, 3, 'english', NULL, NULL, NULL, 1),
(235, 'ahmad@gmail.com', NULL, NULL, 0, 'english', NULL, NULL, NULL, 1),
(236, 'test@gmail.com', NULL, NULL, 0, 'english', NULL, NULL, NULL, 1),
(237, 'test2@gmail.com', NULL, NULL, 0, 'english', NULL, NULL, NULL, 1),
(238, 'ahmadworkspace@gmail.com', NULL, NULL, 0, 'english', NULL, NULL, NULL, 2),
(239, 'testing@gmail.com', NULL, NULL, 0, 'english', NULL, NULL, NULL, NULL),
(240, 'test555@gmail.com', NULL, NULL, 0, 'english', NULL, NULL, NULL, NULL),
(241, 'rrrr@gmail.com', NULL, NULL, 0, 'english', NULL, NULL, NULL, NULL),
(242, 'test33@gmail.com', NULL, NULL, 0, 'english', NULL, NULL, NULL, NULL),
(243, 'rrr@gamil.com', NULL, NULL, 0, 'english', NULL, NULL, NULL, NULL),
(244, 'test22@gmail.com', NULL, NULL, 0, 'english', NULL, NULL, NULL, NULL),
(245, 'rael@pushstartups.com', NULL, NULL, 0, 'english', NULL, NULL, NULL, 2),
(246, 'josh@pushstartups.com', NULL, NULL, 0, 'english', NULL, NULL, NULL, 2),
(247, 'muhammad.iftikhar.aftab@gmail.com', NULL, NULL, 0, 'english', NULL, NULL, NULL, 2),
(248, 'shoaib.it002@gmail.com', NULL, NULL, 0, 'english', NULL, NULL, NULL, 2),
(251, 'test@gmnail.com', NULL, NULL, 0, 'english', NULL, NULL, NULL, NULL),
(252, 'test222@gmail.com', NULL, NULL, 0, 'english', NULL, NULL, NULL, NULL),
(253, 'iftikhar_aftab@yahoo.com', NULL, NULL, 0, 'english', NULL, NULL, NULL, NULL),
(254, 'rtrt@gmail.com', NULL, NULL, 0, 'english', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_coupons`
--

CREATE TABLE IF NOT EXISTS `user_coupons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `coupon_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `coupon_id` (`coupon_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=21 ;

--
-- Dumping data for table `user_coupons`
--

INSERT INTO `user_coupons` (`id`, `user_id`, `coupon_id`) VALUES
(1, 234, 1),
(3, 234, 2),
(5, 235, 2),
(6, 235, 1),
(13, 236, 1),
(14, 237, 1),
(15, 240, 2),
(16, 242, 1),
(17, 243, 1),
(18, 244, 1),
(19, 252, 1),
(20, 238, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_orders`
--

CREATE TABLE IF NOT EXISTS `user_orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `restaurant_id` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `coupon_discount` varchar(255) DEFAULT NULL,
  `discount_value` int(11) NOT NULL,
  `order_date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_order` (`user_id`),
  KEY `restaurant_id` (`restaurant_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=81 ;

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE IF NOT EXISTS `user_roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`id`, `name`) VALUES
(1, 'normal'),
(2, 'b2b');

-- --------------------------------------------------------

--
-- Table structure for table `user_votes`
--

CREATE TABLE IF NOT EXISTS `user_votes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `voting_date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `company_id` (`company_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Dumping data for table `user_votes`
--

INSERT INTO `user_votes` (`id`, `user_id`, `company_id`, `voting_date`) VALUES
(5, 238, 1, '2017-02-13'),
(6, 245, 1, '2017-02-13'),
(7, 248, 1, '2017-02-13'),
(12, 238, 1, '2017-02-14');

-- --------------------------------------------------------

--
-- Table structure for table `weekly_availibility`
--

CREATE TABLE IF NOT EXISTS `weekly_availibility` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `restaurant_id` int(11) NOT NULL,
  `week_en` varchar(255) NOT NULL,
  `week_he` varchar(255) NOT NULL,
  `opening_time` varchar(255) NOT NULL,
  `opening_time_he` varchar(255) NOT NULL,
  `closing_time` varchar(255) NOT NULL,
  `closing_time_he` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `restaurant_id` (`restaurant_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=43 ;

--
-- Dumping data for table `weekly_availibility`
--

INSERT INTO `weekly_availibility` (`id`, `restaurant_id`, `week_en`, `week_he`, `opening_time`, `opening_time_he`, `closing_time`, `closing_time_he`) VALUES
(8, 1, 'Sunday', 'יום א', '12:00', '12:00', '21:00', '21:00'),
(9, 1, 'Monday', 'יום ב', '12:00', '12:00', '21:00', '21:00'),
(10, 1, 'Tuesday', 'יום ג', '12:00', '12:00', '21:00', '21:00'),
(11, 1, 'Wednesday', 'יום ד', '12:00', '12:00', '21:00', '21:00'),
(12, 1, 'Thursday', 'יום ה', '12:00', '12:00', '21:00', '21:00'),
(13, 1, 'Friday', 'ששי', 'Closed', 'סָגוּר', 'Closed', 'סָגוּר'),
(14, 1, 'Saturday', 'שבת', 'Closed', 'סָגוּר', 'Closed', 'סָגוּר'),
(15, 2, 'Sunday', 'יום א', '12:00', '12:00', '21:00', '21:00'),
(16, 2, 'Monday', 'יום ב', '12:00', '12:00', '21:00', '21:00'),
(17, 2, 'Tuesday', 'יום ג', '12:00', '12:00', '21:00', '21:00'),
(18, 2, 'Wednesday', 'יום ד', '12:00', '12:00', '21:00', '21:00'),
(19, 2, 'Thursday', 'יום ה', '12:00', '12:00', '21:00', '21:00'),
(20, 2, 'Friday', 'ששי', 'Closed', 'סָגוּר', 'Closed', 'סָגוּר'),
(21, 2, 'Saturday', 'שבת', 'Closed', 'סָגוּר', 'Closed', 'סָגוּר'),
(22, 3, 'Sunday', 'יום א', '12:00', '12:00', '21:00', '21:00'),
(23, 3, 'Monday', 'יום ב', '12:00', '12:00', '21:00', '21:00'),
(24, 3, 'Tuesday', 'יום ג', '12:00', '12:00', '21:00', '21:00'),
(25, 3, 'Wednesday', 'יום ד', '12:00', '12:00', '21:00', '21:00'),
(26, 3, 'Thursday', 'יום ה', '12:00', '12:00', '21:00', '21:00'),
(27, 3, 'Friday', 'ששי', 'Closed', 'סָגוּר', 'Closed', 'סָגוּר'),
(28, 3, 'Saturday', 'שבת', 'Closed', 'סָגוּר', 'Closed', 'סָגוּר'),
(36, 4, 'Sunday', 'יום א', '12:00', '12:00', '21:00', '21:00'),
(37, 4, 'Monday', 'יום ב', '12:00', '12:00', '21:00', '21:00'),
(38, 4, 'Tuesday', 'יום ג', '12:00', '12:00', '21:00', '21:00'),
(39, 4, 'Wednesday', 'יום ד', '12:00', '12:00', '21:00', '21:00'),
(40, 4, 'Thursday', 'יום ה', '12:00', '12:00', '21:00', '21:00'),
(41, 4, 'Friday', 'ששי', 'Closed', 'סָגוּר', 'Closed', 'סָגוּר'),
(42, 4, 'Saturday', 'שבת', 'Closed', 'סָגוּר', 'Closed', 'סָגוּר');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `extras`
--
ALTER TABLE `extras`
  ADD CONSTRAINT `extras_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`);

--
-- Constraints for table `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `items_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Constraints for table `menus`
--
ALTER TABLE `menus`
  ADD CONSTRAINT `menus_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`);

--
-- Constraints for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD CONSTRAINT `order_detail_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `user_orders` (`id`);

--
-- Constraints for table `restaurant_gallery`
--
ALTER TABLE `restaurant_gallery`
  ADD CONSTRAINT `restaurant_gallery_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`);

--
-- Constraints for table `restaurant_tags`
--
ALTER TABLE `restaurant_tags`
  ADD CONSTRAINT `restaurant_tags_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`),
  ADD CONSTRAINT `restaurant_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`);

--
-- Constraints for table `subitems`
--
ALTER TABLE `subitems`
  ADD CONSTRAINT `subitems_ibfk_1` FOREIGN KEY (`extra_id`) REFERENCES `extras` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`);

--
-- Constraints for table `user_orders`
--
ALTER TABLE `user_orders`
  ADD CONSTRAINT `fk_user_order` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_orders_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`);

--
-- Constraints for table `user_votes`
--
ALTER TABLE `user_votes`
  ADD CONSTRAINT `user_votes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `user_votes_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`);

--
-- Constraints for table `weekly_availibility`
--
ALTER TABLE `weekly_availibility`
  ADD CONSTRAINT `weekly_availibility_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
