// This will import the read file sync from the fs module, the pg module, the dotenv module, and the Cli
import { readFileSync } from 'fs';
import pg from 'pg';
import dotenv from 'dotenv';
import Cli from './classes/cli.js';
// This will configure the dotenv module to read the .env file
dotenv.config();
// This will create a new pool object that will be used to connect to the database
const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: 'postgres',
    password: process.env.DB_PASS,
    port: parseInt(process.env.DB_PORT),
});
// This will connect to the database and log a message if successful
pool.connect()
    .then(() => console.log('Connected to the database'))
    .catch((err) => console.error('Error connecting:', err));
// This will log a message to the console that the schema and data are being created
console.log('Creating schema and seeding data...');
// This will drop the database if it exists
await pool.query('Drop Database if exists employeeTrackerDB;')
    .then(() => console.log('Dropped database'))
    .catch((err) => console.error('Error dropping database:', err));
// This will create the database
await pool.query('Create Database employeeTrackerDB;')
    .then(() => console.log('Created database'))
    .catch((err) => console.error('Error creating database:', err));
// This will drop the employee table if it exists
await pool.query('Drop TABLE if exists employee;')
    .then(() => console.log('Dropped employee table'))
    .catch((err) => console.error('Error dropping employee table:', err));
// This will drop the roles table if it exists
await pool.query('Drop TABLE if exists roles;')
    .then(() => console.log('Dropped roles table'))
    .catch((err) => console.error('Error dropping roles table:', err));
// This will drop the department table if it exists
await pool.query('Drop TABLE if exists department;')
    .then(() => console.log('Dropped department table'))
    .catch((err) => console.error('Error dropping department table:', err));
// This will create the department table
await pool.query('Create TABLE department (id SERIAL PRIMARY KEY, name VARCHAR(30));')
    .then(() => console.log('Created department table'))
    .catch((err) => console.error('Error creating department table:', err));
// This will create the roles table
await pool.query('Create TABLE roles (id SERIAL PRIMARY KEY, title VARCHAR(30), salary DECIMAL, department_id INT);')
    .then(() => console.log('Created roles table'))
    .catch((err) => console.error('Error creating roles table:', err));
// This will create the employee table
await pool.query('Create TABLE employee (id SERIAL PRIMARY KEY, first_name VARCHAR(30), last_name VARCHAR(30), role_id INT, manager_id INT);')
    .then(() => console.log('Created employee table'))
    .catch((err) => console.error('Error creating employee table:', err));
// This will seed the data
await pool.query(readFileSync('db/seed.sql').toString())
    .then(() => console.log('Seeded data'))
    .catch((err) => console.error('Error seeding data:', err));
// This will create a new instance of the Cli class
const cli = new Cli(pool);
// This will run the command line application
cli.runCLI();
