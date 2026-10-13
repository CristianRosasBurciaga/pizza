document.getElementById("pizza-form").onsubmit = () => {

    let isValid = true;
    //clear all errors
    clearErrors();

    //Validate firstname
    let fname = document.getElementById("fname").value.trim();
    if(fname === "") {
        document.getElementById("err-fname").style.display = "block";
        isValid = false;
    }

    //Validate lastname
    let lname = document.getElementById("lname").value.trim();
    if(lname === "") {
        document.getElementById("err-lname").style.display = "block";
        isValid = false;
    }

    //do not submit the form if the data is in-valid
    return isValid
};

function clearErrors() {
    let errors = document.getElementsByClassName("err");
    for(let i = 0; i < errors.length; i++) {
        errors[i].style.display = "none";
    }
}
