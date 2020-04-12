var option = require('./options.js');

var page = 0;


function cursus_users_form () {
    let url = option.cursus_users_url;
    let params = option.cursus_users_params;
    params["page[number]"] = this.page;
    params.access_token = option.token;
    url.search = new URLSearchParams(params);
    return url;
}

function users_form (id) {
    let url = option.users_url;
    let params = {};
    url.pathname = '/v2/users/' + id;
    console.log(url.href );
    params.access_token = option.token;
    url.search = new URLSearchParams(params);
    return url;
}

function projects_users_form (id) {
    let url = option.projects_users_url;
    let params = option.projects_users_params;
    url.pathname = '/v2/users/' + id + '/projects_users';
    console.log(url.href);
    params.access_token = option.token;
    url.search = new URLSearchParams(params);
    return url;
}

module.exports= {
    cursus_users_form: cursus_users_form,
    users_form: users_form,
    projects_users_form: projects_users_form,
    page: page
};