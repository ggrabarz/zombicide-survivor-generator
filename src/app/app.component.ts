import { Component, OnInit, ViewChild, trigger, state, style, transition, animate } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('survivorState', [
      transition('* => void', [
        style({ opacity: '*' }),
        animate("0.5s ease-in", style({ opacity: 0 }))
      ]),
      transition('void => false', [
        /*no transition on first load*/
      ]),
      transition('void => *', [
        style({ opacity: 0 }),
        animate("0.5s ease-in", style({ opacity: '*' }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  skills: Array<any>;
  skillsRaw = Array<any>();
  survivors: Array<any>;
  survivorsRaw = Array<any>();

  survivorFilter$ = new Subject<string>();
  survivorFilter = '';

  skillFilter$ = new Subject<string>();
  skillFilter = '';

  set = {
    bs: true,
    wb: true,
    hb: true,
    gb: true,
  };

  constructor(private http: Http) { }

  ngOnInit() {
    this.http.get('/assets/static-data/skills.json').subscribe(
      res => {
        this.skillsRaw = res.json().data;
        this.skills = this.skillsRaw;
      });

    this.http.get('/assets/static-data/survivors.json').subscribe(
      res => {
        this.survivorsRaw = res.json().data.filter(s => s.name !== '');
        this.survivors = this.survivorsRaw;
      });

    this.survivorFilter$.debounceTime(100).subscribe(name => {
      this.survivorFilter = name.toLowerCase();
      this.filterSurvivors();
    });

    this.skillFilter$.debounceTime(100).subscribe(skill => {
      this.skillFilter = skill.toLowerCase();
      this.filterSkills();
    });
  }

  filterSkills() {
    this.skills = this.skillsRaw.filter(skill => skill.name.toLowerCase().includes(this.skillFilter) || skill.desc.toLowerCase().includes(this.skillFilter));
  }

  filterSurvivors() {
    this.survivors = this.filterSurvivorsBySet()
      .filter(sur => sur.name.toLowerCase().includes(this.survivorFilter))
  }

  private filterSurvivorsBySet(): Array<any> {
    let survivorsFiltered = this.survivorsRaw.filter(sur => this.filterSet(sur))
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
