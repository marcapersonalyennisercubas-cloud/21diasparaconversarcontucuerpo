'use client';

import { useEffect } from 'react';

const GOLD = '196,160,90';
const GOLD_DARK = '142,114,49';

export function useLandingMotion({ particles = true, particleDensity = 1 } = {}) {
  useEffect(() => {
    const cleanups = [];
    const reduce =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const state = {
      scrollVel: 0,
      lastTop: 0,
      tone: null,
      mouse: null,
      burst: null,
      groupCounts: {},
      floats: [],
      slots: [],
      splitId: 0,
    };

    const clockLive = () => {
      if (document.hidden || document.visibilityState === 'hidden') return false;
      const t = document.timeline && document.timeline.currentTime;
      return !(t === 0 || t == null);
    };

    const allRevealables = () => document.querySelectorAll('[data-reveal],[data-count]');

    /* ---------- headings assemble word by word ---------- */
    const initSplit = () => {
      if (reduce) return;
      document.querySelectorAll('h1,h2').forEach((h) => {
        if (h.dataset.splitGid) return;
        h.dataset.splitGid = 'w' + ++state.splitId;
        const gid = h.dataset.splitGid;
        const walk = (node) => {
          Array.from(node.childNodes).forEach((n) => {
            if (n.nodeType === 3) {
              if (!n.textContent.trim()) return;
              const frag = document.createDocumentFragment();
              n.textContent.split(/(\s+)/).forEach((part) => {
                if (!part) return;
                if (/^\s+$/.test(part)) {
                  frag.appendChild(document.createTextNode(part));
                  return;
                }
                const s = document.createElement('span');
                s.textContent = part;
                s.style.display = 'inline-block';
                s.setAttribute('data-reveal', '');
                s.setAttribute('data-reveal-group', gid);
                frag.appendChild(s);
              });
              node.replaceChild(frag, n);
            } else if (n.nodeType === 1 && !n.hasAttribute('data-reveal')) {
              walk(n);
            }
          });
        };
        walk(h);
      });
    };

    /* ---------- scroll-linked drift ---------- */
    const initFloats = () => {
      if (reduce) return;
      const add = (el, k) => {
        if (el.dataset.floatWired === '1') return;
        el.dataset.floatWired = '1';
        state.floats.push({ el, k });
      };
      document
        .querySelectorAll('[data-float]')
        .forEach((el) => add(el, parseFloat(el.getAttribute('data-float')) || 0));
      document.querySelectorAll('h1,h2').forEach((el) => add(el, -0.035));
    };

    const updateFloats = () => {
      if (!state.floats.length) return;
      const vh = window.innerHeight || 800;
      state.floats.forEach((f) => {
        const r = f.el.getBoundingClientRect();
        if (r.bottom < -280 || r.top > vh + 280) return;
        const rel = (r.top + r.height / 2 - vh / 2) / vh;
        f.el.style.transform = 'translate3d(0,' + (rel * f.k * 150).toFixed(2) + 'px,0)';
      });
    };

    /* ---------- reveals ---------- */
    const registerReveals = () => {
      const prep = (el) => {
        if (el.dataset.revealed === '1' || el.dataset.revealPrepped === '1') return;
        el.dataset.revealPrepped = '1';
        let delay = 0;
        const g = el.getAttribute('data-reveal-group');
        if (g) {
          const n = state.groupCounts[g] || 0;
          state.groupCounts[g] = n + 1;
          delay = Math.min(n * 0.07, 0.55);
        }
        el.dataset.revealDelay = String(delay);
        if (!reduce && el.hasAttribute('data-reveal')) {
          el.style.opacity = '0';
          el.style.transform = 'translate3d(0,30px,0)';
          el.style.filter = 'blur(4px)';
        }
      };
      allRevealables().forEach(prep);
    };

    const reveal = (el, instant) => {
      if (el.dataset.revealed === '1') return;
      el.dataset.revealed = '1';
      const snap = instant || reduce || !clockLive();
      if (snap) {
        el.style.transition = 'none';
      } else {
        const d = parseFloat(el.dataset.revealDelay || '0') || 0;
        el.style.transition =
          'opacity 1s cubic-bezier(.16,1,.3,1) ' +
          d +
          's, transform 1.1s cubic-bezier(.16,1,.3,1) ' +
          d +
          's, filter .9s ease ' +
          d +
          's';
      }
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.filter = 'none';
      if (el.hasAttribute('data-count')) runCount(el, snap);
    };

    const revealAll = (instant) => allRevealables().forEach((el) => reveal(el, instant));

    const checkReveals = () => {
      const vh = window.innerHeight || 800;
      allRevealables().forEach((el) => {
        if (el.dataset.revealed === '1') return;
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.94 && r.bottom > -80) reveal(el);
      });
    };

    const runCount = (el, instant) => {
      if (el.dataset.counted === '1') return;
      el.dataset.counted = '1';
      const target = parseInt(el.getAttribute('data-count'), 10);
      if (isNaN(target)) return;
      if (instant || reduce) {
        el.textContent = String(target);
        return;
      }
      const start = performance.now();
      const dur = 1200;
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1);
        el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    /* ---------- scroll-driven image slots ---------- */
    const registerSlots = () => {
      document.querySelectorAll('[data-slot]').forEach((el) => {
        if (el.dataset.slotWired === '1') return;
        el.dataset.slotWired = '1';
        const rec = {
          el,
          layer: el.querySelector('[data-slot-layer]'),
          veil: el.querySelector('[data-slot-veil]'),
          scan: el.querySelector('[data-slot-scan]'),
          label: el.querySelector('[data-slot-label]'),
          pct: el.querySelector('[data-slot-pct]'),
          tx: 0,
          ty: 0,
        };
        if (rec.veil) rec.veil.style.willChange = 'transform';
        if (rec.layer) rec.layer.style.willChange = 'transform';
        state.slots.push(rec);
        if (reduce) return;
        const onMove = (e) => {
          const r = el.getBoundingClientRect();
          rec.tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
          rec.ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
          el.style.transition = 'none';
          el.style.transform =
            'perspective(900px) rotateY(' +
            (rec.tx * 3.4).toFixed(2) +
            'deg) rotateX(' +
            (-rec.ty * 3.4).toFixed(2) +
            'deg)';
        };
        const onLeave = () => {
          rec.tx = 0;
          rec.ty = 0;
          el.style.transition = 'transform .9s cubic-bezier(.16,1,.3,1)';
          el.style.transform = 'none';
        };
        el.addEventListener('mousemove', onMove);
        el.addEventListener('mouseleave', onLeave);
        cleanups.push(() => {
          el.removeEventListener('mousemove', onMove);
          el.removeEventListener('mouseleave', onLeave);
        });
      });
    };

    const updateSlots = () => {
      if (!state.slots.length) return;
      const vh = window.innerHeight || 800;
      const live = clockLive() && !reduce;
      state.slots.forEach((s) => {
        const r = s.el.getBoundingClientRect();
        if (r.bottom < -300 || r.top > vh + 300) return;
        const p = Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height)));
        const e = Math.max(0, Math.min(1, (vh * 0.94 - r.top) / (r.height * 0.62)));
        if (!live) {
          if (s.veil) s.veil.style.transform = 'translate3d(0,-101%,0)';
          if (s.layer) s.layer.style.transform = 'none';
          if (s.scan) s.scan.style.opacity = '0';
          if (s.pct) s.pct.textContent = '100%';
          return;
        }
        if (s.veil) s.veil.style.transform = 'translate3d(0,' + (-e * 101).toFixed(2) + '%,0)';
        if (s.layer) {
          const sc = 1.14 - 0.14 * p;
          s.layer.style.transform =
            'scale(' + sc.toFixed(4) + ') translate3d(0,' + ((0.5 - p) * 26).toFixed(2) + 'px,0)';
        }
        if (s.scan) {
          s.scan.style.opacity = (e > 0.02 && e < 0.99 ? 0.9 : 0).toFixed(2);
          s.scan.style.transform = 'translate3d(0,' + (e * (r.height - 1)).toFixed(1) + 'px,0)';
        }
        if (s.pct) s.pct.textContent = Math.round(e * 100) + '%';
        if (s.label) {
          s.label.style.transform = 'translate3d(0,' + ((1 - e) * 14).toFixed(1) + 'px,0)';
          s.label.style.opacity = (0.18 + e * 0.42).toFixed(2);
        }
      });
    };

    const settleSlots = () => {
      state.slots.forEach((s) => {
        if (s.veil) {
          s.veil.style.transition = 'none';
          s.veil.style.transform = 'translate3d(0,-101%,0)';
        }
        if (s.layer) s.layer.style.transform = 'none';
        if (s.scan) s.scan.style.opacity = '0';
        if (s.label) {
          s.label.style.opacity = '0.5';
          s.label.style.transform = 'none';
        }
        if (s.pct) s.pct.textContent = '100%';
      });
    };

    /* ---------- scroll: progress, header tone, marquee ---------- */
    const initScroll = () => {
      const bar = document.getElementById('om-progress');
      const header = document.getElementById('om-header');
      const marquee = document.getElementById('om-marquee');
      const sc = document.scrollingElement || document.documentElement;
      let raf = null;

      const update = () => {
        raf = null;
        const top = sc.scrollTop || window.scrollY || 0;
        const vh = sc.clientHeight || window.innerHeight || 1;
        const max = sc.scrollHeight - vh || 1;
        const p = Math.max(0, Math.min(top / max, 1));
        state.scrollVel = top - state.lastTop;
        state.lastTop = top;
        if (bar) bar.style.width = (p * 100).toFixed(2) + '%';
        checkReveals();
        updateSlots();
        updateFloats();

        if (header) {
          const probeY = 34;
          let tone = null;
          const bands = document.querySelectorAll('[data-tone]');
          for (let i = 0; i < bands.length; i++) {
            const r = bands[i].getBoundingClientRect();
            if (r.top <= probeY && r.bottom > probeY) {
              tone = bands[i].getAttribute('data-tone');
              break;
            }
          }
          if (!tone) tone = state.tone || 'dark';
          if (tone !== state.tone) {
            state.tone = tone;
            header.style.color = tone === 'light' ? '#0B0B0C' : '#F7F6F4';
            header.style.background =
              tone === 'light' ? 'rgba(247,246,244,.74)' : 'rgba(11,11,12,.6)';
          }
        }
        if (marquee) {
          marquee.style.transform =
            'translate3d(' + (-((top * 0.12) % 2000)).toFixed(1) + 'px,0,0)';
        }
      };

      const onScroll = () => {
        if (raf == null) raf = requestAnimationFrame(update);
      };
      [document, window].forEach((t) => t.addEventListener('scroll', onScroll, { passive: true }));
      window.addEventListener('resize', onScroll);
      const tick = setInterval(onScroll, 380);
      cleanups.push(() => {
        [document, window].forEach((t) => t.removeEventListener('scroll', onScroll));
        window.removeEventListener('resize', onScroll);
        clearInterval(tick);
        if (raf != null) cancelAnimationFrame(raf);
      });
      update();
    };

    /* ---------- chips ---------- */
    const initChips = () => {
      const wrap = document.getElementById('om-chips');
      if (!wrap || wrap.dataset.wired === '1') return;
      wrap.dataset.wired = '1';
      const on = (el) => {
        el.style.borderColor = 'rgba(196,160,90,.75)';
        el.style.background = 'rgba(196,160,90,.05)';
        el.style.transform = 'translateY(-4px)';
        const a = el.querySelector('[data-chip-answer]');
        if (a) a.style.opacity = '1';
      };
      const off = (el) => {
        if (el.dataset.locked === '1') return;
        el.style.borderColor = 'rgba(247,246,244,.13)';
        el.style.background = 'transparent';
        el.style.transform = 'none';
        const a = el.querySelector('[data-chip-answer]');
        if (a) a.style.opacity = '0';
      };
      const over = (e) => {
        const c = e.target.closest('[data-chip]');
        if (c) on(c);
      };
      const out = (e) => {
        const c = e.target.closest('[data-chip]');
        if (c) off(c);
      };
      const click = (e) => {
        const c = e.target.closest('[data-chip]');
        if (!c) return;
        c.dataset.locked = c.dataset.locked === '1' ? '0' : '1';
        if (c.dataset.locked === '1') {
          on(c);
          c.style.borderColor = '#C4A05A';
        } else off(c);
      };
      wrap.addEventListener('mouseover', over);
      wrap.addEventListener('mouseout', out);
      wrap.addEventListener('click', click);
      cleanups.push(() => {
        wrap.removeEventListener('mouseover', over);
        wrap.removeEventListener('mouseout', out);
        wrap.removeEventListener('click', click);
      });
    };

    /* ---------- animated cursor ---------- */
    const initCursor = () => {
      if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
      const ring = document.getElementById('om-cursor');
      const dot = document.getElementById('om-cursor-dot');
      const label = document.getElementById('om-cursor-label');
      if (!ring || !dot) return;
      let mx = window.innerWidth / 2;
      let my = window.innerHeight / 2;
      let rx = mx;
      let ry = my;
      let dx = mx;
      let dy = my;
      let vis = false;
      let raf = null;

      const onMove = (e) => {
        mx = e.clientX;
        my = e.clientY;
        state.mouse = { x: mx, y: my };
        if (!vis) {
          vis = true;
          ring.style.opacity = '1';
          dot.style.opacity = '1';
        }
      };
      const onOver = (e) => {
        const t = e.target.closest && e.target.closest('[data-hov]');
        if (t) {
          ring.style.width = '76px';
          ring.style.height = '76px';
          ring.style.margin = '-38px 0 0 -38px';
          ring.style.background = '#C4A05A';
          ring.style.borderColor = '#C4A05A';
          if (label) {
            label.textContent = t.getAttribute('data-cursor-label') || 'ver';
            label.style.opacity = '1';
          }
          dot.style.opacity = '0';
        } else {
          ring.style.width = '30px';
          ring.style.height = '30px';
          ring.style.margin = '-15px 0 0 -15px';
          ring.style.background = 'transparent';
          ring.style.borderColor = 'rgba(196,160,90,.9)';
          if (label) label.style.opacity = '0';
          dot.style.opacity = vis ? '1' : '0';
        }
      };
      const onDown = () => {
        ring.style.transform = 'scale(.84)';
        if (state.burst) state.burst(mx, my);
      };
      const onUp = () => {
        ring.style.transform = 'scale(1)';
      };
      const onLeave = () => {
        vis = false;
        ring.style.opacity = '0';
        dot.style.opacity = '0';
        state.mouse = null;
      };

      window.addEventListener('mousemove', onMove, { passive: true });
      window.addEventListener('mouseover', onOver, true);
      window.addEventListener('mousedown', onDown);
      window.addEventListener('mouseup', onUp);
      document.addEventListener('mouseleave', onLeave);

      const loop = () => {
        rx += (mx - rx) * 0.15;
        ry += (my - ry) * 0.15;
        dx += (mx - dx) * 0.45;
        dy += (my - dy) * 0.45;
        ring.style.left = rx.toFixed(2) + 'px';
        ring.style.top = ry.toFixed(2) + 'px';
        dot.style.left = dx.toFixed(2) + 'px';
        dot.style.top = dy.toFixed(2) + 'px';
        raf = requestAnimationFrame(loop);
      };
      loop();

      cleanups.push(() => {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseover', onOver, true);
        window.removeEventListener('mousedown', onDown);
        window.removeEventListener('mouseup', onUp);
        document.removeEventListener('mouseleave', onLeave);
        if (raf != null) cancelAnimationFrame(raf);
      });
    };

    /* ---------- gold dust ---------- */
    const initParticles = () => {
      const canvas = document.getElementById('om-particles');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      let w = 0;
      let h = 0;
      let parts = [];
      let raf = null;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      const seed = () => {
        const n = Math.round(
          Math.min(170, Math.max(50, (w * h) / 14000)) * particleDensity
        );
        parts = new Array(n).fill(0).map(() => ({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.8 + 0.35,
          vx: (Math.random() - 0.5) * 0.14,
          vy: -(Math.random() * 0.2 + 0.03),
          a: Math.random() * 0.6 + 0.14,
          ph: Math.random() * Math.PI * 2,
          sp: Math.random() * 0.014 + 0.004,
          dep: Math.random() * 0.8 + 0.2,
        }));
      };

      let toneBands = [];
      const bands = () => {
        toneBands = Array.from(document.querySelectorAll('[data-tone]')).map((el) => {
          const r = el.getBoundingClientRect();
          return { top: r.top, bottom: r.bottom, light: el.getAttribute('data-tone') === 'light' };
        });
      };
      const isLightAt = (y) => {
        for (let i = 0; i < toneBands.length; i++) {
          if (y >= toneBands[i].top && y < toneBands[i].bottom) return toneBands[i].light;
        }
        return false;
      };

      const resize = () => {
        w = canvas.clientWidth;
        h = canvas.clientHeight;
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        seed();
        bands();
      };

      resize();
      window.addEventListener('resize', resize);

      const bursts = [];
      state.burst = (x, y) => {
        for (let i = 0; i < 16; i++) {
          const ang = Math.random() * Math.PI * 2;
          const s = Math.random() * 2.6 + 0.6;
          bursts.push({
            x,
            y,
            vx: Math.cos(ang) * s,
            vy: Math.sin(ang) * s,
            life: 1,
            r: Math.random() * 1.7 + 0.5,
          });
        }
      };

      let frame = 0;
      const draw = () => {
        frame++;
        if (frame % 12 === 0) bands();
        ctx.clearRect(0, 0, w, h);
        const m = state.mouse;
        const sv = Math.max(-90, Math.min(90, state.scrollVel || 0));
        state.scrollVel = (state.scrollVel || 0) * 0.86;

        for (let i = 0; i < parts.length; i++) {
          const p = parts[i];
          p.ph += p.sp;
          p.y += p.vy - sv * 0.045 * p.dep;
          p.x += p.vx + Math.sin(p.ph) * 0.16 + sv * 0.004 * (p.dep - 0.5);
          if (m) {
            const ddx = p.x - m.x;
            const ddy = p.y - m.y;
            const d2 = ddx * ddx + ddy * ddy;
            if (d2 < 30000 && d2 > 1) {
              const d = Math.sqrt(d2);
              const f = 1 - d2 / 30000;
              p.x += (ddx / d) * f * 1.9 - (ddy / d) * f * 1.5;
              p.y += (ddy / d) * f * 1.9 + (ddx / d) * f * 1.5;
            }
          }
          if (p.y < -14) {
            p.y = h + 14;
            p.x = Math.random() * w;
          } else if (p.y > h + 14) {
            p.y = -14;
            p.x = Math.random() * w;
          }
          if (p.x < -14) p.x = w + 14;
          else if (p.x > w + 14) p.x = -14;

          const tw = 0.55 + Math.sin(p.ph * 2.2) * 0.45;
          const light = isLightAt(p.y);
          const al = (p.a * tw * (light ? 0.62 : 1)).toFixed(3);
          ctx.beginPath();
          ctx.fillStyle = 'rgba(' + (light ? GOLD_DARK : GOLD) + ',' + al + ')';
          const stretch = 1 + Math.min(2.2, Math.abs(sv) * 0.03);
          if (stretch > 1.15) ctx.ellipse(p.x, p.y, p.r, p.r * stretch, 0, 0, Math.PI * 2);
          else ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
          if (p.r > 1.4 && !light) {
            ctx.beginPath();
            ctx.fillStyle = 'rgba(223,194,138,' + (p.a * tw * 0.09).toFixed(3) + ')';
            ctx.arc(p.x, p.y, p.r * 5.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        for (let i = bursts.length - 1; i >= 0; i--) {
          const b = bursts[i];
          b.x += b.vx;
          b.y += b.vy;
          b.vy += 0.014;
          b.vx *= 0.984;
          b.vy *= 0.984;
          b.life -= 0.014;
          if (b.life <= 0) {
            bursts.splice(i, 1);
            continue;
          }
          const light = isLightAt(b.y);
          ctx.beginPath();
          ctx.fillStyle =
            (light ? 'rgba(' + GOLD_DARK + ',' : 'rgba(223,194,138,') + (b.life * 0.8).toFixed(3) + ')';
          ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
          ctx.fill();
        }
        raf = requestAnimationFrame(draw);
      };
      draw();

      cleanups.push(() => {
        window.removeEventListener('resize', resize);
        if (raf != null) cancelAnimationFrame(raf);
      });
    };

    /* ---------- boot ---------- */
    initSplit();
    registerReveals();
    checkReveals();
    initFloats();
    registerSlots();
    updateSlots();
    initScroll();
    initChips();
    if (!reduce) initCursor();
    if (!reduce && particles) initParticles();

    // printing must not lose content that hasn't been scrolled into view yet
    const onPrint = () => {
      revealAll(true);
      settleSlots();
    };
    window.addEventListener('beforeprint', onPrint);
    cleanups.push(() => window.removeEventListener('beforeprint', onPrint));

    return () => cleanups.forEach((f) => f());
  }, [particles, particleDensity]);
}
