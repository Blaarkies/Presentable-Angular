import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  public titleChange$ = new Subject<string>();

  constructor() {
  }

}
