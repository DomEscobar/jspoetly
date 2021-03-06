import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { EventEmitter } from '@angular/core';

export class Loading
{
  private static isLoading = false;
  public static onChange: EventEmitter<boolean> = new EventEmitter();

  public static getLoading(): boolean
  {
    return Loading.isLoading;
  }

  public static show()
  {
    Loading.isLoading = true;
    Loading.onChange.emit(true);
  }

  public static hide()
  {
    Loading.isLoading = false;
    Loading.onChange.emit(false);
  }
}

export class Message
{
  private static message = '';
  public static onChange: EventEmitter<string> = new EventEmitter();

  public static show(message)
  {
    this.message = message;
    Message.onChange.emit(this.message);
  }

  public static hide()
  {
    this.message = null;
    Message.onChange.emit(this.message);
  }
}

