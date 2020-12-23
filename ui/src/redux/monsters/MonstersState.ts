import Monster from './Monster'
import MonsterInfo from './MonsterInfo'
import MonsterViewModel from './MonsterViewModel'

export default interface MonstersState {
    all: MonsterInfo[]
    viewModel: MonsterViewModel | undefined,
    selectedMonster: Monster | undefined,
    loading: boolean,
    error: string | undefined
}
