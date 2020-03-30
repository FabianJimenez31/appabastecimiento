/* eslint-disable no-debugger */
import React, { Component, Fragment } from 'react';
import { HeaderComponent } from 'src/Components';
import { Col, Row, Form, Input, Button, List } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { StoreService } from 'src/Modules/services';
import { Link } from 'react-router-dom';
import mapboxgl, { Marker } from 'mapbox-gl';
const MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');


class Stores extends Component<any, any> {
  mapRef: any;
  map: any;

  state = {
    list: [],
    router: '',
    viewState: false,
    lng: -74.112,
    lat: 4.5504,
    zoom: 13,
    marker: [],
    store: { lng: '', lat: '' },
    storeName: '',
  }
  marketStore: any;

  listStore: any;

  componentDidMount() {
    this.mapRef = React.createRef();
    const { location: { hash } } = window;
    if (hash === '#/store') {
      this.setState({ router: 'products' });
    }
    if (hash === '#/abastecimiento') {
      this.setState({ router: 'prince/abuse' });
    }
  }

  hamblerInputChange = async (e: any) => {

    const { target: { value } } = e;
    if (value !== '') {

      StoreService.filterStore(value).then((res: any) => {
        const { data } = res;
        if (data.length > 0) {
          this.setState({ list: data, storeName: value });
        } else {
          this.setState({ viewState: true, list: [], storeName: value });
          this.loadMaps();
        }
      }).catch((err: any) => {
        console.group(err);
      });
    }
  }

  loadMaps() {

    const { lng, lat, zoom } = this.state;

    this.map = new mapboxgl.Map({
      container: this.mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom,

    });

    this.map.addControl(new MapboxGeocoder({
      accessToken: mapboxgl.accessToken
    }));

    this.map.on('click', (e: any) => {
      const { lngLat, lngLat: { lng, lat } } = e;
      this.marketStore = new Marker()
        .setLngLat(lngLat)
        .addTo(this.map);
      this.setState({ store: { lng, lat } });
    });

    this.map.on('move', () => {
      const { lng, lat } = this.map.getCenter();
      this.setState({
        lng: Number(lng.toFixed(4)),
        lat: Number(lat.toFixed(4)),
        zoom: Number(this.map.getZoom().toFixed(2))
      });
    });


    const mark = { lng, lat };
    new Marker()
      .setLngLat(mark)
      .setPopup(new mapboxgl.Popup({ offset: 25 })
        .setHTML(`<h3> Estas Aquí </h3>`))
      .addTo(this.map);

    this.map.loaded();
  }

  creatStore = async () => {

    const { storeName, store } = this.state;


    const payload = {
      name: storeName,
      longitude: store.lng,
      latitude: store.lat
    };
    await StoreService.createStore(payload).finally(() => {
      StoreService.filterStore(storeName).then((res: any) => {
        const { data } = res;
        if (data.length > 0) {
          this.setState({ viewState: false, list: data, storeName });
        } else {
          this.setState({ viewState: false, list: [], storeName });
          this.loadMaps();
        }
      });

    });
  }


  onClickRedirect = () => {
    this.props.history.push('/products');
  }


  updateEvent = (data: any) => {
    this.setState({ ...data });
  }

  render() {

    const { list, router } = this.state;

    return (
      <Fragment>
        <Col span={24}>
          <HeaderComponent updateEvent={this.updateEvent} />
        </Col>
        <Row style={{ padding: '10px' }}>
          <Col span={24}>
            <Form.Item style={{ marginTop: '2em' }}>
              <Input
                type='large'
                placeholder='Buscar un establecimiento'
                onChange={this.hamblerInputChange}
                prefix={<SearchOutlined />}
              />
            </Form.Item>
            {
              this.state.viewState ? (
                <Fragment>
                  <h3 style={{ textAlign: 'center' }} > Selecione la ubicacion del local</h3>
                  <Form.Item style={{ marginTop: '1em' }} >
                    <div ref={this.mapRef} className="absolute top right left bottom" />
                  </Form.Item>
                </Fragment>
              ) : null
            }
            <Form.Item>
              <List
                size="small"
                bordered
                dataSource={list}
                renderItem={(item: any) => (
                  <Link to={`/${router}/${item.id}`} >
                    <List.Item >{item.name}</List.Item>
                  </Link>
                )}
              />
            </Form.Item>
          </Col>
          {
            this.state.viewState ? (
              <Button

                onClick={this.creatStore}
                type='ghost'
                className='warning-color'
                style={{ width: '100%', marginBottom: '10px', height: '40px', position: 'fixed', bottom: '0px' }} >Registrar Local</Button>

            ) : null
          }
        </Row>
      </Fragment>
    );
  }
}

export default Stores