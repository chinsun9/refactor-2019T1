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
INSERT INTO `LOGINEOGFP1` VALUES (1,6.00,26.00,146.00,161.00,15.00,29.00,29.00,42.00,0.40,1.44,3.48,5.34,0.50,2.33,0.12,0.27,29.00,42.00,56.00,77.00),(2,40.00,54.00,130.00,152.00,21.00,32.00,40.00,51.00,1.56,2.43,2.65,3.50,0.27,0.48,0.13,0.37,40.00,51.00,66.00,94.00),(3,2.00,27.00,162.00,175.00,15.00,33.00,30.00,51.00,0.08,1.69,3.43,5.55,0.52,8.00,0.14,0.27,30.00,51.00,65.00,81.00),(5,31.00,45.00,144.00,156.00,12.00,28.00,31.00,47.00,1.11,3.08,3.15,4.81,0.21,0.61,0.14,0.36,31.00,47.00,61.00,94.00);
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
INSERT INTO `LOGINEOGFP2` VALUES (1,2.00,12.00,157.00,167.00,9.00,23.00,22.00,36.00,0.10,0.55,4.42,7.59,0.92,6.00,0.18,0.28,22.00,36.00,64.00,81.00),(2,52.00,65.00,125.00,143.00,17.00,33.00,35.00,49.00,1.80,3.71,2.73,3.71,0.22,0.44,0.19,0.62,35.00,49.00,74.00,123.00),(3,2.00,15.00,170.00,185.00,17.00,31.00,32.00,50.00,0.08,0.82,3.48,5.62,1.07,8.00,0.11,0.24,32.00,50.00,64.00,86.00);
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
INSERT INTO `SERVICEEOG` VALUES (1,'2019-10-01 00:00:00','2019-10-01 22:22:22','2019-10-01 23:00:00','2019-10-02 06:06:06',3600,3800,6400)
,(1,'2019-10-02 00:00:00','2019-10-02 23:21:02','2019-10-02 23:30:00','2019-10-03 07:06:06',4600,2800,7400)
,(1,'2019-10-03 00:00:00','2019-10-03 21:00:02','2019-10-03 23:40:00','2019-10-04 05:10:06',4200,5800,3500)
,(1,'2019-10-04 00:00:00','2019-10-04 21:27:22','2019-10-04 22:20:00','2019-10-05 08:12:06',2200,7800,5500)
,(1,'2019-10-05 00:00:00','2019-10-05 20:46:22','2019-10-05 21:24:40','2019-10-06 06:12:06',5200,2800,6500)
,(1,'2019-10-27 11:19:13','2019-10-22 00:19:12','2019-10-22 00:20:54','2019-10-22 06:34:02',1728,10902,11486)
,(1,'2019-10-27 11:19:42','2019-10-26 01:16:50','2019-10-26 01:21:10','2019-10-26 06:46:12',646,4602,14900)
,(2,'2019-10-18 06:38:27','2019-10-17 23:21:49','2019-10-17 23:23:49','2019-10-18 06:38:27',990,2512,23566)
,(2,'2019-10-22 06:34:02','2019-10-22 00:19:12','2019-10-22 00:20:54','2019-10-22 06:34:02',1728,10902,11486)
,(2,'2019-10-26 06:46:12','2019-10-26 01:16:50','2019-10-26 01:21:10','2019-10-26 06:46:12',646,4602,14900)
,(2,'2019-10-28 06:45:15','2019-10-27 22:38:21','2019-10-27 22:39:03','2019-10-28 06:45:15',816,3964,25208)
,(2,'2019-11-01 08:02:58','2019-11-01 00:02:38','2019-11-01 00:04:58','2019-11-01 08:02:58',841,9720,18960)
,(2,'2019-11-02 07:28:15','2019-11-01 23:13:49','2019-11-01 23:14:09','2019-11-02 07:28:15',993,9498,20144)
,(2,'2019-11-03 07:02:05','2019-11-03 01:40:10','2019-11-03 01:57:11','2019-11-03 07:02:05',315,1253,17029)
,(2,'2019-11-05 07:01:32','2019-11-04 23:36:44','2019-11-05 01:35:07','2019-11-05 07:01:30',567,16486,3097)
,(2,'2019-11-06 08:58:48','2019-11-06 00:44:50','2019-11-06 00:48:27','2019-11-06 08:58:47',388,7316,22104)
,(2,'2019-11-07 20:47:41','2019-11-07 00:04:01','2019-11-07 00:09:32','2019-11-07 07:44:57',1364,18824,8487)
,(4,'2019-11-07 13:34:47','2019-11-07 13:31:54','2019-11-07 13:32:25','2019-11-07 13:34:47',14,140,0);
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
INSERT INTO `USER` VALUES (1,'yjs03075','9546','홍기현','ghdrlgus96@naver.com','0','1996-10-03 00:00:00',1,1),(2,'chinsung','1234','sungjae','chin_sung@naver.com','1','1996-02-01 00:00:00',0,1),(3,'jhsl31','dbswo1025','신윤재','tlsdbswo@naver.com','0','1996-01-01 03:03:03',1,2),(4,'gachon','1234','가천이','gachon@naver.com','1','1996-11-01 03:03:03',0,1),(5,'vmarhld','1234','양민순','vmarhld@naver.com','1','1995-06-28 00:00:00',0,1),(6,'test','test','test','test','0','2019-01-01 00:00:00',1,1);
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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-07 22:04:23
