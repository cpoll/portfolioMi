import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoExpanderComponent } from './photo-expander.component';
import { GalleryService } from '../services/gallery.service';

describe('PhotoExpanderComponent', () => {
  let component: PhotoExpanderComponent;
  let fixture: ComponentFixture<PhotoExpanderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoExpanderComponent ],
      providers: [
        { provide: GalleryService, useValue: {} } // TODO: create mock class
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoExpanderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
