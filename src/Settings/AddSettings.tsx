import * as React from 'react';
import { AppState, selectAccount } from '../App/model';
import { connect } from 'react-redux';
import { createStructuredSelector }  from 'reselect';
import { setFilter } from './actions';
import AddEditForm from './AddEditForm';
import { Settings } from './model';

export interface Props {
  accountId: string;
  dispatch: (action: any) => void;
  done: () => void;
}

export class AddSettings extends React.Component<Props, {}> {

  constructor(props: Props) {
    super(props);
    this._done = this._done.bind(this);
  }

  _done(settings: Settings) {
    this.props.dispatch(setFilter({
      accountId: this.props.accountId,
      keywords: settings.filter
    }));
    this.props.done();
  }

  render() {
    return (
        <AddEditForm done={this._done} doneLink={'/'}/>
    );
  }
}

const mapStateToProps = (state: AppState): Props => createStructuredSelector({
  accountId: selectAccount()
}) as any;

export default connect(mapStateToProps)(AddSettings);