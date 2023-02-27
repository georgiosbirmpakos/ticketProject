## Self Signed SSL

### SSL for ticket

```
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout aics-ticket.key -out aics-ticket.crt
```

```
Country Name (2 letter code) [AU]:GR
State or Province Name (full name) [Some-State]:Attica
Locality Name (eg, city) []:Athens
Organization Name (eg, company) [Internet Widgits Pty Ltd]:AICS
Organizational Unit Name (eg, section) []:
Common Name (e.g. server FQDN or YOUR name) []:aics-ticket.org
Email Address []:aics.ticket@gmail.com
```

### SSL for keycloak

```
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout aics-ticket-kc.key -out aics-ticket-kc.crt
```

```
Country Name (2 letter code) [AU]:GR
State or Province Name (full name) [Some-State]:Attica
Locality Name (eg, city) []:Athens
Organization Name (eg, company) [Internet Widgits Pty Ltd]:AICS
Organizational Unit Name (eg, section) []:
Common Name (e.g. server FQDN or YOUR name) []:aics-ticket-kc.org
Email Address []:aics.ticket@gmail.com
```

```
sudo cp ./aics-ticket* /etc/ssl/certs/
```
