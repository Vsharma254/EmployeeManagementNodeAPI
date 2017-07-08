'use strict';
export class Utilities {
    constructor(name) {
        this.myUtilname = 'name';
    }

    myUtilname = 'test';
    constructor() {

    }

}

function test() {
    this.name = "test";
}