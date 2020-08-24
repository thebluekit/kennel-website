const feedbackUrl = 'api/sendFeedback';

function loadFeedbackData(feedbackForm) {
    let feedbackData = new FormData(feedbackForm)

    let userData = {};
    for (let pair of feedbackData.entries()) {
        userData[pair[0]] = pair[1];
    }

    return userData;
}

function sendFeedbackData(userData) {
    var xhr = new XMLHttpRequest;
    xhr.open('POST', feedbackUrl, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            
        }
    }
    xhr.send(JSON.stringify(userData));
}

window.onload = function() {
    let feedbackForm = document.getElementById("feedback-form");
    feedbackForm.addEventListener('submit', event => {
        event.preventDefault();

        let userData = loadFeedbackData(feedbackForm);
        sendFeedbackData(userData);
      })
}