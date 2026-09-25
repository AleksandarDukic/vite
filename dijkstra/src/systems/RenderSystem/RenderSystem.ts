import { ComponentType } from "../../components/ComponentTypes";
import type { GraphicComponent } from "../../components/Graphic/GraphicComponent.interface";
import { GraphicType } from "../../components/Graphic/types/GraphicType";
import type { PointerActionComponent } from "../../components/PointerAction/PointerActionComponent.interface";
import type { PositionComponent } from "../../components/Position/PositionComponent.interface";
import type { IWorld } from "../../ecs/interfaces/World.Inteface";
import { entitiesWith } from "../../ecs/Query";
import type { IRenderSystem } from "./RenderSystem.interface";
import { drawPointer } from "./schemas/Pointer/Pointer";

export function createRenderSystem(ctx: CanvasRenderingContext2D): IRenderSystem {
    let x = 200;
    let y = 100;
    let moveX = 5;
    let moveY = 5

    function drawBall() {
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

    const renderSystem: IRenderSystem = {
        update: function (world: IWorld, deltaTime: number) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
            drawBall();

            const entities = entitiesWith(world, [ComponentType.Graphic, ComponentType.Position]);

            entities.forEach(entity => {
                const positionComponent = world.getComponent(entity, ComponentType.Position) as PositionComponent;
                const GraphicComponent = world.getComponent(entity, ComponentType.Graphic) as GraphicComponent

                switch (GraphicComponent.type) {
                    case GraphicType.Pointer: {
                        drawPointer(ctx, positionComponent)
                        break;
                    }
                }
            });
        }
    }

    return renderSystem;
}