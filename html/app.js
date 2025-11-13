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
};
