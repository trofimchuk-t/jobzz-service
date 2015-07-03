use master;
go

create database TarikSkillsDB;
go

use TarikSkillsDB;
go

create table Levels
(
	id int identity(1,1) not null primary key,
	level_name nvarchar(16) unique
);
go

--//===========================================================================

insert into Levels(level_name) values ('Basic'), ('Intermediate'), ('Advanced'), ('Expert');
go

select * from levels
order by id

--//===========================================================================

create table Skills
(
	id int identity(1,1) not null primary key,
	name nvarchar(256) not null,
	level_id int not null,
	experience int not null,

	constraint FK_LEVEL_ID foreign key (level_id) references Levels(id)
);

insert into Skills(name, level_id, experience) values
('First test skill', 1, 1),
('Second test skill', 2, 2),
('C / C++', 1, 1),
('C#', 3, 3),
('Adobe Photoshop', 3, 5)
go

select s.id, s.name, l.level_name, s.experience from skills s
inner join levels l on l.id = s.level_id
