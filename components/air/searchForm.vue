<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item,index) in tabs"
        :key="index"
        @click="handleSearchTab(item,index)"
        :class="{active:index===currentTab}"
      >
        <i class="el-icon-s-promotion"></i>
        {{item.name}}
      </span>
    </el-row>

    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions: 当每次在输入框中输入文字时候会触发该事件 -->
        <!-- select：选中下拉列表的选项时候触发的事件 -->
        <el-autocomplete
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
          class="el-autocomplete"
          v-model="form.departCity"
          ref="focus"
        ></el-autocomplete>
      </el-form-item>

      <el-form-item label="到达城市">
        <el-autocomplete
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          class="el-autocomplete"
          v-model="form.destCity"
        ></el-autocomplete>
      </el-form-item>

      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          type="date"
          placeholder="请选择日期"
          style="width: 100%;"
          @change="handleDate"
          v-model="form.departDate"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        { icon: "el-icon-s-promotion", name: "单飞" },
        { icon: "el-icon-s-promotion", name: "双飞" }
      ],
      currentTab: 0,
      // 表单数据
      form: {
        departCity: "",
        departCode: "",
        destCity: "",
        destCode: "",
        departDate: ""
      }
    };
  },
  methods: {
    handleSearchTab(item, index) {
      this.currentTab = index;
    },
    // 获取出发城市框输入值时出发的函数
    // value输入框的值
    // callback回调函数,必须调用,接收参数为固定,必须为一个数组,每一项值必须为对象,对象里必须含有value属性
    queryDepartSearch(value, callback) {
      if (!value) {
        return callback([]);
      }
      this.$axios({
        url: "http://157.122.54.189:9095/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        // console.log(111,res)
        const newData = [];
        res.data.data.forEach(arr => {
          arr.value = arr.name.slice(0, -1);
          newData.push(arr);
          // console.log(newData)
        });
        // 当用户未选择值,则默认给它设置第一个选项为选中

        callback(newData);
      });
    },
    // 目标城市输入值时触发的函数
    queryDestSearch(value2, callback2) {
      if (!value2) {
        return callback2([]);
      }
      this.$axios({
        url: "http://157.122.54.189:9095/airs/city",
        params: {
          name: value2
        }
      }).then(res => {
        // console.log(res)
        const newData2 = [];
        res.data.data.forEach(arr2 => {
          arr2.value = arr2.name.slice(0, -1);
          newData2.push(arr2);
          // console.log(newData2)
        });
        callback2(newData2);
      });
    },
    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
      // console.log(item)
      // 将修改后的城市名称赋值给出发城市
      this.form.departCity = item.value;
      // 获取到出发城市的代码,赋值给出发城市代码
      this.form.departCode = item.sort;
    },

    // 目标城市下拉选择时触发
    handleDestSelect(item) {
      // 将修改后的城市名称赋值给到达城市
      this.form.destCity = item.value;
      // 获取到到达城市的代码,赋值给到达城市代码
      this.form.destCode = item.sort;
    },

    // 确认选择日期时触发
    handleDate(value) {
      // element.ui已有封装好的属性,将value-format设置为想要的事件格式,触发事件的参数格式与此一致
      // console.log(value);
      // console.log(this.form.departDate);
    },

    // 触发和目标城市切换时触发
    handleReverse() {},

    // 提交表单是触发
    handleSubmit() {
      //  表单验证
      if (this.form.departCode == "" || this.form.destCode == "") {
        this.$alert("请通过关键字搜索下栏中点击选择您的出发/目的城市", "温馨提示", {
          type: "warning"
        });
        return;
      }

      if (!this.form.departDate) {
        this.$alert("出发时间不能为空", "提示", {
          type: "warning"
        });
        return;
      }

      this.$router.push({
        path: "/air/flights",
        query: this.form
      });

      // 设置本地数据存储
      const arr=[...this.$store.state.air.myhistory]
      arr.unshift(this.form)
      if(arr.length>5){
        arr.length=5
      }
      this.$store.commit('air/setHistory',arr)
      // console.log(this.$store)
    }
  },
  mounted() {
    // 钩子函数自动获取焦点
    this.$refs.focus.focus();
  }
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>

