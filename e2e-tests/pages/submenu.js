'use strict';

var EC = protractor.ExpectedConditions;
var helper = require('../helpers/e2e-helper.js');
var menu = require('../pages/menu.js');

var salesByCustomerLink = $('[href="#/salesbycustomer"]');
var agentByRegionLink = $('[href="#/agentregion"]');
var customersByCategories = $ ('[href="#/customerscategories"]');

var Submenu = function () {

    this.click_Sales_by_Customer = function () {
        helper.waitAndClick(salesByCustomerLink)
        return this;
    }

    this.click_Agent_By_Reports = function () {
        helper.waitAndClick(agentByRegionLink)
        return this;
    }

    this.click_Customers_by_Categories = function () {
        helper.waitAndClick(customersByCategories)
        return this;
    }

};

module.exports = new Submenu();