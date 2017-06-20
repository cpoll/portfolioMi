import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PhotosComponent } from './photos/photos.component';

@NgModule({
  declarations: [
    AppComponent,
    PhotosComponent
  ],
  imports: [
    BrowserModule,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
