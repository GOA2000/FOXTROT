'use strict';

var EC = protractor.ExpectedConditions;
var helper = require('../helpers/e2e-helper.js');

var agentsLink = $('[href="#/agents"]');
var customersLink = $('[href="#/customers"]');
var categoriesLink = $('[href="#/categories"]');
var shippersLink = $('[href="#/shippers"]');
var suppliersLink = $('[href="#/suppliers"]');
var productsLink = $('[href="#/products"]');
var reportsLink = $('[data-target="#submenu-1"]');

var Menu = function () {

    this.click_Agents = function () {
        helper.waitAndClick(agentsLink)
        return this;
    }

    this.click_Customers = function () {
        helper.waitAndClick(customersLink)
        return this;
    }

    this.click_Categories = function () {
        helper.waitAndClick(categoriesLink)
        return this;
    }

    this.click_Shippers = function () {
        helper.waitAndClick(shippersLink)
        return this;
    }

    this.click_Suppliers = function () {
        helper.waitAndClick(suppliersLink)
        return this;
    }

    this.click_Products = function () {
        helper.waitAndClick(productsLink)
        return this;
    }

    this.click_Reports = function () {
        helper.waitAndClick(reportsLink)
        return this;
    }

};

module.exports = new Menu();

