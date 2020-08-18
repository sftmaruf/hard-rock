let songSearchBar;

//click on hard-rock logo and refresh the page
function pageReload() {
    history.go(0);
}
//fetch api for songs details
function searchBYSongName() {
    songSearchBar = document.getElementById("songs-search-bar").value;

    fetch(`https://api.lyrics.ovh/suggest/${songSearchBar}`)
        .then(res => res.json())
        .then(values => {
            // values.data.map(fetchingSongData);
            // songInfo(values[0].data);
            fetchingSongData(values);
        });
}

//fetching songs details/info and show them list wise
function fetchingSongData(songInfo) {
    for (let i = 0; i < songInfo.data.length; i++) {
        const songName = document.getElementById(`song-name-${i}`);
        const artistName = document.getElementById(`artist-name-${i}`);
        songName.innerHTML = songInfo.data[i].title;
        artistName.innerText = songInfo.data[i].artist.name;

        if (i == 9) {
            break;
        }
    }

    document.getElementById("display-searched-result").style.display = 'block';
}

//assign lyrics based on song title and artist name
function lyricsSync(btnIndex) {
    const songName = document.getElementById(`song-name-${btnIndex}`).innerHTML;
    const artistName = document.getElementById(`artist-name-${btnIndex}`).innerText;

    fetch(`https://api.lyrics.ovh/v1/${artistName}/${songName}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("display-name-of-lyrics").innerText = songName;
            if (data.lyrics == undefined) {
                document.getElementById("display-lyrics").innerText = "Lyrics isn't available";
            } else {
                document.getElementById("display-lyrics").innerText = data.lyrics;
            }
        });
}