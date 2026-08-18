-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: Lumina
-- ------------------------------------------------------
-- Server version	9.7.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `idAdmin` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `email` varchar(120) NOT NULL,
  `contraseña` varchar(100) NOT NULL,
  PRIMARY KEY (`idAdmin`),
  UNIQUE KEY `admin_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'Ana','Torres','ana.torres@lumina.com','123456'),(2,'Diego','Ramírez','diego.ramirez@lumina.com','123456');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `idCliente` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `contraseña` varchar(100) NOT NULL,
  `telefono` varchar(50) NOT NULL,
  PRIMARY KEY (`idCliente`),
  UNIQUE KEY `cliente_unique` (`email`),
  UNIQUE KEY `cliente_unique_1` (`telefono`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'Julieta','Fernández','julieta.fernandez@gmail.com','123456','1145678901'),(2,'Nicolás','Álvarez','nicolas.alvarez@gmail.com','123456','1156789012'),(3,'Rocío','Medina','rocio.medina@gmail.com','123456','1167890123');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `horarios`
--

DROP TABLE IF EXISTS `horarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `horarios` (
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL,
  `idHorario` int NOT NULL AUTO_INCREMENT,
  `idProfesional` int NOT NULL,
  `dia_semana` enum('Lunes','Martes','Miércoles','Jueves','Viernes') NOT NULL,
  PRIMARY KEY (`idHorario`),
  KEY `Horarios_Profesional_FK` (`idProfesional`),
  CONSTRAINT `Horarios_Profesional_FK` FOREIGN KEY (`idProfesional`) REFERENCES `profesional` (`idProfesional`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `horarios`
--

LOCK TABLES `horarios` WRITE;
/*!40000 ALTER TABLE `horarios` DISABLE KEYS */;
INSERT INTO `horarios` VALUES ('09:00:00','13:00:00',1,1,'Lunes'),('09:00:00','13:00:00',2,1,'Miércoles'),('14:00:00','18:00:00',3,1,'Viernes'),('10:00:00','14:00:00',4,2,'Martes'),('10:00:00','14:00:00',5,2,'Jueves'),('14:00:00','19:00:00',6,3,'Lunes'),('14:00:00','19:00:00',7,3,'Miércoles'),('09:00:00','13:00:00',8,3,'Viernes'),('09:00:00','13:00:00',9,4,'Martes'),('09:00:00','13:00:00',10,4,'Jueves'),('10:00:00','14:00:00',11,4,'Viernes'),('09:00:00','13:00:00',12,5,'Lunes'),('09:00:00','13:00:00',13,5,'Martes'),('09:00:00','13:00:00',14,5,'Miércoles'),('14:00:00','19:00:00',15,6,'Jueves'),('14:00:00','19:00:00',16,6,'Viernes'),('15:00:00','19:00:00',17,6,'Lunes');
/*!40000 ALTER TABLE `horarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profesional`
--

DROP TABLE IF EXISTS `profesional`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profesional` (
  `idProfesional` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `especialidad` varchar(100) NOT NULL,
  PRIMARY KEY (`idProfesional`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesional`
--

LOCK TABLES `profesional` WRITE;
/*!40000 ALTER TABLE `profesional` DISABLE KEYS */;
INSERT INTO `profesional` VALUES (1,'Lucía','Gómez','Cosmetología'),(2,'Martín','Fernández','Masajes'),(3,'Valentina','Rodríguez','Manicura y Pedicura'),(4,'Sofía','López','Depilación'),(5,'Franco','Martínez','Tratamientos faciales'),(6,'Camila','Sánchez','Maquillaje profesional');
/*!40000 ALTER TABLE `profesional` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tratamiento`
--

DROP TABLE IF EXISTS `tratamiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tratamiento` (
  `idTratamiento` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(300) NOT NULL,
  `duracion` int NOT NULL,
  PRIMARY KEY (`idTratamiento`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tratamiento`
--

LOCK TABLES `tratamiento` WRITE;
/*!40000 ALTER TABLE `tratamiento` DISABLE KEYS */;
INSERT INTO `tratamiento` VALUES (1,'Limpieza facial profunda','Limpieza de cutis con extracción e hidratación',60),(2,'Peeling químico','Renovación celular para piel luminosa y pareja',45),(3,'Hidrafacial','Limpieza, exfoliación e hidratación con tecnología de vacío',50),(4,'Radiofrecuencia facial','Tratamiento reafirmante y antiedad con radiofrecuencia',45),(5,'Dermapen','Microagujas para estimular colágeno y mejorar textura de piel',60),(6,'Depilación láser piernas','Depilación definitiva de piernas completas con láser',40),(7,'Depilación láser axilas','Depilación definitiva de axilas con láser',20),(8,'Masaje descontracturante','Masaje corporal para aliviar tensión muscular',50),(9,'Masaje con piedras calientes','Masaje relajante con piedras volcánicas',60),(10,'Manicura semipermanente','Esmaltado de larga duración para manos',45),(11,'Pedicura spa','Cuidado completo de pies con exfoliación e hidratación',50),(12,'Lifting de pestañas','Curvado y tratamiento de pestañas naturales',40),(13,'Diseño de cejas con henna','Perfilado y coloración de cejas',30),(14,'Maquillaje social','Maquillaje profesional para eventos y salidas',45);
/*!40000 ALTER TABLE `tratamiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `turno`
--

DROP TABLE IF EXISTS `turno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `turno` (
  `idTurno` int NOT NULL AUTO_INCREMENT,
  `estado` varchar(50) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `observaciones` varchar(100) DEFAULT NULL,
  `idProfesional` int NOT NULL,
  `idTratamiento` int NOT NULL,
  `idCliente` int NOT NULL,
  PRIMARY KEY (`idTurno`),
  KEY `turno_profesional_FK` (`idProfesional`),
  KEY `turno_tratamiento_FK` (`idTratamiento`),
  KEY `turno_cliente_FK` (`idCliente`),
  CONSTRAINT `turno_cliente_FK` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`),
  CONSTRAINT `turno_profesional_FK` FOREIGN KEY (`idProfesional`) REFERENCES `profesional` (`idProfesional`),
  CONSTRAINT `turno_tratamiento_FK` FOREIGN KEY (`idTratamiento`) REFERENCES `tratamiento` (`idTratamiento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turno`
--

LOCK TABLES `turno` WRITE;
/*!40000 ALTER TABLE `turno` DISABLE KEYS */;
/*!40000 ALTER TABLE `turno` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'Lumina'
--
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-18 18:01:03
