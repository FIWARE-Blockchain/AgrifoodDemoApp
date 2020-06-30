<template>
  <div class="row">
    <div class="col">
      <div v-if="data.errorMessage" class="alert alert-danger" role="alert">{{data.errorMessage}}</div>
      <div v-if="data.infoMessage" class="alert alert-success" role="alert">{{data.infoMessage}}</div>
      <div class="table-responsive">
        <h1>REWE Store</h1>
        <br />
        <br />
        <table v-if="!data.viewtrace" class="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Description</th>
              <th scope="col">Tracebility</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(asset, index) in data.assets" :key="index">
              <td>{{asset.name}}</td>
              <td>{{asset.type}}</td>
              <td>{{asset.description}}</td>
              <td>
                <button
                  type="button"
                  @click="viewTrace()"
                  class="btn btn-success float-left"
                >Buy Now</button>
                <button
                  type="button"
                  @click="viewTrace(asset.id)"
                  class="btn btn-danger float-right"
                >View Trace</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="data.viewtrace" class="row">
        <div class="col-md-12 col-lg-12">
          <div id="tracking-pre"></div>
          <div id="tracking">
            <div class="text-center tracking-status-intransit">
              <p class="tracking-status text-tight">Tracebility</p>
            </div>
            <div v-for="(asset, index) in data.tracedproduct" :key="index" class="tracking-list">
              <div class="tracking-item">
                <div class="tracking-icon status-intransit">
                  <svg
                    class="svg-inline--fa fa-circle fa-w-16"
                    aria-hidden="true"
                    data-prefix="fas"
                    data-icon="circle"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    data-fa-i2svg
                  >
                    <path
                      fill="currentColor"
                      d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"
                    />
                  </svg>
                  <!-- <i class="fas fa-circle"></i> -->
                </div>
                <div class="tracking-content">
                    <h3>ID : {{asset.id}}</h3>
                    <br>
                    <h3>TYPE : {{asset.type}}</h3>
                    <br>
                    <h3>NAME : {{asset.name}}</h3>
                    <br>
                    <h3>DESCRIPTION : {{asset.description}}</h3>
                    <br>
                    <h3>OWNER : {{asset.owner}}</h3>
                    <br>
                    <h3>PARENT PRODUCT: {{asset.hasAgriProductTypeParent}}</h3>
                    <br>
                    <h3>OWNER ACCOUNT ADDRESS : {{asset.address}}</h3>
                    <br>
                    <h3>TRANSACTION HASH : {{asset.transactionHash}}</h3>
                    <br>
                </div>
              </div>
            </div>
          </div>
        </div>
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
        errorMessage: "",
        infoMessage: "",
        viewtrace: false,
        tracedproduct: []
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
            "/v2/entities?type=AgriProductType&options=keyValues"
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
    },
    viewTrace(id) {
      axios
        .get(config.config.ORION + "/v2/entities/" + id + "?options=keyValues")
        .then(res => {
          this.data.tracedproduct.push(res.data);
          if (res.data.hasAgriProductTypeParent) {
            return axios.get(
              config.config.ORION +
                "/v2/entities/" +
                res.data.hasAgriProductTypeParent +
                "?options=keyValues"
            );
          }
        })
        .then(res => {
          this.data.tracedproduct.push(res.data);
          this.data.viewtrace = true;
          console.log('tracedproduct', JSON.stringify(this.data.tracedproduct));
        });
    },
    close() {
      this.data.tracedproduct = [];
      this.data.viewtrace = false;
    }
  }
};
</script>
<style scoped>
.tracking-detail {
  padding: 3rem 0;
}
#tracking {
  margin-bottom: 1rem;
}
[class*="tracking-status-"] p {
  margin: 0;
  font-size: 1.1rem;
  color: #fff;
  text-transform: uppercase;
  text-align: center;
}
[class*="tracking-status-"] {
  padding: 1.6rem 0;
}
.tracking-status-intransit {
  background-color: #65aee0;
}
.tracking-status-outfordelivery {
  background-color: #f5a551;
}
.tracking-status-deliveryoffice {
  background-color: #f7dc6f;
}
.tracking-status-delivered {
  background-color: #4cbb87;
}
.tracking-status-attemptfail {
  background-color: #b789c7;
}
.tracking-status-error,
.tracking-status-exception {
  background-color: #d26759;
}
.tracking-status-expired {
  background-color: #616e7d;
}
.tracking-status-pending {
  background-color: #ccc;
}
.tracking-status-inforeceived {
  background-color: #214977;
}
.tracking-list {
  border: 1px solid #e5e5e5;
}
.tracking-item {
  border-left: 1px solid #e5e5e5;
  position: relative;
  padding: 2rem 1.5rem 0.5rem 2.5rem;
  font-size: 0.9rem;
  margin-left: 3rem;
  min-height: 5rem;
}
.tracking-item:last-child {
  padding-bottom: 4rem;
}
.tracking-item .tracking-date {
  margin-bottom: 0.5rem;
}
.tracking-item .tracking-date h3 {
  color: #888;
  font-size: 85%;
  padding-left: 0.4rem;
}
.tracking-item .tracking-content {
  padding: 0.5rem 0.8rem;
  background-color: #f4f4f4;
  border-radius: 0.5rem;
}
.tracking-item .tracking-content h3 {
  display: block;
  color: #888;
  font-size: 85%;
}
.tracking-item .tracking-icon {
  line-height: 2.6rem;
  position: absolute;
  left: -1.3rem;
  width: 2.6rem;
  height: 2.6rem;
  text-align: center;
  border-radius: 50%;
  font-size: 1.1rem;
  background-color: #fff;
  color: #fff;
}
.tracking-item .tracking-icon.status-sponsored {
  background-color: #f68;
}
.tracking-item .tracking-icon.status-delivered {
  background-color: #4cbb87;
}
.tracking-item .tracking-icon.status-outfordelivery {
  background-color: #f5a551;
}
.tracking-item .tracking-icon.status-deliveryoffice {
  background-color: #f7dc6f;
}
.tracking-item .tracking-icon.status-attemptfail {
  background-color: #b789c7;
}
.tracking-item .tracking-icon.status-exception {
  background-color: #d26759;
}
.tracking-item .tracking-icon.status-inforeceived {
  background-color: #214977;
}
.tracking-item .tracking-icon.status-intransit {
  color: #e5e5e5;
  border: 1px solid #e5e5e5;
  font-size: 0.6rem;
}
@media (min-width: 992px) {
  .tracking-item {
    margin-left: 10rem;
  }
  .tracking-item .tracking-date {
    position: absolute;
    left: -10rem;
    width: 7.5rem;
    text-align: right;
  }
  .tracking-item .tracking-date h3 {
    display: block;
  }
  .tracking-item .tracking-content {
    padding: 0;
    background-color: transparent;
  }
}
</style>