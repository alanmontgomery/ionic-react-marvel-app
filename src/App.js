import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import ViewCharacter from './pages/ViewCharacter';
import Info from './pages/Info';

const App = () => {

	return (
		<IonApp>
			<IonReactRouter>
				<IonRouterOutlet>
					<Route path="/" exact={true}>
						<Redirect to="/home" />
					</Route>
					<Route path="/home" exact={true}>
						<Home />
					</Route>
					<Route path="/character/:id">
						<ViewCharacter />
					</Route>

					<Route path="/info">
						<Info />
					</Route>
				</IonRouterOutlet>
			</IonReactRouter>
		</IonApp>
	);
}

export default App;
