document.addEventListener('DOMContentLoaded', _ => {
    let searchbar = document.getElementById('searchbar');
    let box = document.getElementById('box');
    let token = (new URLSearchParams(window.location.search)).get('token');

    // setup submit button listener
    document.getElementById('submitbtn').addEventListener('click', e => {
        (async () => {
            searchbar.classList.add('is-loading');
            let spotifyData = await $.ajax({
                url: `https://api.spotify.com/v1/search?q=${encodeURI(searchbar.value)}&type=track&market=US&limit=6`,
                type: 'GET',
                dataType: 'json',
                beforeSend: xhr => xhr.setRequestHeader('Authorization', `Bearer ${token}`),
                error: xhr => { console.log(xhr.responseJSON.error.status); if (xhr.responseJSON.error.status == 401) window.location.href = IS_DEV == true ? 'http://localhost:5050' : 'https://teachtyler.openode.io'; return; }
            });

            // clear old cards

            for (let i = 1 ; i < 7; i++) {
                document.getElementById('song-' + i).innerHTML = '';
            }

            for (let i = 1; i < spotifyData.tracks.items.length + 1; i++) {
                let song = spotifyData.tracks.items[i - 1];
                let card = generateCard({
                    title: song.name,
                    artist: song.artists[0].name,
                    album: song.album.name,
                    art: song.album.images[0].url,
                    id: song.id,
                    explicit: song.explicit,
                    token
                });
                card.id
                card.id = 'fade-in-' + i; // order for fade in
                document.getElementById('song-' + i).appendChild(card);
            }
        })();
    });
});