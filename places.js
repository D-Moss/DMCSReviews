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

const sidePanel = document.getElementById('side-panel');  
const panelOverlay = document.getElementById('panel-overlay');  
const panelBody = document.getElementById('panel-body');

function togglePanel() {  
    sidePanel.classList.toggle('active');  
    panelOverlay.classList.toggle('active');  
    // Prevent scrolling behind the panel when open  
    document.body.style.overflow = sidePanel.classList.contains('active') ? 'hidden' : '';  
}

const placeToggleButtons = document.querySelectorAll(".place-card__toggle");

placeToggleButtons.forEach((button) => {  
    button.addEventListener("click", () => {  
        // 1. Get the review title and the full review content from this card  
        const cardBody = button.closest('.places-card-body');  
        const reviewTitle = cardBody.querySelector('.places-title').innerText;  
        const fullReviewContent = cardBody.querySelector(".place-card__full").innerHTML;

        // 2. Inject that content into the side panel  
        panelBody.innerHTML = `<h3>${reviewTitle}</h3> ${fullReviewContent}`;

        // 3. Open the panel  
        togglePanel();  
    });  
});