import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subject, Observer } from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';

import { DatabusService, Skillz, Survivorz } from './databus.service';
import { Skill, Survivor } from './model/index';

export interface SurvivorzCriteria {
  name: string;
  set: {
    bs: boolean;
    wb: boolean;
    hb: boolean;
    gb: boolean;
  };
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  survivorCriteria$ = new Subject<SurvivorzCriteria>();
  survivors: Survivorz;

  skillTerm$ = new Subject<string>();
  skills: Skillz;

  private set = { bs: true, wb: true, hb: true, gb: true };

  constructor(private data: DatabusService) { }

  ngOnInit() {
    this.survivors = this.data.getSurvivorsFilteredBy(this.survivorCriteria$)
      .merge(this.data.getSurvivors().takeUntil(this.survivorCriteria$));

    this.skills = this.data.getSkillsFilteredBy(this.skillTerm$)
      .merge(this.data.getSkills().takeUntil(this.skillTerm$));
  }

  filterSurvivors(name: string = ''): void {
    this.survivorCriteria$.next({ name: name, set: this.set });
  }
}
