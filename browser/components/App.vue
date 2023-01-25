<template>
    <div>
      <H3box/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import H3box from './H3Box.vue';

export default defineComponent({
  components: {
    "H3box": H3box,
  },
  props: {
  },
  setup(props) {
  }
})
</script>