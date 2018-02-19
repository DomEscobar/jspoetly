import { Component } from '@angular/core';
import { Message } from '../util';

@Component({
  selector: 'app-infobox',
  templateUrl: './infobox.component.html',
  styleUrls: ['./infobox.component.css']
})
export class InfoboxComponent
{
  message = '';

  constructor()
  {
    Message.onChange.subscribe(data =>
    {
      this.message = data;
    });
  }

  hide()
  {
    Message.hide();
  }

}
