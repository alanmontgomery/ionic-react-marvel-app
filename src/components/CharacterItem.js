import { IonCol, IonIcon, IonImg, IonItem, IonLabel, IonSkeletonText } from "@ionic/react";
import { chevronForwardOutline } from "ionicons/icons";

import styles from "./CharacterItem.module.scss";

const CharacterItem = props => {

    const { details, load = false, grid = true } = props;
    const loadAmount = 20;

    if (!load) {
        return (

            <IonCol size={ grid ? "6" : "12" }>
                <IonItem detail={ false } routerLink={ `/character/${ details.id }` } lines="none" className={ styles.characterContainer }>
                    <IonImg src={ grid ? `${ details.thumbnail.path }/standard_fantastic.${ details.thumbnail.extension }` : `${ details.thumbnail.path }.${ details.thumbnail.extension }` } />
                    <div className={ styles.characterNameContainer }>
                        <IonLabel>{ details.name }</IonLabel>
                        <IonIcon icon={ chevronForwardOutline } />
                    </div>
                </IonItem>
            </IonCol>
        );
    } else {

        return (

            <>
                { Array.from({length: loadAmount }, (item, index) => {
                    
                    return (
                        <IonCol key={ `loading_${ index }`} size="6">
                            <IonItem lines="none" className={ styles.characterContainer }>
                                <IonSkeletonText animated style={{ width: "100%", height: "180px" }} />
                            </IonItem>
                        </IonCol>
                    );
                })}
            </>
        );
    }
}

export default CharacterItem;