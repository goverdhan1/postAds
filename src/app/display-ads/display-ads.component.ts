import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-display-ads',
  templateUrl: './display-ads.component.html',
  styleUrls: ['./display-ads.component.scss']
})
export class DisplayAdsComponent implements OnInit {

uniqueAdDigitalizeId;
ads;
private sub;
id;

  constructor(private afs: AngularFirestore, private route:ActivatedRoute ) {


    this.sub = this.route.params.subscribe(params => {
          this.id = params['id']; // (+) converts string 'id' to a number

          // In a real app: dispatch action to load the details here.
       });

    console.log(this.route.params);
    this.uniqueAdDigitalizeId = afs.collection('Ads', ref => ref.where('uniqueAdDigitalizeId', '==', this.id))
  }

  getAds() {
    this.ads = this.afs.collection('Ads').snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data;
      });
    });
    return this.ads;
  }


  ngOnInit() {
  }

}
