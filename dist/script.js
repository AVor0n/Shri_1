var preview = document.querySelector('.preview');
var idField = document.querySelector('.id-field');
var imageField = document.querySelector('.image-field');
var colorField = document.querySelector('.color-field');
var backIdField = document.querySelector('.background-field');
var threshholdField = document.querySelector('.threshhold-field');
var mergeBtn = document.querySelector('.merge');
var uploadBtn = document.querySelector('.upload-image');
var getListBtn = document.querySelector('.get-list');
var getImageBtn = document.querySelector('.get-image');
var deleteImageBtn = document.querySelector('.delete-image');
idField.addEventListener('input', function () {
    getImageBtn.disabled = !idField.value;
    deleteImageBtn.disabled = !idField.value;
    mergeBtn.disabled = !idField.value || !backIdField.value;
});
backIdField.addEventListener('input', function () {
    mergeBtn.disabled = !idField.value || !backIdField.value;
});
imageField.addEventListener('change', function () {
    uploadBtn.disabled = !imageField.files[0];
});
getListBtn.addEventListener('click', function () {
    fetch('list')
        .then(function (res) { return res.json(); })
        .then(function (json) {
        preview.innerHTML = json.map(function (it) { return "<span>".concat(it.id, "</span>"); }).join('<br/>');
    });
});
getImageBtn.addEventListener('click', function () {
    fetch("image/".concat(idField.value))
        .then(function (response) { return response.blob(); })
        .then(function (imageData) {
        preview.innerHTML = "<img src=\"".concat(URL.createObjectURL(imageData), "\" class=\"image\"/>");
    });
});
uploadBtn.addEventListener('click', function () {
    var form = new FormData();
    form.set('file', imageField.files[0]);
    fetch('upload', {
        method: 'POST',
        body: form
    })
        .then(function (res) { return res.json(); })
        .then(function (json) {
        preview.innerHTML = "<div>\u0417\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u043E</div><div>id: ".concat(json.id, "</div>");
    });
});
deleteImageBtn.addEventListener('click', function () {
    fetch("delete/".concat(idField.value))
        .then(function (res) { return res.json(); })
        .then(function (json) {
        preview.innerHTML = "<div>\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0443\u0434\u0430\u043B\u0435\u043D\u043E</div><div>id: ".concat(json.id, "</div>");
    });
});
mergeBtn.addEventListener('click', function () {
    fetch('merge?' +
        new URLSearchParams({
            front: idField.value,
            back: backIdField.value,
            color: hexToRgb(colorField.value),
            threshhold: threshholdField.value
        }))
        .then(function (response) { return response.blob(); })
        .then(function (imageData) {
        preview.innerHTML = "<img src=\"".concat(URL.createObjectURL(imageData), "\" class=\"image\"/>");
    });
});
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        .slice(1)
        .map(function (it) { return parseInt(it, 16); })
        .join(',');
}
