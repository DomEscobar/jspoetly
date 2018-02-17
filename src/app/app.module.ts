import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CodemirrorDirective } from './directives/codemirror.directive';
import { CodeRoomComponent } from './code-room/code-room.component';
import { SanitizeHtmlPipe } from './directives/sanitize-html.pipe';
import { FrostService } from './service/frost.service';
import { NavigationComponent } from './navigation/navigation.component';
import { InfoboxComponent } from './infobox/infobox.component';

const routes = [
  { path: '', component: CodeRoomComponent },
  { path: ':id', component: CodeRoomComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CodemirrorDirective,
    CodeRoomComponent,
    SanitizeHtmlPipe,
    NavigationComponent,
    InfoboxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [FrostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
