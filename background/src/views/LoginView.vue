<template>
  <div class="login-box">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号:" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="Age" prop="age">
        <el-input v-model.number="ruleForm.age" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >Submit</el-button
        >
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, reactive, toRefs, ref } from "vue";
import type { FormInstance } from "element-plus";

const data = reactive({
  ruleForm: {
    username: "",
    password: "",
  },
  rules: {
    username: [
      {
        required: true,
        messsage: "Please input activity name",
        trigger: "blur",
      },
      {
        min: 3,
        max: 5,
        message: "Length should be 3 to 5",
        trigger: "blur",
      },
    ],
    password: [
      {
        required: true,
        messsage: "Please input activity password",
        trigger: "blur",
      },
      {
        min: 3,
        max: 5,
        message: "Length should be 3 to 5",
        trigger: "blur",
      },
    ],
  },
});
</script>

<style lang="scss" scoped>
.login-box {
  width: 100vw;
  height: 100vh;
  background: url("../assets/jb.jpg") no-repeat center/cover;
}
</style>
