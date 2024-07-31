/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { VBtn } from 'vuetify/components/VBtn'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  aliases: {
    MyButton: VBtn,
    MyButtonAlt: VBtn,
  },
  theme: {
    defaultTheme: 'dark',
  },
})
