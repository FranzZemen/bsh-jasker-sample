##Sample bsh-jasker app

The sample is a contrived continuous execution.  In reality, REST calls, messaging or other asynchronous activity would trigger state changes.

## Input (inline)
        var stateEnum = {
            sample1: 'sample1',
            sample2: 'sample2',
            sample3: 'sample3',
            sample4: 'sample4',
            sample5: 'sample5'
        };
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
        }

## Output

    [2015-01-18T05:20:44.305Z]  INFO: jaskerSample/17060 on Enterprise: Successfully initialized jaskerMap
    [2015-01-18T05:20:44.306Z]  INFO: jaskerSample/17060 on Enterprise: Starting flow. Current state is sample1
    [2015-01-18T05:20:44.307Z]  INFO: jaskerSample/17060 on Enterprise: First "next", should be at sample2. Current state is sample2
    [2015-01-18T05:20:44.308Z]  INFO: jaskerSample/17060 on Enterprise: Second "next", should be at sample3. Current state is sample3
    [2015-01-18T05:20:44.308Z]  INFO: jaskerSample/17060 on Enterprise: Still at sample3. Current state is sample3
    [2015-01-18T05:20:44.308Z]  INFO: jaskerSample/17060 on Enterprise: Third "next" should output sample1 or sample4. Current state is sample1
    [2015-01-18T05:20:44.308Z]  INFO: jaskerSample/17060 on Enterprise: Third "next" should output sample1 or sample4. Current state is sample4
