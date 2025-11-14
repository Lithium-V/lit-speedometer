window.__speedometer = {
  show: false,
  velocity: 0,
  gear: 0,
  prevGear: null,
  prevGearShow: false,
  prevGearLeave: false,
  maxSpeed: 0,
  init() {
    console.log("init speedometer");
    window.addEventListener("message", (e) => {
      const item = e.data;

      if (item === undefined) return;

      if (item.action === "show") {
        this.show = true;
        this.velocity = item.velocity;
        const ng = item.gear;
        if (ng !== this.gear) {
          this.prevGear = this.gear;
          this.gear = ng;
          this.prevGearShow = true;
          this.prevGearLeave = false;
          setTimeout(() => {
            this.prevGearLeave = true;
            setTimeout(() => {
              this.prevGearShow = false;
            }, 100);
          }, 0);
        } else {
          this.gear = ng;
        }
        this.maxSpeed = item.maxSpeed + 10;
      } else if (item.action === "hide") {
        this.show = false;
      }
    });
  },
  getVelocity() {
    const v = Number(this.velocity) || 0;
    return String(v).padStart(3, "0");
  },
  val() {
    return Number(this.velocity) || 0;
  },
  dHundreds() {
    const v = this.val();
    return Math.floor(v / 100);
  },
  dTens() {
    const v = this.val();
    return Math.floor((v % 100) / 10);
  },
  dOnes() {
    const v = this.val();
    return v % 10;
  },
  hexToRgb(hex) {
    const h = hex.replace("#", "");
    const bigint = parseInt(h, 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  },
  rgbToHex(r, g, b) {
    const toHex = (c) => c.toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  },
  lerpColor(a, b, t) {
    const ca = this.hexToRgb(a);
    const cb = this.hexToRgb(b);
    const r = Math.round(ca.r + (cb.r - ca.r) * t);
    const g = Math.round(ca.g + (cb.g - ca.g) * t);
    const b2 = Math.round(ca.b + (cb.b - ca.b) * t);
    return this.rgbToHex(r, g, b2);
  },
  velocityColor() {
    const v = this.val();
    const ms = Number(this.maxSpeed) || 180;
    const t1 = ms * 0.3;
    const t2 = ms * 0.7;
    const t3 = ms * 1.05;

    if (v <= t1) return this.lerpColor("#ffffff", "#22c55e", v / t1);
    if (v <= t2)
      return this.lerpColor("#22c55e", "#f59e0b", (v - t1) / (t2 - t1));
    if (v <= t3)
      return this.lerpColor("#f59e0b", "#ef4444", (v - t2) / (t3 - t2));
    return "#ef4444";
  },
  velocityStyle() {
    return {
      color: "#ffffff",
      textShadow: "0 2px 6px rgba(0,0,0,0.6)",
    };
  },
  velocityStyleBG() {
    return {
      backgroundColor: this.velocityColor(),
      textShadow: "0 2px 6px rgba(0,0,0,0.6)",
    };
  },
  textShadowStyle() {
    return { textShadow: "0 2px 6px rgba(0,0,0,0.6)" };
  },
  velocityStyleBG() {
    const ms = Number(this.maxSpeed) || 0;
    const v = this.val();
    let pct = ms > 0 ? (v / ms) * 100 : 0;
    pct = Math.max(0, Math.min(100, pct));
    return {
      width: pct + "%",
      background: this.velocityColor(),
      transition: "width 100ms ease-out",
    };
  },
  prevGearStyle() {
    const base = {
      textShadow: "0 2px 6px rgba(0,0,0,0.6)",
      transition: "transform 300ms ease, opacity 300ms ease",
    };
    if (!this.prevGearLeave)
      return { ...base, opacity: 1, transform: "translateX(0px)" };
    return { ...base, opacity: 0, transform: "translateX(32px)" };
  },
  vibrationStyleVars() {
    const ms = Number(this.maxSpeed) || 0;
    const v = this.val();
    const start = 100;
    const basePct = ms > 0 ? Math.max(0, Math.min(1, v / ms)) : 0;
    const amp = basePct * 4;
    const maxDur = 200;
    const minDur = 10;
    const range = ms > start ? ms - start : Math.max(1, ms);
    const pctFrom100 =
      v > start ? Math.max(0, Math.min(1, (v - start) / range)) : 0;
    const dur = Math.round(maxDur - (maxDur - minDur) * pctFrom100);
    console.log(dur);
    const play = v >= start ? "running" : "paused";
    return {
      "--amp": amp + "px",
      "--vfreq": dur + "ms",
      animationPlayState: play,
    };
  },
};
