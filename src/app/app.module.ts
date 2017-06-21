import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PhotosComponent } from './photos/photos.component';
import { GalleryService } from './services/gallery.service';

@NgModule({
  declarations: [
    AppComponent,
    PhotosComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'photo/:category',
        component: PhotosComponent
      },
      {
        path: '',
        redirectTo: '/photo/animals',
        pathMatch: 'full'
      }
    ])
  ],
  exports: [RouterModule],
  providers: [GalleryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
