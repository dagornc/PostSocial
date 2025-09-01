// Utilitaires pour l'application LinkedINPost
// Gestion des erreurs, validation et fonctions communes

class ErrorHandler {
    constructor(config) {
        this.config = config;
        this.errorCount = 0;
        this.maxErrors = 5;
    }

    // Gestion centralisée des erreurs
    handleError(error, context = 'unknown', language = 'fr') {
        console.error(`[${context}] Erreur:`, error);
        
        this.errorCount++;
        
        // Limiter le nombre d'erreurs affichées
        if (this.errorCount > this.maxErrors) {
            console.warn('Trop d\'erreurs, arrêt de l\'affichage des notifications');
            return;
        }

        const errorMessage = this.getErrorMessage(error, context, language);
        this.showErrorNotification(errorMessage, language);
        
        // Log pour debugging
        this.logError(error, context);
    }

    // Obtenir le message d'erreur approprié
    getErrorMessage(error, context, language) {
        const messages = this.config.errorMessages[language] || this.config.errorMessages.fr;
        
        if (error.name === 'AbortError' || error.message?.includes('timeout')) {
            return messages.timeoutError;
        }
        
        if (error.message?.includes('network') || error.message?.includes('fetch')) {
            return messages.networkError;
        }
        
        if (error.message?.includes('Invalid login credentials')) {
            return messages.authError;
        }
        
        if (error.message?.includes('validation')) {
            return messages.validationError;
        }
        
        // Erreurs spécifiques au contexte
        switch (context) {
            case 'supabase':
                return messages.supabaseError;
            case 'ollama':
                return messages.ollamaError;
            case 'auth':
                return messages.authError;
            default:
                return messages.unknownError;
        }
    }

    // Afficher la notification d'erreur
    showErrorNotification(message, language) {
        // Créer une notification d'erreur
        const notification = document.createElement('div');
        notification.className = 'error-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--error-color);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            max-width: 400px;
            animation: slideInRight 0.3s ease-out;
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span style="font-size: 1.2rem;">❌</span>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-suppression
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease-out';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Logger l'erreur pour debugging
    logError(error, context) {
        const errorLog = {
            timestamp: new Date().toISOString(),
            context,
            message: error.message,
            stack: error.stack,
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        
        console.group(`🚨 Erreur ${context}`);
        console.error('Détails:', errorLog);
        console.groupEnd();
        
        // En production, envoyer à un service de logging
        if (process.env.NODE_ENV === 'production') {
            this.sendErrorToLoggingService(errorLog);
        }
    }

    // Envoyer l'erreur à un service de logging (en production)
    sendErrorToLoggingService(errorLog) {
        // Implémentation pour envoyer les erreurs à un service externe
        // Par exemple: Sentry, LogRocket, etc.
        console.log('📤 Envoi de l\'erreur au service de logging...');
    }
}

class Validator {
    constructor(config) {
        this.config = config;
    }

    // Valider un email
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Valider un mot de passe
    validatePassword(password) {
        const { minLength, requireSpecialChar, requireNumber } = this.config.validation.password;
        
        if (password.length < minLength) {
            return { valid: false, message: `Le mot de passe doit contenir au moins ${minLength} caractères` };
        }
        
        if (requireSpecialChar && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return { valid: false, message: 'Le mot de passe doit contenir au moins un caractère spécial' };
        }
        
        if (requireNumber && !/\d/.test(password)) {
            return { valid: false, message: 'Le mot de passe doit contenir au moins un chiffre' };
        }
        
        return { valid: true };
    }

    // Valider un formulaire
    validateForm(formData, requiredFields) {
        const errors = {};
        
        for (const field of requiredFields) {
            const value = formData.get(field) || formData[field];
            if (!value || value.trim() === '') {
                errors[field] = 'Ce champ est obligatoire';
            }
        }
        
        return {
            valid: Object.keys(errors).length === 0,
            errors
        };
    }
}

class NetworkUtils {
    constructor(config) {
        this.config = config;
        this.retryAttempts = config.ollama.retryAttempts;
    }

    // Requête avec retry automatique
    async fetchWithRetry(url, options = {}, retryCount = 0) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.config.ollama.timeout);
            
            const response = await fetch(url, {
                ...options,
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            return response;
            
        } catch (error) {
            if (error.name === 'AbortError') {
                throw new Error('Délai d\'attente dépassé');
            }
            
            if (retryCount < this.retryAttempts) {
                console.log(`🔄 Tentative ${retryCount + 1}/${this.retryAttempts} échouée, nouvelle tentative...`);
                await this.delay(1000 * (retryCount + 1)); // Délai progressif
                return this.fetchWithRetry(url, options, retryCount + 1);
            }
            
            throw error;
        }
    }

    // Délai avec Promise
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Vérifier la connectivité réseau
    async checkConnectivity() {
        try {
            const response = await fetch('/favicon.ico', { 
                method: 'HEAD',
                cache: 'no-cache'
            });
            return response.ok;
        } catch {
            return false;
        }
    }
}

class StorageUtils {
    // Gestion du localStorage avec gestion d'erreur
    static setItem(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Erreur localStorage:', error);
            return false;
        }
    }

    static getItem(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Erreur localStorage:', error);
            return defaultValue;
        }
    }

    static removeItem(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Erreur localStorage:', error);
            return false;
        }
    }

    static clear() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Erreur localStorage:', error);
            return false;
        }
    }
}

// Export des classes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ErrorHandler, Validator, NetworkUtils, StorageUtils };
} else {
    // Pour utilisation dans le navigateur
    window.LinkedINPostUtils = { ErrorHandler, Validator, NetworkUtils, StorageUtils };
}
