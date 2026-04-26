const tabButtons = document.querySelectorAll(".places-tabs__btn");
const panels = document.querySelectorAll(".places-panel");
const introPanel = document.querySelector(".places-intro");

tabButtons.forEach((button) => {
	button.addEventListener("click", () => {
		const selectedTab = button.dataset.tab;

		tabButtons.forEach((btn) => {
			btn.classList.remove("is-active");
		});

		button.classList.add("is-active");

		if (introPanel) {
			introPanel.hidden = true;
			introPanel.classList.remove("is-active");
		}

		panels.forEach((panel) => {
			if (panel.dataset.panel === selectedTab) {
				panel.hidden = false;
			} else {
				panel.hidden = true;
			}
		});
	});
});

const placeToggleButtons = document.querySelectorAll(".place-card__toggle");

placeToggleButtons.forEach((button) => {
	button.addEventListener("click", () => {
		const fullReview = button.nextElementSibling;
		const isOpen = button.getAttribute("aria-expanded") === "true";

		button.setAttribute("aria-expanded", String(!isOpen));
		button.textContent = isOpen ? "Read More" : "Show Less";

		if (fullReview) {
			fullReview.hidden = isOpen;
		}
	});
});