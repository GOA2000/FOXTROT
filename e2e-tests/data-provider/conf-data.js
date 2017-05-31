var randomNo = Math.floor(10000 * Math.random() + 1).toString();
var helper = require('../helpers/e2e-helper.js');

exports.baseUrl = 'http://localhost:63342/foxtrot/Billing.Web/index.html?_ijt=5dkmrlnf2mfsne9l4dr5mcg3n1#/';

exports.sortingOptions = [
    'Name asc',
    'Name dsc',
    'Address asc',
    'Adress dsc',
    'Town asc',
    'Town dsc'
]

exports.sortingOptions = {
    Name_ascending:'Name asc',
    Name_descending:'Name dsc',
    Address_ascending:'Address asc',
    Address_descending:'Address dsc',
    Town_ascending:'Town asc',
    Town_descending:'Town dsc'
}

exports.valuesSortedByName_A_to_Z = [
    'SCHRACK',
    'Supplier name 9722',
    'TGA-COMERCE'
];

exports.valuesSortedByAddressAsc = [
    'Hiseeta 1',
    'Supplier address 9722',
    'Trg nezavisnosti 13'
];

exports.valuesSortedByAddressDsc = [
    'Trg nezavisnosti 13',
    'Supplier address 9722',
    'Hiseeta 1'
];

exports.valuesSortedByName_Z_to_A = [
    'TGA-COMERCE',
    'Supplier name 9722',
    'SCHRACK'
];

exports.valuesSortedByTownAsc = [
    '71000 SARAJEVO',
    '71000 SARAJEVO',
    '71000 SARAJEVO'
];

exports.valuesSortedByTownDsc = [
    '71000 SARAJEVO',
    '71000 SARAJEVO',
    '71000 SARAJEVO'
];

exports.agentRandomName = 'Agent name ' + randomNo;
exports.agentRandomName_edited = 'Agent name _ edited ' + randomNo;

exports.customerRandomName = 'Customer name ' + randomNo;
exports.customerRandomName_edited = 'Customer name _ edited ' + randomNo;

exports.customerRandomAddress = 'Customer address ' + randomNo;
exports.customerRandomAdress_edited = 'Customer address _ edited ' + randomNo;

exports.categoryRandomName = 'Category name ' + randomNo;
exports.categoryRandomName_edited = 'Category name _ edited ' + randomNo;

exports.shipperRandomName = 'Shipper name ' + randomNo;
exports.shipperRandomName_edited = 'Shipper name _ edited ' + randomNo;

exports.shipperRandomAddress = 'Shipper address ' + randomNo;
exports.shipperRandomAdress_edited = 'Shipper address _ edited ' + randomNo;

exports.supplierRandomName = 'Supplier name ' + randomNo;
exports.supplierRandomName_edited = 'Supplier name _ edited ' + randomNo;

exports.supplierRandomAddress = 'Supplier address ' + randomNo;
exports.supplierRandomAdress_edited = 'Supplier address _ edited ' + randomNo;

exports.productRandomName = 'Product name ' + randomNo;
exports.productRandomName_edited = 'Product name _ edited ' + randomNo;

exports.productRandomPrice = 'Product price' + randomNo;
exports.productRandomPrice_edited = 'Product price _ edited ' + randomNo;

exports.shippers_dbValues = [
    'BH Post',
    'Aleja lipa 12' ,
    //helper.currentDate
];

exports.Town = [
    'BUGOJNO',
    'DRVETINE',
    'SARAJEVO',
    'ZENICA'
];

exports.Category = [
    'Telephones',
    'Laptops',
    'Computers'
];

exports.report_names = [
    'TEMPLEVILLE DEVELOPMENTS LIMITED BH D.O.',
    'QUATRO'
    // 'EUROPA D.D.',
    // 'HIDROGRADNJA',
    // 'LIGHT ELECTRIC',
    // 'OLD TOWN S.U.R. HOTEL',
    // 'PH INŽINJERING D.O.O',
    // 'QUATRO',
    // 'SUR FAST FOOD ZMAJ',
    // 'TEMPLEVILLE DEVELOPMENTS LIMITED BH D.O.'
];

exports.report_turnovers = [
    '793.10 €',
    '7,643.40 €',
    // '694.02 €',
    // '1,243.80 €',
    // '8,181.38 €',
    // '633.86 €',
    // '551.55 €',
    // '59,888.99 €',
    // '779.95 €',
    // '1,045.16 €'
];

exports.dates_forReport = [
    '01/01/2016',
    '05/18/2017'
];

exports.reportTableHeaders = [
    'Name',
    'Turnover',
    'Percentage'
];

exports.reportPercentages = [
    '0.974 %',
    '9.384 %',
    // '0.852 %',
    // '1.527 %',
    // '10.044 %',
    // '0.778 %',
    // '0.677 %',
    // '73.524 %',
    // '0.958 %',
    // '1.283 %'
];

exports.reportTableHeadersOnReport = [
    'Customer',
    'Turnover',
    'REFLECTOR',
    'LAPTOP',
    'MONITOR',
    'DESKTOP',
    'PRINTER INKJET',
    'PRINTER LASER',
    'PROJECTOR'
];

exports.customerNames = [
    'TEMPLEVILLE DEVELOPMENTS LIMITED BH D.O.',
    'HIDROGRADNJA',
    'Customer name _ edited 8479'
];

exports.turnovers = [
    '748 €',
    '940 €',
    '430 €'
];

exports.monitorSales = [
    '0 €',
    '535 €',
    '0 €'
];

module.exports = exports;

