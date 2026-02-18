"use strict";
// Sample booked dates (YYYY-MM-DD)
const bookedDates = [
  "2024-08-10",
  "2024-08-11",
  "2024-08-12",
  "2024-08-24",
  "2024-08-25",
  "2024-08-26"
];

const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("monthYear");
const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");

let currentDate = new Date();
let selectedStart = null;
let selectedEnd = null;

function renderCalendar(date) {
  calendar.innerHTML = "";

  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startDay = firstDay.getDay();
  const totalDays = lastDay.getDate();

  monthYear.textContent = `${date.toLocaleString("default", { month: "long" })} ${year}`;

  // Add spacing before calendar
  const spacer = document.createElement("div");
  spacer.style.height = "40px";
  calendar.appendChild(spacer);

  // Add weekday headers
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  weekdays.forEach(day => {
    const weekday = document.createElement("div");
    weekday.classList.add("weekday");
    weekday.textContent = day;
    calendar.appendChild(weekday);
  });

  // Fill in blank cells
  for (let i = 0; i < startDay; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.classList.add("day", "unavailable");
    calendar.appendChild(emptyCell);
  }

  // Fill in actual days
  for (let d = 1; d <= totalDays; d++) {
    const day = document.createElement("div");
    day.classList.add("day");

    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    day.dataset.date = dateStr;

    if (bookedDates.includes(dateStr)) {
      day.classList.add("booked");
      day.title = "Booked";
    } else {
      day.classList.add("available");
      day.title = "Available";
      day.addEventListener("click", () => handleDateSelection(day, dateStr));
    }

    day.textContent = d;
    calendar.appendChild(day);
  }

  highlightSelectedRange();
}

function handleDateSelection(dayElement, dateStr) {
  if (!selectedStart || (selectedStart && selectedEnd)) {
    selectedStart = dateStr;
    selectedEnd = null;
  } else {
    if (new Date(dateStr) < new Date(selectedStart)) {
      selectedEnd = selectedStart;
      selectedStart = dateStr;
    } else {
      selectedEnd = dateStr;
    }
  }
  highlightSelectedRange();
  updateSelectedDateBox();
}

function highlightSelectedRange() {
  document.querySelectorAll(".day").forEach(day => {
    day.classList.remove("selected-start", "selected-end", "in-range");
    const date = day.dataset.date;
    if (!date) return;

    if (selectedStart === date) {
      day.classList.add("selected-start");
    }
    if (selectedEnd === date) {
      day.classList.add("selected-end");
    }
    if (selectedStart && selectedEnd && date > selectedStart && date < selectedEnd) {
      day.classList.add("in-range");
    }
  });
}

function formatDateForDisplay(dateStr) {
  const date = new Date(dateStr);
  const userLang = document.documentElement.lang || "en";
  return date.toLocaleDateString(userLang === "fr" ? "fr-FR" : "en-US", {

    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}

function updateSelectedDateBox() {
  const dateBox = document.getElementById("selected-dates");

  if (selectedStart && selectedEnd && dateBox) {
    dateBox.textContent = `Dates sélectionnées : du ${formatDateForDisplay(selectedStart)} au ${formatDateForDisplay(selectedEnd)}`;
  }
}

prevBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});

nextBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});

window.addEventListener("DOMContentLoaded", () => renderCalendar(currentDate));

const confirmBtn = document.getElementById("confirmDates");

if (confirmBtn) {
  confirmBtn.addEventListener("click", () => {
    if (selectedStart && selectedEnd) {
      localStorage.setItem("arrivalDate", selectedStart);
      localStorage.setItem("departureDate", selectedEnd);
      alert(userLang === "fr" ? "Vos dates ont été enregistrées !" : "Your dates have been saved!");
      
    } else {
      alert(userLang === "fr" ? "Veuillez sélectionner une date d'arrivée et une date de départ." : "Please select an arrival and departure date.");

    }
  });
}
