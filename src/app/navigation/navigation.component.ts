import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FrostService } from '../service/frost.service';
import { Account } from '../models/account';
import { WorkAttributes } from '../models/workAttributes';
import { Code } from '../models/code';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent
{
  isShowWorks = false;

  constructor(
    private router: Router,
    private frostService: FrostService)
  {
    this.frostService.author = this.generateRandomName();
  }

  private generateRandomName()
  {
    return 'nokoly_' + (Math.floor(Math.random() * 6534) + 1);
  }

  toDate(datestring)
  {
    return new Date(datestring).toISOString().slice(0, 16).replace('T', ' ');
  }

  showWorks()
  {
    this.isShowWorks = !this.isShowWorks;

    if (this.frostService.works == null)
    {
      this.frostService.fetchWorks();
    }
  }

  openWork(work: WorkAttributes)
  {
    const code: Code = JSON.parse(work.content);
    this.router.navigate(['', code.guid]);
  }
}
