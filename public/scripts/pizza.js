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

    //Validate method: pickup or delivery
    let methodSelected = false;
    let methodButtons = document.getElementsByName("method");
    for(let i = 0; i < methodButtons.length; i++) {
        if(methodButtons[i].checked) {
            methodSelected = true;
        }
    }

    if(!methodSelected) {
        document.getElementById("err-method").style.display = "block";
        isValid = false;
    }

    //Validate pizza size
    let sizeValue = document.getElementById("size").value;
    if(sizeValue == "none") {
        document.getElementById("err-size").style.display = "block"
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
