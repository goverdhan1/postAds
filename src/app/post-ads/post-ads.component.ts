import {Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { PostAdsService } from './post-ads.service';
import { Category } from '../models/Category';
import { UUID } from 'angular2-uuid';
import {Router} from '@angular/router';

@Component({
  selector: 'app-post-ads',
  templateUrl: './post-ads.component.html',
  styleUrls: ['./post-ads.component.scss']
})
export class PostAdsComponent implements OnInit {
digitalizeAdsForm: FormGroup;
digitalize:any={};
categories;
subCat;

  constructor(private _formBuilder: FormBuilder, private afs: AngularFirestore, private router: Router;) {
    this.categories = this.getCategories();
  }

  getCategories() {
    this.categories = this.afs.collection('Categories').snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Category;
        data.id = a.payload.doc.id;
        return data;
      });
    });
    return this.categories;
  }

  getSubCategories(id: any) {
    let SubCategories = this.afs.collection('Categories/' + id + '/SubCategories').snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data;
      });
    });
    return SubCategories;
  }

  getEditionsByPaper(paperId: string) {
    let newPaperEditions = this.afs.collection('NewsPaperEditions', ref => ref.where('npId', '==', paperId)).snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data;
      });
    });
    return newPaperEditions;
  }

  loadSubCategories(eve, id: any) {
    console.log(id);
    this.subCat=this.getSubCategories(id);
    console.log("sub", this.subCat);
  }
  digitalizeAds(){
    if(this.digitalizeAdsForm.valid){
      this.digitalize.uniqueAdDigitalizeId = UUID.UUID();
      console.log(this.digitalize);
//      this.afs.collection("Ads").add({"uniqueAdDigitalizeId":this.digitalize.uniqueAdDigitalizeId});
//      this.afs.collection("NewsPaper-Ads").add(this.digitalize);
      this.router.navigate(['/', this.digitalize.uniqueAdDigitalizeId]);
    }
  }

ngOnInit() {
  this.digitalizeAdsForm = this._formBuilder.group({
    "RONumber": [null, Validators.required],
    "Phone":[null, Validators.required],
    "Category":[null, Validators.required],
    "SubCategory":[null, Validators.required],
    "PublishOn":[null, Validators.required]

  });
}


}
