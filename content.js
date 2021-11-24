/**
 * @author: Ramakrishna Kolipaka.
 *
 * content.js will access the DOM of ninerpantry website for getting the details
 * such as name of the student, date and time of the pantry visit and listens on the
 * button click event for sending SMS to the student.
 *
 */

// active link is for getting the pantry request day, nav-link active is-active class will hold the value.
var activeLink = document.getElementsByClassName("nav-link active is-active");
// user name is for getting the name of the student, toolbar-item-user id will hold the value.
var userName = document.getElementById("toolbar-item-user");
console.log(userName.textContent);
console.log(activeLink[0].textContent);

//TODO: Get the time from the drop down and store it in a variable
//TODO: add onclick function to listen on the submit form.

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
