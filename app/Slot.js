'use client';

const SERIF = "'Cormorant Garamond', serif";

export default function Slot({
  ratio = '3 / 4',
  border,
  veil,
  layerBg,
  layerStripe,
  scan,
  label,
  pct = false,
  pctColor,
  padding = 16,
  src,
  alt = '',
  style,
}) {
  return (
    <div
      data-slot
      data-hov
      data-cursor-label="tu imagen"
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: ratio,
        overflow: 'hidden',
        border: `1px solid ${border}`,
        transformStyle: 'preserve-3d',
        ...style,
      }}
    >
      <div
        data-slot-layer
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: src ? 'transparent' : layerBg,
          backgroundImage: src ? undefined : layerStripe,
        }}
      >
        {src ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={src}
            alt={alt}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : null}
      </div>

      {scan ? (
        <div
          data-slot-scan
          style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 1, background: scan }}
        />
      ) : null}

      <div data-slot-veil style={{ position: 'absolute', inset: 0, background: veil }} />

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 12,
          padding,
        }}
      >
        <span
          data-slot-label
          style={{
            fontSize: '9.5px',
            fontWeight: 400,
            letterSpacing: '.24em',
            textTransform: 'uppercase',
            lineHeight: 1.9,
            opacity: 0.5,
          }}
        >
          {src ? null : label}
        </span>
        {pct ? (
          <span data-slot-pct style={{ fontFamily: SERIF, fontSize: 16, color: pctColor }}>
            0%
          </span>
        ) : null}
      </div>
    </div>
  );
}
