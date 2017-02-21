import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, Observer } from 'rxjs/Rx';

import { DatabusService, Skillz, Survivorz } from './../databus.service';
import { Skill, Survivor } from './../model/index';

export interface SurvivorzCriteria {
  name?: string;
  set?: {
    bs: boolean;
    wb: boolean;
    hb: boolean;
    gb: boolean;
  };
}

@Component({
  selector: 'app-survivors-list',
  templateUrl: './survivors-list.component.html',
  styleUrls: ['./survivors-list.component.css']
})
export class SurvivorsListComponent implements OnInit {
  survivors: Survivorz;
  private set = { bs: true, wb: true, hb: true, gb: true };

  constructor(private data: DatabusService, private router: Router) { }

  ngOnInit() {
    this.survivors = this.data.getSurvivorsFilteredBy(this.data.survivorCriteria$)
      .merge(this.data.getSurvivors().takeUntil(this.data.survivorCriteria$));
  }

  filterSurvivors(): void {
    this.data.survivorCriteria$.next({ set: this.set });
  }

  goSurvivorDetails(name: string) {
    this.router.navigate(['/survivor', name]);
  }
}
