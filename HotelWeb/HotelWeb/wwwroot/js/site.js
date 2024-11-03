﻿function filterRooms() {
    const priceFilter = document.getElementById("price").value;
    const categoryFilter = document.getElementById("category").value;
    const bedsFilter = document.getElementById("beds").value;
    const balconyFilter = document.getElementById("balcony").value;
    const breakfastFilter = document.getElementById("breakfast").value;

    const rooms = Array.from(document.querySelectorAll(".room-card"));

    let filteredRooms = rooms.filter(room => {
        const roomPrice = parseInt(room.getAttribute("data-price"));
        const roomCategory = room.getAttribute("data-category");
        const roomBeds = room.getAttribute("data-beds");
        const roomBalcony = room.getAttribute("data-balcony");
        const roomBreakfast = room.getAttribute("data-breakfast");

        if (categoryFilter !== "all" && roomCategory !== categoryFilter) return false;
        if (bedsFilter !== "all" && roomBeds !== bedsFilter) return false;
        if (balconyFilter !== "all" && roomBalcony !== balconyFilter) return false;
        if (breakfastFilter !== "all" && roomBreakfast !== breakfastFilter) return false;

        return true;
    });

    // Якщо обрано сортування за ціною
    if (priceFilter === "ascending") {
        filteredRooms.sort((a, b) => parseInt(a.getAttribute("data-price")) - parseInt(b.getAttribute("data-price")));
    } else if (priceFilter === "descending") {
        filteredRooms.sort((a, b) => parseInt(b.getAttribute("data-price")) - parseInt(a.getAttribute("data-price")));
    } else {
        // Якщо обрано "Всі", повертаємо картки до початкового порядку за data-index
        filteredRooms.sort((a, b) => parseInt(a.getAttribute("data-index")) - parseInt(b.getAttribute("data-index")));
    }

    // Приховуємо всі картки
    rooms.forEach(room => room.style.display = "none");

    // Відображаємо відфільтровані та відсортовані картки
    filteredRooms.forEach(room => room.style.display = "flex");
}




// Функція для відкриття модального вікна
function openBookingModal(pricePerNight) {
    document.getElementById("bookingModal").style.display = "block";
    document.getElementById("bookingModal").setAttribute("data-price", pricePerNight);
    calculateTotal(); // Оновлюємо суму при відкритті модального вікна
}

// Функція для закриття модального вікна
function closeModal() {
    document.getElementById("bookingModal").style.display = "none";
}

// Функція для обробки форми бронювання
function submitBooking() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const middleName = document.getElementById("middleName").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    // Перевірка заповнення обов'язкових полів
    if (!firstName || !lastName || !phoneNumber || !startDate || !endDate) {
        alert("Будь ласка, заповніть усі обов'язкові поля!");
        return;
    }

    // Заміна вмісту модального вікна на повідомлення про успіх
    const modalContent = document.querySelector(".modal-content");
    modalContent.innerHTML = `
        <h2>Дякуємо за бронювання!</h2>
        <p>Менеджер передзвонить вам у найближчий час.</p>
        <button onclick="closeModal()">Закрити</button>
    `;
}

function calculateTotal() {
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const pricePerNight = parseInt(document.getElementById("bookingModal").getAttribute("data-price"), 10);
    const totalAmountElement = document.getElementById("totalAmount");

    if (startDate && endDate && pricePerNight) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Обчислюємо кількість днів між датами
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

        if (days > 0) {
            const total = days * pricePerNight;
            totalAmountElement.textContent = `Сума: ${total} грн`;
        } else {
            totalAmountElement.textContent = `Сума: 0 грн`;
        }
    } else {
        totalAmountElement.textContent = `Сума: 0 грн`;
    }
}