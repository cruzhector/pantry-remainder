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
var timeRange = document.getElementById("time"); //TODO: should change the ID.
//formSubmit holds the pantry form element.
var formSubmit = document.getElementById("submit"); //TODO: should change the ID.

console.log(userName.textContent);
console.log(activeLink[0].textContent);
console.log(timeRange.textContent);

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
function preparePayload() {
  return (
    "Hello " +
    userName +
    "your " +
    activeLink +
    " is scheduled for " +
    timeRange +
    "please be on time. Thank you."
  );
}

/**
 * This function uses textbelt api and sends SMS to the student.
 *
 * @param {String} phnNum Recievers phone number.
 * @param {String} message Content of the message.
 */
function sendSMS(phnNum, message) {
  fetch("https://textbelt.com/text", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone: phnNum,
      message: message,
      key: "textbelt",
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((e) => {
      console.log(e);
    });
}

// listens on pantry form submit and sends message to the student phone number.
formSubmit.onclick = function () {
  sendSMS(phoneNumber, preparePayload());
};
