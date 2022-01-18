let handler = {
    get: (target, property) => {


        console.log(target[property], "Getting")
        return target[property];
    },
    set: (target, property, val) => {
        console.log("setting")
        target[property] = val;
    }
}
var jsonData = require('./testData.json');



function makeLoggable(object, parentKey) {
    let loggableObj = {};
    if (object instanceof Array) {
        loggableObj = []
        for (let element of object) {
            loggableObj.push(generateProxy(element, parentKey, element));
        }
    } else {
        loggableObj = {};
        for (const key of Object.keys(object)) {
            if (object[key] instanceof Object) {
                loggableObj[key] = generateProxy(object, key, object[key])
            } else {
                loggableObj[key] = object[key];
            }
        }
    }


    return loggableObj;
}

function generateProxy(object, parentKey, value) {
    if (hasObject(value)) {
        return new Proxy(makeLoggable(value, parentKey), handler);
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
jsonData = makeLoggable(jsonData);

jsonData[0];
jsonData[0].friends = { "test": "HELLo" }

console.log(jsonData[0].friends)