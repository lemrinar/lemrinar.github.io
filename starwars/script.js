// получение элементов из html
let films = document.getElementById('films');
let btnSS = document.querySelector('.starships-show');
let starships = document.getElementById('starships');


// event logic
// загрузка html
document.addEventListener('DOMContentLoaded', initApp());

// функция для получения данных фильмов
function initApp() {
    getAllFilms().then(function (values) {
        const resultFilms = values.results; // переменная, содержащая массив фильмов
        resultFilms.forEach(film => printFilms(film));
    }
    )
}

// событие клика на кнопку
btnSS.addEventListener('click', starshipsShow);


let k = 0 // переменная для единовременного вывода кораблей
// функция вывода кораблей
function starshipsShow() {
    if (k == 0) {
        getAllSS().then(function (values) {
            const resultSS = values.results; // переменная, содержащая массив кораблей
            resultSS.forEach(film => printSS(film));
            btnSS.innerHTML = '<b>hide starships</b>'; // изменение значения кнопки
        })
        k = 1;
    }
    else {
        starships.textContent = ""; // очищение информации
        btnSS.innerHTML = '<b>show starships</b>'; // изменение значения кнопки
        k = 0;
    }
}




// async logic
// функция получения фильмов
async function getAllFilms() {
    const response = await fetch('https://swapi.dev/api/films/');
    const data = await response.json();
    return data;
}

// функция получения кораблей
async function getAllSS() {
    const response = await fetch('https://swapi.dev/api/starships/'); // отправка fetch-запроса для полученя данных   
    const data = await response.json(); // извлечение данных в виде json объекта
    return data;
}

// функция получения фильма
async function getFilm(url) {
    const response = await fetch(url); // отправка fetch-запроса для полученя данных  
    const data = await response.json(); // извлечение данных в виде json объекта
    return data;
}

// функция получения персонажей
async function getPersonName(charactersUrl) {
    const response = await fetch(charactersUrl); // отправка fetch-запроса для полученя данных  
    const data = await response.json(); // извлечение данных в виде json объекта
    return data;
}



// print logic
// функция вывода фильмов
function printFilms({ title, episode_id, release_date, opening_crawl, url }) {  // url - адрес конкретного фильма
    let divFilms = document.createElement('div'); // создание div для записи фильмов
    divFilms.classList.add('film'); // добавление класса для div
    divFilms.innerHTML = `<h4>${title}</h4>`; // вывод названия фильма

    let spanEpisode = document.createElement('span'); // создание span для записи номера эпизода
    spanEpisode.innerHTML = '<b>Episode number: </b>' + episode_id + '<br>'; // вывод номера эпизода 
    divFilms.append(spanEpisode); // добавление spanEpisode к divFilms

    let releaseDate = document.createElement('span'); // создание span для записи даты релиза
    let yearEp = release_date.split('-')[0]; // переменная, содержащая год релиза
    releaseDate.innerHTML = '<b>Release year: </b>' + yearEp + '<br>'; // вывод даты релиза
    divFilms.append(releaseDate); // добавление releaseDate к divFilms

    let crawlEp = document.createElement('p'); // создание p для записи описания фильма
    crawlEp.innerHTML = '<b>Crawl: </b>' + opening_crawl; // вывод опмсания фильма
    divFilms.append(crawlEp); // добавление crawlEp к divFilms

    let btnPerson = document.createElement('span'); // создание span для записи персонажей
    btnPerson.classList.add('person-button'); // добавление класса для span
    btnPerson.innerHTML = `<span onclick="showPers('${url}', this)"><b>show persons</b></span>`; // вывод персонажей
    divFilms.append(btnPerson); // добавление btnPerson к divFilms


    films.append(divFilms); // добавление divFilms к films

}

// функция вывода кораблей
function printSS({ name, length }) {
    let ship = document.createElement('div'); // создание div
    ship.innerHTML = '<h5>' + name + '</h5>'; // вывод названия корабля
    let lengthShip = document.createElement('span'); // создание span
    lengthShip.innerHTML = 'Ship length: ' + length; // вывод размера корабля
    ship.append(lengthShip); // добавление lengthShip к ship

    starships.append(ship); // добавление ship к starships

}


// функция вывода персонажей
function showPers(url, btnShowPers) {

    const btnParentDiv = btnShowPers.closest('.film'); // получение фильма из родительского класса

    // функция для единовременного вывода персонажей
    if (btnParentDiv.querySelector('.person')) {
        return;
    }


    getFilm(url).then(function (values) {
        const resultCharacters = values.characters; // переменная для записи персонажей
        resultCharacters.forEach(charactersUrl => getPersonName(charactersUrl) // функция для полуения персонажей
            .then(function (person) {
                const name = person.name; // запись имени в переменную
                let personDiv = document.createElement('div'); // создание div
                personDiv.classList.add('person'); // доюавление кдассатдля personDiv
                personDiv.innerHTML = name; // вывод имни персонажа
                btnParentDiv.append(personDiv); // добавление personDiv к btnParentDiv
            })
        );
    })
    btnShowPers.innerHTML = "<b>persons:</b>"; // изменение btnShowPers

}


