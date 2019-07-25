let intervalInput = document.getElementById('intervalInput');
let setButton = document.getElementById('set');

getInterval(interval => {
    intervalInput.value = interval;
});

set.onclick = function() {
    setIntervall(intervalInput.value);
}


function getInterval(callback) {
    chrome.storage.sync.get(['interval'], function (result) {
        callback(result.interval);
    });
}

function setIntervall(interval) {
    chrome.storage.sync.set({interval: interval}, function (result) {
    });
}
