<template>
  <div class="p-4">
    <p v-if="title" class="text-md font-bold mb-1">{{ title }}</p>
    <button @click="startCheckout" type="button" :class="'inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md focus:outline-none transition ease-in-out duration-150' + classes.button">
      {{ buttonText }}
    </button>
  </div>
</template>

<script>
import {loadStripe} from '@stripe/stripe-js';

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
  },
  computed: {
    classes() {
      return {
        button:'focus:border-' + this.color + '-300 text-' + this.color + '-700 bg-' + this.color + '-100 hover:bg-' + this.color + '-50 focus:shadow-outline-' + this.color + ' active:bg-' + this.color + '-200'
      }
    }
  },
  mounted() {
    this.startSession()
  },
  data() {
    return {
      sessionId: null
    }
  },
  methods: {
    startSession() {
      console.log('should start session here.');
    },
    async startCheckout() {
      const stripe = await loadStripe('pk_test_gFWgejrEFQU3q4FeV0GjLatz00yDQ8BagV');

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

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
