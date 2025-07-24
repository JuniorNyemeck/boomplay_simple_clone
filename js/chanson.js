
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


export default Chanson;