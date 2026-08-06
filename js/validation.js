/*==========================================================
                    VALIDATION.JS
        STEP 1 - MODULE SETUP & CONFIGURATION
==========================================================*/

/*
============================================================
                VALIDATION CONFIGURATION
============================================================
*/

const VALIDATION = {

    debug : true,

    mobileLength : 10,

    minimumIncome : 1,

    maximumImageSize : 5 * 1024 * 1024,

    supportedImageTypes : [

        "image/jpeg",

        "image/jpg",

        "image/png",

        "image/webp"

    ]

};



/*
============================================================
                VALIDATION STATE
============================================================
*/

const VALIDATION_STATE = {

    initialized : false,

    currentStepValid : false,

    completeFormValid : false

};



/*
============================================================
                ERROR MESSAGES
============================================================
*/

const VALIDATION_MESSAGES = {

    required :

        "This field is required.",

    name :

        "Only alphabets and spaces are allowed.",

    mobile :

        "Enter a valid 10-digit mobile number.",

    income :

        "Enter a valid annual income.",

    date :

        "Please select a valid date.",

    futureDate :

        "Future date is not allowed.",

    number :

        "Only numeric values are allowed.",

    photo :

        "Please upload a profile photo."

};



/*
============================================================
                INITIALIZATION
============================================================
*/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        initializeValidation();

    }

);



/*
============================================================
                INITIALIZE MODULE
============================================================
*/

function initializeValidation(){

    VALIDATION_STATE.initialized = true;

    validationLog(

        "Validation Module Initialized"

    );

}



/*
============================================================
                DEBUG LOGGER
============================================================
*/

function validationLog(

    message,

    data = ""

){

    if(!VALIDATION.debug){

        return;

    }

    console.group(

        "[Validation]"

    );

    console.log(

        message

    );

    if(data !== ""){

        console.log(

            data

        );

    }

    console.groupEnd();

}



/*
============================================================
                HELPER FUNCTIONS
============================================================
*/


/*
============================================================
                GET ELEMENT
============================================================
*/

function getField(id){

    return document.getElementById(id);

}



/*
============================================================
                GET VALUE
============================================================
*/

function getValue(id){

    const element = getField(id);

    if(!element){

        return "";

    }

    return element.value.trim();

}



/*
============================================================
                CHECK EMPTY
============================================================
*/

function isEmpty(value){

    return value.trim() === "";

}



/*
============================================================
                SHOW ALERT
============================================================
*/

function validationMessage(message){

    alert(message);

}



/*
============================================================
                EXPORT FUNCTIONS
============================================================
*/

window.getValue = getValue;

window.getField = getField;

window.isEmpty = isEmpty;




/*==========================================================
        STEP 2 - COMMON VALIDATION FUNCTIONS
==========================================================*/

/*
============================================================
                VALIDATE NAME
============================================================
*/

function isValidName(value){

    const pattern = /^[A-Za-z ]+$/;

    return pattern.test(value.trim());

}




/*
============================================================
                VALIDATE ANNUAL INCOME
============================================================
*/

function isValidIncome(value){

    if(value.trim() === ""){

        return false;

    }

    const income = Number(value);

    return !isNaN(income) && income > 0;

}



/*
============================================================
                VALIDATE NUMERIC VALUE
============================================================
*/

function isValidNumber(value){

    const pattern = /^[0-9]+$/;

    return pattern.test(value.trim());

}



/*
============================================================
                VALIDATE DATE
============================================================
*/

function isValidDate(value){

    if(value.trim() === ""){

        return false;

    }

    const selectedDate = new Date(value);

    const today = new Date();

    today.setHours(0,0,0,0);

    return selectedDate <= today;

}



/*
============================================================
                VALIDATE HEIGHT
============================================================
*/

function isValidHeight(value){

    return value.trim() !== "";

}

/*
============================================================
            VALIDATE MAX LENGTH
============================================================
*/

function isValidLength(value, maxLength){

    return value.trim().length <= maxLength;

}


/*
============================================================
                VALIDATE PHOTO
============================================================
*/

function isValidPhoto(){

    return (

        biodata.photos &&

        biodata.photos.profilePhoto

    );

}



/*
============================================================
                VALIDATE IMAGE TYPE
============================================================
*/

function isValidImageType(file){

    if(!file){

        return false;

    }

    return VALIDATION.supportedImageTypes.includes(

        file.type

    );

}



/*
============================================================
                VALIDATE IMAGE SIZE
============================================================
*/

function isValidImageSize(file){

    if(!file){

        return false;

    }

    return file.size <= VALIDATION.maximumImageSize;

}



/*
============================================================
                VALIDATE REQUIRED FIELD
============================================================
*/

function isRequired(id){

    return !isEmpty(

        getValue(id)

    );

}



/*
============================================================
                EXPORT FUNCTIONS
============================================================
*/

window.isValidName = isValidName;

window.isValidIncome = isValidIncome;

window.isValidNumber = isValidNumber;

window.isValidDate = isValidDate;

window.isValidHeight = isValidHeight;

window.isValidPhoto = isValidPhoto;

window.isRequired = isRequired;









function initializeCharacterCounter(id, maxLength, type = "characters"){

    const field = document.getElementById(id);

    const counter = document.getElementById(id + "Counter");

    if(!field || !counter){

        return;

    }

    function updateCounter(){

        const remaining = maxLength - field.value.length;

        counter.textContent = remaining + " " + type + " remaining";

        if(remaining <= 10){

            counter.classList.remove("text-muted");

            counter.classList.add("text-danger");

        }
        else{

            counter.classList.remove("text-danger");

            counter.classList.add("text-muted");

        }

    }

    field.addEventListener("input", updateCounter);

    updateCounter();

}







/*==========================================================
            STEP 3 - ERROR DISPLAY FUNCTIONS
==========================================================*/

/*
============================================================
                SHOW ERROR
============================================================
*/


function showError(id, message){

    const field = getField(id);

    if(!field){
        return;
    }

    console.log("showError", id, message);

    field.classList.remove("is-valid");
    field.classList.add("is-invalid");

    let error = field.parentElement.querySelector(".invalid-feedback");

    if(!error){

        error = document.createElement("div");

        error.className = "invalid-feedback";

        field.insertAdjacentElement("afterend", error);

    }

    error.textContent = message;
}

/*
============================================================
                SHOW SUCCESS
============================================================
*/



function showSuccess(id){

    const field = getField(id);

    if(!field){

        return;

    }

    field.classList.remove("is-invalid");

    field.classList.add("is-valid");

    const error = field.parentElement.querySelector(".invalid-feedback");

    if(error){

        error.remove();

    }

}




/*
============================================================
                CLEAR ERROR
============================================================
*/



function clearError(id){

    const field = getField(id);

    if(!field){

        return;

    }

    field.classList.remove("is-invalid");

    field.classList.remove("is-valid");

    const error = field.parentElement.querySelector(".invalid-feedback");

    if(error){

        error.remove();

    }

}




/*
============================================================
                CLEAR ALL ERRORS
============================================================
*/

function clearAllErrors(){

    const fields = document.querySelectorAll(

        "input, select, textarea"

    );

    fields.forEach(field => {

        field.classList.remove("is-invalid");

        field.classList.remove("is-valid");

        const error = field.nextElementSibling;

        if(

            error &&

            error.classList.contains("invalid-feedback")

        ){

            error.remove();

        }

    });

}



/*
============================================================
                EXPORT FUNCTIONS
============================================================
*/

window.showError = showError;

window.showSuccess = showSuccess;

window.clearError = clearError;

window.clearAllErrors = clearAllErrors;








/*==========================================================
            STEP 4 - PERSONAL DETAILS VALIDATION
==========================================================*/

/*
============================================================
            VALIDATE PERSONAL DETAILS
============================================================
*/

function validatePersonal(){

    let valid = true;

    /*
    ============================================================
                    FULL NAME
    ============================================================
    */

    const fullName = getValue("fullName");

    if(isEmpty(fullName)){

        showError(
            "fullName",
            "Full Name is required."
        );

        valid = false;

    }

    else if(!isValidName(fullName)){

        showError(
            "fullName",
            "Only alphabets and spaces are allowed."
        );

        valid = false;

    }

    else{

        showSuccess("fullName");

    }



    /*
    ============================================================
                    DATE OF BIRTH
    ============================================================
    */

    const dob = getValue("dob");

    if(isEmpty(dob)){

        showError(
            "dob",
            "Date of Birth is required."
        );

        valid = false;

    }

    else if(!isValidDate(dob)){

        showError(
            "dob",
            "Future date is not allowed."
        );

        valid = false;

    }

    else{

        showSuccess("dob");

    }



    /*
    ============================================================
                    TIME OF BIRTH
    ============================================================
    */

    if(!isRequired("birthHour")){

        showError(
            "birthHour",
            "Hour is required."
        );

        valid = false;

    }

    else{

        showSuccess("birthHour");

    }



    if(!isRequired("birthMinute")){

        showError(
            "birthMinute",
            "Minute is required."
        );

        valid = false;

    }

    else{

        showSuccess("birthMinute");

    }



    if(!isRequired("birthPeriod")){

        showError(
            "birthPeriod",
            "Please select AM/PM."
        );

        valid = false;

    }

    else{

        showSuccess("birthPeriod");

    }



    /*
    ============================================================
                    PLACE OF BIRTH
    ============================================================
    */

    if(!isRequired("placeOfBirth")){

        showError(
            "placeOfBirth",
            "Place of Birth is required."
        );

        valid = false;

    }

    else{

        showSuccess("placeOfBirth");

    }





    if(!isRequired("religion")){

        showError("religion","Religion is required.");

        valid = false;

    }else{

        showSuccess("religion");

    }

    if(!isRequired("gotra")){

        showError("gotra","Gotra is required.");

        valid = false;

    }else{

        showSuccess("gotra");

    }

    if(!isRequired("rashi")){

        showError("rashi","Rashi is required.");

        valid = false;

    }else{

        showSuccess("rashi");

    }

    if(!isRequired("gan")){

        showError("gan","Gan is required.");

        valid = false;

    }else{

        showSuccess("gan");

    }



    /*
    ============================================================
                    HEIGHT
    ============================================================
    */

    if(!isRequired("height")){

        showError(
            "height",
            "Height is required."
        );

        valid = false;

    }

    else{

        showSuccess("height");

    }



    /*
    ============================================================
                    COMPLEXION
    ============================================================
    */

    if(!isRequired("complexion")){

        showError(
            "complexion",
            "Complexion is required."
        );

        valid = false;

    }

    else{

        showSuccess("complexion");

    }



    /*
    ============================================================
                    MARITAL STATUS
    ============================================================
    */

    if(!isRequired("maritalStatus")){

        showError(
            "maritalStatus",
            "Marital Status is required."
        );

        valid = false;

    }

    else{

        showSuccess("maritalStatus");

    }



    /*
    ============================================================
                    CASTE
    ============================================================
    */

    if(!isRequired("caste")){

        showError(
            "caste",
            "Caste is required."
        );

        valid = false;

    }

    else{

        showSuccess("caste");

    }



    /*
    ============================================================
                    SUB CASTE
    ============================================================
    */

    if(!isRequired("subCaste")){

        showError(
            "subCaste",
            "Sub Caste is required."
        );

        valid = false;

    }

    else{

        showSuccess("subCaste");

    }



    /*
    ============================================================
                    MANGLIK
    ============================================================
    */

    if(!isRequired("manglik")){

        showError(
            "manglik",
            "Manglik is required."
        );

        valid = false;

    }

    else{

        showSuccess("manglik");

    }



    /*
    ============================================================
                        LANGUAGE
    ============================================================
    */

    if(!isRequired("language")){

        showError(
            "language",
            "Language is required."
        );

        valid = false;

    }

    else{

        showSuccess("language");

    }



    /*
    ============================================================
                    DIET
    ============================================================
    */

    if(!isRequired("diet")){

        showError(
            "diet",
            "Diet is required."
        );

        valid = false;

    }

    else{

        showSuccess("diet");

    }



    /*
    ============================================================
                    HOBBIES
    ============================================================
    */

    clearError("hobbies");



    /*
    ============================================================
                    OTHER
    ============================================================
    */

    clearError("other");



    return valid;

}



/*
============================================================
                EXPORT FUNCTION
============================================================
*/

window.validatePersonal = validatePersonal;






/*==========================================================
            STEP 5 - EDUCATION DETAILS VALIDATION
==========================================================*/

/*
============================================================
            VALIDATE EDUCATION DETAILS
============================================================
*/

function validateEducation(){

    let valid = true;

    /*
    ============================================================
                HIGHEST QUALIFICATION
    ============================================================
    */

    if(!isRequired("highestQualification")){

        showError(
            "highestQualification",
            "Highest Qualification is required."
        );

        valid = false;

    }

    else{

        showSuccess("highestQualification");

    }



    /*
    ============================================================
                COLLEGE / UNIVERSITY
    ============================================================
    */

    if(!isRequired("college")){

        showError(
            "college",
            "College / University is required."
        );

        valid = false;

    }

    else{

        showSuccess("college");

    }



    /*
    ============================================================
                10th Board
    ============================================================
    */

    if(!isRequired("Board10th")){

        showError(
            "Board10th",
            "Board is required."
        );

        valid = false;

    }

    else{

        showSuccess("Board10th");

    }

    /*
    ============================================================
                12th Board
    ============================================================
    */

    if(!isRequired("Board12th")){

        showError(
            "Board12th",
            "Board is required."
        );

        valid = false;

    }

    else{

        showSuccess("Board12th");

    }


    clearError("specialSkill");

    clearError("educationOther");


    /*
    ============================================================
                OCCUPATION DETAILS
    ============================================================
    */



    return valid;

}



/*
============================================================
                EXPORT FUNCTION
============================================================
*/

window.validateEducation = validateEducation;




/*==========================================================
            STEP 6 - FAMILY DETAILS VALIDATION
==========================================================*/

/*
============================================================
            VALIDATE FAMILY DETAILS
============================================================
*/

function validateFamily(){

    let valid = true;

    /*
    ============================================================
                    FATHER'S NAME
    ============================================================
    */

    const fatherName = getValue("fatherName");

    if(isEmpty(fatherName)){

        showError(
            "fatherName",
            "Father's Name is required."
        );

        valid = false;

    }

    else if(!isValidName(fatherName)){

        showError(
            "fatherName",
            "Only alphabets and spaces are allowed."
        );

        valid = false;

    }

    else{

        showSuccess("fatherName");

    }



    /*
    ============================================================
                    FATHER'S OCCUPATION
    ============================================================
    */

    if(!isRequired("fatherOccupation")){

        showError(
            "fatherOccupation",
            "Father's Occupation is required."
        );

        valid = false;

    }

    else{

        showSuccess("fatherOccupation");

    }



    /*
    ============================================================
                    MOTHER'S NAME
    ============================================================
    */

    const motherName = getValue("motherName");

    if(isEmpty(motherName)){

        showError(
            "motherName",
            "Mother's Name is required."
        );

        valid = false;

    }

    else if(!isValidName(motherName)){

        showError(
            "motherName",
            "Only alphabets and spaces are allowed."
        );

        valid = false;

    }

    else{

        showSuccess("motherName");

    }



    /*
    ============================================================
                    MOTHER'S OCCUPATION
    ============================================================
    */

    if(!isRequired("motherOccupation")){

        showError(
            "motherOccupation",
            "Mother's Occupation is required."
        );

        valid = false;

    }

    else{

        showSuccess("motherOccupation");

    }



    /*
    ============================================================
                    SIBLINGS DETAILS
    ============================================================
    */

    if(!isRequired("siblingsDetails")){

        showError(
            "siblingsDetails",
            "Siblings Details is required."
        );

        valid = false;

    }

    else{

        showSuccess("siblingsDetails");

    }


    /*
    ============================================================
                    FAMILY DETAILS
    ============================================================
    */



    return valid;

}



/*
============================================================
                EXPORT FUNCTION
============================================================
*/

window.validateFamily = validateFamily;










/*==========================================================
            STEP 6 - WORK & CAREER VALIDATION
==========================================================*/

/*
============================================================
            VALIDATE WORK & CAREER
============================================================
*/

function validateWork(){

    let valid = true;

    /*
    ============================================================
                    PROFESSION
    ============================================================
    */

    if(!isRequired("profession")){

        showError(
            "profession",
            "Profession is required."
        );

        valid = false;

    }

    else{

        showSuccess("profession");

    }


    /*
    ============================================================
                    ORGANIZATION
    ============================================================
    */

    if(!isRequired("organization")){

        showError(
            "organization",
            "Organization is required."
        );

        valid = false;

    }

    else{

        showSuccess("organization");

    }


    /*
    ============================================================
                    WORK PLACE
    ============================================================
    */

    if(!isRequired("workPlace")){

        showError(
            "workPlace",
            "Work Place is required."
        );

        valid = false;

    }

    else{

        showSuccess("workPlace");

    }


    /*
    ============================================================
                    INCOME
    ============================================================
    */

    if(!isRequired("income")){

        showError(
            "income",
            "Income is required."
        );

        valid = false;

    }

    else{

        showSuccess("income");

    }

    return valid;

}


/*
============================================================
                EXPORT FUNCTION
============================================================
*/

window.validateWork = validateWork;







/*==========================================================
            STEP 7 - PARTNER PREFERENCE VALIDATION
==========================================================*/

/*
============================================================
            VALIDATE PARTNER PREFERENCE
============================================================
*/

function validatePartner(){

    let valid = true;

    /*
    ============================================================
                    PREFERRED PROFESSION
    ============================================================
    */

    clearError("preferredProfession");

    clearError("preferredQualification");



    /*
    ============================================================
                    PREFERRED LOCATION
    ============================================================
    */

    if(!isRequired("preferredLocation")){

        showError(
            "preferredLocation",
            "Preferred Location is required."
        );

        valid = false;

    }

    else{

        showSuccess("preferredLocation");

    }



    /*
    ============================================================
                    OTHER
    ============================================================
    */

    const otherExpectations = getValue("otherExpectations");

    if(otherExpectations !== ""){

        if(!isValidLength(otherExpectations, 28)){

            showError(
                "otherExpectations",
                "Other expectations cannot exceed 28 characters."
            );

            valid = false;

        }

        else{

            showSuccess("otherExpectations");

        }

    }

    else{

        clearError("otherExpectations");

    }



    return valid;

}



/*
============================================================
                EXPORT FUNCTION
============================================================
*/

window.validatePartner = validatePartner;




/*==========================================================
            STEP 8 - CONTACT DETAILS VALIDATION
==========================================================*/

/*
============================================================
            VALIDATE CONTACT DETAILS
============================================================
*/

function validateContact(){

    let valid = true;

    /*
    ============================================================
                    MOBILE NUMBER
    ============================================================
    */

    const mobile = getValue("mobileNumber");

    if(isEmpty(mobile)){

        showError(
            "mobileNumber",
            "Mobile Number is required."
        );

        valid = false;

    }

    else if(mobile.length > 20){

        showError(
            "mobileNumber",
            "Mobile Number cannot exceed 20 characters."
        );

        valid = false;

    }

    else{

        showSuccess("mobileNumber");

    }



    /*
    ============================================================
                    RELATION
    ============================================================
    */

    if(!isRequired("relation")){

        showError(
            "relation",
            "Relation is required."
        );

        valid = false;

    }

    else{

        showSuccess("relation");

    }



    // Current Address
    if(!isRequired("currentAddress")){

        showError(
            "currentAddress",
            "Current Address is required."
        );

        valid = false;

    }
    else{

        showSuccess("currentAddress");

    }


    // Permanent Address
    if(!isRequired("permanentAddress")){

        showError(
            "permanentAddress",
            "Permanent Address is required."
        );

        valid = false;

    }
    else{

        showSuccess("permanentAddress");

    }



    return valid;

}



/*
============================================================
                EXPORT FUNCTION
============================================================
*/

window.validateContact = validateContact;







/*==========================================================
            STEP 9 - PHOTO VALIDATION
==========================================================*/

/*
============================================================
                VALIDATE PHOTO
============================================================
*/

function validatePhoto(){

    let valid = true;

    /*
    ============================================================
                    PROFILE PHOTO
    ============================================================
    */

    if(!biodata.photos.profilePhoto){

        showError(
            "profilePhotoUpload",
            "Please upload a profile photo."
        );

        valid = false;

    }
    else{
        showSuccess("profilePhotoUpload");
    }

    return valid;

}



/*
============================================================
                EXPORT FUNCTION
============================================================
*/

window.validatePhoto = validatePhoto;








/*==========================================================
            STEP 11 - CURRENT STEP VALIDATION
==========================================================*/

/*
============================================================
            VALIDATE CURRENT STEP
============================================================
*/

function validateCurrentStep(step){

    switch(step){

        case 1:

            return validatePersonal();

        case 2:

            return validateEducation();

        case 3:
            return validateWork();

        case 4:
            return validateFamily();

        case 5:
            return validatePartner();

        case 6:
            return validateContact();

        case 7:
            return validatePhoto();

        case 8:
            return true;

        default:

            return true;

    }

}



/*
============================================================
                EXPORT FUNCTION
============================================================
*/

window.validateCurrentStep = validateCurrentStep;








/*==========================================================
            STEP 12 - COMPLETE FORM VALIDATION
==========================================================*/

/*
============================================================
            VALIDATE COMPLETE FORM
============================================================
*/

function validateCompleteForm(){

    clearAllErrors();

    let valid = true;

    if(!validatePersonal()){

        valid = false;

    }

    if(!validateEducation()){

        valid = false;

    }

    if(!validateWork()){

        valid = false;

    }

    if(!validateFamily()){

        valid = false;

    }

    if(!validatePartner()){

        valid = false;

    }

    if(!validateContact()){

        valid = false;

    }

    if(!validatePhoto()){

        valid = false;

    }

    if(!valid){

        validationMessage(

            "Please complete all required fields before generating the PDF."

        );

    }

    return valid;

}



/*
============================================================
                EXPORT FUNCTION
============================================================
*/

window.validateCompleteForm = validateCompleteForm;










/*==========================================================
            STEP 13 - LIVE VALIDATION
==========================================================*/

/*
============================================================
            ATTACH LIVE VALIDATION
============================================================
*/

function initializeLiveValidation(){

    /*
    ============================================================
                    ALL INPUT FIELDS
    ============================================================
    */

    const fields = document.querySelectorAll(

        "input, select, textarea"

    );



    fields.forEach(field => {

        /*
        ========================================================
                        KEYUP
        ========================================================
        */

        field.addEventListener(

            "keyup",

            validateField

        );



        /*
        ========================================================
                        CHANGE
        ========================================================
        */

        field.addEventListener(

            "change",

            validateField

        );



        /*
        ========================================================
                        BLUR
        ========================================================
        */

        field.addEventListener(

            "blur",

            validateField

        );

    });

}



/*
============================================================
            VALIDATE SINGLE FIELD
============================================================
*/

function validateField(event){

    const id = event.target.id;

    switch(id){

        /*==========================
                PERSONAL
        ==========================*/

        case "fullName":

        case "dob":

        case "birthHour":

        case "birthMinute":

        case "birthPeriod":

        case "placeOfBirth":

        case "religion":

        case "gotra":

        case "rashi":

        case "gan":

        case "height":

        case "complexion":

        case "maritalStatus":

        case "caste":

        case "subCaste":

        case "manglik":

        case "language":

        case "diet":

        case "hobbies":

        case "other":

            validatePersonal();

            break;



        /*==========================
                EDUCATION
        ==========================*/

        case "highestQualification":

        case "college":

        case "Board10th":

        case "Board12th":

        case "specialSkill":

        case "educationOther":

            validateEducation();

            break;

        /*==========================
                WORK
        ==========================*/

        case "profession":

        case "organization":

        case "workPlace":

        case "income":

            validateWork();

            break;



        /*==========================
                FAMILY
        ==========================*/

        case "fatherName":

        case "fatherOccupation":

        case "motherName":

        case "motherOccupation":

        case "siblingsDetails":

            validateFamily();

            break;



        /*==========================
                PARTNER
        ==========================*/

        case "preferredQualification":

        case "preferredProfession":

        case "preferredLocation":

        case "otherExpectations":

            validatePartner();

            break;



        /*==========================
                CONTACT
        ==========================*/

        case "mobileNumber":

        case "relation":

        case "currentAddress":

        case "permanentAddress":

            validateContact();

            break;



        /*==========================
                PHOTO
        ==========================*/

        case "profilePhotoUpload":

            validatePhoto();

            break;

    }

}



/*
============================================================
            INITIALIZE LIVE VALIDATION
============================================================
*/


document.addEventListener(

    "DOMContentLoaded",

    function(){

        initializeLiveValidation();

        // Personal Details
        initializeCharacterCounter("fullName", 20);
        initializeCharacterCounter("placeOfBirth", 20);
        initializeCharacterCounter("religion", 20);
        initializeCharacterCounter("gotra", 20);
        initializeCharacterCounter("rashi", 20);
        initializeCharacterCounter("gan", 20);
        initializeCharacterCounter("height", 20);
        initializeCharacterCounter("complexion", 20);
        initializeCharacterCounter("caste", 20);
        initializeCharacterCounter("subCaste", 20);
        initializeCharacterCounter("language", 20);
        initializeCharacterCounter("hobbies", 20);
        initializeCharacterCounter("other", 40);


        initializeCharacterCounter("relation", 20);

        // Education
        initializeCharacterCounter("highestQualification", 20);
        initializeCharacterCounter("college", 20);
        initializeCharacterCounter("Board10th", 20);
        initializeCharacterCounter("Board12th", 20);
        initializeCharacterCounter("specialSkill", 20);
        initializeCharacterCounter("educationOther", 20);

        // Work & Career
        initializeCharacterCounter("profession", 20);
        initializeCharacterCounter("organization", 20);
        initializeCharacterCounter("workPlace", 20);
        initializeCharacterCounter("income", 20);



        // Family
        initializeCharacterCounter("fatherName", 20);
        initializeCharacterCounter("fatherOccupation", 20);
        initializeCharacterCounter("motherName", 20);
        initializeCharacterCounter("motherOccupation", 20);
        initializeCharacterCounter("siblingsDetails", 40);

        // Partner Preference
        initializeCharacterCounter("preferredQualification", 20);
        initializeCharacterCounter("preferredProfession", 20);
        initializeCharacterCounter("preferredLocation", 20);
        initializeCharacterCounter("otherExpectations", 20);

        // Address Details
        initializeCharacterCounter("currentAddress", 75);
        initializeCharacterCounter("permanentAddress", 75);

    }

);



