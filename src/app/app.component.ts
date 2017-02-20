import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';

import { DatabusService } from './databus.service';
import { Skill, Survivor } from './model/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  skills = new Observable<Array<Skill>>();
  skillTerm$ = new Subject<string>();

  survivors = new Array<any>();
  survivorsRaw = new Array<any>();
  survivorFilter$ = new Subject<string>();
  survivorFilter = '';

  set = {
    bs: true,
    wb: true,
    hb: true,
    gb: true,
  };

  constructor(private http: Http, private data: DatabusService) { }

  ngOnInit() {
    this.http.get('/assets/static-data/survivors.json').subscribe(
      res => {
        this.survivorsRaw = res.json().data.filter(s => s.name !== '');
        this.survivors = this.survivorsRaw;
      });

    this.survivorFilter$.debounceTime(100).subscribe(name => {
      this.survivorFilter = name.toLowerCase();
      this.filterSurvivors();
    });

    this.skills = this.data.getSkillsFilteredBy(this.skillTerm$)
      .merge(this.data.getSkills().takeUntil(this.skillTerm$));
  }

  filterSurvivors() {
    this.survivors = this.filterSurvivorsBySet()
      .filter(sur => sur.name.toLowerCase().includes(this.survivorFilter));
  }

  private filterSurvivorsBySet(): Array<any> {
    const survivorsFiltered = this.survivorsRaw.filter(sur => this.filterSet(sur));
    return survivorsFiltered;
  }

  private filterSet(survivor: any): boolean {
    let set;
    switch (survivor.set) {
      case 'Black Plague Base':
        set = this.set.bs;
        break;
      case 'Wulfsburg':
        set = this.set.wb;
        break;
      case 'Hero Box':
        set = this.set.hb;
        break;
      case 'Guest Box':
        set = this.set.gb;
        break;
    }
    return set;
  }
}
