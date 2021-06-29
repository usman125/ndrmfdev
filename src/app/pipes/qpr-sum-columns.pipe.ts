import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "qprSum"
})
export class QprSumPipe implements PipeTransform {
  transform(items: any[], attr: string): any {
    return items !== null ? items.reduce((a, b) => a + b[attr], 0) : null;
  }
}

