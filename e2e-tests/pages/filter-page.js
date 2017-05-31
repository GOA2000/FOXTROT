'use strict';

var EC = protractor.ExpectedConditions;
var helper = require('../helpers/e2e-helper.js');
var D = require('../data-provider/conf-data.js');

var filterInputField = element(by.model('selector'));
var supplierOnList_first = $$('[ng-repeat="supplier in suppliers"]').first();

var FilterPage = function () {

    this.verify_Filter_input_field_is_enabled_and_blank = function () {
        helper.verifyElementIsEnabled(filterInputField);
        helper.verifyInputFieldIsBlank(filterInputField);
        return this;
    };

    this.enter_word_on_Filter = function () {
        helper.clearAndEnterValue(filterInputField, 'SCH');
        return this;
    };

    this.verify_filter_is_applied_properly = function () {
        helper.verifyText(supplierOnList_first, 'SCHRACK');
        helper.verifyTextIsNotDisplayed(supplierOnList_first, 'TGA-COMERCE');
        return this;
    };

};

module.exports = new FilterPage();

