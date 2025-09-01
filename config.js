// Configuration de l'application LinkedINPost
// Ce fichier contient les variables de configuration et les clés API

const config = {
    // Configuration Supabase
    supabase: {
        url: 'https://xrypwaibendenjgqgazv.supabase.co',
        anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyeXB3YWliZW5kZW5qZ3FnYXp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1NjQyNjgsImV4cCI6MjA3MjE0MDI2OH0.WM3Bikffw8bVNzGWZDDBQwuQag8JtI45ufYyFE3stQQ'
    },
    
    // Configuration Ollama
    ollama: {
        baseUrl: 'http://82.29.172.185:11434',
        timeout: 300000, // 300 secondes (5 minutes)
        retryAttempts: 3
    },
    
    // Configuration de l'application
    app: {
        name: 'LinkedINPost',
        version: '1.0.0',
        defaultLanguage: 'fr',
        defaultTheme: 'light',
        maxPostLength: 1300,
        autoSaveInterval: 30000 // 30 secondes
    },
    
    // Messages d'erreur
    errorMessages: {
        fr: {
            networkError: 'Erreur de connexion réseau. Vérifiez votre connexion internet.',
            supabaseError: 'Erreur de service. Veuillez réessayer plus tard.',
            ollamaError: 'Erreur de génération IA. Le serveur est temporairement indisponible.',
            authError: 'Erreur d\'authentification. Vérifiez vos identifiants.',
            validationError: 'Veuillez remplir tous les champs obligatoires.',
            timeoutError: 'Délai d\'attente dépassé. Veuillez réessayer.',
            unknownError: 'Une erreur inattendue s\'est produite. Veuillez rafraîchir la page.'
        },
        en: {
            networkError: 'Network connection error. Check your internet connection.',
            supabaseError: 'Service error. Please try again later.',
            ollamaError: 'AI generation error. Server is temporarily unavailable.',
            authError: 'Authentication error. Check your credentials.',
            validationError: 'Please fill in all required fields.',
            timeoutError: 'Request timeout. Please try again.',
            unknownError: 'An unexpected error occurred. Please refresh the page.'
        }
    },
    
    // Validation des formulaires
    validation: {
        password: {
            minLength: 6,
            requireSpecialChar: false,
            requireNumber: false
        },
        email: {
            requireConfirmation: true
        }
    },
    
    // Configuration des notifications
    notifications: {
        duration: 5000, // 5 secondes
        position: 'top-right',
        maxVisible: 3
    }
};

// Fonction utilitaire pour obtenir la configuration selon la langue
function getConfig(language = 'fr') {
    return {
        ...config,
        errorMessages: config.errorMessages[language] || config.errorMessages.fr
    };
}

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { config, getConfig };
} else {
    // Pour utilisation dans le navigateur
    window.LinkedINPostConfig = { config, getConfig };
}
