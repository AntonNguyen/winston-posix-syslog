var vows = require('vows')
  , assert = require('assert')
  , winston = require('winston')
  , helpers = require('winston/test/helpers')
  , transport = require('winston/test/transports/transport')
  , PosixSyslog = require('../lib/winston-posix-syslog').PosixSyslog
  ;

vows.describe('winston-posix-syslog').addBatch({
  "An instance of the PosixSyslog Transport": transport(PosixSyslog, {
    identity: 'test'
  })
}).export(module);