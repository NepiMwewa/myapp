import React from 'react';


export class SiteManager{
  static currentDmg: number = 0;
  static currentTitle = "Sleepy Woof Studios";

  static dataEntry: string = "text";
  static getTitle(): string{
    return this.currentTitle;
  }
  static setTitle(param: string){
    this.currentTitle = param;
  } 
  static getDmg(): number{
    return this.currentDmg;
  }
  static addDmg(param: number){
    this.currentDmg += param;
  }
  static setDmg(param: number){
    this.currentDmg = param;
  }
}