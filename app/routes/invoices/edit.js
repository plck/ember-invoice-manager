import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.get('store').findRecord('invoice', params.invoice_id);
  },

  renderTemplate() {
    this.render('invoices/form');
  },

  actions: {
    willTransition(transition) {
      if (this.get('controller.model.hasDirtyAttributes') && 
          !confirm('Are you sure you want to leave? Your changes will be lost.')) {
        transition.abort();
      } else {
        return true;
      }
    },
    
    save(model) {
      this.controller.set('isProcessing', true);
      model.save().then(() => {
        Ember.run.later((() => {
          this.controller.set('isProcessing', false);
          this.transitionTo('invoices');
        }), 200);
      });
    },

    cancel(model) {
      model.rollbackAttributes();
      return this.transitionTo('invoices');
    },

    delete(record) {
      this.send('deleteInvoice', record);
      return this.transitionTo('invoices');
    }
  }
});
