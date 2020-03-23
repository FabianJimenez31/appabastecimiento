import React, { Component, Fragment } from "react";
import { Col, Row, Input, Button } from 'antd';
import { AimOutlined, MenuOutlined } from '@ant-design/icons';
import './header.css';

interface stateComponent {
    position: string;
}
class HeaderComponent extends Component<any, stateComponent> {
    state = {
        position: ''
    };

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position);
                const url = `http://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&sensor=false`
                fetch(url)
                    .then(
                        (data: RequestInit) => {
                            console.log(data);
                        }
                    )
                var img = new Image();
                img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + position.coords.latitude + "," + position.coords.longitude + "&zoom=13&size=800x400&sensor=false";
                this.setState({
                    position: `${position.coords.latitude},${position.coords.longitude}`

                })
            });

        }
    }

    render() {
        return (
            <Fragment>
                <Row style={{ padding: '10px' }}>
                    <Col sm={12}>
                        <div className="header-posicion">
                            <span>
                                <AimOutlined className='header-icon' />
                                Calle 134 #67-15
                            </span>
                        </div>
                    </Col>
                    <Col sm={12}>
                        <p className="header-info" >Ultimo reporte hace 10min</p>
                    </Col>
                </Row>
                <Row style={{ padding: '10px' }}>
                    <Col sm={1}  xs={3} span={3}>
                        <Button type="primary" icon={<MenuOutlined />} />
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