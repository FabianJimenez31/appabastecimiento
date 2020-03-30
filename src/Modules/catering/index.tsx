import React, { Component, Fragment } from 'react';
import { Col, Row, Form, Input, Button, Avatar, Radio } from 'antd';
import { SearchOutlined, } from '@ant-design/icons';

import { StoreService } from 'src/Modules/services';



class Catering extends Component<any, any> {
  state = {
    list: [],
    products: [],
    reporte: []
  }

  listProduc: Array<number> = [];
  componentDidMount() {
    StoreService.getProduct().then((res: any) => {
      this.setState({ list: res, products: res });
    })
  }

  hamblerInputChange = async (e: any) => {
    const { target: { value } } = e;

    const { products } = this.state;
    if (value === '') {
      this.setState({ list: products });
      return;
    }

    let list = products.filter((item: any) => {
      if (item.name.indexOf(value) > -1) {
        return item;
      }
    });
    this.setState({ list });

  }

  hamblerProcess = () => {
    if (this.listProduc.length < 1) {
      return;
    }
    localStorage.setItem('pd', JSON.stringify(this.listProduc));
    this.props.history.push('/maps');
  }
  
  addEvent = (e: any) => {
    const { target: { value } } = e;
    if (this.listProduc.indexOf(value) > -1) {
      this.listProduc.splice(this.listProduc.indexOf(value), 1);
    } else {
      this.listProduc.push(Number(value));
    }
  }
  render() {

    const { list } = this.state;

    return (
      <Fragment>
        {/* <Col span={24}>
          <HeaderComponent updateEvent={() => { }} />
        </Col> */}
        <Col span={24}>
          <Form.Item style={{ margin: '15px 10px' }}>
            <Input
              type='large'
              placeholder='Buscar un producto'
              onChange={this.hamblerInputChange}
              prefix={<SearchOutlined />}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <h2 style={{ textAlign: 'center', margin: '2%' }} >
            ¿Encuentra tus productos en tu zona?
            </h2>
        </Col>
        <Row style={{ padding: '10px' }}>

          <Col span={24}>
            {
              list.map((item: any) => {

                return (
                  <Row key={item.id}>
                    <Col span={24}>
                      <Row>
                        <Col span={5} style={{ marginBottom: '5px' }}>
                          <Avatar shape="square" size={64} icon="img" ></Avatar>
                        </Col>
                        <Col span={17}>
                          <h2 style={{ marginBottom: 0 }}>{item.name}</h2>
                          <span>{item.prince}</span>
                        </Col>
                        <Col span={2}>
                          <Radio value={item.id} onClick={this.addEvent} />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                );
              })
            }
          </Col>
          <Button onClick={this.hamblerProcess} type='ghost' className='warning-color' style={{ width: '100%', marginBottom: '10px', position: 'fixed', bottom: '0px' }} >Continuar</Button>
        </Row>
      </Fragment>
    );
  }
}

export default Catering