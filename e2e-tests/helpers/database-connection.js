'use strict';

var mssql  = require('mssql');
var helper = require('./e2e-helper.js');


var DBconfig = {
    server: 'localhost',
    database: 'BillingCloud',
    user: 'sa',
    password: 'test123',
    port:1433,
    options: {
        encrypt: true
    }
};

var connection = new mssql.connect(DBconfig);
var request = new mssql.Request();


exports.query = function (sqlQuery) {
    mssql.close().then(function () {
        connection.then(function () {
            request.query(sqlQuery).then(function (recordset) {
                console.dir(recordset.length);
            }).catch(function (err) {
                console.dir(err);
            });
        });
    });
};

exports.countDbRecordsBeforeAction = function (sqlQuery) {

    connection.then(function () {
        request.query(sqlQuery).then(function (recordset) {
            console.dir(recordset.length);
            exports.dbRecordsBefore = recordset.length
        }).catch(function (err) {
            console.dir(err);
        });
    });
};

exports.countDbRecordsBeforeAction = function (sqlQuery) {

    connection.then(function () {
        request.query(sqlQuery).then(function (recordset) {
            console.dir(recordset.length);
            exports.dbRecordsBefore = recordset.length
        }).catch(function (err) {
            console.dir(err);
        });
    });
};


exports.verify_number_of_records_is_increased_by_1 = function (elementToWait, sqlQuery) {

    elementToWait.isPresent().then(function () {
        connection.then(function () {
            request.query(sqlQuery).then(function (recordset) {
                console.dir(recordset.length);
                exports.dbRecordsAfter = recordset.length
            }).catch(function (err) {
                console.dir(err);
            }).then(function () {
                helper.waitVisibility(elementToWait);
                expect(exports.dbRecordsAfter).toBe(exports.dbRecordsBefore);

            });
        });

    });
}

exports.get_all_table_values = function (elementToWait, sqlQuery) {

    elementToWait.isPresent().then(function () {
        connection.then(function () {
            request.query(sqlQuery).then(function (recordset) {
                console.dir(recordset);
                exports.tableValues = recordset;
            }).catch(function (err) {
                console.dir(err);
            })
        });
    });
    return browser.getCurrentUrl();
}

/*
 exports.refreshDatabase = function () {

 connection.then(function () {
 request.query(sqlScript).then(function () {
 console.dir('DB refresh successfully completed!');
 }).catch(function (err) {
 console.dir(err);
 });
 });
 };*/
/*
 var sqlScript = `Delete from Customer
 Where Email like '%@testtt.com%'`;*/
