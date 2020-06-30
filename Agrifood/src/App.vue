<template>
  <div>
    <!-- Nav bar -->
    <nav class="navbar navbar-dark bg-primary justify-content-between flex-nowrap flex-row">
      <div class="container">
        <a class="navbar-brand float-left">Agrifood Supply Chain</a>
        <ul class="nav navbar-nav flex-row float-right">
              <li class="nav-item">
            <router-link class="nav-link pr-3" to="/">Info</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/farm">FF Farm (Food Producer)</router-link>
          </li>
              <li class="nav-item">
            <router-link class="nav-link pr-3" to="/manufacturer">BIO Past (Manufacturer)</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/distributor">REWE (distributor)</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Router view -->
    <div class="container mt-5">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
.table {
  font-size: 14px;
  table-layout: fixed;
}
.td {
  white-space: normal !important; 
  word-wrap: break-word;  
}
</style>