<template>
  <div class="tasks">

<p>Tasks working?</p>



</div>
</template>

<script>

import axios from 'axios';


export default {
  name: 'Tasks',


}
</script>

<style>
.table-fixed thead {
  width: 97%;
}
.table-fixed tbody {
  height: 230px;
  overflow-y: auto;
  width: 100%;
}
.table-fixed thead, .table-fixed tbody,
.table-fixed tr, .table-fixed td, .table-fixed th {
  display: block;
}
.table-fixed tbody td, .table-fixed thead > tr> th {
  float: left;
  border-bottom-width: 0;
}
</style>
