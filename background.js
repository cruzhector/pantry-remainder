const SID = "AC7cbc7d31f69775695224e3efded966a3";
const NUMBER = "+13605159110";
const BASE64 =
  "QUM3Y2JjN2QzMWY2OTc3NTY5NTIyNGUzZWZkZWQ5NjZhMzpjMDI5YTlkMDg0NWQ3OGJiNGEyYWNhOTZkNzU1YWQ5NQ==";

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  console.log("Received %o from %o, frame", msg, sender.tab, sender.frameId);
  // create form data
  var formData = {
    To: msg.phoneNumber,
    From: NUMBER,
    Body: msg.payload,
  };
  // call twilio API.
  sendSMS(getEncodedFormData(formData), sendResponse);
  return true;
});

/**
 * This function returns URI encoded form data from json object.
 *
 * @param {Array} formData .
 */
function getEncodedFormData(formData) {
  var formBody = [];
  for (var property in formData) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(formData[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  return formBody;
}

/**
 * This function uses textbelt api and sends SMS to the student.
 *
 * @param {Array} formBody URI encoded body.
 * @param {Function} sendResponse a callback function to content.js
 */
function sendSMS(formBody, sendResponse) {
  fetch(`https://api.twilio.com/2010-04-01/Accounts/${SID}/Messages.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      Authorization: `Basic ${BASE64}`,
    },
    body: formBody,
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      sendResponse(data);
    })
    .catch((e) => {
      console.log(e);
    });
}
