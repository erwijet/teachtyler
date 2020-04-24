let params = new URLSearchParams(window.location.search);
var selectedLevel = 0;

let preview;
let slider;

document.addEventListener('DOMContentLoaded', _ => {
    (async () => {
        preview = document.getElementById('output');
        slider = document.getElementById('mainslider');
        let data = await $.ajax({
            url: `https://api.spotify.com/v1/tracks/${params.get('id')}`,
            type: 'GET',
            dataType: 'json',
            beforeSend: xhr => xhr.setRequestHeader('Authorization', `Bearer ${params.get('token')}`),
            error: xhr => { if (xhr.responseJSON.error.status == 401) window.location.href = IS_DEV == true ? 'http://localhost:5050' : 'https://teachtyler.openode.io'; }
        });

        document.getElementById('albumart').setAttribute('src', data.album.images[0].url);
        document.getElementById('title').innerHTML = data.name;
        document.getElementById('album').innerHTML = data.album.name;
        document.getElementById('artist').innerHTML = data.artists[0].name;

        // setup slider listener

        slider.addEventListener('input', () => {
            let fVal = parseFloat(slider.value);
            let fLevel = parseFloat(selectedLevel + '.0');
            preview.innerHTML = (fVal + fLevel).toString().substr(0, 5);
        });
    })();
});

function macroSubmit(level) {
    selectedLevel = level;
    for (let i = 0; i < 5; i++) {
        document.getElementById('macro-' + i).classList.remove('is-rounded');
    }
    document.getElementById('macro-' + level).classList.add('is-rounded');

    // clear and create slider

    document.getElementById('microsettings').classList.remove('is-hidden');
    slider.classList.remove(slider.classList[2]);
    slider.classList.add(document.getElementById('macro-' + level).classList[2]);
    let fVal = parseFloat(slider.value);
    let fLevel = parseFloat(selectedLevel + '.0');
    preview.innerHTML = (fVal + fLevel).toString().substr(0, 5);
}
