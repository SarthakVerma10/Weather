import React from 'react';
import { Link } from 'react-router-dom';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({result: [], no_result: ''})
    }

    get_places = async(url) => {
        const response = await fetch(url)
        return response.json();
    }
    
    onSubmit = (e) => {
        e.preventDefault();

        const query = document.getElementById("place").value;
        const url = "https://www.metaweather.com/api/location/search/?query=" + query

        this.get_places(url).then(data => {
            if (data.length === 0) {
                this.setState({no_result: 'Cannot find this location'})
            }
            console.log('result: ', data);
            this.setState({result: data})
            console.log(this.state.result);
        })
        
    }

    render() {
        return (
            <div className="dashboard-container">
                <h2>Weather</h2>
                <form onSubmit={this.onSubmit}>
                    <input id="place" type="text" placeholder="Enter a place" />
                    <button id="button">Submit</button>
                </form>
                <div className="results-container">
                <ul className="results">

                {this.state.result.length > 0 ?
                        
                        this.state.result.map((each) => {
                        return <li><Link key={each.woeid} to={"/location/" + each.woeid}>{each.title}</Link></li>
                    })
                    :
                        <p>{this.state.no_result}</p>
                }

                </ul>
                </div>
            </div>
        )
    }
}

export default Dashboard;