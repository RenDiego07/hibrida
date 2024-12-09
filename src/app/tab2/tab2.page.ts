import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent,

  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonSelect, IonSelectOption, IonTextarea,IonButton,
  IonList, IonItem, IonLabel,


 } from '@ionic/angular/standalone';

 import { ProviderService } from '../services/provider.service';

import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { ReactiveFormsModule,  FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent,  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonSelect, IonSelectOption, IonTextarea,IonButton,
    IonList, IonItem, IonLabel,ReactiveFormsModule]
})
export class Tab2Page {
  

    /* Arreglo con datos locales */
    dataList: any[] = [];
       /* Nombre de la colección */
       collectionName = 'reviews';

  myForm: FormGroup = new FormGroup({
    score: new FormControl("", Validators.required),
    opinion: new FormControl("", Validators.required)
  });
   /* Inyecte la dependencia a Firestore */
  constructor(private providerService: ProviderService) {}

        /* El método onSubmit para enviar los datos del formulario mediante el servicio */
        onSubmit() {
          
          this.providerService.createDocument(this.collectionName, this.myForm.value).then(() => {
              this.myForm.reset()
          });
        }

           /* Al inicializar, carga los datos  */
     ngOnInit() {
      this.loadData();
  }


  loadData() {
    this.providerService.readCollection(this.collectionName).subscribe((data) => {
        this.dataList = data;
    });
  }
}
