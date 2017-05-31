var page = require('../pages/products-page.js');
var loginPage = require('../pages/login-page.js');
var menu = require('../pages/menu.js');
var D    = require('../data-provider/conf-data.js');

describe('Products CRUD operations', function () {

    beforeAll(function() {
        loginPage.log_in();
        menu.click_Products()
    });


    it('1. Verify record is present after creating it', function () {
        page.click_NEW_PRODUCT_button()
            .enter_new_name_in_Name_input_field(D.productRandomName)
            .enter_pcs_in_Unit_input_field()
            .enter_price_in_Price_input_field(D.productRandomPrice)
            .select_category(D.Category[2])
            .click_Save()
            .search_for_product_name(D.productRandomName)
            .verify_new_record_is_displayed(D.productRandomName,'pcs',D.productRandomPrice,D.Category[2])
    });

    xit('2. Verify record is edited after adding changes to it', function () {
        page.click_Edit_on_last_row()
            .enter_new_name_in_Name_input_field(D.productRandomName_edited)
            .enter_pcs_in_Unit_input_field()
            .select_category(D.Category[1])
            .click_Save()
            .click_Yes_update_it()
            .click_OK()
            .verify_new_record_is_displayed(D.productRandomName_edited,'pcs','0',D.Category[1])
    });

    xit('3. Verify that after deleting, record is no more present', function () {
        page.click_Delete_button_on_last_row()
            .click_Yes_delete_it()
            .click_OK()
            .verify_new_record_is_not_displayed()
    });

});

