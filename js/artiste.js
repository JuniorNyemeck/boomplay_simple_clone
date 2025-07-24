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

export default Artiste;