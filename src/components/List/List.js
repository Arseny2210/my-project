import React from 'react'; 
import './List.scss';
import itemRemove from './../../assets/img/remove.svg'
import Badge from './../Badge/Badge';

export default function List({items, isRemovable, onDelete, clickAddButton}) {
  // console.log(items);
  return (
    <ul className="list" onClick={clickAddButton}>
    {
      items.map((item, ind) => (
        <li key={ind} className={item.active ? 'active' : ''}>
          <i>
            {item.icon ? 
              (<img src={items.icon}/>)
              :
              ( <Badge color={item.color.name}/>)
            }
          </i>
          <span>{item.name}</span>
            {isRemovable && 
              (<img onClick={()=>onDelete(ind)} className='list__remove-icon' src={itemRemove}/>)
            }
        </li>
      ))
    }
      </ul>
  )
}