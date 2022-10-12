<template>
  <div class="login-box">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="80px"
      class="demo-ruleForm"
    >
      <h2>后台管理系统</h2>
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
      <el-form-item>
        <el-button
          class="login-Button"
          type="primary"
          @click="submitForm(ruleFormRef)"
          >登录</el-button
        >
        <el-button class="login-Button" @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from "vue";
import { LoginData } from "../type/login";
import type { FormInstance } from "element-plus";
import { login } from "../request/api";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const data = reactive(new LoginData());
    const ruleFormRef = ref<FormInstance>();
    const rules = {
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
          max: 16,
          message: "Length should be 3 to 16",
          trigger: "blur",
        },
      ],
    };

    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      //对表单的内容进行验证
      formEl.validate((valid) => {
        if (valid) {
          login(data.ruleForm).then((reslove) => {
            // 将token进行保存
            localStorage.setItem("token", reslove.data.token);
            router.push("/");
          });
        } else {
          console.log("error submit!");
          return false;
        }
      });
    };

    const resetForm = () => {
      data.ruleForm.username = "";
      data.ruleForm.password = "";
    };

    return {
      ...toRefs(data),
      rules,
      resetForm,
      ruleFormRef,
      submitForm,
    };
  },
});
</script>

<style lang="scss" scoped>
.login-box {
  width: 100vw;
  height: 100vh;
  background: url("../assets/jb.jpg") no-repeat center/cover;
  padding: 1px;
  text-align: center;

  .demo-ruleForm {
    width: 500px;
    background-color: white;
    margin: 200px auto;
    padding: 40px;
    border-radius: 20px;

    .login-Button {
      width: 48%;
    }
  }
  h2 {
    margin-bottom: 10px;
  }
}
</style>
