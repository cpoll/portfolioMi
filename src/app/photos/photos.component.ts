import 'rxjs/add/operator/map';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { GalleryService } from '../services/gallery.service';
import { PhotoExpanderComponent } from '../photo-expander/photo-expander.component';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css'],
})
export class PhotosComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public galleryService: GalleryService
  ) { }

  ngOnInit() {
    this.route.params
      .map(params => params['category'])
      .subscribe((category) => {
        this.galleryService.switchCategory(category);
      })
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
