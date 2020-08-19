drop table if exists departments;
create table departments ("dept_no" varchar, "dept_name" varchar);
copy departments from 'C://temp/departments.csv' csv header;
select * from departments;

drop table if exists manager;
create table manager ("dept_no" varchar, "emp_no" int);
copy manager from 'C://temp/dept_manager.csv' csv header;
select * from manager;

drop table if exists emp;
create table emp ("emp_no" int, "dept_no" varchar);
copy emp from 'C://temp/dept_emp.csv' csv header;
select * from emp;

drop table if exists employees;
create table employees ("emp_no" int, "emp_title_id" varchar, "birth_date" varchar, "first_name" varchar, "last_name" varchar, "sex" varchar, "hire_date" varchar);
copy employees from 'C://temp/employees.csv' csv header;
select * from employees;

drop table if exists titles;
create table titles ("title_id" varchar, "title" varchar);
copy titles from 'C://temp/salaries.csv' csv header;
select * from titles;

drop table if exists salaries;
create table salaries ("emp_no" int, "salary" int);
copy salaries from 'C://temp/salaries.csv' csv header;
select * from salaries;

/* 1 */
select salaries.emp_no, first_name, last_name, sex, salary from employees
join salaries on (employees.emp_no = salaries.emp_no)

/* 2 */
select salaries.emp_no, first_name, last_name, sex, salary from employees
join salaries on (employees.emp_no = salaries.emp_no)

/* 3 */
select departments.dept_no, departments.dept_name,
	manager.emp_no, employees.last_name,
	employees.first_name, employees.hire_date from manager
join employees on (employees.emp_no = manager.emp_no)
join departments on (manager.dept_no = manager.dept_no)

/* 4 */
select first_name, last_name, employees.emp_no, dept_name from employees
join emp on (employees.emp_no = emp.emp_no)
join departments on (emp.dept_no = departments.dept_no)

/* 5 */
select first_name, last_name from employees
where first_name = 'Hercules' and last_name like 'B%'

/* 6 */
select first_name, last_name, employees.emp_no, dept_name from employees
join emp on (employees.emp_no = emp.emp_no)
join departments on (emp.dept_no = departments.dept_no)
where dept_name = 'Sales'

/* 7 */
select first_name, last_name, employees.emp_no, dept_name from employees
join emp on (employees.emp_no = emp.emp_no)
join departments on (emp.dept_no = departments.dept_no)
where dept_name = 'Sales' or dept_name = 'Development'

/* 8 */
select lsat_name, count(last_name) from employees
group by last_name desc
