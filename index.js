class Playlist {
    constructor(nom, description) {
        this.nom = nom; // Nom de la playlist
        this.description = description; // Description de la playlist
        this.chansons = [];

        alert(`Playlist "${this.nom}" créée avec succès!`);
    }

    addSong(song) {
        this.chansons.push(song);
    }

    removeSong(song) {
        const index = this.chansons.indexOf(song);
        if (index > -1) {
            this.chansons.splice(index, 1);
        }
    }

    getChansons() {
        return this.chansons;
    }
}

class Genre{

    constructor(name, id) {
        this.name = name;
        this.id = id;
    }
    
    getName() {
        return this.name;
    }
    
    getId() {
        return this.id;
    }
}

class Chanson{

    constructor(titre, artiste, genre, url, duree, album, dateSortie) {
        this.titre = titre;
        this.artiste = artiste;
        this.duree = duree; // Durée en secondes
        this.genre = genre;
        this.url = url; // URL de la chanson
        this.album = album; // Référence à l'album auquel la chanson appartient
        this.dateSortie = dateSortie; // Date de sortie de la chanson
    }

    getDetails() {
        return {
            titre: this.titre,
            artiste: this.artiste,
            duree: this.duree,
            genre: this.genre,
            url: this.url,
            album: this.album,
            dateSortie: this.dateSortie
        };
    }


}

class Artiste {

    constructor(nom, genre, pays, bio, photoUrl) {
        this.nom = nom;
        this.genre = genre;
        this.pays = pays;
        this.bio = bio;
        this.photoUrl = photoUrl;
        this.albums = [];
        this.singles = [];
    }

    ajouterAlbum(album) {
        this.albums.push(album);
    }

    ajouterSingle(single) {
        this.singles.push(single);
    }

    getNombreAlbums() {
        return this.albums.length;
    }

    getNombreSingles() {
        return this.singles.length;
    }
    getDetails() {
        return {
            nom: this.nom,
            genre: this.genre,
            pays: this.pays,
            bio: this.bio,
            photoUrl: this.photoUrl,
            albums: this.albums,
            singles: this.singles
        };
    }
}

class Album{

    constructor(titre, artiste, dateSortie, genre, pochetteUrl) {

        this.titre = '';
        this.artiste = '';
        this.dateSortie = '';
        this.genre = '';
        this.pochetteUrl = '';
        this.chansons = [];
    }


    ajouterChanson(chanson) {
        this.chansons.push(chanson);
    }
    getNombreChansons() {
        return this.chansons.length;
    }

    getDuree(){

        let duree = 0;

        let i = 0;

        // Calculer la durée totale de l'album
        // en additionnant la durée de chaque chanson

        for (i = 0; i < this.chansons.length; i++) {
            
            duree = duree + this.chansons[i].duree;
            
        }

        return duree;

    }


}





















const btnCreatePlaylist = document.getElementById('save-playlist');

/* 

function createPlaylist() {

    const nom = document.getElementById('playlist-name').value;
    const description = document.getElementById('playlist-description').value;

    if (nom != "" && description != ""){

        const newPlaylist = new Playlist(nom, description);

        // Assuming there's a function to save the playlist, e.g., savePlaylist(newPlaylist);
    }
    else{
        if(nom == ""){
            alert("Le nom de la playlist ne peut pas être vide.");
        }
        if(description == ""){
            alert("La description de la playlist ne peut pas être vide.");
        }
    }
}

*/


btnCreatePlaylist.addEventListener('click', () => {

    const nom = document.getElementById('playlist-name').value;
    const description = document.getElementById('playlist-description').value;

    if (nom != "" && description != ""){

        const newPlaylist = new Playlist(nom, description);

        // Assuming there's a function to save the playlist, e.g., savePlaylist(newPlaylist);
    }
    else{
        if(nom == ""){
            alert("Le nom de la playlist ne peut pas être vide.");
        }
        if(description == ""){
            alert("La description de la playlist ne peut pas être vide.");
        }
    }

});

const tableBtn = document.querySelectorAll('.table-btn');
