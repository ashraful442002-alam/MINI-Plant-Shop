const cities = [
  { name: "Dhaka", area: "Capital City" },
  { name: "Chittagong", area: "Port City" },
  { name: "Sylhet", area: "Tea Garden City" },
  { name: "Rajshahi", area: "Silk City" },
  { name: "Khulna", area: "Industrial City" },
  { name: "Comilla", area: "Historic City" },
  { name: "Mymensingh", area: "Education Hub" },
  { name: "Barishal", area: "River City" },
  { name: "Rangpur", area: "Northern City" },
  { name: "Narayanganj", area: "River Port" },
];

function showToast(msg) {
  const toast = document.getElementById("toast");

  toast.textContent = msg;
  toast.classList.remove("hidden");
  toast.style.opacity = "1";

  setTimeout(() => {
    toast.style.opacity = "0";

    setTimeout(() => {
      toast.classList.add("hidden");
    }, 300);

  }, 2200);
}

function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem("plantCart") || "[]");

  const total = cart.reduce((sum, item) => sum + item.qty, 0);

  const badge = document.getElementById("cart-badge");

  if (badge) {
    if (total > 0) {
      badge.textContent = total;
      badge.classList.remove("hidden");
    } else {
      badge.classList.add("hidden");
    }
  }
}

const addressInput = document.getElementById("address-input");
const cityDropdown = document.getElementById("city-dropdown");
const selectedLocDiv = document.getElementById("selected-location");
const selectedLocTxt = document.getElementById("selected-location-text");

function renderCities(list) {

  if (list.length === 0) {

    cityDropdown.innerHTML = `
      <p class="text-gray-400 text-sm p-4 text-center">
        No city found
      </p>
    `;

  } else {

    cityDropdown.innerHTML = list.map(c => `
      <div 
        class="city-item flex items-center gap-3 px-4 py-3 hover:bg-[#f0faf4] cursor-pointer border-b last:border-b-0 transition-colors"
        data-name="${c.name}"
      >

        <i class="fa-solid fa-location-dot text-[#285A43] w-4"></i>

        <div>
          <p class="font-semibold text-sm text-gray-800">${c.name}</p>
          <p class="text-xs text-gray-400">
            ${c.area}, Bangladesh
          </p>
        </div>

      </div>
    `).join("");
  }

  cityDropdown.classList.remove("hidden");
}

addressInput.addEventListener("focus", function () {
  renderCities(cities);
});

addressInput.addEventListener("input", function () {

  const q = this.value.trim().toLowerCase();

  if (!q) {
    renderCities(cities);
    return;
  }

  const filtered = cities.filter(c =>
    c.name.toLowerCase().includes(q)
  );

  renderCities(filtered);
});

cityDropdown.addEventListener("click", function (e) {

  const item = e.target.closest(".city-item");

  if (!item) return;

  const cityName = item.dataset.name;

  addressInput.value = cityName + ", Bangladesh";

  cityDropdown.classList.add("hidden");

  selectedLocTxt.textContent =
    Delivering to: ${cityName}, Bangladesh;

  selectedLocDiv.classList.remove("hidden");

  showToast("📍 Location Selected");
});

document.addEventListener("click", function (e) {

  if (
    !addressInput.contains(e.target) &&
    !cityDropdown.contains(e.target)
  ) {
    cityDropdown.classList.add("hidden");
  }
});

updateCartBadge();