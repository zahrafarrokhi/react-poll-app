import { Input } from 'antd';
import React, {useState, useEffect} from 'react';


const TextAreaAnswer = (props) => {
  const {value, onChange} = props;

  const update = (e) => {
    onChange(e.target.value)
  }

  return (
    <div className="cnt">
      <Input.TextArea key={'inpare'} rows={4} value={value} onChange={update} autoFocus={true}/>
    </div>
  )

}

export default TextAreaAnswer