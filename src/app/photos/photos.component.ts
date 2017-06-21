import 'rxjs/add/operator/map';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { GalleryService } from '../services/gallery.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  public category: string;
  public categories: string[] = ["animals", "people", "travel"];

  constructor(
    private route: ActivatedRoute,
    private galleryService: GalleryService
  ) { }

  ngOnInit() {
    this.route.params
      .map(params => params['category'])
      .subscribe((category) => {
        this.setCategory(category);
      })

    console.log(this.galleryService);
  }

  setCategory(category: string) {
    this.galleryService.switchCategory(category);
    this.category = category;
  }
}
