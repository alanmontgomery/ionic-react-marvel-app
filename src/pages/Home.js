import { useEffect, useState } from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonPage, IonRow, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import './Home.css';
import { addOutline, expandOutline, gridOutline, informationCircleOutline, searchOutline } from 'ionicons/icons';
import CharacterItem from '../components/CharacterItem';

const Home = () => {

	const [ grid, setGrid ] = useState(true);
	const [ characters, setCharacters ] = useState([]);
	const [ amountLoaded, setAmountLoaded ] = useState(20);
	const [ showToast, setShowToast ] = useState({ show: false, message: "" });

	useEffect(() => {
    
		const buttInstall = document.getElementById('buttInstall');
		window.addEventListener('beforeinstallprompt', (event) => {
			
			console.log('👍', 'beforeinstallprompt', event);
			
			//	Save the event so it can be triggered later.
			window.deferredPrompt = event;
			buttInstall.classList.toggle('hidden', false);
		});
	
		window.addEventListener('appinstalled', (event) => {
			
			console.log('👍', 'appinstalled', event);
			// Clear the deferredPrompt so it can be garbage collected
			window.deferredPrompt = null;
		});
	}, []);

	useEffect(() => {

		const getCharacters = async () => {

			const response = await fetch("https://gateway.marvel.com/v1/public/characters?ts=alan12345&apikey=e5103c9197bf5466f65433de29139bf9&hash=13b1d704e92de2a50ae29777722bdd75&limit=20&orderBy=-modified");
			const data = await response.json();

			const results = data.data.results;
			setCharacters(results);
		}

		getCharacters();
	}, []);

	const fetchMore = async (e) => {

		//	Fetch more characters
		//	How?
		//	Lets limit it by 20, and offset it by the amount loaded already
		//	E.g. 20, 40, 60 just like pagination :)
		//	Get the response into json
		const response = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=alan12345&apikey=e5103c9197bf5466f65433de29139bf9&hash=13b1d704e92de2a50ae29777722bdd75&limit=20&offset=${ amountLoaded }&orderBy=-modified`);
		const data = await response.json();
		const results = data.data.results;

		//	Set the characters by adding the new results to the current
		//	Increment the amount loaded by 20 for the next iteration
		//	Complete the scroll action
		setCharacters(prevResults => [ ...prevResults, ...results ]);
		setAmountLoaded(prevAmount => (prevAmount + 20));
		e.target.complete();
	}

	const addToHomeScreen = async () => {

		const buttInstall = document.getElementById('buttInstall');

		console.log('👍', 'buttInstall-clicked');
		const promptEvent = window.deferredPrompt;
		
		if (!promptEvent) {
			
			// The deferred prompt isn't available.
			return;
		}

		// Show the install prompt.
		promptEvent.prompt();
		
		// Log the result
		const result = await promptEvent.userChoice;
		console.log('👍', 'userChoice', result);
		
		// Reset the deferred prompt variable, since
		// prompt() can only be called once.
		window.deferredPrompt = null;

		// Hide the install button.
		buttInstall.classList.toggle('hidden', true);
	}

	return (
		<IonPage id="home-page">
			<IonHeader>
				<IonToolbar>
					<IonTitle>Marvel Characters</IonTitle>

					<IonButtons slot="start">
						<IonButton color="dark" routerLink="/info">
							<IonIcon icon={ informationCircleOutline } />
						</IonButton>
					</IonButtons>
					<IonButtons slot="end">
						<IonButton color="dark" onClick={ () => setShowToast({ show: true, message: "We could easily add a search button here to search characters." }) }>
							<IonIcon icon={ searchOutline } />
						</IonButton>

						<IonButton id="buttInstall" color="danger" fill="solid" size="small" className="add-button hidden" onClick={ () => addToHomeScreen() }>
							<IonIcon icon={ addOutline } />&nbsp;&nbsp;Install App
						</IonButton>

						<IonButton color="danger" onClick={ () => setGrid(grid => !grid) }>
							<IonIcon icon={ grid ? expandOutline : gridOutline } />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Marvel Characters</IonTitle>
					</IonToolbar>
				</IonHeader>

				<IonRow>
					{ characters.length > 0 ? 
					
						characters.map((character, index) => {

							if (!character.thumbnail.path.includes("image_not_available")) {
								return (
									<CharacterItem key={ `character_${ index }` } grid={ grid } details={ character } />
								);
							} else {

								return null;
							}
						}) 
					: <CharacterItem load={ true } /> }
				</IonRow>

				<IonInfiniteScroll threshold="100px" onIonInfinite={ fetchMore }>
					<IonInfiniteScrollContent loadingSpinner="bubbles" loadingText="Getting more super heroes...">
					</IonInfiniteScrollContent>
				</IonInfiniteScroll>
			</IonContent>

			<IonToast isOpen={ showToast.show } onDidDismiss={ () => setShowToast({ show: false, message: "" }) } message={ showToast.message } duration={ 3500 } color="danger" />
		</IonPage>
	);
};

export default Home;