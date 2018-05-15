// MethodDecorator = <T>(target: Object,
//                       key: string,
//                       descriptor: TypedPropertyDescriptor<T>)
//   => TypedPropertyDescriptor < T > | Void;

export let DoQuickMaths = (target,
                           propertyKey: string,
                           descriptor: PropertyDescriptor) => {
  let oldValue = descriptor.value;

  descriptor.value = function (...args: any[]) {

    console.log('2+2 is 4 minus 1 that\'s 3, Quick Maths!');

    return oldValue.apply(this);
  };

  return descriptor;
};

export let PiggyBack = (piggyBackFunction: Function) => {
  return (target,
          propertyKey: string,
          descriptor: PropertyDescriptor) => {
    let oldValue = descriptor.value;

    descriptor.value = function (...args: any[]) {
      piggyBackFunction();
      // console.log(target, propertyKey, descriptor);

      return oldValue.apply(this);
    };

    return descriptor;
  };
};
