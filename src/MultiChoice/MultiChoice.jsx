import { updateExpression } from '@babel/types';
import { Checkbox, Space } from 'antd';
import React, {useState, useEffect} from 'react';


const MultiChoice = (props) => {
  const {value, onChange, values} = props;

  const update = (item, e) => {
    console.log(e.target)
    if(e.target.checked) {
      if(value && value.length) 
        onChange([...value, item])
      else
        onChange([item])
    } else {
      onChange(value?.filter(it => it.id !== item.id) ?? [])
    }
  }

  return (
    <Space direction='vertical' className="cnt">

      {values.map(item => {
        return (
        <Checkbox 
          checked={value?.filter(it => it.id === item.id)?.length > 0}
          onChange={(e) => update(item, e)}
          value={item.id}
          key={item.id}
        >{item.text}</Checkbox>)

      })}

    </Space>
  )

}

export default MultiChoice