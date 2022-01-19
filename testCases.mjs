import { makeItemAProxy } from "./proxiTest.mjs";

let mockObj = {
    "username": "Fis Geci",
    "pasword": "*****",
    "roles": ["LEGEND"],
    "posts": [{ "post_id": 5, "content": "Hello" }],
    "account": {
        "setting": "blahblah"
    }
}

let clear = {
    "username": "Fis Geci",
    "pasword": "*****",
    "roles": ["LEGEND"],
    "posts": [{ "post_id": 5, "content": "Hello" }],
    "account": {
        "setting": "blahblah"
    }
}

function shouldTurnTheRootIntoProxy() {
    let proxyObj = makeItemAProxy(mockObj);
    proxyObj.username = "fis";

    console.assert(proxyObj.username === mockObj.username, "Object is a  proxy")
    mockObj = clear;
}

function shouldTurnNestedObjectIntoProxies() {
    let proxy = makeItemAProxy(mockObj)

    proxy.account.setting = "New Setting";

    console.assert(proxy.account.setting === mockObj.account.setting, "Object is a  proxy");

    mockObj = clear;
}

function shouldTurnNestedArrayIntoProxies() {
    let proxy = makeItemAProxy(mockObj)

    proxy.roles[1] = "New Setting";

    console.assert(proxy.roles[1] === mockObj.roles[1], "Array is a  proxy")

    mockObj = clear;
}

function shouldTurnNestedObjectsInArraysIntoProxies() {
    let proxy = makeItemAProxy(mockObj)

    proxy.posts[0].content = "New Content";

    console.assert(proxy.posts[0].content == "New Content", "Value Inside proxy has changed")
    console.assert(proxy.posts[0].content === mockObj.posts[0].content, "Object inside array is a  proxy")

    mockObj = clear;
}

shouldTurnTheRootIntoProxy();
shouldTurnNestedObjectIntoProxies();
shouldTurnNestedArrayIntoProxies();
shouldTurnNestedObjectsInArraysIntoProxies();