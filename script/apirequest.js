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

regionInput.addEventListener("change", () => {
	subregionInput.setAttribute("class", "hide");
	let region = regionInput.value;
	if (region == "Region") {
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
					subregionInput.innerHTML += `<option value="${data[i].subregion}">${data[i].subregion}</option>`;
					prevSubRegion.push(data[i].subregion);
				}
			}
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
