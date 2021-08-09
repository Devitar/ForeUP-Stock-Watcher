import Marionette from 'backbone.marionette';
import template from './StockQuoteCard.html';
import _ from 'underscore';
import './stock-quote-card.scss'

export const StockQuoteView = Marionette.View.extend({
    className: "stock-card",
    template: _.template(template),

    initialize: function() {
        _.bindAll(this, 'template');
    },

    /**
     *
     * @param {String} value
     * @returns {*}
     */
    formatMoney: function(value) {
        // TODO - complete the format money method, don't just return the input.
        return value
    }
})