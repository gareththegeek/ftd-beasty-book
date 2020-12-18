import { RouterState } from "connected-react-router";
import CategoriesState from "./categories/CategoriesState";
import HitDiceState from "./hitDice/HitDiceState";
import MonstersState from "./monsters/MonstersState";

export default interface State {
    router: RouterState
    monsters: MonstersState
    categories: CategoriesState
    hitDice: HitDiceState
}
