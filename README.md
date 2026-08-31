# 21 días para conversar con tu cuerpo

Landing page en **Next.js** (App Router) de la experiencia de 21 días.
Diseño: negro cálido + blanco hueso alternando banda a banda, oro como único acento,
polvo dorado en canvas que reacciona al ratón y al scroll, cursor personalizado,
titulares que se montan palabra a palabra al hacer scroll y huecos de imagen que se
destapan con un velo + línea de escaneo.

## Arrancar en local

```bash
npm install
npm run dev      # http://localhost:3000
```

Para producción:

```bash
npm run build
npm run start
```

## Cambiar el enlace de pago (Stripe)

El botón de compra abre un **Payment Link** de Stripe. Está en `app/config.js`.
También se puede sobreescribir sin tocar código con una variable de entorno:

```
NEXT_PUBLIC_STRIPE_URL=https://buy.stripe.com/tu-enlace
```

## Poner las fotos

1. Copia las imágenes dentro de `public/images/`.
2. Abre `app/config.js` y rellena las rutas:

```js
export const IMAGES = {
  hero: '/images/retrato-principal.jpg',   // vertical 3:4
  detail: '/images/detalle-manos.jpg',     // cuadrada 1:1
  editorial: '/images/editorial.jpg',      // 16:10
  practice: '/images/practica.jpg',        // 4:5
  origin: '/images/retrato-origen.jpg',    // 4:5
  closing: '/images/cierre.jpg',           // 4:5
};
```

Si un valor se deja en `null`, ese hueco muestra el marcador de diseño (etiqueta + proporción).

## Estructura

| Archivo | Qué hace |
| --- | --- |
| `app/page.js` | Toda la landing (secciones, textos, botones) |
| `app/useLandingMotion.js` | Animaciones: partículas, cursor, revelados, parallax, barra de progreso |
| `app/Slot.js` | Hueco de imagen con velo, escaneo, parallax y tilt 3D |
| `app/config.js` | Enlace de Stripe + rutas de las fotos |
| `app/globals.css` | Estilos base, keyframes y reglas responsive |

## Accesibilidad

Si el visitante tiene activado *reducir movimiento* en su sistema, se desactivan las
partículas, el cursor personalizado y las animaciones de entrada.
