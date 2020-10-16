-- MySQL dump 10.17  Distrib 10.3.17-MariaDB, for debian-linux-gnueabihf (armv7l)
--
-- Host: localhost    Database: luciddb
-- ------------------------------------------------------
-- Server version	10.3.17-MariaDB-0+deb10u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `luciddb`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `luciddb` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `luciddb`;

--
-- Table structure for table `AREA`
--

DROP TABLE IF EXISTS `AREA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AREA` (
  `areaNum` int(10) NOT NULL,
  `areaName` varchar(20) NOT NULL,
  `areaTime` datetime DEFAULT NULL,
  PRIMARY KEY (`areaNum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AREA`
--

LOCK TABLES `AREA` WRITE;
/*!40000 ALTER TABLE `AREA` DISABLE KEYS */;
INSERT INTO `AREA` VALUES (1,'서울','2019-10-06 11:57:29'),(2,'런던','2019-10-06 21:20:24');
/*!40000 ALTER TABLE `AREA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LOGINEOGFP1`
--

DROP TABLE IF EXISTS `LOGINEOGFP1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LOGINEOGFP1` (
  `userNum` int(10) NOT NULL,
  `mpMin` float(7,2) DEFAULT NULL,
  `mpMax` float(7,2) DEFAULT NULL,
  `mnMin` float(7,2) DEFAULT NULL,
  `mnMax` float(7,2) DEFAULT NULL,
  `ipMin` float(7,2) DEFAULT NULL,
  `ipMax` float(7,2) DEFAULT NULL,
  `inMin` float(7,2) DEFAULT NULL,
  `inMax` float(7,2) DEFAULT NULL,
  `sopMin` float(7,2) DEFAULT NULL,
  `sopMax` float(7,2) DEFAULT NULL,
  `sonMin` float(7,2) DEFAULT NULL,
  `sonMax` float(7,2) DEFAULT NULL,
  `sfpMin` float(7,2) DEFAULT NULL,
  `sfpMax` float(7,2) DEFAULT NULL,
  `sfnMin` float(7,2) DEFAULT NULL,
  `sfnMax` float(7,2) DEFAULT NULL,
  `dpMin` float(7,2) DEFAULT NULL,
  `dpMax` float(7,2) DEFAULT NULL,
  `dnMin` float(7,2) DEFAULT NULL,
  `dnMax` float(7,2) DEFAULT NULL,
  PRIMARY KEY (`userNum`),
  CONSTRAINT `LOGINEOGFP1_ibfk_1` FOREIGN KEY (`userNum`) REFERENCES `USER` (`userNum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LOGINEOGFP1`
--

LOCK TABLES `LOGINEOGFP1` WRITE;
/*!40000 ALTER TABLE `LOGINEOGFP1` DISABLE KEYS */;
INSERT INTO `LOGINEOGFP1` VALUES (1,35.00,56.00,128.00,153.00,13.00,29.00,29.00,45.00,1.79,4.15,2.84,4.72,0.29,0.63,-0.09,0.35,29.00,45.00,25.00,83.00),(2,17.00,45.00,128.00,153.00,13.00,61.00,28.00,75.00,0.48,2.77,1.71,4.93,0.27,1.24,-0.16,0.31,28.00,75.00,28.00,78.00),(3,53.00,70.00,117.00,137.00,10.00,28.00,23.00,42.00,1.96,6.50,3.05,5.30,0.06,0.39,-0.22,0.37,23.00,42.00,6.00,82.00),(4,33.00,51.00,128.00,146.00,10.00,32.00,24.00,49.00,1.34,4.10,2.78,5.38,0.28,0.62,0.08,0.43,24.00,49.00,44.00,83.00),(5,42.00,61.00,126.00,148.00,18.00,39.00,30.00,64.00,1.32,2.94,2.20,4.20,0.23,0.49,0.05,0.35,30.00,64.00,53.00,89.00);
/*!40000 ALTER TABLE `LOGINEOGFP1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LOGINEOGFP2`
--

DROP TABLE IF EXISTS `LOGINEOGFP2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LOGINEOGFP2` (
  `userNum` int(10) NOT NULL,
  `mpMin` float(7,2) DEFAULT NULL,
  `mpMax` float(7,2) DEFAULT NULL,
  `mnMin` float(7,2) DEFAULT NULL,
  `mnMax` float(7,2) DEFAULT NULL,
  `ipMin` float(7,2) DEFAULT NULL,
  `ipMax` float(7,2) DEFAULT NULL,
  `inMin` float(7,2) DEFAULT NULL,
  `inMax` float(7,2) DEFAULT NULL,
  `sopMin` float(7,2) DEFAULT NULL,
  `sopMax` float(7,2) DEFAULT NULL,
  `sonMin` float(7,2) DEFAULT NULL,
  `sonMax` float(7,2) DEFAULT NULL,
  `sfpMin` float(7,2) DEFAULT NULL,
  `sfpMax` float(7,2) DEFAULT NULL,
  `sfnMin` float(7,2) DEFAULT NULL,
  `sfnMax` float(7,2) DEFAULT NULL,
  `dpMin` float(7,2) DEFAULT NULL,
  `dpMax` float(7,2) DEFAULT NULL,
  `dnMin` float(7,2) DEFAULT NULL,
  `dnMax` float(7,2) DEFAULT NULL,
  PRIMARY KEY (`userNum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LOGINEOGFP2`
--

LOCK TABLES `LOGINEOGFP2` WRITE;
/*!40000 ALTER TABLE `LOGINEOGFP2` DISABLE KEYS */;
INSERT INTO `LOGINEOGFP2` VALUES (1,41.00,58.00,133.00,149.00,13.00,24.00,30.00,43.00,2.28,4.46,3.19,4.53,0.25,0.57,0.17,0.34,30.00,43.00,62.00,90.00),(2,46.00,67.00,119.00,137.00,11.00,27.00,22.00,44.00,2.15,5.45,2.81,6.14,0.15,0.46,-0.04,0.49,22.00,44.00,31.00,84.00),(3,40.00,70.00,122.00,138.00,9.00,20.00,23.00,40.00,2.10,7.44,3.30,5.78,0.16,0.38,0.16,0.39,23.00,40.00,52.00,78.00),(4,46.00,70.00,124.00,151.00,12.00,25.00,28.00,39.00,2.00,5.75,3.54,4.55,0.15,0.39,0.06,0.36,28.00,39.00,42.00,81.00),(5,33.00,52.00,131.00,157.00,16.00,41.00,34.00,60.00,0.80,2.75,2.40,4.24,0.25,0.62,0.14,0.39,34.00,60.00,64.00,95.00);
/*!40000 ALTER TABLE `LOGINEOGFP2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SERVICEEOG`
--

DROP TABLE IF EXISTS `SERVICEEOG`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SERVICEEOG` (
  `userNum` int(10) NOT NULL,
  `serviceTime` datetime NOT NULL,
  `lieTime` datetime NOT NULL,
  `getSleepTime` datetime NOT NULL,
  `wakeUpTime` datetime NOT NULL,
  `remStageTime` int(10) NOT NULL,
  `stage12Time` int(10) NOT NULL,
  `stage34Time` int(10) NOT NULL,
  PRIMARY KEY (`userNum`,`serviceTime`),
  CONSTRAINT `SERVICEEOG_ibfk_1` FOREIGN KEY (`userNum`) REFERENCES `USER` (`userNum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SERVICEEOG`
--

LOCK TABLES `SERVICEEOG` WRITE;
/*!40000 ALTER TABLE `SERVICEEOG` DISABLE KEYS */;
INSERT INTO `SERVICEEOG` VALUES (1,'2019-10-01 00:00:00','2019-10-01 22:22:22','2019-10-01 23:00:00','2019-10-02 06:06:06',3600,3800,6400),(1,'2019-10-02 00:00:00','2019-10-02 23:21:02','2019-10-02 23:30:00','2019-10-03 07:06:06',4600,2800,7400),(1,'2019-10-03 00:00:00','2019-10-03 21:00:02','2019-10-03 23:40:00','2019-10-04 05:10:06',4200,5800,3500),(1,'2019-10-04 00:00:00','2019-10-04 21:27:22','2019-10-04 22:20:00','2019-10-05 08:12:06',2200,7800,5500),(1,'2019-10-05 00:00:00','2019-10-05 20:46:22','2019-10-05 21:24:40','2019-10-06 06:12:06',5200,2800,6500),(1,'2019-10-27 11:19:13','2019-10-22 00:19:12','2019-10-22 00:20:54','2019-10-22 06:34:02',1728,10902,11486),(1,'2019-10-27 11:19:42','2019-10-26 01:16:50','2019-10-26 01:21:10','2019-10-26 06:46:12',646,4602,14900),(2,'2019-10-18 06:38:27','2019-10-17 23:21:49','2019-10-17 23:23:49','2019-10-18 06:38:27',990,2512,23566),(2,'2019-10-22 06:34:02','2019-10-22 00:19:12','2019-10-22 00:20:54','2019-10-22 06:34:02',1728,10902,11486),(2,'2019-10-26 06:46:12','2019-10-26 01:16:50','2019-10-26 01:21:10','2019-10-26 06:46:12',646,4602,14900),(2,'2019-10-28 06:45:15','2019-10-27 22:38:21','2019-10-27 22:39:03','2019-10-28 06:45:15',816,3964,25208),(2,'2019-10-31 07:04:58','2019-10-30 23:20:48','2019-10-30 23:28:08','2019-10-31 07:04:58',817,9656,17744),(2,'2019-11-01 08:02:58','2019-11-01 00:02:38','2019-11-01 00:04:58','2019-11-01 08:02:58',841,9720,18960),(2,'2019-11-02 07:28:15','2019-11-01 23:13:49','2019-11-01 23:14:09','2019-11-02 07:28:15',993,9498,20144),(2,'2019-11-03 07:02:05','2019-11-03 01:40:10','2019-11-03 01:57:11','2019-11-03 07:02:05',315,1253,17029),(2,'2019-11-05 07:01:32','2019-11-04 23:36:44','2019-11-05 01:35:07','2019-11-05 07:01:30',567,16486,3097),(2,'2019-11-06 08:58:48','2019-11-06 00:44:50','2019-11-06 00:48:27','2019-11-06 08:58:47',388,7316,22104),(2,'2019-11-07 20:47:41','2019-11-07 00:04:01','2019-11-07 00:09:32','2019-11-07 07:44:57',1364,18824,8487),(2,'2019-11-08 01:24:10','2019-11-08 01:13:06','2019-11-08 01:21:42','2019-11-08 01:24:10',302,134,0);
/*!40000 ALTER TABLE `SERVICEEOG` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SERVICEEOGORDER`
--

DROP TABLE IF EXISTS `SERVICEEOGORDER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SERVICEEOGORDER` (
  `userNum` int(10) NOT NULL,
  `lieTimeService` int(10) NOT NULL,
  `getSleepTimeService` int(10) NOT NULL,
  `wakeUpTimeService` int(10) NOT NULL,
  `remSleepService` int(10) NOT NULL,
  `stage12SleepService` int(10) NOT NULL,
  `stage34SleepService` int(10) NOT NULL,
  `totalSleepTimeService` int(10) NOT NULL,
  `sleepEffciencyService` int(10) NOT NULL,
  `dailySleepTimeService` int(10) NOT NULL,
  PRIMARY KEY (`userNum`),
  CONSTRAINT `SERVICEEOGORDER_ibfk_1` FOREIGN KEY (`userNum`) REFERENCES `USER` (`userNum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SERVICEEOGORDER`
--

LOCK TABLES `SERVICEEOGORDER` WRITE;
/*!40000 ALTER TABLE `SERVICEEOGORDER` DISABLE KEYS */;
INSERT INTO `SERVICEEOGORDER` VALUES (1,4,8,0,3,7,2,6,5,1),(2,7,3,0,4,8,1,5,2,6),(5,0,1,2,3,4,5,6,7,8);
/*!40000 ALTER TABLE `SERVICEEOGORDER` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USER`
--

DROP TABLE IF EXISTS `USER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `USER` (
  `userNum` int(10) NOT NULL,
  `userId` varchar(20) NOT NULL,
  `userPw` varchar(20) NOT NULL,
  `userName` varchar(20) NOT NULL,
  `userEmail` varchar(20) NOT NULL,
  `userEmailStatus` varchar(20) NOT NULL,
  `userBirth` datetime NOT NULL,
  `userSex` int(10) NOT NULL,
  `userArea` int(10) NOT NULL,
  PRIMARY KEY (`userNum`),
  KEY `userArea` (`userArea`),
  CONSTRAINT `USER_ibfk_1` FOREIGN KEY (`userArea`) REFERENCES `AREA` (`areaNum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USER`
--

LOCK TABLES `USER` WRITE;
/*!40000 ALTER TABLE `USER` DISABLE KEYS */;
INSERT INTO `USER` VALUES (1,'yjs03075','9546','홍기현','ghdrlgus96@naver.com','0','1996-10-03 00:00:00',1,1),(2,'chinsung','1234','sungjae','chin_sung@naver.com','1','1996-02-01 00:00:00',0,1),(3,'jhsl31','dbswo1025','신윤재','tlsdbswo@naver.com','0','1996-01-01 03:03:03',1,2),(4,'gachon','1234','정성빈','gachon@naver.com','1','1996-11-01 00:00:00',0,1),(5,'vmarhld','1234','양민순','vmarhld@naver.com','1','1995-06-28 00:00:00',0,1),(6,'test','test','test','test','0','2019-01-01 00:00:00',1,1);
/*!40000 ALTER TABLE `USER` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `temp`
--

DROP TABLE IF EXISTS `temp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `temp` (
  `myTime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `temp`
--

LOCK TABLES `temp` WRITE;
/*!40000 ALTER TABLE `temp` DISABLE KEYS */;
INSERT INTO `temp` VALUES ('2019-09-26 12:34:10'),('2019-09-26 12:42:26'),('2019-09-01 00:00:00');
/*!40000 ALTER TABLE `temp` ENABLE KEYS */;
UNLOCK TABLES;
