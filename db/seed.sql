-- This will setup a transaction block
DO $$

-- This will begin the transaction
BEGIN
    -- This will insert data into the department table
    INSERT INTO department (name)
        VALUES ('Engineering'),
            ('Sales'), 
            ('Finance'), 
            ('Legal');

    -- This will insert data into the roles table
    INSERT INTO roles (title, salary, department_id) 
        VALUES ('Software Engineer', 100000, 1),
            ('Sales Lead', 80000, 2),
            ('Accountant', 75000, 3),
            ('Lawyer', 120000, 4);

    -- This will insert data into the employee table
    INSERT INTO employee (first_name, last_name, role_id, manager_id)    
        VALUES ('John', 'Doe', 1, NULL),
            ('Jane', 'Smith', 2, 1),
            ('Alice', 'Johnson', 3, 1),
            ('Charlie', 'Thompson', 4, 1),
            ('Bob', 'Brown', 1, 2),
            ('Karen', 'Miller', 2, 2),
            ('Dylan', 'Williams', 3, 3),
            ('Sarah', 'Davis', 4, 3);

    -- This will check for exceptions
    EXCEPTION
        -- This will catch the exception if the data already exists in the database
        WHEN unique_violation THEN
            RAISE NOTICE 'Data already exists in the database.';

-- This will end the transaction
END $$;