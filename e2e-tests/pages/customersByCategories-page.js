'use strict';

var EC = protractor.ExpectedConditions;
var helper = require('../helpers/e2e-helper.js');
var D = require('../data-provider/conf-data.js');

var datePickerStart = element(by.model('requestData.startDate'));
var datePickerEnd = element(by.model('requestData.endDate'));
var showCustomersByCategories = element(by.buttonText('SHOW CUSTOMERS BY CATEGORIES'));
var table = $('#datatable');
var tableHeader = element(by.tagName('thead'));
var tableRows = element.all(by.repeater('item in salesByCategoryData.sales'));

var customersByCategoriesPage = function () {

    this.select_start_date = function (startDate) {
        helper.waitAndEnterValue(datePickerStart, startDate)
        return this;
    };

    this.select_end_date = function (endDate) {
        helper.waitAndEnterValue(datePickerEnd, endDate)
        return this;
    };

    this.click_SHOW_CUSTOMERS_BY_CATEGORIES_button = function () {
        helper.waitAndClick(showCustomersByCategories);
        return this;
    };

    this.verify_table_headers = function () {
        helper.verifyElementContainsArrayOfValues(tableHeader, D.reportTableHeadersOnReport)
        return this;
    };

    this.verify_customer_names = function () {
        helper.verifyElementContainsArrayOfValues(table, D.customerNames);
        return this;
    };

    this.verify_turnovers_on_report = function () {
        helper.verifyElementContainsArrayOfValues(table, D.turnovers);
        return this;
    };

    this.verify_sales_of_Monitor_category = function () {
        helper.verifyElementContainsArrayOfValues(table, D.monitorSales);
        return this;
    };

};

module.exports = new customersByCategoriesPage();
