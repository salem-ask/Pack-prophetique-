/**
 * CONFIGURATION CENTRALE — SPÉCIAL PACK PROPHÉTIQUE
 * Modifiez uniquement les valeurs ci-dessous pour adapter le site.
 */

// Lien de paiement Chariow
const CHARIOW_LINK = "https://livres-spirit.mychariow.shop/prd_0oj05p8m/checkout";

// Compte à rebours auto-renouvelable : durée d'un cycle en heures.
// À l'expiration du cycle, le compteur repart automatiquement à 48h,
// sans jamais afficher de durée négative ni de message de fin.
const OFFER_DURATION_HOURS = 48;

// Date/heure de référence (n'importe quelle date passée ou future) utilisée
// pour caler le calendrier des cycles de 48h. La modifier décale l'heure à
// laquelle chaque cycle se termine et redémarre.
const OFFER_CYCLE_ANCHOR = "2026-01-01T00:00:00";

// Identifiant Meta Pixel — laissez vide ("") si vous n'utilisez pas de Pixel
const META_PIXEL_ID = "";

// Chemins des images — remplacez les fichiers dans /images par les visuels fournis
// en conservant exactement ces noms de fichiers (ou mettez à jour les chemins ici).
const images = {
  hero: "images/hero/affiche-pack.jpg",
  book1: "images/books/livre-1-affaires.jpg",
  book2: "images/books/livre-2-guerison.jpg",
  book3: "images/books/livre-3-fertilite.jpg",
  book4: "images/books/livre-4-maison.jpg",
  book5: "images/books/livre-5-terrain.jpg"
};

// Ne pas modifier au-delà de cette ligne
window.SITE_CONFIG = { CHARIOW_LINK, OFFER_DURATION_HOURS, OFFER_CYCLE_ANCHOR, META_PIXEL_ID, images };
