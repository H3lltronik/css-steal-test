<template>
  <div class="h3-box">
    <h1>Styles Stolen!</h1>

    <pre>{{formattedMatchingStyles}}</pre>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
const cssbeautify = require("cssbeautify");

export default defineComponent({
  props: {},
  setup(props) {},
  computed: {
    ...mapGetters({
      styles: "getStyles",
      matchingStyles: "getMatchingStyles",
      stringMatchingStyles: "getStringMatchingStyles",
    }),
    formattedMatchingStyles () {
        // @ts-ignore:next-line
        console.log("this.matchingStyles", this.stringMatchingStyles)
        if ( JSON.stringify(this.matchingStyles) == '{}' ) return ''
        // @ts-ignore:next-line
        return cssbeautify(this.stringMatchingStyles, {
            indent: '   ',
            openbrace: 'end-of-line',
            autosemicolon: true,
        });
    }
  },
});
</script>