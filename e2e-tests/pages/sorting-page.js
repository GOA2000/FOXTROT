'use strict';

var EC = protractor.ExpectedConditions;
var helper = require('../helpers/e2e-helper.js');
var D = require('../data-provider/conf-data.js');

var optionsOnSortingDropdown = element(by.model('$parent.sort')).all(by.tagName('option'));
var allSortingDropdownElements = [
    optionsOnSortingDropdown.get(1),
    optionsOnSortingDropdown.get(2),
    optionsOnSortingDropdown.get(3),
    optionsOnSortingDropdown.get(4)
];
var sortingDropdown = element (by.model('sort'));
var supplierOnList = $$('[ng-repeat="supplier in suppliers"]');

var SortingPage = function () {

    this.verify_available_sorting_options = function () {
        helper.verifyTextFields(allSortingDropdownElements, D.sortingOptions);
        return this;
    };

    this.sort_by = function (sortingCriteria) {
        helper.selectDropdownOption(sortingDropdown, sortingCriteria);
        helper.verifySelectedOptionOnDropdown(sortingDropdown, sortingCriteria)
        return this;
    };

    this.verify_that_sorting_option_works_properly = function (sortedElementsArray) {
        helper.verifyTextOnSequentialFields(supplierOnList, sortedElementsArray)
        return this;
    };

};

module.exports = new SortingPage();

