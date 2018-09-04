import {Component, OnInit} from '@angular/core';
import {InfoCard} from "../../common/interface";
import {MatSnackBar} from "@angular/material";
import {DoQuickMaths, PiggyBack} from "../annotation-decorators/method-decorators";
import {Immutable, LogProperty, ReadOnly} from "../annotation-decorators/property-decorators";

@Component({
  selector: 'app-decorator-showcase',
  templateUrl: './decorator-showcase.component.html',
  styleUrls: ['./decorator-showcase.component.css',
    '../../app.component.scss']
})
export class DecoratorShowcaseComponent implements OnInit {

  numberA: number;
  numberB: number;
  isYellow: boolean;
  isRed: number;

  public cards = <InfoCard[]>[];

  public normalProperty: number = 0;

  // @LogProperty
  public loggedProperty: number = 0;

  // @ReadOnly
  public immutableProperty: number = 0;

  constructor(private snackBar: MatSnackBar) {
    this.cards.push({
      title: 'function',
      subtitle: 'Normal',
      data: () => this.normalMethod()
    });
    this.cards.push({
      title: 'function',
      subtitle: 'Decorated',
      data: () => this.decoratedMethod()
    });
    this.cards.push({
      title: 'function',
      subtitle: 'Decorated with a callback',
      data: () => this.piggyBackDecoratedMethod()
    });

    let normalProperty = {
      title: this.normalProperty.toString(),
      subtitle: 'Normal property',
      data: () => {
        this.normalProperty++;
        normalProperty.title = this.normalProperty.toString();
      }
    };
    this.cards.push(normalProperty);

    let loggedProperty = {
      title: this.loggedProperty.toString(),
      subtitle: 'Logged property',
      data: () => {
        this.loggedProperty++;
        loggedProperty.title = this.loggedProperty.toString();
      }
    };
    this.cards.push(loggedProperty);

    let immutableProperty = {
      title: this.immutableProperty.toString(),
      subtitle: 'Immutable property',
      data: () => {
        this.immutableProperty++;
        immutableProperty.title = this.immutableProperty.toString();
      }
    };
    this.cards.push(immutableProperty);



    // this.cards.push({title: '', subtitle: '', data: ''});
    // this.cards.push({title: '', subtitle: '', data: ''});
    // this.cards.push({title: '', subtitle: '', data: ''});
    // this.cards.push({title: '', subtitle: '', data: ''});
  }


  ngOnInit() {
  }

  normalMethod() {
    this.snackBar.open(`Ran "normalMethod"`);
  }

  // @DoQuickMaths
  decoratedMethod() {
    this.snackBar.open(`Ran "decoratedMethod"`);
  }

  // @PiggyBack(() => {
  //   let interval = setInterval(() =>
  //     console.log('Random number to follow: ' + Math.random()), 500);
  //   setTimeout(() => clearInterval(interval), 2000);
  // })
  piggyBackDecoratedMethod() {
    this.snackBar.open(`Ran "decoratedMethod"`);
  }


  sumOfNumbers(numberA: number, numberB: number, quick: boolean) {
    return numberA + numberB;
  }

  onYellowClick() {

  }

  onRedClick() {

  }


}
