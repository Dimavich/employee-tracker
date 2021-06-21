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
        choices: ['View','Add','Update','Exit']
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
            case 'Exit':
                endConnection();
                break
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
            case 'departments':
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
            case 'departments':
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
// render functions
const renderEmployee = () => {
    const query = `SELECT * FROM employees`;
    connection.query(query,(err,res) =>{
        console.table(res);
        employeeSearch();
    })
};

const renderDepartment = () => {
    const query = `SELECT * FROM department`;
    connection.query(query,(err,res)=>{
        console.table(res);
        employeeSearch();
    })
};

const renderRole = () => {
    const query = `SELECT * FROM role`;
    connection.query(query,(err,res) =>{
        console.table(res);
        employeeSearch();
    })
};

// add to table functions
const addToEmployee = () => {
    let query = `SELECT role.id, role.title FROM role ORDER BY role.id`;
    connection.query(query, (err,res)=>{
        if (err) throw err;
        inquirer.prompt([
            {
                name: 'firstName',
                type:'input',
                message:'Employee First name:',
            },
            {
                name: 'lastName',
                type:'input',
                message:'Employee Last name:',
            },
            {
                name: 'roleId',
                type:'list',
                choices: res.map(()=>res[0].id),
                message:'Employee role id',
                
            },
            {
                name: 'managerId',
                type:'input',
                message:"Employee's Manager id (leave blank if none)",

            },
        ]).then((answers)=>{
            if (answers.managerId === '') {
                answers.managerId = 0;
            };
            connection.query(
                `INSERT INTO employees SET ?`,
                
                {
                    first_name: answers.firstName,
                    last_name: answers.lastName,
                    role_id: answers.roleId,
                    manager_id: answers.managerId,
                },
                (err) => {
                    if (err) throw err;
                    console.log(`employee ${answers.firstName} was added to the employee database`);
                    employeeSearch();
                }
            )

        });
    });

};

const addToDepartment = () => {
    inquirer.prompt([
        {
            name: 'name',
            type:'input',
            message:'Department name: ',
        },
    ]).then((answers)=>{
        connection.query(
            `INSERT INTO department SET ?`,

            {
                name: answers.name,
            },
            (err) => {
                if (err) throw err;
                console.log(`Department ${answers.name} was added to the department database`);
                employeeSearch();
            }
        )
    });
};


const addToRole = () => {
    let query = 'SELECT name FROM department ORDER BY id';
    connection.query(query, (err,res)=>{
        if (err) throw err;
        console.log('\n');
        console.table(res);
        console.log('\n');
        inquirer.prompt([
            {
                name:'title',
                type: 'input',
                message:'New role title'
            },
            {
                name:'salary',
                type:'integer',
                message:'sallary  ex.(00.000)'
            },
            {
                name:'departmendId',
                type: 'integer',
                message:'What department is this role in?'
            }
        ])
        .then((answers)=>{
            connection.query(
                'INSERT INTO role SET ?',
                
                {
                    title: answers.title,
                    salary: answers.salary,
                    department_id: answers.departmendId,
                },
                (err) => {
                    if (err) throw err;
                    console.log(`Department ${answers.title} was added to the department database`);
                    employeeSearch();
                },      
            )
        })
    });
};


const updateEmployee = () => {
    connection.query('SELECT * FROM employees',(err,res)=>{
        console.log('\n');
        console.table(res);
        console.log('\n');
    })
    inquirer.prompt([
        {
            name:'updateLocation',
            type:'list',
            message:'what would you like to update?',
            choices:['first_name','last_name','role_id','manager_id']        
        },
        {
            name:'id',
            type:'integer',
            message:'Index location'
        },
        {
            name:'updateValue',
            type:'input',
            message:'Input the new value' 
        }
    ])
    .then((answers)=>{
        connection.query(
            `UPDATE employees SET ${answers.updateLocation} = ${answers.updateValue} WHERE (id = ${answers.id})`,
            (err) => {
                if (err) throw err;
                console.log(`${answers.updateLocation} on row ${answers.id} updated to ${answers.updateValue}`);
                employeeSearch();
            }
        )
    })
};

const updateDepartment = () => {
    connection.query('SELECT * FROM department',(err,res)=>{
        console.log('\n');
        console.table(res);
        console.log('\n');
    })
    inquirer.prompt([
        {
            name:'id',
            type:'integer',
            message:'Index location'
        },
        {
            name:'updateValue',
            type:'input',
            message:'Input the new value' 
        }
    ])
    .then((answers)=>{
        connection.query(
            `UPDATE department SET department.name = ${answers.updateValue} WHERE (id = ${answers.id})`,
            (err) => {
                if (err) throw err;
                console.log(`department name on row ${answers.id} updated to ${answers.updateValue}`);
                employeeSearch();
            }
        )
    })
};

const updateRole = () => {
    connection.query('SELECT * FROM role',(err,res)=>{
        console.log('\n');
        console.table(res);
        console.log('\n');
    })
    inquirer.prompt([
        {
            name:'updateLocation',
            type:'list',
            message:'what would you like to update?',
            choices:['title','salary','department_id']        
        },
        {
            name:'id',
            type:'integer',
            message:'Index location'
        },
        {
            name:'updateValue',
            type:'input',
            message:'Input the new value' 
        }
    ])
    .then((answers)=>{
        connection.query(
            `UPDATE role SET ${answers.updateLocation} = ${answers.updateValue} WHERE (id = ${answers.id})`,
            (err) => {
                if (err) throw err;
                console.log(`${answers.updateLocation} on row ${answers.id} updated to ${answers.updateValue}`);
                employeeSearch();
            }
        )
    })
};

const endConnection = () => {
    connection.end();
    console.log('Exiting......');
};

