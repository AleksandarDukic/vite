import type { World } from "../../ecs/interfaces/World.Inteface";
import type { CanvasComposeSystem } from "./CanvasComposeSystem.interface";

export function createCanvasComposeSystem(ctx: CanvasRenderingContext2D, overlayCanvas: HTMLCanvasElement): CanvasComposeSystem {


    const canvasComposeSystem: CanvasComposeSystem = {
        update: function (world: World, deltaTime: number) {
           ctx.drawImage(overlayCanvas, 0, 0);
        }
    };

    return canvasComposeSystem;
}