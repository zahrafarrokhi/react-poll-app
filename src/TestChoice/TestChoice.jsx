import { Radio, Space } from 'antd';
import React, {useState, useEffect} from 'react';


const TestChoice = (props) => {
  const {value, onChange, values} = props;

  const update = (e) => {
    const id = e.target.value
    onChange(values.filter(item => item.id === id)[0])
  }

  return (
    <div className="cnt">
      <Radio.Group onChange={update} value={value?.id}>
        <Space direction="vertical">
          {values.map(item => (<Radio value={item.id}>{item.text}</Radio>))}
        </Space>
      </Radio.Group>
    </div>
  )

}

export default TestChoice