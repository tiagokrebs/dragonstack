import React, { Component } from 'react';
import { skinny, slender, sporty, stocky, patchy, plain, spotted, striped } from '../assets';

const propertyMap = {
    backgroundColor: { 
        black: '#233238', 
        white: '#cfd8dc', 
        green: '#a5d6a7', 
        blue:  '#0277bd'
    },
    build: { slender, stocky, sporty, skinny },
    pattern: { plain, striped, spotted, patchy },
    size: { small: 100, medium: 140, large:180, enourmous: 220 }
};

class DragonAvatar extends Component {
    get DragonImage() {
        const DragonPropertyMap = {};

        this.props.dragon.traits.forEach(trait => {
            const { traitType, traitValue } = trait;

            DragonPropertyMap[traitType] = propertyMap[traitType][traitValue];
        });

        const { backgroundColor, build, pattern, size } = DragonPropertyMap;

        const sizing = { width: size, height: size };

        return (
            <div className='dragon-avatar-image-wrapper'>
                <div className='dragon-avatar-image-background' style={{ backgroundColor: backgroundColor, sizing }}></div>
                <img src={pattern} className='dragon-avatar-image-pattern' style={sizing} />
                <img src={build} className='dragon-avatar-image' style={sizing} />
            </div>
        );
    }

    render() {
        // como o pai Dragon passou props para esse filho usasse this.props.
        const { generationId, dragonId, traits } = this.props.dragon;

        if (!dragonId) return <div></div>;

        return (
            <div>
                <span>G{generationId}.</span>
                <span>I{dragonId}. </span>
                { traits.map(trait => trait.traitValue).join(', ') }
            </div>
        )
        //{ this.DragonImage }
    }
}

export default DragonAvatar;