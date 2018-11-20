-- Adminer 4.3.1 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP DATABASE IF EXISTS `test`;
CREATE DATABASE `test` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `test`;

DELIMITER ;;

CREATE PROCEDURE `create_user`(p_name VARCHAR(64), p_pass VARCHAR(255))
REPLACE INTO users SET name = p_name, pass = p_pass, token = NULL;;

CREATE PROCEDURE `delete_user`(p_name VARCHAR(64))
DELETE FROM users WHERE name = p_name;;

CREATE PROCEDURE `get_user`(p_name VARCHAR(64), OUT p_pass VARCHAR(255), OUT p_is_admin BOOL, OUT p_token VARCHAR(32))
SELECT pass, is_admin, token INTO p_pass, p_is_admin, p_token FROM users WHERE name = p_name;;

CREATE PROCEDURE `log_user_out`(p_name VARCHAR(64))
UPDATE users SET token = NULL WHERE name = p_name;;

CREATE PROCEDURE `replace_user_token`(p_name VARCHAR(64), p_token VARCHAR(32))
UPDATE users SET token = p_token WHERE name = p_name;;

CREATE PROCEDURE `set_user_admin`(p_name VARCHAR(64), p_admin BOOL)
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
  KEY `clients_first_name_index` (`first_name`),
  KEY `clients_last_name_index` (`last_name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

TRUNCATE `clients`;
INSERT INTO `clients` (`id`, `first_name`, `last_name`, `national_id`, `phone`, `email`, `muutja`, `muutmisaeg`) VALUES
(2018171,	'Pille',	'PAGAN',	49901329491,	546,	'ab@c.d',	'asdf',	'2018-11-06');

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

TRUNCATE `incidents`;
INSERT INTO `incidents` (`id`, `piirkond`, `kliendi_nr`, `keel`, `vanus`, `puue`, `lapsed`, `rasedus`, `elukoht`, `fuusiline_vagivald`, `vaimne_vagivald`, `majanduslik_vagivald`, `seksuaalne_vagivald`, `inimkaubandus`, `teadmata_vagivald`, `partner_vagivallatseja`, `ekspartner_vagivallatseja`, `vanem_vagivallatseja`, `laps_vagivallatseja`, `sugulane_vagivallatseja`, `tookaaslane_vagivallatseja`, `muu_vagivallatseja`, `vagivallatseja_vanus`, `vagivallatseja_sugu`, `laps_ohver`, `vana_ohver`, `muu_ohver`, `politsei`, `rahastus`, `muutja`, `muutmisaeg`) VALUES
(520,	'Tartumaa',	2018171,	'eesti',	'25-49',	0,	2,	0,	'Tartumaa',	0,	1,	0,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	'teadmata',	'teadmata',	1,	0,	0,	0,	'NTK rahastus',	'asdf',	'2018-11-06'),
(521,	'Tartumaa',	2018171,	'eesti',	'25-49',	0,	2,	0,	'Tartumaa',	0,	1,	0,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	'teadmata',	'teadmata',	1,	0,	0,	0,	'NTK rahastus',	'asdf',	'2018-11-06');

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

TRUNCATE `sessions`;
INSERT INTO `sessions` (`id`, `incident_id`, `kuupaev`, `kirjeldus`, `sidevahendid`, `kriisinoustamine`, `kriisinoustamise_aeg`, `juhtuminoustamine`, `vorgustikutoo`, `psuhhonoustamine`, `juuranoustamine`, `tegevused_lapsega`, `tugiteenused`, `naise_majutus`, `laste_arv`, `laste_majutus`, `umarlaud`, `marac`, `perearst_kaasatud`, `emo_kaasatud`, `naistearst_kaasatud`, `politsei_kaasatud`, `prokuratuur_kaasatud`, `ohvriabi_kaasatud`, `lastekaitse_kaasatud`, `kov_kaasatud`, `tsiviilkohus_kaasatud`, `kriminaalkohus_kaasatud`, `haridusasutus_kaasatud`, `mtu_kaasatud`, `tuttavad_kaasatud`, `markused`, `muutja`, `muutmisaeg`) VALUES
(4100,	521,	'2018-11-06',	'KRIISINÕUSTAMINE',	0,	1.00,	'teadmata',	1.00,	0.00,	0.00,	0.00,	1.00,	0.00,	0,	0,	0,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	1,	0,	0,	0,	1,	'TEGELEME',	'asdf',	'2018-11-06'),
(4101,	521,	'2018-11-06',	'JUHTUMIPLAANI ARUTELU',	0,	0.00,	'teadmata',	1.00,	0.00,	0.00,	0.00,	0.00,	0.00,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	'ARUTATI TEGEVUSPLAANI',	'asdf',	'2018-11-06');

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `name` varchar(64) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0,
  `token` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

TRUNCATE `users`;
INSERT INTO `users` (`name`, `pass`, `is_admin`, `token`) VALUES
('asdf',	'$2y$10$7zKYAO7zCfDpp2dNOBu8Lei/woPTSa9W6BFrr5rRFCAKwoHp9Y1lS',	0,	'TsHReqQPZUKOf0hPfoYVlDZ3DIFbeBA/');

-- 2018-11-11 17:41:58