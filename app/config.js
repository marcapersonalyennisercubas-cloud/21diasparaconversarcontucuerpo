// Stripe Payment Link — se puede sobreescribir con NEXT_PUBLIC_STRIPE_URL
export const STRIPE_URL =
  process.env.NEXT_PUBLIC_STRIPE_URL || 'https://buy.stripe.com/6oU00j25AbG2bHwaWE9AA0E';

// Fotos de la landing. Pon aquí la ruta de cada imagen dentro de /public/images.
// Si un valor es null, ese hueco se muestra con el marcador de diseño.
export const IMAGES = {
  hero: '/images/retrato-principal.webp', // portada · mujer, hombro y rostro · 3:4
  detail: '/images/ojo.webp', // detalle · ojo e iris · 1:1
  editorial: '/images/hombre.webp', // editorial · torso masculino · 16:10
  practice: '/images/practica.webp', // el método · sentada junto a la ventana · 4:5
  about: '/images/yenniser.webp', // sobre mí · retrato de Yenniser · 4:5
  closing: '/images/cierre.webp', // cierre · manos y tela · 4:5
};
