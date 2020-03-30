import React, { Component, Fragment } from 'react';
import { HeaderComponent, CardComponent } from 'src/Components';
import mapboxgl, { Marker } from 'mapbox-gl';

import './master.css';
import { StoreService } from '../services';

interface stateComponent {
    lng: number;
    lat: number;
    zoom: number;
    marker: Array<any>;
    products: Array<any>;
    data: Array<any>;
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
            data: []
        };

    }
    componentDidMount() {
        let list: any = localStorage.getItem('pd');
        list = JSON.parse(list);
        let produc = list.map((i: any) => Number(i));
        this.setState({ products: produc });
    }

    loadMaps() {

        const { lng, lat, zoom } = this.state;

        console.log(lng, lat);
        this.map = new mapboxgl.Map({
            container: this.mapRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom,

        });

        this.map.on('move', () => {
            const { lng, lat } = this.map.getCenter();

            this.setState({
                lng: Number(lng.toFixed(4)),
                lat: Number(lat.toFixed(4)),
                zoom: Number(this.map.getZoom().toFixed(2))
            });
        });


        const mark = { lng: -74.087697, lat: 4.728263 };
        console.log(mark)
        new Marker()
            .setLngLat(mark)
            .setPopup(new mapboxgl.Popup({ offset: 25 })
                .setHTML(`<h3> Estas Aquí </h3>`))
            .addTo(this.map);


        this.map.loaded();
    }




    updateEvent = (data: stateComponent) => {
        this.setState({ ...data });
        const json = {
            products: this.state.products
        }
        StoreService.storeGeolocation(data.lat, data.lng, json).then(
            (res: any) => {
                const { data } = res;
                this.loadMaps();
                this.setState({ data })
                data.forEach((item: any) => {

                    /*  const el = document.createElement('div');
                     el.className = 'marker';
                     el.style.backgroundImage =
                         'url(https://placekitten.com/g/' +
                         marker.properties.iconSize.join('/') +
                         '/)';
                     el.style.width = '27px';
                     el.style.height = '41px'; */

                    new Marker()
                        .setLngLat({ lng: item.longitude, lat: item.latitude })
                        .setPopup(new mapboxgl.Popup({ offset: 25 })
                            .setHTML(`<h3> ${item.name}  </h3><p> ${item.state}</p>`))
                        .addTo(this.map);
                });

            }
        )
    }

    render() {
        const { data } = this.state;
        return (
            <Fragment>
                <HeaderComponent updateEvent={this.updateEvent} />
                <div >
                    <div ref={this.mapRef} className="absolute top right left bottom" />
                </div>
                <div className="content-card" key={new Date().getMilliseconds()} >
                    {
                        data.map(
                            (i: any) => (<CardComponent listCards={i} key={i.id} />)
                        )
                    }
                </div>

            </Fragment>
        );
    }


}

export default Home;