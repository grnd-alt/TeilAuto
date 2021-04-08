<script>
import VueCharts from 'vue-chartjs'  // eslint-disable-line no-unused-vars
import { Bar, Line } from 'vue-chartjs'// eslint-disable-line no-unused-vars


export default {
    name:"testchart",
    mixins:[Line],
    props:["data"],
    mounted(){
      this.renderChart(this.data,this.options);
    }
}
</script>
<style>

</style>
