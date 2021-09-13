const nameInput = document.querySelector("#nameInput");
const capitalInput = document.querySelector("#capitalInput");
const regionInput = document.querySelector("#regionInput");
const subregionInput = document.querySelector("#subregionInput");
const search = nameInput.value;
const placeholder = document.querySelector("#placeholder");

nameInput.addEventListener("change", () => {
	subregionInput.setAttribute("class", "hide");
	placeholder.innerHTML = "";
	let country = nameInput.value;
	let url = `https://restcountries.eu/rest/v2/name/${country}`;
	fetch(url)
		.then((res) => res.json())
		.then((data) => {
			for (let i = 0; i < data.length; i++) {
				placeholder.innerHTML += `<article class="card">
                    <img class="card-flag" src="${data[i].flag}" alt="${data[i].demonym} Flag">
                        <p class="card-name">${data[i].name}</p>
                    <p class="card-region">${data[i].region}</p>
                    <p class="card-subregion">${data[i].subregion}</p>
                    <p class="card-capital">${data[i].capital}</p>
                    <p class="card-pop">${data[i].population}</p>
                    <p class="card-lang">${data[i].languages[0].name}</p>
                    <p class="card-currency">${data[i].currencies[0].name}</p>
                </article>`;
			}
		});
});

capitalInput.addEventListener("change", () => {
	subregionInput.setAttribute("class", "hide");
	placeholder.innerHTML = "";
	let capital = capitalInput.value;
	let url = `https://restcountries.eu/rest/v2/capital/${capital}`;
	fetch(url)
		.then((res) => res.json())
		.then((data) => {
			for (let i = 0; i < data.length; i++) {
				placeholder.innerHTML += `<article class="card">
                    <img class="card-flag" src="${data[i].flag}" alt="${data[i].demonym} Flag">
                        <p class="card-name">${data[i].name}</p>
                    <p class="card-region">${data[i].region}</p>
                    <p class="card-subregion">${data[i].subregion}</p>
                    <p class="card-capital">${data[i].capital}</p>
                    <p class="card-pop">${data[i].population}</p>
                    <p class="card-lang">${data[i].languages[0].name}</p>
                    <p class="card-currency">${data[i].currencies[0].name}</p>
                </article>`;
			}
		});
});

window.addEventListener("load", () => {
	regionInput.innerHTML =
		"<option value='Region'>Region</option> <option value='World'>World</option>";
	let url = "https://restcountries.eu/rest/v2/all";
	fetch(url)
		.then((res) => res.json())
		.then((data) => {
			let prevRegion = [""];
			for (let i = 0; i < data.length; i++) {
				if (prevRegion.indexOf(data[i].region) !== -1) {
				} else {
					prevRegion.push(data[i].region);
				}
			}
			prevRegion
				.sort(function (a, b) {
					return a.localeCompare(b);
				})
				.map((region, index) => {
					if (region == "") {
					} else {
						regionInput.innerHTML += `<option id=${index}value="${region}">${region}</option>`;
					}
				});
		});
});

regionInput.addEventListener("change", () => {
	let region = regionInput.value;
	if (region == "Region") {
		subregionInput.setAttribute("class", "hide");
		placeholder.innerHTML = "";
		return;
	}
	if (region == "World") {
		subregionInput.setAttribute("class", "hide");
		placeholder.innerHTML = "";
		let url = "https://restcountries.eu/rest/v2/all";
		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				for (let i = 0; i < data.length; i++) {
					placeholder.innerHTML += `<article class="card">
                        <img class="card-flag" src="${data[i].flag}" alt="${data[i].demonym} Flag">
                            <p class="card-name">${data[i].name}</p>
                        <p class="card-region">${data[i].region}</p>
                        <p class="card-subregion">${data[i].subregion}</p>
                        <p class="card-capital">${data[i].capital}</p>
                        <p class="card-pop">${data[i].population}</p>
                        <p class="card-lang">${data[i].languages[0].name}</p>
                        <p class="card-currency">${data[i].currencies[0].name}</p>
                    </article>`;
				}
			});
		return;
	}
	placeholder.innerHTML = "";
	subregionInput.innerHTML = "";
	let url = `https://restcountries.eu/rest/v2/region/${region}`;
	fetch(url)
		.then((res) => res.json())
		.then((data) => {
			for (let i = 0; i < data.length; i++) {
				placeholder.innerHTML += `<article class="card">
                    <img class="card-flag" src="${data[i].flag}" alt="${data[i].demonym} Flag">
                        <p class="card-name">${data[i].name}</p>
                    <p class="card-region">${data[i].region}</p>
                    <p class="card-subregion">${data[i].subregion}</p>
                    <p class="card-capital">${data[i].capital}</p>
                    <p class="card-pop">${data[i].population}</p>
                    <p class="card-lang">${data[i].languages[0].name}</p>
                    <p class="card-currency">${data[i].currencies[0].name}</p>
                </article>`;
			}
			subregionInput.setAttribute("class", "show");
			subregionInput.innerHTML = "<option value='Subregion'>Subregion</option>";
			let prevSubRegion = [];
			for (let i = 0; i < data[i].subregion.length; i++) {
				if (prevSubRegion.indexOf(data[i].subregion) !== -1) {
				} else {
					prevSubRegion.push(data[i].subregion);
				}
			}
			prevSubRegion
				.sort(function (a, b) {
					return a.localeCompare(b);
				})
				.map((subRegion, index) => {
					if (subRegion == "") {
					} else {
						subregionInput.innerHTML += `<option id=${index}value="${subRegion}">${subRegion}</option>`;
					}
				});
			subregionInput.addEventListener("change", () => {
				let subRegion = subregionInput.value;
				if (subRegion != "Subregion") {
					placeholder.innerHTML = "";
					data.filter(subRegionCheck).map((country, index) => {
						placeholder.innerHTML += `<article id=${index} class="card">
                            <img class="card-flag" src="${country.flag}" alt="${country.demonym} Flag">
                            <p class="card-name">${country.name}</p>
                            <p class="card-region">${country.region}</p>
                            <p class="card-subregion">${country.subregion}</p>
                            <p class="card-capital">${country.capital}</p>
                            <p class="card-pop">${country.population}</p>
                            <p class="card-lang">${country.languages[0].name}</p>
                            <p class="card-currency">${country.currencies[0].name}</p>
                            </article>`;
					});
					function subRegionCheck(country) {
						return country.subregion == subRegion;
					}
				}
			});
		});
});
