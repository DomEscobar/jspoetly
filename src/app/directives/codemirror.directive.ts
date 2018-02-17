import { Directive, ElementRef, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
declare var CodeMirror: any;

@Directive({
  selector: '[appCodemirror]'
})
export class CodemirrorDirective implements AfterViewInit
{

  value: any;
  myCodeMirror: any;

  @Input()
  codeMode = 'javascript';

  @Input()
  htmlMode = false;

  @Input()
  theme = 'solarized';


  @Output() ngModelChange = new EventEmitter();

  @Input()
  set ngModel(value)
  {
    if (this.myCodeMirror && value !== this.myCodeMirror.getValue())
    {
      this.myCodeMirror.setValue(value);
    }
    this.value = value;
  }

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit()
  {
    const me = this;
    this.myCodeMirror = CodeMirror.fromTextArea(this.elementRef.nativeElement);
    this.myCodeMirror.setOption('mode', this.codeMode);
    this.myCodeMirror.setOption('theme', this.theme);
    this.myCodeMirror.setOption('htmlMode', this.htmlMode);
    this.myCodeMirror.setOption('lineNumbers', true);

    this.myCodeMirror.setOption('extraKeys', { 'Ctrl-Space': 'autocomplete' });


    this.myCodeMirror.on('change', () =>
    {
      me.ngModelChange.emit(me.myCodeMirror.getValue());
    });

    this.writeValue();

  }

  writeValue()
  {

    if (this.myCodeMirror)
    {
      this.myCodeMirror.setValue(this.value);
    }
  }

}
