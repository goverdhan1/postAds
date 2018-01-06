import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-display-ads',
  templateUrl: './display-ads.component.html',
  styleUrls: ['./display-ads.component.scss']
})
export class DisplayAdsComponent implements OnInit {

uniqueAdDigitalizeId;

  constructor(private afs: AngularFirestore) {
    this.uniqueAdDigitalizeId = afs.collection('Ads', ref => ref.where('uniqueAdDigitalizeId', '==', 'large'))
  }

  getAds() {
    this.categories = this.afs.collection('Ads').snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data;
      });
    });
    return this.categories;
  }


  ngOnInit() {
  }

}
