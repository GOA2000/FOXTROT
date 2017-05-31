'use strict';

var EC = protractor.ExpectedConditions;
var helper = require('../helpers/e2e-helper.js');
var D = require('../data-provider/conf-data.js');

var datePickerStart = element(by.model('requestData.startDate'));
var datePickerEnd = element(by.model('requestData.endDate'));
var showSalesByCustomerButton = element(by.buttonText('SHOW SALES BY CUSTOMER'));
var table = $('#datatable');
var tableHeader = element(by.tagName('thead'));
var tableRows = element.all(by.repeater('item in salesByCustomerData.sales'));

var salesByCustomerPage = function () {

    this.select_start_date = function (startDate) {
        helper.waitAndEnterValue(datePickerStart, startDate)
        return this;
    };

    this.select_end_date = function (endDate) {
        helper.waitAndEnterValue(datePickerEnd, endDate)
        return this;
    };

    this.click_SHOW_SALES_BY_CUSTOMER_button = function () {
        helper.waitAndClick(showSalesByCustomerButton);
        return this;
    };

    this.verify_table_headers = function () {
        helper.verifyElementContainsArrayOfValues(tableHeader, D.reportTableHeaders)
        return this;
    };

    this.verify_names_on_report = function () {
        helper.verifyElementContainsArrayOfValues(table, D.report_names);
        return this;
    };

    this.verify_turnovers_on_report = function () {
        helper.verifyElementContainsArrayOfValues(table, D.report_turnovers);
        return this;
    };

    this.verify_percentages_on_report = function () {
        helper.verifyElementContainsArrayOfValues(table, D.reportPercentages);
        return this;
    };

    this.count_number_of_table_entries = function () {
        helper.countAllElements(tableRows, 10)
        return this;
    };

};

module.exports = new salesByCustomerPage();

