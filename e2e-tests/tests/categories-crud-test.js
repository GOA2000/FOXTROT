var page = require('../pages/categories-page.js');
var loginPage = require('../pages/login-page.js');
var menu = require('../pages/menu.js');
var D    = require('../data-provider/conf-data.js');

describe('Categories CRUD operations', function () {

    beforeAll(function() {
        browser.refresh();
        loginPage.log_in();
        menu.click_Categories()
    });


    it('1. Verify record is present after creating it', function () {
        page.click_NEW_CATEGORY_button()
            .enter_new_name_in_Name_input_field(D.categoryRandomName)
            .click_Save()
            .search_for_category_name(D.categoryRandomName)
            .verify_new_record_is_displayed(D.categoryRandomName)

    });

    it('2. Verify record is edited after adding changes to it', function () {
        menu.click_Shippers();
        menu.click_Categories();
        page.click_Edit_on_first_row()
            .enter_new_name_in_Name_input_field(D.categoryRandomName_edited)
            .click_Save()
            .click_Yes_update_it()
            .verify_new_record_is_displayed(D.categoryRandomName_edited)

    });

    it('3. Verify that after deleting, record is no more present', function () {
        page.click_Delete_button_on_first_row()
            .click_Yes_delete_it()
            .verify_new_record_is_not_displayed()

    });

});