const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const rec = new window.webkitSpeechRecognition();

rec.lan = 'hi-IND';
rec.continuous = false;
rec.onresult = function (e) {
  console.log(e.results);
  const acceptedColors = [
    'red',
    'green',
    'blue',
    'yellow',
    'orange',
    'purple',
    'pink',
    'brown',
    'black',
    'white',
    'gray',
    'cyan',
    'magenta',
    'lime',
    'maroon',
    'navy',
    'olive',
    'teal',
    'violet',
    'indigo',
  ];
  for (let i = e.resultIndex; i < e.results.length; i++) {
    const script = e.results[i][0].transcript.toLowerCase().trim();
    if (acceptedColors.includes(script)) {
      document.body.style.backgroundColor = script;
    } else {
      alert('Please say a color');
    }
  }
};

rec.start();
