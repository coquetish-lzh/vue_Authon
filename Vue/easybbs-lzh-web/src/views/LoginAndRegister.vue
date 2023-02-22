<template>
  <div>
    <Diolog 
    :show="dialogConfig.show"
    :title="dialogConfig.title"
    :buttons="dialogConfig.buttons"
    width="400px"
    :showCancel="false"
    @click="dialogConfig.show=true">
    <el-form
      class="login-register"
      :model="formData"
      :rules="rules"
      ref="formDataRef"
    >
    <!--input输入-->
      <el-form-item  prop="email" size="small" >
        <el-input 
        size="default"
        clearable 
        placeholder="请输入邮箱"
         v-model="formData.email"
         maxLength="150"
         >
        <template #prefix>
          <span class="iconfont icon-account"></span>
        </template>
        </el-input>
      </el-form-item>
      <!--登录密码-->
      <el-form-item  prop="password" v-if="onType==1">
        <el-input 
        :type="passwordEyeType.passwordEyeOpen?'text':'password'"
        size="default"
        clearable 
        placeholder="请输入密码"
         v-model="formData.password"
         >
        <template #prefix>
          <span class="iconfont icon-password"></span>
        </template>
        <template #suffix>
            <span 
            @click="eyeChange('passwordEyeOpen')"
            :class="['iconfont', passwordEyeType.passwordEyeOpen? 'icon-eye':'icon-close-eye']"></span>
        </template>
        </el-input>
      </el-form-item>
      <!--注册-->
      <div v-if="onType==0  || onType==2">
        <el-form-item  prop="emailCode"  >
      <div class="send-email-panel">
        <el-input 
        size="default"
        placeholder="请输入邮箱验证码"
         v-model="formData.emailCode"
         >
        <template #prefix>
          <span class="iconfont icon-checkcode"></span>
        </template>
        </el-input>
        <el-button 
        type="primary" 
        size="default" 
        :color="formDataBtn.color" 
        :disabled="formDataBtn.disabled" 
        class="send-email-btn" 
        @click="showSendMailDiolog()"
        >{{formDataBtn.title}}
      </el-button>
      </div>
      <el-popover
          placement="left"
          :width="450"
          trigger="click"
    >
      <div>
        <p>1.检查邮箱地址是否正确？</p>
        <p>2.在垃圾箱中查找邮箱验证码</p>
        <p>3.在邮箱中的头像->设置->反垃圾->白名单->设置邮件地址白名单</p>
      </div>
      <template #reference>
          <span class="a-link" 
          :style="{'font-size':'13px'}"
          >未收到邮箱验证码？</span>
      </template>
    </el-popover>
    </el-form-item>
      <el-form-item  prop="nickName" v-if="onType==0">
        <el-input 
        size="default"
        clearable 
        placeholder="请输入昵称"
         v-model="formData.nickName"
         maxLength="20"
         >
        <template #prefix>
          <span class="iconfont icon-account"></span>
        </template>
        </el-input>
      </el-form-item>
    <!--密码输入-->
    <el-form-item  prop="registerPassword" >
        <el-input 
        :type="passwordEyeType.registerPasswordEyeOpen?'text':'password'"
        size="default"
        clearable 
        placeholder="请输入密码"
         v-model="formData.registerPassword"
         maxLength="18"
         >
        <template #prefix>
          <span class="iconfont icon-password"></span>
        </template>
        <template #suffix>
          <span 
          @click="eyeChange('registerPasswordEyeOpen')"
          :class="['iconfont', passwordEyeType.registerPasswordEyeOpen? 'icon-eye':'icon-close-eye']"></span>
        </template>
        </el-input>
      </el-form-item>
      <el-form-item  prop="reRegisterPassword" >
        <el-input 
        :type="passwordEyeType.reRegisterPasswordEyeOpen?'text':'password'"
        size="default"
        clearable 
        placeholder="请确认密码"
         v-model="formData.reRegisterPassword"
         maxLength="18"
         >
        <template #prefix>
          <span class="iconfont icon-password"></span>
        </template>
        <template #suffix>
          <span 
          @click="eyeChange('reRegisterPasswordEyeOpen')"
          :class="['iconfont', passwordEyeType.reRegisterPasswordEyeOpen? 'icon-eye':'icon-close-eye']"></span>
        </template>
        </el-input>
      </el-form-item>
      </div>
      <el-form-item  prop="checkCode" >
      <div class="check-code-panel">
        <el-input 
        size="default"
        clearable 
        placeholder="请输入验证码"
         v-model="formData.checkCode"
         >
        <template #prefix>
          <span class="iconfont icon-checkcode"></span>
        </template>
        </el-input>
        <img :src="checkCodeUrl" alt="" class="check-code" @click="changeCheckCode(0)">
      </div>
      </el-form-item>
      <el-form-item v-if="onType==1">
        <div class="rememberme-pancel">
          <el-checkbox v-model="formData.rememberMe" :indeterminate="false" @change="">记住我</el-checkbox>
        </div>
        <div class="no-account">
          <a href="javascript:void(0)" class="a-link" @click="showPancel(2)">忘记密码？</a>
          <a href="javascript:void(0)" class="a-link" @click="showPancel(0)">没有账号？</a>
        </div>
      </el-form-item>
      <el-form-item v-if="onType==0">
        <a href="javascript:void(0)" class="a-link" @click="showPancel(1)">已有账号？</a>
      </el-form-item>
      <el-form-item v-if="onType==2">
        <a href="javascript:void(0)" class="a-link" @click="showPancel(1)">去登录?</a>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="op-btn" @click="doSubmit">
          <span v-if="onType==0">注册</span>
           <span v-if="onType==1">登录</span>
           <span v-if="onType==2">重置密码</span>
        </el-button>
           
      </el-form-item>
      
    </el-form>
    </Diolog>
    <!--发送邮箱图片验证码-->
    <Diolog
      :show="dialogConfigMailCode.show"
      :title="dialogConfigMailCode.title"
      :buttons="dialogConfigMailCode.buttons"
      width="500px"
      :showCancel="false"
      @close="dialogConfigMailCode.show = false">
      <el-form
        :model="formDataSendMailCode"
        :rules="rules"
        ref="formDataSendMailCodeRef"
        label-width="80px"
      >
      <!--input输入-->
      <el-form-item label="邮箱">
        {{formData.email}}
      </el-form-item >
        <el-form-item label="验证码"  prop="checkCode" >
      <div class="check-code-panel">
        <el-input 
        size="default"
        clearable 
        placeholder="请输入验证码"
         v-model="formDataSendMailCode.checkCode"
         >
        <template #prefix>
          <span class="iconfont icon-checkcode"></span>
        </template>
        </el-input>
        <img :src="changeCheckCodeMailCode" alt="" class="check-code" @click="changeCheckCode(1)">
      </div>
      </el-form-item>
      <!--   -->
      </el-form>
    </Diolog>
  </div>
</template>

<script setup>
import {ref,reactive,getCurrentInstance,nextTick} from "vue"; 
import {useRouter,useRoute} from "vue-router"
import md5 from 'js-md5'
import {useStore} from 'vuex'
const {proxy} =getCurrentInstance();
const router=useRouter();
const route=useRoute();
const store=useStore()
const api={
  checkCode:"/api/checkCode",
  sendEmailCode:"/sendEmailCode", 
  register:"/register",
  login:"/login",
  resetPwd:'/resetPwd'
}
//0注册，1登录,2找回密码
  const onType=ref();

  const showPancel = (type)=>{
    onType.value = type
    reserForm()
  }

  const formDataSendMailCode = ref({});
  const formDataSendMailCodeRef = ref();
  const dialogConfigMailCode = reactive({
    show: false,
    title: "标题",
    buttons:[{
      type:"primary",
      text:"发送验证码",
      size:'default',
      click:()=>{
        sendEmailCode()
      }
    }]
  });//发送邮箱验证码
  const showSendMailDiolog=()=>{
    formDataRef.value.validateField("email",(valid)=>{
      if(!valid){
        return
      }
      dialogConfigMailCode.show= true
      nextTick(()=>{
        changeCheckCode(1);
        formDataSendMailCodeRef.value.resetFields()
        formDataSendMailCode.value={
          email:formData.value.email
        }
      })
    })
     }
//按钮置灰60秒
let formDataBtn=reactive({
  disabled:false,
  color:'',
  title:'获取验证码',
  timer:60,
})
let counDouwInterval=null
const conutDouw=()=>{
   counDouwInterval=setInterval(()=>{
    formDataBtn.timer--
    formDataBtn.disabled=true
    formDataBtn.color="	#D3D3D3"
    formDataBtn.title='请'+formDataBtn.timer+'s后重新获取验证码'
      if(formDataBtn.timer<=0){
        clearInterval(counDouwInterval)
        formDataBtn.disabled=false
        formDataBtn.color=""
        formDataBtn.title='获取验证码'
      }
   },1000)
}     
//发送邮件验证码
const sendEmailCode=()=>{
    formDataSendMailCodeRef.value.validate(async (valid)=>{
      if(!valid){
        return
      }
      let params=Object.assign({},formDataSendMailCode.value)
      params.type=onType.value==0?0:1
      let result=await proxy.Request({
        url:api.sendEmailCode,
        params:params,
        errorCallback:()=>{
          changeCheckCode(1)
        }
      })
      if(!result){
        return;
      }
      proxy.Message.success('验证码发送成功,请在邮箱中查看')
      dialogConfigMailCode.show=false
      conutDouw()
    })
     }
  defineExpose({showPancel})
  const dialogConfig = reactive({
    show: false,
    title: "标题",
  });
  //校验
  const CheckRePassowrd=(rule,value,callback)=>{
    if(value!==formData.value.registerPassword){
      callback(new Error(rule.message))
    }else{
      callback()
    }
  }
  const formData = ref({});
  const formDataRef = ref();
  const rules = {
    email: [{ required: true, message: "请输入邮箱" },
            {validator:proxy.Verify.email,message:"请输入正确的邮箱"}
          ],
    password:[
            { required: true, message: "请输入密码" },
    ],
    emailCode:[
            { required: true, message: "请输入邮箱验证码" },
    ],
    nickName:[
            { required: true, message: "请输入昵称" },
    ],
    registerPassword:[
            { required: true, message: "请输入密码" },
            { validator:proxy.Verify.password,message:"8-18位，至少1个大写字母，1个小写字母，1个数字，1个特殊字符"}
    ],
    reRegisterPassword:[
            { required: true, message: "请输入二次密码" },
            { validator:CheckRePassowrd,message:"两次输入的密码不一致"},
    ],
    checkCode:[
            { required: true, message: "请图片验证码" },
    ],
  };

  //重置表单
  const reserForm=()=>{
    dialogConfig.show=true
    if(onType.value==0){
      dialogConfig.title='注册'
    }else if(onType.value==1){
      dialogConfig.title='登录'
    }else if(onType.value==2){
      dialogConfig.title='重置密码'
    }
    nextTick(()=>{
      changeCheckCode(0)
      formDataRef.value.resetFields();
      formData.value={}
      //登录
      if(onType.value==1){
        const cookieLoginInfo=proxy.VueCookies.get('loginInfo')
        if(cookieLoginInfo){
          formData.value=cookieLoginInfo
        }
      }
    })
  }

  //验证码
  const checkCodeUrl=ref(api.checkCode);
  const changeCheckCodeMailCode=ref(api.checkCode) 
  const changeCheckCode=(type)=>{
    if(type==0){
      checkCodeUrl.value=api.checkCode+"?type="+type+"&time="+new Date().getTime()
    }else{
      changeCheckCodeMailCode.value=api.checkCode+"?type="+type+"&time="+new Date().getTime()
    }
    
  }

  //密码眼睛显示
  const passwordEyeType=reactive({
    passwordEyeOpen:false,
    registerPasswordEyeOpen:false,
    reRegisterPasswordEyeOpen:false, 
  });
  const eyeChange=(type)=>{
    passwordEyeType[type]=!passwordEyeType[type]
  }

  //登录注册修改密码
  const doSubmit=()=>{
    formDataRef.value.validate(async (volid)=>{
      if(!volid) return ;
      let params={}
      Object.assign(params,formData.value)
      //注册
      if(onType.value==0 || onType.value==2){
        params.password=params.registerPassword;
        delete params.reRegisterPassword
        delete params.registerPassword
      }
      if(onType.value==1){
        let cookieLoginInfo=proxy.VueCookies.get('loginInfo')
        let cookiePassword=cookieLoginInfo==null ?null:cookieLoginInfo.password
        if(params.password!=cookiePassword){
          params.password=md5(params.password)
        }
      }
      let url=null
      if(onType.value==0){
        url=api.register
      }else if(onType.value==1){
        url=api.login
      }else if(onType.value==2){
        url=api.resetPwd
      }
      console.log(params)
      let result=await proxy.Request({
        url: url,
        params: params,
        errorCallback:()=>{
          changeCheckCode(0)
        }
      })
      if(!result) return;
      //注册返回
      if(onType.value==0){
        proxy.Message.success('注册成功，请登录')
        showPancel(1)
      }else if(onType.value==1){
        if(params.rememberMe){
          const loginInfo={
          email:params.email,
          password:params.password,
          rememberMe:params.rememberMe
        }
          proxy.VueCookies.set('loginInfo',loginInfo,'7d')
        }else{
          proxy.VueCookies.remove('loginInfo')
        }
        dialogConfig.show=false;
        proxy.Message.success('登陆成功')
        store.commit('updateLoginUserInfo',result.data)

      }else if(onType.value==2){
        proxy.Message.success('密码修改成功，请返回登录')
        showPancel(1)
      }
    })
  }
</script>

<style lang="scss" scoped>
.login-register{
  .send-email-panel{
    display: flex;
    width: 100%;
    justify-content: space-between;
    .send-email-btn{
      margin-left: 10px;
    }
  }
  .rememberme-pancel{
    width:100%;
  }
  .no-account{
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .op-btn{
    width: 100%;
  }
  p{
    font-size: 13px;
    background-color: #cdbfbf;
    color: #67676c;
  }
}

.check-code-panel{
    display: flex;
    .check-code{
      margin-left: 10px;
      cursor: pointer;
    }
  }
</style>
