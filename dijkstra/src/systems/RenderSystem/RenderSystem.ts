import type { IWorld } from "../../ecs/interfaces/World.Inteface";
import type { IRenderSystem } from "./RenderSystem.interface";

export function createRenderSystem(ctx: CanvasRenderingContext2D): IRenderSystem {
    let x = 200;
    let y = 100;
    let moveX = 5;
    let moveY = 5

    const renderSystem: IRenderSystem = {
        update: function (world: IWorld, deltaTime: number) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
            x += moveX;
            y += moveY;
            moveX = x >= ctx.canvas.width ? -1 * moveX : x <= 0 ? -1 * moveX : moveX;
            moveY = y >= ctx.canvas.height ? -1 * moveY : y <= 0 ? -1 * moveY : moveY;
            ctx.beginPath();
            ctx.arc(x, y, 25, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fillStyle = "blue";
            ctx.fill();
        }
    }

    return renderSystem;
}