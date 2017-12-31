import * as React from 'react';
import SearchBar from 'material-ui-search-bar';

export interface State {
    searchText: string;
}
  
export interface Props {
    search: (val: string) => void;
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
            <SearchBar
                style={this.props.style}
                onChange={this.onSearchChange}
                onRequestSearch={this.onRequestSearch}
            />
        );
    }
}

export default Search;