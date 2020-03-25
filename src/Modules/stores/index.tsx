import React, { Component, Fragment } from 'react';
import { HeaderComponent } from 'src/Components';
import { Col, Row, Form, Input, Button, List } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { StoreService } from 'src/Modules/services';

interface stateComponetn {
  list: any;
}
class Stores extends Component<stateComponetn, any> {
  state = {
    list: []
  }

  listStore: any;
  async componentDidMount() {
    this.listStore = await StoreService.filterStore();
  }

  hamblerInputChange = (e: any) => {
    const { target: { value } } = e;
    const list = this.listStore.filterStore((item: any) => {
      if (item.name.indexOf(value) > 0) {
        return item
      }
    })

    this.setState({ list });

  }

  render() {

    const { list } = this.state;

    return (
      <Fragment>
        <Col span={24}>
          <HeaderComponent updateEvent={() => { }} />
        </Col>
        <Row style={{ padding: '10px' }}>

          <Col span={24}>
            <Form.Item style={{ marginTop: '2em' }}>
              <Input
                type='large'
                placeholder='Ingrese una dirección'
                onChange={this.hamblerInputChange}
                prefix={<SearchOutlined />}
              />
            </Form.Item>
            <Form.Item>

              <List
                size="small"
               
                bordered
                dataSource={list}
                renderItem={(item: any) => (<List.Item>{item.name}</List.Item>)}
              />
            </Form.Item>
          </Col>
          <Button type='ghost' className='warning-color' style={{ width: '100%', marginBottom: '10px', position: 'fixed', bottom: '0px' }} >Continuar</Button>
        </Row>

      </Fragment>
    );
  }
}

export default Stores