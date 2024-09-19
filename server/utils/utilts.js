const constants = require('./constants');

function isValidName(name) {
    return (constants.USER_FIRST_NAME_LAST_NAME_REGEX.test(name));
}
exports.isValidName = isValidName;

function isValidEmail(email) {
    return (constants.EMAIL_REGEX.test(email));
}
exports.isValidEmail = isValidEmail;

function isValidPassword(password) {
    return password.length >= 6;
}
exports.isValidPassword = isValidPassword;

function isEmpty(fields) {
    for (var field in fields) {
        if (fields[field] == 'undefined' || fields[field] == undefined || fields[field] == '') {
            return false;
        }
    }
    return true;
}
exports.isEmpty = isEmpty;

function isVallidPhoneNumber(phoneNumber) {
    return (constants.PHONE_NUMBER_REGEX.test(phoneNumber));
}
exports.isVallidPhoneNumber = isVallidPhoneNumber;