const OAuth = require('oauth');
const fetch = require("node-fetch");
var option = require('../options.js');
var formation = require('../formationUrl.js');
var DBquery = require('../functionDB/databaseQuery.js');
var OAuth2 = OAuth.OAuth2;

OAuth2 = new OAuth2(option.UID, option.SECRET, 'https://api.intra.42.fr/', null, 'oauth/token', null);

function APIQuery(func, arg) {
    
    OAuth2.getOAuthAccessToken('',
        {'grant_type': 'client_credentials'},
        function (e, access_token) {
            // console.log('token: ',  access_token);
            option.token = access_token;
            func(arg);
        }
    );
}

function getCursusUsers (callback, callback2) {
    let users = [];
    let id = 0;
    APIQuery(function func() {
        
        let url =  formation.cursus_users_form();
        console.log(formation.page + ' - page');
        // console.log(url.href);
        fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.length == 0) {
                formation.page = 0;
                if (callback)
                    callback(users, callback2);
                return ;
            }
            else
                formation.page++;
                
            data.forEach(element => {
                let user = {};
                user.login = element.user.login;
                user.user_id = element.user.id;
                user.level = element.level;
                user.begin_at = element.begin_at;
                user.grade = element.grade;
                users[id] = user;
                id++;
            });

            return func();
        })
        .catch(function (error) {
            console.log(error);
        });
    });
}

function getUsers(users) {
    APIQuery(function func (users) {
        if (users.length == 0)
            return ;
        let url =  formation.users_form(users[0].user_id);
        users.splice(0, 1);
        fetch(url.href)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // console.log(users.length);
            option.connection.query('UPDATE `users` SET `staff` =' + data['staff?'] + ' WHERE login = \'' + data.login + '\'');
            return func(users);
           
        })
        .catch(function (error) {
            console.log(error);
        });
    }, users);
}

function getProjectsUsers(users) {
    APIQuery(function func (users) {
        // if (users.length == 0)
        //     return ;
        let url =  formation.projects_users_form(43480);
        // users.splice(0, 1);
        console.log(url.href);
        fetch(url.href)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data);
            data.forEach(elem => {
                console.log(elem.project.name);
            });
            // console.log(users.length);
            // option.connection.query('UPDATE `users` SET `staff` =' + data['staff?'] + ' WHERE login = \'' + data.login + '\'');
            // return func(users);
           
        })
        .catch(function (error) {
            console.log(error);
        });
    }, users);
}


module.exports= {
    APIQuery: APIQuery,
    getCursusUsers:getCursusUsers,
    getUsers:  getUsers,
    getProjectsUsers: getProjectsUsers
};