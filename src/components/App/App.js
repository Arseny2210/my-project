import React from 'react';
import './App.scss';

import listSvg from './../../assets/img/list.svg';
import addSvg from './../../assets/img/add.svg';
import closeSvg from './../../assets/img/close.svg';
import DB from './../../assets/db.json';
import axios from 'axios';

import List from './../List/List';
import Tasks from '../Tasks/Tasks';

// import { useState, useEffect } from 'react';
import AddList from '../AddList/AddList'

function App() {
  let [lists, setLists] = React.useState(null)
  let [colors,setColors] = React.useState(null)
  let [active,setActive] = React.useState(null)

    React.useEffect(()=> {
      axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(( {data} )=> {
        setLists(data)
        });
      axios.get('http://localhost:3001/colors').then(( {data} )=> {
          setColors(data)
        });
    },[])

  let deleteHandler = (id) => {
    let newList = [...lists].map(list=> {
      if (list.id != id) {
        return list
      }
    })
    axios.delete('http://localhost:3001/lists/' + id).then(()=>
    setActive(null)
    )
  }

  let addListHandler = (name, colorId, color) => {
    axios.post('http://localhost:3001/lists', {name, colorId})
  }

  const listRenameHandler = (id,name) => {
    axios.patch('http://localhost:3001/lists/' + id, {name});
  }

  const selectTasks = () => {
    if (lists && active) {
      return (
        <Tasks onListRename={(id,name)=>listRenameHandler(id,name)} list={
          lists[lists.findIndex((item)=> item.id == active)]
        }/>
      )
    } else if (lists && active == null) {
      return lists.map((list,ind)=> (
        <Tasks onListRename={(id,name)=>listRenameHandler(id,name)} key={ind} list={list}/>
      ))
    } else {
      return false
    }
  }
  return (
    <div className='todo'>
        <div className='todo__slider'>
          <List active={active == null && 'default'} onItemActive={(id)=>setActive(id)} items={[
            {
              icon: listSvg, 
              name: 'Все задачи'
            }
            ]}/>
            { lists && (lists.length > 0) &&
            (<List active={active} 
              onItemActive={(id)=>setActive(id)} 
              items={lists}
              isRemovable = {true}
              onDelete={(id)=> deleteHandler(id)}
          />)}
          { colors &&
        (<AddList 
        addList={(name,colorId,colorName)=> addListHandler(name,colorId,colorName)} 
        colors={DB.colors} 
        closeSvg={closeSvg} 
        addSvg={addSvg} 
        name="Добавить задачу"/>)
          }
        </div>
        <div className="todo__tasks">
        {selectTasks() == false ? 
          (<div className="tasks__items">
            <h2>Задачи отсутствуют</h2>
          </div>) 
        :
        ''}
        </div>
    </div>
  )
}

export default App