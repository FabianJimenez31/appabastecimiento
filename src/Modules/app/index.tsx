import React from 'react';
import Template from 'src/Modules/template';
import Router from 'src/routers';

 const App = () => {
   
    return (
        <Router>{
            (content: any, routeProps: any) => {
                return (<Template {...routeProps}>{content}</Template>)
            }
        }
        </Router>
    );
}

export default App;