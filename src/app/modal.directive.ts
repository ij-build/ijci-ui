import { Directive, ElementRef } from '@angular/core';

declare const $: any;

@Directive({
  selector: '[appModal]'
})
export class ModalDirective {
  constructor(
    private el: ElementRef
  ) { }

  show(onApprove): void {
    $(this.el.nativeElement).modal({onApprove: onApprove}).modal('show');
  }
}
