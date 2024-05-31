//SAMOCHODY

const cars = [
  { brand: "Toyota", model: "Corolla", year: 2018, price: 25000, image: "img/toyota_corolla.jpg", mileage: 40000, horsepower: 132 },
  { brand: "Honda", model: "Civic", year: 2020, price: 28000, image: "img/honda_civic.jpg", mileage: 20000, horsepower: 158 },
  { brand: "Ford", model: "Focus", year: 2019, price: 22000, image: "img/ford_focus.jpg", mileage: 35000, horsepower: 123 },
  { brand: "Tesla", model: "Model S", year: 2021, price: 70000, image: "img/tesla_model_s.jpg", mileage: 5000, horsepower: 670 },
  { brand: "BMW", model: "3 Series", year: 2017, price: 30000, image: "img/bmw_3_series.jpg", mileage: 25000, horsepower: 248 },
  { brand: "Audi", model: "A4", year: 2019, price: 35000, image: "img/audi_a4.jpg", mileage: 18000, horsepower: 248 },
  { brand: "Mercedes-Benz", model: "C-Class", year: 2020, price: 40000, image: "img/mercedes_c_class.jpg", mileage: 15000, horsepower: 255 },
  { brand: "Volkswagen", model: "Golf", year: 2018, price: 18000, image: "img/vw_golf.jpg", mileage: 30000, horsepower: 147 },
  { brand: "Subaru", model: "Impreza", year: 2020, price: 26000, image: "img/subaru_impreza.jpg", mileage: 15000, horsepower: 152 },
  { brand: "Mazda", model: "CX-5", year: 2019, price: 27000, image: "img/mazda_cx5.jpg", mileage: 22000, horsepower: 187 },
  { brand: "Hyundai", model: "Elantra", year: 2020, price: 24000, image: "img/hyundai_elantra.jpg", mileage: 17000, horsepower: 147 },
  { brand: "Chevrolet", model: "Camaro", year: 2018, price: 35000, image: "img/chevrolet_camaro.jpg", mileage: 21000, horsepower: 455 },
  { brand: "Lexus", model: "RX", year: 2019, price: 42000, image: "img/lexus_rx.jpg", mileage: 19000, horsepower: 290 }
];

// Funkcja wyświetlająca samochody
function displayCars(carsToDisplay) {
  const carList = document.getElementById('car-list');
  const header = document.getElementById('header'); 
  carList.innerHTML = ''; 

  carsToDisplay.forEach(car => {
    const carDiv = document.createElement('div');
    carDiv.classList.add('car');

    const carImage = document.createElement('img');
    carImage.src = car.image;
    carDiv.appendChild(carImage);

    const carDetails = document.createElement('div');
    carDetails.classList.add('car-details');
    carDetails.innerHTML = `
      <p>Marka: ${car.brand}</p>
      <p>Model: ${car.model}</p>
      <p>Rok: ${car.year}</p>
      <p>Cena: $${car.price}</p>
      <p>Przebieg: ${car.mileage} km</p>
      <p>Moc: ${car.horsepower} KM</p>
    `;
    carDiv.appendChild(carDetails);

    carDiv.addEventListener("click", () => {
      carList.style.display = "none";
      header.style.display = "none"; // Ukrycie nagłówka
      document.getElementById("purchaseForm").style.display = "block";
      selectedCar = car;
      selectedAccessories = [];
      updateOrderSummary(null, selectedAccessories);
    });

    carList.appendChild(carDiv);
  });
}

// Funkcja wyszukująca samochody po marce
function searchCarsByBrand() {
  const selectedOptions = Array.from(document.getElementById("brandSelect").selectedOptions);
  const selectedBrands = selectedOptions.map(option => option.value);
  localStorage.setItem("SelectedBrands", selectedBrands);

  if (selectedBrands.includes('all')) {
    displayCars(cars);
  } else {
    const filteredCars = cars.filter(car => selectedBrands.includes(car.brand));
    displayCars(filteredCars);
  }
}

// Wywołanie funkcji wyszukującej samochody po marce przy kliknięciu przycisku "Filtruj"
document.getElementById("filterButton").addEventListener("click", searchCarsByBrand);

//AKCESORIA

const accessories = [
  { id: 1, name: "Dywaniki gumowe", price: 50 },
  { id: 2, name: "System nawigacji GPS", price: 300 },
  { id: 3, name: "Kamery cofania", price: 200 },
  { id: 4, name: "Oświetlenie LED", price: 150 },
  { id: 5, name: "Ładowarka domowa do samochodów elektrycznych", price: 500 },
  { id: 6, name: "Fotele z podgrzewaniem i chłodzeniem", price: 700 },
  { id: 7, name: "Sportowe koła 18\"", price: 800 },
  { id: 8, name: "System audio premium", price: 600 },
  { id: 9, name: "Dach panoramiczny", price: 1000 },
  { id: 10, name: "Asystent parkowania", price: 400 },
  { id: 11, name: "Wycieraczki przeciwdeszczowe", price: 80 },
  { id: 12, name: "Przenośna lodówka samochodowa", price: 150 },
  { id: 13, name: "Bagażnik dachowy", price: 250 },
  { id: 14, name: "Osłony przeciwsłoneczne", price: 30 },
  { id: 15, name: "System alarmowy", price: 300 },
  { id: 16, name: "Bluetooth zestaw głośnomówiący", price: 100 },
  { id: 17, name: "Siatka bagażowa", price: 40 },
  { id: 18, name: "Osłona przeciwsłoneczna", price: 25 },
  { id: 19, name: "Nakładki na pedały sportowe", price: 70 },
  { id: 20, name: "Podgrzewane lusterka boczne", price: 150 },
];

// Deklaracja zmiennych przechowujących wybrany samochód i akcesoria
let selectedCar;
let selectedAccessories = [];

// Kod obsługujący formularz
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("purchaseForm");
  const confirmation = document.getElementById("confirmation");
  const carList = document.getElementById("car-list");
  const header = document.getElementById('header'); // Pobranie elementu nagłówka
  const returnButton = document.getElementById("returnButton");
  const errorMessageContainer = document.createElement("div");
  errorMessageContainer.classList.add("error-message");
  form.insertAdjacentElement('afterbegin', errorMessageContainer);

  init();
  function init() {
 
    // Wywołanie funkcji wyświetlającej wszystkie samochody
    const options = Array.from(document.getElementById("brandSelect").options);
    let storageSecetedBrand = localStorage.getItem("SelectedBrands"); 
    
    if (storageSecetedBrand != null) {
      let storageSelectedBrandArray = storageSecetedBrand.split(",");
        Array.from(options).map((option) => {
          for (let arrayItem of storageSelectedBrandArray) {
            if (option.value === arrayItem ) {
             option.selected = true;
            }
          }
          
      });
      searchCarsByBrand();
    }
// Sprawdzenie, czy aktualnie wyświetlany jest formularz zakupu
const isPurchaseFormDisplayed = document.getElementById('purchaseForm').style.display === 'block';

// Ustawionej flagi na true
if (isPurchaseFormDisplayed && !sessionStorage.getItem('enteredPurchaseForm')) {
  sessionStorage.setItem('enteredPurchaseForm', 'true');
}

// Obsługa zdarzenia przed odświeżeniem strony
window.addEventListener('beforeunload', (event) => {
  const isPurchaseFormDisplayed = document.getElementById('purchaseForm').style.display === 'block';

  // Zablokowanie odświeżenie strony w formularzu
  if (isPurchaseFormDisplayed) {
    event.preventDefault();
    event.returnValue = '';
  }
});

  }

  // Funkcja ustawiająca datę dostawy
  function setDeliveryDateConstraints() {
    const deliveryDateInput = document.getElementById("deliveryDate");
    const today = new Date();
    const minDeliveryDate = new Date();
    const maxDeliveryDate = new Date();

    minDeliveryDate.setDate(today.getDate() + 14);
    maxDeliveryDate.setDate(today.getDate() + 104);

    deliveryDateInput.min = minDeliveryDate.toISOString().split('T')[0];
    deliveryDateInput.max = maxDeliveryDate.toISOString().split('T')[0];
  }

  // Funkcja walidująca, czy wybrana data nie jest niedzielą
  function validateDeliveryDate() {
    const deliveryDateInput = document.getElementById("deliveryDate");
    const selectedDate = new Date(deliveryDateInput.value);

    if (selectedDate.getDay() === 0) {
      errorMessageContainer.textContent = "Proszę wybrać datę inną niż niedziela.";
      errorMessageContainer.style.display = "block"; // Wyświetl komunikat o błędzie
      return false;
    } else {
      errorMessageContainer.style.display = "none"; // Ukryj komunikat o błędzie
      return true;
    }
  }

// Funkcja generująca listę akcesoriów w formularzu
function generateAccessoriesList() {
  const accessoriesContainer = document.querySelector('.accessories-list');

  accessories.forEach(accessory => {
    const accessoryDiv = document.createElement('div');
    accessoryDiv.classList.add('accessory');

    // Dodanie nazwy akcesoria
    const accessoryLabel = document.createElement('label');
    accessoryLabel.textContent = `${accessory.id}. ${accessory.name} - Cena: $${accessory.price}`;
    accessoryDiv.appendChild(accessoryLabel);

    // Przycisk dodawania
    const addButton = document.createElement('button');
    addButton.textContent = 'Dodaj';
    addButton.addEventListener('click', (event) => {
      event.preventDefault(); // Zapobiega wysłaniu formularza gdy wciśnie sie dodaj
      const existingAccessory = selectedAccessories.find(acc => acc.id === accessory.id);
      if (existingAccessory) {
        existingAccessory.quantity += 1;
      } else {
        selectedAccessories.push({ ...accessory, quantity: 1 });
      }
      updateOrderSummary(selectedCar, selectedAccessories);
    });
    accessoryDiv.appendChild(addButton);

     // Przycisk odejmowania (usuń)
     const removeButton = document.createElement('button');
     removeButton.textContent = 'Usuń';
     removeButton.addEventListener('click', (event) => {
       event.preventDefault(); // Zapobiega wysłaniu formularza gdy wcisnie sie usuń
       const existingAccessoryIndex = selectedAccessories.findIndex(acc => acc.id === accessory.id);
       if (existingAccessoryIndex !== -1) {
         selectedAccessories[existingAccessoryIndex].quantity -= 1;
         if (selectedAccessories[existingAccessoryIndex].quantity === 0) {
           selectedAccessories.splice(existingAccessoryIndex, 1);
         }
         updateOrderSummary(selectedCar, selectedAccessories);
       }
     });
accessoryDiv.appendChild(removeButton);

    accessoriesContainer.appendChild(accessoryDiv);
  });
}

// Wywołanie funkcji generującej listę akcesoriów
generateAccessoriesList();

  // Funkcja aktualizująca widok podsumowania zamówienia
  function updateOrderSummary(car, accessories) {
    const summaryContainer = document.getElementById("order-summary");
    const summaryContent = document.getElementById("summary-content");

    // Usunięcie istniejących dzieci kontenera podsumowania
    while (summaryContent.firstChild) {
      summaryContent.removeChild(summaryContent.firstChild);
    }

    if (accessories.length > 0) {
      const accessoriesList = document.createElement("ul");
      accessoriesList.textContent = "Wybrane akcesoria:";
      accessories.forEach(accessory => {
        const item = document.createElement("li");
        item.textContent = `${accessory.id}: ${accessory.name} - $${accessory.price} x ${accessory.quantity}`;
        accessoriesList.appendChild(item);
      });
      summaryContent.appendChild(accessoriesList);

      // Dodanie informacji o cenie całkowitej akcesoriów
      const totalAccessoriesPrice = accessories.reduce((total, acc) => total + (acc.price * acc.quantity), 0);
      const accessoriesPriceInfo = document.createElement("p");
      accessoriesPriceInfo.textContent = `Cena akcesoriów: $${totalAccessoriesPrice}`;
      summaryContent.appendChild(accessoriesPriceInfo);
    }

    // Dodanie informacji o cenie całkowitej
    const totalPrice = document.createElement("p");
    const totalAccessoriesPrice = accessories.reduce((total, acc) => total + (acc.price * acc.quantity), 0);
    const totalPriceWithAccessories = car.price + totalAccessoriesPrice;
    totalPrice.textContent = `Cena całkowita: $${totalPriceWithAccessories}`;
    summaryContent.appendChild(totalPrice);

    // Wyświetlenie podsumowania
    summaryContainer.style.display = "block";
  }
  // Obsługa formularza
form.addEventListener("submit", (event) => {
  event.preventDefault();

 
  const selectedFinancing = form.financing.value;
  const fullName = document.getElementById("name").value;
  const selectedDeliveryDate = document.getElementById("deliveryDate").value;

  // Walidacja formularza
  if (selectedFinancing && fullName && fullName.split(" ").length === 2 && selectedDeliveryDate && validateDeliveryDate()) {

    localStorage.setItem('formSubmitted', 'true');
    localStorage.setItem('selectedFinancing', selectedFinancing);
    localStorage.setItem('fullName', fullName);
    localStorage.setItem('selectedDeliveryDate', selectedDeliveryDate);

    // wyświetlenie potwierdzenia
    confirmation.style.display = "block";
   
    document.getElementById("paymentMethod").textContent = selectedFinancing;
    document.getElementById("carImage").src = selectedCar.image;
    const totalAccessoriesPrice = selectedAccessories.reduce((total, acc) => total + (acc.price * acc.quantity), 0);
    const totalPriceWithAccessories = selectedCar.price + totalAccessoriesPrice;
    document.getElementById("totalPrice").textContent = `Cena całkowita: $${totalPriceWithAccessories}`;
    form.reset();
    setTimeout(() => {
      window.scrollTo(0, 0); 
      confirmation.style.display = "none";
      carList.style.display = "flex"; 
      carList.style.flexWrap = "wrap"; 
      form.style.display = "none";
      header.style.display = "block"; // Przywrócenie nagłówka
    }, 120000); // Ukryj potwierdzenie po 120 sekundach
    errorMessageContainer.style.display = "none"; // Ukryj komunikat o błędzie po poprawnym wypełnieniu formularza
    document.getElementById("errorMessage").textContent = "";
  } else {
    document.getElementById("errorMessage").textContent = "Błąd Proszę uzupełnić pola wymagane";
    // Formularz jest niekompletny, wyświetlenie komunikatu o błędzie
    errorMessageContainer.textContent = "Proszę wypełnić wszystkie pola.";
    errorMessageContainer.style.display = "block"; // Wyświetl komunikat o błędzie
  }
});

// Obsługa przycisku "Powrót do wyboru"
returnButton.addEventListener("click", () => {
  carList.style.display = "flex"; 
  carList.style.flexWrap = "wrap"; 
  form.style.display = "none";
  header.style.display = "block"; // Przywrócenie nagłówka
  confirmation.style.display = "none";
  
  // Wyczyszczenie danych w podsumowaniu
  updateOrderSummary(null, []); 
});

// Obsługa przycisku "Zakup"
document.getElementById("purchaseForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const deliveryDateInput = document.getElementById("deliveryDate");
  const selectedDate = new Date(deliveryDateInput.value);

  // Sprawdzenie, czy wybrana data dostawy jest niedzielą (0 to niedziela)
  if (selectedDate.getDay() === 0) {
    errorMessageContainer.textContent = "Niestety, dostawa w niedzielę nie jest możliwa. Proszę wybrać inną datę.";
    errorMessageContainer.style.display = "block"; 
  } else {
    errorMessageContainer.style.display = "none"; 

    // Wyświetlenie potwierdzenia zakupu
    document.getElementById("confirmation").style.display = "block";
    document.getElementById("car-list").style.display = "none";
    document.getElementById("header").style.display = "none";
    document.getElementById("purchaseForm").style.display = "none";
  }
});

  // Ustawienie minimalnej i maksymalnej daty dostawy po załadowaniu strony
  setDeliveryDateConstraints();

  // Dodanie walidacji daty dostawy przy każdej zmianie wartości
  document.getElementById("deliveryDate").addEventListener("change", validateDeliveryDate);
});