addEventListener('keydown', (e) => {
  const insert = document.getElementById('insert');
  insert.innerHTML = `<div class="key">
        ${e.key == ' ' ? 'Space' : e.key}
        <small>e.key</small>
      </div>
      <div class="key">
        ${e.keyCode}
        <small>e.keyCode</small>
      </div>
      <div class="key">
        ${e.code}
        <small>e.code</small>
      </div>
`;
});
// function showKeyCodes(e) {
//   const insert = document.getElementById('insert');
//   insert.innerHTML = '';

//   const keyCodes = {
//     da: e.key,
//     'e.keyCode': e.keyCode,
//     'e.code': e.code,
//   };
//   for (let key in keyCodes) {
//     const div = document.createElement('div');
//     div.className = 'key';
//     const small = document.createElement('small');

//     const keyText = document.createTextNode(key);
//     const value = document.createTextNode(keyCodes[key]);
//     console.log(key);

//     small.appendChild(keyText);
//     div.appendChild(value);

//     div.appendChild(small);
//     insert.appendChild(div);
//   }
// }
// addEventListener('keydown', showKeyCodes);
