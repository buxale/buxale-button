<template>
  <div class="p-4">
    <p v-if="title" class="text-md font-bold mb-1">{{ title }}</p>
    <div class="mb-4" v-if="customAmount">
      <label for="amount" class="block text-sm font-medium leading-5 text-gray-700">{{customAmountText}}</label>
      <div class="mt-1 relative rounded-md shadow-sm">
        <input id="amount" v-model="customAmountInput" class="form-input block w-full sm:text-sm sm:leading-5" placeholder="10" />
      </div>
    </div>
    <button @click="startCheckout" type="button" :class="'inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md focus:outline-none transition ease-in-out duration-150' + classes.button">
      {{ buttonText }}
    </button>
  </div>
</template>

<script>
import {loadStripe} from '@stripe/stripe-js';
import axios from 'axios';

export default {
  name: 'App',
  props: {
    title: {
      required: false,
      type: String,
    },
    buttonText: {
      required: false,
      type: String,
      default: "Checkout mit buxale"
    },
    color: {
      required: false,
      default: 'teal'
    },
    amount: {
      required: false,
      type: Number
    },
    customAmount: {
      required: false,
      type: Boolean,
      default: false
    },
    customAmountText: {
      required: false,
      type: String,
      default: 'Gewünschter Gutschein-Betrag'
    },
    success_url: {
      type: String,
      required: true
    },
    cancel_url: {
      type: String,
      required: true
    },
    api_token: {
      type: String,
      required: true
    },
    ref_id: {
      type: String,
      required: false
    }
  },
  computed: {
    classes() {
      return {
        button:'focus:border-' + this.color + '-300 text-' + this.color + '-700 bg-' + this.color + '-100 hover:bg-' + this.color + '-50 focus:shadow-outline-' + this.color + ' active:bg-' + this.color + '-200'
      }
    }
  },
  data() {
    return {
      sessionId: null,
      customAmountInput: null
    }
  },
  methods: {
    async startSession() {
      let base_url = 'https://app.buxale.io/api/checkout-session?';
      //let base_url = 'http://buxale.test/api/checkout-session?';
      let AuthStr = 'Bearer '.concat(this.api_token); 

      // If we're in custom amount mode, use custom amount
      let amount = this.amount
      if(this.customAmount) {
        amount = this.customAmountInput
      }
      let url = base_url + 'amount=' + amount + '&success_url=' + this.success_url + '&cancel_url=' + this.cancel_url
      if(this.ref_id) {
        url =  url + '&ref_id=' + this.ref_id
      }

      let res = await axios.get(url, { headers: { Authorization: AuthStr }})
      this.sessionId = res.data;
    },
    async startCheckout() {
      const stripe = await loadStripe('pk_test_gFWgejrEFQU3q4FeV0GjLatz00yDQ8BagV');
      await this.startSession()
      stripe.redirectToCheckout({
        sessionId: this.sessionId
      }).then(function (result) {
        if(result.error && result.error.message) {
          alert(result.error.message);
        }
      });
    }
  }
}
</script>