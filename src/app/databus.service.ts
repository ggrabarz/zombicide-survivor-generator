import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import { Skill, Survivor } from './model';
import { SurvivorzCriteria } from './survivors-list/survivors-list.component';
import * as _ from 'lodash';

export type Skillz = Observable<Skill[]>;
export type Survivorz = Observable<Survivor[]>;

@Injectable()
export class DatabusService {

  private cachedSkills: Skillz;
  private cachedSurvivorz: Survivorz;

  survivorCriteria$ = new Subject<SurvivorzCriteria>();
  private lastSurvivorCriteria: SurvivorzCriteria = { name: '', set: undefined };

  constructor(private http: Http) { }

  getSkills(): Skillz {
    if (this.cachedSkills) {
      return this.cachedSkills;
    } else {
      return this.cachedSkills = this.http.get('/assets/static-data/skills.json')
        .map(res => res.json().data)
        .publishReplay(1).refCount();
    }
  }

  getSkillsFilteredBy(term$: Observable<string>): Skillz {
    return term$.debounceTime(100).switchMap(text => this.filterSkills(text));
  }

  private filterSkills(text: string): Skillz {
    return this.getSkills().map(skills => skills.filter(
      skill => skill.name.toLocaleLowerCase().includes(text.toLocaleLowerCase())
    ));
  }

  getSurvivor(name: string): Observable<Survivor> {
    return this.getSurvivors().map(survivors => survivors.find(sur => sur.name === name));
  }

  getSurvivors(): Survivorz {
    if (this.cachedSurvivorz) {
      return this.cachedSurvivorz;
    } else {
      return this.cachedSurvivorz = this.http.get('/assets/static-data/survivors.json')
        .map(res => res.json().data.filter(d => d.name.length))
        .publishReplay(1).refCount();
    }
  }

  getSurvivorsFilteredBy(criteria$: Observable<SurvivorzCriteria>): Survivorz {
    return criteria$.debounceTime(100).switchMap(criteria => this.filterSurvivors(criteria));
  }

  getSkillsForSurvivor(survivor: Observable<Survivor>): Skillz {
    return survivor.switchMap(sur => Observable.from(sur.skills).flatMap(skill => this.filterSkills(skill)).combineAll());
  }

  private filterSurvivors(criteria: SurvivorzCriteria): Survivorz {
    criteria = (this.lastSurvivorCriteria = _.merge(this.lastSurvivorCriteria, criteria));
    return this.getSurvivors().map(survivors =>
      survivors
        .filter(sur =>
          sur.name.toLocaleLowerCase().includes(criteria.name.toLocaleLowerCase()))
        .filter(sur =>
          this.filterSet(sur, criteria)
        ));
  }

  private filterSet(survivor: any, criteria: SurvivorzCriteria): boolean {
    let set = true;
    if (criteria.set) {
      switch (survivor.set) {
        case 'Black Plague Base':
          set = criteria.set.bs;
          break;
        case 'Wulfsburg':
          set = criteria.set.wb;
          break;
        case 'Hero Box':
          set = criteria.set.hb;
          break;
        case 'Guest Box':
          set = criteria.set.gb;
          break;
      }
    }
    return set;
  }
}
