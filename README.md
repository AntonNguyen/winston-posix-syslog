# winston-posix-syslog

A Syslog transport for [winston][0] using posix.

## Installation

### Installing winston-syslog

``` bash
  $ npm install winston
  $ npm install winston-posix-syslog
```

## Motivation
The [winston-syslog](https://github.com/indexzero/winston-syslog) transport is amazing, but it only capable of communicating with syslog using udp or tcp. I needed something in my environment that uses the C bindings.


## Usage
To use the PosixSyslog transport in [winston][0], you simply need to require it and then either add it to an existing [winston][0] logger or pass an instance to a new [winston][0] logger:

``` js
  var winston = require('winston');
  var PosixSyslog = require('winston-posix-syslog').PosixSyslog;

  winston.add(PosixSyslog, options);

  winston.log('info', 'I AM the one who knocks.');
```

The PosixSyslog transport takes the following options:

* __identity:__ The name of the application (Default: `process.title`).
* __facility:__ Syslog facility to use (Default: `local0`).
* __cons:__ Write directly to system console if there is an error while sending to system logger (Default: `true`).
* __ndelay:__ Open the connection immediately (Default: `true`).
* __pid:__ Include PID with each message (Default: `true`).
* __nowait:__ Don't wait for child processes that may have been created while logging the message (Default: `true`).
* __odelay:__ Opening of the connection is delayed until syslog() is called (Default: `false`).


## Log Levels
Because syslog only allows a subset of the levels available in [winston][0], levels that do not match will be ignored. Therefore, in order to use `winston-posix-syslog` effectively, you should indicate to [winston][0] that you want to use the syslog levels:

``` js
  var winston = require('winston');
  winston.setLevels(winston.config.syslog.levels);
```

The `PosixSyslog` transport will only log to the level that are available in the syslog protocol. These are (in increasing order of severity):

* debug
* info
* notice
* warn
* error
* crit
* alert

[0]: https://github.com/indexzero/winston