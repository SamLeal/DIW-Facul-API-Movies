const API_KEY = 'api_key=bdea5fe141d78a5b683c6bc6014ed135'
const BASE_URL = 'https://api.themoviedb.org/3'
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&language=pt-BR&'+API_KEY
const IMG_URL = 'https://image.tmdb.org/t/p/w500'
const searchURL = BASE_URL + '/search/movie?'+API_KEY
const TREND_URL = BASE_URL + '/movie/popular?language=pt-BR&'+API_KEY
const LATE_URL = BASE_URL + '/movie/latest?'+API_KEY+'&language=pt-BR'
const CINE_URL = BASE_URL + '/movie/now_playing?'+API_KEY+'&language=pt-BR'
const AVALIADOS_URL = BASE_URL + '/movie/top_rated?'+API_KEY+'&language=pt-BR'
const UPCOMING_URL = BASE_URL + '/movie/upcoming?'+API_KEY+'&language=pt-BR'
const URLParams = new URLSearchParams(window.location.search)

const form =  document.getElementById('form');
const search = document.getElementById('search');

const mainPage2 = document.getElementById('main2')
const mainPage = document.getElementById('main')
const cinema = document.getElementById('cinema')
const populares = document.getElementById('populares')
const upcoming = document.getElementById('upcoming')
const latest = document.getElementById('latest')


getMovies(CINE_URL, latest);
getMovies(TREND_URL, populares);
getMovies(AVALIADOS_URL, cinema);
getMovies(UPCOMING_URL, upcoming);

function getMovies(url,main) {
    fetch(url).then(res => res.json()).then(data => {
        if(data.results.length !== 0){
            showMovies(data.results, main);
            
        }else{
            main.innerHTML= `<h1 class="no-results">No Results Found</h1>`
        }
        
    })
    
}

function showMovies(data, main) {
    main.innerHTML = '';
    
    data.forEach(movie => {
        const {title, poster_path, vote_average, id} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movieList--item');
        movieEl.id = `${id}`
        movieEl.innerHTML = `
        <div class="informacoes">
            <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" alt="${title}">
            
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
        </div>
        `
        
        main.appendChild(movieEl);
        
        document.getElementById(id).addEventListener('click', () => {
            direcionar(id);
        })
    })
}

function getColor(vote) {
    if(vote>= 8){
        return 'green'
    }else if(vote >= 5){
        return "orange"
    }else{
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    
    if(searchTerm) {
        mainPage2.innerHTML = ''
        getMovies(searchURL+'&query='+searchTerm, mainPage)
        
    }else{
        getMovies(API_URL, mainPage);
        mainPage2.innerHTML = ''
    }

})

function direcionar(id) {
    window.location.href = `detalhes.html?id=${id}`
  }




