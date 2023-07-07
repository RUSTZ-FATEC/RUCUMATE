import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEspData } from '../esp-data.model';

@Component({
  selector: 'app-esp-data-detail',
  templateUrl: './esp-data-detail.component.html',
})
export class EspDataDetailComponent implements OnInit {
  espData: IEspData | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ espData }) => {
      this.espData = espData;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
