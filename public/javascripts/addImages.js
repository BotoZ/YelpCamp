document.getElementById("image").addEventListener('change', previewMultiple);

function previewMultiple(event) {
    var images = event.target.files;
    var formFile = document.getElementById("formFile");

    formFile.innerHTML = '';

    for (var i = 0; i < images.length; i++) {
        var url = URL.createObjectURL(images[i]);

        var imgWrap = document.createElement('div');
        imgWrap.classList.add('img-wrap');

        var img = document.createElement('img');
        img.src = url;

        var closeBtn = document.createElement('span');
        closeBtn.classList.add('close');
        closeBtn.textContent = '×';

        closeBtn.addEventListener('click', function (e) {
            var imgWrap = e.target.parentElement;
            var img = imgWrap.querySelector('img');
            imgWrap.removeChild(img);
            formFile.removeChild(imgWrap);
        });

        imgWrap.appendChild(img);
        imgWrap.appendChild(closeBtn);
        formFile.appendChild(imgWrap);
    }
}

