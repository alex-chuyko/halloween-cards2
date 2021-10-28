let wasSelected = false;
const audio = new Audio('resources/sound.mp3');;
const wishes = [
	'Halloween fun is soon to begin. We hope your day is incredible and full of great treats. Have a bewitching night and a pleased Halloween.',
	'Let the power of Halloween charge up your broomstick as well as your soul. Let the full moon bring all good things into your life.',
	'Halloween is a holiday that children of all ages can enjoy. We hope you and your inner child have loads of fun. Best Halloween wishes from those who never want to grow up.',
	'On Halloween, we hope you laugh until you cry, and we hope the Halloween treats you receive far outnumber the number of tricks played on you. Enjoy Halloween to the fullest.',
	'There’s a black cat in the window and a pumpkin on the stoop. On the lawn are a ghost and a witch. This tells us Halloween is very near, so Happy Halloween to you.',
	'Black cats skitter and ghouls patter by, it’s time to celebrate as All Hallow’s Eve has arrived!',
	'We wish you have a happy Halloween filled with loads of great adventures! May the spirits and witches grant you all your wishes.',
	'Why did the witch walk across the street? Boo-cause her broom was in the shop! Happy Halloween…have a “spook” tacular time this year!',
	'Wishing you a Halloween night full of fun and joy. Make yourself prepared for the celebration as darkness takes over. The dead are awake once again!',
	'Tonight, we are wishing you an unforgettable Halloween adventure filled with creepy memories. Happy Halloween!',
	'When the dark night appears and everything turns into evil, just remember it’s Halloween, just chill!'
];

const shuffleArray = (array) => {
	let currentIndex = array.length;

	while (currentIndex !== 0) {

		const randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}
};

window.addEventListener('load', () => {
	const cardsContainer = document.querySelector(".cards-container");
	const errorContainer = document.querySelector('.error');

	const showWarning = () => {
		errorContainer.classList.add('error_visible');
	};

	cardsContainer.addEventListener("click", (event) => {
		const isOpened = cardsContainer.querySelector('.card.card_opened');
		const cardNode = event.target.closest('.card');
		if (!cardNode || (isOpened && !cardNode.classList.contains('card_opened'))) {
			return;
		}

		if (cardNode.classList.contains('card_opened')) {
			cardNode.style.zIndex = 0;
			cardNode.classList.toggle('card_opened');
			cardNode.style.removeProperty('transform');
			return;
		}

		if (wasSelected) {
			showWarning();
			if (!audio.ended) {
				audio.play();
			}
			cardsContainer.addEventListener('animationend', () => {
				cardsContainer.classList.toggle('cards-container_shake');
			}, { once: true });
			cardsContainer.classList.toggle('cards-container_shake');
			return;
		}

		wasSelected = true;
		cardNode.style.zIndex = 20;
		cardNode.classList.toggle('card_opened');
		const containerScrollTop = cardsContainer.scrollTop;
		const containerRect = cardsContainer.getBoundingClientRect();
		const centerX = containerRect.x + 107;
		const centerY = containerRect.y + 77;
		const clientRect = cardNode.getBoundingClientRect();
		const cardX = clientRect.x;
		const cardY = clientRect.y;
		cardNode.style.transform = `translate(${centerX - cardX}px, ${centerY - cardY - containerScrollTop}px)`;
	});

	const firstCard = document.querySelector('.cards-container .card');
	const fragment = document.createDocumentFragment();
	shuffleArray(wishes);
	for (let i = 0; i < 9; i++) {
		const wish = wishes[i];
		if (i === 0) {
			firstCard.querySelector('.card__back-wish').textContent = wish;
			continue;
		}

		const cloneCard = firstCard.cloneNode(true);
		cloneCard.querySelector('.card__back-wish').textContent = wish;
		fragment.appendChild(cloneCard);
	}

	cardsContainer.appendChild(fragment);
});
