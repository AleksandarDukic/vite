import { ComponentType } from "../../components/ComponentTypes";
import type { InputComponent } from "../../components/Input/InputComponent.interface";
import type { PointerActionComponent } from "../../components/PointerAction/PointerActionComponent.interface";
import type { PositionComponent } from "../../components/Position/PositionComponent.interface";
import type { IWorld } from "../../ecs/interfaces/World.Inteface";
import { entitiesWith } from "../../ecs/Query";
import type { PointerSystem } from "./PointerSystem.interface";

export function createPointerSystem(): PointerSystem {



    const pointerSystem: PointerSystem = {
        update: function (world: IWorld, deltaTime: number) {
            const pointerEnteties = entitiesWith(world, [ComponentType.Pointer, ComponentType.PointerAction, ComponentType.Position]);
            const inputEnteties = entitiesWith(world, [ComponentType.Input, ComponentType.Position]);
            if (inputEnteties.length < 1) return;
            const inputEntity = inputEnteties[0]


            pointerEnteties.forEach(entity => {
                const inputComponent = world.getComponent(inputEntity, ComponentType.Input) as InputComponent;
                if (inputComponent) {
                    const pointerActionComponent = world.getComponent(entity, ComponentType.PointerAction) as PointerActionComponent;
                    if (pointerActionComponent) {
                        pointerActionComponent.leftClick = inputComponent.leftClick;
                        pointerActionComponent.rightClick = inputComponent.rightClick;
                    }
                }

                const inputPositionComponent =  world.getComponent(inputEntity, ComponentType.Position) as PositionComponent;
                if (inputPositionComponent) {
                    const positionComponent = world.getComponent(entity, ComponentType.Position) as PositionComponent;
                    if (positionComponent) {
                        positionComponent.x = inputPositionComponent.x;
                        positionComponent.y = inputPositionComponent.y;
                    }
                }
            });
        }
    }

    return pointerSystem;
}