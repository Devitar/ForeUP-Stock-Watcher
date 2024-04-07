import Backbone from 'backbone';

export const StockQuoteModel = Backbone.Model.extend({
    idAttribute: 'symbol',
    defaults: {
        name: '',
        open: 0,
        high: 0,
        low: 0,
        price: 0,
        change: 0,
        percentChange: ''
    }
})

export const StockQuoteCollection = Backbone.Collection.extend({
    model: StockQuoteModel
})

export const createFromGlobalQuote = (globalQuote, name) => {
    return new StockQuoteModel({
        name: name ?? globalQuote["01. symbol"],
        symbol: globalQuote["01. symbol"],
        open: globalQuote["02. open"],
        high: globalQuote["03. high"],
        low: globalQuote["04. low"],
        price: globalQuote["05. price"],
        change: globalQuote["09. change"],
        changePercent: globalQuote["10. change percent"],
    });
};
