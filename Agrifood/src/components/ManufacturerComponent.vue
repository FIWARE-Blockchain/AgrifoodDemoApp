<template>
  <div class="row">
    <div class="col">
      <div v-if="data.errorMessage" class="alert alert-danger" role="alert">{{data.errorMessage}}</div>
      <div v-if="data.infoMessage" class="alert alert-success" role="alert">{{data.infoMessage}}</div>
      <div class="table-responsive">
        <h1>Bio Pasta</h1>
        <button type="button" @click="AddAsset()" class="btn btn-primary float-right">Add New</button>
        <br />
        <br />
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Description</th>
              <th scope="col">Parent Product</th>
              <th scope="col">Address</th>
              <th scope="col">Transaction Hash</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(asset, index) in data.assets" :key="index">
              <td>
                <div class="card">{{asset.id}}</div>
              </td>
              <td>{{asset.name}}</td>
              <td>{{asset.type}}</td>
              <td>{{asset.description}}</td>
              <td>
                <div class="card">{{asset.hasAgriProductTypeParent}}</div>
              </td>
              <td>
                <div class="card">{{asset.address}}</div>
              </td>
              <td>
                <div class="card">{{asset.transactionHash}}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import config from "../config";

export default {
  data() {
    return {
      data: {
        assets: [],
        parentAssets: "",
        errorMessage: "",
        infoMessage: ""
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.data.errorMessage = "";
      this.data.infoMessage = "";
      axios
        .get(
          config.config.ORION +
            "/entities?type=AgriProductType&options=keyValues"
        )
        .then(res => {
          res.data.forEach(element => {
            if (element.owner === "bio_pasta") {
              this.data.assets.push(element);
            }
          });
        })
        .catch(err => {
          this.data.errorMessage = JSON.stringify(err);
        });
      axios
        .get(
          config.config.ORION +
            "/entities?type=AgriProductType&options=keyValues"
        )
        .then(res => {
          this.data.parentAssets = res.data;
        })
        .catch(err => {
          this.data.errorMessage = JSON.stringify(err);
        });
    },
    AddAsset() {
      let option = [];
      this.data.parentAssets.forEach(element => {
        option.push({ text: element.id, value: element.id });
      });
      let m = this.$modals.open({
        title: "Add New Asset",
        theme: "mojave",
        items: [
          {
            name: "id",
            type: "text",
            value: "urn:ngsi-ld:AgriProductType:" + this.$uuid.v4()
          },
          {
            label: "type",
            name: "type",
            type: "text",
            value: "AgriProductType"
          },
          {
            label: "name",
            name: "name",
            type: "text",
            value: ""
          },
          {
            label: "description",
            name: "description",
            type: "textarea",
            value: ""
          },
          {
            label: "hasAgriProductTypeParent",
            name: "hasAgriProductTypeParent",
            type: "select",
            value: "t1",
            options: option
          }
        ]
      });

      m.onsave(m => {
        let payload = {
          id: m.getItems()[0].value,
          type: m.getItems()[1].value,
          name: { value: m.getItems()[2].value },
          description: { value: m.getItems()[3].value },
          owner: { value: "bio_pasta" },
          hasAgriProductTypeParent: {
            type: "Relationship",
            value: m.getItems()[4].value
          },
          address: { value : "null"},
          transactionHash: { value : "null"}
        };
        axios
          .post(config.config.ORION + "/entities", payload)
          .then(res => {
            console.log("res", JSON.stringify(res));
            if (res.status == 201) {
              this.init();
              this.data.infoMessage = "Asset is created";
            } else {
              this.data.errorMessage = "Asset is not created";
            }
          })
          .catch(err => {
            this.data.errorMessage = err;
          });
        m.close();
      });
    }
  }
};
</script>