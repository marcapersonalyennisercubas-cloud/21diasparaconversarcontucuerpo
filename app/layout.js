import './globals.css';

export const metadata = {
  title: '21 días para conversar con tu cuerpo',
  description:
    'Aprende a conversar con tu cuerpo para crear una vida más grandiosa. 21 días, 10 minutos al día.',
  openGraph: {
    title: '21 días para conversar con tu cuerpo',
    description:
      'Aprende a conversar con tu cuerpo para crear una vida más grandiosa. 21 días, 10 minutos al día.',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0B0B0C',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
