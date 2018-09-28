import { Directive, ElementRef, OnInit } from '@angular/core';

declare const $: any;

@Directive({
  selector: '[appTab]'
})
export class TabDirective implements OnInit {
  constructor(
    private el: ElementRef
  ) { }

  ngOnInit() {
    $(this.el.nativeElement).tab();
  }
}
