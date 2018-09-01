import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
              providedIn: 'root'
            })
export class TitleService {
// TODO: un used, delete if no purpose is found
  public titleChange$ = new Subject<string>();

  constructor() {
  }

}
