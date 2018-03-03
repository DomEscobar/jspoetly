import { Injectable, Injector } from '@angular/core';
import 'rxjs/add/operator/map';
import { BaseService } from './baseService';
import { Account } from '../models/account';
import { Observable } from 'rxjs/Observable';
import { WorkAttributes } from '../models/workAttributes';
import { Profile } from '../models/profile';
import { ApiToken } from '../models/apiToken';
import { Loading } from '../util';

@Injectable()
export class FrostService extends BaseService
{
  public profile: Profile;
  public author: string = '';
  public works: WorkAttributes[];

  constructor(injector: Injector)
  {
    super(injector);
  }

  //---- Non Poet ---


  /**
   * Fetches all works and init the code object
   */
  public fetchWorks(): Promise<any>
  {
    Loading.show();
    return new Promise((resolve, reject) =>
    {
      this.GetWorks(this.getToken()).subscribe((data) =>
      {
        data.forEach(work =>
        {
          debugger;
          work.code = JSON.parse(work.content);
        });
        Loading.hide();

        this.works = data;
        resolve();
      });
    });
  }

  //---- Poet ---

  /**
  * Sets the token of the client
  * @param profile
  */
  setProfile(profile: Profile)
  {
    this.profile = profile;
  }

  getProfile()
  {
    return this.profile;
  }

  /**
   * Sets the token of the client
   * @param token
   */
  setToken(token: string)
  {
    this.token = token;
  }

  getToken()
  {
    return this.token;
  }

  /**
   * Creates a new account
   * @param account
   */
  CreateAccount(account: Account): Observable<any>
  {
    return this.post('accounts', account, false).map((response) =>
    {
      return <any>response.json();
    });
  }

  /**
   * Logs the person in with standard creditals
   * @param account
   */
  Login(account: Account): Observable<any>
  {
    return this.post('login', account, false).map((response) =>
    {
      return <any>response.json();
    });
  }

  /**
   * Verifys a account on poet
   * @param token
   */
  VerifyAccount(): Observable<string>
  {
    return this.get('accounts/verify', this.token).map((response) =>
    {
      return <string>response.toString();
    });
  }

  /**
   * Sends a email to reset the password
   * @param email
   */
  ForgotPassword(email: string): Observable<any>
  {
    const asObj = { email: email };

    return this.post('password/reset', asObj).map((response) =>
    {
      return <any>response.json();
    });
  }

  /**
  * Changes the password
  * @param password
  * @param token
  */
  ChangePassword(password: string): Observable<any>
  {
    const asObj = { password: password };

    return this.post('password/change', asObj).map((response) =>
    {
      return <any>response.json();
    });
  }

  /**
  * Creates a new work
  * @param password
  */
  CreateWork(work: WorkAttributes): Observable<any>
  {
    return this.post('works', work).map((response) =>
    {
      return <any>response.json();
    });
  }

  /**
   * Gets a work by workId and optional token if other works
   * @param workId
   * @param token
   */
  GetWork(workId: string, token?: string): Observable<WorkAttributes>
  {
    return this.get('works', workId, token).map((response) =>
    {
      return <WorkAttributes>response.json();
    });
  }

  /**
   * Get all works of an account
   * @param workId
   */
  GetWorks(token?: string): Observable<WorkAttributes[]>
  {

    return this.get('works', '', token).map((response) =>
    {
      return <WorkAttributes[]>response.json();
    });
  }

  /**
  * Gets the apitoken
  */
  GetApiTokens(): Observable<ApiToken>
  {
    return this.get('tokens').map((response) =>
    {
      return <ApiToken>response.json();
    });
  }

  /**
   * Gets profile
   */
  initProfile(): Observable<Profile>
  {
    return this.get('accounts/profile', '', true).map((response) =>
    {
      return <Profile>response.json();
    });
  }
}
