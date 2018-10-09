import { Component, Input } from '@angular/core';

const MaxPages = 7;

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() page: number;
  @Input() numPages: number;
  @Input() loadPage: (number) => void;

  constructor() { }

  seq(): number[] {
    if (this.numPages <= MaxPages) {
      return Array.from(Array(this.numPages).keys()).map(n => n + 1);
    }

    const pages = [this.page];

    for (let i = 1; pages.length < MaxPages; i++) {
      if (this.page - i > 0) {
        pages.unshift(this.page - i);
      }

      if (this.page + i <= this.numPages) {
        pages.push(this.page + i);
      }
    }

    return pages;
  }
}
