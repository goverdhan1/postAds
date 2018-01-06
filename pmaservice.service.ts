import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http, Response} from  '@angular/http';
import { Category } from '../models/Category';
import { Advertisement } from '../models/Advertisement';

@Injectable()
export class PmaserviceService {

  categoriesCollection: AngularFirestoreCollection<Category>;
  categories: Observable<Category[]>;
  advertisementCollection: AngularFirestoreCollection<Advertisement>;
  ad: Advertisement;
  ads: Observable<Advertisement[]>;
  ads_new: Observable<Advertisement[]>;

  constructor(private afs: AngularFirestore, private http:Http) { 

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

  getSliderImages() {
    let sliderImages = this.afs.collection('SliderImages').snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data();
        return data;
      });
    }); 
    
    return sliderImages;
  }

  getPopularAds() {
    let popAds = this.afs.collection('Ads', ref => ref.orderBy('views', 'desc').limit(5)).snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data;
      });
    });    
    return popAds;
  }  

  getAdvertisement(id: any) {
    this.ads_new = this.afs.collection('Ads', ref => ref.where('id', '==', id)).snapshotChanges().map(changes => {     
      return changes.map(a => {
        const data = a.payload.doc.data() as Advertisement;
        data.id = a.payload.doc.id;        
        return data;
      });
    });

    return this.ads_new;
  }  

  getAdvertisement_New(id: any) {
    this.ads_new = this.afs.collection('Ads', ref => ref.where('sid', '==', id)).snapshotChanges().map(changes => {     
      return changes.map(a => {
        const data = a.payload.doc.data() as Advertisement;
        data.id = a.payload.doc.id;        
        return data;
      });
    });

    return this.ads_new;
  } 
  
  getNewsPapers() {
    let newPapers = this.afs.collection('NewsPapers', ref => ref.where('status', '==', 'Active')).snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data;
      });
    });    
    return newPapers;    
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

  getChatHeader(adId){
    this.afs.collection('Ads/'+adId).snapshotChanges().subscribe(res=>{
      
    },err=>{

    },()=>{

    });
  }

  getAdNewsPapersInfo(adId) {
    let newPaperEditions = this.afs.collection(
                              'NewsPaper-Ads', 
                              ref => ref.where('adId', '==', adId)
                              //.where('status', '==', 'Active')
                            )
                            .snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data;
      });
    });    
    return newPaperEditions;
  }

  isUserFavouriteAd(uid, adid) {
    let favourites = this.afs.collection(
      'Favourites', 
      ref => ref.where('adId', '==', adid).where('uid', '==', uid)
    )
    .snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data;
      });
    });    
    return favourites;
  }

  getUserFavourites(uid) {
    let favourites = this.afs.collection('Favourites', ref => ref.where('uid', '==', uid)).snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data;
      });
    });    
    return favourites;
  }

  getGeoLocation(){
    return this.http.get('http://ip-api.com/json').map((response:Response) => response.json());
  }  

}