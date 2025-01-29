const joke = document.querySelector('.joke');
function fetchJoke() {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://api.chucknorris.io/jokes/random');

  xhr.onreadystatechange = function () {
    document.querySelector('.joke').innerHTML = 'Loading...';

    if (this.readyState === 4 && this.status === 200) {
      const data = JSON.parse(this.responseText);
      joke.innerHTML = data.value;
    }
  };
  xhr.send();
}
document.querySelector('.btn').addEventListener('click', fetchJoke);
fetchJoke();
