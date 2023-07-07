import { Component, Input } from '@angular/core';
import { IFilterOptions } from './filter.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
})
export class FilterComponent {
  @Input() filters!: IFilterOptions;

  clearAllFilters(): void {
    this.filters.clear();
  }

  clearFilter(filterName: string, value: string): void {
    this.filters.removeFilter(filterName, value);
  }
}
