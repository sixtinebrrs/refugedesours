"use strict";

// Handle the reservation form submission
document.getElementById('reservation-form').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent default form submission

  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const checkin = document.getElementById('checkin').value;
  const checkout = document.getElementById('checkout').value;
  const guests = document.getElementById('guests').value;

  // Basic form validation (you can expand this)
  if (!name || !email || !phone || !checkin || !checkout || !guests) {
    alert('Please fill in all fields.');
    return;
  }

  // Confirmation message
  const confirmationMsg = `Thank you, ${name}! Your reservation from ${checkin} to ${checkout} for ${guests} guests has been submitted. We will contact you shortly at ${email}.`;

  document.getElementById('confirmation').textContent = confirmationMsg;

  // Optionally, reset the form
  document.getElementById('reservation-form').reset();
});

function switchLanguage(select) {
  const lang = select.value;
  if (lang === 'en') {
    window.location.href = 'project-en.html'; // your English page file
  } else {
    window.location.href = 'project.html'; // your French page file
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  const langSelect = document.querySelector('.lang-select');
  if (!langSelect) return; // safety check

  if (path.includes('-en')) {
    langSelect.value = 'en';
  } else {
    langSelect.value = 'fr';
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const arrival = localStorage.getItem("arrivalDate");
  const departure = localStorage.getItem("departureDate");

  const checkin = document.getElementById("checkin");
  const checkout = document.getElementById("checkout");

  if (checkin && arrival) checkin.value = arrival;
  if (checkout && departure) checkout.value = departure;
});
