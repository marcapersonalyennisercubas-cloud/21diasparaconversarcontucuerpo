'use client';

import Slot from './Slot';
import { useLandingMotion } from './useLandingMotion';
import { IMAGES, STRIPE_URL } from './config';

const SERIF = "'Cormorant Garamond', serif";
const SANS = "'Jost', sans-serif";
const INK = '#0B0B0C';
const BONE = '#F7F6F4';
const GOLD = '#C4A05A';
const GOLD_DEEP = '#8E7231';
const GOLD_SOFT = '#DFC28A';

const hoverFx = (into, back) => ({
  onMouseEnter: (e) => Object.assign(e.currentTarget.style, into),
  onMouseLeave: (e) => Object.assign(e.currentTarget.style, back),
});

const checkout = () => window.open(STRIPE_URL, '_blank', 'noopener');

const eyebrow = (color) => ({
  fontSize: '10.5px',
  fontWeight: 400,
  letterSpacing: '.34em',
  textTransform: 'uppercase',
  color,
});

const microLabel = {
  fontSize: '9.5px',
  fontWeight: 400,
  letterSpacing: '.26em',
  textTransform: 'uppercase',
  opacity: 0.45,
};

const bodyLead = {
  margin: 0,
  fontSize: 'clamp(16.5px, 1.3vw, 20px)',
  lineHeight: 1.8,
  textWrap: 'pretty',
};

const sectionPad = 'clamp(90px, 16vh, 180px) clamp(20px, 5vw, 64px)';

const MARQUEE_WORDS = [
  '10 minutos al día',
  '21 días',
  'una conversación diferente',
  'una vida más grandiosa',
];

function MarqueeRun() {
  return (
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 32,
        paddingRight: 32,
        fontSize: '10.5px',
        fontWeight: 400,
        letterSpacing: '.34em',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        opacity: 0.55,
      }}
    >
      {[0, 1].map((run) =>
        MARQUEE_WORDS.map((word) => (
          <span key={`${run}-${word}`} style={{ display: 'contents' }}>
            <span>{word}</span>
            <span style={{ color: GOLD_DEEP }}>·</span>
          </span>
        ))
      )}
    </span>
  );
}

const CHIPS = [
  '¿Este proyecto?',
  '¿Esta persona?',
  '¿Este lugar?',
  '¿Este ritmo de vida?',
  '¿Esta oportunidad?',
  '¿Este viaje?',
  '¿Esta elección?',
];

const LEARN = [
  'Hacer preguntas concretas a tu cuerpo.',
  'Obtener respuestas claras, inmediatas y concisas.',
  'Reconocer cuándo una respuesta es un sí y cuándo es un no.',
  'Llevar esas respuestas a tus decisiones reales.',
  'Dejar de tomar decisiones exclusivamente desde la mente.',
  'Incluir a tu cuerpo en elecciones importantes y cotidianas.',
  'Dejar de negociar constantemente con él.',
  'Descubrir posibilidades que quizá nunca habrías considerado.',
];

const WHO = [
  'Tienes una vida que, desde fuera, parece exitosa, pero sientes que la estás construyendo a costa de tu cuerpo.',
  'Te pasas el día juzgando tu cuerpo o intentando que sea diferente.',
  'Tomas tus decisiones principalmente desde la mente.',
  'Tu cuerpo está cansado y no siempre tienes la energía para sostener todo lo que quieres hacer.',
  'Sabes escuchar tu cuerpo, pero después acabas haciendo lo contrario.',
  'Estás cansada de negociar con tu cuerpo para mantener un ritmo de vida que quizá ya no quiere sostener.',
  'Te gustaría obtener respuestas claras de tu cuerpo antes de tomar determinadas decisiones.',
  'Quieres aprender a comunicarte con él sin técnicas complejas ni dedicar horas.',
  'Sientes que hay una vida mucho más grande disponible para ti, y quieres crearla de una manera que también sea grandiosa para tu cuerpo.',
  'Quieres empezar a tomar decisiones que puedan llevarte a lugares que hasta ahora ni siquiera te habías planteado.',
];

const COST = [
  'Negociando con tu cuerpo para sostener una vida que físicamente ya no quieres sostener.',
  'Escuchándolo, pero ignorando sus respuestas.',
  'Tomando decisiones únicamente desde la mente.',
  'Juzgando tu cuerpo y haciéndolo equivocado.',
  'Obligándote a seguir eligiendo aquello que un día te hizo feliz aunque hoy ya no te haga sentir igual.',
  'Dejando pasar oportunidades porque solo puedes elegir entre las opciones que tu mente considera posibles.',
  'Construyendo una vida aparentemente grandiosa que tu cuerpo no puede disfrutar.',
];

const MIND_LIST = [
  'Ya tiene muchísima información.',
  'Tu experiencia también.',
  'Tus conocimientos.',
  'Tus creencias.',
  'Tus expectativas.',
  'Tus miedos.',
  'Tus planes.',
];

const INCLUDED = [
  'Acceso completo a los 21 días.',
  'Una práctica de 10 minutos al día.',
  'El método para hacer preguntas y reconocer las respuestas.',
];

export default function Page() {
  useLandingMotion({ particles: true, particleDensity: 1 });

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: INK,
        fontFamily: `${SANS}`,
        fontWeight: 300,
      }}
    >
      <canvas
        id="om-particles"
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 60,
          pointerEvents: 'none',
        }}
      />

      <div
        id="om-cursor"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 30,
          height: 30,
          margin: '-15px 0 0 -15px',
          border: `1px solid rgba(196,160,90,.9)`,
          borderRadius: '50%',
          zIndex: 9999,
          pointerEvents: 'none',
          opacity: 0,
          transition:
            'width .3s cubic-bezier(.16,1,.3,1), height .3s cubic-bezier(.16,1,.3,1), margin .3s cubic-bezier(.16,1,.3,1), background-color .3s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          id="om-cursor-label"
          style={{
            fontFamily: SANS,
            fontWeight: 400,
            fontSize: '9.5px',
            letterSpacing: '.22em',
            textTransform: 'uppercase',
            color: INK,
            opacity: 0,
            transition: 'opacity .22s',
            whiteSpace: 'nowrap',
          }}
        >
          sí
        </span>
      </div>
      <div
        id="om-cursor-dot"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 4,
          height: 4,
          margin: '-2px 0 0 -2px',
          borderRadius: '50%',
          background: GOLD,
          zIndex: 9999,
          pointerEvents: 'none',
          opacity: 0,
        }}
      />

      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          zIndex: 900,
          background: 'rgba(150,150,150,.22)',
        }}
      >
        <div id="om-progress" style={{ height: '100%', width: '0%', background: GOLD }} />
      </div>

      {/* ---------- header ---------- */}
      <header
        id="om-header"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 800,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
          padding: '24px clamp(20px, 5vw, 64px)',
          backdropFilter: 'blur(16px)',
          transition: 'color .5s, background-color .5s',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 13 }}>
          <span style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 23, letterSpacing: '.01em' }}>
            21 días
          </span>
          <span
            data-show-md
            style={{
              display: 'none',
              fontSize: 10,
              fontWeight: 400,
              letterSpacing: '.3em',
              textTransform: 'uppercase',
              opacity: 0.5,
            }}
          >
            conversar con tu cuerpo
          </span>
        </div>
        <button
          data-hov
          data-cursor-label="47 €"
          onClick={checkout}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '12px 24px',
            border: '1px solid currentColor',
            borderRadius: 999,
            background: 'transparent',
            color: 'inherit',
            fontFamily: SANS,
            fontSize: 12,
            fontWeight: 400,
            letterSpacing: '.12em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            transition: 'background-color .4s, color .4s, border-color .4s',
          }}
          {...hoverFx(
            { background: GOLD, borderColor: GOLD, color: INK },
            { background: 'transparent', borderColor: 'currentColor', color: 'inherit' }
          )}
        >
          Acceder · 47 €
        </button>
      </header>

      {/* ---------- hero ---------- */}
      <section
        data-tone="dark"
        data-grid-collapse="1"
        style={{
          position: 'relative',
          zIndex: 2,
          background: INK,
          color: BONE,
          minHeight: '100vh',
          display: 'grid',
          gridTemplateColumns: '1.12fr .88fr',
          gap: 'clamp(28px, 5vw, 78px)',
          alignItems: 'center',
          padding: 'clamp(122px, 17vh, 200px) clamp(20px, 5vw, 64px) clamp(64px, 10vh, 116px)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(26px, 4vh, 46px)' }}>
          <div
            data-reveal
            data-reveal-group="hero"
            style={{ display: 'flex', alignItems: 'center', gap: 14 }}
          >
            <span style={{ width: 30, height: 1, background: GOLD }} />
            <span style={eyebrow(GOLD)}>una experiencia de 21 días</span>
          </div>

          <h1
            data-reveal
            data-reveal-group="hero"
            style={{
              margin: 0,
              fontFamily: SERIF,
              fontWeight: 300,
              fontSize: 'clamp(48px, 7.8vw, 126px)',
              lineHeight: 0.94,
              letterSpacing: '-.015em',
              textWrap: 'balance',
            }}
          >
            21 días para{' '}
            <em style={{ fontStyle: 'italic', fontWeight: 300, color: GOLD }}>conversar</em> con tu
            cuerpo
          </h1>

          <p
            data-reveal
            data-reveal-group="hero"
            style={{ ...bodyLead, maxWidth: '44ch', opacity: 0.72 }}
          >
            Aprende a conversar con tu cuerpo para crear una vida más grandiosa. Para tener un
            vínculo súper íntimo con lo que te acompaña desde que naces hasta que te mueres.
          </p>

          <div
            data-reveal
            data-reveal-group="hero"
            style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}
          >
            <button
              data-hov
              data-cursor-label="empezar"
              onClick={checkout}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 14,
                padding: '19px 34px',
                border: 'none',
                borderRadius: 999,
                background: BONE,
                color: INK,
                fontFamily: SANS,
                fontSize: 13,
                fontWeight: 400,
                letterSpacing: '.12em',
                textTransform: 'uppercase',
                transition: 'transform .5s cubic-bezier(.16,1,.3,1), background-color .4s',
              }}
              {...hoverFx(
                { transform: 'translateY(-3px)', background: GOLD },
                { transform: 'none', background: BONE }
              )}
            >
              Quiero conversar con mi cuerpo
            </button>
            <a
              data-hov
              href="#aprender"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '19px 26px',
                border: '1px solid rgba(247,246,244,.18)',
                borderRadius: 999,
                color: 'rgba(247,246,244,.7)',
                fontSize: 12,
                fontWeight: 400,
                letterSpacing: '.12em',
                textTransform: 'uppercase',
                transition: 'border-color .4s, color .4s',
              }}
              {...hoverFx(
                { borderColor: GOLD, color: BONE },
                { borderColor: 'rgba(247,246,244,.18)', color: 'rgba(247,246,244,.7)' }
              )}
            >
              Ver el método
            </a>
          </div>

          <div
            data-reveal
            data-reveal-group="hero"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'clamp(22px, 3.4vw, 52px)',
              paddingTop: 'clamp(12px, 2vh, 22px)',
              borderTop: '1px solid rgba(247,246,244,.1)',
            }}
          >
            {[
              { value: '10', count: '10', label: 'minutos al día' },
              { value: '21', count: '21', label: 'días seguidos' },
              { value: '47 €', count: null, label: 'preventa · 10 plazas', gold: true },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{ display: 'flex', flexDirection: 'column', gap: 7 }}
              >
                <span
                  {...(stat.count ? { 'data-count': stat.count } : {})}
                  style={{
                    fontFamily: SERIF,
                    fontWeight: 300,
                    fontSize: 'clamp(34px, 3.6vw, 54px)',
                    lineHeight: 1,
                    ...(stat.gold ? { color: GOLD } : {}),
                  }}
                >
                  {stat.value}
                </span>
                <span style={microLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div data-float="-0.05" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Slot
            ratio="3 / 4"
            border="rgba(247,246,244,.12)"
            veil={INK}
            layerBg="rgba(247,246,244,.03)"
            layerStripe="repeating-linear-gradient(112deg, rgba(196,160,90,.13) 0 1px, transparent 1px 12px)"
            scan="linear-gradient(90deg, transparent, rgba(196,160,90,.85), transparent)"
            padding={18}
            pct
            pctColor={GOLD}
            src={IMAGES.hero}
            alt="Retrato principal"
            label={
              <>
                retrato principal
                <br />
                vertical 3:4
              </>
            }
          />
          <Slot
            ratio="1"
            border="rgba(196,160,90,.3)"
            veil={INK}
            layerBg="rgba(247,246,244,.02)"
            layerStripe="repeating-linear-gradient(112deg, rgba(196,160,90,.16) 0 1px, transparent 1px 10px)"
            style={{ width: '62%', alignSelf: 'flex-end' }}
            src={IMAGES.detail}
            alt="Detalle manos y piel"
            label={
              <>
                detalle
                <br />
                manos / piel
              </>
            }
          />
        </div>
      </section>

      {/* ---------- marquee ---------- */}
      <div
        data-tone="light"
        style={{
          position: 'relative',
          zIndex: 2,
          background: BONE,
          color: INK,
          overflow: 'hidden',
          padding: '20px 0',
        }}
      >
        <div id="om-marquee" style={{ display: 'flex', width: 'max-content' }}>
          <MarqueeRun />
          <MarqueeRun />
        </div>
      </div>

      {/* ---------- escuchar no es conversar ---------- */}
      <section
        data-tone="light"
        style={{
          position: 'relative',
          zIndex: 2,
          background: BONE,
          color: INK,
          padding: sectionPad,
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(42px, 7vh, 86px)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(4px, 1vh, 10px)' }}>
            {[
              'No para aprender a escuchar tu cuerpo.',
              'No para conectar con él.',
            ].map((line) => (
              <span
                key={line}
                data-reveal
                data-reveal-group="neg"
                style={{
                  fontFamily: SERIF,
                  fontWeight: 300,
                  fontSize: 'clamp(30px, 5.4vw, 78px)',
                  lineHeight: 1.08,
                  letterSpacing: '-.01em',
                  opacity: 0.28,
                  textDecoration: 'line-through',
                  textDecorationColor: 'rgba(142,114,49,.6)',
                  textDecorationThickness: '1px',
                }}
              >
                {line}
              </span>
            ))}
            <span
              data-reveal
              data-reveal-group="neg"
              style={{
                fontFamily: SERIF,
                fontWeight: 300,
                fontSize: 'clamp(34px, 6.2vw, 90px)',
                lineHeight: 1.06,
                letterSpacing: '-.015em',
              }}
            >
              Para aprender a{' '}
              <em style={{ fontStyle: 'italic', fontWeight: 400, color: GOLD_DEEP }}>conversar</em>{' '}
              con él.
            </span>
          </div>

          <div
            data-grid-collapse="1"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'clamp(28px, 5vw, 90px)',
            }}
          >
            <div data-reveal style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
              <p style={{ ...bodyLead, opacity: 0.78 }}>
                Porque puedes escuchar perfectamente a tu cuerpo y seguir haciendo exactamente lo
                contrario de lo que te está diciendo.
              </p>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 9,
                  fontSize: '15.5px',
                  lineHeight: 1.6,
                  opacity: 0.5,
                }}
              >
                <span>Puedes sentirlo.</span>
                <span>Puedes estar muy conectada con él.</span>
                <span>
                  Puedes saber que estás cansada, que algo no te sienta bien, que ya no quieres algo,
                  que necesitas otra cosa…
                </span>
                <span style={{ opacity: 0.85 }}>Y aun así seguir eligiendo desde la mente.</span>
              </div>
            </div>
            <div
              data-reveal
              data-narrow
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 22,
                padding: 'clamp(26px, 3.2vw, 44px)',
                borderLeft: '1px solid rgba(11,11,12,.14)',
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 400,
                  letterSpacing: '.34em',
                  textTransform: 'uppercase',
                  color: GOLD_DEEP,
                }}
              >
                la distinción
              </span>
              <p
                style={{
                  margin: 0,
                  fontFamily: SERIF,
                  fontWeight: 300,
                  fontSize: 'clamp(24px, 2.6vw, 38px)',
                  lineHeight: 1.24,
                  textWrap: 'pretty',
                }}
              >
                Escuchar no es conversar. Y conversar tampoco es simplemente preguntar.
              </p>
              <p style={{ margin: 0, fontSize: '15.5px', lineHeight: 1.85, opacity: 0.68, textWrap: 'pretty' }}>
                Conversar es obtener respuestas claras, inmediatas y concisas de tu cuerpo y aprender
                a utilizarlas para elegir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- la pregunta ---------- */}
      <section
        data-tone="dark"
        style={{
          position: 'relative',
          zIndex: 2,
          background: INK,
          color: BONE,
          padding: 'clamp(90px, 15vh, 170px) clamp(20px, 5vw, 64px)',
        }}
      >
        <div
          data-grid-collapse="1"
          style={{
            maxWidth: 1420,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '.92fr 1.08fr',
            gap: 'clamp(34px, 5vw, 88px)',
            alignItems: 'start',
          }}
        >
          <div
            data-unstick="1"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 26,
              position: 'sticky',
              top: 118,
            }}
          >
            <span data-reveal style={eyebrow(GOLD)}>
              02 · la pregunta
            </span>
            <h2
              data-reveal
              style={{
                margin: 0,
                fontFamily: SERIF,
                fontWeight: 300,
                fontSize: 'clamp(34px, 4.6vw, 70px)',
                lineHeight: 1.04,
                letterSpacing: '-.015em',
                textWrap: 'balance',
              }}
            >
              ¿Y si tu cuerpo pudiera participar{' '}
              <em style={{ fontStyle: 'italic', color: GOLD }}>realmente</em> en tu vida?
            </h2>
            <div
              data-reveal
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                fontSize: '15.5px',
                lineHeight: 1.7,
                opacity: 0.5,
              }}
            >
              <span>Quizá llevas años tomando decisiones intentando hacerlo “bien”.</span>
              <span>Decides desde la lógica. Desde lo que tiene sentido.</span>
              <span>Desde lo que deberías hacer. Desde lo que funcionó en el pasado.</span>
              <span>Desde lo que los demás esperan.</span>
              <span style={{ opacity: 1 }}>Y muchas veces tu cuerpo queda fuera de la ecuación.</span>
            </div>
            <Slot
              ratio="16 / 10"
              border="rgba(247,246,244,.12)"
              veil={INK}
              layerBg="rgba(247,246,244,.03)"
              layerStripe="repeating-linear-gradient(112deg, rgba(196,160,90,.12) 0 1px, transparent 1px 12px)"
              scan="linear-gradient(90deg, transparent, rgba(196,160,90,.8), transparent)"
              src={IMAGES.editorial}
              alt="Imagen editorial"
              label={
                <>
                  imagen editorial
                  <br />
                  16:10 · gesto / detalle
                </>
              }
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <p data-reveal style={{ ...bodyLead, opacity: 0.74, maxWidth: '46ch' }}>
              ¿Qué cambiaría si antes de tomar una decisión pudieras preguntarle a tu cuerpo? Pásale
              el cursor por encima. Pregúntale.
            </p>
            <div
              id="om-chips"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
                gap: 10,
              }}
            >
              {CHIPS.map((q) => (
                <button
                  key={q}
                  data-chip
                  data-hov
                  data-cursor-label="pregunta"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                    padding: '28px 22px',
                    border: '1px solid rgba(247,246,244,.13)',
                    background: 'transparent',
                    color: BONE,
                    fontFamily: SERIF,
                    fontWeight: 300,
                    fontSize: 'clamp(21px, 1.8vw, 29px)',
                    textAlign: 'left',
                    transition:
                      'border-color .45s, background-color .45s, transform .55s cubic-bezier(.16,1,.3,1)',
                  }}
                >
                  <span>{q}</span>
                  <span
                    data-chip-answer
                    style={{
                      fontSize: '9.5px',
                      fontWeight: 400,
                      fontFamily: SANS,
                      letterSpacing: '.26em',
                      textTransform: 'uppercase',
                      color: GOLD,
                      opacity: 0,
                      transition: 'opacity .4s',
                    }}
                  >
                    sí
                  </span>
                </button>
              ))}
            </div>
            <div
              data-reveal
              style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 12 }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: '15.5px',
                  lineHeight: 1.85,
                  opacity: 0.6,
                  maxWidth: '52ch',
                  textWrap: 'pretty',
                }}
              >
                Y recibir una respuesta clara de tu cuerpo para poder elegir desde ahí. No para que
                tu cuerpo decida por ti.
              </p>
              <p
                style={{
                  margin: 0,
                  fontFamily: SERIF,
                  fontWeight: 300,
                  fontSize: 'clamp(22px, 2.1vw, 32px)',
                  lineHeight: 1.3,
                  color: GOLD,
                  maxWidth: '38ch',
                }}
              >
                Sino para que deje de ser el gran olvidado de tus decisiones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- el método ---------- */}
      <section
        id="aprender"
        data-tone="light"
        style={{
          position: 'relative',
          zIndex: 2,
          background: BONE,
          color: INK,
          padding: 'clamp(90px, 16vh, 176px) clamp(20px, 5vw, 64px)',
        }}
      >
        <div
          style={{
            maxWidth: 1420,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(46px, 7vh, 84px)',
          }}
        >
          <div
            data-grid-collapse="1"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'clamp(28px, 5vw, 80px)',
              alignItems: 'end',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <span data-reveal style={eyebrow(GOLD_DEEP)}>
                03 · el método
              </span>
              <h2
                data-reveal
                style={{
                  margin: 0,
                  fontFamily: SERIF,
                  fontWeight: 300,
                  fontSize: 'clamp(34px, 4.8vw, 74px)',
                  lineHeight: 1.03,
                  letterSpacing: '-.015em',
                  textWrap: 'balance',
                }}
              >
                Esto es lo que vas a aprender en 21 días
              </h2>
            </div>
            <div data-reveal style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <p style={{ ...bodyLead, opacity: 0.74 }}>
                Una manera sencilla de conversar con tu cuerpo para obtener respuestas concretas y
                utilizarlas en tu vida cotidiana.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['no necesitas horas', 'sin práctica complicada', 'sin saber nada previo'].map(
                  (tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: '10px 16px',
                        border: '1px solid rgba(11,11,12,.16)',
                        borderRadius: 999,
                        fontSize: '9.5px',
                        fontWeight: 400,
                        letterSpacing: '.22em',
                        textTransform: 'uppercase',
                        opacity: 0.62,
                      }}
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          <div
            data-grid-collapse="1"
            style={{
              display: 'grid',
              gridTemplateColumns: '1.3fr .7fr',
              gap: 'clamp(28px, 5vw, 74px)',
              alignItems: 'start',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {LEARN.map((item, i) => (
                <div
                  key={item}
                  data-reveal
                  data-reveal-group="learn"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '46px 1fr',
                    gap: 18,
                    alignItems: 'baseline',
                    padding: '24px 0',
                    borderTop: '1px solid rgba(11,11,12,.13)',
                    ...(i === LEARN.length - 1
                      ? { borderBottom: '1px solid rgba(11,11,12,.13)' }
                      : {}),
                  }}
                >
                  <span
                    style={{
                      fontSize: '10.5px',
                      fontWeight: 400,
                      letterSpacing: '.16em',
                      color: GOLD_DEEP,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    style={{
                      fontFamily: SERIF,
                      fontWeight: 300,
                      fontSize: 'clamp(21px, 1.9vw, 30px)',
                      lineHeight: 1.32,
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
              <Slot
                ratio="4 / 5"
                border="rgba(11,11,12,.15)"
                veil={BONE}
                layerBg="rgba(11,11,12,.02)"
                layerStripe="repeating-linear-gradient(112deg, rgba(11,11,12,.1) 0 1px, transparent 1px 12px)"
                scan="linear-gradient(90deg, transparent, rgba(142,114,49,.8), transparent)"
                src={IMAGES.practice}
                alt="Imagen de la práctica diaria"
                label={
                  <>
                    imagen práctica
                    <br />
                    4:5 · los 10 min al día
                  </>
                }
              />
              <p
                data-reveal
                style={{
                  margin: 0,
                  fontFamily: SERIF,
                  fontWeight: 300,
                  fontSize: 'clamp(21px, 1.9vw, 29px)',
                  lineHeight: 1.38,
                  opacity: 0.85,
                  textWrap: 'pretty',
                }}
              >
                Cuando tu cuerpo empieza a formar parte de tus elecciones, aparecen posibilidades que
                antes ni siquiera contemplabas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- otra fuente de información ---------- */}
      <section
        data-tone="dark"
        style={{
          position: 'relative',
          zIndex: 2,
          background: INK,
          color: BONE,
          padding: sectionPad,
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(38px, 6vh, 66px)',
          }}
        >
          <h2
            data-reveal
            style={{
              margin: 0,
              fontFamily: SERIF,
              fontWeight: 300,
              fontSize: 'clamp(32px, 4.8vw, 72px)',
              lineHeight: 1.05,
              letterSpacing: '-.015em',
              maxWidth: '22ch',
              textWrap: 'balance',
            }}
          >
            No se trata de tener más información. Se trata de tener{' '}
            <em style={{ fontStyle: 'italic', color: GOLD }}>otra fuente</em> de información.
          </h2>
          <div
            data-grid-collapse="1"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'clamp(28px, 4vw, 66px)',
            }}
          >
            <div
              data-reveal
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 22,
                paddingTop: 26,
                borderTop: '1px solid rgba(247,246,244,.14)',
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 400,
                  letterSpacing: '.34em',
                  textTransform: 'uppercase',
                  opacity: 0.45,
                }}
              >
                tu mente
              </span>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  fontSize: '15.5px',
                  lineHeight: 1.5,
                  opacity: 0.5,
                }}
              >
                {MIND_LIST.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </div>
            </div>
            <div
              data-reveal
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 22,
                paddingTop: 26,
                borderTop: `1px solid ${GOLD}`,
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 400,
                  letterSpacing: '.34em',
                  textTransform: 'uppercase',
                  color: GOLD,
                }}
              >
                tu cuerpo
              </span>
              <p
                style={{
                  margin: 0,
                  fontFamily: SERIF,
                  fontWeight: 300,
                  fontSize: 'clamp(23px, 2.3vw, 34px)',
                  lineHeight: 1.28,
                  textWrap: 'pretty',
                }}
              >
                También está recibiendo información constantemente.
              </p>
              <p style={{ margin: 0, fontSize: '15.5px', lineHeight: 1.85, opacity: 0.68, textWrap: 'pretty' }}>
                La diferencia está en aprender a conversar con él de una manera que te permita
                obtener respuestas y llevarlas a la acción. Ahí es donde esta experiencia cambia
                completamente la manera en la que eliges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- para quién es ---------- */}
      <section
        data-tone="light"
        style={{
          position: 'relative',
          zIndex: 2,
          background: BONE,
          color: INK,
          padding: 'clamp(90px, 15vh, 170px) clamp(20px, 5vw, 64px)',
        }}
      >
        <div
          style={{
            maxWidth: 1420,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(40px, 6vh, 68px)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <span data-reveal style={eyebrow(GOLD_DEEP)}>
              04 · para quién
            </span>
            <h2
              data-reveal
              style={{
                margin: 0,
                fontFamily: SERIF,
                fontWeight: 300,
                fontSize: 'clamp(34px, 4.8vw, 74px)',
                lineHeight: 1.03,
                letterSpacing: '-.015em',
              }}
            >
              ¿Para quién es esta experiencia?
            </h2>
            <p
              data-reveal
              style={{
                margin: 0,
                fontSize: '10.5px',
                fontWeight: 400,
                letterSpacing: '.26em',
                textTransform: 'uppercase',
                opacity: 0.45,
              }}
            >
              esta experiencia es para ti si…
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(330px, 100%), 1fr))',
              gap: 1,
              background: 'rgba(11,11,12,.12)',
            }}
          >
            {WHO.map((item) => (
              <div
                key={item}
                data-reveal
                data-reveal-group="who"
                data-hov
                style={{
                  background: BONE,
                  padding: 'clamp(24px, 2.6vw, 34px)',
                  display: 'flex',
                  gap: 16,
                  alignItems: 'flex-start',
                  transition: 'background-color .5s',
                }}
                {...hoverFx({ background: '#EFEDE7' }, { background: BONE })}
              >
                <span
                  style={{
                    flex: 'none',
                    width: 4,
                    height: 4,
                    marginTop: 10,
                    borderRadius: '50%',
                    background: GOLD_DEEP,
                  }}
                />
                <span style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.8, textWrap: 'pretty' }}>
                  {item}
                </span>
              </div>
            ))}
          </div>

          <p
            data-reveal
            style={{
              margin: 0,
              fontFamily: SERIF,
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(23px, 2.6vw, 38px)',
              lineHeight: 1.32,
              color: GOLD_DEEP,
              maxWidth: '34ch',
              textWrap: 'pretty',
            }}
          >
            Si estás leyendo esto y tu cuerpo acaba de decirte “sí”, probablemente ya sabes.
          </p>
        </div>
      </section>

      {/* ---------- el origen ---------- */}
      <section
        data-tone="dark"
        style={{
          position: 'relative',
          zIndex: 2,
          background: INK,
          color: BONE,
          padding: 'clamp(90px, 16vh, 176px) clamp(20px, 5vw, 64px)',
        }}
      >
        <div
          data-grid-collapse="1"
          style={{
            maxWidth: 1420,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '.82fr 1.18fr',
            gap: 'clamp(30px, 5vw, 84px)',
            alignItems: 'center',
          }}
        >
          <Slot
            ratio="4 / 5"
            border="rgba(247,246,244,.13)"
            veil={INK}
            layerBg="rgba(247,246,244,.03)"
            layerStripe="repeating-linear-gradient(112deg, rgba(196,160,90,.12) 0 1px, transparent 1px 12px)"
            scan="linear-gradient(90deg, transparent, rgba(196,160,90,.8), transparent)"
            padding={18}
            src={IMAGES.origin}
            alt="Retrato de trayectoria"
            label={
              <>
                retrato trayectoria
                <br />
                4:5 · tú, cercana
              </>
            }
          />
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(24px, 3.4vh, 40px)' }}
          >
            <span data-reveal style={eyebrow(GOLD)}>
              05 · el origen
            </span>
            <h2
              data-reveal
              style={{
                margin: 0,
                fontFamily: SERIF,
                fontWeight: 300,
                fontSize: 'clamp(32px, 4.4vw, 66px)',
                lineHeight: 1.04,
                letterSpacing: '-.015em',
                textWrap: 'balance',
              }}
            >
              Lo que hay detrás de estos 21 días
            </h2>
            <div style={{ display: 'flex', gap: 'clamp(24px, 4vw, 58px)', flexWrap: 'wrap' }}>
              {[
                { value: '15', count: '15', label: 'años de aprendizaje' },
                { value: '6 cifras', count: null, label: 'invertidas en mi proceso' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  data-reveal
                  data-reveal-group="origin"
                  style={{ display: 'flex', flexDirection: 'column', gap: 7 }}
                >
                  <span
                    {...(stat.count ? { 'data-count': stat.count } : {})}
                    style={{
                      fontFamily: SERIF,
                      fontWeight: 300,
                      fontSize: 'clamp(42px, 4.8vw, 72px)',
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </span>
                  <span style={microLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
            <div
              data-reveal
              style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: '56ch' }}
            >
              <p style={{ ...bodyLead, lineHeight: 1.85, opacity: 0.72 }}>
                Esta experiencia no nace de un curso que hice ayer y decidí empaquetar. Es el
                resultado de 15 años de aprendizaje, experimentación, formación y experiencia.
              </p>
              <p style={{ ...bodyLead, lineHeight: 1.85, opacity: 0.72 }}>
                He probado, estudiado, experimentado y descartado muchísimo para llegar a comprender
                aquello que hoy puedo transmitirte de una manera sencilla.
              </p>
              <p
                style={{
                  margin: 0,
                  fontFamily: SERIF,
                  fontWeight: 300,
                  fontSize: 'clamp(22px, 2.1vw, 32px)',
                  lineHeight: 1.32,
                  textWrap: 'pretty',
                }}
              >
                Tú no necesitas recorrer todo ese camino. Puedes acceder ahora a todo ese recorrido
                condensado en 21 días.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- qué pasa si no lo haces ---------- */}
      <section
        data-tone="light"
        style={{
          position: 'relative',
          zIndex: 2,
          background: BONE,
          color: INK,
          padding: sectionPad,
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(38px, 6vh, 62px)',
          }}
        >
          <h2
            data-reveal
            style={{
              margin: 0,
              fontFamily: SERIF,
              fontWeight: 300,
              fontSize: 'clamp(34px, 4.8vw, 74px)',
              lineHeight: 1.03,
              letterSpacing: '-.015em',
            }}
          >
            ¿Qué pasa si no lo haces?
          </h2>
          <p
            data-reveal
            style={{
              margin: 0,
              fontSize: '10.5px',
              fontWeight: 400,
              letterSpacing: '.26em',
              textTransform: 'uppercase',
              opacity: 0.45,
            }}
          >
            puedes seguir los próximos años…
          </p>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {COST.map((item, i) => (
              <div
                key={item}
                data-reveal
                data-reveal-group="cost"
                data-hov
                style={{
                  padding: '22px 0',
                  borderTop: '1px solid rgba(11,11,12,.12)',
                  ...(i === COST.length - 1
                    ? { borderBottom: '1px solid rgba(11,11,12,.12)' }
                    : {}),
                  fontSize: 'clamp(17px, 1.5vw, 23px)',
                  lineHeight: 1.55,
                  opacity: 0.5,
                  transition: 'opacity .5s, padding-left .5s',
                }}
                {...hoverFx(
                  { opacity: '.95', paddingLeft: '14px' },
                  { opacity: '.5', paddingLeft: '0px' }
                )}
              >
                {item}
              </div>
            ))}
          </div>
          <div
            data-reveal
            style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: '46ch' }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: SERIF,
                fontWeight: 300,
                fontSize: 'clamp(26px, 3vw, 46px)',
                lineHeight: 1.2,
              }}
            >
              O puedes empezar a preguntarle{' '}
              <em style={{ fontStyle: 'italic', color: GOLD_DEEP }}>algo diferente</em>.
            </p>
            <p style={{ margin: 0, fontSize: '15.5px', lineHeight: 1.85, opacity: 0.68, textWrap: 'pretty' }}>
              Y descubrir qué puede crear contigo cuando dejas de tratarlo como algo que tienes que
              controlar y empiezas a tratarlo como un verdadero interlocutor.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- inversión ---------- */}
      <section
        id="acceder"
        data-tone="dark"
        style={{
          position: 'relative',
          zIndex: 2,
          background: INK,
          color: BONE,
          padding: 'clamp(90px, 15vh, 170px) clamp(20px, 5vw, 64px)',
        }}
      >
        <div
          data-grid-collapse="1"
          style={{
            maxWidth: 1180,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(30px, 4vw, 68px)',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(22px, 3vh, 32px)' }}>
            <span data-reveal style={eyebrow(GOLD)}>
              06 · tu inversión
            </span>
            <h2
              data-reveal
              style={{
                margin: 0,
                fontFamily: SERIF,
                fontWeight: 300,
                fontSize: 'clamp(32px, 4.4vw, 66px)',
                lineHeight: 1.03,
                letterSpacing: '-.015em',
                textWrap: 'balance',
              }}
            >
              21 días para aprender a conversar con tu cuerpo
            </h2>
            <p data-reveal style={{ ...bodyLead, lineHeight: 1.85, opacity: 0.68, maxWidth: '40ch' }}>
              No necesitas más tiempo. No necesitas una vida perfecta. No necesitas dejarlo todo para
              empezar. Solo 10 minutos al día.
            </p>
            <div data-reveal style={{ display: 'flex', gap: 28, paddingTop: 6 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span
                  style={{
                    fontFamily: SERIF,
                    fontWeight: 300,
                    fontSize: 'clamp(30px, 3vw, 44px)',
                    lineHeight: 1,
                  }}
                >
                  21
                </span>
                <span style={microLabel}>días</span>
              </div>
              <div style={{ width: 1, background: 'rgba(247,246,244,.14)' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span
                  style={{
                    fontFamily: SERIF,
                    fontWeight: 300,
                    fontSize: 'clamp(30px, 3vw, 44px)',
                    lineHeight: 1,
                  }}
                >
                  10 min
                </span>
                <span style={microLabel}>al día</span>
              </div>
            </div>
          </div>

          <div
            data-reveal
            style={{
              position: 'relative',
              padding: 'clamp(28px, 3.4vw, 48px)',
              border: '1px solid rgba(196,160,90,.34)',
              display: 'flex',
              flexDirection: 'column',
              gap: 28,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: GOLD,
                  animation: 'om-breathe 3.6s ease-in-out infinite',
                }}
              />
              <span
                style={{
                  fontSize: '9.5px',
                  fontWeight: 400,
                  letterSpacing: '.28em',
                  textTransform: 'uppercase',
                  color: GOLD,
                }}
              >
                preventa · 10 primeras plazas
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 18 }}>
              <span
                style={{
                  fontFamily: SERIF,
                  fontWeight: 300,
                  fontSize: 'clamp(66px, 8.4vw, 124px)',
                  lineHeight: 0.84,
                  letterSpacing: '-.02em',
                }}
              >
                47 €
              </span>
              <span
                style={{
                  fontSize: 'clamp(17px, 1.6vw, 22px)',
                  fontWeight: 300,
                  opacity: 0.38,
                  textDecoration: 'line-through',
                  textDecorationColor: 'rgba(196,160,90,.8)',
                  paddingBottom: 12,
                }}
              >
                97 €
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 13,
                padding: '20px 0',
                borderTop: '1px solid rgba(247,246,244,.12)',
                borderBottom: '1px solid rgba(247,246,244,.12)',
              }}
            >
              {INCLUDED.map((item, i) => (
                <span
                  key={item}
                  style={{ display: 'flex', gap: 14, alignItems: 'baseline', fontSize: 15, opacity: 0.78 }}
                >
                  <span
                    style={{
                      color: GOLD,
                      fontSize: '9.5px',
                      fontWeight: 400,
                      letterSpacing: '.18em',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {item}
                </span>
              ))}
            </div>
            <button
              data-hov
              data-cursor-label="pagar"
              onClick={checkout}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                padding: '21px 28px',
                border: 'none',
                borderRadius: 999,
                background: GOLD,
                color: INK,
                fontFamily: SANS,
                fontSize: 13,
                fontWeight: 400,
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                transition: 'transform .5s cubic-bezier(.16,1,.3,1), background-color .4s',
              }}
              {...hoverFx(
                { transform: 'translateY(-3px)', background: GOLD_SOFT },
                { transform: 'none', background: GOLD }
              )}
            >
              Quiero conversar con mi cuerpo
            </button>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 400,
                  letterSpacing: '.24em',
                  textTransform: 'uppercase',
                  opacity: 0.42,
                  textAlign: 'center',
                }}
              >
                pago seguro con stripe · tarjeta, apple pay, google pay
              </span>
              <span
                style={{ fontSize: '12.5px', lineHeight: 1.65, opacity: 0.38, textAlign: 'center' }}
              >
                Precio especial de preventa para las primeras 10 personas. Después, el precio será de
                97 €.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- cierre ---------- */}
      <section
        data-tone="light"
        data-grid-collapse="1"
        style={{
          position: 'relative',
          zIndex: 2,
          background: BONE,
          color: INK,
          minHeight: '96vh',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(30px, 5vw, 80px)',
          alignItems: 'center',
          padding: 'clamp(80px, 14vh, 150px) clamp(20px, 5vw, 64px)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(24px, 4vh, 42px)' }}>
          <span data-reveal data-reveal-group="end" style={eyebrow(GOLD_DEEP)}>
            accede hoy
          </span>
          <h2
            data-reveal
            data-reveal-group="end"
            style={{
              margin: 0,
              fontFamily: SERIF,
              fontWeight: 300,
              fontSize: 'clamp(40px, 6.4vw, 104px)',
              lineHeight: 0.98,
              letterSpacing: '-.02em',
              textWrap: 'balance',
            }}
          >
            Quiero conversar con mi{' '}
            <em style={{ fontStyle: 'italic', color: GOLD_DEEP }}>cuerpo</em>
          </h2>
          <p
            data-reveal
            data-reveal-group="end"
            style={{ ...bodyLead, maxWidth: '46ch', lineHeight: 1.85, opacity: 0.7 }}
          >
            No necesitas esperar a que tu cuerpo grite para empezar a hacerle caso. Puedes empezar
            ahora.
          </p>
          <button
            data-reveal
            data-reveal-group="end"
            data-hov
            data-cursor-label="47 €"
            onClick={checkout}
            style={{
              alignSelf: 'flex-start',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 14,
              padding: '22px 40px',
              border: 'none',
              borderRadius: 999,
              background: INK,
              color: BONE,
              fontFamily: SANS,
              fontSize: 13,
              fontWeight: 400,
              letterSpacing: '.14em',
              textTransform: 'uppercase',
              transition: 'transform .5s cubic-bezier(.16,1,.3,1), background-color .4s',
            }}
            {...hoverFx(
              { transform: 'translateY(-4px)', background: GOLD_DEEP },
              { transform: 'none', background: INK }
            )}
          >
            Acceder por 47 €
          </button>
          <div
            data-reveal
            data-reveal-group="end"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px 20px',
              fontSize: '9.5px',
              fontWeight: 400,
              letterSpacing: '.26em',
              textTransform: 'uppercase',
              opacity: 0.45,
            }}
          >
            {MARQUEE_WORDS.map((word, i) => (
              <span key={word} style={{ display: 'contents' }}>
                <span>{word}</span>
                {i < MARQUEE_WORDS.length - 1 ? <span style={{ color: GOLD_DEEP }}>·</span> : null}
              </span>
            ))}
          </div>
        </div>
        <Slot
          ratio="4 / 5"
          border="rgba(11,11,12,.15)"
          veil={BONE}
          layerBg="rgba(11,11,12,.02)"
          layerStripe="repeating-linear-gradient(112deg, rgba(11,11,12,.1) 0 1px, transparent 1px 12px)"
          scan="linear-gradient(90deg, transparent, rgba(142,114,49,.85), transparent)"
          padding={18}
          pct
          pctColor={GOLD_DEEP}
          src={IMAGES.closing}
          alt="Imagen de cierre"
          label={
            <>
              imagen de cierre
              <br />
              4:5 · vertical
            </>
          }
        />
      </section>

      {/* ---------- footer ---------- */}
      <footer
        data-tone="dark"
        style={{
          position: 'relative',
          zIndex: 2,
          background: INK,
          color: BONE,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 18,
          padding: '38px clamp(20px, 5vw, 64px)',
        }}
      >
        <span style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 19, opacity: 0.75 }}>
          21 días para conversar con tu cuerpo
        </span>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 24,
            fontSize: '9.5px',
            fontWeight: 400,
            letterSpacing: '.26em',
            textTransform: 'uppercase',
            opacity: 0.4,
          }}
        >
          <a data-hov href="#acceder">
            acceder
          </a>
          <span>pago vía stripe</span>
          <span>© 2026</span>
        </div>
      </footer>
    </div>
  );
}
