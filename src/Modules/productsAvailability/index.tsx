import React, { Component, Fragment } from 'react';
import { HeaderComponent } from 'src/Components';
import { Col, Row, Form, Input, Button, Avatar, Radio } from 'antd';
import { SearchOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';

import { StoreService } from 'src/Modules/services';



class ProductsAvailability extends Component<any, any> {
  state = {
    list: [],
    products: [],
    reporte: [],
    id: 0
  }


  componentDidMount() {
    const id = this.props.match.params.id;
    this.state.id = id;
    StoreService.getProductStore(id).then((res: any) => {
      const { products } = res;
      this.setState({ list: products, products })
    });
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

  hamblerIncrement = (e: any) => {
    const { reporte } = this.state;
    let producCount: any;
    let bdr = true;

    if (reporte.length > 0) {
      reporte.forEach((item: any) => {
        // const item: any = reporte[i];
        if (item.id === e) {
          item.count = item.count + 1;
          bdr = false;
        }
      });
      producCount = reporte;
      if (bdr) {
        const json = {
          id: e,
          count: 1
        };
        producCount.push(json);
      }

    } else {
      producCount = [{
        id: e,
        count: 1
      }];

    }
    this.setState({ reporte: producCount });
  }

  hamblerDecrement = (e: any) => {
    const { reporte } = this.state;
    let producCount: any;

    if (reporte.length > 0) {
      reporte.forEach((item: any) => {
        if (item.id === e) {
          item.count = item.count - 1;
        }
      });
      producCount = reporte;
    }
    this.setState({ reporte: producCount });
  }

  hamblerProcess = async () => {
    const { reporte, products, id } = this.state;

    const struncture = {
      store_id: id,
      products: reporte
    };

    await StoreService.reporteProductoExistence(struncture);
    this.setState({
      list: products,
      products,
      reporte: []
    });
    this.props.history.push('/');
  }

  render() {

    const { list, reporte } = this.state;
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
          <Col span={24} style={{marginBottom:'5rem'}}>
            {
              list.map((item: any) => {

                let count = 0;
                reporte.forEach((i: any) => {
                  if (i.id === item.id) {
                    console.log(i.count);
                    count = i.count;
                  }
                });

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
                          <Radio value={item.id} />
                        </Col>
                      </Row>
                    </Col>
                    <Col span={24}>
                      <Row>
                        <Col span={14} offset={5} >
                          <span>Añadir Cantidad</span>
                        </Col>
                        <Col span={5}  >
                          <MinusOutlined
                            onClick={() => { this.hamblerDecrement(item.id) }}
                            data-id={item.id}
                            style={{ border: '1px solid #F8B500', color: '#F8B500', borderRadius: '2px' }} />
                          <span style={{ color: '#F8B500', fontWeight: 900, padding: '0 8px' }}>
                            {count}
                          </span>
                          <PlusOutlined
                            onClick={() => { this.hamblerIncrement(item.id) }}
                            data-id={item.id}
                            style={{ border: '1px solid #F8B500', color: '#F8B500', borderRadius: '2px' }} />
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

export default ProductsAvailability