// client/utils.ts
var event = (name) => {
  return `lit-speedometer:${name}`;
};
var toKm = (miles) => {
  return miles * 3.6;
};
var vec3ToVelocity = (vec3) => {
  return Math.sqrt(vec3[0] ** 2 + vec3[1] ** 2 + vec3[2] ** 2);
};

// client/index.ts
function hideHud() {
  HideHudComponentThisFrame(6);
  HideHudComponentThisFrame(7);
  HideHudComponentThisFrame(8);
  HideHudComponentThisFrame(9);
}
onNet(event("show"), (data) => {
  SendNUIMessage({
    action: "show",
    velocity: Number(data.velocity),
    gear: Number(data.gear),
    maxSpeed: Number(data.maxSpeed)
  });
});
onNet(event("hide"), () => {
  SendNUIMessage({
    action: "hide"
  });
});
setTick(() => {
  const pedVehicle = GetVehiclePedIsIn(PlayerPedId(), false);
  if (pedVehicle != 0 && GetIsVehicleEngineRunning(pedVehicle) && !IsPauseMenuActive()) {
    hideHud();
    const velocity = vec3ToVelocity(GetEntityVelocity(pedVehicle));
    const maxSpeed = GetVehicleMaxSpeed(pedVehicle);
    emit(event("show"), {
      velocity: Math.ceil(toKm(velocity)),
      gear: GetVehicleCurrentGear(pedVehicle),
      maxSpeed: Math.ceil(toKm(maxSpeed))
    });
  } else {
    emit(event("hide"));
  }
});
