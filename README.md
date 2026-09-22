# Spécial Pack Prophétique — Tunnel de vente

Landing page statique (HTML / CSS / JS vanilla, sans dépendance ni build) pour la
vente du pack de 5 livres numériques chrétiens, avec redirection vers Chariow.

## 1. Images

Les visuels fournis par l'utilisateur (affiche principale + 5 couvertures) sont
déjà en place, tels quels, sans aucune modification ni retouche :

| Emplacement | Rôle |
|---|---|
| `images/hero/affiche-pack.jpg` | Affiche principale (Hero) |
| `images/books/livre-1-affaires.jpg` | Couverture — Tome 1, Affaires |
| `images/books/livre-2-guerison.jpg` | Couverture — Tome 7, Guérison |
| `images/books/livre-3-fertilite.jpg` | Couverture — Tome 6, Fertilité & maternité |
| `images/books/livre-4-maison.jpg` | Couverture — Tome 10, Construction de maison |
| `images/books/livre-5-terrain.jpg` | Couverture — Tome 9, Acquisition de terrain |

Pour remplacer un visuel plus tard, déposez le nouveau fichier au même chemin
(ou mettez à jour l'objet `images` dans `js/config.js` si vous changez les noms).

## 2. Configurer le lien Chariow, la date de fin d'offre et le Pixel

Tout se règle dans **`js/config.js`** :

```js
const CHARIOW_LINK = "https://chariow.com/...";   // lien de paiement réel
const OFFER_END_DATE = "2026-10-31T23:59:59";     // date/heure de fin d'offre
const META_PIXEL_ID = "";                          // ID Meta Pixel, ou "" pour désactiver
```

- Tous les boutons d'achat (`data-cta`) utilisent automatiquement `CHARIOW_LINK`.
- Le compte à rebours est calculé en temps réel à partir de `OFFER_END_DATE` et
  ne se réinitialise jamais : une fois la date passée, la page affiche
  « Cette offre est maintenant terminée. ».
- Si `META_PIXEL_ID` est vide, le site fonctionne normalement sans Meta Pixel.
  S'il est renseigné, les événements `PageView`, `ViewContent` (au chargement)
  et `InitiateCheckout` (au clic sur un CTA, avant la redirection) sont envoyés
  automatiquement.

## 3. Aperçu local

Aucun outil de build n'est nécessaire. Ouvrez simplement `index.html` dans un
navigateur, ou servez le dossier avec un petit serveur statique, par exemple :

```bash
npx serve .
# ou
python3 -m http.server 8080
```

## 4. Déploiement

Le projet est un site 100% statique, compatible tel quel avec :

- **Vercel** — importer le dépôt, aucune configuration nécessaire (`vercel.json` inclus).
- **Netlify** — importer le dépôt, `netlify.toml` définit déjà `publish = "."`.
- **Cloudflare Pages** — répertoire de build vide, dossier de sortie `/`.
- **GitHub Pages** — activer Pages sur la branche voulue, dossier racine.

## Structure du projet

```
index.html          Page unique (17 sections)
css/styles.css       Styles premium bleu nuit + doré, mobile-first
js/config.js         Configuration centralisée (lien, date, pixel, images)
js/main.js           Compte à rebours, FAQ, animations, Pixel, CTA
images/hero/          Affiche principale
images/books/         5 couvertures
```

## Règles respectées

- Aucun prix affiché sur la page.
- Aucune preuve sociale, témoignage, avis ou capture d'écran fictifs.
- Aucune promesse garantie (richesse, guérison, fertilité, terrain, maison) —
  le contenu est présenté comme des enseignements et principes bibliques.
- Les couvertures fournies ne doivent jamais être modifiées ni remplacées par
  des visuels générés par IA — les fichiers dans `images/` sont les visuels
  originaux fournis, extraits sans retouche.
