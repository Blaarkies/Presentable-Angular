// ParameterDecorator = (target: Object,
//                       propertyKey: string,
//                       parameterIndex: number) => void;

let metadataKey = `myMetaData`;

export let LogParameter = (target: any,
                           key: string,
                           index: number) => {
  if (Array.isArray(target[metadataKey])) {
    target[metadataKey].push(index);
  } else {
    target[metadataKey] = [index];
  }
  console.log('value of param: ', target[metadataKey]);
};

export let LogMethod = (target,
                        key: string,
                        descriptor: any) => {
  let originalMethod = descriptor.value;
  let indices = target[metadataKey];

  descriptor.value = function (...args: any[]) {
    indices.forEach(x => {
      console.log('value of param: ', args[x]);
    });

    return originalMethod.apply(this, args);
  };
  return descriptor;
};
