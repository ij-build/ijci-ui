import { Directive, ElementRef, OnInit } from '@angular/core';

declare const $: any;

@Directive({
  selector: '[appPopup]'
})
export class PopupDirective implements OnInit {
  constructor(
    private el: ElementRef
  ) { }

  ngOnInit() {
    $(this.el.nativeElement).popup();
  }
}
