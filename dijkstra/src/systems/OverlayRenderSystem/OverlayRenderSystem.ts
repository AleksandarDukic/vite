import type { World } from "../../ecs/interfaces/World.Inteface";
import type { IRenderSystem } from "./OverlayRenderSystem.interface";

export function createOverlayRenderSystem(ctx: CanvasRenderingContext2D, overlayCanvas: HTMLCanvasElement): IRenderSystem {


    const renderSystem: IRenderSystem = {
        update: function (world: World, deltaTime: number) {
           ctx.drawImage(overlayCanvas, 0, 0);
        }
    }

    return renderSystem;
}