document.addEventListener('DOMContentLoaded', async () => {
    const carTableBody = document.querySelector('#car-table tbody');
    const searchBar = document.getElementById('search-bar');
    const searchButton = document.getElementById('search-button');

    async function fetchCars(query = '') {
        try {
            const response = await fetch(`/api/cars?search=${query}`);
            const cars = await response.json();
            carTableBody.innerHTML = '';
            cars.forEach(car => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><img src="${car.image}" alt="${car.marque} ${car.model}" width="100"></td>
                    <td>${car.marque}</td>
                    <td>${car.model}</td>
                    <td>$${car.price}</td>
                `;
                carTableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error fetching car data:', error);
        }
    }

    searchButton.addEventListener('click', () => {
        const query = searchBar.value;
        fetchCars(query);
    });

    // Fetch all cars on initial load
    fetchCars();
});