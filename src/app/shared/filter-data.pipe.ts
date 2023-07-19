import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterData'
})
export class FilterDataPipe implements PipeTransform {

  transform(items: any[], searchText: string, filters: string[]): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();
    
    let filteredItems:any = [];

    items.forEach(item => {
      filters.forEach(filter => {
        if (item[filter] !== null && item[filter]?.toLowerCase()?.includes(searchText)) {
          filteredItems.push(item);
        }
      })
    })
    return filteredItems;
  }

}
