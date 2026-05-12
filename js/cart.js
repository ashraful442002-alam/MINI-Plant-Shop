function getCart() {
  return JSON.parse(localStorage.getItem("miniPlantCart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("miniPlantCart", JSON.stringify(cart));
}

function updateCartBadge() {
  const badge = document.getElementById("cart-badge");

  if (!badge) return;

  const total = getCart().reduce((sum, item) => sum + item.qty, 0);

  badge.textContent = total;

  badge.style.display = total > 0 ? "flex" : "none";
}

function renderOrderSummary() {

  const cart = getCart();

  const container = document.getElementById("order-items");

  const emptyMsg = document.getElementById("empty-cart-msg");

  if (!container) return;

  container.innerHTML = "";

  if (cart.length === 0) {

    if (emptyMsg) {
      emptyMsg.style.display = "block";
    }

    updateTotals(0, 0);

    updateCartBadge();

    return;
  }

  if (emptyMsg) {
    emptyMsg.style.display = "none";
  }

  cart.forEach((item) => {

    const itemTotal = item.price * item.qty;

    const div = document.createElement("div");

    div.className =
      "flex gap-4 bg-white/10 p-3 rounded-2xl";

    div.innerHTML = `
    
      <img 
      src="${item.img}" 
      alt="${item.name}"
      class="w-16 h-16 object-cover rounded-xl flex-shrink-0" 
      />

      <div class="flex-1 min-w-0">

        <h4 class="font-medium truncate">
          ${item.name}
        </h4>

        <p class="text-green-300 text-sm">
          $${item.price.toFixed(2)} each
        </p>

        <p class="text-white text-sm font-semibold">
          Item total: $${itemTotal.toFixed(2)}
        </p>

        <div class="flex items-center gap-3 mt-2">

          <button
            class="qty-btn w-6 h-6 rounded bg-white/20 hover:bg-white/40 flex items-center justify-center text-sm font-bold transition"
            data-id="${item.id}"
            data-action="dec"
          >
            −
          </button>

          <span class="font-medium w-5 text-center">
            ${item.qty}
          </span>

          <button
            class="qty-btn w-6 h-6 rounded bg-white/20 hover:bg-white/40 flex items-center justify-center text-sm font-bold transition"
            data-id="${item.id}"
            data-action="inc"
          >
            +
          </button>

          <button
            class="remove-btn ml-auto text-red-300 hover:text-red-100 text-xs"
            data-id="${item.id}"
          >
            Remove
          </button>

        </div>

      </div>
    
    `;

    container.appendChild(div);

  });

  document.querySelectorAll(".qty-btn").forEach((btn) => {

    btn.addEventListener("click", () => {

      changeQty(
        parseInt(btn.dataset.id),
        btn.dataset.action
      );

    });

  });

  document.querySelectorAll(".remove-btn").forEach((btn) => {

    btn.addEventListener("click", () => {

      removeItem(parseInt(btn.dataset.id));

    });

  });

  const subtotal = cart.reduce((sum, item) => {
    return sum + item.price * item.qty;
  }, 0);

  const tax =
    subtotal > 0
      ? parseFloat((subtotal * 0.05).toFixed(2))
      : 0;

  updateTotals(subtotal, tax);

  updateCartBadge();
}

function updateTotals(subtotal, tax) {

  const total = subtotal + tax;

  const itemCount = getCart().reduce((sum, item) => {
    return sum + item.qty;
  }, 0);

  const subtotalEl =
    document.getElementById("subtotal");

  const taxEl =
    document.getElementById("tax");

  const totalEl =
    document.getElementById("total");

  const itemCountEl =
    document.getElementById("item-count");

  if (subtotalEl) {
    subtotalEl.textContent =
      `$${subtotal.toFixed(2)}`;
  }

  if (taxEl) {
    taxEl.textContent =
      `$${tax.toFixed(2)}`;
  }

  if (totalEl) {
    totalEl.textContent =
      `$${total.toFixed(2)}`;
  }

  if (itemCountEl) {
    itemCountEl.textContent =
      `${itemCount} item${itemCount !== 1 ? "s" : ""}`;
  }
}

function changeQty(id, action) {

  let cart = getCart();

  const item = cart.find((i) => i.id === id);

  if (!item) return;

  if (action === "inc") {

    item.qty += 1;

  } 
  
  else if (action === "dec") {

    item.qty -= 1;

    if (item.qty <= 0) {

      cart = cart.filter((i) => i.id !== id);

    }

  }

  saveCart(cart);

  renderOrderSummary();
}

function removeItem(id) {

  let cart = getCart().filter((i) => i.id !== id);

  saveCart(cart);

  renderOrderSummary();
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

  }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {

  renderOrderSummary();

  const completeBtn =
    document.getElementById("complete-order-btn");

  if (completeBtn) {

    completeBtn.addEventListener("click", () => {

      const cart = getCart();

      if (cart.length === 0) {

        showToast("Your cart is empty!");

        return;
      }

      localStorage.removeItem("miniPlantCart");

      showToast(" Order Confirmed!");

      setTimeout(() => {

        renderOrderSummary();

      }, 400);

    });

  }

  const cancelBtn =
    document.getElementById("cancel-btn");

  if (cancelBtn) {

    cancelBtn.addEventListener("click", () => {

      history.back();

    });

  }

  const discountBtn =
    document.getElementById("discount-btn");

  if (discountBtn) {

    discountBtn.addEventListener("click", () => {

      showToast(
        "🏷️ No discount codes available right now."
      );

    });

  }

});