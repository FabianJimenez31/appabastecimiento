import { Card, Col, Row, Button } from 'antd';
import React, { Component } from 'react';
import './CardComponenet.css';
import { SmileFilled } from '@ant-design/icons';
import Item from 'antd/lib/list/Item';

interface propsState {
    listCards: any;
}

class CardComponent extends Component<propsState, any> {


    render() {
        const { products, name } = this.props.listCards;

        return (
            <Card
                className='my-card'
                hoverable

            >
                {/*  <div className="card-title">
                    <span>Abierto</span>
                </div> */}
                <Row>
                    <Col span={6}>
                        <img
                            className='card-img'
                            alt="example"
                            src="https://ciat.cgiar.org/wp-content/uploads/image-not-found.png" />
                    </Col>
                    <Col span={18} style={{ paddingLeft: '20px' }}>
                        <p style={{ marginTop: '10px' }}> {name}</p>
                        {/*  <p>Distancia 2km</p>
                        <p>8AM - 10PM</p> */}
                    </Col>

                </Row>
                <Row>
                    <p >
                        <span style={{ fontWeight: 'bold' }}>Julian Garcia</span>
                        <span style={{ fontSize: '10px' }}>En este momento se encuentra bien abastecida</span>
                    </p>
                </Row>
                <Row>
                    <p>
                        <SmileFilled style={{ color: 'green', margin: '0px 1rem' }} />
                         vacio
                    </p>
                </Row>
                <Row>
                    <ul className='card-prod-detail'>
                        {
                            products.map((product: any) => (
                                <li key={product.id} >
                                    <img
                                        className='card-detall-img'
                                        src="https://ciat.cgiar.org/wp-content/uploads/image-not-found.png"
                                        alt="" />
                                    <span style={{marginLeft:'10px'}} >{product.name}</span>
                                </li>
                            )
                            )
                        }
                    </ul>
                </Row>

            </Card>
        );
    }
}

export default CardComponent;