chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({ intervalInSeconds: '10' }, function () {
        console.log("Interval was set by Tab Switcher to 10 seconds.");
    });

    chrome.storage.sync.set({ started: false }, function () {
        console.log("Started was set to false.");
    });

    chrome.storage.sync.set({ interval: 10 }, function () {
        console.log("Timer was set to 10 seconds.");
    });
});

let index = 0;
let interval;

setInterval(() => {
    getInterval((interval2) => {
        getStartedStatus((status) => {

            // Get the status, if it is on, keep going. Else, clear the interval
            if (status) {

                // Check if it is already running, if so continue...
                if (interval) {

                    // if it is not running,  start it.
                } else {
                    interval = setInterval(() => {

                        //Get the tabs all the time, so no error can occur.
                        chrome.tabs.query({}, (tabs) => {
                            if(tabs[index]){
                                chrome.tabs.update(tabs[index].id, { active: true });
                                if (tabs.length > index) {
                                    index++;
                                } else {
                                    index = 0;
                                }
                            } else {
                                index = 0;
                            }
                        })
                    }, interval2 * 1000);
                }

            } else {
                clearInterval(interval);
                interval = undefined;
            }

        });
    });

}, 1000);

function getStartedStatus(callback) {
    chrome.storage.sync.get(['started'], function (result) {
        callback(result.started);
    });
}

function setStartedStatus(value) {
    chrome.storage.sync.set({ started: value }, function (result) {

    });
}

function getInterval(callback) {
    chrome.storage.sync.get(['interval'], function (result) {
        callback(result.interval);
    });
}

