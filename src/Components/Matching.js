import React, { useEffect, useState, useCallback } from 'react';
import { Card, Form, Input, Select, Row, Col, Button, Rate, message } from 'antd';
import './Matching.css';
import http from '../api/index';

const sexOption = [
  { value: "1", label: 'Man' },
  { value: "2", label: 'Woman' },
  { value: "3", label: 'Other' }
];

const classOption = [
  { value: '1', label: 'Sophomore' },
  { value: '2', label: 'Master' },
  { value: '3', label: 'Freshman' },
  { value: '4', label: 'Senior' },
  { value: '5', label: 'Junior' },
  { value: '6', label: 'PhD' },
];

const Matching = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [list, setList] = useState([]);
  const [flag, setFlag] = useState(false);

  const getDirectory = (item, list) => {
    const record = list.find(record => record.value === item);
    return record && record.label ? record.label : '';
  };

  // Get the list
  const getList = useCallback(async () => {
    try {
      const url = `https://group18csci4177.onrender.com/api/student/list`;
      const cfg = {
        ...form.getFieldsValue()
      };
      const keys = Object.keys(cfg);
      const params = keys.reduce((prev, cur) => {
        if (String(cfg[cur]) !== '') {
          prev[cur] = cfg[cur];
        }
        return prev;
      }, {});

      const res = await http.postApi(url, params);
      if (res.status === 200) {
        setList(res.data || []);
      } else {
        setList([]);
      }
    } catch (e) {
      console.log(e);
    }
  }, [form]);

  const getStatusList = useCallback(async () => {
    try {
      const url = "https://group18csci4177.onrender.com/api/student/list";
      const cfg = {
        status: '1'
      };
      const res = await http.postApi(url, cfg);
      if (res.status === 200) {
        setList(res.data);
      } else {
        setList([]);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  // Modify the favorites status
  const handleChange = async (item) => {
    try {
      const url = "https://group18csci4177.onrender.com/api/student/update";
      const cfg = {
        id: item._id,
        status: item.status === '2' ? '1' : '2'
      };
      const res = await http.putApi(url, cfg);
      if (res.status === 200) {
        if (item.status === '2') {
          messageApi.info('Add to favorites');
        } else {
          messageApi.info('No favorites');
        }
        getList();
      }
    } catch (e) {
      console.log(e);
    }
  };

  // Enter the Favorites list
  const goStatusList = () => {
    setFlag(true);
    getStatusList();
  };

  // Return list
  const goAllList = () => {
    setFlag(false);
    getList();
  };

  useEffect(() => {
    getList();
  }, [getList]);

  // All list
  const AllList = () => {
    return (
      <div className='content'>
        <Card className='left' hoverable>
          <h3 className='font-h1'>Refine your search</h3>
          <Form layout="vertical" form={form}>
            <Form.Item label="Name" name="name">
              <Input placeholder='name' onChange={getList} allowClear />
            </Form.Item>
            <Form.Item label="Gender" name="gender">
              <Select placeholder='gender' options={sexOption} onChange={getList} allowClear />
            </Form.Item>
            <Form.Item label="Age" name="age">
              <Input placeholder='Age' onChange={getList} allowClear />
            </Form.Item>
            <Form.Item label="Year of Degree" name="class">
              <Select placeholder='Status' options={classOption} onChange={getList} allowClear />
            </Form.Item>
            <Form.Item label="Hobby" name="hobby">
              <Input placeholder='Hobby' onChange={getList} allowClear />
            </Form.Item>
            <Form.Item label="Major" name="speciality">
              <Input placeholder='Major' onChange={getList} allowClear />
            </Form.Item>
          </Form>
        </Card>
        <Card className='right' hoverable>
          <div className='right-header'>
            <h1 className='font-h1'>Search Results</h1>
            <Button type="primary" onClick={goStatusList}>Enter Favorites list</Button>
          </div>
          <Row gutter={[16, 24]}>
            {
              list.map((item, index) =>
                <Col className="gutter-row" span={8} key={index}>
                  <Card hoverable>
                    <Button type="link" className='name'>{item.name}</Button>
                    <p>Gender: {getDirectory(item.gender, sexOption)}</p>
                    <p>Age: {item.age}</p>
                    <p>Grades: {getDirectory(item.class, classOption)}</p>
                    <p>Hobby: {item.hobby}</p>
                    <p>Major: {item.speciality}</p>
                    <div>Status: <Rate onClick={() => handleChange(item)} value={item.status === '1' ? 1 : 0} count={1} /></div>
                  </Card>
                </Col>
              )
            }
          </Row>
        </Card>
      </div>
    );
  };

  // Favorite list
  const StatusList = () => {
    return (
      <div>
        <Card hoverable>
          <div className='right-header'>
            <h1 className='font-h1'>Favorite List</h1>
            <Button type="primary" onClick={goAllList}>Return Dashboard</Button>
          </div>
          <Row gutter={[16, 24]}>
            {
              list.map((item, index) =>
                <Col className="gutter-row" span={8} key={index}>
                  <Card hoverable>
                    <Button type="link" className='name'>{item.name}</Button>
                    <p>Gender: {getDirectory(item.gender, sexOption)}</p>
                    <p>Age: {item.age}</p>
                    <p>Grade: {getDirectory(item.class, classOption)}</p>
                    <p>Hobby: {item.hobby}</p>
                    <p>Major: {item.speciality}</p>
                  </Card>
                </Col>
              )
            }
          </Row>
        </Card>
      </div>
    );
  };

  return (
    <div className="App">
      {contextHolder}
      {flag ? <StatusList /> : <AllList />}
    </div>
  );
}

export default Matching;
