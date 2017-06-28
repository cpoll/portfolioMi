import 'rxjs/add/operator/map';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { AngularMasonry } from 'angular2-masonry';

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

  public window = window;
  @ViewChild(AngularMasonry) public child: AngularMasonry;

  public ngOnInit() {
    this.route.params
      .map(params => params.category)
      .subscribe((category) => {
        this.galleryService.switchCategory(category);
      });
  }

  public scrollToTop() {
    window.scrollTo(0, 0);
  }

  public refreshMasonry() {
      // A bit of a hack...
      // Masonry doesn't allow both preserve-order and [useImagesLoaded]="true"
      // furthermore, if you don't use [useImagesLoaded], and the starting div height is 0
      // because photos aren't loaded yet, so they don't size the div, the masonry doesn't
      // rearrange itself once the height changes.
      // So we're hacking it by making masonry recalculate every time an image loads.
    this.child.layout();
  }
}
