import { Card, Col, Row, Button } from 'antd';
import React, { Component } from 'react';
import './CardComponenet.css';
import { SmileFilled } from '@ant-design/icons';


class CardComponent extends Component {


    render() {
        const list = [1, 2, 4, 5];
        return (
            <Card
                className='my-card'
                hoverable

            >
                <div className="card-title">
                    <span>Abierto</span>
                </div>
                <Row>
                    <Col span={6}>
                        <img
                            className='card-img'
                            alt="example"
                            src="https://jumbocolombiafood.vteximg.com.br/arquivos/jumbo-logo-preload.png?v=636125778257100000" />
                    </Col>
                    <Col span={18} style={{ paddingLeft: '20px' }}>
                        <p>Jumbo 65</p>
                        <p>Distancia 2km</p>
                        <p>8AM - 10PM</p>
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
                        <SmileFilled style={{ color: 'green', marginLeft: '1rem' }} />
                         vacio
                    </p>
                </Row>
                <Row>
                    <ul className='card-prod-detail'>
                        {
                            list.map((i) => (<li key={i} >
                                <img
                                    className='card-detall-img'
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQeXSrKd5dBF6AtdnlbBobGO1BvTkYjYNkErI03cV7Bot4McQdb"
                                    alt="" />
                            </li>)
                            )
                        }
                    </ul>
                </Row>

                <Row>
                    <Button type='ghost' className='warning-color' size='large' >Reportar Incidencia</Button>
                </Row>

            </Card>
        );
    }
}

export default CardComponent;