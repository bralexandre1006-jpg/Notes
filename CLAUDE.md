# CLAUDE.md

## Informations du projet

| | |
|---|---|
| Nom | Notes (clone de l'app Notes iOS) |
| Stack | Android natif minimal (Java, `Activity` + `WebView`, sans AndroidX) + Vanilla JS/HTML/CSS |
| Code web | `app/src/main/assets/www/` (`app.js`, `style.css`, `index.html`, polices Inter) |
| Code natif | `app/src/main/java/be/alexandre/notes/MainActivity.java` (pont JS `Android` : `saveFile`, `haptic`, `share`) |
| applicationId / namespace | `be.alexandre.notes` |
| SDK | minSdk 26, target/compileSdk 34, AGP 8.5.2, Gradle 8.7, JDK 17 |
| Workflow | `.github/workflows/build.yml` : push sur `main` ou manuel → `gradle assembleRelease` → artefact + Release GitHub `vN` avec `Notes-vN.apk` |
| Signature | `keystore/notes.jks` (alias `notes`) via `signingConfigs.release` dans `app/build.gradle` ; mots de passe lus depuis env `KEYSTORE_PASSWORD`/`KEY_ALIAS`/`KEY_PASSWORD` avec valeur par défaut dans le fichier (aucun secret GitHub configuré dans le workflow) |
| Version | `versionCode = GITHUB_RUN_NUMBER`, `versionName = 1.0.<run>` |
| Données locales | `localStorage` de la WebView, clé `notes.data.v1` (dossiers, notes, réglages, images en base64), origine `file:///android_asset/www/index.html` |
| App PC | `desktop/` : Electron (Windows 11), réutilise `app/src/main/assets/www` (copié au build, ne pas dupliquer le code), appId `be.alexandre.notes.pc`, productName `Notes` ; pont `window.Android`/`window.Desktop` dans `preload.js` |
| Workflow PC | `.github/workflows/build-pc.yml` : push sur `main` ou manuel → installateur NSIS → Release `pc-vN` avec `Notes-PC-vN.exe` (non signé : avertissement SmartScreen) |
| Synchro | `www/sync.js` : Firebase Auth (e-mail/mot de passe, REST) + Realtime Database (REST + flux SSE), chemin `users/{uid}/{n|f|s}/{id}` = `{u, j}` ou tombe `{u, d:1}` ; config publique dans `www/firebase-config.js` ; état local `notes.sync.v1` et `notes.sync.shadow.v1` |

## Collaboration
- Je décris les fonctionnalités en français ; prends en charge le technique et réponds brièvement en français.
- Comprends la demande et les fichiers concernés ; ne relis pas tout le dépôt à chaque tâche (recherche ciblée dans `app.js`).
- Modifications ciblées, réutilise les composants existants. Pas de sous-agents ni d'opérations coûteuses sans bénéfice clair.
- Décision importante ou ambiguë : propose brièvement une solution et demande confirmation.

## Sécurité des mises à jour Android
- Ne jamais changer `applicationId`, keystore, alias, certificat ou mots de passe sans mon accord explicite.
- Vérifier la signature existante avant une mise à jour. Ne jamais générer une nouvelle clé pour remplacer une clé indisponible : signaler le problème.
- Ne jamais désinstaller l'app pour résoudre un problème de signature.
- `versionCode` doit toujours augmenter. Ne pas renommer/recréer le workflow (le compteur `run_number` repartirait à 1).
- Ne jamais publier de nouveaux secrets (keystore, mots de passe, jetons) dans le dépôt, les logs ou les réponses ; utiliser les secrets GitHub Actions si approprié.
- Point connu : `notes.jks` et des mots de passe par défaut sont déjà dans le dépôt. Ne pas les modifier ; toute migration vers des secrets GitHub doit garder la même clé et se faire avec mon accord.

## Préservation des données (règles propres au projet)
- Ne jamais changer la clé `KEY = 'notes.data.v1'` ni la structure lue par `load()` sans migration rétrocompatible.
- Ne jamais changer l'URL de chargement (`file:///android_asset/...`) ni passer à WebViewAssetLoader/https : l'origine change → localStorage perdu.
- Garder `setDomStorageEnabled(true)` et le `flushSave` dans `onPause`.
- Le localStorage est limité (~5–10 Mo) et contient les images en base64 : tenir compte de la taille.
- Nouveaux champs : valeurs par défaut via `Object.assign` dans `load()`, sans écraser l'existant.
- Toute modification des données passe par `persist()` (qui appelle `Sync.track()`), sinon elle ne sera pas synchronisée.
- Suppressions synchronisées par tombes : ne jamais supprimer les données distantes avec `null`.
- PC : ne jamais changer `appId`/`productName`/`name` d'Electron (dossier des données utilisateur) ni le chargement `loadFile` de `www/index.html`.

## GitHub et compilation
- Respecter le workflow existant ; ne pas le modifier sans nécessité expliquée.
- Push sur `main` = compilation + Release GitHub automatique. Avant tout push, résumer les fichiers modifiés et demander mon autorisation explicite.
- En cas d'échec : analyser les lignes d'erreur utiles et corriger la cause, pas de relances en boucle.
- Ne supprimer ni historique Git, ni branche, ni données sans mon accord.

## Livraison de l'APK
- Après une compilation réussie, vérifier que le run a réussi et que l'asset existe, puis donner en priorité l'URL directe de l'asset `.apk` de la Release (`.../releases/download/vN/Notes-vN.apk`).
- Si seul l'artefact Actions existe : préciser que c'est un ZIP, qu'il faut être connecté à GitHub et que le lien est temporaire ; donner le lien précis du run/artefact.
- Ne jamais inventer d'URL. Ne créer aucune Release hors workflow sans autorisation.
- Compte rendu : d'abord `Télécharger l'APK : [lien]`, puis la version, puis un bref résumé.

## Design et UX
- Interface soignée, moderne, accessible et fluide ; priorité de compatibilité au Xiaomi 17T Pro (encoche/caméra, safe areas, écran haute fréquence).
- Respecter la direction artistique existante (style iOS 26 : verre, menus qui se déploient depuis le bouton, animations à ressort en transform/opacity, police Inter, thème sombre).
- Soigner typographie, espacements, états de chargement/erreur, navigation (retour Android via `window.onBack`, swipe-back) et animations.
- Ne pas refondre les écrans non concernés ; demander des références si une refonte majeure est ambiguë.

## Optimisation
- Modifications minimales et précises, pas de refactorisation ni de fichiers non demandés.
- Ne pas relire inutilement des fichiers déjà analysés.
- Une seule compilation quand nécessaire, pas d'agents parallèles ni de recherches externes sans raison.
- Ne jamais sacrifier design, animations, UX ou fonctionnalités pour économiser des tokens.
- Ne supprimer ni modifier aucune fonctionnalité existante sans demande explicite.
- Réponses concises en français.
