import React from 'react';
import ReactDOM from 'react-dom';
import reactMixin from 'react-mixin';
import update from 'react-addons-update';
import _ from 'underscore';
import CardStore from './stores/CardStore.js';
import DeckStore from './stores/DeckStore.js';
import CardActions from './Actions.js';
import Deck from './components/Deck.jsx';
import SearchBar from './components/SearchBar.jsx';
import SearchResults from './components/SearchResults.jsx';

class OwlbrewApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deck: DeckStore.getDeck(),
            cards: CardStore.getCards(),
            searchResultsScroll: 0
        };
        this.storeDidChange = this.storeDidChange.bind(this);
        this.onSearchResultsScroll = this.onSearchResultsScroll.bind(this);
        this.searchCards = this.searchCards.bind(this);
    }

    isMounted() {
        return this.mounted;
    }

    storeDidChange() {
        this.setState(update(this.state, {
            deck: {$set: DeckStore.getDeck()},
            cards: {$set: CardStore.getCards()},
            searchResultsScroll: {$set: 0}
        }));
    }

    onSearchResultsScroll(scroll) {
        this.setState(update(this.state, {
            searchResultsScroll: {$set: scroll}
        }));
    }

    searchCards(searchText, searchOracleText, searchSubtypeText, manaParams) {
        CardActions.updateCards(searchText, searchOracleText, searchSubtypeText, manaParams);
    }

    render() {
        return (
            <div className="ui grid app">
                <SearchBar searchCards={this.searchCards} deck={this.state.deck}
                           downloadDeckCallback={CardActions.downloadDeck}/>
                <SearchResults ref="searchResults" cards={this.state.cards}
                               cardClickedCallback={CardActions.addCardToDeck}
                               scroll={this.state.searchResultsScroll} onScroll={this.onSearchResultsScroll}/>
                <Deck cards={this.state.deck.cards} cardClickedCallback={CardActions.removeCardfromDeck}/>
            </div>
        );
    }

    componentWillMount() {
        this.mounted = false;

    }

    componentDidMount() {
        this.mounted = true;
        const initManaParams = {
            white: false,
            blue: false,
            black: false,
            red: false,
            green: false
        };
        this.searchCards = _.debounce(this.searchCards, 200);
        this.searchCards('', '', '', initManaParams);
    }
}

reactMixin(OwlbrewApp.prototype, CardStore.mixin);
reactMixin(OwlbrewApp.prototype, DeckStore.mixin);

ReactDOM.render(<OwlbrewApp />, document.getElementById('app-container'));