import React from 'react';
import { Grid } from 'semantic-ui-react';

import SearchForm from '~/components/SearchBar.jsx';
import Cards from '~/components/Cards.jsx';
import CardActions from '~/Actions.js';

export default class MainArea extends React.Component {
    render() {
        let searchVisible = (this.props.mainAreaContent === 'search');
        let statsVisible = (this.props.mainAreaContent === 'stats');
        let visualDeckVisible = (this.props.mainAreaContent === 'visual-deck');

        return (
            <Grid className='mainArea'>
                {searchVisible ?
                    <Grid.Column width={3}>
                        <SearchForm searchCards={this.props.searchCards} searchParams={this.props.searchParams}
                                    deck={this.props.deck}
                                    downloadDeckCallback={CardActions.downloadDeck}/>
                    </Grid.Column>
                    : null}
                {searchVisible ?
                    <Grid.Column width={13}>
                        <Cards ref="searchResults" cards={this.props.cardSearchResults}
                                       cardClickedCallback={CardActions.addCardToDeck}/>
                    </Grid.Column>
                    : null}
                {visualDeckVisible ?
                    <Grid.Column width={16}>
                        <Cards ref="searchResults" cards={this.props.deck.cards}
                                       cardClickedCallback={CardActions.addCardToDeck}/>
                    </Grid.Column>
                    : null}


            </Grid >
        );
    }
}

MainArea.propTypes = {
    mainAreaContent: React.PropTypes.string.isRequired,
    searchCards: React.PropTypes.func.isRequired,
    deck: React.PropTypes.object.isRequired,
    cardSearchResults: React.PropTypes.array.isRequired,
    searchParams: React.PropTypes.object.isRequired
};