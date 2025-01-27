document.addEventListener("DOMContentLoaded", () => {
  const carType = localStorage.getItem("carType");
  const rentalDays = localStorage.getItem("rentalDays");
  const startDate = localStorage.getItem("startDate");
  const location = localStorage.getItem("location");
  const additionalInfo = localStorage.getItem("additionalInfo");

  document.getElementById("car-type").textContent = carType;
  document.getElementById("rental-days").textContent = rentalDays;
  document.getElementById("start-date").textContent = startDate;
  document.getElementById("location").textContent = location;
  document.getElementById("additional-info").textContent = additionalInfo;
});
