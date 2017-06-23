import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../services/gallery.service';

@Component({
  selector: 'app-photo-expander',
  templateUrl: './photo-expander.component.html',
  styleUrls: ['./photo-expander.component.css']
})
export class PhotoExpanderComponent implements OnInit {

  constructor(
    public galleryService: GalleryService
  ) { }

  public ngOnInit() {
    /* Empty */
  }

}
