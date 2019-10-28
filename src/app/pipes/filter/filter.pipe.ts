import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/task/task';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  /**
   * Filtra los items de un array que contengan en el nombre el texto de busqueda
   * @param items Array a filtrar
   * @param searchText Texto de busqueda
   */
  transform(items: Observable<any[]>, searchText: string): any {
    
    if(!items) return [];
    if(!searchText) return items;
    
    searchText = searchText.toLowerCase();
    return items.pipe(map(itemsArray => {
      return itemsArray.filter( it => {
        return it.name.toLowerCase().includes(searchText);
      });
    }))
    // Este codigo es para cuando los items no sean un observable sino un array
    /*return items.filter( it => {
      return it.name.toLowerCase().includes(searchText);
    });*/
  }

}
