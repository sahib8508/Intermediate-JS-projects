const global = {
  currentPage: window.location.pathname,
  search: {
    term: '',
    type: '',
    page: 1,
    totalPages: 1,
    totalResult: 0,
  },
};

//Fetch data from TMDB API

async function fetchAPIData(endpoint) {
  const API_KEY = '1fb1e24fbfaae2df88c681142309ff8f';
  const API_URL = 'https://api.themoviedb.org/3/';
  showSpinner();
  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  hideSpinner();
  return data;
}

//fetch search api
async function searchAPIData() {
  const API_KEY = '1fb1e24fbfaae2df88c681142309ff8f';
  const API_URL = 'https://api.themoviedb.org/3/';
  showSpinner();
  const response = await fetch(
    `${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`
  );
  const data = await response.json();
  hideSpinner();
  return data;
}

// Display popular movies in index.html

async function displayPopularMovies() {
  const { results } = await fetchAPIData('movie/popular');
  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
      <a href="movie-details.html?id=${movie.id}">
      ${
        movie.poster_path
          ? `<img
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                class="card-img-top"
                alt=${movie.original_title} />`
          : `<img
                src="images/no-image.jpg"
              class="card-img-top"
              alt=${movie.original_title} />
          </a>`
      }
        </a>
        <div class="card-body">
        <h5 class="card-title">${movie.original_title}</h5>
        <p class="card-text">
        <small class="text-muted">Release: ${movie.release_date}>
        </p>
        </div>
        `;

    document.querySelector('.grid').appendChild(div);
  });
}

// Display TV shows in shows.html

async function displayPopularShows() {
  const { results } = await fetchAPIData('tv/popular');
  results.forEach((shows) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <a href="tv-details.html?id=${shows.id}">
        ${
          shows.poster_path
            ? `<img
                  src="https://image.tmdb.org/t/p/w500${shows.poster_path}"
                  class="card-img-top"
                  alt=${shows.original_name} />`
            : `<img
                  src="images/no-image.jpg"
                class="card-img-top"
                alt=${shows.original_name} />
            </a>`
        }
          </a>
          <div class="card-body">
          <h5 class="card-title">${shows.original_name}</h5>
          <p class="card-text">
          <small class="text-muted">Release: ${shows.first_air_date}>
          </p>
          </div>
          `;

    document.getElementById('popular-shows').appendChild(div);
  });
}

//commas

function addCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

//Display Movie details

async function displayMovieDetails() {
  const movieId = window.location.search.split('=')[1];
  const results = await fetchAPIData(`movie/${movieId}`);
  //Overlay for background image

  displayBackgroundImage('movie', results.backdrop_path);

  const div = document.createElement('div');

  div.innerHTML = `<div class="details-top">
          <div>
            <img
              src="https://image.tmdb.org/t/p/w500${results.backdrop_path}"
              class="card-img-top"
              alt="${results.original_title}"
            />
          </div>
          <div>
            <h2>${results.original_title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${results.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${results.release_date}</p>
            <p>
              ${results.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${results.genres
                .map((genre) => `<li>${genre.name}</li>`)
                .join('')}
            </ul>
            <a href="${
              results.homepage
            }" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${addCommas(
              results.budget
            )}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommas(
              results.revenue
            )}</li>
            <li><span class="text-secondary">Runtime:</span> ${
              results.runtime
            } minutes</li>
            <li><span class="text-secondary">Status:</span> ${
              results.status
            }</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${results.production_companies
            .map((items) => `<span>${items.name}</span>`)
            .join('  ,  ')}</div>
        </div>`;
  document.getElementById('movie-details').appendChild(div);
}

////Display TV show details

const displayShowDetails = async () => {
  const showsId = document.location.search.split('=')[1];
  const results = await fetchAPIData(`tv/${showsId}`);
  displayBackgroundImage('shows', results.backdrop_path);
  const div = document.createElement('div');
  div.innerHTML = `<div class="details-top">
          <div>
            <img
             src="https://image.tmdb.org/t/p/w500${results.backdrop_path}"
              class="card-img-top"
              alt="${results.original_name}"
            />
          </div>
          <div>
            <h2>${results.original_name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
             ${results.vote_average.toFixed(2)} / 10
            </p>
            <p class="text-muted">Release Date: ${results.first_air_date}</p>
            <p>
            ${results.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
             ${results.genres.map((items) => `<li>${items.name}</li>`).join('')}
            </ul>
            <a href="${
              results.homepage
            }" target="_blank" class="btn">Visit Show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes:</span>${
              results.number_of_episodes
            }</li>
            <li>
              <span class="text-secondary">Last Episode To Air:</span> ${
                results.last_episode_to_air.name
              }
            </li>
            <li><span class="text-secondary">Status:</span> ${
              results.status
            }</li>
            
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${results.production_companies.map(
            (items) => `<span> ${items.name} </span>`
          )}</div>
        </div>`;

  document.getElementById('show-details').appendChild(div);
};

//display backdrop

function displayBackgroundImage(type, backgroundPath) {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.1';

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else {
    document.querySelector('#show-details').appendChild(overlayDiv);
  }
}

//search movies/shows

async function search() {
  const queryString = document.location.search;
  const urlParams = new URLSearchParams(queryString);
  global.search.type = urlParams.get('type');
  global.search.term = urlParams.get('search-term');

  if (global.search.term !== '' && global.search.term !== null) {
    const { results, total_pages, page, total_results } = await searchAPIData();
    global.search.page = page;
    global.search.totalPages = total_pages;
    global.search.totalResult = total_results;
    if (results.length === 0) {
      showAlert('No results found', 'error');
      return;
    }

    displaySearchResults(results);
    document.querySelector('#search-term').value = '';
  } else {
    showAlert('Please enter a search term', 'error');
  }
}

//display search

function displaySearchResults(results) {
  document.querySelector('#search-results').innerHTML = '';
  document.querySelector('#search-results-heading').innerHTML = '';
  document.querySelector('.pagination').innerHTML = '';

  results.forEach((item) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
      <a href="${global.search.type}-details.html?id=${item.id}">
      ${
        item.poster_path
          ? `<img
                src="https://image.tmdb.org/t/p/w500${item.poster_path}"
                class="card-img-top"
                alt=${
                  global.search.type == 'movie' ? item.title : item.name
                } />`
          : `<img
                src="images/no-image.jpg"
              class="card-img-top"
              alt=${global.search.type == 'movie' ? item.title : item.name} />
          </a>`
      }
        </a>
        <div class="card-body">
        <h5 class="card-title">${
          global.search.type == 'movie' ? item.title : item.name
        }</h5>
        <p class="card-text">
        <small class="text-muted">Release: ${
          global.search.type == 'movie'
            ? item.release_date
            : item.first_air_date
        }>
        </p>
        </div>
        `;

    document.querySelector('#search-results').appendChild(div);
  });
  document.querySelector('#search-results-heading').innerHTML = `
              <h2>${results.length} of ${global.search.totalResult} Results for ${global.search.term}</h2>
    `;

  displayPagination();
}

//display pagination

function displayPagination() {
  const div = document.createElement('div');
  div.innerHTML = `<button class="btn btn-primary" id="prev">Prev</button>
        <button class="btn btn-primary" id="next">Next</button>
        <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>`;
  document.querySelector('.pagination').appendChild(div);

  //disable prev

  if (global.search.page === 1) {
    document.querySelector('#prev').disabled = true;
  }
  if (global.search.page === global.search.totalPages) {
    document.querySelector('#next').disabled = true;
  }
  //next page

  document.querySelector('#next').addEventListener('click', async () => {
    global.search.page++;
    const { results } = await searchAPIData();
    displaySearchResults(results);
  });
  //prev page

  document.querySelector('#prev').addEventListener('click', async () => {
    global.search.page--;
    const { results } = await searchAPIData();
    displaySearchResults(results);
  });
}

//show alert for search

function showAlert(message, className) {
  const alertEl = document.createElement('div');
  alertEl.classList.add('alert', className);
  alertEl.appendChild(document.createTextNode(message));
  document.querySelector('#alert').appendChild(alertEl);
  setTimeout(() => {
    alertEl.remove();
  }, 3000);
}

//Display slider movies

async function displaySlider() {
  const results = await fetchAPIData('movie/now_playing');
  results.results.forEach((items) => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');
    div.innerHTML = `
            <a href="movie-details.html?id=${items.id}">
              <img src="https://image.tmdb.org/t/p/w500${
                items.poster_path
              }" alt="${items.original_title}" />
            </a>
            <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i> ${items.vote_average.toFixed(
                2
              )} / 10
            </h4>`;
    document.querySelector('.swiper-wrapper').appendChild(div);
    initSwipper();
  });
}

//swipper

function initSwipper() {
  const swiper = new Swiper('.swiper', {
    // Basic settings
    speed: 400,
    spaceBetween: 30,
    slidesPerView: 'auto',
    loop: true,

    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // Pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },

    // Scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
    },

    // Autoplay
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },

    // Effect
    effect: 'coverflow',
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },

    // Keyboard control
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },

    // A11y (Accessibility)
    a11y: {
      prevSlideMessage: 'Previous slide',
      nextSlideMessage: 'Next slide',
    },
  });
}

//spinner

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}
function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

//Highlight Active Link

function highlightActiveLink() {
  const link = document.querySelectorAll('.nav-link');
  const path = window.location.pathname;
  link.forEach((link) => {
    if (link.getAttribute('href') === path) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

//Init app

function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displaySlider();
      displayPopularMovies();
      break;
    case '/shows.html':
      displayPopularShows();
      break;
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/tv-details.html':
      displayShowDetails();
      break;
    case '/search.html':
      search();
      break;

    default:
      break;
  }
  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
