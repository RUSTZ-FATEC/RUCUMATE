import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IValve } from '../valve.model';

@Component({
  selector: 'app-valve-detail',
  templateUrl: './valve-detail.component.html',
})
export class ValveDetailComponent implements OnInit {
  valve: IValve | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ valve }) => {
      this.valve = valve;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
