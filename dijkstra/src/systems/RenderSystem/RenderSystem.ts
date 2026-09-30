import { ComponentType } from "../../models/ComponentTypes";
import { GraphicType } from "../../components/Graphic/types/GraphicType";
import type { PositionComponent } from "../../components/Position/PositionComponent.interface";
import type { World } from "../../ecs/interfaces/World.Inteface";
import { entitiesWith } from "../../ecs/Query";
import type { IRenderSystem } from "./RenderSystem.interface";
import { drawPointer } from "./schemas/Pointer/Pointer";
import { drawCell } from "./schemas/Cell/Cell";
import type { GraphicComponent } from "../../components/Graphic/GraphicComponent.interface";
import type { RenderSystemConfig } from "../../models/RenderSystemConfig";
import { drawVertex } from "./schemas/Vertex/Vertex";
import { drawFps } from "./schemas/Fps/Fps";
import type { FpsComponent } from "../../components/FPS/FpsComponent.interface";

export function createRenderSystem(config: RenderSystemConfig): IRenderSystem {

    const ballConfig = {
        x: 200,
        y: 100,
        moveX: 5,
        moveY: 5,
    }

    function drawBall() {
        ctx.save();
        ballConfig.x += ballConfig.moveX;
        ballConfig.y += ballConfig.moveY;
        ballConfig.moveX = ballConfig.x >= ctx.canvas.width ? -1 * ballConfig.moveX : ballConfig.x <= 0 ? -1 * ballConfig.moveX : ballConfig.moveX;
        ballConfig.moveY = ballConfig.y >= ctx.canvas.height ? -1 * ballConfig.moveY : ballConfig.y <= 0 ? -1 * ballConfig.moveY : ballConfig.moveY;
        ctx.beginPath();
        ctx.arc(ballConfig.x, ballConfig.y, 25, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.restore();
    }

    const { ctx, componentType, backgroundColor, globalAlpha, isFrontCanvas } = config

    const renderSystem: IRenderSystem = {
        update: function (world: World, deltaTime: number) {

                        // TODO: ovo nije dobro mesto jer za back i main canvas proverava uvek
            if (isFrontCanvas) {
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                drawBall()
            }
            if (backgroundColor) {
                ctx.save();
                ctx.fillStyle = backgroundColor;
                ctx.globalAlpha = globalAlpha ?? 1;
                ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                ctx.restore();
            };

            const entities = entitiesWith(world, [componentType, ComponentType.Position]);
            entities.forEach(entity => {
                const positionComponent = world.getComponent(entity, ComponentType.Position) as PositionComponent;
                const graphicComponent = world.getComponent(entity, componentType) as GraphicComponent
                switch (graphicComponent.type) {
                    case GraphicType.Pointer: {
                        drawPointer(ctx, positionComponent, graphicComponent.effects)
                        break;
                    }
                    case GraphicType.Cell: {
                        drawCell(ctx, positionComponent, world.getCellSize(), graphicComponent.effects)
                        break;
                    }
                    case GraphicType.Vertex: {
                        drawVertex(ctx, positionComponent, graphicComponent.effects)
                        break;
                    }
                    case GraphicType.Fps: {
                        const fps = world.getComponent(entity, ComponentType.Fps) as FpsComponent
                        drawFps(ctx, positionComponent, fps.fps)
                        break;
                    }
                }
            });


        }
    }

    return renderSystem;
}