SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS turno;
DROP TABLE IF EXISTS horarios;
DROP TABLE IF EXISTS tratamiento;
DROP TABLE IF EXISTS profesional;
DROP TABLE IF EXISTS especialidad;
DROP TABLE IF EXISTS cliente;
DROP TABLE IF EXISTS admin;

SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE admin (
  idAdmin int NOT NULL AUTO_INCREMENT,
  nombre varchar(100) NOT NULL,
  apellido varchar(100) NOT NULL,
  email varchar(120) NOT NULL,
  contraseña varchar(100) NOT NULL,
  PRIMARY KEY (idAdmin),
  UNIQUE KEY admin_unique (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE cliente (
  idCliente int NOT NULL AUTO_INCREMENT,
  nombre varchar(100) NOT NULL,
  apellido varchar(100) NOT NULL,
  email varchar(150) NOT NULL,
  contraseña varchar(100) NOT NULL,
  telefono varchar(50) NOT NULL,
  PRIMARY KEY (idCliente),
  UNIQUE KEY cliente_unique (email),
  UNIQUE KEY cliente_unique_1 (telefono)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE especialidad (
  idEspecialidad int NOT NULL AUTO_INCREMENT,
  nombre varchar(100) NOT NULL,
  PRIMARY KEY (idEspecialidad)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE profesional (
  idProfesional int NOT NULL AUTO_INCREMENT,
  nombre varchar(100) NOT NULL,
  apellido varchar(100) NOT NULL,
  imagen varchar(300) DEFAULT NULL,
  idEspecialidad int DEFAULT NULL,
  PRIMARY KEY (idProfesional),
  KEY profesional_especialidad_FK (idEspecialidad),
  CONSTRAINT profesional_especialidad_FK FOREIGN KEY (idEspecialidad) REFERENCES especialidad (idEspecialidad)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE tratamiento (
  idTratamiento int NOT NULL AUTO_INCREMENT,
  nombre varchar(100) NOT NULL,
  descripcion varchar(300) NOT NULL,
  duracion int NOT NULL,
  idEspecialidad int DEFAULT NULL,
  PRIMARY KEY (idTratamiento),
  KEY tratamiento_especialidad_FK (idEspecialidad),
  CONSTRAINT tratamiento_especialidad_FK FOREIGN KEY (idEspecialidad) REFERENCES especialidad (idEspecialidad)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE horarios (
  hora_inicio time NOT NULL,
  hora_fin time NOT NULL,
  idHorario int NOT NULL AUTO_INCREMENT,
  idProfesional int NOT NULL,
  dia_semana enum('Lunes','Martes','Miércoles','Jueves','Viernes') NOT NULL,
  PRIMARY KEY (idHorario),
  KEY Horarios_Profesional_FK (idProfesional),
  CONSTRAINT Horarios_Profesional_FK FOREIGN KEY (idProfesional) REFERENCES profesional (idProfesional)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE turno (
  idTurno int NOT NULL AUTO_INCREMENT,
  estado varchar(50) NOT NULL,
  fecha date NOT NULL,
  hora time NOT NULL,
  observaciones varchar(100) DEFAULT NULL,
  idProfesional int NOT NULL,
  idTratamiento int NOT NULL,
  idCliente int NOT NULL,
  PRIMARY KEY (idTurno),
  KEY turno_profesional_FK (idProfesional),
  KEY turno_tratamiento_FK (idTratamiento),
  KEY turno_cliente_FK (idCliente),
  CONSTRAINT turno_cliente_FK FOREIGN KEY (idCliente) REFERENCES cliente (idCliente),
  CONSTRAINT turno_profesional_FK FOREIGN KEY (idProfesional) REFERENCES profesional (idProfesional),
  CONSTRAINT turno_tratamiento_FK FOREIGN KEY (idTratamiento) REFERENCES tratamiento (idTratamiento)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO admin VALUES (1,'Ana','Torres','ana.torres@lumina.com','123456'),(2,'Diego','Ramírez','diego.ramirez@lumina.com','123456');

INSERT INTO cliente VALUES (1,'Julieta','Fernández','julieta.fernandez@gmail.com','123456','1145678901'),(2,'Nicolás','Álvarez','nicolas.alvarez@gmail.com','123456','1156789012'),(3,'Rocío','Medina','rocio.medina@gmail.com','123456','1167890123');

INSERT INTO especialidad VALUES (1,'Cosmetología'),(2,'Masajes'),(3,'Manicura y Pedicura'),(4,'Depilación'),(5,'Tratamientos faciales'),(6,'Micropigmentación');

INSERT INTO profesional VALUES (1,'Lucía','Gómez','https://res.cloudinary.com/de7iczbjc/image/upload/v1787224374/prof4_kpbvjl.jpg',1),(2,'Martín','Fernández','https://res.cloudinary.com/de7iczbjc/image/upload/v1787224373/prof2_zsoox0.jpg',2),(3,'Valentina','Rodríguez','https://res.cloudinary.com/de7iczbjc/image/upload/v1787224373/prof3_nprt4v.jpg',4),(4,'Sofía','López','https://res.cloudinary.com/de7iczbjc/image/upload/v1787224373/prof1_ddacoo.jpg',3),(5,'Franco','Martínez','https://res.cloudinary.com/de7iczbjc/image/upload/v1787224361/prof5_t9m03u.jpg',5),(6,'Camila','Sánchez','https://res.cloudinary.com/de7iczbjc/image/upload/v1787224370/prof6_ul8ep2.jpg',6);

INSERT INTO tratamiento VALUES (1,'Limpieza facial profunda','Limpieza de cutis con extracción e hidratación',60,NULL),(2,'Peeling químico','Renovación celular para piel luminosa y pareja',45,NULL),(3,'Hidrafacial','Limpieza, exfoliación e hidratación con tecnología de vacío',50,NULL),(4,'Radiofrecuencia facial','Tratamiento reafirmante y antiedad con radiofrecuencia',45,NULL),(5,'Dermapen','Microagujas para estimular colágeno y mejorar textura de piel',60,NULL),(6,'Depilación láser piernas','Depilación definitiva de piernas completas con láser',40,NULL),(7,'Depilación láser axilas','Depilación definitiva de axilas con láser',20,NULL),(8,'Masaje descontracturante','Masaje corporal para aliviar tensión muscular',50,NULL),(9,'Masaje con piedras calientes','Masaje relajante con piedras volcánicas',60,NULL),(10,'Manicura semipermanente','Esmaltado de larga duración para manos',45,NULL),(11,'Pedicura spa','Cuidado completo de pies con exfoliación e hidratación',50,NULL),(12,'Lifting de pestañas','Curvado y tratamiento de pestañas naturales',40,NULL),(13,'Diseño de cejas con henna','Perfilado y coloración de cejas',30,NULL),(14,'Micropigmentación','Técnica de maquillaje semipermanente que deposita pigmento en las capas superficiales de la piel para definir y realzar cejas, labios o el contorno de los ojos.',45,NULL);

INSERT INTO horarios VALUES ('09:00:00','13:00:00',1,1,'Lunes'),('09:00:00','13:00:00',2,1,'Miércoles'),('14:00:00','18:00:00',3,1,'Viernes'),('10:00:00','14:00:00',4,2,'Martes'),('10:00:00','14:00:00',5,2,'Jueves'),('14:00:00','19:00:00',6,3,'Lunes'),('14:00:00','19:00:00',7,3,'Miércoles'),('09:00:00','13:00:00',8,3,'Viernes'),('09:00:00','13:00:00',9,4,'Martes'),('09:00:00','13:00:00',10,4,'Jueves'),('10:00:00','14:00:00',11,4,'Viernes'),('09:00:00','13:00:00',12,5,'Lunes'),('09:00:00','13:00:00',13,5,'Martes'),('09:00:00','13:00:00',14,5,'Miércoles'),('14:00:00','19:00:00',15,6,'Jueves'),('14:00:00','19:00:00',16,6,'Viernes'),('15:00:00','19:00:00',17,6,'Lunes');

UPDATE tratamiento SET idEspecialidad = 5 WHERE idTratamiento IN (1, 2, 3, 4);
UPDATE tratamiento SET idEspecialidad = 1 WHERE idTratamiento IN (5, 12, 13);
UPDATE tratamiento SET idEspecialidad = 4 WHERE idTratamiento IN (6, 7);
UPDATE tratamiento SET idEspecialidad = 2 WHERE idTratamiento IN (8, 9);
UPDATE tratamiento SET idEspecialidad = 3 WHERE idTratamiento IN (10, 11);
UPDATE tratamiento SET idEspecialidad = 6 WHERE idTratamiento = 14;