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
        sample3: 'sample3',
        sample4: 'sample4',
        sample5: 'sample5'
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
                        next: [stateEnum.sample1, stateEnum.sample4]
                    },
                    sample4: {
                        next: stateEnum.sample5
                    },
                    sample5: {}
                }
            }
        }).then(
        function (val) {
            log.info('Successfully initialized jaskerMap');

            var document = {
                field1: 'someValue'
            };
            // Pretend a rest call ended up requiring the state to move forward.
            // We create a jasker instance from some document.
            jaskerInstance = new jasker.JaskerInstance(jaskerMap, stateEnum.sample1, document);
            logCurrentState('Starting flow', jaskerInstance);

            // Another contrived call comes in wants to move the state forward 2 states
            when(jaskerInstance.next(),
                function (result) {
                    logCurrentState('First "next", should be at sample2', result);
                    return when(jaskerInstance.next(),
                        function (result) {
                            logCurrentState('Second "next", should be at sample3', result);
                            return result;
                        },
                        function (err) {
                            log.error(err)
                        });
                },
                function (err) {
                    log.error(err);
                }
            ).then(
                function (result) {
                    logCurrentState('Still at sample3', result);
                    // At this point result is still just a jaskerInstance
                    // Now a contrived call wants to move the state forward, which results in a split
                    result.next().then(function (result) {
                        logCurrentState('Third "next" should output sample1 or sample4',result);
                    }, function (err) {
                        log.error(err);
                    });
                },
                function (err) {
                }
            );
        }, function (err) {
            log.error(err);
        }
    );


    function logCurrentState(prefix, result) {
        var instances = result instanceof Array ? result : [result];
        instances.forEach(function (instance) {
            log.info(prefix + '. Current state is %s', instance.current());
        });
    }
})();
