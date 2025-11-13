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
    return this.velocity;
  },
};
