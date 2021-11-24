/**
 * @author: Ramakrishna Kolipaka.
 *
 * popup.js is attached to the layout of the extension. This file uses chrome storage
 * to store the phone number.
 *
 */

// onload function sets the phonenumber if the number is present in the storage.
window.addEventListener("load", setPhoneNumberOnLoad);

/**
 * Used in onload function which sets the phone number if it is present in the storage.
 */
function setPhoneNumberOnLoad() {
  chrome.storage.sync.get(["phoneNumber"], function (result) {
    if (result.phoneNumber) {
      document.getElementById("phnum").value = result.phoneNumber;
    }
  });
}

/**
 * This function is called when form is submitted. Stores the phone number in the chrome storage.
 * @param {any} event event handler.
 */
function onFormSubmit(event) {
  var phnNum = document.getElementById("phnum");
  chrome.storage.sync.set({ phoneNumber: phnNum.value }, function () {
    console.log("Value is set to " + phnNum);
  });
  event.preventDefault();
}

// onsubmit listener.
document.getElementById("form").addEventListener("submit", onFormSubmit);
