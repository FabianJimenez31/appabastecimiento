import React, { Component, Fragment } from 'react';
import { HeaderComponent } from 'src/Components';
import { Col, Row, Form, Input, Button, Card } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { StoreService } from 'src/Modules/services';

interface stateComponetn {
  list: any;
}

class Products extends Component<stateComponetn, any> {
  state = {
    list: []
  }

  hamblerInputChange = async (e: any) => {
    const { target: { value } } = e;
    const list = await StoreService.filterStore(value);
    this.setState({ list });
  }

  render() {

    const { list } = this.state;

    return (
      <Fragment>
        <Col span={24}>
          <HeaderComponent updateEvent={() => { }} />
        </Col>
        <Col span={24}>
          <h2 style={{ textAlign: 'center', margin: '2%' }} >¿Quizas sea alguno de estos productos?</h2>
        </Col>
        <Row style={{ padding: '10px' }}>
          <Col span={24}>
            <Form.Item>
              <Input
                type='large'
                placeholder='Ingrese una dirección'
                onChange={this.hamblerInputChange}
                prefix={<SearchOutlined />}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Card>
              
            </Card>
          </Col>
          <Button type='ghost' className='warning-color' style={{ width: '100%', marginBottom: '10px', position: 'fixed', bottom: '0px' }} >Continuar</Button>
        </Row>
      </Fragment>
    );
  }
}

export default Products