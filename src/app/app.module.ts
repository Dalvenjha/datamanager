import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManageComponent } from './manage/manage.component';
import { RequestComponent } from './request/request.component';
import { ReviewComponent } from './review/review.component';
import { EditComponent } from './edit/edit.component';

import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { FirebaseService } from './firebase.service';

@NgModule({
  declarations: [
    AppComponent,
    ManageComponent,
    RequestComponent,
    ReviewComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [FirebaseService,AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
