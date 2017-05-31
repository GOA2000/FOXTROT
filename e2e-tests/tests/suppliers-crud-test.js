var page = require('../pages/suppliers-page.js');
var loginPage = require('../pages/login-page.js');
var menu = require('../pages/menu.js');
var D    = require('../data-provider/conf-data.js');

describe('Suppliers CRUD operations', function () {

    beforeAll(function() {
        browser.refresh();
        loginPage.log_in();
        menu.click_Suppliers()
    });


    it('1. Verify record is present after creating it', function () {
        page.click_NEW_SUPPLIER_button()
            .enter_new_name_in_Name_input_field(D.supplierRandomName)
            .enter_new_name_in_Address_input_field(D.supplierRandomAddress)
            .enter_SAR_in_Town_input_field()
            .select_town(D.Town[2])
            .click_Save()
            .search_for_supplier_name(D.supplierRandomName)
            .verify_new_record_is_displayed(D.supplierRandomName, D.supplierRandomAddress, D.Town[2])
    });

    it('2. Verify record is edited after adding changes to it', function () {
        menu.click_Customers();
        menu.click_Suppliers();
        page.click_Edit_on_first_row()
            .enter_new_name_in_Name_input_field(D.supplierRandomName_edited)
            .enter_new_name_in_Address_input_field(D.supplierRandomAdress_edited)
            .enter_ZEN_in_Town_input_field()
            .select_town(D.Town[3])
            .click_Save()
            .click_Yes_update_it()
            .clear_search_input()
            .search_for_supplier_name(D.supplierRandomName_edited)
            .verify_new_record_is_displayed(D.supplierRandomName_edited, D.supplierRandomAdress_edited, D.Town[3])
    });

    it('3. Verify that after deleting, record is no more present', function () {
        page.click_Delete_button_on_first_row()
            .click_Yes_delete_it()
            .verify_new_record_is_not_displayed()

    });

});
