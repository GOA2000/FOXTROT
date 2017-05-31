'use strict';

var EC     = protractor.ExpectedConditions;
var helper = require('../helpers/e2e-helper.js');
var D = require('../data-provider/conf-data.js');

var usernameInputField    = element(by.model('user.name'));
var passwordInputField = element(by.model('user.pass'));
var loginButton        = element(by.buttonText('LOG IN'));

var LoginPage = function () {

    this.log_in = function () {
        browser.get(D.baseUrl);
        helper.waitAndEnterValue(usernameInputField, 'marlon');
        helper.waitAndEnterValue(passwordInputField, 'billing');
        loginButton.click();
        return this;
    }
};

module.exports = new LoginPage();

