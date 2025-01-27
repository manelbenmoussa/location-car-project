document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("search-form");

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const carType = document.getElementById("car-type").value;
    const rentalDays = document.getElementById("rental-days").value;
    const startDate = document.getElementById("start-date").value;
    const location = document.getElementById("location").value;
    const additionalInfo = document.getElementById("additional-info").value;

    // Store search data in localStorage (or you can use sessionStorage)
    localStorage.setItem("carType", carType);
    localStorage.setItem("rentalDays", rentalDays);
    localStorage.setItem("startDate", startDate);
    localStorage.setItem("location", location);
    localStorage.setItem("additionalInfo", additionalInfo);

    // Redirect to contrat page
    window.location.href = "contrat.html";
  });
});
