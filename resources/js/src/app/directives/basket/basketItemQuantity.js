import {floatLength}from "../../helper/number";

Vue.directive("basket-item-quantity",
    {
        update(el, binding)
        {
            const decimals = floatLength(binding.value);

            el.innerHTML = (binding.value || 0).toFixed(decimals).replace(".", App.decimalSeparator);
        }
    });
