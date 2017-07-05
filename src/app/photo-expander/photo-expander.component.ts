import { Component, OnInit, HostListener } from '@angular/core';
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

    @HostListener('document:keydown', ['$event'])
    public handleKeyboardEvent(event: KeyboardEvent) {
        switch (event.key) {
            case 'ArrowLeft':
            case 'a':
            case 'h': {
                this.galleryService.previousPhoto();
                break;
            }
            case 'ArrowRight':
            case 'd':
            case 'l': {
                this.galleryService.nextPhoto();
                break;
            }
            case 'Escape':
            case 'Enter': {
                this.galleryService.hideExpander();
                break;
            }
        }
    }

}
