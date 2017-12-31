import * as React from 'react';
import MAvatar  from 'material-ui/Avatar';
import './Avatar.css';

export interface Props {
    letter: string;
    name?: string;
    color: string;
    backgroundColor: string;
    small: boolean;
}

// eslint-disable-next-line
const Avatar: React.SFC<Props> = (props: Props) => {
    return (
        <div className="avatar" id={`${props.letter}-${props.color}`}>
            <MAvatar
                color={props.color}
                backgroundColor={props.backgroundColor}
                size={props.small ? 40 : 120}
            >
            {props.letter}
            </MAvatar>
            <p className="name">{!props.small && props.name}</p>
        </div>
    );
};

export default Avatar;