'use strict';

import React from 'react';
import BlinkingCursor from './BlinkingCursor';

export default React.createClass ({
    _textIndex: 0,
    _charIndex: 0,
    _deleting: false,

    propTypes: {
        // The texts to animate.
        texts: React.PropTypes.array,

        // The pause time for 'typing' each letter in ms.
        typeInterval: React.PropTypes.number,

        // The pause time for 'pressing delete key' in ms.
        deleteInterval: React.PropTypes.number,

        // The pause time before deleting, and before typing new text in ms.
        interTextInterval: React.PropTypes.number,

        // The interval for the blinking cursor to blink
        blinkInterval: React.PropTypes.number,

        // The variations for typeInterval.
        // The final type pause time will be in the range of
        // [typeInterval - speedVariation, typeInterval + speedVariation]
        speedVariation: React.PropTypes.number,

        // Loop through the texts again & again
        loop: React.PropTypes.bool
    },

    getDefaultProps () {
        return {
            texts: [''],
            typeInterval: 125,
            deleteInterval: 80,
            interTextInterval: 1000,
            blinkInterval: 500,
            speedVariation: 100,
            loop: false
        };
    },

    getInitialState () {
        return {
            text: 'this._getFirstLetter()'
        };
    },

    componentDidMount () {
        this.letterInterval = setInterval(this._tick, this._getFinalTypeInterval());
    },

    componentWillUnMount () {
        clearInterval(this.letterInterval);
    },

    _tick () {
        clearInterval(this.letterInterval);

        if (this._deleting) {
            this.letterInterval = setInterval(this._tick, this.props.deleteInterval);
            this._delete();
        }
        else {
            this.letterInterval = setInterval(this._tick, this._getFinalTypeInterval());
            this._type();
        }
    },

    _type () {
        let textCharCount = this.props.texts[this._textIndex].length;
        let displayText;
        let toNewText = false;

        this._charIndex++;

        if (this._charIndex >= textCharCount) {
            this._charIndex--;

            if (this._textIndex >= this.props.texts.length - 1) {    // Complete one loop
                if (this.props.loop) {
                    toNewText = true;
                }
                else {  // End
                    clearInterval(this.letterInterval);
                    return ;
                }
            }
            else {  // Complete one text, and move to next
                toNewText = true;
            }
        }
        else {
            displayText = this._getDisplayText(this._charIndex);
        }

        if (toNewText) {
            this._deleting = true;
            this._onInterText();
        }
        else {
            this.setState({
                text: displayText
            });
        }
    },

    _delete () {
        this._charIndex--;
        let displayText;

        if (this._charIndex < 0) {    // Can move to new text
            this._deleting = false;
            this._charIndex = 0;
            this._textIndex++;

            if (this._textIndex >= this.props.texts.length) {
                this._textIndex = 0;
            }

            this._onInterText();

            displayText = '';
        }
        else {  // Keep deleting
            displayText = this._getDisplayText(this._charIndex);
        }

        this.setState({
            text: displayText
        });
    },

    _getDisplayText (nextIndex) {
        let targetText = this.props.texts[this._textIndex];
        return targetText.substring(0, nextIndex+1);
    },

    _onInterText () {
        clearInterval(this.letterInterval);

        let interTextInterval = setInterval(() => {
            this.letterInterval = setInterval(this._tick, this.props.typeInterval);
            clearInterval(interTextInterval);

            this.setState({
                text: this._getDisplayText(this._charIndex)
            });
        }, this.props.interTextInterval);
    },

    _getFirstLetter () {
        return this.props.texts[this._textIndex][0];
    },

    _getFinalTypeInterval () {
        return this.props.typeInterval + (Math.random() - 0.5) * this.props.speedVariation;
    },

    render () {
        let {style, blinkInterval} = this.props;
        return (
            <span>
                <span {...this.props}>{this.state.text}</span>
                <BlinkingCursor
                    style = {style}
                    interval = {blinkInterval}
                    />
            </span>
        );
    }
});
