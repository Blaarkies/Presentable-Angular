// PropertyDecorator = (target: Object,
//                      key: string) => void;

export let LogProperty = (target, key) => {
  // property value
  let _val = this[key];

  // property getter
  let getter = function () {
    console.log(`get ${key} :`, _val);
    return _val;
  };

  // property setter
  let setter = function (newVal) {
    console.log(`set ${key} from `, _val, ` to: `, newVal);
    _val = newVal;
  };

  // Create new property with getter and setter
  Object.defineProperty(target, key, {
    get: getter,
    set: setter
  });
};

export function ReadOnly(target: any, key: string) {
  Object.defineProperty(target, key, { writable: false });
}

export let Immutable = (target,
                          key: string) => {
  // property value
  let _val = this[key];

  // property getter
  let getter = function () {
    return _val;
  };

  // property setter
  let setter = function (newVal) {
    if (_val === undefined) {
      _val = newVal;
    }
  };

  // Create new property with getter and setter
  Object.defineProperty(target, key, {
    get: getter,
    set: setter
  });
};
