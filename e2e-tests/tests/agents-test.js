var page = require('../pages/agents-page.js');
var loginPage = require('../pages/login-page.js');
var menu = require('../pages/menu.js');
var D    = require('../data-provider/conf-data.js');

describe('Agents page functionalities', function () {

    beforeAll(function() {
        browser.refresh();
    //beforeAll(function() {
        loginPage.log_in();
        menu.click_Agents()
    });

    it('1. Verify url after selecting Agents menu option', function () {
        page.verify_current_url()
    })

    it('2. Verify agent name can be changed', function () {
        page.click_Edit_for_first_agent()
            .change_name_of_first_agent()
            .click_Save()
            .click_Yes_update_it()
            .verify_new_agent_name_is_displayed()
            .click_Edit_for_first_agent()
            .enter_and_save_old_name_again()
    })
});
