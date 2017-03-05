import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Survivor } from '../model/survivor';
import { DatabusService, Survivorz, Skillz } from '../databus.service';

@Component({
  selector: 'app-survivor-details',
  templateUrl: './survivor-details.component.html',
  styleUrls: ['./survivor-details.component.css']
})
export class SurvivorDetailsComponent implements OnInit {

  // survivor as array co we can use ng-for in template, otherwise we would need to use | async for every field
  survivor: Survivorz;
  skillz: Skillz;

  constructor(private activeRoute: ActivatedRoute, private data: DatabusService) { }

  ngOnInit() {
    this.survivor = this.activeRoute.params.distinctUntilChanged()
      .switchMap(params => {
        const sur = this.data.getSurvivor(params['name']);
        this.skillz = this.data.getSkillsForSurvivor(sur);
        return sur.map(x => [x]);
      });
  }

}
