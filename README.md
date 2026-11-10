# Notes (Android)

1. Crée un dépôt GitHub **privé** et envoie tout le contenu de ce dossier (y compris `.github/` et `keystore/`).
2. Onglet **Actions** → le build se lance à chaque push sur `main` (ou "Run workflow").
3. L'APK est dans **Releases** (`Notes-vX.apk`) et dans les artefacts du build.

Signature : toujours `keystore/notes.jks` → les mises à jour s'installent par-dessus sans désinstaller.
Ne supprime/remplace jamais ce fichier. Le versionCode augmente automatiquement à chaque build.
