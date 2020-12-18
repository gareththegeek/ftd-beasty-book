import { AttributeType } from "./AttributeType";
import { CategoryType } from "./CategoryType";

export default interface Monster {
    id: string,
    name: string,
    category: CategoryType,
    hitDice: number,
    speed: number,
    attack: AttributeType,
    defence: AttributeType,
    description: string,
    techniques: [string?, string?, string?]
}
