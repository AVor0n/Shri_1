const preview = document.querySelector<HTMLDivElement>('.preview');

const idField = document.querySelector<HTMLInputElement>('.id-field');
const imageField = document.querySelector<HTMLInputElement>('.image-field');
const colorField = document.querySelector<HTMLInputElement>('.color-field');
const backIdField = document.querySelector<HTMLInputElement>('.background-field');
const threshholdField = document.querySelector<HTMLInputElement>('.threshhold-field');

const mergeBtn = document.querySelector<HTMLButtonElement>('.merge');
const uploadBtn = document.querySelector<HTMLButtonElement>('.upload-image');
const getListBtn = document.querySelector<HTMLButtonElement>('.get-list');
const getImageBtn = document.querySelector<HTMLButtonElement>('.get-image');
const deleteImageBtn = document.querySelector<HTMLButtonElement>('.delete-image');

idField.addEventListener('input', () => {
  getImageBtn.disabled = !idField.value;
  deleteImageBtn.disabled = !idField.value;
  mergeBtn.disabled = !idField.value || !backIdField.value;
});

backIdField.addEventListener('input', () => {
  mergeBtn.disabled = !idField.value || !backIdField.value;
});

imageField.addEventListener('change', () => {
  uploadBtn.disabled = !imageField.files[0];
});

getListBtn.addEventListener('click', () => {
  fetch('list')
    .then(res => res.json())
    .then(json => {
      preview.innerHTML = json.map(it => `<span>${it.id}</span>`).join('<br/>');
    });
});

getImageBtn.addEventListener('click', () => {
  fetch(`image/${idField.value}`)
    .then(response => response.blob())
    .then(imageData => {
      preview.innerHTML = `<img src="${URL.createObjectURL(imageData)}" class="image"/>`;
    });
});

uploadBtn.addEventListener('click', () => {
  const form = new FormData();
  form.set('file', imageField.files[0]);

  fetch('upload', {
    method: 'POST',
    body: form,
  })
    .then(res => res.json())
    .then(json => {
      preview.innerHTML = `<div>Загружено</div><div>id: ${json.id}</div>`;
    });
});

deleteImageBtn.addEventListener('click', () => {
  fetch(`delete/${idField.value}`)
    .then(res => res.json())
    .then(json => {
      preview.innerHTML = `<div>Изображение удалено</div><div>id: ${json.id}</div>`;
    });
});

mergeBtn.addEventListener('click', () => {
  fetch(
    'merge?' +
      new URLSearchParams({
        front: idField.value,
        back: backIdField.value,
        color: hexToRgb(colorField.value),
        threshhold: threshholdField.value,
      }),
  )
    .then(response => response.blob())
    .then(imageData => {
      preview.innerHTML = `<img src="${URL.createObjectURL(imageData)}" class="image"/>`;
    });
});

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    .slice(1)
    .map(it => parseInt(it, 16))
    .join(',');
}
