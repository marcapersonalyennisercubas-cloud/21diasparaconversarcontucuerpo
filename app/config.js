// Stripe Payment Link — se puede sobreescribir con NEXT_PUBLIC_STRIPE_URL
export const STRIPE_URL =
  process.env.NEXT_PUBLIC_STRIPE_URL || 'https://buy.stripe.com/6oU00j25AbG2bHwaWE9AA0E';

// Fotos de la landing. Pon aquí la ruta de cada imagen dentro de /public/images.
// Si un valor es null, ese hueco se muestra con el marcador de diseño.
export const IMAGES = {
  hero: '/images/yenniser-portada.webp', // portada · Yenniser · 3:4
  detail: '/images/ojo.webp', // detalle · ojo e iris · 1:1
  editorial: '/images/hombre.webp', // editorial · torso masculino · 16:10
  practice: '/images/practica.webp', // el método · sentada junto a la ventana · 4:5
  about: '/images/yenniser.webp', // sobre mí · retrato de Yenniser · 4:5
  closing: '/images/cierre.webp', // cierre · manos y tela · 4:5
  // libres: retrato-principal.webp, origen.webp, yenniser-cierre.webp
};

// Resenas reales publicadas en su ficha de Google. Para anadir o quitar,
// edita esta lista. Si se deja vacia, la seccion no aparece.
export const TESTIMONIALS = [
  {
    quote:
      "Manos mágicas, mujer mágica… Recibí unos hermosos masajes con una limpieza de cutis que me dejó aún más radiante. Gracias por tu buena energía y por tu hospitalidad. Súper recomendable.",
    name: "Micaela Ferrero",
    role: "Google",
  },
  {
    quote:
      "Estuvimos con Yenniser a bordo unos días navegando y tuvimos la linda experiencia de hacernos masajes con ella. ¡Un sueño! Altamente recomendable la experiencia, fue un gusto compartir con alguien con tal lindo corazón.",
    name: "Milagros Gómez Centurión",
    role: "Google",
  },
  {
    quote:
      "He tenido varias experiencias con Yenniser y todas maravillosas. […] He recibido un masaje espectacular. Gran profesional y amabilidad. Volveré sin duda.",
    name: "Maricarmen Quesada",
    role: "Google",
  },
  {
    quote:
      "Un trato estupendo, profesional y un lugar súper acogedor, pero también una mujer increíble y positiva que te aporta confianza, valentía y divinos consejos. De corazón. Súper recomendable.",
    name: "Susana Lois",
    role: "Google",
  },
  {
    quote:
      "Aparte de llevarme unas pestañas perfectamente arregladas, Yenni me demostró su gran corazón y vocación por ayudar a los demás. Tuvimos una charla muy enriquecedora en la que manifestó sus dones como guía espiritual… ¡Un diez!",
    name: "Paula del Villar Santamaría",
    role: "Google",
  },
];
