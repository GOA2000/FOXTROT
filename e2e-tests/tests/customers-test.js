var page = require('../pages/customers-page.js');
var menu = require('../pages/menu.js');
var D    = require('../data-provider/conf-data.js');
var loginPage = require('../pages/login-page.js');


describe('Customers page functionalities', function () {

    beforeAll(function() {
        browser.refresh();
        loginPage.log_in();
        menu.click_Customers()
    });

    it('1. Verify url after selecting Customers menu option', function () {
        page.verify_current_url()
    });

    it('2. Verify available Sorting options', function () {
        page.verify_available_sorting_options()
    });


});
