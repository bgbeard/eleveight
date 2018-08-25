const { Connection, Request } = require('tedious');
const TYPES = require('tedious').TYPES;
const ConnectionPool = require('tedious-connection-pool');
const dbConfig = require('./dbconfig');

const poolConfig = {
    min: 1,
    max: 1,
    log: true
};

let _rows = [];
const pool = new ConnectionPool(poolConfig, dbConfig);

pool.on('error', (err) => {
    console.log(err);
});

const executeNonQuery = (procName, sqlParams) => new Promise((resolve, reject) => {
    pool.acquire((err, connection) => {
        let request = new Request(procName, (err, rowCoun) => {
            if (err) {
                reject(err.message);
            }
            connection.release();
        }); // end of request object

        // collect input parameters
        if (sqlParams && sqlParams.length > 0) {
            sqlParams.map(param => {
                if (param.isOutput)
                    request.addOutputParameter(param.name, param.type, param.value);
                else
                    request.addParameter(param.name, param.type, param.value);
            });
        }

        request.on('returnValue', (parameterName, value, metaData) => {
            resolve({ [parameterName]: value });
        });

        request.on('requestCompleted', function (rowCount, more) {
            resolve({ success: true });
        });

        connection.callProcedure(request);

    }); // end connection pool
});


const executeQuery = (procName, sqlParams) => new Promise((resolve, reject) => {

    pool.acquire((err, connection) => {
        request = new Request(procName, (err, rowCount) => {
            if (err) {
                return reject(err.message);
            }
            connection.release();
        });

        if (sqlParams && sqlParams.length > 0) {
            sqlParams.map(param => {
                request.addParameter(param.name, param.type, param.value);
            });
        }

        _rows = [];

        // A row resulting from execution of the SQL statement.
        request.on('row', columns => {
            const item = {};
            for (let name in columns) {
                item[name.charAt(0).toLocaleLowerCase() + name.substr(1)] = columns[name].value;
            }
            _rows.push(item);
        });

        request.on('doneInProc', (rowCount, more, rows) => {
            if (_rows.length <= 0) reject('No records found')
            resolve(_rows);
        });

        request.on('error', (err) => {
            reject(err.message);
        });

        connection.callProcedure(request);
    })
});

const executeMultiQuery = (procName, sqlParams, callback) => new Promise((resolve, reject) => {

    pool.acquire((err, connection) => {
        request = new Request(procName, (err, rowCount) => {
            if (err) {
                return reject(err.message);
            }
            connection.release();
        });

        if (sqlParams && sqlParams.length > 0) {
            sqlParams.map(param => {
                request.addParameter(param.name, param.type, param.value);
            });
        }
        _rows = [];
        resultSet = 0;

        // A row resulting from execution of the SQL statement.
        request.on('row', (columns) => {
            const item = {};
            for (let name in columns) {
                item[name.charAt(0).toLocaleLowerCase() + name.substr(1)] = columns[name].value;
            }
            _rows.push(item);
        });

        request.on('doneInProc', (rowCount, more, rows) => {
            if (_rows.length <= 0) _rows.push('No records found');
            callback(_rows, resultSet);
            if (more == true) {
                resultSet++;
                _rows = [];
            }
        });

        request.on('error', (err) => {
            reject(err.message);
        });

        request.on('requestCompleted', () => { resolve() });

        connection.callProcedure(request);
    })
});

const buildParams = (params, name, type, value, isOutput = false) => {
    params.push({
        name,
        type,
        value,
        isOutput
    });
};

module.exports = {
    buildParams,
    executeQuery,
    executeMultiQuery,
    executeNonQuery,
    TYPES
};

