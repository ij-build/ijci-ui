import { Directive, ElementRef, Input, OnInit } from '@angular/core';

declare const $: any;

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {
  @Input() onChange: (string) => void;

  constructor(
    private el: ElementRef
  ) { }

  ngOnInit() {
    $(this.el.nativeElement).dropdown({
      clearable: true,
      onChange: this.onChange,
    });
  }
}
