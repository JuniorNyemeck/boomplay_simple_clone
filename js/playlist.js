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
        if (index != -1) {
            this.chansons.splice(index, 1);
        }
    }

    getChansons() {
        return this.chansons;
    }

    getNbChansons() {
        return this.chansons.length;
    }
}

export default Playlist;