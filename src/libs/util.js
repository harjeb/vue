let util = {

};
util.title = function (title) {
    title = title ? title + ' - Home' : 'View UI project';
    window.document.title = title;
};


util.ssh_test = function (ip, user, password) {
    console.log('------');
    console.log(ip);
    console.log(user);
    console.log(password);
    return "99ms";
    
};
export default util;
