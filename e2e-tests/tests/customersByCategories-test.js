var page = require('../pages/customersByCategories-page.js');
var loginPage = require('../pages/login-page.js');
var menu = require('../pages/menu.js');
var submenu = require('../pages/submenu.js');
var D    = require('../data-provider/conf-data.js');


describe('Customers by categories report functionalities', function () {

    beforeAll(function() {
        browser.refresh();
        loginPage.log_in();
        menu.click_Reports();
        submenu.click_Customers_by_Categories();
        page.select_start_date(D.dates_forReport[0])
            .select_end_date(D.dates_forReport[1])
            .click_SHOW_CUSTOMERS_BY_CATEGORIES_button()
    });

    it('1. Verify table headers are present', function () {
        page.verify_table_headers()
    });

    it('2. Verify  customer names are present', function () {
        page.verify_customer_names()
    });

    it('3. Verify turnovers are present', function () {
        page.verify_turnovers_on_report()
    });

    it('4. Verify sales of Monitor category are present', function () {
        page.verify_sales_of_Monitor_category()
    });


});