drop table if exists departments;
create table departments ("dept_no" varchar, "dept_name" varchar);
copy departments from 'C://temp/departments.csv' csv header;
select * from departments;

drop table if exists manager;
create table manager ("dept_no" varchar, "emp_no" int, "from_date" varchar, "to_date" varchar);
copy manager from 'C://temp/dept_manager.csv' csv header;
select * from manager;
