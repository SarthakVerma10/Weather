import Dashboard from '../Components/Dashboard';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import LocationDetails from '../Components/LocationDetails';


const AppRouter = () => {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route path="/location/:woeid" component={LocationDetails} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default AppRouter;