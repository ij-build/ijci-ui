import { Component } from '@angular/core';

import { PagedResults } from '../../../shared/models/paged-results';
import { Build } from '../../../shared/models/build';
import { ApiService } from '../../../shared/services/api.service';

@Component({
  selector: 'app-builds',
  templateUrl: './builds.component.html',
  styleUrls: ['./builds.component.css']
})
export class BuildsComponent {
  constructor (
    private apiService: ApiService
  ) { }

  loader(filterQuery: string): Promise<PagedResults<Build>> {
    return this.apiService.getBuilds(1, filterQuery);
  }
}
