import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import { Skill, Survivor } from './model';

@Injectable()
export class DatabusService implements OnInit {

  _skillsRaw: Array<Skill> = [];
  private skillsRequest: Observable<any>;

  constructor(private http: Http) {
    this.skillsRequest = this.http.get('/assets/static-data/skills.json');
    this.skillsRequest.subscribe(res => { this._skillsRaw = res.json().data; });
  }

  ngOnInit() {
    console.log('service oninit');
  }

  getSkills(): Observable<Array<Skill>> {
    if (this._skillsRaw.length === 0) {
      return this.skillsRequest.map(x => Observable.empty()).concat(Observable.defer(() => Observable.of(this._skillsRaw)));
    }
    return Observable.of(this._skillsRaw);
  }

  getSkillsFilteredBy(term$: Observable<string>): Observable<Array<Skill>> {
    return term$.debounceTime(100).switchMap(text => this.filterSkills(text));
  }

  filterSkills(text: string): Observable<Array<Skill>> {
    return this.getSkills().map(
      skills => skills.filter(
        skill => skill.name.includes(text)
      ));
  }

}
