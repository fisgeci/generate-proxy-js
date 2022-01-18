let handler = {
    get: (target, property) => {


        console.log(target[property], "Getting")
        return target[property];
    },
    set: (target, property, val) => {
        console.log("setting")
        if (typeof val == 'object') {
            console.log("here")
            target[property] = makeItemAProxy(val);
        } else {
            target[property] = val;
        }
    }
}
var jsonData = require('./testData.json');



function makeLoggable(object) {
    let loggableObj = {};
    if (object instanceof Array) {
        loggableObj = []
        for (let element of object) {
            if (typeof element == 'object') {
                loggableObj.push(generateProxy(element));
            } else {
                loggableObj.push(element);
            }
        }
    } else {
        loggableObj = {};
        for (const key of Object.keys(object)) {
            if (object[key] instanceof Object) {
                loggableObj[key] = generateProxy(object[key])
            } else {
                loggableObj[key] = object[key];
            }
        }
    }


    return loggableObj;
}

function makeItemAProxy(object) {
    let proxy = makeLoggable(object);
    return new Proxy(proxy, handler);

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

jsonData = makeItemAProxy(jsonData);


jsonData[0].friends = ["TESt", "TEST"];

jsonData[0].friends[0]