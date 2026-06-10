const navToggle = document.querySelector(".nav-toggle");
const navClose = document.querySelector(".nav-close");
const navBackdrop = document.querySelector(".nav-backdrop");

if (navToggle && navClose && navBackdrop) {
	navToggle.addEventListener("click", () => {
		document.body.classList.add("menu-open");
		navToggle.setAttribute("aria-expanded", "true");
	});

	const closeMenu = () => {
		document.body.classList.remove("menu-open");
		navToggle.setAttribute("aria-expanded", "false");
	};

	navClose.addEventListener("click", closeMenu);
	navBackdrop.addEventListener("click", closeMenu);
}

const filterButtons = document.querySelectorAll(".products-filter__btn");
const productCards = Array.from(document.querySelectorAll(".products-card"));
const emptyMessage = document.querySelector(".products-empty");
const paginationContainer = document.querySelector("#pagination-buttons");

const cardsPerPage = 9;
let currentFilter = "all";
let currentPage = 1;

function getFilteredCards() {
	return productCards.filter((card) => {
		const categories = card.dataset.category.split(" ");
		return currentFilter === "all" || categories.includes(currentFilter);
	});
}

function closeExpandedReviews() {
	document.querySelectorAll(".products-card__full").forEach((review) => {
		review.hidden = true;
	});

	document.querySelectorAll(".products-card__toggle").forEach((button) => {
		button.setAttribute("aria-expanded", "false");
		button.textContent = "Read More";
	});
}

function renderProducts() {
	const filteredCards = getFilteredCards();
	const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

	productCards.forEach((card) => {
		card.classList.add("is-hidden");
	});

	if (filteredCards.length === 0) {
		if (emptyMessage) emptyMessage.hidden = false;
		if (paginationContainer) paginationContainer.innerHTML = "";
		return;
	}

	if (emptyMessage) emptyMessage.hidden = true;

	if (currentPage > totalPages) {
		currentPage = 1;
	}

	const start = (currentPage - 1) * cardsPerPage;
	const end = start + cardsPerPage;

	filteredCards.slice(start, end).forEach((card) => {
		card.classList.remove("is-hidden");
	});

	renderPagination(totalPages);
}

function renderPagination(totalPages) {
	if (!paginationContainer) return;

	paginationContainer.innerHTML = "";

	if (totalPages <= 1) return;

	for (let i = 1; i <= totalPages; i++) {
		const button = document.createElement("button");
		button.type = "button";
		button.className = "pagination-btn";
		button.textContent = i;

		if (i === currentPage) {
			button.classList.add("is-active");
		}

		button.addEventListener("click", () => {
			currentPage = i;
			closeExpandedReviews();
			renderProducts();

			document.querySelector("#productsFilter").scrollIntoView({
				behavior: "smooth",
				block: "start"
			});
		});

		paginationContainer.appendChild(button);
	}
}

filterButtons.forEach((button) => {
	button.addEventListener("click", () => {
		filterButtons.forEach((btn) => btn.classList.remove("is-active"));
		button.classList.add("is-active");

		currentFilter = button.dataset.filter;
		currentPage = 1;

		closeExpandedReviews();
		renderProducts();
	});
});

const toggleButtons = document.querySelectorAll(".products-card__toggle");

toggleButtons.forEach((button) => {
	button.addEventListener("click", () => {
		const fullReview = button.closest(".products-card__body").querySelector(".products-card__full");
		const isExpanded = button.getAttribute("aria-expanded") === "true";

		if (isExpanded) {
			fullReview.hidden = true;
			button.setAttribute("aria-expanded", "false");
			button.textContent = "Read More";
		} else {
			fullReview.hidden = false;
			button.setAttribute("aria-expanded", "true");
			button.textContent = "Show Less";
		}
	});
});

renderProducts();