const faceColor = document.querySelector('#face-color');
const borderColor = document.querySelector('#border-color');
const lineColor = document.querySelector('#line-color');
const largeColor = document.querySelector('#large-hand-color');
const secondHandColor = document.querySelector('#second-hand-color');
const canvas = document.getElementById('canvas');

function clock() {
  const now = new Date();
  const ctx = canvas.getContext('2d');

  // Setup
  ctx.save();
  // Save the default state

  ctx.translate(250, 250);
  ctx.rotate(-90);

  // Set default styles
  ctx.strokeStyle = lineColor.value;
  ctx.fillStyle = 'lightGrey';
  ctx.lineWidth = 5;
  ctx.lineCap = 'square';

  // Draw clock face/border
  ctx.save();
  ctx.beginPath();
  ctx.lineWidth = 12;
  ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
  ctx.fillStyle = faceColor.value;
  ctx.strokeStyle = borderColor.value;
  ctx.stroke();
  ctx.fill();
  ctx.restore();

  // Hour lines
  ctx.save();
  ctx.lineWidth = 4;
  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.rotate(Math.PI / 6);
    ctx.moveTo(100, 0);
    ctx.lineTo(120, 0);
    ctx.stroke();
  }
  ctx.restore();

  // Draw minute lines
  ctx.save();
  ctx.lineWidth = 2;
  for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
      ctx.beginPath();
      ctx.moveTo(117, 0);
      ctx.lineTo(112, 0);
      ctx.stroke();
    }
    ctx.rotate(Math.PI / 30);
  }
  ctx.restore();
  const hr = now.getHours() % 12;
  const min = now.getMinutes();
  const sec = now.getSeconds();

  // Hour hand

  ctx.save();
  ctx.rotate(
    (Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) * sec
  );
  ctx.strokeStyle = largeColor.value;
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(-20, 0);
  ctx.lineTo(80, 0);
  ctx.stroke();
  ctx.restore();

  //draw minute hand
  ctx.save();
  ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
  ctx.strokeStyle = secondHandColor.value;
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(-28, 0);
  ctx.lineTo(105, 0);
  ctx.stroke();
  ctx.restore();

  //draw second hand

  ctx.save();
  ctx.rotate((sec * Math.PI) / 30);
  ctx.strokeStyle = secondHandColor.value;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(-28, 0);
  ctx.lineTo(90, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 6, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.restore();

  ctx.restore(); // Restore the default state
  requestAnimationFrame(clock);
}

requestAnimationFrame(clock);

document.getElementById('save-btn').addEventListener('click', (e) => {
  e.preventDefault();
  const dataToURLString = canvas.toDataURL('image/jpeg');
  console.log(dataToURLString);
  const link = document.createElement('a');
  link.download = 'clock.jpeg';
  link.href = dataToURLString;
  link.click();
});
