import MonsterInfo from './MonsterInfo'
import MonsterViewModel from './MonsterViewModel'

export default interface MonstersState {
    all: MonsterInfo[]
    selectedMonster: MonsterViewModel | undefined,
    loading: boolean,
    error: string | undefined
}
