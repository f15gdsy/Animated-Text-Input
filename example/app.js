'use strict';

import React from 'react';
import InputAnimation from '../src/InputAnimation';

let centerStyle = {
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    fontFamily: 'Lucida Sans Unicode',
};

let headingStyle = {
    fontSize: '7vmin',
    fontStyle: 'bold',
};

let animatedInputStyle = {
    color: 'grey',
    letterSpacing: '2',
    fontSize: '3vmin'
};

let App = React.createClass ({
    render () {
        return (
            <div className = {'center'}
                style = {centerStyle}>
                <p style={headingStyle}>Animated Input</p>
                <span style = {animatedInputStyle}>
                    {'/* '}
                    <InputAnimation
                        texts = {[
                            'Hello World!',
                            'This is an animated text input, made using ReactJS and ES6',
                            'Code is availabe on Github!',
                            'Enjoy :)'
                        ]}
                        deleteInterval = {65}
                        interTextInterval = {1250}
                        loop
                        />
                    {' */'}
                </span>
            </div>
        );
    }
});

React.render(<App/>, document.body);
