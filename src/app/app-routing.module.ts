import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostAdsComponent } from './post-ads/post-ads.component';
import { AdTypeComponent} from "./post-ads/ad-type/ad-type.component";

const routes: Routes = [
  { path: '', redirectTo: '/postads', pathMatch: 'full' },
  { path: 'postads', component: PostAdsComponent },
  { path: 'adtype', component: AdTypeComponent }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
