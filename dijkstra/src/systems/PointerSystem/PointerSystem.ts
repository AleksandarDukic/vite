import { ComponentType } from "../../models/ComponentTypes";
import type { InputComponent } from "../../components/Input/InputComponent.interface";
import type { PointerActionComponent } from "../../components/PointerAction/PointerActionComponent.interface";
import type { PositionComponent } from "../../components/Position/PositionComponent.interface";
import type { IWorld } from "../../ecs/interfaces/World.Inteface";
import { entitiesWith } from "../../ecs/Query";
import type { PointerSystem } from "./PointerSystem.interface";
import { roundByCellSize } from "../../game/utility/GridHelper";

export function createPointerSystem(): PointerSystem {



    const pointerSystem: PointerSystem = {
        update: function (world: IWorld, deltaTime: number) {
            const inputEnteties = entitiesWith(world, [ComponentType.Input, ComponentType.Position]);
            if (inputEnteties.length < 1) return;
            const inputEntity = inputEnteties[0]

            const pointerEnteties = entitiesWith(world, [ComponentType.Pointer, ComponentType.PointerAction, ComponentType.Position, ComponentType.CellPosition]);
            console.log(pointerEnteties)
            pointerEnteties.forEach(entity => {

                // update Pointer Action
                const inputComponent = world.getComponent(inputEntity, ComponentType.Input) as InputComponent;
                if (inputComponent) {
                    const pointerActionComponent = world.getComponent(entity, ComponentType.PointerAction) as PointerActionComponent;
                    if (pointerActionComponent) {
                        pointerActionComponent.leftClick = inputComponent.leftClick;
                        pointerActionComponent.rightClick = inputComponent.rightClick;
                    }
                }

                // update Pointer Position
                const inputPositionComponent = world.getComponent(inputEntity, ComponentType.Position) as PositionComponent;
                if (inputPositionComponent) {
                    const positionComponent = world.getComponent(entity, ComponentType.Position) as PositionComponent;
                    if (positionComponent) {
                        positionComponent.x = inputPositionComponent.x;
                        positionComponent.y = inputPositionComponent.y;


                        // update Pointer Cell Position
                        const cellPositionComponent = world.getComponent(entity, ComponentType.CellPosition) as PositionComponent;
                        if (cellPositionComponent) {
                            if (Math.abs(positionComponent.x - cellPositionComponent.x) > 40 || positionComponent.x < cellPositionComponent.x) cellPositionComponent.x = roundByCellSize(positionComponent.x, world.getCellSize());
                            if (Math.abs(positionComponent.y - cellPositionComponent.y) > 40 || positionComponent.y < cellPositionComponent.y) cellPositionComponent.y = roundByCellSize(positionComponent.y, world.getCellSize());
                        }
                    }
                }



            });
        }
    }

    return pointerSystem;
}