import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, NgZone, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { Advertisement } from '../../models/Advertisement';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { UploadFileService } from '../../services/file-upload.service';
import { PmaserviceService } from '../../services/pmaservice.service';
import { FileUpload } from '../../models/fileupload';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-auto-additionals',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './auto-additionals.component.html',
  styleUrls: ['./auto-additionals.component.css']
})

export class AutoAdditionalsComponent implements OnInit, AfterViewInit {

  @Input() ad: any;
  @Input() subCategory: any;
  @Input() selectedFiles: Array<FileList>;
  @Output() adEvent = new EventEmitter<any>();
  @Output() imagesEvent = new EventEmitter<any>();
  @Output() backEvent = new EventEmitter<string>();

  states = [
    {value: 'Andhra Pradesh', viewValue: 'Andhra Pradesh'},
    {value: 'Telangana', viewValue: 'Telangana'}
  ];

  cities = [
    {value: 'Hyderabad', viewValue: 'Hyderabad'},
    {value: 'Vijayawada', viewValue: 'Vijayawada'}
  ];  

  fuelTypes = [
    {value: 'Petrol', viewValue: 'Petrol'},
    {value: 'Diesel', viewValue: 'Diesel'},
    {value: 'CNG', viewValue: 'CNG'},
    {value: 'Electrical', viewValue: 'Electrical'},
  ]; 
  
  title: string;
  fuelType: string; 
  transmission: string;
  kilometers: number;
  price: number;
  city: string;
  state: string;
  contact: string;
  type: string;

  /* Images */
  currentFileUpload: FileUpload;
  progress: {percentage: number} = {percentage: 0}; 
  urls: Array<string> = new Array<string>();

  /* places auto complete */
  public userSettings: any = {
    inputPlaceholderText: 'Vehicle Location',
    showSearchButton:false,
    showRecentSearch: false,
    geoCountryRestriction: ['in']
  }; 

  location: any = {
    sublocality_level_1: null,
    sublocality_level_2: null,
    locality: null,
    administrative_area_level_2: null,
    administrative_area_level_1: null,
    country: null,
    postal_code: null,
    geoCoor: {latitude:null, longitude:null},
    desc: null
  }; 

  /* Form validators */
  titleFC = new FormControl('test', [Validators.required]);
  subCategoryFC = new FormControl('', [Validators.required]);
  fuelTypeFC = new FormControl('', [Validators.required]);
  contactFC = new FormControl('', [Validators.required]);  
  matcher = new MyErrorStateMatcher();
 
  constructor(private uploadService: UploadFileService, private pmaService: PmaserviceService) {

  }

  ngOnInit() {
    this.transmission = 'Manual'; 
    if(this.selectedFiles.length > 0) {
      for(var i=0; i<this.selectedFiles.length; i++) {
        var reader = new FileReader();
        reader.onload = (event:any) => {
          this.urls.push(event.target.result);
        }
        reader.readAsDataURL(this.selectedFiles[i][0]);
      }      
    }
      
  }

  ngAfterViewInit() {
    document.getElementById('search_places').nodeValue = 'kukatpally';   
    (<HTMLInputElement>document.getElementById('search_places')).value = '123';
  }

  autoCompleteCallback1(selectedData:any) {
    if(selectedData.response) {
      this.location.desc = selectedData.data.description; 
      for(var i=0; i<selectedData.data.address_components.length; i++) {     
        if(this.location[selectedData.data.address_components[i].types[0]] == null) {
          this.location[selectedData.data.address_components[i].types[0]] = selectedData.data.address_components[i]['long_name'];
        }
      }
    }
    else {

    }
  }  

  processBasicInfo() {
    if(this.titleFC.status == 'VALID' && this.subCategoryFC.status == 'VALID' && this.fuelTypeFC.status == 'VALID') {
      this.ad.location = this.location;
      console.log(this.ad);
      this.adEvent.emit(this.ad);
      this.imagesEvent.emit(this.selectedFiles);
    }
  }  

  selectFile(event) {
    this.selectedFiles.push(event.target.files);
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.urls.push(event.target.result);
    }
    reader.readAsDataURL(event.target.files[0]);
  }

  goBack() {
    this.backEvent.emit('select-ad-type');
  }

}
