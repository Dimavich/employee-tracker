const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user:'root',
    password:'root',
    database:'company_db',
});

connection.connect((err)=>{
    if(err) throw err;
    employeeSearch();
})

const employeeSearch = () => {
    inquirer.prompt({
        name: 'action',
        type: 'list',
        message:'What would you like to do?',
        choices: ['View','Add','Update']
    })
    .then((answer)=>{
        switch(answer.action) {
            case 'View':
                viewDb();
                break;
            case 'Add':
                addDb();
                break;
            case 'Update':
                updateDb();
                break;
        };
    });
};

const viewDb = () => {
    inquirer.prompt({
        name: 'view',
        type: 'list',
        message:'What do you want to view?',
        choices:[
            'employees',
            'departments',
            'role',
        ],
    })
    .then((answer)=>{
        switch(answer.view){
            case 'employees':
                renderEmployee();
                break;
            case 'department':
                renderDepartment();
                break;
            case 'role':
                renderRole();
                break;
        }
    })
};

const addDb = () => {
    inquirer.prompt({
        name: 'view',
        type: 'list',
        message:'Where do you want to add?',
        choices:[
            'employees',
            'departments',
            'role',
        ],
    })
    .then((answer)=>{
        switch(answer.view){
            case 'employees':
                addToEmployee();
                break;
            case 'department':
                addToDepartment();
                break;
            case 'role':
                addToRole();
                break;
        }
    })
};

const updateDb = () => {
    inquirer.prompt({
        name: 'view',
        type: 'list',
        message:'Where do you want to update?',
        choices:[
            'employees',
            'departments',
            'role',
        ],
    })
    .then((answer)=>{
        switch(answer.view){
            case 'employees':
                updateEmployee();
                break;
            case 'department':
                updateDepartment();
                break;
            case 'role':
                updateRole();
                break;
        }
    })
};

const addToEmployee = () => {
    // code
};

const addToDepartment = () => {
    // code
};

const addToRole = () => {
    // code
};
