import Ember from 'ember';
import moment from 'moment';

// const { get } = Ember;

export default Ember.Route.extend({
  model() {
    return this.get('store').createRecord('invoice', {
      'status': 'draft',
      'issuedDate': moment().toDate(),
      'serviceFromDate': moment().subtract(1, 'month').toDate(),
      'serviceToDate': moment().toDate(),
      'paymentDueDate': moment().add(1, 'month').toDate()
    });
  },

  renderTemplate() {
    this.render('invoices/form');
  },

  actions: {
    save(changeset) {
      return changeset.save().then(() => this.transitionTo('invoices'));
    },

    cancel() {
      return this.transitionTo('invoices');
    }
  }
});
