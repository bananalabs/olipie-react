import * as React from 'react';

export interface Props {
    children: any;
}

const Content: React.SFC<Props> = (props: Props) => {
    return (
        <div>{props.children}</div>
    );
};

export default Content;
