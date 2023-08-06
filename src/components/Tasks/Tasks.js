import React from 'react'
import './Tasks.scss'
import editSvg from './../../assets/img/edit.svg';
import checkSvg from './../../assets/img/check.svg';
import List from '../List/List';
import Task from './../Task/Task';
import addTask from './../addTask/addTask'

export default function Tasks({list, onListRename}) {
  if (list.length == 0) {
    return (
      <div className="tasks__items">
      <h2>Задачи отсутствуют</h2>
      </div>
      )
    } else {
      const listRenameHandler = (id) => {
        const name = prompt('Введите название списка');
        if(name != '' ) {
          // alert(list);
          onListRename(id,name);
        } else {
          alert('Введено пустое значчение')
        }
      }
    return (
      <div className="tasks">
        <h2 style={{color:list.color.hex}} className="tasks__title">
          {list.name}
          <img onClick={() => listRenameHandler(list.id)} src={editSvg}/>
        </h2>
  
        <div className="tasks__items">
            { list.length > 0 && list.tasks.map((task) => 
              <Task task={task}/>
              )}
  
          <addTask />
        </div>
        </div>
    )
  }
}


