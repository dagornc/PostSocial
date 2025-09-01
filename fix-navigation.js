// Correction de la Navigation - LinkedINPost
// Ce fichier corrige le problème du bouton "Créer un compte" qui ne fonctionne pas

console.log('🔧 Chargement des corrections de navigation...');

// Attendre que l'application soit chargée
function waitForApp() {
    return new Promise((resolve) => {
        const checkApp = () => {
            if (window.app && typeof window.app.showSignupPage === 'function') {
                console.log('✅ Application trouvée, application des corrections...');
                resolve(window.app);
            } else {
                console.log('⏳ Application pas encore chargée, nouvelle tentative dans 100ms...');
                setTimeout(checkApp, 100);
            }
        };
        checkApp();
    });
}

// Corriger la navigation
async function fixNavigation() {
    try {
        const app = await waitForApp();
        console.log('🔧 Application des corrections de navigation...');
        
        // Correction 1: S'assurer que showSignupPage utilise le cache d'éléments
        const originalShowSignupPage = app.showSignupPage;
        app.showSignupPage = function() {
            console.log('📝 showSignupPage corrigée appelée');
            
            // Appeler la méthode originale
            originalShowSignupPage.call(this);
            
            // Correction supplémentaire: utiliser le cache d'éléments
            if (this.elements && this.elements.loginEmail && this.elements.signupEmail) {
                const loginEmail = this.elements.loginEmail.value;
                const loginPassword = this.elements.loginPassword?.value;
                
                if (loginEmail && loginPassword) {
                    this.elements.signupEmail.value = loginEmail;
                    this.elements.signupPassword.value = loginPassword;
                    console.log('✅ Formulaire pré-rempli via le cache d\'éléments');
                }
            }
        };
        
        // Correction 2: S'assurer que les event listeners sont correctement attachés
        const showSignupLink = document.getElementById('showSignupLink');
        if (showSignupLink) {
            // Supprimer les anciens event listeners
            const newLink = showSignupLink.cloneNode(true);
            showSignupLink.parentNode.replaceChild(newLink, showSignupLink);
            
            // Ajouter le nouvel event listener
            newLink.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('🔗 Clic sur "Créer un compte" détecté');
                
                if (app && typeof app.showSignupPage === 'function') {
                    app.showSignupPage();
                } else {
                    console.error('❌ Méthode showSignupPage non disponible');
                    // Fallback: navigation manuelle
                    navigateToSignupManually();
                }
            });
            
            console.log('✅ Event listener corrigé pour "Créer un compte"');
        }
        
        // Correction 3: Fallback de navigation manuelle
        window.navigateToSignupManually = function() {
            console.log('🔄 Navigation manuelle vers l\'inscription...');
            
            const loginPage = document.getElementById('loginPage');
            const signupPage = document.getElementById('signupPage');
            
            if (loginPage && signupPage) {
                // Masquer la page de connexion
                loginPage.style.display = 'none';
                loginPage.classList.remove('active');
                
                // Afficher la page d'inscription
                signupPage.style.display = 'block';
                signupPage.classList.add('active');
                
                // Pré-remplir le formulaire si possible
                const loginEmail = document.getElementById('loginEmail')?.value;
                const loginPassword = document.getElementById('loginPassword')?.value;
                
                if (loginEmail && loginPassword) {
                    const signupEmail = document.getElementById('signupEmail');
                    const signupPassword = document.getElementById('signupPassword');
                    
                    if (signupEmail && signupPassword) {
                        signupEmail.value = loginEmail;
                        signupPassword.value = loginPassword;
                        console.log('✅ Formulaire pré-rempli manuellement');
                    }
                }
                
                console.log('✅ Navigation manuelle réussie');
            } else {
                console.error('❌ Pages d\'authentification non trouvées');
            }
        };
        
        // Correction 4: Vérifier que tous les éléments nécessaires sont dans le cache
        if (app.elements) {
            const requiredElements = ['loginEmail', 'signupEmail', 'signupPassword', 'showSignupLink'];
            const missingElements = requiredElements.filter(id => !app.elements[id]);
            
            if (missingElements.length > 0) {
                console.warn('⚠️ Éléments manquants dans le cache:', missingElements);
                
                // Ajouter les éléments manquants au cache
                missingElements.forEach(id => {
                    const element = document.getElementById(id);
                    if (element) {
                        app.elements[id] = element;
                        console.log(`✅ Élément ${id} ajouté au cache`);
                    }
                });
            }
        }
        
        console.log('✅ Corrections de navigation appliquées avec succès');
        
        // Test de la correction
        setTimeout(() => {
            testNavigationFix();
        }, 1000);
        
    } catch (error) {
        console.error('❌ Erreur lors de l\'application des corrections:', error);
    }
}

// Test de la correction
function testNavigationFix() {
    console.log('🧪 Test de la correction de navigation...');
    
    const showSignupLink = document.getElementById('showSignupLink');
    if (showSignupLink) {
        console.log('✅ Lien "Créer un compte" trouvé');
        
        // Vérifier que l'event listener est attaché
        const events = getEventListeners(showSignupLink);
        if (events && events.click && events.click.length > 0) {
            console.log('✅ Event listener attaché au lien');
        } else {
            console.warn('⚠️ Event listener non détecté, application d\'une correction d\'urgence');
            applyEmergencyFix();
        }
    } else {
        console.error('❌ Lien "Créer un compte" non trouvé');
    }
}

// Correction d'urgence si nécessaire
function applyEmergencyFix() {
    console.log('🚨 Application d\'une correction d\'urgence...');
    
    const showSignupLink = document.getElementById('showSignupLink');
    if (showSignupLink) {
        // Supprimer tous les event listeners existants
        const newLink = showSignupLink.cloneNode(true);
        showSignupLink.parentNode.replaceChild(newLink, showSignupLink);
        
        // Ajouter un event listener simple
        newLink.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('🔗 Clic détecté, navigation d\'urgence...');
            navigateToSignupManually();
        });
        
        console.log('✅ Correction d\'urgence appliquée');
    }
}

// Fonction utilitaire pour détecter les event listeners (approximative)
function getEventListeners(element) {
    // Cette fonction est approximative car les vrais event listeners ne sont pas accessibles
    // On vérifie juste que l'élément existe et est cliquable
    return {
        click: element.onclick ? [element.onclick] : []
    };
}

// Démarrer les corrections
console.log('🚀 Démarrage des corrections de navigation...');
fixNavigation();

// Exporter les fonctions pour debugging
window.navigationFix = {
    fixNavigation,
    testNavigationFix,
    applyEmergencyFix,
    navigateToSignupManually: window.navigateToSignupManually
};

console.log('🔧 Corrections de navigation chargées et prêtes');
