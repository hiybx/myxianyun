// 机票列表页
<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <div>
                    
                </div>
                
                <!-- 航班头部布局 -->
                <FlightsListHead/>
                
                
                <!-- 航班信息 -->
                <div>
                    <FlightsItem
                    v-for="(item,index) in dataList"
                    :key="index"
                    :data='item'/>

                    <!-- 分页 -->
                    <!-- @size-change：修改条数时候触发
                    @current-change：修改页数时候触发
                    current-page：当前页面
                    page-size：当前页面显示的条数
                    total：总条数 -->
                    <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageIndex"
                    :page-sizes="[2, 4, 6, 8]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                    </el-pagination>
                </div>
 
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
            </div>
        </el-row>
    </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead.vue"
import FlightsItem from "@/components/air/flightsItem.vue"

export default {
    data(){
        return {
            flightsData: {},//后台
            dataList:[],//航班列表数据
            // 当前页数
            pageIndex:1,
            // 显示条数
            pageSize:4,
            // 总条数
            total:0
        }
    },
    components:{
        FlightsListHead,
        FlightsItem
    },
    methods:{
        // 修改页数触发调用value为每页条数
        handleSizeChange(value){
            this.pageSize=value
            this.getData()
        },
        // 修改每页条数触发调用value为每页条数
        handleCurrentChange(value){
            this.pageIndex=value
            this.getData()
        },
        getData(){
            // console.log(this.$route.query)
            this.$axios({
                url:'/airs',
                params:this.$route.query
            }).then(res=>{
                console.log(res)
                // 保存总数据对象
                this.flightsData = res.data;
                // 总条数等于数据数组的长度
                this.total=this.flightsData.flights.length;
                // 修改dataList数据
                this.dataList=this.flightsData.flights.slice(
                    (this.pageIndex - 1) * this.pageSize,  
               (this.pageIndex  - 1) * this.pageSize + this.pageSize 
                )


            })
        }
    },
    mounted(){
        this.getData()
    }
}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    } 
</style>
