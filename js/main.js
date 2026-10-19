/* Shared behavior: nav toggle, reservation date limits, form submit handling */

document.addEventListener("DOMContentLoaded", function () {
  initNavToggle();
  initLazyImagesFallback();
  initReservationDateLimit();
  initFormHandlers();
  renderSpecials();
});

/* ---------- Specials page: render cards from js/specials.js data ---------- */
function renderSpecials() {
  const grid = document.getElementById("specials-grid");
  if (!grid || typeof SPECIALS === "undefined") return;

  const tagClassMap = {
    Vegetarian: "tag-vegetarian",
    Vegan: "tag-vegan",
    Spicy: "tag-spicy",
    "Gluten-Free": "tag-gluten-free",
  };

  grid.innerHTML = SPECIALS.map(function (item) {
    const tagClass = tagClassMap[item.dietary] || "";
    return (
      '<article class="card">' +
      '<img src="' + item.image + '" alt="' + item.name + '" loading="lazy" width="400" height="300" />' +
      '<div class="card-body">' +
      '<span class="tag ' + tagClass + '">' + item.dietary + "</span>" +
      "<h3>" + item.name + "</h3>" +
      "<p>" + item.description + "</p>" +
      '<p class="card-price">' + item.price + "</p>" +
      "</div>" +
      "</article>"
    );
  }).join("");
}

/* ---------- Mobile nav toggle ---------- */
function initNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", function () {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    if (isOpen) {
      menu.setAttribute("hidden", "");
    } else {
      menu.removeAttribute("hidden");
    }
  });

  // Close the menu when a link is chosen (mobile) for a cleaner UX
  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      if (window.innerWidth < 900) {
        toggle.setAttribute("aria-expanded", "false");
        menu.setAttribute("hidden", "");
      }
    });
  });
}

/* ---------- Lazy-load fallback for browsers without native support ---------- */
function initLazyImagesFallback() {
  if ("loading" in HTMLImageElement.prototype) return; // native lazy loading supported
  document.querySelectorAll('img[loading="lazy"]').forEach(function (img) {
    img.src = img.getAttribute("src");
  });
}

/* ---------- Reservation page: block past dates ---------- */
function initReservationDateLimit() {
  const dateInput = document.getElementById("date");
  if (!dateInput) return;

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const todayStr = yyyy + "-" + mm + "-" + dd;

  dateInput.setAttribute("min", todayStr);

  dateInput.addEventListener("input", function () {
    if (dateInput.value && dateInput.value < todayStr) {
      dateInput.setCustomValidity("Please choose today or a future date.");
    } else {
      dateInput.setCustomValidity("");
    }
  });
}

/* ---------- Form submit handling (Formspree-friendly) ----------
   Shows a success/error status message instead of navigating away,
   using fetch + the form's own action URL. Falls back gracefully
   if fetch/JS fails since the form still has a valid action+method. */
function initFormHandlers() {
  document.querySelectorAll("form[data-ajax-form]").forEach(function (form) {
    const status = form.querySelector(".form-status");

    form.addEventListener("submit", function (event) {
      // Honeypot check: if filled in, silently treat as spam and stop.
      const honeypot = form.querySelector('input[name="_gotcha"]');
      if (honeypot && honeypot.value) {
        event.preventDefault();
        return;
      }

      if (!form.checkValidity()) {
        // Let native HTML5 validation UI handle it.
        return;
      }

      event.preventDefault();
      setStatus(status, "", "");
      const data = new FormData(form);

      fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      })
        .then(function (response) {
          if (response.ok) {
            form.reset();
            setStatus(
              status,
              "success",
              "Thank you! Your message has been sent. We'll be in touch soon."
            );
          } else {
            setStatus(
              status,
              "error",
              "Sorry, something went wrong sending your request. Please try again or call us directly."
            );
          }
        })
        .catch(function () {
          setStatus(
            status,
            "error",
            "Sorry, we couldn't reach the server. Please check your connection and try again, or call us directly."
          );
        });
    });
  });
}

function setStatus(el, state, message) {
  if (!el) return;
  if (!state) {
    el.removeAttribute("data-state");
    el.textContent = "";
    return;
  }
  el.setAttribute("data-state", state);
  el.textContent = message;
  el.setAttribute("role", state === "error" ? "alert" : "status");
}
