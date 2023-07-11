USE unsa_lud;
DESCRIBE datos;
    
SELECT * FROM datos;
INSERT INTO datos VALUES (1, 'Alejandro', 'Villa', 24, 'M');
INSERT INTO datos VALUES (2, 'Ana', 'Jimenez', 21, 'F');
INSERT INTO datos VALUES (3, 'Freddy', 'Humpire', 22, 'F');
INSERT INTO datos VALUES (4, 'Alvaro', 'Ticona', 21, 'M');
INSERT INTO datos VALUES (5, 'Katherine', 'Bejar', 20, 'F');
INSERT INTO datos VALUES (6, 'Edson', 'Bejar', 20, 'M');

SELECT * FROM datos_ingreso;
INSERT INTO datos_ingreso VALUES(1, 20242332, 79846511, 'Arequipa', 'soltero', 29/11/1998, 'estudiante', 'Socabaya', 'avillah@unsa.edu.pe', 1,1);
INSERT INTO datos_ingreso VALUES(2, 20242333, 79846512, 'Chile', 'casado', 20/10/2002, 'estudiante', 'Hunter', 'ajimenezl@unsa.edu.pe', 1,1);
INSERT INTO datos_ingreso VALUES(3, 20242334, 79846513, 'Venezuela', 'pisado', 8/5/2001, 'estudiante', 'Selva Alegre', 'fhumpirii@unsa.edu.pe', 1,1);
INSERT INTO datos_ingreso VALUES(4, 20242335, 79846514, 'Alemania', 'viudo', 8/2/2002, 'estudiante', 'Paucarpata', 'aticonamo@unsa.edu.pe', 1,1);
INSERT INTO datos_ingreso VALUES(5, 20242336, 79846515, 'Argentina', 'soltero', 15/6/2003, 'estudiante', 'Hunter', 'kbejarr@unsa.edu.pe', 1,1);
INSERT INTO datos_ingreso VALUES(6, 20242337, 79846516, 'Hunter', 'soltero', 15/6/2003, 'estudiante', 'Hunter', 'ebejarr@unsa.edu.pe', 1,1);

SELECT * FROM datos_personal;
INSERT INTO datos_personal VALUES(1,'programador senior',987632656);
INSERT INTO datos_personal VALUES(2,'patrona',987632656);
INSERT INTO datos_personal VALUES(3,'chakal',987632656);
INSERT INTO datos_personal VALUES(4,'programador junior',987632656);
INSERT INTO datos_personal VALUES(5,'programadio junior',987632656);
INSERT INTO datos_personal VALUES(6,'armador cubitos',987632656);

INSERT INTO escuela_pro VALUES(1, 'FIPS');
INSERT INTO escuela_pro VALUES(2,'Chistemas');
INSERT INTO escuela_pro VALUES(3,'Electronica');
INSERT INTO escuela_pro VALUES(4,'Mecanica');
SELECT * FROM escuela_pro;
UPDATE escuela_pro SET nombre = 'CS' WHERE id_escuela =1;

INSERT INTO facultad VALUES(1,'FIPS');
SELECT * FROM facultad;
UPDATE facultad SET nombre = 'FIPS' WHERE id_fac =1;

SELECT d.nombres, d.apellidos, di.cui ,dp.especialidad, dp.telefono
FROM datos_personal dp INNER JOIN datos d INNER JOIN datos_ingreso di
ON dp.id_user = d.id_user AND dp.id_user = di.id_user;

SELECT di.cui as 'CUI', di.correo_e as 'EMAIL', sp.nombre AS 'ESCUELA', f.nombre AS 'FACULTAD'
FROM datos_ingreso di INNER JOIN escuela_pro sp INNER JOIN facultad f
ON di.id_escuela = sp.id_escuela AND di.id_fac = f.id_fac;

SELECT di.cui 'CUI' , f.nombre AS 'FACULTAD', sp.nombre AS 'ESCUELA', dp.especialidad AS 'ESPECILIDAD'
FROM datos_ingreso di INNER JOIN facultad f INNER JOIN escuela_pro sp INNER JOIN datos_personal dp
ON dp.id_user = di.id_user AND di.id_fac = f.id_fac AND di.id_escuela = sp.id_escuela;

