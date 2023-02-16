export const dropTablesQuery = `drop table if exists item;
  drop table if exists measurementUnit;
  drop table if exists baseMeasurementUnit;`

export const createBaseMeasurementUnitTableQuery = `CREATE TABLE IF NOT EXISTS baseMeasurementUnit (
    id varchar(10) NOT NULL,
    name varchar(50) NOT NULL,
    PRIMARY KEY (id)
  );`

export const createItemTableQuery = `CREATE TABLE IF NOT EXISTS item (
    id varchar(36) NOT NULL,
    name varchar(50) NOT NULL,
    userId varchar(255) DEFAULT NULL,
    baseMeasurementUnitId varchar(10) NOT NULL,
    quantity decimal(5,2) DEFAULT NULL,
    protein decimal(5,2) DEFAULT NULL,
    calories decimal(5,2) DEFAULT NULL,
    carbohydrate decimal(5,2) DEFAULT NULL,
    fibre decimal(5,2) DEFAULT NULL,
    fat decimal(5,2) DEFAULT NULL,
    PRIMARY KEY (id),
    CONSTRAINT item_ibfk_1 FOREIGN KEY (baseMeasurementUnitId) REFERENCES baseMeasurementUnit (id),
    CONSTRAINT item_ibfk_2 FOREIGN KEY (userId) REFERENCES user (id)
  );`

export const insertStandardUnitQuery = `insert into baseMeasurementUnit (id, name) values ('g', 'gram'), ('ml', 'millilitre');`

export const createMeasurementUnitTableQuery = `create table measurementUnit (
	  id varchar(36) primary key,
    symbol varchar(10) not null,
    name varchar(50),
    baseMeasurementUnitId varchar(10) not null, 
    factor decimal(10,2) not null,
    constraint foreign key baseMeasurementUnitId_FK (baseMeasurementUnitId) references baseMeasurementUnit(id)
);`