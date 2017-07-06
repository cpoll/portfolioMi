import { TestBed, inject } from '@angular/core/testing';

import { GalleryService } from './gallery.service';

describe('GalleryService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
        providers: [GalleryService]
        });
    });

    xit('should be created', inject([GalleryService], (service: GalleryService) => {
        expect(service).toBeTruthy();
    }));
});
