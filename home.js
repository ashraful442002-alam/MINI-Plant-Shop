const plants = [
  { id: 1, name: "Snake Plant", price: 12.00, img: "asset/snakplant.jpg", desc: "Air-purifying indoor plant, very easy to care for." },
  { id: 2, name: "Aloe Vera", price: 8.00, img: "asset/alovera.jpg", desc: "Medicinal succulent, great for skin and easy to grow." },
  { id: 3, name: "Jude Plant", price: 15.00, img: "asset/judeplant.jpg", desc: "Beautiful ornamental plant with lush green leaves." },
  { id: 4, name: "Lily Plant", price: 10.00, img: "asset/lily.jpg", desc: "Elegant flowering plant, perfect for indoors." },
  { id: 5, name: "Spider Plant", price: 9.00, img: "asset/spider.jpg", desc: "Low-maintenance plant, great for hanging baskets." },
  { id: 6, name: "Monstera Plant", price: 20.00, img: "asset/monstera.jpeg", desc: "Iconic tropical plant with stunning split leaves." },
];

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.remove("hidden");
  toast.style.opacity = "1";

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.classList.add("hidden"), 300);
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

const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

searchInput.addEventListener("input", function () {
  const query = this.value.trim().toLowerCase();

  if (!query) {
    searchResults.innerHTML = "";
    searchResults.classList.add("hidden");
    return;
  }

  const filtered = plants.filter(p =>
    p.name.toLowerCase().includes(query)
  );

  if (filtered.length === 0) {
    searchResults.innerHTML = `
      <p class="text-gray-400 text-sm p-4 text-center">
        No plants found for "<strong>${query}</strong>"
      </p>`;
  } else {
    searchResults.innerHTML = filtered.map(p => `
      <div class="flex items-center gap-4 p-3 hover:bg-[#f0faf4] cursor-pointer border-b last:border-b-0 transition-colors">
        <img 
          src="${p.img}" 
          alt="${p.name}"
          class="w-14 h-14 object-cover rounded-xl flex-shrink-0"
          onerror="this.src='https://placehold.co/56x56/B4E0A0/285A43?text=🌿'"
        />

        <div class="flex-1 min-w-0">
          <h3 class="font-semibold text-sm text-gray-800">${p.name}</h3>
          <p class="text-xs text-gray-400 truncate">${p.desc}</p>
        </div>

        <span class="text-[#285A43] font-bold text-sm flex-shrink-0">
          $${p.price.toFixed(2)}
        </span>
      </div>
    `).join("");
  }

  searchResults.classList.remove("hidden");
});

document.addEventListener("click", function (e) {
  if (
    !searchInput.contains(e.target) &&
    !searchResults.contains(e.target)
  ) {
    searchResults.classList.add("hidden");
  }
});

const userIcon = document.getElementById("user-icon");

userIcon.addEventListener("click", function () {
  showToast("Login Confirm");
});

updateCartBadge()