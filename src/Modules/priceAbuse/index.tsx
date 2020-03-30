import React, { Component, Fragment } from 'react';
import { HeaderComponent } from 'src/Components';
import { Col, Row, Form, Input, Button, Avatar, Radio } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { StoreService } from 'src/Modules/services';



class PrinceAbuse extends Component<any, any> {
  state = {
    list: [],
    products: [],
    reporte: [],
    id: 0
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    StoreService.getProductStore(id).then((res: any) => {
      const { products } = res;
      this.setState({ list: products, products, id })
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
    const { reporte, products } = this.state;
    await StoreService.reporteProductoExistence(reporte);
    this.setState({
      list: products,
      products,
      reporte: []
    });
  }

  hambler = (id: any) => {
    console.log('click', id);
    this.props.history.push(`/reporte/${this.state.id}/${id}/`);
  }

  render() {

    const { reporte, list } = this.state;
    //const list: Array<any> = [];
    return (
      <Fragment>
        <Col span={24}>
          <HeaderComponent updateEvent={() => { }} />
        </Col>
        <Col span={24}>
          <h2 style={{ textAlign: 'center', margin: '2%' }} >
            Productos Reportados en su tienda o supermercado
          </h2>
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
            {
              list.map((item: any) => {

               
                return (
                  <Row key={item.id} onClick={() => this.hambler(item.id)} style={{marginBottom:'12px'}}>
                    <Col span={24}>
                      <Row>
                        <Col span={5} style={{ marginBottom: '5px' }}>
                          <Avatar shape="square" size={64} icon="img" ></Avatar>
                        </Col>
                        <Col span={17}>
                          <h2 style={{ marginBottom: 0 }}>{item.name}</h2>
                          <span>{item.prince}</span>
                          <span style={{color:'#a9a4a4'}}>Actualizar Precio</span>
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

export default PrinceAbuse