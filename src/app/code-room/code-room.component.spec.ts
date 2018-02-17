import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeRoomComponent } from './code-room.component';

describe('CodeRoomComponent', () => {
  let component: CodeRoomComponent;
  let fixture: ComponentFixture<CodeRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
