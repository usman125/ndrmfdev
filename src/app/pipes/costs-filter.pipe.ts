import * as _ from "lodash";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "costsFilter"
})
export class CostsFilterPipe implements PipeTransform {
  transform(array: any[], query: string): any {
    if (query) {
      return _.filter(array, row => row.title.toLowerCase().indexOf(query) > -1);
    }
    return array;
  }
}