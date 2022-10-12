<template>
  <div>
    <div>
      <el-form :inline="true" :model="selectData" class="demo-form-inline">
        <el-form-item label="标题">
          <el-input v-model="selectData.title" placeholder="请输入关键字" />
        </el-form-item>
        <el-form-item label="详情">
          <el-input v-model="selectData.introduce" placeholder="请输入关键字" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="dataList.comList" border style="width: 100%">
      <el-table-column prop="id" label="Id" width="180" />
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column prop="introduce" label="详情" />
    </el-table>
    <el-pagination
      @current-change="currentChange"
      @size-change="sizeChange(selectData.pagesize)"
      layout="prev, pager, next"
      :total="selectData.count * 2"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
  watch,
  onMounted,
} from "vue";
import { getGoodsList } from "../request/api";
import { InitData, ListInt } from "../type/goods";

export default defineComponent({
  setup() {
    const data = reactive(new InitData());

    onMounted(() => {
      getGoods();
    });

    const getGoods = () => {
      getGoodsList().then((res) => {
        data.list = res.data;
        data.selectData.count = res.data.length;
      });
    };

    const dataList = reactive({
      comList: computed(() => {
        return data.list.slice(
          (data.selectData.page - 1) * data.selectData.pagesize,
          data.selectData.page * data.selectData.pagesize
        );
      }),
    });

    const currentChange = (page: number) => {
      data.selectData.page = page;
    };
    const sizeChange = (pagesize: number) => {
      data.selectData.pagesize = pagesize;
    };

    const onSubmit = () => {
      // console.log(data.selectData.title);
      // console.log(data.selectData.introduce);
      let arr: ListInt[] = []; //定义数组，用来接收查询过后要展示的数据
      if (data.selectData.title || data.selectData.introduce) {
        if (data.selectData.title) {
          arr = data.list.filter((value) => {
            return value.title.includes(data.selectData.title);
          });
        }
        if (data.selectData.introduce) {
          arr = data.list.filter((value) => {
            return value.introduce.includes(data.selectData.introduce);
          });
        }
      } else {
        arr = data.list;
      }
      data.selectData.count = arr.length;
      data.list = arr;
    };

    watch(
      [() => data.selectData.title, () => data.selectData.introduce],
      () => {
        if (!data.selectData.title && !data.selectData.introduce) {
          getGoods();
        }
      }
    );

    return { ...toRefs(data), currentChange, sizeChange, dataList, onSubmit };
  },
});
</script>

<style scoped></style>
