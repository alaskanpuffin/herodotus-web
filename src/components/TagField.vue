<template>
  <select ref="tagfield" multiple></select>
</template>

<script>
import $ from "jquery";
import axios from "axios";
import Configuration from "@/configuration.js";
import contrast from "contrast";
require("selectize");

const apiRoot = Configuration.value("apiRoot");

export default {
  name: "TagField",
  props: ["tags"],
  methods: {
    color: function (color) {
      if (!color || contrast(color) === "light") {
        return "#000";
      } else {
        return "#fff";
      }
    },
  },
  data: function () {
    return {
      selectize: null,
    };
  },
  mounted() {
    var config = {
      headers: {
        Authorization: "Token " + this.$cookies.get("token"),
      },
    };
    this.selectize = $(this.$refs.tagfield).selectize({
      searchField: "title",
      labelField: "title",
      valueField: "url",
      placeholder: 'Tags',
      render: {
        item: (item, escape) => {
          if (!item.color) {
            item.color = "#E6E6E6";
          }
          return (
            "<div style='background-color: " +
            escape(item.color) +
            "; color: " +
            this.color(item.color) +
            ";'>" +
            escape(item.title) +
            "</div>"
          );
        },
      },
      create: function (input, callback) {
        var data = {
          title: input,
        };
        axios
          .post(`${apiRoot}/tag/`, data, config)
          .then((response) => {
            var results = {
              id: response.data.id,
              url: response.data.url,
              title: input,
            };
            return callback(results);
          })
          .catch((error) => {
            console.log(error);
            return callback();
          });
      },
      load: function (query, callback) {
        if (!query.length) return callback();
        axios
          .get(`${apiRoot}/tag/?search=${query}`)
          .then((response) => {
            return callback(response.data);
          })
          .catch(() => {
            callback();
          });
      },
      onChange: (value) => {
        this.$emit("updateTags", value);
      },
    });
    this.tags.forEach((data) => {
      this.selectize[0].selectize.addOption({
        title: data.title,
        color: data.color,
        url: data.url,
        id: data.id,
      });
      this.selectize[0].selectize.addItem(data.url);
    });
    this.selectize[0].selectize.refreshItems();
  },
  watch: {
    tags: function () {
      if (this.tags.length == 0) {
        this.selectize[0].selectize.clear();
      }
    },
  },
};
</script>