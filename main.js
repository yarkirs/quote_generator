const container = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const vkBtn = document.getElementById('vk-btn');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


/*Показать загрузчик*/
function loading() {
	loader.hidden = false;
	container.hidden = true;

}
/*Скрыть*/
function complete() {
    if (!loader.hidden) {
        container.hidden = false;
        loader.hidden = true;
    }
}

/*Получение цитаты*/
async function getQuote() {
	loading();
	const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/'
	const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=ru&format=json';
	try {
		const response = await fetch(proxyUrl + apiUrl);
		const data = await response.json();
		
		/*Если Автор неизвестен*/
		if (data.quoteAuthor === ''){
			authorText.innerText = 'Автор неизвестен'
		} else {
			authorText.innerText = data.quoteAuthor;
		}

		/*Изменение текста при большой длинне*/
		if (data.quoteText.length > 120) {
			quoteText.classList.add('logn-text');
		} else {
			quoteText.classList.remove('long-text');
		}
		quoteText.innerText = data.quoteText;
	}	catch (error) {
		getQuote();
	}
	complete();
}

/*Запостить в ВК*/
function vkPoste(){
	const quote = quoteText.innerText;
	const author = authorText.innerText;
	const myUrl = 'yarkirs.ru'
	const vkUrl = 'https://vk.com/share.php?' + 'url=http://forismatic.com' + `&title=${quote} - ${author}` ;
    window.open(vkUrl, '_blank');
}

/*lisen btn*/
newQuoteBtn.addEventListener('click', getQuote);
vkBtn.addEventListener('click', vkPoste);


getQuote();



