import { createFpsComponent } from "../../components/FPS/FpsComponent";
import { createGraphicComponent } from "../../components/Graphic/GraphicComponent";
import { GraphicType } from "../../components/Graphic/types/GraphicType";
import { createPositionComponent } from "../../components/Position/PositionComponent";
import type { World } from "../../ecs/interfaces/World.Inteface";
import { ComponentType } from "../../models/ComponentTypes";

export function createFps(world: World) {

    let fpsEntity = world.createEntity();
    world.addComponent(fpsEntity, ComponentType.Fps, createFpsComponent());
    world.addComponent(fpsEntity, ComponentType.Position, createPositionComponent(5,10));
    
    world.addComponent(fpsEntity, ComponentType.FrontGraphic, createGraphicComponent(GraphicType.Fps))

}
