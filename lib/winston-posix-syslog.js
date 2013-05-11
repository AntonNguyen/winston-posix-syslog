var util = require('util')
  , winston = require('winston')
  , posix = require('posix')
  ;

var syslogLevels = {
  debug: 'debug',
  info: 'info',
  notice: 'notice',
  warning: 'warning',
  error: 'err',
  crit: 'crit',
  alert: 'alert',
  emerg: 'emerg',
};

var getMasks = function() {
  var masks = {};

  for (var level in syslogLevels) {
    var mask = syslogLevels[level];
    masks[mask] = true;
  }

  return masks;
}

var PosixSyslog = winston.transports.PosixSyslog = function (options) {
  this.name = 'posixSyslog';
  options = options || {};

  this.identity = options.identity || process.title;
  this.facility = options.facility || 'local0';

  this.openLogOptions = {
    cons: options.cons || true,
    ndelay: options.ndelay || true,
    pid: options.pid || true,
    nowait: options.nowait || true,
    odelay: options.odelay || false
  }
};

util.inherits(PosixSyslog, winston.Transport);

PosixSyslog.prototype.log = function (level, msg, meta, callback) {
  var self = this;

  // We ignore any incompatible levels
  if (level in syslogLevels) {
    posix.openlog(self.identity, self.openLogOptions, self.facility);
    posix.setlogmask(getMasks());
    posix.syslog(syslogLevels[level], msg);
    posix.closelog();
  }

  callback(null, true);
};

exports.PosixSyslog = PosixSyslog;