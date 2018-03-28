<template>
    <datepicker :readonly="true" format="YYYY-MM-DD"></datepicker>
    <!-- <datepicker format="YYYY-M-D" value="2015-9-5"></datepicker>
    <datepicker :readonly="true" format="MMM/D/YYYY" width="300px"></datepicker> -->
</template>

<script>
import datepicker from 'vue-date-picker';

export default {
  name: 'DatePicker',
    components: { datepicker }
};
</script>
