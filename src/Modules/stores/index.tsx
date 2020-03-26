import React, { Component, Fragment } from 'react';
import { HeaderComponent } from 'src/Components';
import { Col, Row, Form, Input, Button, List } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { StoreService } from 'src/Modules/services';
import { Link } from 'react-router-dom';

class Stores extends Component<any, any> {
  state = {
    list: []
  }

  listStore: any;


  hamblerInputChange = async (e: any) => {
    let list: Array<any> = [];
    const { target: { value } } = e;
    StoreService.filterStore(value).then((res: any) => {
      list = res;
    }).finally(() => {
      this.setState({ list: list });
    });
  }

  onClickRedirect = () => {
    this.props.history.push('/products');
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
                renderItem={(item: any) => (
                  <Link to={`/products/${item.id}`} >
                    <List.Item >{item.name}</List.Item>
                  </Link>
                )}
              />
            </Form.Item>
          </Col>
          <Button
            onClick={this.onClickRedirect}
            type='ghost'
            className='warning-color'
            style={{ width: '100%', marginBottom: '10px', position: 'fixed', bottom: '0px' }} >Continuar</Button>
        </Row>
      </Fragment>
    );
  }
}

export default Stores