let startButton = document.getElementById('start');
let stopButton = document.getElementById('stop');
let statusLine = document.getElementById('status');

getStartedStatus(startedStatus => {
    if(startedStatus){
        startButton.hidden = true;
        statusLine.textContent = 'On'
    } else {
        stopButton.hidden = true;
        statusLine.textContent = 'Off'
    }

    
    
    startButton.onclick = function() {
        getStartedStatus((started) => {
            if(!started){
                setStartedStatus(true);
                startButton.hidden = true;
                stopButton.hidden = false;
                statusLine.textContent = 'On'
            }
        })
    }
    
    stopButton.onclick = function() {
        getStartedStatus((started) => {
            if(started){
                setStartedStatus(false);
                stopButton.hidden = true;
                startButton.hidden = false;
                statusLine.textContent = 'Off'
            }
        })
    }
});


function getStartedStatus(callback) {
    chrome.storage.sync.get(['started'], function(result) {
        callback(result.started);
    });
}

function setStartedStatus(value) {
    chrome.storage.sync.set({started: value}, function(result) {

    });
}