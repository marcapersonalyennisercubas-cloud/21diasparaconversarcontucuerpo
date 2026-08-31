// Stripe Payment Link — se puede sobreescribir con NEXT_PUBLIC_STRIPE_URL
export const STRIPE_URL =
  process.env.NEXT_PUBLIC_STRIPE_URL || 'https://buy.stripe.com/6oU00j25AbG2bHwaWE9AA0E';

// Fotos de la landing. Pon aquí la ruta de cada imagen dentro de /public/images.
// Si un valor es null, ese hueco se muestra con el marcador de diseño.
export const IMAGES = {
  hero: '/images/retrato-principal.webp', // retrato principal · vertical 3:4
  detail: '/images/detalle-manos.webp', // detalle manos / piel · cuadrada
  editorial: '/images/editorial.webp', // imagen editorial · 16:10
  practice: '/images/practica.webp', // imagen práctica · 4:5
  origin: '/images/origen.webp', // retrato trayectoria · 4:5
  closing: '/images/cierre.webp', // imagen de cierre · 4:5
};
