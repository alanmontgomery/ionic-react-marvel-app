import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonPage, IonRow, IonSkeletonText, IonTitle, IonToolbar } from '@ionic/react';
import { arrowRedoOutline, heartOutline } from 'ionicons/icons';
import styles from "./ViewCharacter.module.scss";

const Info = () => {

	const profile = {
		
		name: "Alan Montgomery",
		bio: "My name is Alan. I’m a Mobile Team Lead and Senior Developer and have built numerous production, real world mobile apps for local government authorities. I have a real passion and love for sharing my knowledge and expertise with developers wanting to learn and get better at using certain technologies.",
		avatar: "/assets/alan.jpg",
		codeLink: "https://github.com/alanmontgomery/ionic-react-marvel-app",
		links: [
			{
				name: "Twitter",
				url: "https://twitter.com/93alan"
			}
		],
	}
  	return (
		<IonPage id="view-message-page">
			<IonHeader translucent>
				<IonToolbar>
				<IonButtons>
						<IonBackButton text="Characters"></IonBackButton>
				</IonButtons>

				{ navigator.platform.match(/iPhone|iPod|iPad/) && <IonTitle>{ profile.name }</IonTitle> }
				</IonToolbar>
			</IonHeader>

			<IonContent fullscreen>
				{ profile ?
				(
					<>
						<IonItem lines="none">
							<IonImg src={ profile.avatar } />
							<div className={ styles.characterNameContainer }>
								<IonLabel>{ profile.name }</IonLabel>
							</div>
						</IonItem>

						<IonGrid>
							<IonRow>
								<IonCol size="12">
									<p className="ion-text-justify">
										{ profile.bio }
									</p>
								</IonCol>
							</IonRow>

							<IonRow>
								<IonCol size="12">
									<a href={ profile.links[0].url } target="_blank" rel="noreferrer" className="non-link">
										<IonButton color="secondary" expand="full">
											Lets connect on Twitter
											<IonIcon slot="end" icon={ arrowRedoOutline } />
										</IonButton>
									</a>
								</IonCol>
							</IonRow>

							<IonRow>
								<IonCol size="12">
									<a href={ profile.codeLink } target="_blank" rel="noreferrer" className="non-link">
										<IonButton color="dark" expand="full">
											Source code for this app
											<IonIcon slot="end" icon={ arrowRedoOutline } />
										</IonButton>
									</a>
								</IonCol>
							</IonRow>
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

export default Info;