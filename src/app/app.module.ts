import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PhotosComponent } from './photos/photos.component';
import { GalleryService } from './services/gallery.service';

import { MasonryModule } from 'angular2-masonry';
import { PhotoExpanderComponent } from './photo-expander/photo-expander.component';

@NgModule({
  declarations: [
    AppComponent,
    PhotosComponent,
    PhotoExpanderComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MasonryModule,
    RouterModule.forRoot([
      {
        path: 'photo/:category',
        component: PhotosComponent
      },
      {
        path: '',
        redirectTo: 'photo/animals',
        pathMatch: 'full'
      }
    ])
  ],
  exports: [RouterModule, PhotoExpanderComponent],
  providers: [GalleryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
