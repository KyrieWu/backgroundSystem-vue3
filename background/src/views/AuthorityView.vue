<template>
  <div>
    <el-tree
      :data="list"
      show-checkbox
      node-key="roleId"
      :check-strictly="true"
      :default-checked-keys="[5]"
      :props="{
        children: 'roleList',
        label: 'name',
      }"
    />
    <el-button @click="changeAuthority">更改</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import { useRoute } from "vue-router";
import { InitData } from "../type/authority";
import { getAuthoritys } from "../request/api";

export default defineComponent({
  setup() {
    const route = useRoute();
    const params: any = route.params;
    const data = reactive(new InitData(params.id, params.authority));

    onMounted(() => {
      getAuthoritys().then((res) => {
        data.list = res.data;
      });
    });

    const changeAuthority = () => {
      //传给后台
    };
    return { ...toRefs(data), changeAuthority };
  },
});
</script>

<style scoped></style>
