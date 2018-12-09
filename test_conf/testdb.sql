-- Adminer 4.3.1 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP DATABASE IF EXISTS `test`;
CREATE DATABASE `test` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `test`;

DELIMITER ;;

CREATE PROCEDURE `create_user`(`p_name` VARCHAR(64), `p_pass` VARCHAR(255))
INSERT INTO users SET name = p_name, pass = p_pass, token = NULL;;

CREATE PROCEDURE `delete_user`(`p_name` VARCHAR(64))
DELETE FROM users WHERE name = p_name;;

CREATE PROCEDURE `get_user`(`p_name` VARCHAR(64), OUT `p_pass` VARCHAR(255), OUT `p_is_admin` BOOL, OUT `p_token` VARCHAR(32))
SELECT pass, is_admin, token INTO p_pass, p_is_admin, p_token FROM users WHERE name = p_name;;

CREATE PROCEDURE `log_user_out`(`p_name` VARCHAR(64))
UPDATE users SET token = NULL WHERE name = p_name;;

CREATE PROCEDURE `replace_user_token`(`p_name` VARCHAR(64), `p_token` VARCHAR(32))
UPDATE users SET token = p_token WHERE name = p_name;;

CREATE PROCEDURE `set_pass`(`p_name` VARCHAR(64), `p_pass` VARCHAR(255))
UPDATE users SET pass = p_pass, token = NULL WHERE name = p_name;;

CREATE PROCEDURE `set_user_admin`(`p_name` VARCHAR(64), `p_admin` BOOL)
UPDATE users SET is_admin = p_admin WHERE name = p_name;;

CREATE EVENT `reset_tokens` ON SCHEDULE EVERY 1 WEEK STARTS '2018-10-27 23:59:59' ON COMPLETION NOT PRESERVE ENABLE DO UPDATE users SET token = NULL;;

DELIMITER ;

DROP TABLE IF EXISTS `clients`;
CREATE TABLE `clients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(64) DEFAULT NULL,
  `last_name` varchar(64) DEFAULT NULL,
  `national_id` bigint(20) unsigned DEFAULT NULL,
  `phone` bigint(20) unsigned DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `muutja` varchar(64) DEFAULT NULL,
  `muutmisaeg` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `national_id` (`national_id`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `email` (`email`),
  FULLTEXT KEY `clients_first_name_index` (`first_name`),
  FULLTEXT KEY `clients_last_name_index` (`last_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `clients`;
INSERT INTO `clients` (`id`, `first_name`, `last_name`, `national_id`, `phone`, `email`, `muutja`, `muutmisaeg`) VALUES
(2018171,	'Pille',	'PAGAN',	47102042742,	3725074194,	'pallamaali@gmail.com',	'asdf',	'2018-11-06'),
(2018191,	'Mari',	'f',	NULL,	222555,	NULL,	'alo',	'2018-12-07');

DROP TABLE IF EXISTS `incidents`;
CREATE TABLE `incidents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `piirkond` enum('teadmata','Harjumaa','Hiiumaa','Ida-Virumaa','Jõgevamaa','Järvamaa','Läänemaa','Lääne-Virumaa','Pärnumaa','Põlvamaa','Raplamaa','Saaremaa','Tartumaa','Valgamaa','Viljandimaa','Võrumaa') NOT NULL,
  `kliendi_nr` int(11) NOT NULL,
  `keel` enum('teadmata','eesti','vene','inglise','muu') NOT NULL,
  `vanus` enum('teadmata','alla 18','18-24','25-49','50-64','65+') NOT NULL,
  `puue` tinyint(1) NOT NULL,
  `lapsed` tinyint(4) NOT NULL,
  `rasedus` tinyint(1) NOT NULL,
  `elukoht` enum('teadmata','Harjumaa','Hiiumaa','Ida-Virumaa','Jõgevamaa','Järvamaa','Läänemaa','Lääne-Virumaa','Pärnumaa','Põlvamaa','Raplamaa','Saaremaa','Tartumaa','Valgamaa','Viljandimaa','Võrumaa') NOT NULL,
  `fuusiline_vagivald` tinyint(1) NOT NULL,
  `vaimne_vagivald` tinyint(1) NOT NULL,
  `majanduslik_vagivald` tinyint(1) NOT NULL,
  `seksuaalne_vagivald` tinyint(1) NOT NULL,
  `inimkaubandus` tinyint(1) NOT NULL,
  `teadmata_vagivald` tinyint(1) NOT NULL,
  `partner_vagivallatseja` tinyint(1) NOT NULL,
  `ekspartner_vagivallatseja` tinyint(1) NOT NULL,
  `vanem_vagivallatseja` tinyint(1) NOT NULL,
  `laps_vagivallatseja` tinyint(1) NOT NULL,
  `sugulane_vagivallatseja` tinyint(1) NOT NULL,
  `tookaaslane_vagivallatseja` tinyint(1) NOT NULL,
  `muu_vagivallatseja` tinyint(1) NOT NULL,
  `vagivallatseja_vanus` enum('teadmata','alla 18','18-24','25-49','50-64','65+') NOT NULL,
  `vagivallatseja_sugu` enum('teadmata','Mees','Naine') NOT NULL,
  `laps_ohver` tinyint(1) NOT NULL,
  `vana_ohver` tinyint(1) NOT NULL,
  `muu_ohver` tinyint(1) NOT NULL,
  `politsei` tinyint(1) NOT NULL,
  `rahastus` enum('Muu rahastus','NTK rahastus') NOT NULL,
  `muutja` varchar(64) DEFAULT NULL,
  `muutmisaeg` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `kliendi_nr` (`kliendi_nr`),
  CONSTRAINT `incidents_ibfk_1` FOREIGN KEY (`kliendi_nr`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `incidents`;
INSERT INTO `incidents` (`id`, `piirkond`, `kliendi_nr`, `keel`, `vanus`, `puue`, `lapsed`, `rasedus`, `elukoht`, `fuusiline_vagivald`, `vaimne_vagivald`, `majanduslik_vagivald`, `seksuaalne_vagivald`, `inimkaubandus`, `teadmata_vagivald`, `partner_vagivallatseja`, `ekspartner_vagivallatseja`, `vanem_vagivallatseja`, `laps_vagivallatseja`, `sugulane_vagivallatseja`, `tookaaslane_vagivallatseja`, `muu_vagivallatseja`, `vagivallatseja_vanus`, `vagivallatseja_sugu`, `laps_ohver`, `vana_ohver`, `muu_ohver`, `politsei`, `rahastus`, `muutja`, `muutmisaeg`) VALUES
(521,	'teadmata',	2018191,	'teadmata',	'teadmata',	0,	0,	0,	'teadmata',	0,	1,	1,	0,	0,	0,	1,	1,	1,	0,	1,	0,	0,	'teadmata',	'teadmata',	0,	0,	0,	0,	'Muu rahastus',	'alo',	'2018-12-08'),
(522,	'teadmata',	2018191,	'teadmata',	'teadmata',	0,	0,	0,	'teadmata',	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	'teadmata',	'teadmata',	0,	0,	0,	0,	'Muu rahastus',	'alo',	'2018-11-23'),
(523,	'teadmata',	2018191,	'teadmata',	'teadmata',	0,	0,	0,	'teadmata',	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	'teadmata',	'teadmata',	0,	0,	0,	0,	'Muu rahastus',	'alo',	'2018-11-23'),
(524,	'teadmata',	2018191,	'teadmata',	'teadmata',	0,	0,	0,	'teadmata',	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	'teadmata',	'teadmata',	0,	0,	0,	0,	'Muu rahastus',	'alo',	'2018-11-23'),
(536,	'teadmata',	2018191,	'teadmata',	'teadmata',	0,	0,	0,	'teadmata',	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	'teadmata',	'teadmata',	0,	0,	0,	0,	'Muu rahastus',	'alo',	'2018-12-07'),
(537,	'teadmata',	2018191,	'teadmata',	'teadmata',	0,	-3,	0,	'teadmata',	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	'teadmata',	'teadmata',	0,	0,	0,	0,	'Muu rahastus',	'alo',	'2018-12-07'),
(538,	'teadmata',	2018191,	'teadmata',	'teadmata',	0,	0,	0,	'teadmata',	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	'teadmata',	'teadmata',	0,	0,	0,	0,	'Muu rahastus',	'alo',	'2018-12-07'),
(539,	'teadmata',	2018191,	'teadmata',	'teadmata',	0,	-1,	0,	'teadmata',	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	'teadmata',	'teadmata',	0,	0,	0,	0,	'Muu rahastus',	'alo',	'2018-12-07'),
(540,	'teadmata',	2018191,	'teadmata',	'teadmata',	0,	-1,	0,	'teadmata',	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	'teadmata',	'teadmata',	0,	0,	0,	0,	'Muu rahastus',	'alo',	'2018-12-07'),
(541,	'teadmata',	2018191,	'teadmata',	'teadmata',	0,	0,	0,	'teadmata',	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	'teadmata',	'teadmata',	0,	0,	0,	0,	'Muu rahastus',	'alo',	'2018-12-07'),
(542,	'teadmata',	2018191,	'teadmata',	'teadmata',	0,	0,	0,	'teadmata',	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	'teadmata',	'teadmata',	0,	0,	0,	0,	'Muu rahastus',	'alo',	'2018-12-07'),
(543,	'teadmata',	2018191,	'teadmata',	'teadmata',	0,	0,	0,	'teadmata',	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	'teadmata',	'teadmata',	0,	0,	0,	0,	'Muu rahastus',	'alo',	'2018-12-07'),
(544,	'teadmata',	2018191,	'teadmata',	'teadmata',	0,	127,	0,	'teadmata',	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	'teadmata',	'teadmata',	0,	0,	0,	0,	'Muu rahastus',	'alo',	'2018-12-07'),
(545,	'teadmata',	2018191,	'teadmata',	'teadmata',	0,	127,	0,	'teadmata',	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	'teadmata',	'teadmata',	0,	0,	0,	0,	'Muu rahastus',	'alo',	'2018-12-07'),
(546,	'teadmata',	2018191,	'teadmata',	'teadmata',	0,	127,	0,	'teadmata',	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	'teadmata',	'teadmata',	0,	0,	0,	0,	'Muu rahastus',	'alo',	'2018-12-07'),
(547,	'teadmata',	2018191,	'teadmata',	'teadmata',	0,	10,	0,	'teadmata',	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	'teadmata',	'teadmata',	0,	0,	0,	0,	'Muu rahastus',	'alo',	'2018-12-07'),
(548,	'teadmata',	2018191,	'teadmata',	'teadmata',	0,	6,	0,	'teadmata',	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	'teadmata',	'teadmata',	0,	0,	0,	0,	'Muu rahastus',	'alo',	'2018-12-07');

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `incident_id` int(11) NOT NULL,
  `kuupaev` date NOT NULL,
  `kirjeldus` varchar(64) NOT NULL,
  `sidevahendid` tinyint(1) NOT NULL,
  `kriisinoustamine` decimal(5,2) NOT NULL,
  `kriisinoustamise_aeg` enum('teadmata','08:00-22:00','22:00-08:00') NOT NULL,
  `juhtuminoustamine` decimal(5,2) NOT NULL,
  `vorgustikutoo` decimal(5,2) NOT NULL,
  `psuhhonoustamine` decimal(5,2) NOT NULL,
  `juuranoustamine` decimal(5,2) NOT NULL,
  `tegevused_lapsega` decimal(5,2) NOT NULL,
  `tugiteenused` decimal(5,2) NOT NULL,
  `naise_majutus` tinyint(4) NOT NULL,
  `laste_arv` tinyint(4) NOT NULL,
  `laste_majutus` tinyint(4) NOT NULL,
  `umarlaud` tinyint(1) NOT NULL,
  `marac` tinyint(1) NOT NULL,
  `perearst_kaasatud` tinyint(1) NOT NULL,
  `emo_kaasatud` tinyint(1) NOT NULL,
  `naistearst_kaasatud` tinyint(1) NOT NULL,
  `politsei_kaasatud` tinyint(1) NOT NULL,
  `prokuratuur_kaasatud` tinyint(1) NOT NULL,
  `ohvriabi_kaasatud` tinyint(1) NOT NULL,
  `lastekaitse_kaasatud` tinyint(1) NOT NULL,
  `kov_kaasatud` tinyint(1) NOT NULL,
  `tsiviilkohus_kaasatud` tinyint(1) NOT NULL,
  `kriminaalkohus_kaasatud` tinyint(1) NOT NULL,
  `haridusasutus_kaasatud` tinyint(1) NOT NULL,
  `mtu_kaasatud` tinyint(1) NOT NULL,
  `tuttavad_kaasatud` tinyint(1) NOT NULL,
  `markused` text NOT NULL,
  `muutja` varchar(64) DEFAULT NULL,
  `muutmisaeg` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `incident_id` (`incident_id`),
  CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`incident_id`) REFERENCES `incidents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `sessions`;
INSERT INTO `sessions` (`id`, `incident_id`, `kuupaev`, `kirjeldus`, `sidevahendid`, `kriisinoustamine`, `kriisinoustamise_aeg`, `juhtuminoustamine`, `vorgustikutoo`, `psuhhonoustamine`, `juuranoustamine`, `tegevused_lapsega`, `tugiteenused`, `naise_majutus`, `laste_arv`, `laste_majutus`, `umarlaud`, `marac`, `perearst_kaasatud`, `emo_kaasatud`, `naistearst_kaasatud`, `politsei_kaasatud`, `prokuratuur_kaasatud`, `ohvriabi_kaasatud`, `lastekaitse_kaasatud`, `kov_kaasatud`, `tsiviilkohus_kaasatud`, `kriminaalkohus_kaasatud`, `haridusasutus_kaasatud`, `mtu_kaasatud`, `tuttavad_kaasatud`, `markused`, `muutja`, `muutmisaeg`) VALUES
(4104,	524,	'2018-11-23',	'',	0,	0.00,	'teadmata',	0.00,	0.00,	0.00,	0.00,	0.00,	0.00,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	'',	'alo',	'2018-11-23'),
(4105,	524,	'2018-11-23',	'',	0,	0.00,	'teadmata',	0.00,	0.00,	0.00,	0.00,	0.00,	0.00,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	'',	'alo',	'2018-11-23'),
(4152,	523,	'2018-12-07',	'',	0,	0.00,	'teadmata',	0.00,	0.00,	0.00,	0.00,	0.00,	0.00,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	'',	'alo',	'2018-12-07'),
(4153,	523,	'2018-12-07',	'',	0,	0.00,	'teadmata',	0.00,	0.00,	0.00,	0.00,	0.00,	0.00,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	'',	'alo',	'2018-12-07'),
(4154,	548,	'0000-00-00',	'',	0,	0.00,	'teadmata',	0.00,	0.00,	0.00,	0.00,	0.00,	0.00,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	'',	'alo',	'2018-12-07'),
(4155,	521,	'2018-12-07',	'',	0,	20.00,	'teadmata',	0.00,	55.00,	0.00,	1.00,	2.00,	0.00,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	'',	'alo',	'2018-12-08');

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `name` varchar(64) COLLATE utf8_bin NOT NULL,
  `pass` varchar(255) COLLATE utf8_bin NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0,
  `token` varchar(32) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

TRUNCATE `users`;
INSERT INTO `users` (`name`, `pass`, `is_admin`, `token`) VALUES
('asdf',	'$2y$10$h4fekCjYORxzCaiel27mQ.dljWwShrLzMHJeWhOjxV.C7Mq.TMl3W',	1,	'pjJdiqaHt8hlL5HOLMUjndv674X+NKGR');

-- 2018-12-09 20:02:19
