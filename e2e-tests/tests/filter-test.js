var page = require('../pages/filter-page.js');
var loginPage = require('../pages/login-page.js');
var menu = require('../pages/menu.js');
var D    = require('../data-provider/conf-data.js');

describe('Filter functionality', function () {

    beforeAll(function () {
        browser.refresh();
        loginPage.log_in();
        menu.click_Suppliers()
    });

    it('1. Verify Filter input field is enabled and blank by default', function () {
        page.verify_Filter_input_field_is_enabled_and_blank()
    });

    it('2. Verify result is correct after filtering with specific word', function () {
        page.enter_word_on_Filter()
            .verify_filter_is_applied_properly()
    });

});