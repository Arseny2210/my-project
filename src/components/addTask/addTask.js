import React from 'react'
import addSvg from './../../assets/img/add.svg';


export default function addTask() {
  return (
    <div className="tasks__form">
          
            <div className="tasks__form-new">
              <img src={addSvg} alt="Add icon" />
              <span>Новая задача</span>
            </div>
          
            <div className="tasks__form-block">
              <input
                className="field"
                type="text"
                placeholder="Текст задачи"
              />
              <button className="button">
                Добавить задачу
              </button>
              <button className="button button--grey">
                Отмена
              </button>
            </div> 
          </div>
  )
}
