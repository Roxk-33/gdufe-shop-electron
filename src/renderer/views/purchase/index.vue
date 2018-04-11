<template>
  <div class="dashboard-container">
    <component :is="currentRole"></component>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import stockerDashboard from './stocker'

export default {
  name: 'dashboard',
  components: { adminDashboard, stockerDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (!this.roles.includes('manager') && !this.roles.includes('admin') ) {
      this.currentRole = 'stockerDashboard'
    }
  }
}
</script>
