
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

    removeLastSong() {
        if (this.chansons.length > 0) {
            this.chansons.pop();
        }
    }

    addSongAtStart(song) {
        this.chansons.unshift(song);
    }

    removeFirstSong() {
        if (this.chansons.length > 0) {
            this.chansons.shift();
        }
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


export default Album;