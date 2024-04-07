import MainView from './Main/MainView';
import Marionette from 'backbone.marionette';
import './style.scss';
import { getGlobalQuoteBySymbol } from './StockQuote/StockQuoteService';
import {
    createFromGlobalQuote,
    StockQuoteCollection,
} from './StockQuote/StockQuoteModel';
import { StockQuoteCollectionView } from './StockQuote/StockQuoteCollectionView';

document.addEventListener('DOMContentLoaded', () => {

    // SETUP
    const StockWatcherApp = new Marionette.Application();
    StockWatcherApp.start();

    const mainView = new MainView()
    mainView.render();

    const stockQuoteCollection = new StockQuoteCollection();

    // Disabling to prevent API throttling
    // const globalQuotes = Promise.all(
    //     ['IBM', 'AAPL']
    //         .map(getGlobalQuoteBySymbol)
    // )
    //     .then(globalQuotes => stockQuoteCollection.add(globalQuotes.map(createFromGlobalQuote)));

    new StockQuoteCollectionView({el: '#stock-quotes', collection: stockQuoteCollection}).render();

    // UPDATE
    const addNewQuoteToCollection = (globalQuote, name) => {
        stockQuoteCollection.add(createFromGlobalQuote(globalQuote, name));
    }

    // Using test data, as the API now has a 25 requests per day limit, I hit it very quickly.
    const upTestData = {
        "01. symbol": "IBM",
        "02. open": "188.5900",
        "03. high": "190.3200",
        "04. low": "188.0200",
        "05. price": "189.1400",
        "06. volume": "2012428",
        "07. latest trading day": "2024-04-05",
        "08. previous close": "187.9400",
        "09. change": "1.2000",
        "10. change percent": "0.6385%"
    };
    const upTestData2 = {
        "01. symbol": "IBM2",
        "02. open": "188.5900",
        "03. high": "290.3200",
        "04. low": "8.0200",
        "05. price": "189.1400",
        "06. volume": "2012428",
        "07. latest trading day": "2024-04-05",
        "08. previous close": "187.9400",
        "09. change": "1.2000",
        "10. change percent": "0.6385%"
    };
    const downTestData = {
        "01. symbol": "300135.SHZ",
        "02. open": "2.4700",
        "03. high": "2.5100",
        "04. low": "2.3900",
        "05. price": "2.4400",
        "06. volume": "38891270",
        "07. latest trading day": "2024-03-01",
        "08. previous close": "2.4500",
        "09. change": "-0.0100",
        "10. change percent": "-0.4082%"
    };
    addNewQuoteToCollection(upTestData, "IBM (Test Data)");
    addNewQuoteToCollection(upTestData2, "IBM2 (Test Data)");
    addNewQuoteToCollection(downTestData, "SHZ (Test Data)");

    mainView.on('stockSearch', function(e) {
        const searchSymbol = e.symbol;
        getGlobalQuoteBySymbol(searchSymbol)
            .then(quote => {
                if (Object.keys(quote).length === 0) {
                    mainView.ui.stockSearchWarning.html('API returned no data, likely exceeded max requests.')

                    return;
                }
                addNewQuoteToCollection(quote);
            });
    });
});
