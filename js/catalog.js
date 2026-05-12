const PLANTS = {
  1: { id: 1, name: "Snake Plant", price: 12, img: "asset/snakplant.jpg" },
  2: { id: 2, name: "Aloe Vera", price: 8, img: "asset/alovera.jpg" },
  3: { id: 3, name: "Jude Plant", price: 15, img: "asset/judeplant.jpg" },
  4: { id: 4, name: "Lily Plant", price: 10, img: "asset/lily.jpg" },
  5: { id: 5, name: "Spider Plant", price: 9, img: "asset/spider.jpg" },
  6: { id: 6, name: "Monstera Plant", price: 20, img: "asset/monstera.jpeg" },
};

function getCart() {
  return JSON.parse(localStorage.getItem("miniPlantCart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("miniPlantCart", JSON.stringify(cart));
}

function addToCart(plantId) {
  const plant = PLANTS[plantId];

  if (!plant) return;

  const cart = getCart();

  const existing = cart.find((item) => item.id === plantId);

  if (existing) {
    existing.qty += 1;
  } 
  
  else {
    cart.push({
      ...plant,
      qty: 1,
    });
  }

  saveCart(cart);
}

function getTotalQty() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function updateCartBadge() {
  const badge = document.getElementById("cart-badge");

  if (!badge) return;

  const total = getTotalQty();

  badge.textContent = total;

  badge.style.display = total > 0 ? "flex" : "none";
}

let toastTimer = null;

function showToast(msg) {
  const toast = document.getElementById("toast");

  if (!toast) return;

  toast.textContent = msg;

  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

function handleSearch(query) {
  const q = query.trim().toLowerCase();

  const cards = document.querySelectorAll(".plant-card");

  let visibleCount = 0;

  cards.forEach((card) => {
    const name = (card.dataset.name || "").toLowerCase();

    const visible = q === "" || name.includes(q);

    card.style.display = visible ? "" : "none";

    if (visible) {
      visibleCount++;
    }
  });

  const noResult = document.getElementById("no-result");

  if (noResult) {
    noResult.style.display = visibleCount === 0 ? "block" : "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {

  updateCartBadge();

  const searchInput = document.getElementById("search-input");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      handleSearch(e.target.value);
    });
  }

  const buyBtns = document.querySelectorAll(".buy-btn");

  buyBtns.forEach((btn) => {

    btn.addEventListener("click", () => {

      const id = parseInt(btn.dataset.id);

      addToCart(id);

      updateCartBadge();

      showToast("Added to Cart");

    });

  });

});