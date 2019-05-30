-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-05-2019 a las 12:03:17
-- Versión del servidor: 10.1.37-MariaDB
-- Versión de PHP: 7.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `scalecycleddbb`
--
CREATE DATABASE IF NOT EXISTS `scalecycleddbb` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `scalecycleddbb`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `Id` int(11) NOT NULL,
  `Identificador` varchar(10) NOT NULL,
  `TipoIdentificador` int(1) NOT NULL COMMENT '1-DNI;2-NIE;3-PASSPORT',
  `Username` varchar(30) NOT NULL,
  `Password` varchar(30) NOT NULL,
  `Nombre` varchar(30) NOT NULL,
  `Apellido` varchar(30) NOT NULL,
  `Genero` varchar(20) NOT NULL DEFAULT 'No Definido',
  `Telefono` varchar(20) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Avatar` varchar(100) DEFAULT NULL,
  `FechaNacimiento` date NOT NULL,
  `Localidad` varchar(30) NOT NULL,
  `Direccion` varchar(50) NOT NULL,
  `Puntos` decimal(13,2) NOT NULL DEFAULT '0.00',
  `Estado` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0-bloqueado;1-falta activar;2-user normal;',
  `Oculto` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0-Muestra en Ranking;1-No Muestra en Ranking;'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado`
--

CREATE TABLE `empleado` (
  `Id` int(11) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Password` varchar(50) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Apellido` varchar(50) NOT NULL,
  `Estado` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0-bloqueado;1-empleado;2-administradorl;'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `empleado`
--

INSERT INTO `empleado` (`Id`, `Username`, `Password`, `Nombre`, `Apellido`, `Estado`) VALUES
(1, 'admin', 'admin', 'ADMIN', 'ADMIN', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entrega`
--

CREATE TABLE `entrega` (
  `Id` bigint(20) NOT NULL,
  `Plastico` decimal(7,2) NOT NULL,
  `Carton` decimal(7,2) NOT NULL,
  `Cristal` decimal(7,2) NOT NULL,
  `Metal` decimal(7,2) NOT NULL,
  `Aceite` decimal(7,2) NOT NULL,
  `Pila` decimal(7,2) NOT NULL,
  `Puntos` decimal(9,2) NOT NULL,
  `Fecha` date NOT NULL,
  `Hora` time NOT NULL,
  `Id_empleado` int(11) NOT NULL,
  `Id_cliente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evento`
--

CREATE TABLE `evento` (
  `Id` int(11) NOT NULL,
  `Titulo` varchar(50) NOT NULL,
  `Lugar` varchar(50) NOT NULL,
  `Descripcion` varchar(512) NOT NULL,
  `Puntos` int(3) NOT NULL,
  `Fecha` date NOT NULL,
  `HoraInicio` time NOT NULL,
  `HoraFinal` time NOT NULL,
  `Id_empleado` int(11) NOT NULL,
  `Estado` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0-Cancelado;1-Activado;2-Terminado;'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `participar`
--

CREATE TABLE `participar` (
  `Id_cliente` int(11) NOT NULL,
  `Id_evento` int(11) NOT NULL,
  `Descripcion` varchar(512) DEFAULT NULL,
  `Estado` tinyint(1) DEFAULT '0' COMMENT '0-No presentado;1-Incompleta;2-Completa;'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD UNIQUE KEY `Username` (`Username`),
  ADD UNIQUE KEY `Identificador` (`Identificador`);

--
-- Indices de la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `entrega`
--
ALTER TABLE `entrega`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `id_empleado` (`Id_empleado`),
  ADD KEY `id_cliente` (`Id_cliente`);

--
-- Indices de la tabla `evento`
--
ALTER TABLE `evento`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `id_empleado` (`Id_empleado`);

--
-- Indices de la tabla `participar`
--
ALTER TABLE `participar`
  ADD PRIMARY KEY (`Id_cliente`,`Id_evento`),
  ADD KEY `id_cliente` (`Id_cliente`),
  ADD KEY `id_evento` (`Id_evento`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `empleado`
--
ALTER TABLE `empleado`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `entrega`
--
ALTER TABLE `entrega`
  MODIFY `Id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `evento`
--
ALTER TABLE `evento`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `entrega`
--
ALTER TABLE `entrega`
  ADD CONSTRAINT `Entrega_ibfk_1` FOREIGN KEY (`id_empleado`) REFERENCES `empleado` (`id`),
  ADD CONSTRAINT `Entrega_ibfk_2` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id`);

--
-- Filtros para la tabla `evento`
--
ALTER TABLE `evento`
  ADD CONSTRAINT `Evento_ibfk_1` FOREIGN KEY (`id_empleado`) REFERENCES `empleado` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
