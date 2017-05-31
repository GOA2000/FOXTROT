var page = require('../pages/customers-page.js');
var loginPage = require('../pages/login-page.js');
var menu = require('../pages/menu.js');
var D    = require('../data-provider/conf-data.js');

describe('Customers CRUD operations', function () {

    beforeAll(function() {
        browser.refresh();
        loginPage.log_in();
        menu.click_Customers()
    });


    xit('1. Verify record is present after creating it', function () {
        page.click_NEW_CUSTOMER_button()
            .enter_new_name_in_Name_input_field(D.customerRandomName)
            .enter_new_name_in_Address_input_field(D.customerRandomAddress)
            .enter_DRV_in_Town_input_field()
            .select_town(D.Town[1])
            .click_Save()
            .search_for_customer_name(D.customerRandomName)
            .verify_new_record_is_displayed(D.customerRandomName, D.customerRandomAddress, D.Town[1])

    });

    xit('2. Verify record is edited after adding changes to it', function () {
        menu.click_Shippers();
        menu.click_Customers();
        page.click_Edit_on_first_row()
            .enter_new_name_in_Name_input_field(D.customerRandomName_edited)
            .enter_new_name_in_Address_input_field(D.customerRandomAdress_edited)
            .enter_BUG_in_Town_input_field()
            .select_town(D.Town[0])
            .click_Save()
            .click_Yes_update_it()
            .search_for_customer_name(D.customerRandomName_edited)
            .verify_new_record_is_displayed(D.customerRandomName_edited, D.customerRandomAdress_edited, D.Town[0])

    });

    xit('3. Verify that after deleting, record is no more present', function () {
        page.click_Delete_button_on_first_row()
            .click_Yes_delete_it()
            .verify_new_record_is_not_displayed()

    });

});
