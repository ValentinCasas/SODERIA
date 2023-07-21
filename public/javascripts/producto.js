const dropZone = document.querySelector('.container');
const fileInput = document.querySelector('#file');
const browseBtn = document.querySelector('.header');
const footerText = document.querySelector('.footer p:last-of-type');

const showFile = (file) => {
  footerText.textContent = file.name;
}

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('hovered');
  const file = e.dataTransfer.files[0];
  fileInput.files = e.dataTransfer.files;
  showFile(file);
});

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  showFile(file);
});



browseBtn.addEventListener('click', () => {
  fileInput.click();
});

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('hovered');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('hovered');
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('hovered');
  const file = e.dataTransfer.files[0];
  showFile(file);
});

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  showFile(file);
});

