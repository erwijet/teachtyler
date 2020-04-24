/**
 * @param {Object} data The specified song information to populate the card node
 * @param {string} data.art The url to the album artwork of the song
 * @param {string} data.title The title of the song
 * @param {string} data.artist The name of the artist
 * @param {string} data.album Album information
 * @param {string} data.id The spotify track id
 * @param {string} data.token The spotify API token
 */
function generateCard(data) {
    let card = document.createElement('div');
    card.classList.add('card', 'fade-in-animation');

    let cardimage = document.createElement('div');
    cardimage.classList.add('card-image');

    let figure = document.createElement('figure');
    figure.classList.add('image', 'is-sqaure');

    let img = document.createElement('img');
    img.setAttribute('src', data.art);

    figure.appendChild(img);
    cardimage.appendChild(figure);
    card.appendChild(cardimage);

    let cardcontent = document.createElement('div');
    cardcontent.classList.add('card-content');

    let media = document.createElement('div');
    media.classList.add('media');

    let mediacontent = document.createElement('div');
    mediacontent.classList.add('media-content');

    let name = document.createElement('p');
    name.classList.add('title', 'is-4');
    name.innerHTML = data.title;

    let artist = document.createElement('p');
    artist.classList.add('title', 'is-6');
    artist.innerHTML = data.artist;

    let album = document.createElement('p');
    album.classList.add('title', 'is-6');
    album.innerHTML = data.album;

    mediacontent.appendChild(name);
    mediacontent.appendChild(artist);
    mediacontent.appendChild(album);

    media.appendChild(mediacontent);
    cardcontent.appendChild(media);
    card.appendChild(cardcontent);

    let footer = document.createElement('footer');
    footer.classList.add('card-footer');

    let trainbutton = document.createElement('a');
    trainbutton.classList.add('card-footer-item');
    console.log(`/train?id=${data.id}&token=${data.token}`);
    trainbutton.setAttribute('href', `/train?id=${data.id}&token=${data.token}`);
    trainbutton.innerText = "Train";

    footer.appendChild(trainbutton);
    card.append(footer);

    return card

    /*
    .card
        .card-image
            figure.image.is-square
                img(src="https://i.scdn.co/image/ab67616d0000b2734ca3fb4517ff722918877460")
        .card-content
            .media
                .media-content
                    p.title.is-4 Come Get Her
                    p.subtitle.is-6 Rae Sremmurd
                    p.subtitle.is-6 SremmLife
        footer.card-footer
            a.card-footer-item(href='/review/8723450982345jkjh234') Use
            a.card-footer-item(href='open.spotify.com') View on Spotify
    */
}