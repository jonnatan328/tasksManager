import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  /**
   * Filtra los items de un array que contengan en el nombre el texto de busqueda
   * @param items Array a filtrar
   * @param searchText Texto de busqueda
   */
  transform(items: any[], searchText: string): any {
    
    if(!items) return [];
    if(!searchText) return items;
    
    searchText = searchText.toLowerCase();

    return items.filter( it => {
      return it.name.toLowerCase().includes(searchText);
    });
  }

}
