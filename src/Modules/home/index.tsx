import React, { Component, Fragment } from 'react';
import { HeaderComponent } from 'src/Components';
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

    constructor(props: any) {
        super(props);
        this.mapRef = React.createRef();
        this.state = {
            lng: 5,
            lat: 34,
            zoom: 2

        };
    }

    componentDidMount() {
        const { lng, lat, zoom } = this.state;
        

        const map = new mapboxgl.Map({
            container: this.mapRef.current,
            style: 'mapbox://styles/mapbox/streets-v9',
            center: [lng, lat],
            zoom
        });

        map.on('move', () => {
            const { lng, lat } = map.getCenter();

            this.setState({
                lng: Number(lng.toFixed(4)),
                lat: Number(lat.toFixed(4)),
                zoom: Number(map.getZoom().toFixed(2))
            });
        });
    }

    render() {
        return (
            <Fragment>
                <HeaderComponent />
                <div style={{height:'70vh'}}>
                    <div ref={this.mapRef} className="absolute top right left bottom" />
                </div>
            </Fragment>
        );
    }
}

export default Home;