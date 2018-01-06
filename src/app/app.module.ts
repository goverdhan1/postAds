import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatStepperModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatSelectModule, MatListModule, MatExpansionModule, MatIconModule, MatToolbarModule, MatDatepickerModule, MatNativeDateModule} from '@angular/material';

import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { environment } from '../environments/environment';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';


import { AppComponent } from './app.component';
import { PostAdsComponent } from './post-ads/post-ads.component';
import { AppRoutingModule } from './app-routing.module';
import { AdTypeComponent } from './post-ads/ad-type/ad-type.component';
import { DisplayAdsComponent } from './display-ads/display-ads.component';


@NgModule({
  declarations: [
    AppComponent,
    PostAdsComponent,
    AdTypeComponent,
    DisplayAdsComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, MatButtonModule, MatCheckboxModule, MatStepperModule, ReactiveFormsModule, FormsModule, MatInputModule, MatRadioModule, MatExpansionModule, MatListModule, MatFormFieldModule, MatSelectModule, MatIconModule, FlexLayoutModule, AngularFireModule.initializeApp(environment.firebase), AngularFirestoreModule, AppRoutingModule, MatToolbarModule, MatDatepickerModule, MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
