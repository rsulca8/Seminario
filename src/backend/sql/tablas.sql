CREATE DATABASE cvrp_app;
CREATE USER 'rsulca8'@'localhost' IDENTIFIED WITH mysql_native_password BY 'cafayate';
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, INDEX, DROP, ALTER, CREATE TEMPORARY TABLES, LOCK TABLES 
    ON cvrp_app.* TO 'rsulca8'@'localhost';

CREATE TABLE Clientes(
    id_cliente int(6) primary key auto_increment not null ,
    nombre_cliente varchar(10) not null,
    apellido_cliente varchar(10) not null,
    usuario varchar(10) not null,
    email_cliente varchar(20) not null,
    password_cliente varchar(16) not null,
    razon_social_cliente varchar(30) not null
);

INSERT INTO Clientes VALUES (
    0,
    "Rodrigo", 
    "Sulca", 
    "rsulca8", 
    "rsulca8@gmail.com",
    "cafayate",
    "desempleado y pobre S.A"
    );

CREATE TABLE Productos(
    id_producto int(6) primary key auto_increment not null,
    nombre_producto varchar(50) not null,
    descuento_producto varchar(10) not null,
    codigo_barra_producto int(13) not null,
    unidad_medida_id_producto varchar(10),
    marca_producto varchar(13),
    precio_producto real,
    imagen_producto blob
);

INSERT INTO Productos(
    nombre_producto, 
    descuento_producto,
    codigo_barra_producto,
    unidad_medida_id_producto,
    marca_producto,
    precio_producto) 
    VALUES (
    "ACEITE DE GIRASOL BOTELLA DE PLASTICO - 1500 CC", 
    "0", 
    "00000000", 
    "litro",
    "ZANONI",
    10.85
);

CREATE TABLE Productos(
    id_producto int(6) primary key auto_increment not null,
    nombre_producto varchar(50) not null,
    descuento_producto varchar(10) not null,
    codigo_barra_producto int(13) not null,
    unidad_medida_id_producto varchar(10),
    marca_producto varchar(13),
    precio_producto real,
    imagen_producto blob
);

CREATE TABLE Productos(
    id_producto int(6) primary key auto_increment not null,
    nombre_producto varchar(50) not null,
    descuento_producto varchar(10) not null,
    codigo_barra_producto int(13) not null,
    unidad_medida_id_producto varchar(10),
    marca_producto varchar(13),
    precio_producto real,
    imagen_producto blob
);