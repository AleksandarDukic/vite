import { ComponentType } from "../../models/ComponentTypes";
import type { InputComponent } from "../../components/Input/InputComponent.interface";
import type { PointerActionComponent } from "../../components/PointerAction/PointerActionComponent.interface";
import type { PositionComponent } from "../../components/Position/PositionComponent.interface";
import type { World } from "../../ecs/interfaces/World.Inteface";
import { entitiesWith } from "../../ecs/Query";
import type { PointerSystem } from "./PointerSystem.interface";
import { roundByCellSize } from "../../game/utility/GridHelper";

export function createPointerSystem(): PointerSystem {



    const pointerSystem: PointerSystem = {
        update: function (world: World, deltaTime: number) {

            const inputEnteties = entitiesWith(world, [ComponentType.Input, ComponentType.Position]);
            if (inputEnteties.length < 1) return;
            const inputEntity = inputEnteties[0]

            const pointerEnteties = entitiesWith(world, [ComponentType.Pointer, ComponentType.PointerAction, ComponentType.Position, ComponentType.CellPosition]);
            pointerEnteties.forEach(pointerEntity => {

                // update Pointer Action
                const inputComponent = world.getComponent(inputEntity, ComponentType.Input) as InputComponent;
                const pointerActionComponent = world.getComponent(pointerEntity, ComponentType.PointerAction) as PointerActionComponent;
                pointerActionComponent.leftClick = inputComponent.leftClick;
                pointerActionComponent.rightClick = inputComponent.rightClick;

                // update Pointer Position
                const inputPositionComponent = world.getComponent(inputEntity, ComponentType.Position) as PositionComponent;
                const positionComponent = world.getComponent(pointerEntity, ComponentType.Position) as PositionComponent;
                positionComponent.x = inputPositionComponent.x;
                positionComponent.y = inputPositionComponent.y;


                // update Pointer Cell Position
                const cellPositionComponent = world.getComponent(pointerEntity, ComponentType.CellPosition) as PositionComponent;
                if (
                    Math.abs(positionComponent.x - cellPositionComponent.x) > 40 ||
                    positionComponent.x < cellPositionComponent.x ||
                    Math.abs(positionComponent.y - cellPositionComponent.y) > 40 ||
                    positionComponent.y < cellPositionComponent.y
                ) {
                    world.removeEntityFromGrid(pointerEntity, cellPositionComponent);
                    cellPositionComponent.x = roundByCellSize(positionComponent.x, world.getCellSize());
                    cellPositionComponent.y = roundByCellSize(positionComponent.y, world.getCellSize());
                    world.addEntityToGrid(pointerEntity, cellPositionComponent);
                }

//                console.log(cellPositionComponent)



            });
        }
    }

    return pointerSystem;
}