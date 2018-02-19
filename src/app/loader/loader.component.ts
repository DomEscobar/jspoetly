import { Component, OnInit } from '@angular/core';
import { Loading } from '../util';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit
{
  isLoading = false;

  constructor()
  {
    Loading.onChange.subscribe(data =>
    {
      this.isLoading = data;
    });
  }

  ngOnInit()
  {
  }

}
