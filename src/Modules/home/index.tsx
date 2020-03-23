import React, { Component, Fragment } from 'react';
import { HeaderComponent, CardComponent } from 'src/Components';
import mapboxgl from 'mapbox-gl';

import './master.css';

interface stateComponent {
    lng: number;
    lat: number;
    zoom: number;
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
            zoom: 11

        };

    }

    componentDidMount() {

        const { lng, lat, zoom } = this.state;


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
        this.map.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        }));
        this.map.loaded();
    }



    updateEvent = (data: stateComponent) => {
        this.setState({ ...data });
        this.map.loaded()
    }

    render() {
        const myArray = [1, 2, 3, 4, 5, 6];
        console.log(this.state);
        return (
            <Fragment>
                <HeaderComponent updateEvent={this.updateEvent} />
                <div >
                    <div ref={this.mapRef} className="absolute top right left bottom" />
                </div>
                <div className="content-card">
                    {
                        myArray.map(
                            (i: any) => (<CardComponent key={i} />)
                        )
                    }
                </div>

            </Fragment>
        );
    }

    componentWillUnmount() {
        this.map.on('load', () => {
            console.log(this.map.resize());
        });
    }
}

export default Home;