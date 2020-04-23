import React, { Component, Fragment, } from 'react';
import mapboxgl, { Marker } from 'mapbox-gl';
import { Modal, Button, Input, Row, Col } from 'antd';
import { LikeOutlined, } from '@ant-design/icons';

import './master.css';
import { StoreService } from '../services';
import TextArea from 'antd/lib/input/TextArea';

interface Iformulario {
    img: any,
    descripcion: string;
}
interface stateComponent {
    lng: number;
    lat: number;
    zoom: number;
    marker: Array<any>;
    products: Array<any>;
    data: any;
    visible: boolean
    dataModal: any;
    viewModal: number;
    active: number;
    formulario: Iformulario;
}


mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

class Home extends Component<any, stateComponent>{
    mapRef: any;
    map: any;

    constructor(props: any) {
        super(props);
        this.mapRef = React.createRef();
        this.state = {
            lng: -74.112,
            lat: 4.5504,
            zoom: 11,
            marker: [],
            products: [],
            data: [],
            visible: false,
            dataModal: {},
            viewModal: 1,
            active: 0,
            formulario: {
                img: '',
                descripcion: ''
            }
        };

    }
    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({

                    lat: Number(position.coords.latitude),
                    lng: Number(position.coords.longitude)
                });
            });

        }

    }
    showModal = (item: any) => {
        this.setState({
            visible: true,
            dataModal: item
        });
    };
    handleOk = () => {

        this.setState({
            visible: false,
        });
    };

    handleCancel = () => {

        this.setState({
            visible: false,
            viewModal: 1,
        });
    };

    loadMaps() {

        const { lng, lat, zoom } = this.state;

        this.map = new mapboxgl.Map({
            container: this.mapRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom,

        });

        const mark = { lng, lat };
        new Marker({ color: '#08c186' })
            .setLngLat(mark)
            .setPopup(new mapboxgl.Popup({ offset: 25 })
                .setHTML(`<h3> Estas Aquí </h3>`))
            .addTo(this.map);


        this.map.loaded();
    }




    updateEvent = () => {
        const { lng, lat } = this.state;

        StoreService.storesGeo(lat, lng).then(
            (res: any) => {

                this.loadMaps();

                res.forEach((item: any) => {
                    const parcial = 5 / 3;
                    const { raiting } = item;
                    const color = raiting >= 0 && raiting < parcial ? '#0befef' : raiting >= parcial && raiting <= parcial * 2 ? '#efd30b' : '#ef4a0b';

                    new Marker({ color })
                        .setLngLat({ lng: item.longitude, lat: item.latitude })
                        .setPopup(new mapboxgl.Popup({ offset: 25 })
                            .setDOMContent(
                                this.createHtml(item)
                            )
                        )
                        .addTo(this.map);


                });

            }
        )
    }
    createHtml(item: any) {
        const div = document.createElement('div');
        const h3 = document.createElement('h3');
        const p = document.createElement('p');
        const butto = document.createElement('button');

        h3.append(document.createTextNode(item.name));
        p.append(document.createTextNode(`Calificación ${item.raiting}`));
        butto.append(document.createTextNode('ver mas'));
        butto.classList.add('ant-btn');
        butto.classList.add('warning-color');
        butto.classList.add('ant-btn-ghost');
        butto.addEventListener('click', (e: any) => {
            console.log(e);
            this.showModal(item);
            StoreService.store(item.id).then(
                (res: any) => {
                    const { reports } = res;
                    this.setState({ data: reports });
                }
            )
        });
        div.append(h3);
        div.append(p);
        div.append(butto);
        return div;

    }

    hamblerChanteInput = (e: any) => {
        const { target: { value, files } } = e;
        const { formulario } = this.state;
        if (files !== undefined) {
            formulario.img = files[0];
        } else {
            formulario.descripcion = value;
        }

        this.setState({ formulario });
    }
    save = () => {
        const { viewModal } = this.state;
        if (viewModal === 3) {
            this.saveRanquint();
        }
        if (viewModal === 4) {
            this.saveReporte();
        }
        else {
            this.handleCancel();
        }
    }
    saveRanquint = () => {
        const { dataModal, active } = this.state;
        const data = {
            'store_id': dataModal.id,
            'raiting': active
        }
        StoreService.storeRanquit(data);
        this.setState({ active: 0 });
        this.handleCancel();
    }
    saveReporte = () => {
        const { formulario, dataModal } = this.state;
        const data = new FormData();
        data.append("store_id", dataModal.id);
        data.append("description", formulario.descripcion);
        data.append("photo", formulario.img);

        StoreService.reporteProduct(data).then(
            (res: any) => {
                console.log(res);
                this.setState({
                    dataModal: '',
                    formulario: { img: '', descripcion: '' },
                    viewModal: 1
                });
                this.handleCancel();
            },
            (err: any) => {
                console.log(err);
            }
        )

    }
    render() {
        this.updateEvent();
        const { dataModal, viewModal, active, data } = this.state;
        let css = 'icon-calificacion';
        return (
            <Fragment>

                <div >
                    <div ref={this.mapRef} className="absolute top right left bottom" />
                </div>

                <Modal
                    title={dataModal.name}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>Ver información completa del negocio</p>
                    <p>¿Que tan abastecido esta este negocio?</p>
                    <p>Denunciar Alza De Precios</p>
                </Modal>

                <Modal
                    title={`${dataModal.name} - calificaión ${dataModal.raiting}`}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            Cancelar
                        </Button>,
                        <Button key="submit" type="primary" className='warning-color' onClick={this.save}>
                            {viewModal < 3 ? 'Volver' : 'Guardar'}
                        </Button>,
                    ]}
                >
                    {
                        viewModal == 1 ? (
                            <Fragment>
                                <Button
                                    block
                                    style={{ marginTop: '5px' }}
                                    onClick={() => {
                                        this.setState({ viewModal: 2 })
                                    }}
                                >Ver información completa del negocio</Button>
                                <Button
                                    block
                                    style={{ marginTop: '5px' }}
                                    onClick={() => {
                                        this.setState({ viewModal: 3 })
                                    }}
                                >¿Que tan abastecido esta este negocio?</Button>
                                <Button
                                    block
                                    style={{ marginTop: '5px' }}
                                    onClick={() => {
                                        this.setState({ viewModal: 4 })
                                    }}
                                >Denunciar Alza De Precios</Button>
                            </Fragment>
                        ) : viewModal == 3 ? (
                            <Fragment>
                                <h2>Califica el abastecimiento de esta tienda</h2>
                                <p>Nuestra calificación va del 1 al 5 likes, utiliza 5 para reportar que esta tienda esta muy bien abastecida y 1 para una tienda que esta muy poco abastecida</p>
                                <p style={{ textAlign: 'center' }}>
                                    {
                                        [1, 2, 3, 4, 5].map((e: any) => {
                                            if (active > 0 && active >= e) {
                                                const cssActive = `${css} active-calificacion`;
                                                return (<LikeOutlined key={e} className={cssActive} onClick={
                                                    () => {
                                                        this.setState({ active: e });
                                                    }
                                                } />);
                                            } else {
                                                return (<LikeOutlined key={e} className={css} onClick={
                                                    () => {
                                                        this.setState({ active: e });
                                                    }
                                                } />);
                                            }

                                        })

                                    }


                                </p>
                            </Fragment>
                        ) : viewModal == 4 ? (
                            <Fragment>
                                <h3>Tome un foto del producto o factura que deseas reportar y selecionala</h3>
                                <Input type="file" name="" id="" onBlur={this.hamblerChanteInput} accept=".jpg,.png" />
                                <p>Descríbenos tu denuncia para que otras personas puedan conocer más</p>
                                <p>
                                    <TextArea onBlur={this.hamblerChanteInput} rows={5} cols={12}></TextArea>
                                </p>
                            </Fragment>
                        ) : (
                                        <Fragment>
                                            {
                                                data.map((item: any) => {
                                                    return (
                                                        <Row key={item.created_on}  style={{margin:'10px 0px',borderBottom:'1px dotted #bdbdbd'}}>
                                                            <Col span={10} sm='10'>
                                                                <img
                                                                    className='img-detail'
                                                                    src={`https://abastecernosapi.humc.co${item.photo}`} alt="" />
                                                            </Col>
                                                            <Col span={12} sm='12' style={{paddingLeft:'10px'}}>{item.description}</Col>
                                                        </Row>
                                                    )
                                                })
                                            }
                                        </Fragment>
                                    )
                    }

                </Modal>

            </Fragment>
        );
    }


}

export default Home;