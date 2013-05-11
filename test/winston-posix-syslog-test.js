var path = require('path')
  , vows = require('vows')
  , assert = require('assert')
  , winston = require('winston')
  , helpers = require('winston/test/helpers')
  , PosixSyslog = require('../lib/winston-posix-syslog').PosixSyslog
  , npmTransport = new (PosixSyslog)()
  , posixSyslogTransport = new (PosixSyslog)({ levels: winston.config.syslog.levels })
  ;

var assertPosixSyslog = function(transport) {
  assert.instanceOf(transport, PosixSyslog);
  assert.isFunction(transport.log);
};

vows.describe('winston-posix-syslog').addBatch({
  "Instantiation of the PosixSyslog Transport": {
    "With no options should not fail": function() {
      winston.add(PosixSyslog);
    }
  },
  "An instance of the PosixSyslog Transport": {
    "with npm levels": {
      "should have the proper methods defined": function () {
        assertPosixSyslog(npmTransport);
      },
      "the log() method": helpers.testNpmLevels(npmTransport, "should respond with true", function (ign, err, logged) {
        assert.isNull(err);
        assert.isTrue(logged);
      })
    },
    "with syslog levels": {
      "should have the proper methods defined": function () {
        assertPosixSyslog(posixSyslogTransport);
      },
      "the log() method": helpers.testSyslogLevels(posixSyslogTransport, "should respond with true", function (ign, err, logged) {
        assert.isNull(err);
        assert.isTrue(logged);
      })
    }
  }
}).export(module);