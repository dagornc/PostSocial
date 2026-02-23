# PostSocial

![LinkedIn](https://img.shields.io/badge/LinkedIn-Automation-0A66C2?logo=linkedin)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![Ollama](https://img.shields.io/badge/Ollama-AI-black)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase)
![License](https://img.shields.io/badge/License-MIT-green)

Plateforme de **publication automatique sur les réseaux sociaux** (LinkedIn) avec génération de contenu par IA. Permet de créer, personnaliser et publier des posts professionnels en quelques clics grâce à l'intégration d'un modèle de langage local via Ollama.

## Table des matières

- [Présentation](#présentation)
- [Fonctionnalités](#fonctionnalités)
- [Architecture](#architecture)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [Structure du projet](#structure-du-projet)
- [Contribution](#contribution)
- [Licence](#licence)

## Présentation

PostSocial (également connu sous le nom **LinkedINPost**) est une application web permettant d'automatiser la création et la publication de posts LinkedIn grâce à l'intelligence artificielle. L'application utilise un LLM local via **Ollama** pour générer du contenu optimisé et **Supabase** comme backend pour la gestion des utilisateurs et des données.

### Cas d'usage

- Génération automatique de posts LinkedIn à partir d'un sujet ou d'une idée
- Personnalisation du ton, du style et de la longueur des posts
- Gestion et prévisualisation du contenu avant publication
- Publication directe sur LinkedIn

## Fonctionnalités

- **Génération de contenu IA** : création de posts LinkedIn via un LLM local (Ollama)
- **Interface web intuitive** : UI responsive et accessible (HTML/CSS/JS)
- **Authentification utilisateur** : gestion des comptes via Supabase Auth
- **Multi-langue** : support français et anglais
- **Limitation de longueur** : respect de la limite LinkedIn (1300 caractères max)
- **Auto-sauvegarde** : sauvegarde automatique toutes les 30 secondes
- **Notifications** : retours visuels en temps réel
- **Animations cinématiques** : effets CSS avancés pour une meilleure UX

## Architecture

```
PostSocial
├── Frontend (HTML/CSS/JS vanilla)
│   ├── Interface utilisateur (index.html)
│   ├── Styles et animations (*.css)
│   └── Logique applicative (*.js)
├── Backend (Supabase)
│   ├── Authentification
│   └── Stockage des données
└── IA (Ollama)
    └── LLM local pour la génération de contenu
```

**Stack technique :**
- **Frontend** : HTML5, CSS3, JavaScript (ES6+)
- **IA** : Ollama (modèle LLM local)
- **Backend** : Supabase (PostgreSQL + Auth + API REST)
- **Outils** : Cursor AI

## Prérequis

- Un navigateur web moderne (Chrome, Firefox, Edge, Safari)
- [Ollama](https://ollama.ai/) installé et en cours d'exécution
- Un compte [Supabase](https://supabase.com/) avec un projet configuré
- Un compte LinkedIn (pour la publication)

## Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/dagornc/PostSocial.git
cd PostSocial
```

### 2. Installer et démarrer Ollama

```bash
# Installer Ollama (macOS/Linux)
curl -fsSL https://ollama.ai/install.sh | sh

# Télécharger un modèle (ex: llama3, mistral, etc.)
ollama pull mistral

# Démarrer le serveur Ollama
ollama serve
```

### 3. Configurer l'application

```bash
# Copier le fichier d'exemple de configuration
cp environment.example .env

# Éditer le fichier .env avec vos propres valeurs
nano .env
```

### 4. Lancer l'application

Ouvrez simplement `index.html` dans votre navigateur ou utilisez un serveur local :

```bash
# Avec Python
python3 -m http.server 8080

# Avec Node.js (npx)
npx serve .
```

Accédez ensuite à `http://localhost:8080` dans votre navigateur.

## Configuration

Copiez `environment.example` vers `.env` et renseignez les variables suivantes :

```env
# Configuration Supabase
SUPABASE_URL=https://votre-projet.supabase.co
SUPABASE_ANON_KEY=votre-clé-anon-supabase

# Configuration Ollama
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_TIMEOUT=300000
OLLAMA_RETRY_ATTEMPTS=3

# Configuration de l'application
APP_NAME=LinkedINPost
APP_VERSION=1.0.0
APP_ENV=production
```

### Configuration Supabase

1. Créez un compte sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Récupérez l'URL et la clé anonyme dans **Settings > API**
4. Renseignez ces valeurs dans votre fichier `.env`

### Configuration Ollama

1. Installez Ollama sur votre machine ou serveur
2. Choisissez et téléchargez un modèle compatible
3. Renseignez l'URL du serveur Ollama (par défaut : `http://localhost:11434`)

## Utilisation

1. **Connexion** : Créez un compte ou connectez-vous via l'interface
2. **Saisie du sujet** : Entrez le thème ou les mots-clés de votre post
3. **Génération** : Cliquez sur "Générer" pour obtenir un post via l'IA
4. **Personnalisation** : Ajustez le contenu généré selon vos besoins
5. **Publication** : Cliquez sur "Publier sur LinkedIn" pour poster directement

### Paramètres de génération

| Paramètre | Valeur par défaut | Description |
|-----------|-------------------|-------------|
| Langue | Français | Langue de génération du post |
| Longueur max | 1300 caractères | Limite LinkedIn |
| Timeout IA | 300 secondes | Délai max pour la génération |
| Auto-save | 30 secondes | Fréquence de sauvegarde auto |

## Structure du projet

```
PostSocial/
├── index.html                         # Page principale de l'application
├── validation.html                    # Page de validation/test
├── config.js                          # Configuration et variables d'environnement
├── utils.js                           # Fonctions utilitaires
├── fix-navigation.js                  # Correctifs de navigation
├── accessibility-fixes.css            # Améliorations d'accessibilité
├── cinematique-generateur-optimisee.css # Animations de l'interface
├── design-fixes.css                   # Corrections de design
├── post-generation-fixes.css          # Styles pour la génération de posts
├── ui-ux-improvements.css             # Améliorations UX globales
└── environment.example                # Exemple de configuration
```

## Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le dépôt
2. Créez une branche feature (`git checkout -b feature/ma-fonctionnalite`)
3. Committez vos changements (`git commit -m 'feat: ajouter ma fonctionnalité'`)
4. Poussez sur la branche (`git push origin feature/ma-fonctionnalite`)
5. Ouvrez une Pull Request

### Idées d'amélioration

- [ ] Support d'autres réseaux sociaux (Twitter/X, Mastodon, Bluesky)
- [ ] Planification de publications
- [ ] Tableau de bord analytics
- [ ] Templates de posts prédéfinis
- [ ] Support multi-comptes
- [ ] Extension navigateur

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

> Développé avec l'assistance de [Cursor AI](https://cursor.sh/) | Powered by [Ollama](https://ollama.ai/) & [Supabase](https://supabase.com/)
