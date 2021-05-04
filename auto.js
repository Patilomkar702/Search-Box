
console.log("Loaded js");
var BOX = document.querySelector("#suggestionBox");
var cloneItem = document.getElementById("suggestItem");

inputBox.addEventListener("keyup",keyPressed);
//inputBox.addEventListener("change",()=>{BOX.setAttribute("hidden",true)});
search.addEventListener("click",()=>{buttonClicked(inputBox.value)})

async function keyPressed()
{
	console.log(inputBox.value.toUpperCase());
	if(inputBox.value.length >= 2 )
	{
		let question = inputBox.value;
		let Question = question.split(" ");
		if(Question.length >= 1)
		{
			callSearchAPI(inputBox.value);
		}
	}
}

function callSearchAPI(question)
{
	const settings = {
		"async": true,
		"crossDomain": true,
		"url": `https://google-search3.p.rapidapi.com/api/v1/search/q=${question}	`,
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "1a478c05ecmsh059369a39322975p19a79fjsn546ae6925249",
			"x-rapidapi-host": "google-search3.p.rapidapi.com"
		}
	};
	
	$.ajax(settings).done(function (response) {
		showSuggestion(response);
	});	
};

function showSuggestion(obj)
{
	console.log("Show Called From now");
	if(card.hasAttribute("hidden"))
	{
		card.removeAttribute("hidden");
	}
	let objData = Object.values(obj.results);
	let count = BOX.childElementCount;
	for(let i=0;i<count;i++)
	{
		if(BOX.children[i] != undefined)
		{
			BOX.children[i].remove();
		}	
	}
	objData.forEach(element => {
		let item = cloneItem.cloneNode(true);
		console.log(element);
		item.innerHTML = element.title;
		item.removeAttribute("hidden");
		item.removeAttribute("id");
		item.setAttribute("data-link",element.link);
		BOX.appendChild(item);
	});
}

function selected(item)
{
	console.log("Called");
	//window.open(item.getAttribute("data-link"));
	inputBox.value = item.innerHTML;
	event.stopPropagation();
}

function buttonClicked(text)
{
	window.open(`https://www.google.com/search?q=${text}`)
}