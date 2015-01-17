/**
 * Created by Franz on 1/17/2015.
 */

(function () {
    'use strict';

    var log = require('bunyan').createLogger({name: 'jaskerSample', level: 'debug'});
    var when = require('node-promise').when;
    var all = require('node-promise').all;
    var jasker = require('bsh-jasker');

    var jaskerMap = new jasker.JaskerMap();
    var jaskerInstance;

    var stateEnum = {
        sample1: 'sample1',
        sample2: 'sample2',
        sample3: 'sample3'
    };

    jaskerMap.initialize(
        {
            inline: {
                name: 'jaskerSample',
                states: {
                    sample1: {
                        next: stateEnum.sample2
                    },
                    sample2: {
                        next: stateEnum.sample3
                    },
                    sample3: {
                        next: stateEnum.sample1
                    }
                }
            }
        }).then(
        function (val) {
            log.info('Successfully initialized jaskerMap');

            var document = {
                field1: 'someValue'
            };
            jaskerInstance = new jasker.JaskerInstance(jaskerMap, stateEnum.sample1, document);
            logCurrentState('Starting flow');
            setTimeout(function () {
                start().then(function (val) {
                    log.info('Done!');
                }, function (err) {
                    log.error(err);
                });
            }, 500);

        }, function (err) {
            log.error(err);
        }
    );
    function start() {
        log.info('Starting to step');
        return when(jaskerInstance.next(), function () {
            logCurrentState('Stepped once');
            return when(jaskerInstance.next(), function () {
                logCurrentState('Stepped twice');
                return when(jaskerInstance.next(), function () {
                    logCurrentState('Stepped thrice');
                    log.info('Completed stepping');
                    setTimeout(function () {
                    }, 1000);
                });
            });
        });
    }

    function logCurrentState(prefix) {
        log.info(prefix + '. Current state is %s', jaskerInstance.current());
    }
})();
