-- MySQL Script generated by MySQL Workbench
-- Sat Feb  4 11:14:28 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema college
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema college
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `college` DEFAULT CHARACTER SET utf8 ;
USE `college` ;

-- -----------------------------------------------------
-- Table `college`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `college`.`User` (
  `id` CHAR(7) NOT NULL,
  `type` ENUM('researcher', 'assistant', 'admin') NOT NULL,
  `name` VARCHAR(10) NOT NULL,
  `passwd` VARCHAR(32) NOT NULL,
  `sex` ENUM('male', 'female') NOT NULL,
  `dept` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `college`.`Researcher`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `college`.`Researcher` (
  `id` CHAR(7) NOT NULL,
  `position` VARCHAR(10) NULL,
  `profile` LONGTEXT NULL,
  `work` LONGTEXT NULL,
  `photo` MEDIUMBLOB NULL,
  INDEX `id_idx` (`id` ASC) VISIBLE,
  CONSTRAINT `fk_id`
    FOREIGN KEY (`id`)
    REFERENCES `college`.`User` (`id`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `college`.`Journal`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `college`.`Journal` (
  `issn` CHAR(8) NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `host` VARCHAR(100) NOT NULL,
  `period` ENUM('monthly', 'seasonly') NOT NULL,
  `inf_factor` REAL NULL,
  `zone` ENUM('1', '2', '3', '4') NULL,
  `picture` MEDIUMBLOB NULL,
  `link` VARCHAR(400) NULL,
  PRIMARY KEY (`issn`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `college`.`Paper`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `college`.`Paper` (
  `applynum` VARCHAR(30) NOT NULL,
  `issn` CHAR(8) NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `author` VARCHAR(200) NOT NULL,
  `link` VARCHAR(400),
  PRIMARY KEY (`applynum`)
  CONSTRAINT `fk_issn`
    FOREIGN KEY (`issn`)
    REFERENCES `college`.`Journal` (`issn`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `college`.`Newspaper`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `college`.`Newspaper` (
  `issn` CHAR(8) NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `authority` VARCHAR(100) NOT NULL,
  `host` VARCHAR(100) NOT NULL,
  `city` VARCHAR(30) NOT NULL,
  `address` VARCHAR(500) NOT NULL,
  `postcode` CHAR(6) NOT NULL,
  `phone_num` CHAR(11) NOT NULL,
  `picture` MEDIUMBLOB NULL,
  `link` VARCHAR(400) NULL,
  PRIMARY KEY (`issn`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `college`.`Article`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `college`.`Article` (
  `applynum` VARCHAR(30) NOT NULL,
  `issn` CHAR(8) NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `author` VARCHAR(200) NOT NULL,
  `link` VARCHAR(400),
  PRIMARY KEY (`applynum`)
  CONSTRAINT `fk_issn`
    FOREIGN KEY (`issn`)
    REFERENCES `college`.`Newspaper` (`issn`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `college`.`Conference`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `college`.`Conference` (
  `id` INT NOT NULL,
  `name` VARCHAR(300) NOT NULL,
  `time` DATE NOT NULL,
  `place` VARCHAR(100) NOT NULL,
  `association` VARCHAR(100) NOT NULL,
  `publisher` VARCHAR(100) NOT NULL,
  `publish_date` DATE NOT NULL,
  `chief_editor` VARCHAR(10) NOT NULL,
  `editors` VARCHAR(300) NOT NULL,
  `picture` MEDIUMBLOB NULL,
  `link` VARCHAR(400) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `college`.`ConferencePaper`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `college`.`ConferencePaper` (
  `applynum` VARCHAR(30) NOT NULL,
  `id` INT NOT NULL,
  `title` VARCHAR(300) NOT NULL,
  `author` VARCHAR(200) NOT NULL,
  `link` VARCHAR(400) NULL,
  PRIMARY KEY (`applynum`),
  CONSTRAINT `fk_id`
    FOREIGN KEY (`id`)
    REFERENCES `college`.`Conference` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `college`.`Book`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `college`.`Book` (
  `applynum` VARCHAR(30) NOT NULL,
  `isbn` CHAR(13) NOT NULL,
  `author` VARCHAR(300) NOT NULL,
  `publisher` VARCHAR(100) NOT NULL,
  `publish_year` YEAR(4) NOT NULL,
  `place_published` VARCHAR(100) NOT NULL,
  `picture` MEDIUMBLOB NULL,
  `link` VARCHAR(400) NULL,
  PRIMARY KEY (`isbn`),
  CONSTRAINT `fk_apply`
    FOREIGN KEY (`applynum`)
    REFERENCES `college`.`BookAuthor` (`applynum`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `college`.`Patent`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `college`.`Patent` (
  `applynum` VARCHAR(30) NOT NULL,
  `patent_num` CHAR(13) NOT NULL,
  `promulgate_num` CHAR(12) NOT NULL,
  `name` VARCHAR(200) NOT NULL,
  `applyer` VARCHAR(200) NOT NULL,
  `inventor` VARCHAR(200) NOT NULL,
  `issue` VARCHAR(45) NOT NULL,
  `theme` VARCHAR(45) NOT NULL,
  `catagory_num` VARCHAR(100) NOT NULL,
  `major_catagory` VARCHAR(10) NOT NULL,
  `link` VARCHAR(400) NULL,
  PRIMARY KEY (`patent_num`),
  CONSTRAINT `fk_apply`
    FOREIGN KEY (`applynum`)
    REFERENCES `college`.`PatentAuthor` (`applynum`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `college`.`JornalAuthor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `college`.`JournalAuthor` (
  `applynum` VARCHAR(30) GENERATED ALWAYS AS (CONCAT('J', CONVERT(round(unix_timestamp(curtime(4)) * 1000), CHAR), applicant)) VIRTUAL,
  `applicant` CHAR(7) NOT NULL,
  `issn` CHAR(8) NOT NULL,
  `status` ENUM('processing', 'processed') NOT NULL,
  INDEX `applicant_idx` (`applicant` ASC) VISIBLE,
  PRIMARY KEY (`applynum`),
  UNIQUE INDEX `applynum_UNIQUE` (`applynum` ASC) VISIBLE,
  CONSTRAINT `fk_applicant`
    FOREIGN KEY (`applicant`)
    REFERENCES `college`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `college`.`NewspaperAuthor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `college`.`NewspaperAuthor` (
  `applynum` VARCHAR(30) GENERATED ALWAYS AS (CONCAT('N', CONVERT(round(unix_timestamp(curtime(4)) * 1000), CHAR), applicant)) VIRTUAL,
  `applicant` CHAR(7) NOT NULL,
  `issn` CHAR(8) NOT NULL,
  `status` ENUM('processing', 'processed') NOT NULL,
  INDEX `applicant_idx` (`applicant` ASC) VISIBLE,
  PRIMARY KEY (`applynum`),
  UNIQUE INDEX `applynum_UNIQUE` (`applynum` ASC) VISIBLE,
  CONSTRAINT `fk_applicant`
    FOREIGN KEY (`applicant`)
    REFERENCES `college`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `college`.`ConferenceAuthor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `college`.`ConferenceAuthor` (
  `applynum` VARCHAR(30) GENERATED ALWAYS AS (CONCAT('C', CONVERT(round(unix_timestamp(curtime(4)) * 1000), CHAR), applicant)) VIRTUAL,
  `applicant` CHAR(7) NOT NULL,
  `id` INT NOT NULL,
  `status` ENUM('processing', 'processed') NOT NULL,
  INDEX `applicant_idx` (`applicant` ASC) VISIBLE,
  PRIMARY KEY (`applynum`),
  UNIQUE INDEX `applynum_UNIQUE` (`applynum` ASC) VISIBLE,
  CONSTRAINT `fk_applicant`
    FOREIGN KEY (`applicant`)
    REFERENCES `college`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `college`.`BookAuthor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `college`.`BookAuthor` (
  `applynum` VARCHAR(30) GENERATED ALWAYS AS (CONCAT('B', CONVERT(round(unix_timestamp(curtime(4)) * 1000), CHAR), applicant)) VIRTUAL,
  `applicant` CHAR(7) NOT NULL,
  `isbn` CHAR(13) NOT NULL,
  `status` ENUM('processing', 'processed') NOT NULL,
  INDEX `applicant_idx` (`applicant` ASC) VISIBLE,
  PRIMARY KEY (`applynum`),
  UNIQUE INDEX `applynum_UNIQUE` (`applynum` ASC) VISIBLE,
  CONSTRAINT `fk_applicant`
    FOREIGN KEY (`applicant`)
    REFERENCES `college`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `college`.`PatentAuthor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `college`.`PatentAuthor` (
  `applynum` VARCHAR(30) GENERATED ALWAYS AS (CONCAT('P', CONVERT(round(unix_timestamp(curtime(4)) * 1000), CHAR), applicant)) VIRTUAL,
  `applicant` CHAR(7) NOT NULL,
  `patent_num` CHAR(13) NOT NULL,
  `status` ENUM('processing', 'processed') NOT NULL,
  INDEX `applicant_idx` (`applicant` ASC) VISIBLE,
  PRIMARY KEY (`applynum`),
  UNIQUE INDEX `applynum_UNIQUE` (`applynum` ASC) VISIBLE,
  CONSTRAINT `fk_applicant`
    FOREIGN KEY (`applicant`)
    REFERENCES `college`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
