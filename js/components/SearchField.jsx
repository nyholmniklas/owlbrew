import React from 'react';

export default class SearchField extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        this.props.onUserInput(
            this.searchField.value
        );
    }

    render() {
        return (
            <div className="ui input">
                <form>
                    <input type="text" ref={(input) => {this.searchField = input;}} onChange={this.handleChange}
                           value={this.props.searchText}/>
                </form>
            </div>
        );
    }
}

SearchField.propTypes = {
    searchText: React.PropTypes.string.isRequired,
    onUserInput: React.PropTypes.func
};