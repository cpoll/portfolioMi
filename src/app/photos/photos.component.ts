import 'rxjs/add/operator/map';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  public category: string;
  public categories: string[] = ["animals", "people", "travel"];

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params
      .map(params => params['category'])
      .subscribe((category) => {
        this.setCategory(category);
      })
  }

  setCategory(category: string) {
    this.category = category;
  }
}
