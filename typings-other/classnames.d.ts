// Type definitions for classnames
// Project: https://github.com/JedWatson/classnames
// Definitions by: Dave Keen <http://www.keendevelopment.ch>, Adi Dahiya <https://github.com/adidahiya>, Jason Killian <https://github.com/JKillian>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module "classnames" {
  type ClassValue = string | number | ClassDictionary | ClassArray;

  interface ClassDictionary {
    [id: string]: boolean;
  }

  interface ClassArray extends Array<ClassValue> { }

  interface ClassNamesFn {
    (...classes: ClassValue[]): string;
  }

  var classNames: ClassNamesFn;
  export = classNames;
}
