CREATE DATABASE IF NOT EXISTS keycloakdb;
USE keycloakdb;
CREATE USER IF NOT EXISTS 'keycloakDbUser'@'%' identified by 'keycloakDbPassword';
GRANT ALL ON keycloakdb.* to 'keycloakDbUser'@'%';