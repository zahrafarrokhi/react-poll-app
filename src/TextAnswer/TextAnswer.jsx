import { Input } from 'antd';
import React, {useState, useEffect} from 'react';


const TextAnswer = (props) => {
  const {value, onChange} = props;

  const update = (e) => {
    onChange(e.target.value)
  }

  return (
    <div className="cnt">
      <Input key={'inp'} value={value} onChange={update} autoFocus={true}/>
    </div>
  )

}

export default TextAnswer