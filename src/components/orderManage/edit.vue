<template>
  <div style="margin-top: 15px;">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
<!--        <el-form-item label="预定编号" prop="id">-->
<!--            <el-input v-model="ruleForm.id"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="预定房间编号" prop="originalRoomId">
            <el-input  v-model="ruleForm.originalRoomId"></el-input>
        </el-form-item>
        <el-form-item label="押金" prop="deposit">
            <el-input  v-model="ruleForm.deposit"></el-input>
        </el-form-item>
        <el-form-item label="预定人" prop="residents">
            <el-input  v-model="ruleForm.residents"></el-input>
        </el-form-item>
        <el-form-item label="证件类型" prop="credentialsType">
            <el-input  v-model="ruleForm.credentialsType"></el-input>
        </el-form-item>
        <el-form-item label="证件号" prop="credentialsNum">
            <el-input  v-model="ruleForm.credentialsNum"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
            <el-input  v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="抵店时间" prop="arrivalTime">
<!--          <el-date-picker-->
<!--            v-model="ruleForm.arrivalTime"-->
<!--            type="datetime"-->
<!--            aria-label="抵店时间"-->
<!--            itemprop="arrivalTime"-->
<!--            @change="ruleForm.arrivalTime"-->
<!--            placeholder="选择日期时间">-->
<!--          </el-date-picker>-->
          <el-input  v-model="ruleForm.arrivalTime"></el-input>
        </el-form-item>
        <el-form-item label="离店时间" prop="leaveTime">
<!--          <el-date-picker-->
<!--            v-model="ruleForm.leaveTime"-->
<!--            type="datetime"-->
<!--            aria-label="离店时间"-->
<!--            itemprop="leaveTime"-->
<!--            @change="ruleForm.leaveTime"-->
<!--            placeholder="选择日期时间">-->
<!--          </el-date-picker>-->
            <el-input  v-model="ruleForm.leaveTime"></el-input>
        </el-form-item>
        <el-form-item label="入住人数" prop="personNum">
          <el-input  v-model="ruleForm.personNum"></el-input>
        </el-form-item>
        <el-form-item label="会员编号" prop="memberId">
            <el-input  v-model="ruleForm.memberId"></el-input>
        </el-form-item>
<!--        <el-form-item label="预定状态" prop="bookStatus">-->
<!--            <el-input  v-model="ruleForm.bookStatus"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="备注" prop="remarks">
            <el-input  v-model="ruleForm.remarks"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">{{buttonText}}</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        </el-form>
  </div>
</template>

<script>
  export default {
      inject:['reload'],
      props:["id"],
    data () {
        name:"orderManageedit"
      return {
          ruleForm:{
            id:"",
            orderManagename:"",
            originalRoomId:"",
            deposit:"",
            residents:"",
            credentialsType:"",
            credentialsNum:"",
            phone:"",
            arrivalTime:"",
            leaveTime:"",
            personNum:"",
            memberId:"",
            bookStatus:"",
            remarks:""
          },
          rules: {
            orderManagename: [
                { required: true, message: '请输入商品类型名称', trigger: 'blur' },
                { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
            ]

        },
        buttonText:"创建"

      }
    },
    created(){
        if(this.id){
             this.get("orderManage/getOne",(data)=>{
                this.ruleForm=data;
                console.log(this.ruleForm);
            },{id:this.id});
            this.buttonText="修改"
        }

    },
    components: {

    },
    methods:{
        resetForm(formName){
             this.$refs[formName].resetFields();
        },
        submitForm(formName){
            let url="";
            if(this.id)
                url="orderManage/update";
            else
                url="orderManage/add";
            this.post(formName,url,this.ruleForm);
        }

    }
  }
</script>

<style scoped>


</style>
