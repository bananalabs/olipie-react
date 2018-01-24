import * as React from 'react';
import { AppState, selectMode, selectAccount } from '../App/model';
import { Mode } from '../App/constants';
import { setMode } from '../App/actions';
import { connect } from 'react-redux';
import { createStructuredSelector }  from 'reselect';
import General from './General';
import { setFilter, updateFilter } from './actions';
import { selectFilter } from './model';
import { addUser } from '../User/actions';
import { User } from '../User/model';

export interface Props {
  mode: Mode;
  accountId: string;
  filter: string;
  dispatch: (action: any) => void;
}

export class Settings extends React.Component<Props, {}> {

  constructor(props: Props) {
    super(props);
    this._setFilter = this._setFilter.bind(this);
    this._addProfile = this._addProfile.bind(this);
    this._done = this._done.bind(this);
  }

  _setFilter(keywords: string): void {
    this.props.mode === Mode.NewUser ?
    this.props.dispatch(setFilter({accountId: this.props.accountId, keywords: keywords})) :
    this.props.dispatch(updateFilter({accountId: this.props.accountId, keywords: keywords}));
  }

  _addProfile(profile: {name: string; profileColor: string; kid: boolean}): void {
    const user: User = { ...profile, ...{ admin: false, id: '' } };
    this.props.dispatch(addUser({accountId: this.props.accountId, user: user}));
  }

  _done() {
    this.props.dispatch(setMode({mode: Mode.Default}));
  }

  render() {
    const title = this.props.mode === Mode.NewUser ?
                  'Lets get Started' :
                  'Edit Settings';
    return (
        <General
         title={title}
         filter={this.props.filter}
         setFilter={this._setFilter} 
         addProfile={this._addProfile}
         done={this._done}
        />
    );
  }
}

const mapStateToProps = (state: AppState): Props => createStructuredSelector({
  mode: selectMode(),
  accountId: selectAccount(),
  filter: selectFilter()
}) as any;

export default connect(mapStateToProps)(Settings);