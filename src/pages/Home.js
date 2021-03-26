import { useEffect, useState } from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonPage, IonRow, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import './Home.css';
import { expandOutline, gridOutline, searchOutline } from 'ionicons/icons';
import CharacterItem from '../components/CharacterItem';

const Home = () => {

	const [ grid, setGrid ] = useState(true);
	const [ characters, setCharacters ] = useState([]);
	const [ amountLoaded, setAmountLoaded ] = useState(20);

	useEffect(() => {

		const getCharacters = async () => {

			const response = await fetch("https://gateway.marvel.com/v1/public/characters?ts=alan123&apikey=039a23cca3a39f118230cd8157818389&hash=299d6a11a57fba5daa00b4bebaa3ca74&limit=20&orderBy=-modified");
			const data = await response.json();

			if (data) {

				if (data.data) {

					if (data.data.results) {

						
					}
				}
			}

			const results = data.data.results;
			console.log(results);
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
		const response = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=alan123&apikey=039a23cca3a39f118230cd8157818389&hash=299d6a11a57fba5daa00b4bebaa3ca74&limit=20&offset=${ amountLoaded }&orderBy=-modified`);
		const data = await response.json();
		const results = data.data.results;

		//	Set the characters by adding the new results to the current
		//	Increment the amount loaded by 20 for the next iteration
		//	Complete the scroll action
		setCharacters(prevResults => [ ...prevResults, ...results ]);
		setAmountLoaded(prevAmount => (prevAmount + 20));
		e.target.complete();
	}

	return (
		<IonPage id="home-page">
			<IonHeader>
				<IonToolbar>
					<IonTitle>Marvel Characters</IonTitle>
					<IonButtons slot="end">
						<IonButton color="dark">
							<IonIcon icon={ searchOutline } />
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
		</IonPage>
	);
};

export default Home;