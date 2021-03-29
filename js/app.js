import movies from "./movies.js";

let input = document.querySelector("#input");
let container = document.querySelector("#result");
let tagsContainer = document.querySelector(".tags");
let listTags = [];

createAElement(movies);

let items = document.querySelectorAll("div.item");

input.addEventListener("keyup", () => {
	let value = input.value;

	if (value.length > 2) {
		filtrarMovies(value);
	} else {
		createAElement(movies);
	}
});

function filtrarMovies(value) {
	const filtered = movies.filter((movie) => {
		return movie.title.toLowerCase().includes(value.toLowerCase());
	});

	createAElement(filtered);
}

//create element
function createAElement(filtered) {
	container.innerHTML = "";

	filtered.forEach((element) => {
		let item = document.createElement("div");
		item.classList.add("item");
		item.textContent = `${element.title}`;
		item.dataset.id = `${element.id}`;
		container.appendChild(item);

		//listener for create a tag when click
		item.addEventListener("click", () => {
			createATag(item);
		});
	});
}

//create a tag
function createATag(element) {
	let tag = document.createElement("div");
	tag.classList.add("tag", "bg-success");
	tag.innerHTML = `
	<span>${element.textContent}</span>
	<i class="remove-tag" data-name="${element.textContent}">X</i>	
	`;

	if (listTags.includes(element.textContent) == false) {
		listTags.push(element.textContent);
		tagsContainer.appendChild(tag);
	}

	return listTags;
}

//eliminar tag
tagsContainer.addEventListener("click", deleteTag);

function deleteTag(e) {
	if (e.target.classList.contains("remove-tag")) {
		let parent = e.target.parentElement;
		tagsContainer.removeChild(parent);

		let dataName = e.target.dataset.name;

		listTags = listTags.filter((item) => item !== dataName);
	}

	console.log(listTags);

	return listTags;
}
