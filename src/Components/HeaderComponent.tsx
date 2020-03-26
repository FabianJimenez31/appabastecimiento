import React, { Component, Fragment } from "react";
import { Col, Row, Input, Button } from 'antd';
import { AimOutlined, MenuOutlined } from '@ant-design/icons';
import './header.css';
import { Link } from "react-router-dom";

interface stateComponent {
    position: string;
    lng: number;
    lat: number;
}


interface stateProps {
    updateEvent: (e: any) => void;
}

class HeaderComponent extends Component<stateProps, stateComponent> {
    state = {
        position: '',
        lng: 5,
        lat: 34,
    };

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position);
                //const url = `http://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&sensor=false`

                var img = new Image();
                img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + position.coords.latitude + "," + position.coords.longitude + "&zoom=13&size=800x400&sensor=false";
                this.setState({
                    position: `${position.coords.latitude},${position.coords.longitude}`,
                    lng: position.coords.longitude,
                    lat: position.coords.latitude,
                });
                const data = {
                    lng: position.coords.longitude,
                    lat: position.coords.latitude,
                    zoom: 13
                }
                this.updateEvent(data);
            });

        }
    }

    updateEvent = (data: any) => {
        this.props.updateEvent(data);
    }

    render() {
        return (
            <Fragment>
                <Row style={{ padding: '10px' }} className='warning-color'>
                    <Col sm={12}>
                        <div className="header-posicion">
                            <Link to='/maps' style={{color:'white'}}>
                                <span>
                                    <AimOutlined className='header-icon' />
                                Calle 134 #67-15
                            </span>
                            </Link>
                        </div>
                    </Col>
                    <Col sm={12}>
                        <p className="header-info" >Ultimo reporte hace 10min</p>
                    </Col>
                </Row>
                <Row style={{
                    padding: '10px',
                    borderBottomRightRadius: '10px',
                    borderBottomLeftRadius: '10px'
                }} className='warning-color'>
                    <Col sm={1} xs={3} span={3}>
                        <Link to='/'>
                            <Button
                                type='default'
                                icon={<MenuOutlined />}
                                className='warning-color'
                                style={{
                                    borderColor: 'transparent',
                                    boxShadow: '0px 0px 0px rgba(0, 0, 0, 0)'
                                }}
                            />
                        </Link>
                    </Col>
                    <Col sm={12}>
                        <Input placeholder="Enecuentra lo que necesitas"></Input>
                    </Col>
                </Row>
            </Fragment>
        );
    }

}

export default HeaderComponent;