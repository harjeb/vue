let util = {

};
util.title = function (title) {
    title = title ? title + ' - Home' : 'View UI project';
    window.document.title = title;
};

import axios from '../main.js'

util.ssh_test = function (ip, user, password) {
    console.log('------');
    console.log(ip);
    console.log(user);
    console.log(password);
    axios.get( "http://127.0.0.1:5000/api/hi")
        .then(response => {
          console.log(response, "success");   // 成功的返回   
          return response;   
        })
        .catch(error => {console.log(error, "error");
        return error;
    }); // 失败的返回
  
};
export default util;
