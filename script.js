// Navigation entre les pages
document.addEventListener('DOMContentLoaded', function() {
    // Éléments de navigation
    const sidebarNavItems = document.querySelectorAll('.sidebar .nav-item');
    const bottomNavItems = document.querySelectorAll('.bottom-nav .nav-item');
    const pages = document.querySelectorAll('.page');
    
    // Éléments des modales
    const playlistModal = document.getElementById('playlist-modal');
    const addToPlaylistModal = document.getElementById('add-to-playlist-modal');
    const createPlaylistBtn = document.getElementById('create-playlist-btn');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const cancelPlaylistBtn = document.getElementById('cancel-playlist');
    const savePlaylistBtn = document.getElementById('save-playlist');
    const cancelAddBtn = document.getElementById('cancel-add');
    const confirmAddBtn = document.getElementById('confirm-add');
    
    // Variables pour la gestion des playlists
    let currentSong = null;
    let editingPlaylist = null;
    let playlists = [
        { id: 1, name: 'Mes favoris', description: 'Mes chansons préférées', songs: 45, isPrivate: true },
        { id: 2, name: 'Workout', description: 'Musique pour le sport', songs: 32, isPrivate: false },
        { id: 3, name: 'Chill Night', description: 'Détente du soir', songs: 28, isPrivate: true },
        { id: 4, name: 'Rap Français', description: 'Le meilleur du rap français', songs: 67, isPrivate: false }
    ];
    
    // Fonction pour changer de page
    function switchPage(targetPage) {
        // Masquer toutes les pages
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        // Afficher la page cible
        const targetPageElement = document.getElementById(targetPage);
        if (targetPageElement) {
            targetPageElement.classList.add('active');
        }
        
        // Mettre à jour les éléments de navigation actifs
        [...sidebarNavItems, ...bottomNavItems].forEach(item => {
            item.classList.remove('active');
            if (item.dataset.page === targetPage) {
                item.classList.add('active');
            }
        });
    }
    
    // Gestionnaires d'événements pour la navigation
    [...sidebarNavItems, ...bottomNavItems].forEach(item => {
        item.addEventListener('click', function() {
            const targetPage = this.dataset.page;
            switchPage(targetPage);
        });
    });
    
    // Gestion des onglets
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Retirer la classe active de tous les onglets du même groupe
            const tabGroup = this.parentElement;
            const groupButtons = tabGroup.querySelectorAll('.tab-btn');
            groupButtons.forEach(btn => btn.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            // Filtrer le contenu selon l'onglet sélectionné
            filterLibraryContent(this.textContent.trim());
        });
    });
    
    // Fonction pour filtrer le contenu de la bibliothèque
    function filterLibraryContent(tabName) {
        const libraryContent = document.querySelector('.library-content');
        const playlistsSection = document.querySelector('.section');
        
        switch(tabName) {
            case 'Playlists':
                libraryContent.style.display = 'none';
                playlistsSection.style.display = 'block';
                break;
            case 'Artistes':
                // Ici on pourrait afficher une vue groupée par artistes
                libraryContent.style.display = 'block';
                playlistsSection.style.display = 'none';
                break;
            default:
                libraryContent.style.display = 'block';
                playlistsSection.style.display = 'block';
        }
    }
    
    // Gestion du tri
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortLibraryItems(this.value);
        });
    }
    
    // Fonction pour trier les éléments de la bibliothèque
    function sortLibraryItems(sortBy) {
        const libraryContent = document.querySelector('.library-content');
        const items = Array.from(libraryContent.querySelectorAll('.library-item'));
        
        items.sort((a, b) => {
            const titleA = a.querySelector('h4').textContent;
            const titleB = b.querySelector('h4').textContent;
            const artistA = a.querySelector('p').textContent;
            const artistB = b.querySelector('p').textContent;
            
            switch(sortBy) {
                case 'title':
                    return titleA.localeCompare(titleB);
                case 'artist':
                    return artistA.localeCompare(artistB);
                case 'plays':
                    const playsA = parseInt(a.querySelector('.play-count').textContent.match(/\d+/)[0]);
                    const playsB = parseInt(b.querySelector('.play-count').textContent.match(/\d+/)[0]);
                    return playsB - playsA;
                default:
                    return 0;
            }
        });
        
        // Réorganiser les éléments
        items.forEach(item => libraryContent.appendChild(item));
    }
    
    // Gestion des vues (liste/grille)
    const viewBtns = document.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const libraryContent = document.querySelector('.library-content');
            if (this.dataset.view === 'grid') {
                libraryContent.classList.add('grid-view');
            } else {
                libraryContent.classList.remove('grid-view');
            }
        });
    });
    
    // Gestion des boutons de lecture
    const playButtons = document.querySelectorAll('.play-btn, .play-btn-small');
    playButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Animation du bouton
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Ici, vous pourriez ajouter la logique de lecture audio
            console.log('Lecture de la chanson...');
            showNotification('Lecture en cours...', 'info');
        });
    });
    
    // Gestion des boutons "J'aime"
    const likeButtons = document.querySelectorAll('.like-btn');
    likeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Toggle de l'état "aimé"
            this.classList.toggle('active');
            
            // Animation
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            const isLiked = this.classList.contains('active');
            showNotification(isLiked ? 'Ajouté aux favoris ♥' : 'Retiré des favoris', isLiked ? 'success' : 'info');
        });
    });
    
    // Gestion des boutons "Suivre"
    const followButtons = document.querySelectorAll('.follow-btn');
    followButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (this.textContent === 'Suivre') {
                this.textContent = 'Suivi ✓';
                this.style.backgroundColor = 'var(--hover-color)';
                showNotification('Artiste suivi avec succès!', 'success');
            } else {
                this.textContent = 'Suivre';
                this.style.backgroundColor = 'var(--accent-color)';
                showNotification('Artiste retiré des suivis', 'info');
            }
        });
    });
    
    // Gestion des boutons "Ajouter à une playlist"
    const addToPlaylistBtns = document.querySelectorAll('.add-to-playlist');
    addToPlaylistBtns.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Récupérer les informations de la chanson
            const songCard = this.closest('.library-item');
            const title = songCard.querySelector('h4').textContent;
            const artist = songCard.querySelector('p').textContent;
            
            currentSong = { title, artist };
            openModal(addToPlaylistModal);
        });
    });
    
    // Gestion des boutons d'édition de playlist
    const editPlaylistBtns = document.querySelectorAll('.edit-playlist');
    editPlaylistBtns.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const playlistItem = this.closest('.playlist-item');
            const playlistName = playlistItem.querySelector('h4').textContent;
            const playlist = playlists.find(p => p.name === playlistName);
            
            if (playlist) {
                editingPlaylist = playlist;
                document.getElementById('modal-title').textContent = 'Modifier la playlist';
                document.getElementById('playlist-name').value = playlist.name;
                document.getElementById('playlist-description').value = playlist.description;
                document.querySelector(`input[name="visibility"][value="${playlist.isPrivate ? 'private' : 'public'}"]`).checked = true;
                document.getElementById('save-playlist').textContent = 'Modifier';
                openModal(playlistModal);
            }
        });
    });
    
    // Gestion des boutons de suppression de playlist
    const deletePlaylistBtns = document.querySelectorAll('.delete-playlist');
    deletePlaylistBtns.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const playlistItem = this.closest('.playlist-item');
            const playlistName = playlistItem.querySelector('h4').textContent;
            
            if (confirm(`Êtes-vous sûr de vouloir supprimer la playlist "${playlistName}" ?`)) {
                playlistItem.remove();
                playlists = playlists.filter(p => p.name !== playlistName);
                showNotification('Playlist supprimée', 'success');
            }
        });
    });
    
    // Gestion de la création de playlist
    if (createPlaylistBtn) {
        createPlaylistBtn.addEventListener('click', function() {
            resetPlaylistModal();
            openModal(playlistModal);
        });
    }
    
    // Fonction pour réinitialiser le modal de playlist
    function resetPlaylistModal() {
        editingPlaylist = null;
        document.getElementById('modal-title').textContent = 'Créer une nouvelle playlist';
        document.getElementById('playlist-name').value = '';
        document.getElementById('playlist-description').value = '';
        document.querySelector('input[name="visibility"][value="private"]').checked = true;
        document.getElementById('save-playlist').textContent = 'Créer';
    }
    
    // Gestion des modales
    function openModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Fermeture des modales
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            closeModal(this.closest('.modal'));
        });
    });
    
    if (cancelPlaylistBtn) {
        cancelPlaylistBtn.addEventListener('click', function() {
            closeModal(playlistModal);
        });
    }
    
    if (cancelAddBtn) {
        cancelAddBtn.addEventListener('click', function() {
            closeModal(addToPlaylistModal);
        });
    }
    
    // Sauvegarde de playlist
    if (savePlaylistBtn) {
        savePlaylistBtn.addEventListener('click', function() {
            const name = document.getElementById('playlist-name').value.trim();
            const description = document.getElementById('playlist-description').value.trim();
            const isPrivate = document.querySelector('input[name="visibility"]:checked').value === 'private';
            
            if (!name) {
                showNotification('Veuillez entrer un nom pour la playlist', 'warning');
                return;
            }
            
            if (editingPlaylist) {
                // Modification
                editingPlaylist.name = name;
                editingPlaylist.description = description;
                editingPlaylist.isPrivate = isPrivate;
                updatePlaylistInDOM(editingPlaylist);
                showNotification('Playlist modifiée avec succès!', 'success');
            } else {
                // Création
                const newPlaylist = {
                    id: Date.now(),
                    name,
                    description,
                    songs: 0,
                    isPrivate
                };
                playlists.push(newPlaylist);
                addPlaylistToDOM(newPlaylist);
                showNotification('Playlist créée avec succès!', 'success');
            }
            
            closeModal(playlistModal);
        });
    }
    
    // Confirmation d'ajout à une playlist
    if (confirmAddBtn) {
        confirmAddBtn.addEventListener('click', function() {
            const selectedPlaylists = document.querySelectorAll('.playlist-option input[type="checkbox"]:checked');
            
            if (selectedPlaylists.length === 0) {
                showNotification('Veuillez sélectionner au moins une playlist', 'warning');
                return;
            }
            
            selectedPlaylists.forEach(checkbox => {
                const playlistName = checkbox.nextElementSibling.textContent;
                console.log(`Ajout de "${currentSong.title}" à la playlist "${playlistName}"`);
            });
            
            showNotification(`Chanson ajoutée à ${selectedPlaylists.length} playlist(s)`, 'success');
            closeModal(addToPlaylistModal);
            
            // Décocher toutes les cases
            selectedPlaylists.forEach(checkbox => checkbox.checked = false);
        });
    }
    
    // Fonction pour ajouter une playlist au DOM
    function addPlaylistToDOM(playlist) {
        const playlistsContainer = document.querySelector('.user-playlists');
        const playlistElement = document.createElement('div');
        playlistElement.className = 'playlist-item';
        playlistElement.innerHTML = `
            <div class="playlist-image">
                <div class="placeholder-image">♫</div>
            </div>
            <div class="playlist-info">
                <h4>${playlist.name}</h4>
                <p>${playlist.songs} titres • Créée par vous</p>
            </div>
            <div class="playlist-actions">
                <button class="action-btn edit-playlist" title="Modifier">✎</button>
                <button class="action-btn delete-playlist" title="Supprimer">×</button>
            </div>
        `;
        
        playlistsContainer.appendChild(playlistElement);
        
        // Ajouter les événements aux nouveaux boutons
        const editBtn = playlistElement.querySelector('.edit-playlist');
        const deleteBtn = playlistElement.querySelector('.delete-playlist');
        
        editBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            editingPlaylist = playlist;
            document.getElementById('modal-title').textContent = 'Modifier la playlist';
            document.getElementById('playlist-name').value = playlist.name;
            document.getElementById('playlist-description').value = playlist.description;
            document.querySelector(`input[name="visibility"][value="${playlist.isPrivate ? 'private' : 'public'}"]`).checked = true;
            document.getElementById('save-playlist').textContent = 'Modifier';
            openModal(playlistModal);
        });
        
        deleteBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (confirm(`Êtes-vous sûr de vouloir supprimer la playlist "${playlist.name}" ?`)) {
                playlistElement.remove();
                playlists = playlists.filter(p => p.id !== playlist.id);
                showNotification('Playlist supprimée', 'success');
            }
        });
    }
    
    // Fonction pour mettre à jour une playlist dans le DOM
    function updatePlaylistInDOM(playlist) {
        const playlistItems = document.querySelectorAll('.playlist-item');
        playlistItems.forEach(item => {
            const nameElement = item.querySelector('h4');
            if (nameElement && playlists.find(p => p.name === nameElement.textContent && p.id === playlist.id)) {
                nameElement.textContent = playlist.name;
                const descElement = item.querySelector('p');
                if (descElement) {
                    descElement.textContent = `${playlist.songs} titres • Créée par vous`;
                }
            }
        });
    }
    
    // Fermeture des modales en cliquant à l'extérieur
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
    
    // Gestion des cartes interactives
    const cards = document.querySelectorAll('.song-card, .playlist-card, .artist-card, .genre-card, .library-item, .playlist-item');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            // Animation de sélection
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            console.log('Carte sélectionnée:', this);
        });
    });
    
    // Gestion de la barre de recherche
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            console.log('Recherche:', searchTerm);
            
            // Ici, vous pourriez implémenter la logique de recherche
            // et filtrer les résultats en temps réel
            if (searchTerm.length > 2) {
                showNotification(`Recherche: "${searchTerm}"`, 'info');
            }
        });
    }
    
    // Animations au survol des éléments interactifs
    const interactiveElements = document.querySelectorAll('button, .nav-item, .song-card, .playlist-card, .artist-card, .genre-card');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transition = 'all 0.3s ease';
            }
        });
    });
    
    // Gestion du scroll pour les effets visuels
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-banner, .page-banner');
        
        parallaxElements.forEach(element => {
            const speed = scrolled * 0.2;
            element.style.transform = `translateY(${speed}px)`;
        });
    });
    
    // Gestion responsive - fermeture automatique de la sidebar sur mobile
    function handleResize() {
        const sidebar = document.querySelector('.sidebar');
        const bottomNav = document.querySelector('.bottom-nav');
        
        if (window.innerWidth <= 768) {
            sidebar.style.transform = 'translateX(-100%)';
            bottomNav.style.display = 'flex';
        } else {
            sidebar.style.transform = 'translateX(0)';
            bottomNav.style.display = 'none';
        }
    }
    
    // Appeler handleResize au chargement et au redimensionnement
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Simuler le chargement de données
    function simulateDataLoading() {
        const loadingElements = document.querySelectorAll('.placeholder-image');
        
        loadingElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '0.5';
                setTimeout(() => {
                    element.style.opacity = '1';
                }, 200);
            }, index * 100);
        });
    }
    
    // Appeler la simulation de chargement après un délai
    setTimeout(simulateDataLoading, 500);
    
    // Fonction pour créer des notifications
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
        const colors = {
            info: 'var(--accent-color)',
            success: 'var(--success-color)',
            warning: 'var(--warning-color)',
            error: 'var(--danger-color)'
        };
        
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type] || colors.info};
            color: var(--text-primary);
            padding: var(--spacing-md);
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-medium);
            z-index: 9999;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            font-weight: 500;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        // Animation d'entrée
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Suppression automatique
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // Exemple d'utilisation des notifications
    setTimeout(() => {
        showNotification('Bienvenue sur Boomplay! ♪', 'success');
    }, 1000);
});

// Fonctions utilitaires
function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Gestion des préférences utilisateur
const UserPreferences = {
    theme: 'dark',
    language: 'fr',
    autoplay: true,
    sortBy: 'recent',
    viewMode: 'list',
    
    save() {
        localStorage.setItem('boomplay-preferences', JSON.stringify(this));
    },
    
    load() {
        const saved = localStorage.getItem('boomplay-preferences');
        if (saved) {
            Object.assign(this, JSON.parse(saved));
        }
        
        // Appliquer les préférences chargées
        this.apply();
    },
    
    apply() {
        // Appliquer le mode de tri
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.value = this.sortBy;
        }
        
        // Appliquer le mode d'affichage
        const viewBtns = document.querySelectorAll('.view-btn');
        viewBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === this.viewMode);
        });
    }
};

// Charger les préférences au démarrage
UserPreferences.load();