var option = require('../options.js');
var API = require('../intraAPI/APIQuery.js');
var mysql = require('mysql');

function databaseQuery(func, arg, callback) {
    option.connection = mysql.createConnection(option.connectMysql);

    if (option.connection.state == 'disconnected') {
        option.connection.connect(function (error) {
            if (!!error) {
                console.log(error);
                return;
            }
            // else
            // console.log('Conection');
            console.log(option.connection.state);
            func(arg, callback);
        });
    }
    else {
        // console.log('already connected');
        func(arg, callback);
    }
}

function createUsersTab() {
    API.getCursusUsers(users => {
        console.log(users.length);
        databaseQuery(function (users) {
            users.forEach(elem => {
                let wave;
                let stmt = `INSERT INTO users(login, user_id, level, begin_at, grade, wave)
                        VALUES(?,?,?,?,?,?)`;
                if (elem.begin_at.search(/2018-/) != -1)
                    wave = 1;
                else
                    wave = 2;
                let todo = [elem.login, elem.user_id, elem.level, elem.begin_at, elem.grade, wave];
                option.connection.query(stmt, todo, (err, results) => {
                    if (err) {
                        return console.error(err.message);
                    }
                    // get inserted id
                    console.log('Todo Id:' + results.insertId);
                });
            });

            option.connection.end(function (error) {
                if (!!error)
                    console.log(error);
                else
                    console.log('Disconnect');
            });
        }, users);
    });
}

function updateUsersTab(callback) {
    API.getCursusUsers(function (users, callback) {
        console.log(users.length);
        databaseQuery(function (users, callback) {
            users.forEach(function (elem, i) {
                let stmt = `UPDATE \`users\` SET \`level\`= ?,\`grade\`= ?, datatime = now() WHERE login = ?`;
                let todo = [elem.level, elem.grade, elem.login];
                option.connection.query(stmt, todo, (err, results) => {
                    if (err) {
                        return console.error(err.message);
                    }
                    // get inserted id
                    // console.log('Todo Id:' + results.insertId);

                });
                if (i == users.length - 1) {
                    console.log(i);
                    option.connection.end();
                    callback();
                }
            });



            return 0;
        }, users, callback);
    }, callback);
}

function updateStaffTab() {
    databaseQuery(function () {
        option.connection.query('SELECT * FROM `users` WHERE 1', (err, results) => {
            if (err) {
                return console.error(err.message);
            }
            API.getUsers(results);
        });

    });

}

module.exports = {
    createUsersTab: createUsersTab,
    databaseQuery: databaseQuery,
    updateUsersTab: updateUsersTab,
    updateStaffTab: updateStaffTab
};