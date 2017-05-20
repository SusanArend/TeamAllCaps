create database star_power;
use star_power;
set foreign_key_checks = 'on';

create table employ_basic(
id int(11) unsigned not null primary key auto_increment,
name varchar(30) not null,
email varchar(30) not null,
index email_ind (email),
phone varchar(30) not null,
linkedin_url varchar(30) not null,
title varchar(30) not null,
manager_id int(11) unsigned,
key fk_manager_basic(manager_id), constraint fk_manager_basic foreign key(manager_id)
references employ_basic(id) on delete cascade on update cascade
) engine=innodb;


create table employ_option(
email varchar(30) not null,
photo  longblob,
favorite_lunchbox varchar(30) not null,
primary key(email),
foreign key(email) references employ_basic(email) on update cascade on delete cascade
)engine=innodb;