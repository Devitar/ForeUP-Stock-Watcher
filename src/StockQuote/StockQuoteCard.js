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

            /**
             * 
             * @param {number} high 
             * @param {number} low 
             * @param {number} current 
             * @returns A number representing `current`'s position between `high` and `low`.
             */
            getArrowPositionPercent: (high, low, current) => ((current - low) / (high - low)) * 100,

            /**
             * 
             * @param {number} changePercent 
             * @returns A string representing a CSS class name indicating if the stock is up or down.
             * Will treat a 0% change as being down.
             */
            getIsUpClassName: (changePercent) => Number(changePercent.replace("%", "")) > 0 ? "is-up" : "is-down",
        };
    },
});
