-- MariaDB dump 10.17  Distrib 10.4.13-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: mplace
-- ------------------------------------------------------
-- Server version	10.4.13-MariaDB

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
-- Table structure for table `http_links`
--

DROP TABLE IF EXISTS `http_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `http_links` (
  `LINK_ID` int(4) NOT NULL,
  `DESCRIPTION` varchar(51) NOT NULL,
  PRIMARY KEY (`LINK_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `http_links`
--

LOCK TABLES `http_links` WRITE;
/*!40000 ALTER TABLE `http_links` DISABLE KEYS */;
INSERT INTO `http_links` VALUES (1,'Marketplace Admin: Manage Packs '),(2,'Marketplace Admin: Manage Packs Type '),(3,'Marketplace Admin: Manage Promo Packs '),(4,'Marketplace Admin: Add Promo Pack '),(5,'Marketplace Admin: View Promo Pack '),(6,'Marketplace Admin: Modify Promo Pack '),(7,'Marketplace Admin: Delete Promo Pack '),(10,'Marketplace Admin: Add Pack'),(11,'Marketplace Admin: View Pack'),(12,'Marketplace Admin: Modify Pack'),(13,'Marketplace Admin: Delete Pack'),(14,'Marketplace Admin: view/Modify/Delete Link'),(15,'Marketplace Admin: Pack Order Management'),(16,'Marketplace Admin: WhiteBlackList'),(17,'Marketplace Admin: Delete WhiteBlackList'),(18,'Marketplace Admin: Add WhiteBlackList'),(19,'Marketplace Admin: Modify WhiteBlackList'),(20,' Marketplace Admin: PromoServiceMapping'),(21,'Marketplace Admin: Add PromoServiceMapping'),(22,'Marketplace Admin: Delete PromoServiceMapping'),(23,'Marketplace Admin: Modify PromoServiceMapping'),(24,'Marketplace Admin: Modify PromoProducMapping'),(60,'MarketPlace Admin: Reports'),(61,'MarketPlace Admin: Pack Purchase Report'),(62,'MarketPlace Admin: Revenue Report'),(65,'MarketPlace Admin: Alert Based Report'),(66,'View Low Balance Pack Mapping'),(67,'Marketplace Admin: View Pack Type '),(70,'Marketplace Admin: Pack Type Mapping'),(71,'Marketplace Admin: Add Pack Type'),(72,'Marketplace Admin: Delete Pack Type'),(73,'Marketplace Admin: Modify Pack Type'),(75,'Marketplace Admin: Pack Mapping'),(76,'Marketplace Admin: View Pack Mapping'),(77,'MarketPlace Admin: SMS Template'),(78,'MarketPlace Admin: TTT Validity'),(79,'MarketPlace Admin: Role Type'),(80,'MarketPlace Admin: Add Role'),(81,'MarketPlace Admin: Delete Role'),(82,'MarketPlace Admin: Modify Role'),(83,'MarketPlace Admin: View Role'),(84,'MarketPlace Admin: AddModify Validity'),(85,'MarketPlace Admin: View Template'),(86,'MarketPlace Admin: Modify Template'),(87,'MarketPlace Admin: User Type'),(88,'MarketPlace Admin: View User'),(89,'MarketPlace Admin: Add User'),(90,'MarketPlace Admin: Delete User'),(91,'MarketPlace Admin: Modify User'),(92,'MarketPlace Admin: Custcare Report'),(93,'MarketPlace Admin: Product Purchase Report'),(94,'MarketPlace Admin: Retention Report'),(95,'MarketPlace Admin: Total Usage Report'),(96,'MarketPlace Admin: Tps Report'),(97,'MarketPlace Admin: CDR Report'),(98,'MarketPlace Admin: CustCare Chart'),(99,'MarketPlace Admin: TTT Transaction Detail'),(100,'MarketPlace Admin: User Transaction Detail'),(101,'MarketPlace Admin: User Transaction Failure Detail'),(102,'MarketPlace Admin: Reload Cache'),(103,'MarketPlace Admin: Service ActionDetail'),(104,'MarketPlace Admin: Add Service ActionDetail'),(105,'MarketPlace Admin: Modify ServiceAction Detail'),(120,'MarketPlace Admin: Pritam Ray');
/*!40000 ALTER TABLE `http_links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marketplace_adminuser`
--

DROP TABLE IF EXISTS `marketplace_adminuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `marketplace_adminuser` (
  `USER_NAME` varchar(15) NOT NULL,
  `PASSWORD` varchar(128) NOT NULL,
  `EMAIL` varchar(35) DEFAULT NULL,
  `MOBILE_NUM` varchar(15) DEFAULT NULL,
  `ROLE_ID` int(3) NOT NULL,
  `FIRST_LOGIN` int(2) DEFAULT NULL,
  `USER_TYPE` int(1) NOT NULL DEFAULT 0,
  `CREATED_BY` varchar(15) NOT NULL DEFAULT 'NA',
  UNIQUE KEY `TELE_58` (`USER_NAME`),
  KEY `TELE_127` (`ROLE_ID`),
  CONSTRAINT `FKa0xrsuyg37hhf1942jhi1smua` FOREIGN KEY (`ROLE_ID`) REFERENCES `marketplace_roles` (`ROLE_ID`),
  CONSTRAINT `TELE_127` FOREIGN KEY (`ROLE_ID`) REFERENCES `marketplace_roles` (`ROLE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marketplace_adminuser`
--

LOCK TABLES `marketplace_adminuser` WRITE;
/*!40000 ALTER TABLE `marketplace_adminuser` DISABLE KEYS */;
INSERT INTO `marketplace_adminuser` VALUES ('admin','$2a$10$bVPfLcMGz9QSCrBveKEJ3.ienA7PzooQhVVZgOrIttszcuwiD2ws6','admin@telemune.com','2971232654',1,0,1,'NA'),('anand','$2a$10$bVPfLcMGz9QSCrBveKEJ3.ienA7PzooQhVVZgOrIttszcuwiD2ws6','gulsan@telemune.com','9878987898',2,0,2,'NA'),('custcare','$2a$10$bVPfLcMGz9QSCrBveKEJ3.ienA7PzooQhVVZgOrIttszcuwiD2ws6','custcare@telemune.com','7896541230',5,0,5,'NA'),('mak','$2a$10$bVPfLcMGz9QSCrBveKEJ3.ienA7PzooQhVVZgOrIttszcuwiD2ws6','mak12@gmail.com','123456',1,0,1,'NA'),('Manjeet','$2a$10$bVPfLcMGz9QSCrBveKEJ3.ienA7PzooQhVVZgOrIttszcuwiD2ws6','manjeet1@gmail.com','123456789',4,0,4,'NA'),('report','$2a$10$bVPfLcMGz9QSCrBveKEJ3.ienA7PzooQhVVZgOrIttszcuwiD2ws6','report@telemune.com','1234567890',3,0,3,'Ripunjay'),('yogesh','$2a$10$bVPfLcMGz9QSCrBveKEJ3.ienA7PzooQhVVZgOrIttszcuwiD2ws6','yogesh.manrao@telemune.com','123456789',2,0,2,'Abhishek');
/*!40000 ALTER TABLE `marketplace_adminuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marketplace_roles`
--

DROP TABLE IF EXISTS `marketplace_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `marketplace_roles` (
  `ROLE_ID` int(3) NOT NULL,
  `ROLE_NAME` varchar(15) NOT NULL,
  `DESCRIPTION` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ROLE_ID`),
  UNIQUE KEY `CRBT_ROLES_ROLE_NAME` (`ROLE_NAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marketplace_roles`
--

LOCK TABLES `marketplace_roles` WRITE;
/*!40000 ALTER TABLE `marketplace_roles` DISABLE KEYS */;
INSERT INTO `marketplace_roles` VALUES (1,'Administrator','System Administrator'),(2,'gulsan','Normal User'),(3,'report','for reporting purpose'),(4,'mayank','mayank'),(5,'custcare','custcare_http_link'),(6,'mak','User');
/*!40000 ALTER TABLE `marketplace_roles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-16 13:46:51
