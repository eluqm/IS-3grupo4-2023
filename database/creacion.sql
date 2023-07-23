CREATE DATABASE UNSA_LUD;
use UNSA_LUD;

create table datos(
	id_user integer primary key auto_increment,
    usuario varchar(20),
    contrasena varchar(255),
    nombres varchar(50),
    apellidos varchar(50),
    edad integer,
    sexo varchar(10));
    
create table datos_ingreso(
	id_user integer primary key,
    cui integer,
    dni integer,
    procedencia varchar(30),
    estado_civil varchar(10),
    fecha_nac varchar(10),
    ocupacion varchar(15),
    domicilio varchar(30),
    correo_e varchar(30),
    id_fac integer,
    id_escuela integer);
    
create table datos_personal(
	id_user integer primary key,
    especialidad varchar(20),
    telefono varchar(15));
    
create table datos_odonto(
	id_user integer primary key,
    ano integer,
    condicion varchar(20),
    id_escuela integer,
    id_facultad integer);    
    
create table facultad(
	id_fac integer primary key auto_increment,
    nombre varchar(30));

create table escuela_pro(
	id_escuela integer primary key auto_increment,
    nombre varchar(30));
    
create table ficha_aten_odonto(
	id_ficha_odonto integer primary key auto_increment,
    odontograma blob,
    diagnostico varchar(200),
    id_user integer);

create table hist_clin_ingreso(
	id_impresion_diagnost integer primary key,
    id_user integer);
    
create table examen_fisico(
	id_exam_f integer primary key auto_increment,
    indice_m_c varchar(10),
    temp integer,
    frec_resp integer,
    talla integer,
    frec_card integer,
    peso integer,
    pres_art integer);

create table tratamiento(
	id_tratamiento integer primary key auto_increment,
    fecha date,
    hora time,
    operador varchar(30),
    nombre_trat varchar(100),
    id_ficha_odonto integer,
    id_impresion_diagnost integer);

create table signos_sintomas(
	id_s_t integer primary key auto_increment,
    sintoma varchar(50));

create table controles(
	id_controles integer primary key,
    fecha date,
    id_s_t integer,
    id_tratamiento integer,
    id_exam_f integer,
    diagnostico varchar(200),
    id_impresion_diagnost integer);
    
create table antecedentes(
	id_antec integer primary key,
    algergias varchar(30),
    patologicos varchar(30),
    quirurgicos varchar(30),
    familiares varchar(30),
    gineco_obstet varchar(30),
    inmunizaciones varchar(30));
    
create table hist_clin_sig_sint(
	id_impresion_diagnost integer,
    id_s_t integer,
    primary key(id_impresion_diagnost, id_s_t));

create table hist_clin_antecedentes(
	id_impresion_diagnost integer,
    id_antec integer,
    primary key(id_impresion_diagnost, id_antec));
    
create table dientes(
	id_diente integer primary key,
    seccion1 varchar(15),
    seccion2 varchar(15),
    seccion3 varchar(15),
    seccion4 varchar(15),
    seccion5 varchar(15),
    extraccion bool
);

drop table dientes;
SELECT * FROM dientes;

CALL ini_dientes();

DELIMITER $$
CREATE PROCEDURE ini_dientes()
BEGIN
  DECLARE counter INTEGER DEFAULT 0;
  my_loop: LOOP
    SET counter=counter+1;
    IF counter=33 THEN
      LEAVE my_loop;
    END IF;
    INSERT INTO dientes VALUES(counter, 'sano', 'sano', 'sano', 'sano', 'sano', false);
  END LOOP my_loop;
END$$
DELIMITER ;

alter table datos_ingreso add foreign key (id_user) references datos(id_user);
alter table datos_ingreso add foreign key (id_fac) references facultad(id_fac);
alter table datos_ingreso add foreign key (id_escuela) references escuela_pro(id_escuela);
alter table datos_personal add foreign key (id_user) references datos(id_user);
alter table datos_odonto add foreign key (id_user) references datos(id_user);
alter table datos_odonto add foreign key (id_escuela) references escuela_pro(id_escuela);
alter table datos_odonto add foreign key (id_facultad) references facultad(id_fac);
alter table ficha_aten_odonto add foreign key (id_user) references datos_odonto(id_user);
alter table hist_clin_ingreso add foreign key (id_user) references datos_ingreso(id_user);
alter table tratamiento add foreign key (id_ficha_odonto) references ficha_aten_odonto(id_ficha_odonto);
alter table tratamiento add foreign key (id_impresion_diagnost) references hist_clin_ingreso(id_impresion_diagnost);
alter table controles add foreign key (id_impresion_diagnost) references hist_clin_ingreso(id_impresion_diagnost);
alter table hist_clin_sig_sint add foreign key (id_impresion_diagnost) references hist_clin_ingreso(id_impresion_diagnost);
alter table hist_clin_sig_sint add foreign key (id_s_t) references signos_sintomas(id_s_t);
alter table hist_clin_antecedentes add foreign key (id_impresion_diagnost) references hist_clin_ingreso(id_impresion_diagnost);
alter table hist_clin_antecedentes add foreign key (id_antec ) references antecedentes(id_antec );
alter table examen_fisico add foreign key (id_exam_f) references hist_clin_ingreso(id_impresion_diagnost);
    