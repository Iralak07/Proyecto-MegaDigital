# Proyecto-MegaDigital

Realizar con NodeJS, React y MySQL los ABMs de las tres Tablas listadas a continuación
teniendo en cuenta las observaciones que están entre paréntesis.

Persona
• id (clave de la tabla)
• nombrecompleto
• nrodocumento (cédula de identidad de la persona)
• correo
• telefono

Habitacion
• id (clave de la tabla)
• habitacionpiso (número entero mayor a 0 y menor o igual a 10)
• habitacionnro (número entero mayor a 0 y menor o igual a 20)
• cantcamas (número entero entre 1 y 4)
• tienetelevision (indica si la habitación cuenta o no con televisión)
• tienefrigobar (indica si la habitación cuenta o no con frigobar)

Reserva
• id (clave de la tabla)
• fechareserva (Momento en que se registra la reserva)
• fechaentrada (Debe ser mayor al día actual)
• fechasalida (Debe ser mayor a la fecha de entrada)
• habitacionid (Se obtiene de la lista de habitaciones disponibles. Una habitación está
disponible si no existe una reserva para dicha habitación en el rango de fechas
deseadas)
• personaid (Se busca de la tabla persona)
• montoreserva (Cantidad de días * Gs. 120.000)

## Instalacion y configuracion de Mysql (Ubuntu)
  ### Instalacion y status de ejecucion
     # sudo apt install mysql-server
     # sudo mysql service status

  ### Conexion a la base de datos, creacion de la base de datos 'hoteldb', creacion de usuario con privilegios

     # sudo mysql -u root -p
      mysql> CREATE DATABASE hoteldb;
      Query OK, 1 row affected (0,01 sec)
      
      mysql> CREATE USER 'marco'@'localhost' IDENTIFIED BY '3919305001';
      Query OK, 0 rows affected (0,06 sec)
      
      mysql> GRANT ALL PRIVILEGES ON hoteldb.* TO 'marco'@'localhost';
      Query OK, 0 rows affected (0,01 sec)
      
      mysql> FLUSH PRIVILEGES;

      mysql> exit

    # sudo mysal -u marco -p
    # USE hoteldb;

### Creacion de las tablas solicitadas

  Persona

    CREATE TABLE persona (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombrecompleto VARCHAR(255) NOT NULL,
        nrodocumento VARCHAR(20) UNIQUE NOT NULL,
        correo VARCHAR(255) UNIQUE NOT NULL,
        telefono VARCHAR(20)
    );

  Habitacion

    CREATE TABLE habitacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    habitacionpiso TINYINT NOT NULL CHECK (habitacionpiso > 0 AND habitacionpiso <= 10),
    habitacionnro TINYINT NOT NULL CHECK (habitacionnro > 0 AND habitacionnro <= 20),
    cantcamas TINYINT NOT NULL CHECK (cantcamas BETWEEN 1 AND 4),
    tienetelevision BOOLEAN DEFAULT FALSE,
    tienefrigobar BOOLEAN DEFAULT FALSE
    );

  Reserva

    CREATE TABLE reserva (
      id INT AUTO_INCREMENT PRIMARY KEY,
      fechareserva DATETIME DEFAULT CURRENT_TIMESTAMP,
      fechaentrada DATE NOT NULL,
      fechasalida DATE NOT NULL,
      habitacionid INT NOT NULL,
      personaid INT NOT NULL,
      montoreserva INT NOT NULL,
      FOREIGN KEY (habitacionid) REFERENCES habitacion(id),
      FOREIGN KEY (personaid) REFERENCES persona(id)
    );


## Instalación y Configuración del Proyecto

### Paso 1: Instalación de Node.js
1. Descarga e instala [Node.js](https://nodejs.org/)
2. Verifica la instalación:
   ```bash
   node -v
   npm -v


### Paso 2: Inicialización del Proyecto
  
  #### Inicia un nuevo proyecto de Node.js
    
      npm init -y

      
  #### Instala las dependencias principales:
  
    npm install express mysql2


#### Instala las dependencias de desarrollo:

    npm install -D typescript @types/node @types/express
    
#### Instala Swagger para la documentación de la API:

    npm install swagger-ui-express swagger-jsdoc

### Paso 3: Configuración de TypeScript

#### Crea el archivo de configuración tsconfig.json:

    npx tsc --init




  

     

