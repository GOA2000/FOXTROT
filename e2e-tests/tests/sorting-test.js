var page = require('../pages/sorting-page.js');
var loginPage = require('../pages/login-page.js');
var menu = require('../pages/menu.js');
var D    = require('../data-provider/conf-data.js');

describe('Sorting functionality', function () {

    beforeAll(function () {
        browser.refresh();
        loginPage.log_in();
        menu.click_Suppliers()
    });

    it('1. Verify available Sorting options for Suppliers page', function () {
        page.verify_available_sorting_options()
    });


    it('2. Verify that sorting by Name ascending works properly', function () {
        page.sort_by(D.sortingOptions.Name_ascending)
            .verify_that_sorting_option_works_properly(D.valuesSortedByName_A_to_Z);

    });

    it('3. Verify that sorting by Name descending properly', function () {
        page.sort_by(D.sortingOptions.Name_descending)
            .verify_that_sorting_option_works_properly(D.valuesSortedByName_Z_to_A);

    });

    it('4. Verify that sorting by Address ascending properly', function () {
        page.sort_by(D.sortingOptions.Address_ascending)
            .verify_that_sorting_option_works_properly(D.valuesSortedByAddressAsc);

    });

    it('5. Verify that sorting by Address descending properly', function () {
        page.sort_by(D.sortingOptions.Address_descending)
            .verify_that_sorting_option_works_properly(D.valuesSortedByAddressDsc);

    });

    it('6. Verify that sorting by Town ascending properly', function () {
        page.sort_by(D.sortingOptions.Town_ascending)
            .verify_that_sorting_option_works_properly(D.valuesSortedByTownAsc);

    });

    it('7. Verify that sorting by Town descending properly', function () {
        page.sort_by(D.sortingOptions.Town_descending)
            .verify_that_sorting_option_works_properly(D.valuesSortedByTownDsc);

    });

});


