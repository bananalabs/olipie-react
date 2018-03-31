
import * as React from 'react';
import './Videos.css';
import YouTube from 'react-youtube';
import { AppState } from '../App/model';
import { selectRelatedVideos } from './model';
import { connect } from 'react-redux';
import { createStructuredSelector }  from 'reselect';
import { getRelatedVideos } from './actions';

export interface Props {
  relatedVideos: any[];
  dispatch: any;
  match: any;
}

class Play extends React.Component<Props, {}> {

  constructor(props: Props) {
    super(props);
    this.props.dispatch(getRelatedVideos({videoId: this.props.match.params.id}));
  }

  render() {
    const opts = {
      width: '100%',
      height: '100%',
      playsinline: false,
      playerVars: {rel: 0}
    };
    const relatedVideos = this.props.relatedVideos.map((v) => {
      return  <div className="play-recommended__video">
                <YouTube
                  videoId={v.id.videoId}
                  opts={opts}
                />
              </div>
    });
    return (
      <div className="play">
          <div className="play-video">
            <YouTube videoId={this.props.match.params.id}/>
          </div>
          <div className="play-recommended">{relatedVideos}</div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): Props => createStructuredSelector({
    relatedVideos: selectRelatedVideos(),
}) as any;

export default connect(mapStateToProps)(Play);
