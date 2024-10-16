// Import inquirer and postgres for prompts and database connection
import inquirer from 'inquirer';
// This class will be used to run the command line application
class Cli {
    // This builds the class with a pool property that will be used to connect to the database
    constructor(pool) {
        this.pool = pool;
        this.pool = pool;
    }
    // This function will run the command line application in async so it waits on previous completions
    async runCLI() {
        // This will prompt the user with a list of actions they can take
        await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What do you want to do?',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role',
                ],
            },
        ])
            // This will take the user's response and run the appropriate function based on their choice
            .then((res) => {
            console.log(res);
            switch (res.action) {
                case 'View all departments':
                    // call view all departments function
                    this.viewAllDepartments();
                    break;
                case 'View all roles':
                    // call view all roles function
                    this.viewAllRoles();
                    break;
                case 'View all employees':
                    // call view all employees function
                    this.viewAllEmployees();
                    break;
                case 'Add a department':
                    // call add a department function
                    this.addDepartment();
                    break;
                case 'Add a role':
                    // call add a role function
                    this.addRole();
                    break;
                case 'Add an employee':
                    // call add an employee function
                    this.addEmployee();
                    break;
                case 'Update an employee role':
                    // call update an employee role function
                    this.updateEmployeeRole();
                    break;
            }
        });
    }
    // This will query the database for all departments and log them to the console
    viewAllDepartments() {
        this.pool.query('SELECT * FROM department', (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            else if (result) {
                console.log(result.rows);
            }
        });
        // This will run the command line application again
        this.runCLI();
    }
    // This will query the database for all roles and log them to the console
    viewAllRoles() {
        this.pool.query('SELECT * FROM roles', (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            else if (result) {
                console.log(result.rows);
            }
        });
        // This will run the command line application again
        this.runCLI();
    }
    // This will query the database for all employees and log them to the console
    viewAllEmployees() {
        this.pool.query('SELECT * FROM employee', (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            else if (result) {
                console.log(result.rows);
            }
        });
        // This will run the command line application again
        this.runCLI();
    }
    // This function will prompt the user for the name of the department they want to add and then add it to the database
    async addDepartment() {
        // This will prompt the user for the name of the department they want to add
        await inquirer.prompt([
            {
                type: 'input',
                name: 'departmentName',
                message: 'What is the name of the department?',
            },
        ])
            // This will add the department to the database
            .then((res) => {
            this.pool.query('INSERT INTO department (name) VALUES ($1)', [res.departmentName], (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
                else if (result) {
                    console.log('Department added!');
                }
            });
        });
        // This will run the command line application again
        this.runCLI();
    }
    // This function will prompt the user for the name of the role they want to add and then add it to the database
    async addRole() {
        // This will prompt the user for the name of the role they want to add, the salary, and the department id
        await inquirer.prompt([
            {
                type: 'input',
                name: 'roleName',
                message: 'What is the name of the role?',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary for this role?',
            },
            {
                type: 'input',
                name: 'departmentId',
                message: 'What is the department id for this role?',
            },
        ])
            // This will add the role to the database
            .then((res) => {
            this.pool.query('INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)', [res.roleName, res.salary, res.departmentId], (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
                else if (result) {
                    console.log('Role added!');
                }
            });
        });
        // This will run the command line application again
        this.runCLI();
    }
    // This function will prompt the user for the name of the employee they want to add and then add it to the database
    async addEmployee() {
        // This will prompt the user for the first name, last name, role id, and manager id for the employee they want to add
        await inquirer.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'What is the employee\'s first name?',
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'What is the employee\'s last name?',
            },
            {
                type: 'input',
                name: 'roleId',
                message: 'What is the role id for this employee?',
            },
            {
                type: 'input',
                name: 'managerId',
                message: 'What is the manager id for this employee?',
            },
        ])
            // This will add the employee to the database
            .then((res) => {
            this.pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [res.firstName, res.lastName, res.roleId, res.managerId], (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
                else if (result) {
                    console.log('Employee added!');
                }
            });
        });
        // This will run the command line application again
        this.runCLI();
    }
    // This function will prompt the user for the employee id and the new role id for the employee they want to update
    async updateEmployeeRole() {
        // This will prompt the user for the employee id and the new role id for the employee they want to update
        await inquirer.prompt([
            {
                type: 'input',
                name: 'employeeId',
                message: 'What is the employee id?',
            },
            {
                type: 'input',
                name: 'roleId',
                message: 'What is the new role id for this employee?',
            },
        ])
            // This will update the employee's role in the database
            .then((res) => {
            this.pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [res.roleId, res.employeeId], (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
                else if (result) {
                    console.log('Employee role updated!');
                }
            });
        });
        // This will run the command line application again
        this.runCLI();
    }
}
// Export the Cli class
export default Cli;
