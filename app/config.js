// Stripe Payment Link — se puede sobreescribir con NEXT_PUBLIC_STRIPE_URL
export const STRIPE_URL =
  process.env.NEXT_PUBLIC_STRIPE_URL || 'https://buy.stripe.com/6oU00j25AbG2bHwaWE9AA0E';

// Fotos de la landing. Pon aquí la ruta de cada imagen dentro de /public/images.
// Si un valor es null, ese hueco se muestra con el marcador de diseño.
export const IMAGES = {
  hero: null, // retrato principal · vertical 3:4
  detail: null, // detalle manos / piel · cuadrada
  editorial: null, // imagen editorial · 16:10
  practice: null, // imagen práctica · 4:5
  origin: null, // retrato trayectoria · 4:5
  closing: null, // imagen de cierre · 4:5
};
