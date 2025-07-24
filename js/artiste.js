class Artiste {

    #nom;
    #genre;
    #pays;
    #bio;
    #photoUrl;
    #albums;
    #singles;

    getNom() {
        return this.nom;
    }

    getGenre() {
        return this.genre;
    }

    setGenre(genre) {
        if(genre != 'H' && genre != 'F'){
            alert("error");
        }
        else{
            this.genre = genre;
        }
        
    }

    getPays() {
        return this.pays;
    }

    setPays(pays) {
        this.pays = pays;
    }

    getBio() {
        return this.bio;
    }

    setBio(bio) {
        this.bio = bio;
    }

    getPhotoUrl() {
        return this.photoUrl;
    }

    setPhotoUrl(photoUrl) {
        this.photoUrl = photoUrl;
    }

    getAlbums() {
        return this.albums;
    }

    setAlbums(albums) {
        this.albums = albums;
    }

    getSingles() {
        return this.singles;
    }

    setSingles(singles) {
        this.singles = singles;
    }

    setNom(nom) {
        this.nom = nom;
    }
    

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