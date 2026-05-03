const flights = [
  { airline: "IndiGo", from: "Delhi", to: "Mumbai", departure: "08:00 AM", arrival: "10:15 AM", duration: "2h 15m", basePrice: 4500 },
  { airline: "Air India", from: "Delhi", to: "Mumbai", departure: "11:30 AM", arrival: "01:50 PM", duration: "2h 20m", basePrice: 4800 },
  { airline: "Vistara", from: "Delhi", to: "Mumbai", departure: "05:00 PM", arrival: "07:20 PM", duration: "2h 20m", basePrice: 5200 },
  { airline: "Akasa Air", from: "Delhi", to: "Mumbai", departure: "09:00 PM", arrival: "11:10 PM", duration: "2h 10m", basePrice: 4300 },

  { airline: "Air India", from: "Kolkata", to: "Bangalore", departure: "10:30 AM", arrival: "01:05 PM", duration: "2h 35m", basePrice: 5500 },
  { airline: "IndiGo", from: "Kolkata", to: "Bangalore", departure: "02:00 PM", arrival: "04:30 PM", duration: "2h 30m", basePrice: 5300 },
  { airline: "Vistara", from: "Kolkata", to: "Bangalore", departure: "07:30 PM", arrival: "10:00 PM", duration: "2h 30m", basePrice: 6000 },

  { airline: "Vistara", from: "Delhi", to: "Goa", departure: "06:00 PM", arrival: "08:30 PM", duration: "2h 30m", basePrice: 6200 },
  { airline: "IndiGo", from: "Delhi", to: "Goa", departure: "09:00 AM", arrival: "11:35 AM", duration: "2h 35m", basePrice: 5800 },

  { airline: "SpiceJet", from: "Chennai", to: "Hyderabad", departure: "01:00 PM", arrival: "02:25 PM", duration: "1h 25m", basePrice: 3200 },
  { airline: "IndiGo", from: "Chennai", to: "Hyderabad", departure: "06:00 PM", arrival: "07:25 PM", duration: "1h 25m", basePrice: 3500 },

  { airline: "Akasa Air", from: "Mumbai", to: "Delhi", departure: "09:15 PM", arrival: "11:30 PM", duration: "2h 15m", basePrice: 4800 },
  { airline: "Air India", from: "Mumbai", to: "Delhi", departure: "07:00 AM", arrival: "09:20 AM", duration: "2h 20m", basePrice: 5000 },

  { airline: "AirAsia", from: "Bangalore", to: "Kolkata", departure: "11:00 AM", arrival: "01:30 PM", duration: "2h 30m", basePrice: 5300 },
  { airline: "IndiGo", from: "Bangalore", to: "Kolkata", departure: "04:00 PM", arrival: "06:30 PM", duration: "2h 30m", basePrice: 5100 }
];

function getClassMultiplier(travelClass) {
  if (travelClass === "Business") return 1.5;
  if (travelClass === "First Class") return 2;
  return 1;
}

function searchFlights() {
  const fromInput = document.getElementById("from");
  const toInput = document.getElementById("to");
  const dateInput = document.getElementById("date");
  const travellersInput = document.getElementById("travellers");
  const classInput = document.getElementById("travelClass");
  const resultsDiv = document.getElementById("flightResults");

  if (!fromInput || !toInput || !dateInput || !travellersInput || !classInput || !resultsDiv) return;

  const from = fromInput.value.toLowerCase().trim();
  const to = toInput.value.toLowerCase().trim();
  const date = dateInput.value;
  const travellers = parseInt(travellersInput.value);
  const travelClass = classInput.value;

  resultsDiv.innerHTML = "";

  if (!date) {
    alert("Please select a travel date.");
    return;
  }

  const filteredFlights = flights.filter(flight =>
    flight.from.toLowerCase().includes(from) &&
    flight.to.toLowerCase().includes(to)
  );

  if (filteredFlights.length === 0) {
    resultsDiv.innerHTML = "<p>No flights found. Try another route.</p>";
    return;
  }

  filteredFlights.forEach(flight => {
    const finalPrice = Math.round(flight.basePrice * getClassMultiplier(travelClass) * travellers);

    const card = document.createElement("div");
    card.classList.add("flight-card");

    card.innerHTML = `
      <h3>${flight.airline}</h3>
      <p><strong>From:</strong> ${flight.from}</p>
      <p><strong>To:</strong> ${flight.to}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Departure:</strong> ${flight.departure}</p>
      <p><strong>Arrival:</strong> ${flight.arrival}</p>
      <p><strong>Duration:</strong> ${flight.duration}</p>
      <p><strong>Travellers:</strong> ${travellers}</p>
      <p><strong>Class:</strong> ${travelClass}</p>
      <p><strong>Total Price:</strong> ₹${finalPrice}</p>
      <button onclick="goToBooking('${flight.airline}', '${flight.from}', '${flight.to}', '${flight.departure}', '${flight.arrival}', '${flight.duration}', '${finalPrice}', '${date}', '${travellers}', '${travelClass}')">Book Now</button>
    `;

    resultsDiv.appendChild(card);
  });
}

function goToBooking(airline, from, to, departure, arrival, duration, price, date, travellers, travelClass) {
  localStorage.setItem("selectedFlight", JSON.stringify({
    airline, from, to, departure, arrival, duration, price, date, travellers, travelClass
  }));

  window.location.href = "booking.html";
}

function loadSelectedFlight() {
  const selectedFlightCard = document.getElementById("selectedFlightCard");
  const passengerForms = document.getElementById("passengerForms");
  const selectedFlight = JSON.parse(localStorage.getItem("selectedFlight"));

  if (!selectedFlightCard || !selectedFlight) return;

  selectedFlightCard.innerHTML = `
    <div class="flight-card">
      <h3>${selectedFlight.airline}</h3>
      <p><strong>From:</strong> ${selectedFlight.from}</p>
      <p><strong>To:</strong> ${selectedFlight.to}</p>
      <p><strong>Date:</strong> ${selectedFlight.date}</p>
      <p><strong>Departure:</strong> ${selectedFlight.departure}</p>
      <p><strong>Arrival:</strong> ${selectedFlight.arrival}</p>
      <p><strong>Duration:</strong> ${selectedFlight.duration}</p>
      <p><strong>Travellers:</strong> ${selectedFlight.travellers}</p>
      <p><strong>Class:</strong> ${selectedFlight.travelClass}</p>
      <p><strong>Total Price:</strong> ₹${selectedFlight.price}</p>
    </div>
  `;

  if (passengerForms) {
    passengerForms.innerHTML = "";
    for (let i = 1; i <= parseInt(selectedFlight.travellers); i++) {
      passengerForms.innerHTML += `
        <input type="text" id="passengerName${i}" placeholder="Passenger ${i} Name" />
        <input type="number" id="passengerAge${i}" placeholder="Passenger ${i} Age" />
      `;
    }
  }

  renderSeats();
}

function renderSeats() {
  const seatGrid = document.getElementById("seatGrid");
  if (!seatGrid) return;

  seatGrid.innerHTML = "";
  const seats = ["A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4", "C1", "C2", "C3", "C4"];

  seats.forEach(seat => {
    const seatBtn = document.createElement("div");
    seatBtn.classList.add("seat");
    seatBtn.innerText = seat;

    seatBtn.onclick = () => {
      document.querySelectorAll(".seat").forEach(s => s.classList.remove("selected"));
      seatBtn.classList.add("selected");
      document.getElementById("seatNo").value = seat;
    };

    seatGrid.appendChild(seatBtn);
  });
}

function confirmBooking() {
  const selectedFlight = JSON.parse(localStorage.getItem("selectedFlight"));
  const payment = document.getElementById("paymentMethod")?.value;
  const seat = document.getElementById("seatNo")?.value.trim();

  if (!selectedFlight) {
    alert("No flight selected.");
    return;
  }

  if (!payment || !seat) {
    alert("Please select seat and payment method.");
    return;
  }

  let passengers = [];
  for (let i = 1; i <= parseInt(selectedFlight.travellers); i++) {
    const name = document.getElementById(`passengerName${i}`)?.value.trim();
    const age = document.getElementById(`passengerAge${i}`)?.value.trim();

    if (!name || !age) {
      alert(`Please fill Passenger ${i} details.`);
      return;
    }

    passengers.push({ name, age });
  }

  const ticketNo = Math.floor(Math.random() * 90000) + 10000;

  const booking = {
    ticketNo,
    passengers,
    seat,
    payment,
    ...selectedFlight
  };

  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  bookings.push(booking);
  localStorage.setItem("bookings", JSON.stringify(bookings));
  localStorage.setItem("latestTicket", JSON.stringify(booking));

  window.location.href = "ticket.html";
}

function loadTicket() {
  const ticketCard = document.getElementById("ticketCard");
  const booking = JSON.parse(localStorage.getItem("latestTicket"));

  if (!ticketCard || !booking) return;

  let passengerHTML = booking.passengers.map((p, index) =>
    `<p><strong>Passenger ${index + 1}:</strong> ${p.name} (Age: ${p.age})</p>`
  ).join("");

  ticketCard.innerHTML = `
    <p><strong>Ticket No:</strong> ${booking.ticketNo}</p>
    ${passengerHTML}
    <p><strong>Airline:</strong> ${booking.airline}</p>
    <p><strong>Route:</strong> ${booking.from} → ${booking.to}</p>
    <p><strong>Travel Date:</strong> ${booking.date}</p>
    <p><strong>Departure Time:</strong> ${booking.departure}</p>
    <p><strong>Arrival Time:</strong> ${booking.arrival}</p>
    <p><strong>Duration:</strong> ${booking.duration}</p>
    <p><strong>Travellers:</strong> ${booking.travellers}</p>
    <p><strong>Class:</strong> ${booking.travelClass}</p>
    <p><strong>Seat No:</strong> ${booking.seat}</p>
    <p><strong>Payment Method:</strong> ${booking.payment}</p>
    <p><strong>Total Price:</strong> ₹${booking.price}</p>
    <p><strong>Status:</strong> CONFIRMED ✅</p>
  `;
}

function loadBookings() {
  const bookingsList = document.getElementById("myBookingsList");
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  if (!bookingsList) return;

  bookingsList.innerHTML = "";

  if (bookings.length === 0) {
    bookingsList.innerHTML = "<p>No bookings yet.</p>";
    return;
  }

  bookings.forEach(booking => {
    const passengerNames = booking.passengers.map(p => p.name).join(", ");

    const card = document.createElement("div");
    card.classList.add("flight-card");

    card.innerHTML = `
      <h3>${booking.airline}</h3>
      <p><strong>Ticket No:</strong> ${booking.ticketNo}</p>
      <p><strong>Passengers:</strong> ${passengerNames}</p>
      <p><strong>Route:</strong> ${booking.from} → ${booking.to}</p>
      <p><strong>Date:</strong> ${booking.date}</p>
      <p><strong>Departure:</strong> ${booking.departure}</p>
      <p><strong>Arrival:</strong> ${booking.arrival}</p>
      <p><strong>Class:</strong> ${booking.travelClass}</p>
      <p><strong>Status:</strong> CONFIRMED</p>
    `;

    bookingsList.appendChild(card);
  });
}

window.onload = function () {
  loadSelectedFlight();
  loadTicket();
  loadBookings();
};