<template>
  <div class="container">
    <div class="login-container" v-if="flag">
        <div class="login-box">

          <el-form ref="loginForm" :model="loginForm" label-width="60px" class="demo-ruleForm">
            <h3 style="text-align: center;">悦读中文网</h3>
              <el-form-item label="账号:" prop="username" :rules="[{ required: true, message: '请输入账号', trigger: 'blur' }]">
                <el-input v-model="loginForm.username"></el-input>
              </el-form-item>
              <el-form-item label="密码:" prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
                <el-input v-model="loginForm.password" type="password"></el-input>
              </el-form-item>
              <el-form-item  prop="xieyi" :rules="[{type: 'array',required: true, message: '请选择协议',  trigger: 'change' }]">
                <el-checkbox v-model="loginForm.xieyi" name="xieyi"></el-checkbox>
                <span>我已阅读并同意用户协议和隐私条款</span>
              </el-form-item>
              <el-form-item>
                <el-button :loading="isActive" :disabled="isActive" style="width:100%;margin-left: -30px;margin-top: 20px;" type="primary" @click="login('loginForm')">登录</el-button>
                <div style="text-align: center;margin-left:-70px">免费注册</div>
              </el-form-item>
          </el-form>
        </div>
    </div>
    <div class="register" v-if="zhuce">
      <el-form :model="loginForm"  ref="loginForm" label-width="85px" class="demo-ruleForm">
        <h3 style="text-align: center;">悦读中文网</h3>
        <el-form-item label="账号:" prop="username" :rules="[{ required: true, message: '请输入账号', trigger: 'blur' }]">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" prop="password2" :rules="[{ required: true, message: '请再次输入密码', trigger: 'blur' }]">
          <el-input v-model="loginForm.password2" type="password"></el-input>
        </el-form-item>
        <el-form-item style="margin-left: -30px;" prop="xieyi" :rules="[{type: 'array',required: true, message: '请选择协议',  trigger: 'change' }]">
          <el-checkbox v-model="loginForm.xieyi" name="xieyi"></el-checkbox>
          <span>我已阅读并同意用户协议和隐私条款</span>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%;margin-left: -30px;" type="primary" @click="submitForm('loginForm')">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div  v-if="xinxi">
<!--      <div>个人信息</div> -->
      <el-dialog title="个人信息" class="version-msg" center :visible.sync="xinxi"  v-if="xinxi" width="300" :close-on-click-modal="false" custom-class="setCommonTallHeight">
        <div>
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="label-style">昵称：</div>
            </el-col>
            <el-col :span="10">
              <el-input size='small' v-model="dataList.name" clearable  placeholder="请输入内容">
              </el-input>
            </el-col>
          </el-row>
          <el-row :gutter="10" style="margin: 10px 0;">
            <el-col :span="8">
              <div class="label-style">邮箱：</div>
            </el-col>
            <el-col :span="10">
              <el-input size='small' v-model="dataList.mailbox" clearable  placeholder="请输入内容">
              </el-input>
            </el-col>
          </el-row>
          <el-row :gutter="10" style="margin: 10px 0;">
            <el-col :span="8">
              <div class="label-style">手机号码：</div>
            </el-col>
            <el-col :span="10" style="margin-top: 10px;">
                <el-input size='small' v-model="dataList.number" clearable  placeholder="请输入内容">
                </el-input>
              </el-input>
            </el-col>
          </el-row>
          <el-row :gutter="10" style="margin: 10px 0;">
            <el-col :span="8">
              <div class="label-style">性别：</div>
            </el-col>
            <el-col :span="10" style="margin-top: 10px;">
                <el-radio v-model="dataList.radio" label="1">男</el-radio>
                <el-radio v-model="dataList.radio" label="2">女</el-radio>
              </el-input>
            </el-col>
          </el-row>
          <el-row :gutter="10" style="margin: 10px 0;">
            <el-col :span="8">
              <div class="label-style">出生日期：</div>
            </el-col>
            <el-col :span="10">
              <el-date-picker type="date" placeholder="选择日期" v-model="dataList.date" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-row>
          <el-row :gutter="10" style="margin: 10px 0;">
            <el-col :span="8">
              <div class="label-style">个人简介：</div>
            </el-col>
            <el-col :span="10">
              <el-input size='small' v-model='dataList.remark'  show-word-limit :rows="2"  clearable placeholder="请输入内容"></el-input>
            </el-col>
          </el-row>

        </div>
        <div style="text-align:center;margin-top: 20px;">
          <el-button type="primary" plain @click="saveDataFn()">保存</el-button>
          <el-button type="primary" plain @click="cancleDataFn()">跳过</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import '@/assets/js/gt.js'
export default {
    data () {
      return {
        isActive: false,
        catObj: null,
        dataList: {
          name:'',
          number:'',
          radio:'1',
          date:'',
          mailbox:'',
          remark:'',
        },
        flag:false,
        zhuce:true,
        xinxi:false,
        ruleForm: {},
        // rules:'',
        loginForm: {
          password: '',// 密码
          password2:'',
          username: '', // 账号
          xieyi: [] // 协议
        }
      }
    },
    methods:{
      // 登录方法
      login(formName) {
        this.$refs[formName].validate((valid) => {
                 if (valid) {
                   // 判断极验窗口存在就直接使用
                   if (this.catObj !== null) {
                     return this.catObj.verify() // 显示窗口
                     // console.log(this)
                   }

                   // 登录按钮禁用、等待
                   this.isActive = true

                   let pro = this.$http.get(`/captchas/${this.loginForm.username}`)
                   pro
                     .then(result => {
                       // 对data进行解构赋值
                       let { data } = result.data
                       window.initGeetest({
                         gt: data.gt,
                         challenge: data.challenge,
                         offline: !data.success,
                         new_captcha: true,
                         product: 'bind'
                       }, captchaObj => {
                         captchaObj.onReady(() => {
                           // 验证码ready之后才能调用verify方法显示验证码
                           // 生成窗口
                           captchaObj.verify()
                           // 把窗口对象赋予给ctaObj对象
                           this.catObj = captchaObj

                           // 登录按钮状态恢复
                           this.isActive = false
                         }).onSuccess(() => {
                           // 人的行为正确，登录后台系统
                           // this.loginAct()
                         }).onError(() => {

                         })
                       })
                     })

                     .catch(err => {
                       return this.$message.error('验证错误' + err)
                     })
                   // console.log(1234)
                   // this.zhuce = false;
                   // this.xinxi = true;
                 } else {
                   console.log('error submit!!');
                   return false;
                 }
               });
      },
      // 注册方法
      submitForm(formName) {
         this.$refs[formName].validate((valid) => {
                  if (valid) {

                    if(this.loginForm.password != this.loginForm.password2) {
                      this.$message({
                        type: "error",
                        message: "两次输入密码不一致，请重新输入！"
                      });
                      return
                    }
                    // let pa                           
                    // this.$http.post("/register",)

                    this.zhuce = false;
                    this.xinxi = true;
                  } else {
                    console.log('error submit!!');
                    return false;
                  }
                  // return
                });

      },
      // 个人信息保存方法
      saveDataFn() {

      },
      // 个人信息跳过
      cancleDataFn() {
        this.xinxi = false;
        this.$router.push('/home')
      },
    }
}
</script>

<style lang="less" scoped>
 .setCommonTallHeight {
    height: 50%;
  }
  	.label-style {
  		display: inline-block;
  		height: 40px;
  		line-height: 40px;
  		text-align: right;
  		width: 100%;
  	}
.container {
  background-image: url('./login_bg.jpg');
  background-size: cover;
    height:100%;
    // background-color: gray;
    display:flex;
    justify-content: center;
    align-items: center;
}
.login-container{
  height:100%;
  // background-color: gray;
  display:flex;
  justify-content: center;
  align-items: center;
  .login-box{
      width:450px;
      height:345px;
      background-color: #fff;
      display:flex;
      justify-content: center;
      align-items: center;
      .el-form{
        width:75%;
      }
  }
}

  .register{
      width:450px;
      height:400px;
      background-color: #fff;
      display:flex;
      justify-content: center;
      align-items: center;
      .el-form{
        width:75%;
      }
  }

</style>
