import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'floor'
})
export class FloorPipe implements PipeTransform {
  transform(value: number): any {
    return Math.floor(value);
  }

}

@Pipe({
  name: 'ceil'
})
export class CeilPipe implements PipeTransform {
  transform(value: number): any {
    return Math.ceil(value);
  }

}