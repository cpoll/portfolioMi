import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as _ from 'lodash';

@Injectable()
export class GalleryService {

  public data: any = {};
  public selectedPhoto: any;
  public expanderVisible: boolean;
  public currentCategory: string;
  public photosInCategory: any[] = [];

  private dataUrl = 'assets/photos.json'

  constructor( private http: Http) { 
    this.http.get(this.dataUrl)
      .toPromise()
      .then((result) => {  
        this.data = result.json();
        console.log(this.data);
        this.switchCategory(this.data.categories[0]);
        this.selectedPhoto = this.data.photos;
        this.expanderVisible = false;
      });
  };

  switchCategory(category){
      this.currentCategory = category;
      this.photosInCategory = _.filter(this.data.photos, {category:this.currentCategory}); //$filter('filter')(this.data.photos, {category:this.currentCategory});
      console.log(this.photosInCategory);
  };

  switchPhoto(photo){
      this.selectedPhoto = photo;
      this.expanderVisible = true;
      //$rootScope.bodyOverflowHidden = true;
  };

  hideExpander(){
      this.expanderVisible = false;
      //$rootScope.bodyOverflowHidden = false;

      //Scroll to the last-seen photo.
      const hash = 'photo-' + this.getCurrentPhotoIndex();
      // $location.hash(hash); $anchorScroll(); isn't playing nicely, so we're doing the non-angular way for now
      // See also: http://stackoverflow.com/questions/29526187/anchorscroll-and-location-only-work-after-second-try
      document.getElementById(hash).scrollIntoView();
  };

  nextPhoto(){
      let newPhotoIndex = this.getCurrentPhotoIndex() + 1;
      if(newPhotoIndex >= this.photosInCategory.length) { 
          newPhotoIndex = 0; 
      }
      this.switchPhoto(this.photosInCategory[newPhotoIndex]);
  };

  previousPhoto(){
      let newPhotoIndex = this.getCurrentPhotoIndex() - 1;
      if(newPhotoIndex < 0) { 
          newPhotoIndex = this.photosInCategory.length - 1; 
      }
      this.switchPhoto(this.photosInCategory[newPhotoIndex]);
  };

  //Private
  getCurrentPhotoIndex() {
      return this.photosInCategory.indexOf(this.selectedPhoto);
  };
}
