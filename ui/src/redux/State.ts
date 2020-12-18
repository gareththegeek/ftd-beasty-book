import { RouterState } from "connected-react-router";
import MonstersState from "./monsters/MonstersState";

export default interface State {
    router: RouterState
    monsters: MonstersState
}
