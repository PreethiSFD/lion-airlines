// validate given date.  Format is mm/dd/yyyy
function dateIsValid(dateStr) {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;

  if (dateStr.match(regex) === null) {
    return false;
  }

  const [month, day, year] = dateStr.split('/');

  // 👇️ format Date string as `yyyy-mm-dd`
  const isoFormattedStr = `${year}-${month}-${day}`;
  const date = new Date(isoFormattedStr);
  const timestamp = date.getTime();

  if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
    return false;
  }

  return date.toISOString().startsWith(isoFormattedStr);
}


// validate the given email address is in correct format
function validEmail(emailAdr) {
  const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  return filter.test(emailAdr);
}

// function to validate age.  Must be a number and 1 to 99 inclusively
function validAge(age) {

  let errorFree = true;

  if (isNaN(age) || age < 1 || age > 100) {
    errorFree = false;
  }
  return errorFree;
}

function validName(name) {
  let errorFree = true;

  if (name.length < 6 && name !== "") {
    errorFree = false;
  }

  return errorFree;
}

function validCCExpiry(dateStr) {

  let errorFree = true;
  const regex = /^\d{2}\/\d{2}$/;

  if (dateStr.match(regex) === null) {
    return false;
  }

  const [monthStr, yearStr] = dateStr.split('/');
  const month = Number(monthStr);
  const year = Number(yearStr);

  if (month < 1 || month > 12) {
    errorFree = false;
  }

  if (year < 0 || year > 99) {
    errorFree = false;
  }

  return errorFree;
}


function validCCV(num) {
  let errorFree = true;

  if (isNaN(num) || num < 1 || num > 1000) {
    errorFree = false;
  }
  return errorFree;
}

// validate the whole form
function validateForm() {
    const departure_date = document.getElementById("departure-date");
    const return_date = document.getElementById("return-date");
    const contact_email = document.getElementById("contact-email");
    const contact_phone = document.getElementById("contact-phone");
    const age_p1 = document.getElementById("age-p1");
    const age_p2 = document.getElementById("age-p2");
    const age_p3 = document.getElementById("age-p3");
    const name_p1 = document.getElementById("passenger-1")
    const name_p2 = document.getElementById("passenger-2");
    const name_p3 = document.getElementById("passenger-3");
    const cc_expdate = document.getElementById("cc-expdate");
    const cc_cvv = document.getElementById("cc-cvv");
    const return_trip = document.querySelector('input[name="tripstyle"]:checked').value;

    if (!dateIsValid(departure_date.value)) {
      alert("Invalid departure date");
      departure_date.focus();
      return false;
    }
    
    if (!dateIsValid(return_date.value) && return_trip === "roundtrip") {
      alert("Invalid return date");
      return_date.focus();
      return false;  
    }
    
    if (!validEmail(contact_email.value)) {
      alert("Invalid email address");
      contact_email.focus();
      return false;
    }
    
    if (isNaN(contact_phone.value)) {
      alert("Phone number has non-numeric character");
      contact_phone.focus();
      return false;  
    }
    
    if (!validAge(age_p1.value)) {
      alert("Passenger 1's age must be between 1 to 99");
      age_p1.focus();
      return false;
    }
    
    if (!validAge(age_p2.value) && age_p2.value !== "") {
      alert("Passenger 2's age must be between 1 to 99");
      age_p2.focus();
      return false;
    }
    
    if (!validAge(age_p3.value) && age_p3.value !== "") {
      alert("Passenger 3's age must be between 1 to 99");
      age_p3.focus();
      return false;
    }

    if (!validName(name_p1.value)) {
      alert("Passenger 1's name must be longer than 5 characters")
      name_p1.focus();
      return false;
    }

    if (!validName(name_p2.value)) {
      alert("Passenger 2's name must be longer than 5 characters")
      name_p2.focus();
      return false;
    }

    if (!validName(name_p3.value)) {
      alert("Passenger 3's name must be longer than 5 characters")
      name_p3.focus();
      return false;
    }
    
    if (!validCCExpiry(cc_expdate.value)) {
      alert("Invalid credit card expiry date.  Must be mm/yy.");
      cc_expdate.focus();
      return false;
    }

    if (!validCCV(cc_cvv.value)) {
      alert("CCV must be from 1 to 999");
      cc_cvv.focus();
      return false;
    }

    return true;
}

function submitForm() {
  if (validateForm() === true) {
    alert('Form submitted successfully!')
  }
}
