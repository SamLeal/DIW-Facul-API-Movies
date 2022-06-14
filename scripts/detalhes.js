const API_KEY = 'api_key=bdea5fe141d78a5b683c6bc6014ed135'
const BASE_URL = 'https://api.themoviedb.org/3'
const IMG_URL = 'https://image.tmdb.org/t/p/w500'
const TREND_URL = BASE_URL + '/movie/popular?language=pt-BR&'+API_KEY
const URLParams = new URLSearchParams(window.location.search)

const main = document.getElementById('main')

pegarDetalhes()

function pegarDetalhes(){
  const params = URLParams.get('id')
  console.log(params);
  const ID_URL = BASE_URL + '/movie/'+params+'?'+API_KEY+'&language=pt-BR'
  fetch(ID_URL).then(res => res.json()).then(data => {
      showMovies(data)
  }
      )
}

function showMovies(data) {

      const {title, poster_path, vote_average, overview, id, runtime, genres} = data;
      let genero = ''
      genres.forEach(genre => {
        genero = genre.name ;
      });
      const movieEl = document.createElement('div');
      movieEl.classList.add('movieList--item');
      movieEl.id = `${id}`
      movieEl.innerHTML = `

      <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" alt="${title}">
      
      <div class="movie-informacoes">
        <h3>${title}</h3>
        <span class="${getColor(vote_average)}">${vote_average}</span>
        <p class="p">${overview}</p>
        <p><b>Gênero:</b> ${genero}</p>
        <p><b>Duração:</b> ${runtime} minutos</p>
      </div>
      `
      
      main.appendChild(movieEl);
      
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
