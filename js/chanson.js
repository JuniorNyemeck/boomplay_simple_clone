
class Chanson{


    #titre;
    #artiste;
    #genre;
    #url;
    #duree;
    #album;
    #dateSortie;

    get titre() {
        return this.#titre;
    }
    set titre(value) {
        this.#titre = value;
    }

    get artiste() {
        return this.#artiste;
    }
    set artiste(value) {
        this.#artiste = value;
    }

    get genre() {
        return this.#genre;
    }
    set genre(value) {
        this.#genre = value;
    }

    get url() {
        return this.#url;
    }
    set url(value) {
        this.#url = value;
    }

    get duree() {
        return this.#duree;
    }
    set duree(value) {
        this.#duree = value;
    }

    get album() {
        return this.#album;
    }
    set album(value) {
        this.#album = value;
    }

    get dateSortie() {
        return this.#dateSortie;
    }
    set dateSortie(value) {
        this.#dateSortie = value;
    }


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


export default Chanson;