const fetchUser = () => {
  showSpinner();
  fetch('https://randomuser.me/api')
    .then((response) => response.json())
    .then((data) => {
      hideSpinner();
      if (data.results[0].gender === 'male') {
        document.body.style.backgroundColor = '#87CEEB';
      } else {
        document.body.style.backgroundColor = '#CC99FF';
      }
      document.getElementById(
        'user'
      ).innerHTML = `<div class="flex justify-between">
          <div class="flex">
            <img
              class="w-48 h-48 rounded-full mr-8"
              src= ${data.results[0].picture.large} />
            <div class="space-y-3">
              <p class="text-xl">
                <span class="font-bold">Name: </span>${data.results[0].name.first}  ${data.results[0].name.last}
              </p>
              <p class="text-xl">
                <span class="font-bold">Email: </span> ${data.results[0].email}
              </p>
              <p class="text-xl">
                <span class="font-bold">Phone: </span> (555) ${data.results[0].phone}
              </p>
              <p class="text-xl">
                <span class="font-bold">Location: </span>${data.results[0].location.street.number} , ${data.results[0].location.street.name}
              </p>
              <p class="text-xl"><span class="font-bold">Age: </span> ${data.results[0].registered.age}</p>
            </div>
          </div>
        </div>`;
    });
};
function showSpinner() {
  document.querySelector('.spinner').style.display = 'block';
}
function hideSpinner() {
  document.querySelector('.spinner').style.display = 'none';
}
document.getElementById('generate').addEventListener('click', fetchUser);
fetchUser();
