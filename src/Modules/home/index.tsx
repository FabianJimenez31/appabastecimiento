import React, { Component, Fragment } from 'react';
import { HeaderComponent } from 'src/Components';
import { Card, Row, Col } from 'antd';

import './master.css';
import { Link } from 'react-router-dom';

interface stateComponent {
    lng: number;
    lat: number;
    zoom: number;
}


class Home extends Component<any, stateComponent>{

    list: Array<any> = [
        {
            title: 'Reportar el estado de abastecimiento de un producto',
            img: 'component.png',
            patch: '/store'
        },
        {
            title: 'Ver el estado de abastecimiento de un producto',
            img: 'component-2.png',
            patch: '/catering'
        },
        {
            title: 'Reportar Abuso de precio de un producto',
            img: 'component-3.png',
            patch: '/abastecimiento'
        }
    ]
    updateEvent = () => { }

    render() {
        return (
            <Fragment>
                <HeaderComponent updateEvent={this.updateEvent} />

                <Row>
                    <Col span={24} style={{ backgroundColor: '#fff' }}>

                        <h1 style={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            margin: '25px'
                        }} >¿Qué deseas hacer?</h1>

                    </Col>
                    <Col span={24} >
                        {
                            this.list.map((res: any) => (
                                <Link to={res.patch} key={res.title}>
                                    <Card key={new Date().getMilliseconds()}
                                        hoverable
                                    >
                                        <img
                                            alt={res.title}
                                            src={`./img/${res.img}`}
                                            style={{ width: '100%' }}
                                        />
                                        <p className='card-test'> {res.title}</p>
                                    </Card>
                                </Link>

                            ))
                        }
                    </Col>
                </Row>

            </Fragment>
        );
    }


}

export default Home;