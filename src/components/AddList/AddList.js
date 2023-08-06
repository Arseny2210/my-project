import React from 'react'
import List from '../List/List'
import Badge from './../Badge/Badge';
import './AddList.scss'

export default function AddList({addSvg,name,closeSvg, colors, addList}) {
  let[isVisible, setVisible] = React.useState(false);
  let[activeBadge, setActiveBadge] = React.useState(1);
  let [inputValue, setInputValue] = React.useState('');
  let [isLoading,setLoading] = React.useState(false)

  let closeHandler = () => {
    setInputValue('');
    setActiveBadge(colors[0].id)
    setVisible(false);
  }
  const clickHandler = () =>{
    if (inputValue) {
      setLoading(true)
      const color = colors.find(color=> color.id == activeBadge);
      addList(inputValue, activeBadge, color);
      setLoading(false)
      closeHandler()
    } else {
      alert('Введите название списка');
      
    } 
  }
  console.log()
  return (
    <div className='add-list'>
      <List items={[
          {
          icon: addSvg, 
          name: name
          }
      ]}
      clickAddButton={()=>setVisible(true)}
      />
      {isVisible && 
        (<div className='add-list__popup'>
        <img onClick={closeHandler} className='add-list__popup-close-btn' src={closeSvg}/>
        <input value={inputValue} onChange={(e)=>setInputValue(e.target.value)} className="field" type="text" placeholder="Название списка" />
          <div className="add-list__popup-colors">
          {colors.map((color)=>
            (<Badge onClickBadge={()=>setActiveBadge(color.id)} key={color.id} color={color.name} classActive={color.id == activeBadge && 'active'}
            />)
          )}
          </div>
          <button onClick={clickHandler} 
            className='button'>Добавить</button>
      </div>)
      }
    </div>
  )
}
