<template>
  <div>
    <h1>Files on temp directory!</h1>
      <span v-if="error">{{error}}</span>
      <ul v-if="items && items.length">
          <li v-for="(item, key) in items" :key="key">
              <div>
                  <span>
                        {{item.fullPath}}
                  </span>
                  <button @click="testFile(item)">Test</button>
                  <span v-if="item.status">{{item.status}}</span>
              </div>
          </li>
      </ul>
  </div>
</template>

<script>
import * as _ from 'lodash';

export default {
    data () {
        return {
            items: [],
            error: null,
        }
    },

    mounted () {
            this.items = Meteor.call('getTempFiles', (error, result) => {
                if(error) {
                    this.error = error;
                    return;
                }
                this.items = result.map(r => ({...r, status: null}));
            });
    },

    methods: {
        testFile(item){
            this.updateStatus(item.filename, 'Testing');
            Meteor.call('testFile', item.filename, (error, result) => {
                if(error) {
                    this.error = error;
                    return;
                }
                this.updateStatus(item.filename, result);
            });
        },

        updateStatus(filename, status) {
            const index = _.findIndex(this.items, (item) => item.filename === filename);
            if (index === -1) return;
            this.items[index].status = status;
            this.items = [...this.items];
        }
    }
}
</script>

<style>
  body {
    font-family: sans-serif;
    padding: 10px;
  }
  ul > li {
      margin: 16px 0;
  }
  ul > li span {
      margin-right: 16px;
  }
</style>
