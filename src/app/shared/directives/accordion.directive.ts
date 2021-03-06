import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

declare const $: any;

@Directive({
  selector: '[appAccordion]'
})
export class AccordionDirective implements OnChanges {
  @Input() enabled: string;
  private active = false;

  constructor(
    private el: ElementRef
  ) { }

  ngOnChanges() {
    if (!this.enabled || this.active) {
      return;
    }

    this.active = true;
    $(this.el.nativeElement).accordion();
  }
}
