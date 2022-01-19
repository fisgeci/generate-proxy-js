let handler = {
    get: (target, property) => {
        return target[property];
    },
    set: (target, property, val) => {
        if (typeof val == 'object') {
            target[property] = makeItemAProxy(val);
        } else {
            target[property] = val;
        }
        return true;
    }
}

export function makeItemAProxy(object) {
    object = makeLoggable(object);
    return new Proxy(object, handler);

}

function makeLoggable(object) {
    if (object instanceof Array) {
        for (let element of object) {
            let index = 0;
            if (typeof element == 'object') {
                object[index] = generateProxy(element);
                index++;
            } else {
                loggableObj.push(element);
            }
        }
    } else {
        for (const key of Object.keys(object)) {
            if (object[key] instanceof Object) {
                object[key] = generateProxy(object[key])
            } else {
                object[key] = object[key];
            }
        }
    }
    return object;
}

function generateProxy(value) {
    if (hasObject(value)) {
        return new Proxy(makeLoggable(value), handler);
    } else {
        return new Proxy(value, handler);
    }
}

function hasObject(object) {
    let hasObject = false;
    for (const key of Object.keys(object)) {
        if (typeof object[key] == 'object') {
            hasObject = true;
        }
    }
    return hasObject;
}