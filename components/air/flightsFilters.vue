// 机票列表筛选 

<template>
    <div class="filters">
        <el-row type="flex" class="filters-top" justify="space-between" align="middle">
            <el-col :span="8">
                单程： 
                {{data.info.departCity}} - {{data.info.destCity}} 
                / 
                {{data.info.departDate}}
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
                    <el-option
                    v-for="(item,index) in data.options.airport"
                    :key='index'
                    :label="item"
                    :value="item"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="flightTimes"  placeholder="起飞时间" @change="handleFlightTimes">
                    <el-option
                    v-for="(item,index) in data.options.flightTimes"
                    :key="index"
                    :label="`${item.from}:00-${item.to}:00`"
                    :value="`${item.from},${item.to}`"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="company"  placeholder="航空公司" @change="handleCompany">
                    <el-option
                    v-for="(item,index) in data.options.company"
                    :key="index"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
                    <el-option
                    v-for="(item,index) in airSizeList"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <div class="filter-cancel">
            筛选：
            <el-button 
                       type="primary" 
                       round 
                       plain 
                       size="mini" 
                       @click="handleFiltersCancel">
                撤销
    		</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            airport: "",        // 机场
            flightTimes: "",    // 出发时间
            company: "",        // 航空公司
            airSize: "",        // 机型大小
            // 机型列表
            airSizeList: [
                { label: "土豪版", value: "L" },
                { label: "标配版", value: "M"},
                { label: "乞丐版", value: "S" },
            ]
        }
    },
    // 子组件接收父组件的属性
    props:{
        data:{
            type:Object,
            default:{}
        }
    },
    methods: {
        // 选择机场时候触发
        handleAirport(value){
            const arr=this.data.flights.filter(item=>{
                return item.org_airport_name==value
            })
            // 将子组件的事件传递给父组件
            this.$emit('getNewData',arr)
        },

        // 选择出发时间时候触发
        handleFlightTimes(value){
            const [from,to]=value.split(',')
            const arr=this.data.flights.filter(item=>{
                const start=item.dep_time.split(':')[0]
                return start>=from&&start<to
            })
                        // 将子组件的事件传递给父组件
            this.$emit('getNewData',arr)
        },

         // 选择航空公司时候触发
        handleCompany(value){
            const arr=this.data.flights.filter(item=>{
                return item.airline_name==value
            })
                                    // 将子组件的事件传递给父组件
            this.$emit('getNewData',arr)
        },

         // 选择机型时候触发
        handleAirSize(value){
           const arr=this.data.flights.filter(item=>{
               return item.plane_size==value
           })
                                               // 将子组件的事件传递给父组件
            this.$emit('getNewData',arr)
        },
        
        // 撤销条件时候触发
        handleFiltersCancel(){
                        // 恢复条件选项
            this.airport = "";       // 机场
            this.flightTimes = "";  // 出发时间
            this.company = "";     // 航空公司
           this. airSize = "";     // 机型大小

            //恢复数据
            this.$emit("getNewData",this.data.flights);
        },
    },
    mounted(){

    }
}
</script>

<style scoped lang="less">
    .filters{
        margin-bottom:20px;
    }

    .filters-top{
        > div{
            /deep/ .el-select{
                margin-left:10px;
            }
        }
    }

    .filter-cancel{
        margin-top:10px;
    }
</style>