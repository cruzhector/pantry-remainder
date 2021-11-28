chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  console.log("Received %o from %o, frame", msg, sender.tab, sender.frameId);
  sendSMS(msg.phoneNumber, msg.payload);
  //sendSMS("+19803279970", msg.text);
  sendResponse("success");
});

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
