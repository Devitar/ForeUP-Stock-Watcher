import Marionette from 'backbone.marionette';
import template from './StockQuoteCard.html';
import _ from 'underscore';
import './stock-quote-card.scss';

const usdFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export const StockQuoteCard = Marionette.View.extend({
    tagName: 'section',
    className: 'stock-card',
    template: _.template(template),

    templateContext() {
        return {
            /**
             * @param {number|string} value
             * @returns {*}
             */
            formatMoney: value => usdFormat.format(value),
        };
    },
});
