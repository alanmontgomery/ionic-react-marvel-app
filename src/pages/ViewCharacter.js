import { useEffect, useState } from 'react';
import {
  IonBackButton,
	IonButton,
  IonButtons,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonRow,
  IonSkeletonText,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from '@ionic/react';
import { arrowRedoOutline, heartOutline, personCircle, shareOutline } from 'ionicons/icons';
import { useHistory, useParams } from 'react-router';

import styles from "./ViewCharacter.module.scss";

const ViewCharacter = () => {
  
	const [ character, setCharacter ] = useState();
	const [ characterComics, setCharacterComics ] = useState([]);
	const history = useHistory();
  	const params = useParams();

	const getComic = async comicID => {

		var comicImageURL = false;
		const response = await fetch(`http://gateway.marvel.com/v1/public/comics/${ comicID }?ts=alan123&apikey=039a23cca3a39f118230cd8157818389&hash=299d6a11a57fba5daa00b4bebaa3ca74`);
		const data = await response.json();

		if (data) {

			if (data.data) {

				if (data.data.results.length > 0) {

					comicImageURL = data.data.results[0].thumbnail.path + "/portrait_incredible." + data.data.results[0].thumbnail.extension;
				}
			}
		}

		return comicImageURL;
	}

	const parseComics = async result => {

		const comics = result.comics.items;

		await comics.forEach(async comic => {

			const name = comic.name;
			const link = comic.resourceURI;

			const linkParts = link.split("/");
			const id = linkParts[linkParts.length -1];
			const image = await getComic(id);

			setCharacterComics(current => [ ...current, {
				id, name, image
			} ]);
		});
	}

	useIonViewWillEnter(async () => {

		const response = await fetch(`http://gateway.marvel.com/v1/public/characters/${ params.id }?ts=alan123&apikey=039a23cca3a39f118230cd8157818389&hash=299d6a11a57fba5daa00b4bebaa3ca74`);
		const data = await response.json();

		if (data) {

			if (data.data) {

				if (data.data.results) {

					const result = data.data.results[0];
					console.log(result);
					setCharacter(result);
					parseComics(result);
				}
			}
		}
	});

  return (
    <IonPage id="view-message-page">
      <IonHeader translucent>
        <IonToolbar>
			<IonTitle>{ character && character.name }</IonTitle>
          <IonButtons>
            <IonBackButton text="Characters"></IonBackButton>
			{/* <IonButton onClick={ () => history.push("/home") }>Back</IonButton> */}
          </IonButtons>

		  <IonButtons slot="end">
			  <IonButton color="dark">
				  <IonIcon icon={ heartOutline } />
			  </IonButton>
		  </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
		  { character ?
		  (
			<>

				<IonHeader collapse="condense">
					<IonToolbar>
						<IonItem lines="none">
							<IonImg src={ `${ character.thumbnail.path }.${ character.thumbnail.extension }` } />
							<div className={ styles.characterNameContainer }>
								<IonLabel>{ character.name }</IonLabel>
							</div>
						</IonItem>
					</IonToolbar>
				</IonHeader>

				<IonGrid>

					{ character.description &&
						<IonRow>
							<IonCol size="12">
								<p className="ion-text-justify">
									{ character.description }
								</p>
							</IonCol>
						</IonRow>
					}

					<IonRow className={ styles.characterStats }>
						<IonCol size="4">
							<div className={ styles.characterStat }>
								<IonCardSubtitle>{ character.comics.available }</IonCardSubtitle>
								<IonCardTitle>comics</IonCardTitle>
							</div>
						</IonCol>

						<IonCol size="4">
							<div className={ styles.characterStat }>
								<IonCardSubtitle>{ character.stories.available }</IonCardSubtitle>
								<IonCardTitle>stories</IonCardTitle>
							</div>
						</IonCol>

						<IonCol size="4">
							<div className={ styles.characterStat }>
								<IonCardSubtitle>{ character.series.available }</IonCardSubtitle>
								<IonCardTitle>series</IonCardTitle>
							</div>
						</IonCol>
					</IonRow>

					{ (character.urls) && 
						<>
							{ character.urls[1] &&
								<IonRow>
									<IonCol size="12">
										<a href={ character.urls[1].url } target="_blank" rel="noreferrer" className="non-link">
											<IonButton color="danger" expand="full">
												View full profile on Marvel
												<IonIcon slot="end" icon={ arrowRedoOutline } />
											</IonButton>
										</a>
									</IonCol>
								</IonRow>
							}

							{ character.urls[2] &&
								<IonRow>
									<IonCol size="12">
										<a href={ character.urls[2].url } target="_blank" rel="noreferrer" className="non-link">
											<IonButton color="dark" expand="full">
												View all comics on Marvel
												<IonIcon slot="end" icon={ arrowRedoOutline } />
											</IonButton>
										</a>
									</IonCol>
								</IonRow>
							}
						</>
					}

					{ characterComics &&

						<>

							<IonRow className="ion-text-center ion-padding">
								<IonCol size="12">
									<IonCardSubtitle color="dark">Showing 20 comics...</IonCardSubtitle>
								</IonCol>
							</IonRow>
							<IonRow>
								{ characterComics.map((comic, index) => {

									if (comic.image && comic.name) {
										
										return (

											<IonCol key={ `${ character.name }_comic_${ index }` } size="6">
												<IonItem lines="none">
													<IonImg src={ comic.image } />
													<div className={ styles.characterNameContainer }>
														<IonLabel>{ comic.name }</IonLabel>
													</div>
												</IonItem>
											</IonCol>
										);
									}
								})}
							</IonRow>
						</>
					}


				</IonGrid>
			</>
		  )
		  :
		  	<IonSkeletonText animated style={{ width: "100%", height: "100vh" }} />
		  }
      </IonContent>
    </IonPage>
  );
}

export default ViewCharacter;
