import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatStepperModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';


import { environment } from '../environments/environment';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PostAdsComponent } from './post-ads/post-ads.component';

@NgModule({
  declarations: [
    AppComponent,
    PostAdsComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, MatButtonModule, MatCheckboxModule, MatStepperModule, MatFormFieldModule,  ReactiveFormsModule, FormsModule, MatInputModule, AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
