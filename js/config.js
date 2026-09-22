/**
 * CONFIGURATION CENTRALE — SPÉCIAL PACK PROPHÉTIQUE
 * Modifiez uniquement les valeurs ci-dessous pour adapter le site.
 */

// Lien de paiement Chariow — remplacez par le lien réel avant mise en ligne
const CHARIOW_LINK = "https://chariow.com/INSERER-LE-LIEN-ICI";

// Date/heure de fin de l'offre (heure locale du visiteur), format ISO 8601
// Exemple : "2026-10-31T23:59:59"
const OFFER_END_DATE = "2026-10-31T23:59:59";

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
window.SITE_CONFIG = { CHARIOW_LINK, OFFER_END_DATE, META_PIXEL_ID, images };
