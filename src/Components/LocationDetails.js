import React from 'react';

class LocationDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {temperature: [], title: ''}
    }

    render() {
        const url = "https://www.metaweather.com/api/location/";
        const getTemperature = async() => {
            const response = await fetch(url + this.props.match.params.woeid);
            return response.json();
        }

        getTemperature().then(data => {
            this.setState({temperature: data.consolidated_weather, title: data.title + "'s Weather"})
        })
        
        return (
            <div className="detail-weather">
                <h2>{this.state.title}</h2>
                {this.state.temperature.length > 0 ? 
                    <div>
                    <figure>
                    <img id="hero-image" src={"https://www.metaweather.com/static/img/weather/" + this.state.temperature[0].weather_state_abbr + ".svg"} />
                    <figcaption><strong>{this.state.temperature[0].weather_state_name} <br></br>{this.state.temperature[0].the_temp} &#176; C</strong></figcaption>
                    </figure>
                    </div>
                :
                console.log('waiting')}
                <div className="weather-table">
                {this.state.temperature.length > 0 ?
                    <table>
                    <tr>
                        <th>Date</th>
                        <th>Weather</th>
                        <th>Temp</th>
                    </tr>
                    {this.state.temperature.map((each) => {
                        return <tr>
                        <td>{each.applicable_date} </td>
                        <td><img 
                        src={"https://www.metaweather.com/static/img/weather/" + each.weather_state_abbr + ".svg"} 
                        style={{width:'20px', height:'20px'}}/>
                        {each.weather_state_name}
                        </td>
                        <td>{each.the_temp.toString().slice(0, 4)} &#176; C</td>
                        </tr>
                    })}
                    </table>
                    :
                    <p></p>
                 }
                </div>
            </div>
        )
    }
}

export default LocationDetails;