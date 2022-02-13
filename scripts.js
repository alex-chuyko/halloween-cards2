const wishes = {
	pisces: 'This Valentine’s Day, you’re realizing that love comes in all different colors, shapes and sizes! This year, you’re embracing the way that Acts of Service can be a love language that’s just as romantic as the rest. After all, what’s sexier than doing your partner’s laundry while they take your car to be refueled at the gas station? Not much, TBH.',
	aquarius: 'This is an incredibly meaningful Valentine’s Day for you because it could lead to a major relationship development. Whether you’re making things official or simply learning how to navigate conflict more effectively, your relationships are changing and expanding. Embrace the love and the growth that comes with change!',
	capricorn: 'This year, you’re craving something deeper than a plush teddy bear and a cheeky card purchased at the mall. You’re in the mood to establish true intimacy, and you’re ready to be honest about your feelings! You have an incredibly beautiful heart, Cap, and anyone would be lucky to have access to it.',
	sagittarius: 'Spice things up, because you’re ready to turn Valentine’s Day into something totally different. You’re a naturally curious zodiac sign, and this year, you’re dreaming of a wild and uninhibited adventure accompanied by the apple of your eye. Hold each other’s hands as you journey into the unknown!',
	scorpio: 'During this Valentine’s Day, you want the world to fall in love with you. And there’s nothing wrong with that! If you’re spending the day with your lover, why not post a beautiful photo together? You could even throw in a sentimental caption. And if you’re single, feel free to post a hot selfie that makes your ex regret everything.',
	libra: 'Instead of going on a standard dinner date for two, why not invite the whole gang and turn it into a party? This year, you’re in the mood to turn Valentine’s Day into something that’s not just romantic, but platonic. After all, friendship deserves to be celebrated just as much as your flings do!',
	virgo: 'This year, you might not feel as inspired by the commercial aspects of Valentine’s Day. You’re not necessarily looking for sentimental trinkets and romantic clichés, but something much deeper. Your idea of love is evolving, and this year, Valentine’s Day is about learning how to love while setting your ego aside.',
	leo: 'If you don’t have any plans for Valentine’s Day, you’d better get on it! After all, the moon will be in Leo, tapping into your emotions and your desire to express yourself. This year, you want V-Day to be an unforgettable experience—so, show the world who you are and pay attention to who appreciates your brand of love.',
	cancer: 'While everyone else is worrying about their love lives, you’re definitely not in the mood for drama this year. On Valentine’s Day, you’ll feel ready to enjoy the little things, so spend time spoiling and treating yourself. Draw a bubble bath, ask your partner for a massage and make sure you light a rose-scented candle to set the vibes.',
	gemini: 'You’re feeling flirty this year, and Valentine’s Day is bringing out your social butterfly. This is a fantastic time to attend a party and mingle with beautiful people. It’s an even better time to hit up the dating apps! However, try not to take it all too seriously—V-Day is just a bit of lighthearted fun.',
	taurus: 'This year, you might not be in the mood to go to some hectic restaurant that’s dripping with heart-shaped decorations. Instead, you might feel more comfortable celebrating at home! Invite your crush over, bake some cookies, turn on a movie and don’t forget to share a fuzzy blanket. Have fun playing house!',
	aries: 'You’re known for taking things to the next level, and Valentine’s Day is no exception. This year, you’re feeling even more passionate than usual—and whether you’re feeling passionate about your lover or your best friends, feel free to express that love any way you see fit!'
};
const cardNames = [
	'aquarius',
	'pisces',
	'aries',
	'gemini',
	'taurus',
	'cancer',
	'leo',
	'virgo',
	'libra',
	'scorpio',
	'sagittarius',
	'capricorn'
];

window.addEventListener('load', () => {
	const cardsContainer = document.querySelector(".cards-container");

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

		cardNode.style.zIndex = 20;
		cardNode.classList.toggle('card_opened');
		const containerScrollTop = cardsContainer.scrollTop;
		const containerRect = cardsContainer.getBoundingClientRect();
		const centerX = containerRect.x + 192;
		const centerY = containerRect.y + 77;
		const clientRect = cardNode.getBoundingClientRect();
		const cardX = clientRect.x;
		const cardY = clientRect.y;
		cardNode.style.transform = `translate(${centerX - cardX}px, ${centerY - cardY - containerScrollTop}px)`;
	});

	const firstCard = document.querySelector('.cards-container .card');
	const fragment = document.createDocumentFragment();
	for (let i = 0; i < cardNames.length; i++) {
		const cardName = cardNames[i];
		const cardNameUpper = cardName.toUpperCase();
		const wish = wishes[cardName];
		if (i === 0) {
			firstCard.querySelector('.card__front-image').src = `resources/${cardName}.png`;
			firstCard.querySelector('.card__front-title').textContent = cardNameUpper;
			firstCard.querySelector('.card__back-wish').textContent = wish;
			continue;
		}

		const cloneCard = firstCard.cloneNode(true);
		cloneCard.querySelector('.card__front-image').src = `resources/${cardName}.png`;
		cloneCard.querySelector('.card__front-title').textContent = cardNameUpper;
		cloneCard.querySelector('.card__back-wish').textContent = wish;
		fragment.appendChild(cloneCard);
	}

	cardsContainer.appendChild(fragment);
});
