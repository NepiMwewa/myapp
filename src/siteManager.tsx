let currentTitle = "My React App";

export class SiteManager{
  static dataEntry: string = "text";
  static getTitle(): string{
    return currentTitle;
  }
  static setTitle(param: string){
    currentTitle = param;
  }
  static addNumber(param: number){
    currentTitle = (currentTitle + param.toString());
  }

}