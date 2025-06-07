const places = [
	{
		name: "Avignon",
		mainImage: "assets/images/places/avignon.webp",
	},
	{
		name: "Aéroport Marseille Provence",
		mainImage: "assets/images/places/aeroport-marseille.jpg",
	},
	{
		name: "Marseille",
		mainImage: "assets/images/places/marseille.jpg",
	},
	{
		name: "Aix-en-Provence",
		mainImage: "assets/images/places/aix-en-provence.jpg",
	},
	{
		name: "Montpellier",
		mainImage: "assets/images/places/montpellier.jpg",
	},
	{
		name: "Nîmes",
		mainImage: "assets/images/places/nimes.jpg",
	},
];

const placesList = document.getElementById("places-list");
let expandedIndex = 0;

function renderPlaces() {
	placesList.innerHTML = "";

	places.forEach((place, index) => {
		const isExpanded = index === expandedIndex;

		const div = document.createElement("div");
		div.className = `
      ${
				isExpanded
					? "h-[500px] md:w-full justify-start"
					: "w-full md:w-20 md:hover:w-28 justify-center after:bg-black/40 hover:cursor-pointer"
			}
      md:h-[500px]
      flex
      items-end
      p-4
      rounded-md
      shadow-lg
      transition-all
      duration-500
      bg-cover
      bg-center
      after:absolute
      after:bg-gradient-to-t from-[#0000008d] to-transparent
      after:pointer-events-none
      after:top-0
      after:left-0
      after:w-full
      after:h-full
      after:rounded-md
      after:block
      after:z-10
      relative
    `
			.replace(/\s+/g, " ")
			.trim();

		div.style.backgroundImage = `url(${place.mainImage})`;

		div.addEventListener("click", () => {
			expandedIndex = index;
			renderPlaces();
		});

		const content = document.createElement("div");
		content.className = `
      z-20 flex flex-col md:flex-row md:items-center w-full
      ${isExpanded ? "justify-between" : "justify-center"}
    `;

		const title = document.createElement("h2");
		title.textContent = place.name;
		title.className = `
      ${isExpanded ? "mb-2 text-2xl" : "md:-rotate-90 py-8 text-xl"}
      flex justify-start pointer-events-none transition-all duration-500 text-white
    `;

		content.appendChild(title);
		div.appendChild(content);
		placesList.appendChild(div);
	});
}

renderPlaces();
