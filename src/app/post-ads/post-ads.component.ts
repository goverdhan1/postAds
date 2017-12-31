import {Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'app-post-ads',
  templateUrl: './post-ads.component.html',
  styleUrls: ['./post-ads.component.css']
})
export class PostAdsComponent implements OnInit {

isLinear = false;
firstFormGroup: FormGroup;
secondFormGroup: FormGroup;
items: Observable<any[]>;

constructor(private _formBuilder: FormBuilder, db: AngularFirestore) {
    this.items = db.collection('items').valueChanges();
 }

ngOnInit() {
  this.firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required]
  });
  this.secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required]
  });
}

}
