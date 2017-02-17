import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  skills: Array<any>;
  survivors: Array<any>;
  sets: any = {};
  set = {
    bs: true,
    wb: true,
    hb: true,
    gb: true,
  };

  constructor(private http: Http) { }

  ngOnInit() {
    this.http.get('/assets/static-data/skills.1.json').subscribe(
      res => {
        this.skills = res.json().data;
      });

    this.http.get('/assets/static-data/survivors.json').subscribe(
      res => {
        this.survivors = res.json().data.filter(s => s.name !== '');
      });
  }

  toggle(flag: boolean) {
    flag = !flag;
  }
}
