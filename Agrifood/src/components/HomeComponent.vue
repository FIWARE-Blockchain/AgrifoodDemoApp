<template>
  <div class="row">
    <div class="col">
      <div class="table-responsive">
        <h3 class="text-center">DLT/Blockchain Type: {{dlt_type}}</h3>
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">User</th>
              <th scope="col">Account Address</th>
              <th scope="col">Account Private Key</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ff_farm.name}}</td>
              <td>
                <div class="card">{{ff_farm.account}}</div>
              </td>
              <td>
                <div class="card">{{ff_farm.key}}</div>
              </td>
            </tr>
            <tr>
              <td>{{bio_pasta.name}}</td>
              <td>
                <div class="card">{{bio_pasta.account}}</div>
              </td>
              <td>
                <div class="card">{{bio_pasta.key}}</div>
              </td>
            </tr>
            <tr>
              <td>{{rewe.name}}</td>
              <td>
                <div class="card">{{rewe.account}}</div>
              </td>
              <td>
                <div class="card">{{rewe.key}}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import storage from "../services/storage";
import config from "../config";

export default {
  created() {
    this.dlt_type = config.config.DLT_TYPE;
    this.ff_farm.name = "FF Farm";
    this.ff_farm.account = storage.getItem(config.keys.ff_farm_account_address);
    this.ff_farm.key = storage.getItem(config.keys.ff_farm_account_private_key);
    this.bio_pasta.name = "BIO Pasta";
    this.bio_pasta.account = storage.getItem(
      config.keys.bio_pasta_account_address
    );
    this.bio_pasta.key = storage.getItem(
      config.keys.bio_pasta_account_private_key
    );
    this.rewe.name = "REWE";
    this.rewe.account = storage.getItem(config.keys.rewe_account_address);
    this.rewe.key = storage.getItem(config.keys.rewe_account_private_key);
  },
  data() {
    return {
      dlt_type: "",
      ff_farm: {
        account: "",
        key: "",
        name: ""
      },
      bio_pasta: {
        account: "",
        key: "",
        name: ""
      },
      rewe: {
        account: "",
        key: "",
        name: ""
      }
    };
  }
};
</script>