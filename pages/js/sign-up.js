const validate = () => {
    let email = document.forms['validator']['email'].value;
    let password = document.forms['validator']['password'].value;
    let confirm = document.forms['validator']['confirmPassword'].value;

    // let email = document.getElementsByName('email');
    // let password = document.getElementsByName('password');
    // let confirm = document.getElementsByName('confirmPassword');
    let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    let result = password.match(format);

    if (!email.includes('gmail') && !email.includes('yahoo')) {
        alert('Email must be from gmail or yahoo!');
        return false;
    }
    if ((password.length < 2 || password.length > 10)) {
        alert('password not valid: must contain special characters and the required length!');
        return false;
    }
    if (!result) {
        alert(`password must contain one of this symbols: ${format}`);
        return false;
    }
    if (password != confirm) {
        alert('password dont match!');
        return false;
    }
    return true;

}