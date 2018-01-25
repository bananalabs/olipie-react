import * as React from 'react';
import { AppState, selectAccount } from '../App/model';
import { connect } from 'react-redux';
import { createStructuredSelector }  from 'reselect';
import { getFilter, updateFilter } from './actions';
import AddEditForm from './AddEditForm';
import { Settings, selectFilter } from './model';

export interface Props {
  accountId: string;
  filter: string;
  dispatch: (action: any) => void;
}

export class EditSettings extends React.Component<Props, {}> {

  constructor(props: Props) {
    super(props);
    this._done = this._done.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(getFilter({accountId: this.props.accountId}));
  }

  _done(settings: Settings) {
    this.props.dispatch(updateFilter({
      accountId: this.props.accountId,
      keywords: settings.filter
    }));
  }

  render() {
    const settings = {
      accountId: this.props.accountId,
      filter: this.props.filter
    };
    return (
        <AddEditForm settings={settings} done={this._done}/>
    );
  }
}

const mapStateToProps = (state: AppState): Props => createStructuredSelector({
  accountId: selectAccount(),
  filter: selectFilter()
}) as any;

export default connect(mapStateToProps)(EditSettings);