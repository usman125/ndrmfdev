import * as _ from "lodash";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "reviewUserFilter"
})
export class ReviewUserFilterPipe implements PipeTransform {
  transform(array: any[], query: string): any {
    if (query) {
      return _.filter(array, row => row.name.toLowerCase().indexOf(query) > -1);
    }
    return array;
  }
}