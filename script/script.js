const nameInput = document.querySelector("#nameInput");
const capitalInput = document.querySelector("#capitalInput");
const regionInput = document.querySelector("#regionInput");
const search = nameInput.value;
const placeholder = document.querySelector("#placeholder");

nameInput.addEventListener("change", () => {
	placeholder.innerHTML = "";
	let country = nameInput.value;
	let url = `https://restcountries.eu/rest/v2/name/${country}`;
	fetch(url)
		.then((res) => res.json())
		.then((data) => {
			for (let i = 0; i < data.length; i++) {
				placeholder.innerHTML += data[i].name + "<br>";
			}
		});
});

capitalInput.addEventListener("change", () => {
	placeholder.innerHTML = "";
	let capital = capitalInput.value;
	let url = `https://restcountries.eu/rest/v2/capital/${capital}`;
	fetch(url)
		.then((res) => res.json())
		.then((data) => {
			for (let i = 0; i < data.length; i++) {
				placeholder.innerHTML += data[i].name + "<br>";
			}
		});
});

regionInput.addEventListener("change", () => {
	let region = regionInput.value;
	if (region == "Region") {
		placeholder.innerHTML = "";
		return;
	}
	if (region == "World") {
		placeholder.innerHTML = "";
		let url = "https://restcountries.eu/rest/v2/all";
		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				for (let i = 0; i < data.length; i++) {
					placeholder.innerHTML += data[i].name + "<br>";
				}
			});
		return;
	}
	placeholder.innerHTML = "";
	let url = `https://restcountries.eu/rest/v2/region/${region}`;
	fetch(url)
		.then((res) => res.json())
		.then((data) => {
			for (let i = 0; i < data.length; i++) {
				placeholder.innerHTML += data[i].name + "<br>";
			}
		});
});
