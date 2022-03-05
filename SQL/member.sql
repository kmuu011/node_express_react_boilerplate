CREATE DATABASE `test_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE test_db;

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `member` (
  `idx` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id` varchar(45) NOT NULL,
  `password` varchar(200) NOT NULL,
  `nickname` varchar(45) NOT NULL,
  `email` varchar(300) NOT NULL,
  `profile_img_key` varchar(200) DEFAULT NULL,
  `created_at` int(10) unsigned NOT NULL,
  `updated_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`idx`),
  UNIQUE KEY `idx_UNIQUE` (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (2,'qa0','c8e561c1a835480f74d8199bcb27603ac8ecf6ccefce2b5546d98a24cb480d0a7a2c612dedcfc1d28994f6f3cda361ff044fc73a0a1386e72157facd47311031','테스터','tes@tes.com','imgs/profile/RKFI9R6FRG09XQXTREVOS9Z9HUP2.jpg',1642780199,1642824864);
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;
