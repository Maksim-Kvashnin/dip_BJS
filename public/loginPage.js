'use strict'

const user = new UserForm();

user.loginFormCallback = data => {
  ApiConnector.login(data, response => {
    response.success ? location.reload() : user.setLoginErrorMessage(response.data);
    console.log(response);
  });
}

user.registerFormCallback = data => {
  ApiConnector.register(data, response => {
    response.success ? location.reload() : user.setRegisterErrorMessage(response.data);
    console.log(response);
  });
}
