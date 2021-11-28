/**
 * @author: Ramakrishna Kolipaka.
 *
 * content.js will access the DOM of ninerpantry website for getting the details
 * such as name of the student, date and time of the pantry visit and listens on the
 * button click event for sending SMS to the student.
 *
 */

var phoneNumber = "";
// activelink is for getting the pantry request day, nav-link active is-active class will hold the value.
var activeLink = document.getElementsByClassName("nav-link active is-active");
// username is for getting the name of the student, toolbar-item-user id will hold the value.
var userName = document.getElementById("toolbar-item-user");
//timerange holds the time the student choose.
var timeRange = document.getElementsByClassName(
  "choices__item choices__item--selectable"
); //TODO: should change the ID.
//formSubmit holds the pantry form element.
var formSubmit = document.getElementById("edit-submit"); //TODO: should change the ID.
var errorLabel = document.getElementsByClassName(
  "alert alert-dismissible fade show col-12 alert-danger"
);
console.log(errorLabel.length);
console.log(userName.textContent);
console.log(activeLink[0].textContent);
console.log(timeRange[0].textContent);

/**
 * This function gets the phone number from chrome storage.
 */
function getPhoneNumber() {
  chrome.storage.sync.get(["phoneNumber"], function (result) {
    if (result.phoneNumber) {
      phoneNumber = result.phoneNumber;
    }
  });
}

/**
 * This function formats the final message which has to be sent to the student.
 *
 * @returns formatted message.
 */
function preparePayload(userName, day, timeRange) {
  return (
    "Hello " +
    userName +
    " your " +
    day +
    " is scheduled for " +
    timeRange +
    " please be on time. Thank you."
  );
}

// listens on pantry form submit and sends message to the student phone number.
formSubmit.onclick = function () {
  console.log("Rama clicked");
  var payload = preparePayload(
    userName.textContent,
    activeLink[0].textContent,
    timeRange[0].textContent.split("[")[0]
  );
  var ipcMessage = {
    phoneNumber: phoneNumber,
    payload: payload,
  };
  console.log(ipcMessage);
  // if (errorLabel.length == 0) {
  // }
  chrome.runtime.sendMessage(ipcMessage, function (response) {
    console.log("Response: ", response);
  });
};
