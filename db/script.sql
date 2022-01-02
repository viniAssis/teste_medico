CREATE DATABASE base_medico;
use base_medico;

CREATE TABLE IF NOT EXISTS medico (
            crm int NOT NULL,
            nome varchar(45) NOT NULL,
            telefone int DEFAULT NULL,
            celular int DEFAULT NULL,
            cep varchar(45) NOT NULL,
            logradouro varchar(45) NULL,
            bairro varchar(45) NULL,
            localidade varchar(45) NULL,
            uf varchar(45) NULL,
            deletado tinyint null,
            PRIMARY KEY (crm)
          )
		  
		  
		  
		  
		  
	db:
    image: mysql
    container_name: mysql-container
    command: --default-authentication-plugin=mysql_native_password
    volumes:
      - ./db:/var/lib/mysql
    restart: always
	
	
	
	
	depends_on:
      - db