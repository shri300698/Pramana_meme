// Get references
const canvas = document.getElementById('meme-canvas');
const ctx = canvas.getContext('2d');
const generateBtn = document.getElementById('generate-btn');
const downloadBtn = document.getElementById('download-btn');
const textInput = document.getElementById('text-input');

// List of images
const imageList = [
  '1758904107482~2.jpeg',
  '1758904107482~3.jpeg',
  '1758904107482~4.jpeg',
  '1758904107482~5.jpeg'
];
function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && i > 0) {
      ctx.strokeText(line, x, y);
      ctx.fillText(line, x, y);
      line = words[i] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.strokeText(line, x, y);
  ctx.fillText(line, x, y);
}

function drawMeme() {
  const concept = textInput.value.trim().toUpperCase() || '...A CONCEPT';
  const fullText = `WHAT IS THE PRAMANAM FOR ${concept}?`;

  const randomIndex = Math.floor(Math.random() * imageList.length);
  const imagePath = imageList[randomIndex];

  const baseImage = new Image();
  baseImage.onload = function () {
    canvas.width = baseImage.width;
    canvas.height = baseImage.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);

    const fontSize = canvas.width > 500 ? 50 : 36;
    ctx.font = `bold ${fontSize}px Impact, "Arial Black", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;
    ctx.fillStyle = 'white';

    drawWrappedText(ctx, fullText, canvas.width / 2, 10, canvas.width - 40, fontSize + 5);

    downloadBtn.style.display = 'block';
  };

  baseImage.src = imagePath;
}

function downloadMeme() {
  const dataURL = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = dataURL;
  a.download = 'pramana-meme.png';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

generateBtn.addEventListener('click', drawMeme);
downloadBtn.addEventListener('click', downloadMeme);
