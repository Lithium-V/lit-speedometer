import { event, toKm, vec3ToVelocity } from "./utils"

function hideHud() {
    // ---- [HIDE COMPONENTS] ---- 
    HideHudComponentThisFrame(6) // VEHICLE NAME
    HideHudComponentThisFrame(7) // AREA NAME
    HideHudComponentThisFrame(8) // VEHICLE CLASS
    HideHudComponentThisFrame(9) // STREET NAME  
}

// Send Front-end message to show || hide the speedometer
onNet(event("show"), (data: { velocity: number, gear: number }) => {
    SendNUIMessage({
        action: "show",
        velocity: Number(data.velocity),
        gear: Number(data.gear),
    })
})

onNet(event("hide"), () => {
    SendNUIMessage({
        action: "hide",
    })
})

// ---- [UPDATE VELOCITY] ----	
setTick(() => {
    const pedVehicle = GetVehiclePedIsIn(PlayerPedId(), false);
    if (pedVehicle != 0 && GetIsVehicleEngineRunning(pedVehicle)) {
        const velocity = vec3ToVelocity(GetEntityVelocity(pedVehicle));
        const gear = GetVehicleCurrentGear(pedVehicle);
        hideHud();
        emit(event("show"), {
            velocity: Math.ceil(toKm(velocity)),
            gear: GetVehicleCurrentGear(pedVehicle)
        })
    } else {
        emit(event("hide"));
    }
})