// ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction;

// export let AddExtraPropertyToClass = <T extends { new (...args: any[]): {} }>(constructor: T) => {
//   return class implements Extra {
//     extraProperty = 'Tadah!';
//   };
// };

interface Extra {
  extraProperty: string;
}
