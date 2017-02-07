-- phpMyAdmin SQL Dump
-- version 4.0.10.18
-- https://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 07, 2017 at 10:37 AM
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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=19 ;

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
(17, 3, 'Bandora Drinks', 'שתיה', 116);

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
(1, 'alex20', '2017-02-05 00:00:00', '2017-02-10 00:00:00', 30, 'percentage'),
(2, 'alex50', '2017-02-07 09:18:24', '2017-02-21 00:00:00', 50, 'amount');

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=156 ;

--
-- Dumping data for table `extras`
--

INSERT INTO `extras` (`id`, `item_id`, `name_en`, `type`, `price_replace`, `name_he`, `sort`) VALUES
(1, 5, 'Size', 'One', 1, 'גודל', 100),
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
(135, 64, 'Bread Type', 'One', 0, 'לחם', 192),
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
(154, 70, 'Meat Type', 'One', 0, 'בשר', 205);

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=79 ;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `category_id`, `name_en`, `name_he`, `desc_en`, `desc_he`, `price`, `image_url`, `sort`) VALUES
(1, 2, 'Angus Burger', 'אנגוס בורגר', '"Angus Burger\n250 grams of quality entrecote beef with mayonnaise, mustard, barbecue, lettuce, onions, fried onions, pickles and tomatoes."', '"אנגוס בורגר\n250 גרם בשר אנטריקוט איכותי.  בתוספת מיונז, חרדל, ברביקיו, חסה, בצל, בצל מטוגן, מלפפון חמוץ ועגבניה.\nתוספות בתשלום לבחירה: פורטובלו 4 ₪ | ביצה 4 ₪ | 50 גר'' חזה אווז 8 ₪"', 40, 'img/angus_items/angus_burger.png', 100),
(2, 3, 'Angus Tortilla', 'טורטיה אנגוס', 'Angus Tortilla: 150 grams of quality Angus entrecote beef with mayonnaise, mustard, chimichurri, lettuce and tomato.', '"טורטיה אנגוס\n150 גרם נתחי אנטריקוט אנגוס איכותיים. בתוספת מיונז, חרדל, צ''ימיצ''ורי, חסה ועגבניה.\nתוספות בתשלום לבחירה: פורטובלו 4 ₪ | ביצה 4 ₪"', 36, 'img/angus_items/tortilla.png', 101),
(3, 3, 'Pargit Tortilla', 'טורטיה פרגית', '"Spring Chicken Tortilla: \n150 grams of chicken marinated in Moroccan spices with mayonnaise, mustard, chimichurri, lettuce and tomato."', '"טורטיה פרגית\n150 גרם פרגיות במרינדה של תבלינים מרוקאים.  בתוספת מיונז, חרדל, צ''ימיצ''ורי, חסה ועגבניה.\nתוספות בתשלום לבחירה: פורטובלו 4 ₪ | ביצה 4 ₪"', 34, 'restapi/images/test.png', 102),
(4, 3, 'Chicken Tortilla', 'טורטיה עוף', '"Chicken Tortilla\n150 grams of chicken in honey sauce marunade with mayonnaise, mustard, chipotle pepper, lettuce and tomato.\n"', '"טורטיה עוף\n150 גרם נתחי חזה עוף במרינדת דבש.  בתוספת מיונז, חרדל, צ''יפוטלה, חסה ועגבניה.\nתוספות בתשלום לבחירה: פורטובלו 4 ₪ | ביצה 4 ₪"', 32, 'restapi/images/test.png', 103),
(5, 1, 'Angus Salad', 'סלט אנגוס', '"Angus salad\n150 gram entrecote/spring chicken/goose breast.\nLettuce, baby greens, tomatoes, sacks, onion and mushrooms. Served with bread, chimmichuri,  and plenty of sauces to choose from."', '"סלט אנגוס\n150 גרם נתחי אנטריקוט | פרגית | חזה אווז.\nעלי חסה, עלי בייבי, עגבניות שקי, בצל סגול ופטריות. מוגש בתוספת לחם צי''מיצ''ורי ורטבים לבחירה. \nתוספות בתשלום לבחירה: 150 גרם חזה אווז או אטנריקוט 19 ₪ | 80 גר'' כבד אווז 30 ₪"', 44, 'img/angus_items/angus_salad.png', 104),
(6, 1, 'Chicken Salad', 'סלט עוף', '"Chicken Salad\n170 grams of sweet chicken breast. Chopped lettuce, mesculin, cucumber, cherry tomatoes, red onion and mushrooms. Served with garlic bread and sauces."', '"סלט עוף\n170 גרם חזה חות מתוק. עלי חסה קצוצים, עלי בייבי, רצועות מלפפון, עגבניות שרי, בצל סגול ופטריות. מוגש בתוספת לחם שום ורטבים.\nתוספות בתשלום לבחירה: פורטובלו 4 ₪ | ביצה 4 ₪ | 170 גר'' חזה עוף 18 ₪"', 42, 'img/angus_items/chicken_salad.png', 105),
(7, 6, 'Angus Sandwich', 'אנגוס סנדוויץ', 'Angus Sandwich: 150 grams of quality Angus entrecote meat with mustard, chimichuri, lettuce, and tomatoes', '"סנדוויץ'' אנגוס\n150 גרם נתחי אנטריקוט אנגוס איכותיים. בתוספת חרדל, צ''ימיצ''ורי , חסה ועגבניה.\nתוספות בתשלום לבחירה: 50 גר'' חזה אווז 8 ₪ | 150 גר'' חזה אווז או אנטריקוט 19 ₪ | ביצה 4 ₪ | פורטובלו 4 ₪"', 37, 'restapi/images/test.png', 106),
(8, 6, 'Double angus sandwich', 'דאבל אנגוס סנדוויץ', 'Double Angus Sandwich: 300 grams of quality Angus entrecote meat with mayonaise, mustard, chimichuri, lettuce, and tomatoes ', '"סנדוויץ'' דאבל אנגוס\n300 גרם נתחי אנטריקוט אנגוס איכותיים. בתוספת מיונז, חרדל, צ''ימיצ''ורי , חסה ועגבניה.\nתוספות בתשלום לבחירה: 50 גר'' חזה אווז 8 ₪  | ביצה 4 ₪ | פורטובלו 4 ₪\n"', 56, 'restapi/images/test.png', 107),
(9, 6, 'King angus sandwich', 'קינג אנגוס סנדוויץ', 'King Angus Sandwich: 150 grams of quality Angus entrecote meat and 80 grams of goose liver with mayonaise, mustard, chimichuri, lettuce, and tomatoes ', '"סנדוויץ'' קינג אנגוס\n150 גרם נתחי אנטריקוט + 80 גר'' כבד אווז. בתוספת מיונז, חרדל, צ''ימיצ''ורי , חסה ועגבניה.\nתוספות בתשלום לבחירה: 50 גר'' חזה אווז 8 ₪  | ביצה 4 ₪ | פורטובלו 4 ₪"', 67, 'restapi/images/test.png', 108),
(10, 6, 'chicken sandwich', 'סנדוויץ עוף', 'Chicken Sandwich: 170 grams of sweet chicken breast with mayonaise, sweet chilli sauce, garlic, lettuce, and tomatoes.', '"סנדוויץ'' עוף\n170 גרם חזה עוף מתוק.  בתוספת מיונז, צ''ילי מתוק, שום, חסה ועגבניה.\nתוספות בתשלום לבחירה: 170 גר'' חזה עוף 18 ₪ | פורטובלו 4 ₪"', 33, 'img/angus_items/chicken_sandwich.png', 109),
(11, 6, 'mallard sandwich', 'סנדוויץ'' מולארד', 'Mallard Sandwich: 150 grams of quality goose breast with mayonaise, mustard, chimichuri, lettuce, and tomatoes ', '"סנדוויץ'' מולארד\n150 גר'' נתחי חזה אווז איכותיים.  בתוספת מיונז, חרדל, צ''ימיצ''ורי, חסה ועגבניה.\nתוספות בתשלום לבחירה: 50 גר'' חזה אווז 8 ₪ | ביצה 4 ₪ | פורטובלו 4 ₪"', 37, 'restapi/images/test.png', 110),
(12, 6, 'mediterranean sandwich', 'סנדוויץ ים תיכוני', 'Mediterranean Sandwich: 150 grams spring chicken with our special home made spice blend. Comes with mayonaise, tehina, spicy chilli sauce, lettuce, and tomatoes', '"סנדוויץ'' ים תיכוני\n150 גר'' פרגיות בתיבול הבית.  בתוספת מיונז, טחינה, צ''ילי חריף, חסה ועגבניה.\nתוספות בתשלום לבחירה:  פורטובלו 4 ₪"', 35, 'restapi/images/test.png', 111),
(13, 6, 'Vegetarian sandwich', 'סנדוויץ'' צמחוני', 'Vegetarian Sandwich: Mesclun leaves, red onion, tomatoes, portobello mushroom, lettuce, onion rings, and a fried egg.', '"סנדוויץ'' צמחוני\nעלי בייבי, בצל סגול, עגבניות, פורטובלו, חסה, טבעות בצל, ביצת עין ועגבניות טריות.\nרטבים לבחירה: מיונז|  פסטו | ברביקיו | צ''ילי מתוק\n"', 33, 'restapi/images/test.png', 112),
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
(38, 9, 'Greek Salad', 'סלט יווני', 'Cucumbers and chopped tomatoes on a bed of lettuce, feta cheese, red onion, roasted peppers, Kalamata olives, za''atar, lemon and olive oil', '"מלפפון ועגבניות קצוצים על מצע חסות, פטה מגורדת,\nבצל סגול, פלפל קלוי, זיתי קלמטה, זעתר, לימון ושמן זית"', 28, 'img/mesh_items/greek_salad.png', 137),
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
(63, 14, 'chicken skewers', 'שיפודי עוף', 'Jumbo Marakesh Spring Chicken Skewers: skewers spiced with harissa, cumin, hawaij, garlic, and herbs', '', 0, 'img/bandora_items/chicken_skewers.png', 162),
(64, 14, 'chicken breast', 'חזה עוף', 'Marinated Chicken Breast: chicken breast spiced with paprika, cumin, hawaij, and coarse black pepper', '', 0, 'img/bandora_items/chicken_breasts.png', 163),
(65, 15, 'Nadura Express', 'סלט נדורה', 'Bandora Express: green salad dressed with olive oil and lemon, pieces of shawarma/spring chicken/turkey strips, grilled onion, tehina, sumak, and parsley ', '', 42, 'img/bandora_items/bandora_express.png', 164),
(66, 15, 'Amami Salad', 'סלט עממי', 'Ammami Salad: green salad dressed with za''atar and lemon, pita chips, pieces of shawarma/spring chicken, grilled onion, pinenuts, and tehina', '', 42, 'restapi/images/test.png', 165),
(67, 15, 'Medura', 'מדורה', 'Medura Plate: Tomatoes, onions, hot peppers, and tehina, garnished with a sprig of parsley', '', 19, 'restapi/images/test.png', 166),
(68, 16, 'Chummus and Techina', 'חומוס עם טחינה', 'Chummus, tehina, olive oil, and pinenuts', '', 25, 'img/bandora_items/chummus_and _techina.png', 167),
(69, 16, 'Mixed meat chummus', 'חומוס עם בשר מעורב', 'Mixed Grill Chummus', '', 39, 'restapi/images/test.png', 168),
(70, 16, 'Chummus Bandora', 'חומוס בנדורה', 'Chummus Bandora', '', 39, 'restapi/images/test.png', 169),
(71, 17, 'Coca Cola', 'קוקה קולה', '', '', 10, 'img/drinks/1-100x100.png', 170),
(72, 17, 'Fuze Tea', 'פיוז טה', '', '', 10, 'img/drinks/CC063.png', 171),
(73, 17, 'Prigat Grape', 'פריגת ענבים', '', '', 10, 'img/drinks/Prigan_grapefruit.png', 172),
(74, 17, 'Coca Cola Zero', 'קוקה קולה זירו', '', '', 10, 'img/drinks/download.png', 173),
(75, 17, 'Diet Coke', 'דייט קוקה קולה', '', '', 10, 'img/drinks/coca-cola-diet-1-75-litre.png', 174),
(76, 17, 'Fanta', 'פנטה', '', '', 10, 'img/drinks/download (1).png', 175),
(77, 17, 'Large Coca Cola', 'בקבוק קוקה קולה גדול', '', '', 14, 'img/drinks/PDP_Coca-Cola-HFCS-1.25-Liter-Bottle.png', 176),
(78, 17, 'Large Fuze Tea', 'בקבוק פיוז טי גדול', '', '', 14, 'restapi/images/test.png', 177);

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
(3, 3, 'Lunch', 'ארוחת צהריים', 102);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `item_id` int(11) DEFAULT NULL,
  `subitem_id` int(11) DEFAULT NULL,
  `item_name` varchar(255) DEFAULT NULL,
  `subitem_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `item_id` (`item_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=127 ;

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `restaurants`
--

INSERT INTO `restaurants` (`id`, `name_en`, `name_he`, `logo`, `description_en`, `description_he`, `address_en`, `address_he`) VALUES
(1, 'Angus', 'אנגוס', 'http://dev.bot2.orderapp.com/img/angos_logo.png', 'Angus is an entrecote bar located in the heart of Bet Shemesh. \nWe have a large selection of fresh, excellent quality chicken and meat dishes. Choose from: chicken tortilla, chicken sandwiches, entrecote sandwiches, duck breast sandwiches, decadent salads, a variety of side dishes and more. That''s not all - try our delicious business options!', 'מסעדת אנגוס אנטריקוט בר הכשרה בבית-שמש ידועה בתפריט העשיר והמפתה שלה, הכולל מבחר נתחי בשר ועוף טריים ואיכותיים. לבחירתכם: טורטייה במילוי פרגית ועוף, כריכים מעולים עם שלל מילויים (אנטריקוט, חזה אווז ופרגית), סלטים מפנקים, מגוון תוספות ועוד. זה לא הכול – נסו את העסקיות המשתלמות של אנגוס!', '\nYitzhak Rabin through 5, Beit Shemesh', 'דרך יצחק רבין 5,בית שמש'),
(2, 'Meshulashim', 'פיצה משולשים', 'http://dev.bot2.orderapp.com/img/meshulashim_logo.png', 'The best pizza in Bet Shemesh. We only use fresh products in our classic dishes. It''s the type of place Bet Shemesh has been yearning for. Try one of the creative ones such as our spicy pizza or go classic with our margarita pizza. Either way, you gotta get a pizza here!', 'הפיצריה כשרה ומגישה מבחר של מנות כגון פיצות, פסטות ברטבים עשירים, סלטים מירקות טריים הנחתכים במקום, בורקסים בטעמים וכן גם טוסטים. ניתן להזמין את הפיצות הטעימות של משולשים גם ללא גלוטן.', '\r\nSderot Yigal Allon 6, Canyon Gate City, Beit Shemesh', 'שד'' יגאל אלון 6, קניון שער העיר, בית שמש'),
(3, 'Bandora', 'בנדורה', 'http://dev.bot2.orderapp.com/img/bandora_logo.png', 'Bandora is known for its high-quality meats. Our traditional charcoal grill gives the shawarma a unique flavor and aroma; flavors reminiscent of homecooked meals made in distant villages in Turkey, Jordan, Syria and Egypt.', 'בנדורה היא שילוב מנצח של בשר שווארמה איכותי, אשר שוכב על גחלים וניצלה בצורה מסורתית, המעניק לבשר השווארמה טעמים וארומה ייחודיים, טעמים המגיעים אלנו מהכפרים הרחוקים של תורכיה, ירדן, סוריה ומצרים.', '\nSderot Yigal Allon 6, Canyon Gate City, Beit Shemesh', 'שד'' יגאל אלון 6, קניון שער העיר, בית שמש');

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=21 ;

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
(13, 2, 'img/mesh_gallery/mesh_2.png');

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1074 ;

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
(160, 2, 'Small Sweet potato fries', 'צ''יפס בטטה- קטן\n', 14, 259),
(161, 2, 'American fries', 'צ''יפס אמריקאי', 14, 260),
(162, 2, 'onion rings', 'טבעות בצל', 14, 261),
(163, 2, 'Mexican nachos', 'נאצ''וס מקסיקני מטוגן', 12, 262),
(164, 2, 'crispy chicken wings', 'כנפי עוף קריספיות ברוטב', 25, 263),
(165, 2, 'Large Sweet Potato fries', 'צ''יפס בטטה- גדול', 25, 264),
(166, 2, '50g Goose Breast', '50 גר'' חזה אווז', 8, 265),
(167, 2, 'Egg', 'ביצה', 4, 266),
(168, 2, 'Portobello Mushroom', 'פורטובלו', 4, 267),
(169, 5, 'Small Sweet potato fries', 'צ''יפס בטטה- קטן\n', 14, 268),
(170, 5, 'American fries', 'צ''יפס אמריקאי', 14, 269),
(171, 5, 'onion rings', 'טבעות בצל', 14, 270),
(172, 5, 'Mexican nachos', 'נאצ''וס מקסיקני מטוגן', 12, 271),
(173, 5, 'crispy chicken wings', 'כנפי עוף קריספיות ברוטב', 25, 272),
(174, 5, 'Large Sweet Potato fries', 'צ''יפס בטטה- גדול', 25, 273),
(175, 5, 'Egg', 'ביצה', 4, 274),
(176, 5, 'Portobello Mushroom', 'פורטובלו', 4, 275),
(177, 8, 'Small Sweet potato fries', 'צ''יפס בטטה- קטן\n', 14, 276),
(178, 8, 'American fries', 'צ''יפס אמריקאי', 14, 277),
(179, 8, 'onion rings', 'טבעות בצל', 14, 278),
(180, 8, 'Mexican nachos', 'נאצ''וס מקסיקני מטוגן', 12, 279),
(181, 8, 'crispy chicken wings', 'כנפי עוף קריספיות ברוטב', 25, 280),
(182, 8, 'Large Sweet Potato fries', 'צ''יפס בטטה- גדול', 25, 281),
(183, 8, 'Egg', 'ביצה', 4, 282),
(184, 8, 'Portobello Mushroom', 'פורטובלו', 4, 283),
(185, 11, 'Small Sweet potato fries', 'צ''יפס בטטה- קטן\n', 14, 284),
(186, 11, 'American fries', 'צ''יפס אמריקאי', 14, 285),
(187, 11, 'onion rings', 'טבעות בצל', 14, 286),
(188, 11, 'Mexican nachos', 'נאצ''וס מקסיקני מטוגן', 12, 287),
(189, 11, 'crispy chicken wings', 'כנפי עוף קריספיות ברוטב', 25, 288),
(190, 11, 'Large Sweet Potato fries', 'צ''יפס בטטה- גדול', 25, 289),
(191, 11, 'Egg', 'ביצה', 4, 290),
(192, 11, 'Portobello Mushroom', 'פורטובלו', 4, 291),
(193, 14, 'Small Sweet potato fries', 'צ''יפס בטטה- קטן\n', 14, 292),
(194, 14, 'American fries', 'צ''יפס אמריקאי', 14, 293),
(195, 14, 'onion rings', 'טבעות בצל', 14, 294),
(196, 14, 'Mexican nachos', 'נאצ''וס מקסיקני מטוגן', 12, 295),
(197, 14, 'crispy chicken wings', 'כנפי עוף קריספיות ברוטב', 25, 296),
(198, 14, 'Large Sweet Potato fries', 'צ''יפס בטטה- גדול', 25, 297),
(199, 14, '50 grams goose breast', '50 גר'' חזה אווז', 8, 298),
(200, 14, '150 grams goose breast or entrecote', '150 גר'' חזה אווז או אנטריקוט', 19, 299),
(201, 14, 'egg', 'ביצה', 4, 300),
(202, 14, 'portobello mushroom', 'פורטובלו', 4, 301),
(203, 17, 'Small Sweet potato fries', 'צ''יפס בטטה- קטן\n', 14, 302),
(204, 17, 'American fries', 'צ''יפס אמריקאי', 14, 303),
(205, 17, 'onion rings', 'טבעות בצל', 14, 304),
(206, 17, 'Mexican nachos', 'נאצ''וס מקסיקני מטוגן', 12, 305),
(207, 17, 'crispy chicken wings', 'כנפי עוף קריספיות ברוטב', 25, 306),
(208, 17, 'Large Sweet Potato fries', 'צ''יפס בטטה- גדול', 25, 307),
(209, 17, '50 grams goose breast', '50 גר'' חזה אווז', 8, 308),
(210, 17, 'egg', 'ביצה', 4, 309),
(211, 17, 'portobello mushroom', 'פורטובלו', 4, 310),
(212, 20, 'Small Sweet potato fries', 'צ''יפס בטטה- קטן\n', 14, 311),
(213, 20, 'American fries', 'צ''יפס אמריקאי', 14, 312),
(214, 20, 'onion rings', 'טבעות בצל', 14, 313),
(215, 20, 'Mexican nachos', 'נאצ''וס מקסיקני מטוגן', 12, 314),
(216, 20, 'crispy chicken wings', 'כנפי עוף קריספיות ברוטב', 25, 315),
(217, 20, 'Large Sweet Potato fries', 'צ''יפס בטטה- גדול', 25, 316),
(218, 20, '50 grams goose breast', '50 גר'' חזה אווז', 8, 317),
(219, 20, 'egg', 'ביצה', 4, 318),
(220, 20, 'portobello mushroom', 'פורטובלו', 4, 319),
(221, 23, 'Small Sweet potato fries', 'צ''יפס בטטה- קטן\n', 14, 320),
(222, 23, 'American fries', 'צ''יפס אמריקאי', 14, 321),
(223, 23, 'onion rings', 'טבעות בצל', 14, 322),
(224, 23, 'Mexican nachos', 'נאצ''וס מקסיקני מטוגן', 12, 323),
(225, 23, 'crispy chicken wings', 'כנפי עוף קריספיות ברוטב', 25, 324),
(226, 23, 'Large Sweet Potato fries', 'צ''יפס בטטה- גדול', 25, 325),
(227, 23, '50 grams goose breast', '50 גר'' חזה אווז', 8, 326),
(228, 23, 'egg', 'ביצה', 4, 327),
(229, 23, 'portobello mushroom', 'פורטובלו', 4, 328),
(230, 26, 'Small Sweet potato fries', 'צ''יפס בטטה- קטן\n', 14, 329),
(231, 26, 'American fries', 'צ''יפס אמריקאי', 14, 330),
(232, 26, 'onion rings', 'טבעות בצל', 14, 331),
(233, 26, 'Mexican nachos', 'נאצ''וס מקסיקני מטוגן', 12, 332),
(234, 26, 'crispy chicken wings', 'כנפי עוף קריספיות ברוטב', 25, 333),
(235, 26, '50 grams goose breast', '50 גר'' חזה אווז', 8, 334),
(236, 26, 'egg', 'ביצה', 4, 335),
(237, 26, 'portobello mushroom', 'פורטובלו', 4, 336),
(238, 26, 'Large Sweet Potato fries', 'צ''יפס בטטה- גדול', 25, 337),
(239, 29, 'Small Sweet potato fries', 'צ''יפס בטטה- קטן\n', 14, 338),
(240, 29, 'American fries', 'צ''יפס אמריקאי', 14, 339),
(241, 29, 'onion rings', 'טבעות בצל', 14, 340),
(242, 29, 'Mexican nachos', 'נאצ''וס מקסיקני מטוגן', 12, 341),
(243, 29, 'crispy chicken wings', 'כנפי עוף קריספיות ברוטב', 25, 342),
(244, 29, 'Large Sweet Potato fries', 'צ''יפס בטטה- גדול', 25, 343),
(245, 29, 'portobello mushroom', 'פורטובלו', 4, 344),
(246, 32, 'Small Sweet potato fries', 'צ''יפס בטטה- קטן\n', 14, 345),
(247, 32, 'American fries', 'צ''יפס אמריקאי', 14, 346),
(248, 32, 'onion rings', 'טבעות בצל', 14, 347),
(249, 32, 'Mexican nachos', 'נאצ''וס מקסיקני מטוגן', 12, 348),
(250, 32, 'crispy chicken wings', 'כנפי עוף קריספיות ברוטב', 25, 349),
(251, 32, 'Large Sweet Potato fries', 'צ''יפס בטטה- גדול', 25, 350),
(252, 1, 'Small', 'קטן', 40, 351),
(253, 1, 'Large', 'גדול', 45, 352),
(254, 35, 'Small Sweet potato fries', 'צ''יפס בטטה- קטן\n', 14, 353),
(255, 35, 'American fries', 'צ''יפס אמריקאי', 14, 354),
(256, 35, 'onion rings', 'טבעות בצל', 14, 355),
(257, 35, 'Mexican nachos', 'נאצ''וס מקסיקני מטוגן', 12, 356),
(258, 35, 'crispy chicken wings', 'כנפי עוף קריספיות ברוטב', 25, 357),
(259, 35, 'Large Sweet Potato fries', 'צ''יפס בטטה- גדול', 25, 358),
(260, 35, '80 grams goose liver', '80 גר'' כבד אווז', 30, 359),
(261, 35, '150 grams goose breast or entrecote', '150 גרם חזה אווז או אטנריקוט', 19, 360),
(262, 38, 'Small Sweet potato fries', 'צ''יפס בטטה- קטן\n', 14, 361),
(263, 38, 'American fries', 'צ''יפס אמריקאי', 14, 362),
(264, 38, 'onion rings', 'טבעות בצל', 14, 363),
(265, 38, 'Mexican nachos', 'נאצ''וס מקסיקני מטוגן', 12, 364),
(266, 38, 'crispy chicken wings', 'כנפי עוף קריספיות ברוטב', 25, 365),
(267, 38, 'Large Sweet Potato fries', 'צ''יפס בטטה- גדול', 25, 366),
(268, 38, '170 grams chicken breast', '170 גר'' חזה עוף', 18, 367),
(269, 38, 'egg', 'ביצה', 4, 368),
(270, 38, 'portobello mushroom', 'פורטובלו', 4, 369),
(271, 41, 'Onions', 'בצל', 5, 370),
(272, 41, 'Mushrooms', 'פטריות', 5, 371),
(273, 41, 'Olives', 'זיתים', 5, 372),
(274, 41, 'Tomatoes', 'עגבניות', 5, 373),
(275, 41, 'Corn', 'תירס', 5, 374),
(276, 41, 'Vegan Cheese', 'גבינה טבעונית', 10, 375),
(277, 41, 'Egg', 'ביצה', 1, 376),
(278, 41, 'Cheese Bureka', 'בורקס גבינה', 10, 377),
(279, 41, 'Potato Bureka', 'בורקס תפו״א', 10, 378),
(280, 41, 'Deluxe Bureka', 'בורקס פינוק', 18, 379),
(281, 41, 'Edamame', 'אדממה', 15, 380),
(282, 41, 'Home Fries', 'הום פרייז', 28, 381),
(283, 41, 'Fries', 'צ''פס', 18, 382),
(290, 43, 'Onions', 'בצל', 0, 383),
(291, 43, 'Mushrooms', 'פטריות', 0, 384),
(292, 43, 'Olives', 'זיתים', 0, 385),
(293, 43, 'Tomatoes', 'עגבניות', 0, 386),
(294, 43, 'Corn', 'תירס', 0, 387),
(295, 43, 'Vegan Cheese', 'גבינה טבעונית', 0, 388),
(296, 43, 'Egg', 'ביצה', 1, 389),
(297, 43, 'Cheese Bureka', 'בורקס גבינה', 10, 390),
(298, 43, 'Potato Bureka', 'בורקס תפו״א', 10, 391),
(299, 43, 'Deluxe Bureka', 'בורקס פינוק', 18, 392),
(300, 43, 'Edamame', 'אדממה', 15, 393),
(301, 43, 'Home Fries', 'הום פרייז', 28, 394),
(302, 43, 'Fries', 'צ''פס', 18, 395),
(309, 45, 'Onions', 'בצל', 5, 396),
(310, 45, 'Mushrooms', 'פטריות', 5, 397),
(311, 45, 'Olives', 'זיתים', 5, 398),
(312, 45, 'Tomatoes', 'עגבניות', 5, 399),
(313, 45, 'Corn', 'תירס', 5, 400),
(314, 45, 'Vegan Cheese', 'גבינה טבעונית', 10, 401),
(315, 45, 'Egg', 'ביצה', 1, 402),
(316, 45, 'Cheese Bureka', 'בורקס גבינה', 10, 403),
(317, 45, 'Potato Bureka', 'בורקס תפו״א', 10, 404),
(318, 45, 'Deluxe Bureka', 'בורקס פינוק', 18, 405),
(319, 45, 'Edamame', 'אדממה', 15, 406),
(320, 45, 'Home Fries', 'הום פרייז', 28, 407),
(321, 45, 'Fries', 'צ''פס', 18, 408),
(328, 47, 'Onions', 'בצל', 5, 409),
(329, 47, 'Mushrooms', 'פטריות', 5, 410),
(330, 47, 'Olives', 'זיתים', 5, 411),
(331, 47, 'Tomatoes', 'עגבניות', 5, 412),
(332, 47, 'Corn', 'תירס', 5, 413),
(333, 47, 'Vegan Cheese', 'גבינה טבעונית', 10, 414),
(334, 47, 'Egg', 'ביצה', 1, 415),
(335, 47, 'Cheese Bureka', 'בורקס גבינה', 10, 416),
(336, 47, 'Potato Bureka', 'בורקס תפו״א', 10, 417),
(337, 47, 'Deluxe Bureka', 'בורקס פינוק', 18, 418),
(338, 47, 'Edamame', 'אדממה', 15, 419),
(339, 47, 'Home Fries', 'הום פרייז', 28, 420),
(340, 47, 'Fries', 'צ''פס', 18, 421),
(347, 49, 'Onions', 'בצל', 5, 423),
(348, 49, 'Mushrooms', 'פטריות', 5, 424),
(349, 49, 'Olives', 'זיתים', 5, 425),
(350, 49, 'Tomatoes', 'עגבניות', 5, 426),
(351, 49, 'Corn', 'תירס', 5, 427),
(352, 49, 'Vegan Cheese', 'גבינה טבעונית', 10, 428),
(353, 49, 'Egg', 'ביצה', 1, 429),
(354, 49, 'Cheese Bureka', 'בורקס גבינה', 10, 430),
(355, 49, 'Potato Bureka', 'בורקס תפו״א', 10, 431),
(356, 49, 'Deluxe Bureka', 'בורקס פינוק', 18, 432),
(357, 49, 'Edamame', 'אדממה', 15, 433),
(358, 49, 'Home Fries', 'הום פרייז', 28, 434),
(359, 49, 'Fries', 'צ''פס', 18, 435),
(366, 51, 'Onions', 'בצל', 5, 436),
(367, 51, 'Mushrooms', 'פטריות', 5, 437),
(368, 51, 'Olives', 'זיתים', 5, 438),
(369, 51, 'Tomatoes', 'עגבניות', 5, 439),
(370, 51, 'Corn', 'תירס', 5, 440),
(371, 51, 'Vegan Cheese', 'גבינה טבעונית', 10, 441),
(372, 51, 'Egg', 'ביצה', 1, 442),
(373, 51, 'Cheese Bureka', 'בורקס גבינה', 10, 443),
(374, 51, 'Potato Bureka', 'בורקס תפו״א', 10, 444),
(375, 51, 'Deluxe Bureka', 'בורקס פינוק', 18, 445),
(376, 51, 'Edamame', 'אדממה', 15, 446),
(377, 51, 'Home Fries', 'הום פרייז', 28, 447),
(378, 51, 'Fries', 'צ''פס', 18, 448),
(385, 53, 'Onions', 'בצל', 5, 449),
(386, 53, 'Mushrooms', 'פטריות', 5, 450),
(387, 53, 'Olives', 'זיתים', 5, 451),
(388, 53, 'Tomatoes', 'עגבניות', 5, 452),
(389, 53, 'Corn', 'תירס', 5, 453),
(390, 53, 'Vegan Cheese', 'גבינה טבעונית', 10, 454),
(391, 53, 'Egg', 'ביצה', 1, 455),
(392, 53, 'Cheese Bureka', 'בורקס גבינה', 10, 456),
(393, 53, 'Potato Bureka', 'בורקס תפו״א', 10, 457),
(394, 53, 'Deluxe Bureka', 'בורקס פינוק', 18, 458),
(395, 53, 'Edamame', 'אדממה', 15, 459),
(396, 53, 'Home Fries', 'הום פרייז', 28, 460),
(397, 53, 'Fries', 'צ''פס', 18, 461),
(404, 55, 'Onions', 'בצל', 5, 463),
(405, 55, 'Mushrooms', 'פטריות', 5, 464),
(406, 55, 'Olives', 'זיתים', 5, 465),
(407, 55, 'Tomatoes', 'עגבניות', 5, 466),
(408, 55, 'Corn', 'תירס', 5, 467),
(409, 55, 'Vegan Cheese', 'גבינה טבעונית', 10, 468),
(410, 55, 'Egg', 'ביצה', 1, 469),
(411, 55, 'Cheese Bureka', 'בורקס גבינה', 10, 470),
(412, 55, 'Potato Bureka', 'בורקס תפו״א', 10, 471),
(413, 55, 'Deluxe Bureka', 'בורקס פינוק', 18, 472),
(414, 55, 'Edamame', 'אדממה', 15, 473),
(415, 55, 'Home Fries', 'הום פרייז', 28, 474),
(416, 55, 'Fries', 'צ''פס', 18, 475),
(423, 57, 'Onions', 'בצל', 5, 476),
(424, 57, 'Mushrooms', 'פטריות', 5, 477),
(425, 57, 'Olives', 'זיתים', 5, 478),
(426, 57, 'Tomatoes', 'עגבניות', 5, 479),
(427, 57, 'Corn', 'תירס', 5, 480),
(428, 57, 'Vegan Cheese', 'גבינה טבעונית', 10, 481),
(429, 57, 'Egg', 'ביצה', 1, 482),
(430, 57, 'Cheese Bureka', 'בורקס גבינה', 10, 483),
(431, 57, 'Potato Bureka', 'בורקס תפו״א', 10, 484),
(432, 57, 'Deluxe Bureka', 'בורקס פינוק', 18, 485),
(433, 57, 'Edamame', 'אדממה', 15, 486),
(434, 57, 'Home Fries', 'הום פרייז', 28, 487),
(435, 57, 'Fries', 'צ''פס', 18, 488),
(442, 59, 'Onions', 'בצל', 5, 489),
(443, 59, 'Mushrooms', 'פטריות', 5, 490),
(444, 59, 'Olives', 'זיתים', 5, 491),
(445, 59, 'Tomatoes', 'עגבניות', 5, 492),
(446, 59, 'Corn', 'תירס', 5, 493),
(447, 59, 'Vegan Cheese', 'גבינה טבעונית', 10, 494),
(448, 59, 'Egg', 'ביצה', 1, 495),
(449, 59, 'Cheese Bureka', 'בורקס גבינה', 10, 496),
(450, 59, 'Potato Bureka', 'בורקס תפו״א', 10, 497),
(451, 59, 'Deluxe Bureka', 'בורקס פינוק', 18, 498),
(452, 59, 'Edamame', 'אדממה', 15, 499),
(453, 59, 'Home Fries', 'הום פרייז', 28, 500),
(454, 59, 'Fries', 'צ''פס', 18, 501),
(461, 61, 'Onions', 'בצל', 5, 502),
(462, 61, 'Mushrooms', 'פטריות', 5, 503),
(463, 61, 'Olives', 'זיתים', 5, 504),
(464, 61, 'Tomatoes', 'עגבניות', 5, 505),
(465, 61, 'Corn', 'תירס', 5, 506),
(466, 61, 'Vegan Cheese', 'גבינה טבעונית', 10, 507),
(467, 61, 'Egg', 'ביצה', 1, 508),
(468, 61, 'Cheese Bureka', 'בורקס גבינה', 10, 509),
(469, 61, 'Potato Bureka', 'בורקס תפו״א', 10, 510),
(470, 61, 'Deluxe Bureka', 'בורקס פינוק', 18, 511),
(471, 61, 'Edamame', 'אדממה', 15, 512),
(472, 61, 'Home Fries', 'הום פרייז', 28, 513),
(473, 61, 'Fries', 'צ''פס', 18, 514),
(480, 63, 'Onions', 'בצל', 5, 515),
(481, 63, 'Mushrooms', 'פטריות', 5, 516),
(482, 63, 'Olives', 'זיתים', 5, 517),
(483, 63, 'Tomatoes', 'עגבניות', 5, 518),
(484, 63, 'Corn', 'תירס', 5, 519),
(485, 63, 'Vegan Cheese', 'גבינה טבעונית', 10, 520),
(486, 63, 'Egg', 'ביצה', 1, 521),
(487, 63, 'Cheese Bureka', 'בורקס גבינה', 10, 522),
(488, 63, 'Potato Bureka', 'בורקס תפו״א', 10, 523),
(489, 63, 'Deluxe Bureka', 'בורקס פינוק', 18, 524),
(490, 63, 'Edamame', 'אדממה', 15, 525),
(491, 63, 'Home Fries', 'הום פרייז', 28, 526),
(492, 63, 'Fries', 'צ''פס', 18, 527),
(499, 65, 'Onions', 'בצל', 5, 528),
(500, 65, 'Mushrooms', 'פטריות', 5, 529),
(501, 65, 'Olives', 'זיתים', 5, 530),
(502, 65, 'Tomatoes', 'עגבניות', 5, 531),
(503, 65, 'Corn', 'תירס', 5, 532),
(504, 65, 'Vegan Cheese', 'גבינה טבעונית', 10, 533),
(505, 65, 'Egg', 'ביצה', 1, 534),
(506, 65, 'Cheese Bureka', 'בורקס גבינה', 10, 535),
(507, 65, 'Potato Bureka', 'בורקס תפו״א', 10, 536),
(508, 65, 'Deluxe Bureka', 'בורקס פינוק', 18, 537),
(509, 65, 'Edamame', 'אדממה', 15, 538),
(510, 65, 'Home Fries', 'הום פרייז', 28, 539),
(511, 65, 'Fries', 'צ''פס', 18, 540),
(518, 67, 'Penne', 'פנה', 0, 541),
(519, 67, 'Linguine', 'לינגוויני', 0, 542),
(520, 67, 'Fettuccine', 'לינגוויני', 0, 543),
(521, 68, 'Onions', 'בצל', 5, 544),
(522, 68, 'Mushrooms', 'פטריות', 5, 545),
(523, 68, 'Olives', 'זיתים', 5, 546),
(524, 68, 'Tomatoes', 'עגבניות', 5, 547),
(525, 68, 'Corn', 'תירס', 5, 548),
(526, 68, 'Vegan Cheese', 'גבינה טבעונית', 10, 549),
(527, 68, 'Egg', 'ביצה', 1, 550),
(528, 68, 'Cheese Bureka', 'בורקס גבינה', 10, 551),
(529, 68, 'Potato Bureka', 'בורקס תפו״א', 10, 552),
(530, 68, 'Deluxe Bureka', 'בורקס פינוק', 18, 553),
(531, 68, 'Edamame', 'אדממה', 15, 554),
(532, 68, 'Home Fries', 'הום פרייז', 28, 555),
(533, 68, 'Fries', 'צ''פס', 18, 556),
(540, 70, 'Penne', 'פנה', 0, 557),
(541, 70, 'Linguine', 'לינגוויני', 0, 558),
(542, 70, 'Fettuccine', 'לינגוויני', 0, 559),
(543, 71, 'Onions', 'בצל', 5, 560),
(544, 71, 'Mushrooms', 'פטריות', 5, 561),
(545, 71, 'Olives', 'זיתים', 5, 562),
(546, 71, 'Tomatoes', 'עגבניות', 5, 563),
(547, 71, 'Corn', 'תירס', 5, 564),
(548, 71, 'Vegan Cheese', 'גבינה טבעונית', 10, 565),
(549, 71, 'Egg', 'ביצה', 1, 566),
(550, 71, 'Cheese Bureka', 'בורקס גבינה', 10, 567),
(551, 71, 'Potato Bureka', 'בורקס תפו״א', 10, 568),
(552, 71, 'Deluxe Bureka', 'בורקס פינוק', 18, 569),
(553, 71, 'Edamame', 'אדממה', 15, 570),
(554, 71, 'Home Fries', 'הום פרייז', 28, 571),
(555, 71, 'Fries', 'צ''פס', 18, 572),
(562, 73, 'Penne', 'פנה', 0, 573),
(563, 73, 'Linguine', 'לינגוויני', 0, 574),
(564, 73, 'Fettuccine', 'לינגוויני', 0, 575),
(565, 74, 'Onions', 'בצל', 5, 576),
(566, 74, 'Mushrooms', 'פטריות', 5, 577),
(567, 74, 'Olives', 'זיתים', 5, 578),
(568, 74, 'Tomatoes', 'עגבניות', 5, 579),
(569, 74, 'Corn', 'תירס', 5, 580),
(570, 74, 'Vegan Cheese', 'גבינה טבעונית', 10, 581),
(571, 74, 'Egg', 'ביצה', 1, 582),
(572, 74, 'Cheese Bureka', 'בורקס גבינה', 10, 583),
(573, 74, 'Potato Bureka', 'בורקס תפו״א', 10, 584),
(574, 74, 'Deluxe Bureka', 'בורקס פינוק', 18, 585),
(575, 74, 'Edamame', 'אדממה', 15, 586),
(576, 74, 'Home Fries', 'הום פרייז', 28, 587),
(577, 74, 'Fries', 'צ''פס', 18, 588),
(584, 76, 'Penne', 'פנה', 0, 589),
(585, 76, 'Linguine', 'לינגוויני', 0, 590),
(586, 76, 'Fettuccine', 'לינגוויני', 0, 591),
(587, 77, 'Onions', 'בצל', 5, 592),
(588, 77, 'Mushrooms', 'פטריות', 5, 593),
(589, 77, 'Olives', 'זיתים', 5, 594),
(590, 77, 'Tomatoes', 'עגבניות', 5, 595),
(591, 77, 'Corn', 'תירס', 5, 596),
(592, 77, 'Vegan Cheese', 'גבינה טבעונית', 10, 597),
(593, 77, 'Egg', 'ביצה', 1, 598),
(594, 77, 'Cheese Bureka', 'בורקס גבינה', 10, 599),
(595, 77, 'Potato Bureka', 'בורקס תפו״א', 10, 600),
(596, 77, 'Deluxe Bureka', 'בורקס פינוק', 18, 601),
(597, 77, 'Edamame', 'אדממה', 15, 602),
(598, 77, 'Home Fries', 'הום פרייז', 28, 603),
(599, 77, 'Fries', 'צ''פס', 18, 604),
(606, 79, 'Penne', 'פנה', 0, 605),
(607, 79, 'Linguine', 'לינגוויני', 0, 606),
(608, 79, 'Fettuccine', 'לינגוויני', 0, 607),
(609, 80, 'Onions', 'בצל', 5, 608),
(610, 80, 'Mushrooms', 'פטריות', 5, 609),
(611, 80, 'Olives', 'זיתים', 5, 610),
(612, 80, 'Tomatoes', 'עגבניות', 5, 611),
(613, 80, 'Corn', 'תירס', 5, 612),
(614, 80, 'Vegan Cheese', 'גבינה טבעונית', 10, 613),
(615, 80, 'Egg', 'ביצה', 1, 614),
(616, 80, 'Cheese Bureka', 'בורקס גבינה', 10, 615),
(617, 80, 'Potato Bureka', 'בורקס תפו״א', 10, 616),
(618, 80, 'Deluxe Bureka', 'בורקס פינוק', 18, 617),
(619, 80, 'Edamame', 'אדממה', 15, 618),
(620, 80, 'Home Fries', 'הום פרייז', 28, 619),
(621, 80, 'Fries', 'צ''פס', 18, 620),
(628, 82, 'Onions', 'בצל', 5, 621),
(629, 82, 'Mushrooms', 'פטריות', 5, 622),
(630, 82, 'Olives', 'זיתים', 5, 623),
(631, 82, 'Tomatoes', 'עגבניות', 5, 624),
(632, 82, 'Corn', 'תירס', 5, 625),
(633, 82, 'Vegan Cheese', 'גבינה טבעונית', 10, 626),
(634, 82, 'Egg', 'ביצה', 1, 627),
(635, 82, 'Cheese Bureka', 'בורקס גבינה', 10, 628),
(636, 82, 'Potato Bureka', 'בורקס תפו״א', 10, 629),
(637, 82, 'Deluxe Bureka', 'בורקס פינוק', 18, 630),
(638, 82, 'Edamame', 'אדממה', 15, 631),
(639, 82, 'Home Fries', 'הום פרייז', 28, 632),
(640, 82, 'Fries', 'צ''פס', 18, 633),
(647, 84, 'Onions', 'בצל', 5, 634),
(648, 84, 'Mushrooms', 'פטריות', 5, 635),
(649, 84, 'Olives', 'זיתים', 5, 636),
(650, 84, 'Tomatoes', 'עגבניות', 5, 637),
(651, 84, 'Corn', 'תירס', 5, 638),
(652, 84, 'Vegan Cheese', 'גבינה טבעונית', 10, 639),
(653, 84, 'Egg', 'ביצה', 1, 640),
(654, 84, 'Cheese Bureka', 'בורקס גבינה', 10, 641),
(655, 84, 'Potato Bureka', 'בורקס תפו״א', 10, 642),
(656, 84, 'Deluxe Bureka', 'בורקס פינוק', 18, 643),
(657, 84, 'Edamame', 'אדממה', 15, 644),
(658, 84, 'Home Fries', 'הום פרייז', 28, 645),
(659, 84, 'Fries', 'צ''פס', 18, 646),
(666, 86, 'Onions', 'בצל', 5, 647),
(667, 86, 'Mushrooms', 'פטריות', 5, 648),
(668, 86, 'Olives', 'זיתים', 5, 649),
(669, 86, 'Tomatoes', 'עגבניות', 5, 650),
(670, 86, 'Corn', 'תירס', 5, 651),
(671, 86, 'Vegan Cheese', 'גבינה טבעונית', 10, 652),
(672, 86, 'Egg', 'ביצה', 1, 653),
(673, 86, 'Cheese Bureka', 'בורקס גבינה', 10, 654),
(674, 86, 'Potato Bureka', 'בורקס תפו״א', 10, 655),
(675, 86, 'Deluxe Bureka', 'בורקס פינוק', 18, 656),
(676, 86, 'Edamame', 'אדממה', 15, 657),
(677, 86, 'Home Fries', 'הום פרייז', 28, 658),
(678, 86, 'Fries', 'צ''פס', 18, 659),
(685, 88, 'Onions', 'בצל', 5, 660),
(686, 88, 'Mushrooms', 'פטריות', 5, 661),
(687, 88, 'Olives', 'זיתים', 5, 662),
(688, 88, 'Tomatoes', 'עגבניות', 5, 663),
(689, 88, 'Corn', 'תירס', 5, 664),
(690, 88, 'Vegan Cheese', 'גבינה טבעונית', 10, 665),
(691, 88, 'Egg', 'ביצה', 1, 666),
(692, 88, 'Cheese Bureka', 'בורקס גבינה', 10, 667),
(693, 88, 'Potato Bureka', 'בורקס תפו״א', 10, 668),
(694, 88, 'Deluxe Bureka', 'בורקס פינוק', 18, 669),
(695, 88, 'Edamame', 'אדממה', 15, 670),
(696, 88, 'Home Fries', 'הום פרייז', 28, 671),
(697, 88, 'Fries', 'צ''פס', 18, 672),
(704, 90, 'Onions', 'בצל', 5, 673),
(705, 90, 'Mushrooms', 'פטריות', 5, 674),
(706, 90, 'Olives', 'זיתים', 5, 675),
(707, 90, 'Tomatoes', 'עגבניות', 5, 676),
(708, 90, 'Corn', 'תירס', 5, 677),
(709, 90, 'Vegan Cheese', 'גבינה טבעונית', 10, 678),
(710, 90, 'Egg', 'ביצה', 1, 679),
(711, 90, 'Cheese Bureka', 'בורקס גבינה', 10, 680),
(712, 90, 'Potato Bureka', 'בורקס תפו״א', 10, 681),
(713, 90, 'Deluxe Bureka', 'בורקס פינוק', 18, 682),
(714, 90, 'Edamame', 'אדממה', 15, 683),
(715, 90, 'Home Fries', 'הום פרייז', 28, 684),
(716, 90, 'Fries', 'צ''פס', 18, 685),
(827, 105, 'Pita', 'פיתה', 33, 686),
(828, 105, 'Baguette', 'בגט', 39, 687),
(829, 105, 'Laffa', 'לאפה', 39, 688),
(830, 105, 'Plate', 'צלחת', 45, 689),
(831, 106, 'Veal', 'בשר עגל', 0, 690),
(832, 106, 'Spring Chicken', 'פרגיות', 0, 691),
(833, 106, 'Mix', 'מעורב', 0, 692),
(834, 107, 'French Fries', 'צ''יפס', 0, 693),
(835, 107, 'Fried onions', 'בצל מטוגן', 0, 694),
(836, 107, 'Tomatoes', 'עגבניות', 0, 695),
(837, 107, 'Roasted Peppers', 'פלפל על האש', 0, 696),
(838, 108, 'Techina', 'טחינה', 0, 697),
(839, 108, 'Chummus', 'חומוס', 0, 698),
(840, 108, 'Amba', 'אמבה', 0, 699),
(841, 108, 'Spicy', 'חריף', 0, 700),
(842, 108, 'Babaghanoush', 'באבא גנוש', 0, 701),
(851, 110, 'Pita', 'פיתה', 35, 702),
(852, 110, 'Baguette', 'בגט', 39, 703),
(853, 110, 'Laffa', 'לאפה', 39, 704),
(854, 110, 'Plate', 'צלחת', 49, 705),
(855, 111, 'Veal', 'בשר עגל', 0, 706),
(856, 111, 'Spring Chicken', 'פרגיות', 0, 707),
(857, 111, 'Mix', 'מעורב', 0, 708),
(858, 112, 'French Fries', 'צ''יפס', 0, 709),
(859, 112, 'Fried onions', 'בצל מטוגן', 0, 710),
(860, 112, 'Tomatoes', 'עגבניות', 0, 711),
(861, 112, 'Roasted Peppers', 'פלפל על האש', 0, 712),
(862, 113, 'Techina', 'טחינה', 0, 713),
(863, 113, 'Chummus', 'חומוס', 0, 714),
(864, 113, 'Amba', 'אמבה', 0, 715),
(865, 113, 'Spicy', 'חריף', 0, 716),
(866, 113, 'Babaghanoush', 'באבא גנוש', 0, 717),
(875, 115, 'Pita', 'פיתה', 33, 721),
(876, 115, 'Baguette', 'בגט', 39, 722),
(877, 115, 'Laffa', 'לאפה', 39, 723),
(878, 115, 'Plate', 'צלחת', 45, 724),
(879, 116, 'Veal', 'בשר עגל', 0, 725),
(880, 116, 'Spring Chicken', 'פרגיות', 0, 726),
(881, 116, 'Mix', 'מעורב', 0, 727),
(882, 117, 'French Fries', 'צ''יפס', 0, 728),
(883, 117, 'Fried onions', 'בצל מטוגן', 0, 729),
(884, 117, 'Tomatoes', 'עגבניות', 0, 730),
(885, 117, 'Roasted Peppers', 'פלפל על האש', 0, 731),
(886, 118, 'Techina', 'טחינה', 0, 732),
(887, 118, 'Chummus', 'חומוס', 0, 733),
(888, 118, 'Amba', 'אמבה', 0, 734),
(889, 118, 'Spicy', 'חריף', 0, 735),
(890, 118, 'Babaghanoush', 'באבא גנוש', 0, 736),
(899, 120, 'Pita', 'פיתה', 35, 740),
(900, 120, 'Baguette', 'בגט', 39, 741),
(901, 120, 'Laffa', 'לאפה', 39, 742),
(902, 120, 'Plate', 'צלחת', 45, 743),
(903, 121, 'Veal', 'בשר עגל', 0, 744),
(904, 121, 'Spring Chicken', 'פרגיות', 0, 745),
(905, 121, 'Mix', 'מעורב', 0, 746),
(906, 122, 'French Fries', 'צ''יפס', 0, 747),
(907, 122, 'Fried onions', 'בצל מטוגן', 0, 748),
(908, 122, 'Tomatoes', 'עגבניות', 0, 749),
(909, 122, 'Roasted Peppers', 'פלפל על האש', 0, 750),
(910, 123, 'Techina', 'טחינה', 0, 751),
(911, 123, 'Chummus', 'חומוס', 0, 752),
(912, 123, 'Amba', 'אמבה', 0, 753),
(913, 123, 'Spicy', 'חריף', 0, 754),
(914, 123, 'Babaghanoush', 'באבא גנוש', 0, 755),
(923, 125, 'Pita', 'פיתה', 35, 756),
(924, 125, 'Baguette', 'בגט', 39, 757),
(925, 125, 'Laffa', 'לאפה', 39, 758),
(926, 125, 'Plate', 'צלחת', 45, 759),
(927, 126, 'Veal', 'בשר עגל', 0, 760),
(928, 126, 'Spring Chicken', 'פרגיות', 0, 761),
(929, 126, 'Mix', 'מעורב', 0, 762),
(930, 127, 'French Fries', 'צ''יפס', 0, 763),
(931, 127, 'Fried onions', 'בצל מטוגן', 0, 764),
(932, 127, 'Tomatoes', 'עגבניות', 0, 765),
(933, 127, 'Roasted Peppers', 'פלפל על האש', 0, 766),
(934, 128, 'Techina', 'טחינה', 0, 767),
(935, 128, 'Chummus', 'חומוס', 0, 768),
(936, 128, 'Amba', 'אמבה', 0, 769),
(937, 128, 'Spicy', 'חריף', 0, 770),
(938, 128, 'Babaghanoush', 'באבא גנוש', 0, 771),
(947, 130, 'Pita', 'פיתה', 35, 772),
(948, 130, 'Baguette', 'בגט', 39, 773),
(949, 130, 'Laffa', 'לאפה', 39, 774),
(950, 130, 'Plate', 'צלחת', 45, 775),
(951, 131, 'Veal', 'בשר עגל', 0, 776),
(952, 131, 'Spring Chicken', 'פרגיות', 0, 777),
(953, 131, 'Mix', 'מעורב', 0, 778),
(954, 132, 'French Fries', 'צ''יפס', 0, 779),
(955, 132, 'Fried onions', 'בצל מטוגן', 0, 780),
(956, 132, 'Tomatoes', 'עגבניות', 0, 781),
(957, 132, 'Roasted Peppers', 'פלפל על האש', 0, 782),
(958, 133, 'Techina', 'טחינה', 0, 783),
(959, 133, 'Chummus', 'חומוס', 0, 784),
(960, 133, 'Amba', 'אמבה', 0, 785),
(961, 133, 'Spicy', 'חריף', 0, 786),
(962, 133, 'Babaghanoush', 'באבא גנוש', 0, 787),
(971, 135, 'Pita', 'פיתה', 33, 788),
(972, 135, 'Baguette', 'בגט', 39, 789),
(973, 135, 'Laffa', 'לאפה', 39, 790),
(974, 135, 'Plate', 'צלחת', 45, 791),
(975, 136, 'Veal', 'בשר עגל', 0, 792),
(976, 136, 'Spring Chicken', 'פרגיות', 0, 793),
(977, 136, 'Mix', 'מעורב', 0, 794),
(978, 137, 'French Fries', 'צ''יפס', 0, 795),
(979, 137, 'Fried onions', 'בצל מטוגן', 0, 796),
(980, 137, 'Tomatoes', 'עגבניות', 0, 797),
(981, 137, 'Roasted Peppers', 'פלפל על האש', 0, 798),
(982, 138, 'Techina', 'טחינה', 0, 799),
(983, 138, 'Chummus', 'חומוס', 0, 800),
(984, 138, 'Amba', 'אמבה', 0, 801),
(985, 138, 'Spicy', 'חריף', 0, 802),
(986, 138, 'Babaghanoush', 'באבא גנוש', 0, 803),
(995, 140, 'Veal', 'בשר עגל', 0, 804),
(996, 140, 'Spring Chicken', 'פרגיות', 0, 805),
(997, 140, 'Mix', 'מעורב', 0, 806),
(998, 141, 'French Fries', 'צ''יפס', 0, 807),
(999, 141, 'Fried onions', 'בצל מטוגן', 0, 808),
(1000, 141, 'Tomatoes', 'עגבניות', 0, 809),
(1001, 141, 'Roasted Peppers', 'פלפל על האש', 0, 810),
(1002, 142, 'Techina', 'טחינה', 0, 811),
(1003, 142, 'Chummus', 'חומוס', 0, 812),
(1004, 142, 'Amba', 'אמבה', 0, 813),
(1005, 142, 'Spicy', 'חריף', 0, 814),
(1006, 142, 'Babaghanoush', 'באבא גנוש', 0, 815),
(1015, 144, 'Veal', 'בשר עגל', 0, 816),
(1016, 144, 'Spring Chicken', 'פרגיות', 0, 817),
(1017, 144, 'Mix', 'מעורב', 0, 818),
(1018, 145, 'French Fries', 'צ''יפס', 0, 819),
(1019, 145, 'Fried onions', 'בצל מטוגן', 0, 820),
(1020, 145, 'Tomatoes', 'עגבניות', 0, 821),
(1021, 145, 'Roasted Peppers', 'פלפל על האש', 0, 822),
(1022, 146, 'Techina', 'טחינה', 0, 823),
(1023, 146, 'Chummus', 'חומוס', 0, 824),
(1024, 146, 'Amba', 'אמבה', 0, 825),
(1025, 146, 'Spicy', 'חריף', 0, 826),
(1026, 146, 'Babaghanoush', 'באבא גנוש', 0, 827),
(1035, 148, 'Veal', 'בשר עגל', 0, 828),
(1036, 148, 'Spring Chicken', 'פרגיות', 0, 829),
(1037, 148, 'Mix', 'מעורב', 0, 830),
(1038, 149, 'French Fries', 'צ''יפס', 0, 831),
(1039, 149, 'Fried onions', 'בצל מטוגן', 0, 832),
(1040, 149, 'Tomatoes', 'עגבניות', 0, 833),
(1041, 149, 'Roasted Peppers', 'פלפל על האש', 0, 834),
(1042, 150, 'Techina', 'טחינה', 0, 835),
(1043, 150, 'Chummus', 'חומוס', 0, 836),
(1044, 150, 'Amba', 'אמבה', 0, 837),
(1045, 150, 'Spicy', 'חריף', 0, 838),
(1046, 150, 'Babaghanoush', 'באבא גנוש', 0, 839),
(1071, 154, 'Veal', 'בשר עגל', 0, 840),
(1072, 154, 'Spring Chicken', 'פרגיות', 0, 841),
(1073, 154, 'Mix', 'מעורב', 0, 842);

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
  PRIMARY KEY (`id`),
  KEY `restaurant_id` (`restaurant_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=237 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `smooch_id`, `contact`, `address`, `state`, `language`, `payment_url`, `extras`, `restaurant_id`) VALUES
(233, 'eaba97fb7ab217e0bbe46926', '0548086730', NULL, 3, 'english', NULL, NULL, NULL),
(234, 'ahmadworkspace@gmail.com', NULL, NULL, 0, 'english', NULL, NULL, NULL),
(235, 'ahmad@gmail.com', NULL, NULL, 0, 'english', NULL, NULL, NULL),
(236, 'test@gmail.com', NULL, NULL, 0, 'english', NULL, NULL, NULL);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=14 ;

--
-- Dumping data for table `user_coupons`
--

INSERT INTO `user_coupons` (`id`, `user_id`, `coupon_id`) VALUES
(1, 234, 1),
(3, 234, 2),
(5, 235, 2),
(6, 235, 1),
(13, 236, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_orders`
--

CREATE TABLE IF NOT EXISTS `user_orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_order` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=48 ;

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
  `closing_time` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `restaurant_id` (`restaurant_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=36 ;

--
-- Dumping data for table `weekly_availibility`
--

INSERT INTO `weekly_availibility` (`id`, `restaurant_id`, `week_en`, `week_he`, `opening_time`, `closing_time`) VALUES
(8, 1, 'Sunday', 'יום א', '12:00', '21:00'),
(9, 1, 'Monday', 'יום ב', '12:00', '21:00'),
(10, 1, 'Tuesday', 'יום ג', '12:00', '21:00'),
(11, 1, 'Wednesday', 'יום ד', '12:00', '21:00'),
(12, 1, 'Thursday', 'יום ה', '12:00', '21:00'),
(13, 1, 'Friday', 'ששי', 'Closed', 'Closed'),
(14, 1, 'Saturday', 'שבת', 'Closed', 'Closed'),
(15, 2, 'Sunday', 'יום א', '12:00', '21:00'),
(16, 2, 'Monday', 'יום ב', '12:00', '21:00'),
(17, 2, 'Tuesday', 'יום ג', '12:00', '21:00'),
(18, 2, 'Wednesday', 'יום ד', '12:00', '21:00'),
(19, 2, 'Thursday', 'יום ה', '12:00', '21:00'),
(20, 2, 'Friday', 'ששי', 'Closed', 'Closed'),
(21, 2, 'Saturday', 'שבת', 'Closed', 'Closed'),
(22, 3, 'Sunday', 'יום א', '12:00', '21:00'),
(23, 3, 'Monday', 'יום ב', '12:00', '21:00'),
(24, 3, 'Tuesday', 'יום ג', '12:00', '21:00'),
(25, 3, 'Wednesday', 'יום ד', '12:00', '21:00'),
(26, 3, 'Thursday', 'יום ה', '12:00', '21:00'),
(27, 3, 'Friday', 'ששי', 'Closed', 'Closed'),
(28, 3, 'Saturday', 'שבת', 'Closed', 'Closed');

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
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `user_orders` (`id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`);

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
  ADD CONSTRAINT `fk_user_order` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `weekly_availibility`
--
ALTER TABLE `weekly_availibility`
  ADD CONSTRAINT `weekly_availibility_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
