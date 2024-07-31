import React, { useEffect, useState } from 'react';
import { Card, Form, Input, Select, Row, Col, Button, Rate, message } from 'antd';
import './Matching.css';
import http from '../api/index';

const sexOption = [
  { value: "1", label: 'man' },
  { value: "2", label: 'woman' }
];

const classOption = [
  { value: '1', label: 'sophomore' },
  { value: '2', label: 'master' },
  { value: '3', label: 'freshman' },
  { value: '4', label: 'senior' },
  { value: '5', label: 'junior' },
  { value: '6', label: 'phd' },
]


const Matching = () => {
  const [messageApi,contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [list,setList] = useState([])
  const [flag,setFlag] = useState(false)

  const getDirectory = (item,list)=>{
    const record = list.find(record=>record.value==item)
    return record&&record.label?record.label:''
  }

  //get the list
  const getList = ()=>{
  try{
  const url = `http://localhost:5001/api/student/list`
    const cfg = {
      ...form.getFieldsValue()
    }
    const keys = Object.keys(cfg)
    const params = keys.reduce((prev,cur)=>{
      if(String(cfg[cur])!==''){
        prev[cur] = cfg[cur]
      }
     return prev
    },{})
    http.postApi(url,params).then(res=>{
      if(res.status===200){
        setList(res.data || [] )
      }else{
        setList([])
      }
    })
  }
  catch(e){
    console.log(e,
      e);
  }
  }

  const getStatusList = ()=>{
    const url = "http://localhost:5001/api/student/list"
    const cfg = {
      status:'1'
    }
    http.postApi(url,cfg).then(res=>{
      if(res.status===200){
        setList(res.data)
      }else{
        setList([])
      }
    })
  }

  //Modify the favorites status
  const handleChange = (item)=>{
    // const url = "https://group18csci4177.onrender.com/api/student/update"

    const url = "http://localhost:5001/api/student/update"
    const cfg = {
      id:item._id,
      status:item.status==='2'?'1':'2'
    }
    http.putApi(url,cfg).then(res=>{
      if(res.status===200){
        if(item.status==='2'){
          messageApi.info('Add to favorites');
        }else{
          messageApi.info('No favorites');
        }
        getList()
      }
    })
  }

  //Enter the Favorites list
  const goStatusList = ()=>{
    setFlag(true)
    getStatusList()
  }

  //Return list
  const goAllList = ()=>{
    setFlag(false)
    getList()
  }

  useEffect(()=>{
    getList()
  },[])


//all list
  const AllList = ()=>{
    return (
      <div className='content'>
        <Card className='left' hoverable>
          <h3 className='font-h1'>Refine your search</h3>
          <Form layout="vertical" form={form}>
            <Form.Item label="name" name="name">
              <Input placeholder='name' onBlur={()=>getList()} allowClear/>
            </Form.Item>
            <Form.Item label="gender" name="gender">
              <Select placeholder='gender' options={sexOption} onChange={()=>getList()} allowClear/>
            </Form.Item>
            <Form.Item label="age" name="age" >
              <Input placeholder='Age'onBlur={()=>getList()} allowClear />
            </Form.Item >
            <Form.Item label="grade" name="class">
              <Select placeholder='Grade' options={classOption} onBlur={()=>getList()} allowClear/>
            </Form.Item>
            <Form.Item label="hobby" name="hobby">
              <Input placeholder='Hobby' onBlur={()=>getList()} allowClear/>
            </Form.Item>
            <Form.Item label="major" name="speciality">
              <Input placeholder='Major' onBlur={()=>getList()} allowClear/>
            </Form.Item>
          </Form>
        </Card>
        <Card className='right' hoverable>
          <div className='right-header'>
          <h1 className='font-h1'>Search Results</h1>
            <Button type="primary" onClick={()=>{goStatusList()}}>Enter Favorites list</Button>
          </div>
          <Row gutter={[16, 24]}>
            {
              list.map((item,index)=>
                <Col className="gutter-row" span={8} key={index}>
                  <Card hoverable>
                    <Button type="link" className='name'>{item.name}</Button>
                    <p>Gender: {getDirectory(item.gender,sexOption)}</p>
                    <p>Age: {item.age}</p>
                    <p>Grades: {getDirectory(item.class,classOption)}</p>
                    <p>Hobby: {item.hobby}</p>
                    <p>Major: {item.speciality}</p>
                    <div>Status: <Rate onClick={()=>handleChange(item)} value={item.status==='1'?1:0} count={1}/></div>
                  </Card>
                </Col>
              )
            }
          </Row>
        </Card>
      </div>
    )
  }

  //favorite list
  const StatusList = ()=>{
    return (
      <div>
        <Card hoverable>
          <div className='right-header'>
          <h1 className='font-h1'>Favorite List</h1>
            <Button type="primary" onClick={()=>{goAllList()}}>Return Dashboard</Button>
          </div>
          <Row gutter={[16, 24]}>
            {
              list.map((item,index)=>
                <Col className="gutter-row" span={8} key={index}>
                  <Card hoverable>
                    <Button type="link" className='name'>{item.name}</Button>
                    <p>Gender: {getDirectory(item.gender,sexOption)}</p>
                    <p>Age: {item.age}</p>
                    <p>Grade: {getDirectory(item.class,classOption)}</p>
                    <p>Hobby: {item.hobby}</p>
                    <p>Major: {item.speciality}</p>
                  </Card>
                </Col>
              )
            }
          </Row>
        </Card>
      </div>
    )
  }

  return (
    <div className="App">
      {contextHolder}
      {
        flag?<StatusList />:<AllList/>
      }
    </div>
  );
}

export default Matching;