import { Component, AfterViewInit, NgZone } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Code } from '../models/code';
import { FrostService } from '../service/frost.service';
import { WorkAttributes } from '../models/workAttributes';

@Component({
  selector: 'app-code-room',
  templateUrl: './code-room.component.html',
  styleUrls: ['./code-room.component.css']
})
export class CodeRoomComponent implements AfterViewInit
{
  work: WorkAttributes = new WorkAttributes();

  title = 'My work';

  private cssElement: HTMLElement;
  private jsElement: HTMLElement;

  public tabpanelIndex = 'html';

  constructor(
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private frostService: FrostService)
  {
    this.work.code = new Code();
  }

  ngOnInit()
  {
    this.activatedRoute.params.subscribe((params: Params) =>
    {
      const id = this.activatedRoute.snapshot.params['id'];

      if (id)
      {
        this.initWork(id);
      } else
      {
        this.work.code = new Code();
      }
    });
  }

  ngAfterViewInit()
  {
    this.jsElement = document.createElement('script');
    this.cssElement = document.createElement('style');

    document.head.appendChild(this.jsElement);
    document.head.appendChild(this.cssElement);
  }

  /**
   * Inits the work by the given GUID parameter
   * @param id
   */
  private async initWork(id)
  {

    if (this.frostService.works == null)
    {
      await this.frostService.fetchWorks();
    }

    const workData = this.frostService.works.find(o => o.code.guid == id);

    if (!workData)
    {
      alert("No work found");
      this.work.code = new Code();
      return;
    }

    this.work.code = workData.code;
  }

  public updateCss(css)
  {
    this.cssElement.innerHTML = css;
  }

  public updatejs(js)
  {
    this.jsElement.innerHTML = js;
  }

  public switchTab(index)
  {
    this.tabpanelIndex = index;
  }

  public createWork()
  {
    const work: WorkAttributes = new WorkAttributes();

    work.dateCreated = new Date().toISOString();
    work.datePublished = new Date().toISOString();
    work.content = JSON.stringify(this.work.code);
    work.name = window.prompt('Title of your creation', 'My Title');;
    work.author = this.frostService.author;
    work.tags = this.work.tags;

    this.frostService.CreateWork(work).subscribe(data =>
    {
      alert("Work saved successfully save your workid to ensure that this is your content : " + data.workId);
    });
  }

}
