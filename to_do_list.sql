-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.19 - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- --------------------------------------------------------

-- Dumping database structure for to_do
DROP DATABASE IF EXISTS `to_do`;
CREATE DATABASE IF NOT EXISTS `to_do` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `to_do`;

-- Dumping structure for table to_do.to_do_list
DROP TABLE IF EXISTS `to_do_list`;
CREATE TABLE IF NOT EXISTS `to_do_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT '0',
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- Dumping data for table to_do.to_do_list: ~0 rows (approximately)

INSERT INTO `to_do_list` (`id`, `title`, `description`, `completed`, `created`) VALUES
	(1, 'Wash your hands', 'Be aware of virus', 1, '2020-03-25 07:30:35'),
	(2, 'Eat something', 'Don\'t drink coffee before you eat', 1, '2020-03-25 07:40:39'),
	(3, 'Wash your hands', 'Be aware of virus', 1, '2020-03-25 08:10:02'),
	(4, 'Go to work and do your job', 'You can do it!', 1, '2020-03-25 08:30:29'),
	(5, 'When you get home, wash your hands', 'Better safe than sorry', 1, '2020-03-25 17:30:01'),
	(6, 'Eat something', 'Avoid junk food!', 0, '2020-03-25 17:40:57'),
	(7, 'Turn on the computer and start doing to-do app', 'Don\'t be stupid. There is more work than you think', 1, '2020-03-25 18:00:48'),
	(8, 'Try to sleep at least 5 hours', 'Not like last night', 0, '2020-03-26 02:45:00');
