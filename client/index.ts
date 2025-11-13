import { event, toKm, vec3ToVelocity } from "./utils"

function hideHud() {
    // ---- [HIDE COMPONENTS] ---- 
    HideHudComponentThisFrame(6) // VEHICLE NAME
    HideHudComponentThisFrame(7) // AREA NAME
    HideHudComponentThisFrame(8) // VEHICLE CLASS
    HideHudComponentThisFrame(9) // STREET NAME  
}

