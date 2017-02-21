import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subject, Observer } from 'rxjs/Rx';

import { DatabusService, Skillz, Survivorz } from './databus.service';
import { Skill, Survivor } from './model/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  skillTerm$ = new Subject<string>();
  skills: Skillz;
  survivors: Survivorz;

  constructor(private data: DatabusService) { }

  ngOnInit() {
    this.survivors = this.data.getSurvivorsFilteredBy(this.data.survivorCriteria$)
      .merge(this.data.getSurvivors().takeUntil(this.data.survivorCriteria$));

    this.skills = this.data.getSkillsFilteredBy(this.skillTerm$)
      .merge(this.data.getSkills().takeUntil(this.skillTerm$));
  }

  filterSurvivors(name): void {
    this.data.survivorCriteria$.next({ name: name });
  }
}
