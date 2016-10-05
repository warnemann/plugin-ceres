var ResourceService       = require("services/ResourceService");
var NotificationService = require("services/NotificationService");
var ModalService        = require("services/ModalService");

Vue.component("add-to-basket", {

    template: "#vue-add-to-basket",

    props: [
        "basketItem",
        "baseUrl"
    ],

    data: function()
    {
        return {
            quantity: 1
        };
    },

    methods: {

        /**
         * Add an item to the basket
         * @param quantity
         */
        addToBasket: function(quantity)
        {
            var addItemModal = ModalService.findModal($(this.$el.parentElement));

            addItemModal.setTimeout(10000);
            $(".wrapper-bottom").append(addItemModal.getModalContainer());

            ResourceService
              .getResource("basketItems")
              .push({variationId: this.basketItem.variationBase.id, quantity: this.quantity})
              .done(function()
            {
                  addItemModal.show();
              })
              .fail(function()
              {
                  NotificationService.error(Translations.Callisto.basketItemNotAdded).closeAfter(10000);
              });
        },

        /**
         * Increase the item quantity by 1
         */
        quantityPlus: function()
        {
            this.quantity++;
        },

        /**
         * Decrease the item quantity by 1
         */
        quantityMinus: function()
        {
            if (this.quantity > 1)
            {
                this.quantity--;
            }
        }
    }
});
