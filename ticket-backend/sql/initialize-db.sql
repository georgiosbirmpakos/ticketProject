CREATE DATABASE IF NOT EXISTS ticketdb;
USE ticketdb;
CREATE USER IF NOT EXISTS 'ticketDbUser'@'%' identified by 'ticketDbPassword';
GRANT ALL ON ticketdb.* to 'ticketDbUser'@'%';