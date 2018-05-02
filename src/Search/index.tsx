import * as React from 'react';
import SearchBar from 'material-ui-search-bar';
import LinearProgress from 'material-ui/LinearProgress';

export interface State {
    searchText: string;
}
  
export interface Props {
    search: (val: string) => void;
    isSearching: boolean;
    style: {};
}

export class Search extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            searchText: ''
        };
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onRequestSearch = this.onRequestSearch.bind(this);
    }

    onSearchChange(value: string) {
        this.setState({searchText: value});
    }
    
    onRequestSearch() {
        this.props.search(this.state.searchText);
    }

    render() {
        return (
            <div style={this.props.style}>
                <SearchBar
                    onChange={this.onSearchChange}
                    onRequestSearch={this.onRequestSearch}
                />
                {this.props.isSearching && <LinearProgress color="red"/>}
            </div>
        );
    }
}

export default Search;