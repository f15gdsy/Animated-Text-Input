'use strict';

import React from 'react';

export default React.createClass ({
    getDefaultProps () {
        return {
            interval: 500
        };
    },

    getInitialState () {
        return {
            visible: false
        };
    },

    componentDidMount () {
        this.interval = setInterval(this._toggleVisibility, this.props.interval);
    },

    componentWillUnMount () {
        clearInterval(this.interval);
    },

    _toggleVisibility () {
        this.setState({
            visible: !this.state.visible
        });
    },

    render () {
        let blinkStyle = {
            opacity: this.state.visible ? 1 : 0
        };

        let {style} = this.props;
        blinkStyle = Object.assign(blinkStyle, style);

        return (
            <span style = {blinkStyle}>{'|'}</span>
        );
    }
});
