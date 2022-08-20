import * as path from 'path';
import { Component } from 'react';

const InputTypes = {};
const context = require.context('./inputs', false, /\.js$/);
context
    .keys()
    // .filter(item => item !== './index.js')
    .forEach(key => {
        InputTypes[path.basename(key, path.extname(key))] = context(key).default;
    });

InputTypes.addInputType = (name, instance) => {
    if (typeof name !== 'string') {
        throw Error('Error: First parameter of addInputType must be of type string');
    }

    if (!(Component instanceof instance.constructor)) {
        throw Error(`Error: Cannot not assign "${name}" as an inputType. Second parameter expects a React component`);
    }

    InputTypes[name] = instance;
};

InputTypes.addInputTypes = types => {
    if (typeof types !== 'object') {
        throw Error('Error: First parameter of addInputTypes must be of type object');
    }

    for (const type in types) {
        if (Object.prototype.hasOwnProperty.call(types, type)) {
            InputTypes.addInputType(type, types[type]);
        }
    }
};

export default InputTypes;
