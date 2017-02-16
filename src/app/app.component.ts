import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Zombies!';
  skills: Array<any>;

  constructor(private http: Http) { }

  ngOnInit() {
    this.http.get('/assets/skills.json').subscribe(
      res => {
        this.skills = res.json().data;
      });
  }


}
