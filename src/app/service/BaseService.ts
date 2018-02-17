import { Component, Injectable, Injector } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';

declare var unescape: any;

export class BaseService
{
  protected http: Http;
  protected readonly APIURL = 'https://cors-anywhere.herokuapp.com/https://api.frost.po.et/';

  public token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImQuaHVlY2ttYW5uQGdvb2dsZW1haWwuY29tIiwiY2xpZW50X3Rva2VuIjoiMGJkNjJjNzQtNWVjMy00NjFmLWU0NTktOTZmZmU1MjQzOGJmIiwiaWF0IjoxNTE4ODI5MDc0LCJleHAiOjE1MjE1OTM4NzR9.VJYUeBNeGqtK_HdpMuqJpAqRHGTAEIuA2pzt1ZvOrzw';

  constructor(private injector: Injector)
  {
    // in case we want more services
    this.http = this.injector.get(Http);
  }

  /**
   * http Get
   * @param path
   * @param param
   */
  get(path: string, param: any = '', token = null): Observable<Response>
  {
    if (this.token == null && token == null)
    {
      return Observable.throw('Token not initialized');
    }

    const observer = this.http.get(this.APIURL + path + '/' + param, {
      headers: this.getHeader()
    }).do((res: Response) =>
    {
    }, (error: any) =>
      {
      });

    return observer;
  }

  /**
   * http post
   * @param path
   * @param param
   */
  post(path: string, creaditals: any = '', tokenRequired: boolean = true): Observable<Response>
  {
    if (this.token == null && tokenRequired)
    {
      return Observable.throw('Token not initialized');
    }

    const observer = this.http.post(this.APIURL + path, creaditals, {
      headers: this.getHeader()
    }).do((res: Response) =>
    {
      // Can be used to show successfull dialog
    }, (error: any) =>
      {
      });

    return observer;
  }

  /**
 * http put
 * @param path
 * @param param
 */
  put(path: string, creds: any = '', tokenRequired: boolean = true): Observable<Response>
  {
    if (this.token == null && tokenRequired)
    {
      return Observable.throw('Token not initialized');
    }

    const observer = this.http.put(this.APIURL + path, creds, {
      headers: this.getHeader()
    }).do((res: Response) =>
    {
      // Can be used to show successfull dialog
    }, (error: any) =>
      {
      });

    return observer;
  }

  delete(path: string, id: any = ''): Observable<Response>
  {
    const observer = this.http.delete(this.APIURL + path + '/' + id, {
      headers: this.getHeader()
    }).do((res: Response) =>
    {
      // Can be used to show successfull dialog
    }, (error: any) =>
      {
      });

    return observer;
  }

  private getHeader(content: string = 'application/json', token = this.token): Headers
  {
    const authHeader = new Headers({
      'Content-Type': content,
      token
    });

    return authHeader;
  }
}
