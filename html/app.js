window.__speedometer = {
  show: false,
  velocity: 0,
  gear: 0,
  init() {
    console.log("init speedometer");
    window.addEventListener("message", (e) => {
      const item = e.data;

      if (item === undefined) return;

      if (item.action === "show") {
        this.show = true;
        this.velocity = item.velocity;
        this.gear = item.gear;
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
    if (v <= 60) return this.lerpColor("#ffffff", "#22c55e", v / 60);
    if (v <= 120) return this.lerpColor("#22c55e", "#f59e0b", (v - 60) / 60);
    if (v <= 180) return this.lerpColor("#f59e0b", "#ef4444", (v - 120) / 60);
    return "#ef4444";
  },
  velocityStyle() {
    return { color: this.velocityColor() };
  },
};
