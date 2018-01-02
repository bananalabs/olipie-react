import * as React from 'react';
import MAvatar  from 'material-ui/Avatar';
import './Avatar.css';
import { white } from 'material-ui/styles/colors';

export interface Props {
    name: string;
    color: string;
    small: boolean;
}

// eslint-disable-next-line
const Avatar: React.SFC<Props> = (props: Props) => {
    const letter = props.name.charAt(0).toUpperCase();
    return (
        <div className="avatar" id={`${letter}-${props.color}`}>
            <MAvatar
                color={white}
                backgroundColor={props.color}
                size={props.small ? 40 : 120}
            >
            {letter}
            </MAvatar>
            <p className="name">{!props.small && props.name}</p>
        </div>
    );
};

export default Avatar;