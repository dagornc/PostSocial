# LinkedINPost - Générateur de Posts LinkedIn avec IA

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![État du Projet: Actif](https://img.shields.io/badge/état%20du%20projet-actif-brightgreen.svg)](https://github.com/votre-utilisateur/votre-repo)
[![Contributions: Bienvenues](https://img.shields.io/badge/contributions-bienvenues-blue.svg?style=flat-square)](https://github.com/votre-utilisateur/votre-repo/issues)

**LinkedINPost** est une application web innovante conçue pour aider les professionnels, les marketeurs et les créateurs de contenu à générer des posts LinkedIn percutants et engageants grâce à l'intelligence artificielle. Fini le syndrome de la page blanche !

---

### Aperçu de l'application

*(Ici, vous pouvez insérer une capture d'écran ou un GIF de l'application)*
`![Aperçu de LinkedINPost](lien_vers_votre_image.gif)`

---

## ✨ Fonctionnalités

- **🤖 Génération par IA** : Créez des posts uniques en définissant un sujet, une audience, un ton et une langue.
- **👤 Authentification Sécurisée** : Système complet de connexion et d'inscription via Supabase.
- **💾 Gestion des Posts** : Sauvegardez, modifiez et supprimez vos posts générés.
- **↔️ Import/Export** : Exportez vos posts au format JSON pour les sauvegarder ou les partager, et importez-les facilement.
- **🌐 Multilingue** : Interface disponible en Français et en Anglais.
- **🎨 Thème Sombre/Clair** : Basculez entre les thèmes pour un confort visuel optimal.
- **🔍 Recherche et Filtre** : Retrouvez facilement vos posts sauvegardés.
- **🚀 Publication Facilitée** : Copiez le contenu en un clic et ouvrez LinkedIn pour le publier.

---

## 🛠️ Stack Technique

- **Frontend** : HTML5, CSS3, JavaScript (Vanilla JS)
- **Backend-as-a-Service (BaaS)** : [Supabase](https://supabase.io/) pour l'authentification et la base de données PostgreSQL.
- **Moteur IA** : [Ollama](https://ollama.ai/) pour servir des modèles de langage open-source localement.
- **Hébergement** : Déployable sur n'importe quel serveur statique (Vercel, Netlify, GitHub Pages, etc.).

---

## 🚀 Démarrage Rapide

Suivez ces instructions pour obtenir une copie du projet et la faire fonctionner sur votre machine locale à des fins de développement et de test.

### Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- Un serveur web local pour servir les fichiers statiques (par exemple, [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) pour VS Code).
- Un compte [Supabase](https://supabase.io/) pour la base de données et l'authentification.
- [Ollama](https://ollama.ai/) installé et en cours d'exécution sur votre machine ou un serveur accessible.

### Installation

1.  **Clonez le dépôt**
    ```sh
    git clone https://github.com/votre-utilisateur/votre-repo.git
    cd votre-repo
    ```

2.  **Configuration de Supabase**
    -   Connectez-vous à votre compte Supabase et créez un nouveau projet.
    -   Allez dans l'éditeur SQL (`SQL Editor`) et exécutez le script SQL ci-dessous pour créer la table `posts` et configurer les politiques de sécurité (RLS).

    ```sql
    -- Création de la table pour stocker les posts
    CREATE TABLE IF NOT EXISTS posts (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
        content TEXT NOT NULL,
        subject TEXT,
        audience TEXT,
        tone TEXT,
        language TEXT DEFAULT 'fr',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Activation de la Row Level Security (RLS)
    ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

    -- Politiques de sécurité pour que les utilisateurs ne puissent accéder qu'à leurs propres posts
    CREATE POLICY "Les utilisateurs peuvent voir leurs propres posts" ON posts FOR SELECT USING (auth.uid() = user_id);
    CREATE POLICY "Les utilisateurs peuvent insérer leurs propres posts" ON posts FOR INSERT WITH CHECK (auth.uid() = user_id);
    CREATE POLICY "Les utilisateurs peuvent mettre à jour leurs propres posts" ON posts FOR UPDATE USING (auth.uid() = user_id);
    CREATE POLICY "Les utilisateurs peuvent supprimer leurs propres posts" ON posts FOR DELETE USING (auth.uid() = user_id);
    ```

3.  **Configuration d'Ollama**
    -   Assurez-vous qu'Ollama est en cours d'exécution.
    -   Téléchargez les modèles que vous souhaitez utiliser (par exemple, `llama3`, `mistral`).
        ```sh
        ollama pull llama3
        ollama pull mistral
        ```
    -   Vérifiez que le serveur Ollama est accessible.

4.  **Configuration de l'application**
    - Étant donné que les clés de configuration sont actuellement codées en dur dans `index.html` et `config.js`, vous devrez modifier ces fichiers directement :
    - **Dans `index.html` (et `config.js`)** :
        - Remplacez l'URL et la clé `anon` de Supabase par les vôtres.
        - Assurez-vous que l'URL de base d'Ollama (`ollamaBaseUrl`) pointe vers votre instance locale ou distante.

5.  **Lancez l'application**
    -   Servez le répertoire du projet avec un serveur web local. Par exemple, avec l'extension Live Server de VS Code, cliquez sur "Go Live" depuis la barre d'état.
    -   Ouvrez votre navigateur à l'adresse fournie (généralement `http://127.0.0.1:5500`).

---

## ⚙️ Note sur la Configuration

Le projet utilise un fichier `environment.example` comme modèle pour les variables d'environnement. Cependant, dans l'état actuel, le code client utilise des configurations codées en dur.

Pour une mise en production sécurisée, il est recommandé de ne pas exposer les clés directement dans le code source. Une approche serait de :
1.  Servir l'application via un petit serveur backend (Node.js/Express, par exemple).
2.  Utiliser des variables d'environnement sur le serveur.
3.  Injecter les variables nécessaires dans le HTML ou via une route d'API au chargement de la page.

---

## 📖 Utilisation

1.  **Créez un compte** ou connectez-vous si vous en avez déjà un.
2.  Accédez au **Générateur de Posts**.
3.  Remplissez les champs : **sujet, audience, ton, et langue**.
4.  Sélectionnez un **modèle d'IA** disponible depuis votre serveur Ollama.
5.  Cliquez sur **"Générer mon post"**.
6.  Le post généré apparaîtra. Vous pouvez le **copier**, le **sauvegarder** ou le **publier**.
7.  Allez dans l'onglet **"Mes posts"** pour voir tous vos posts sauvegardés, les rechercher, les modifier, les supprimer, ou les exporter.

---

## 🤝 Contribution

Les contributions sont ce qui fait de la communauté open source un endroit extraordinaire pour apprendre, inspirer et créer. Toutes les contributions que vous faites sont **grandement appréciées**.

Si vous avez une suggestion pour améliorer ce projet, veuillez forker le dépôt et créer une pull request. Vous pouvez aussi simplement ouvrir une issue avec le tag "enhancement".

1.  **Forkez le Projet**
2.  **Créez votre Branche de Fonctionnalité** (`git checkout -b feature/AmazingFeature`)
3.  **Commitez vos Changements** (`git commit -m 'Add some AmazingFeature'`)
4.  **Poussez vers la Branche** (`git push origin feature/AmazingFeature`)
5.  **Ouvrez une Pull Request**

---

## 📜 Licence

Distribué sous la licence MIT.

---

## 🙏 Remerciements

-   Un grand merci à la communauté [Ollama](https://ollama.ai/) pour leur travail incroyable.
-   À l'équipe de [Supabase](https://supabase.io/) pour leur plateforme puissante et simple d'utilisation.
-   À tous les contributeurs qui aideront à faire évoluer ce projet.

---

*Créé avec ❤️ pour les professionnels ambitieux.*
