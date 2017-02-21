import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Survivor } from '../model/survivor';
import { DatabusService, Survivorz } from '../databus.service';

@Component({
  selector: 'app-survivor-details',
  templateUrl: './survivor-details.component.html',
  styleUrls: ['./survivor-details.component.css']
})
export class SurvivorDetailsComponent implements OnInit {

  survivor: Survivorz;

  constructor(private activeRoute: ActivatedRoute, private data: DatabusService) { }

  ngOnInit() {
    this.survivor = this.activeRoute.params.distinctUntilChanged()
      .switchMap(params => this.data.getSurvivor(params['name']));

    this.survivor.subscribe(x => console.log(x[0].skills));
  }

}
