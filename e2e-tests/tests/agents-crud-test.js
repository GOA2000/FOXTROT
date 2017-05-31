var page = require('../pages/agents-page.js');
var loginPage = require('../pages/login-page.js');
var menu = require('../pages/menu.js');
var D    = require('../data-provider/conf-data.js');

describe(D.selectedVersion + ' --Agents CRUD operations', function () {
//describe('Agents CRUD operations', function () {


    beforeEach(function() {
       browser.refresh();
        loginPage.log_in();
        menu.click_Agents()
    });

    it('1. Verify record is present after creating it', function () {
        page.click_NEW_AGENT_button()
            .enter_new_name_in_Name_input_field(D.agentRandomName)
            .click_Save()
            .verify_new_record_is_displayed(D.agentRandomName)

    });

    it('2. Verify record is edited after adding changes to it', function () {
        page.click_Edit_button_on_first_row()
            .enter_new_name_in_Name_input_field(D.agentRandomName_edited)
            .click_Save()
            .verify_new_record_is_displayed(D.agentRandomName_edited)

    });

    it('3. Verify that after deleting, record is no more present', function () {
        page.click_Delete_button_on_first_row()
            .verify_new_record_is_not_displayed()
    });
});