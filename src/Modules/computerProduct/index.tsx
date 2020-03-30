import React, { Component, Fragment } from "react";
import { Col, Row, Form, Select, Input, Button } from "antd";
import { StoreService } from "../services";


const { Option } = Select;

class ComputerProduct extends Component<any, any> {

    listUnit: Array<any> = [];
    state = {
        store_id: 0,
        product_id: 0,
        unit_id: 0,
        before: 0,
        measure: '',
        after: 0,
        listUnit: []
    }

    componentDidMount() {
        const { id, product } = this.props.match.params;
        this.setState({
            product_id: product,
            store_id: id
        })
        StoreService.unit().then((res: any) => this.setState({ listUnit: res }))
    }
    hamblerSubmit = async () => {
        console.log(this.state);
        await StoreService.reporteAlzadePrecio(this.state);
        this.setState({
            store_id: 0,
            product_id: 0,
            unit_id: 0,
            before: 0,
            measure: '',
            after: 0,
        });
        this.props.history.push('/');
    }

    render() {
        const { listUnit } = this.state;
        const CONST_OPTION = listUnit.map((item: any) => (<Option key={item.id} value={item.id}>{item.name}</Option>))
        return (

            <Fragment>
                <Col span={24}>
                    <h2 style={{
                        textAlign: 'center', margin: '2%', display: 'block',
                        color: '#F8B500',
                        fontWeight: 'bold',
                        fontSize: '30px'
                    }} >
                        Cuál es el precio acual del producto
                    </h2>
                </Col>
                <Row style={{ padding: '10px' }}>
                    <Col span={24} style={{ textAlign: 'center' }}>
                        <span> Especificaciones del producto</span>
                    </Col>
                </Row>
                <Form>
                    <Row>
                        <Col span={22} offset={1}>

                            <Form.Item label='Selecione un medida'>
                                <Select
                                    placeholder='Selecione uno'
                                    onChange={(e: any) => { this.setState({ measure: e }) }}
                                >
                                    {CONST_OPTION}

                                </Select>
                            </Form.Item>

                            <Form.Item label='ingrese un cantidad'>
                                <Input type='number' onChange={(e: any) => { const { target: { value } } = e; this.setState({ unit_id: value }); }} placeholder='0' />
                            </Form.Item>

                        </Col>
                    </Row>
                    <Row style={{ display: 'block', textAlign: 'center' }}>
                        <h2 style={{
                            display: 'block',
                            color: '#F8B500',
                            fontWeight: 'bold',
                            fontSize: '30px'
                        }}>Cual es el precio del producto actual</h2>
                        <Col span={22} offset={1}>
                            <Form.Item label=''>
                                <Input type='number' onChange={(e: any) => { const { target: { value } } = e; this.setState({ after: value }); }} placeholder='00.00' />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row style={{ display: 'block', textAlign: 'center' }}>
                        <h2 style={{
                            display: 'block',
                            color: '#F8B500',
                            fontWeight: 'bold',
                            fontSize: '30px'
                        }}>Cual es el precio del producto antes del  asilamiento</h2>
                        <Col span={22} offset={1}>
                            <Form.Item label=''>
                                <Input type='number' onChange={(e: any) => { const { target: { value } } = e; this.setState({ before: value }); }} placeholder='00.00' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Button style={{ width: '100%' }} type='ghost' className='warning-color' size='large' onClick={this.hamblerSubmit} >Enviar Reporte</Button>
                        </Col>
                    </Row>

                </Form>

            </Fragment>

        );
    }
}

export default ComputerProduct;