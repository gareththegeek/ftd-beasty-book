import React from 'react'
import { useSelector } from 'react-redux'
import { selectSelectedMonster } from './redux/monsters/selectors'

const MonsterDetail: React.FunctionComponent = () => {

    const monster = useSelector(selectSelectedMonster)

    if (!monster) {
        return (<div />)
    }

    return (
        <div>
            <h2>{monster.name}</h2>
            <div><label>Category</label><span>{monster.category}</span></div>
            <table>
                <tr>
                    <th>Speed</th>
                    <th>To Hit</th>
                    <th>Damage</th>
                    <th>AC</th>
                    <th>HP</th>
                    <th>HD</th>
                    <th>Morale</th>
                </tr>
                <tr>
                    <td>{monster.speed}</td>
                    <td>{monster.toHit}</td>
                    <td>{monster.damage}</td>
                    <td>{monster.armourClass}</td>
                    <td>{monster.hitPoints}</td>
                    <td>{monster.hitDice}</td>
                    <td>{monster.morale}</td>
                </tr>
            </table>
            <table>
                <tr>
                    <th>STR</th>
                    <th>DEX</th>
                    <th>CON</th>
                    <th>INT</th>
                    <th>WIS</th>
                    <th>CHA</th>
                </tr>
                <tr>
                    <td>{monster.str}</td>
                    <td>{monster.dex}</td>
                    <td>{monster.con}</td>
                    <td>{monster.int}</td>
                    <td>{monster.wis}</td>
                    <td>{monster.cha}</td>
                </tr>
            </table>
            <div>
                <label>Description</label>
                <p>{monster.description}</p>
            </div>
            <div>
                <label>Strong</label>
                <p>{monster.strong}</p>
            </div>
            <div>
                <label>Weak</label>
                <p>{monster.weak}</p>
            </div>
            <div>
                <label>Techniques</label>
                <ul>
                    {monster.techniques.map((technique, index) => (
                        <li key={index.toString()}>{technique}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default MonsterDetail
