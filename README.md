# toDoApp

This is a simple To-Do application created as a showcase of basic CRUD (Create, Read, Update, Delete) operations using strictly Angular Material environment.
Data is displayed in table view using Mat-Table component with support of fetching data from backend (some DB like Mysql) over the Rest-Api.
For backend I used Node.js with Loopback (ORM) as middleware between Rest-Api service and MySQL database, but that is completely optional.  

This project contains all the necessary (frontend + backend) parts in separated folders, and can be tested in a local environment.

This showcase includes: 
<ul>
	<li>Examples of adding new records through Pop-Up modal dialog, with basic validation using Angular Reactive Forms</li>
	<li>Delete record with confirmation dialog</li>
	<li>Delete all or multiple selected records</li>
	<li>Sorting table (ASC/DESC) by specific columns</li>
	<li>Filter table (search-box) by specific columns</li>
	<li>Custom fiter of specific column from drop-down menu</li>
	<li>Pagination</li>
	<li>view/edit mode for edit record detail</li>
</ul>

# My current development environment

<ul>
    <li>VS Code: 1.43.2</li>
    <li>Node.js: 12.16.1</li>
    <li>Angular: 9.0.6</li>
    <li>Angular material: 9.1.3</li>
    <li>Loopback 3.22.0</li>
    <li>MySQL Community Server: 5.7.19</li>
    <li>HeidiSQL: 9.4.0.5125</li>
</ul>

# Setup, build and run application on localhost

To start this application on your computer please follow these steps.
The first few steps at the beggining of the list represent setting of required development environment. 

1. Download and install node.js from "https://nodejs.org"
   You can check the successful installation by typing "node -v" in the termminal/comand prompt window.

2. Install Angular CLI by entering this command in your terminal "npm install -g @angular/cli".

3. Make sure you have installed and started MySql server. Note: You can use other databases like MS SQL, Oracle... but then you must define it in datasource.json in backend folder of root application directory.  

4. If not yet, install git on your computer and check if it works by typing "git" in your terminal window.

5. Run to_do_list.sql script from root folder of this project. You can import file or run script from any database management client (HeidiSQL, PHPMyAdmin, MySQL Workbench, DBeaver...). 
   Make sure that after this process database "to_do" and table "to_do_list" must be created.

6. Copy/clone this project from github to your local computer by typing "git clone https://github.com/dpolonijo/toDoApp.git" in your console.
   Project will appear in folder where you were positioned before you entered this command as new folder named "toDoApp". This is root project folder.
   Example: "C:\Projects\toDoApp\".

7. From your termanal window navigate to path "['root_folder']/frontend". "['root_folder']" represents path of your root application folder from the above step.

8. Type "npm install" and press Enter.

9. From your termanal window navigate to path "['root_folder']/backend". Type "npm install" and press Enter. These two steps will install all necessary project library dependencies.

10. Navigate to path "['root_folder']/backend/server". Type "node server.js" and press Enter, to start backen server. 
    If everything is fine you shoud see the messages:
	Web server listening at: http://localhost:3000
	Browse your REST API at http://localhost:3000/explorer

11. Open new terminal window (don't close existing) and navigate to path "['root_folder']/frontend/". Run command "ng-serve -o". 
	After compiling and build process application should open in your default web browser on address "http://localhost:4200".


That's it!


