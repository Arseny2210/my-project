import './App.scss';
import listSvg from './../../assets/img/list.svg';
import addSvg from './../../assets/img/add.svg';
import closeSvg from './../../assets/img/close.svg';
import DB from './../../assets/db.json';
import axios from 'axios';

import List from './../List/List';
import Tasks from '../Tasks/Tasks';

import { useState, useEffect } from 'react';
import AddList from '../AddList/AddList'

function App() {
  let [lists, setLists] = useState(null)
  let [colors,setColors] = useState(null)
    useEffect(()=> {
      axios.get('http://localhost:3001/lists?_expand=color').then(( {data} )=> {
        setLists(data)
        },[]);
      axios.get('http://localhost:3001/colors').then(( {data} )=> {
          setColors(data)
        },[]);
    })

  let deleteHandler = (id) => {
    alert(id)
  }

  let addListHandler = (name, colorId, color) => {
    const id = lists[lists.length-1].id+1
    const newItem = {id,name,colorId,color}
    let newList = [...lists, newItem]
    setLists(newList)
  }

  return (
    <div className='todo'>
        <div className='todo__slider'>
          <List items={[
            {
              icon: listSvg, 
              name: 'Все задачи'
            }
          ]}/>
          { lists && 
          (<List items={lists}
        isRemovable = {true}
        onDelete={(id)=> deleteHandler(id)}
        />)
          }
          { colors &&
        (<AddList 
        addList={(name,colorId,colorName)=> addListHandler(name,colorId,colorName)} 
        colors={DB.colors} 
        closeSvg={closeSvg} 
        addSvg={addSvg} 
        name="Добавить папку"/>)
          }
        </div>
        <div className="todo__tasks">
          <Tasks/>
        </div>
    </div>
  )
}

export default App