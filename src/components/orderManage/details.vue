<template>
  <div style="margin-top: 10px">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px"  class="demo-ruleForm">
        <el-form-item label="预定编号" prop="id">
           <el-input  v-model="ruleForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="预定房间编号" prop="originalRoomId">
           <el-input  v-model="ruleForm.originalRoomId" disabled></el-input>
        </el-form-item>
        <el-form-item label="押金" prop="deposit">
          <el-input  v-model="ruleForm.deposit" disabled></el-input>
        </el-form-item>
        <el-form-item label="预定人" prop="residents">
          <el-input  v-model="ruleForm.residents" disabled></el-input>
        </el-form-item>
        <el-form-item label="证件类型" prop="credentialsType">
          <el-input  v-model="ruleForm.credentialsType" disabled></el-input>
        </el-form-item>
        <el-form-item label="证件号" prop="credentialsNum">
          <el-input  v-model="ruleForm.credentialsNum" disabled></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input  v-model="ruleForm.phone" disabled></el-input>
        </el-form-item>
        <el-form-item label="抵店时间" prop="arrivalTime">
          <el-input  v-model="ruleForm.arrivalTime" disabled></el-input>
        </el-form-item>
        <el-form-item label="离店时间" prop="leaveTime">
          <el-input  v-model="ruleForm.leaveTime" disabled></el-input>
        </el-form-item>
        <el-form-item label="入住人数" prop="personNum">
          <el-input  v-model="ruleForm.personNum" disabled></el-input>
        </el-form-item>
        <el-form-item label="会员编号" prop="memberId">
          <el-input  v-model="ruleForm.memberId" disabled></el-input>
        </el-form-item>
        <!--        <el-form-item label="预定状态" prop="bookStatus">-->
        <!--            <el-input  v-model="ruleForm.bookStatus"></el-input>-->
        <!--        </el-form-item>-->
        <el-form-item label="备注" prop="remarks">
          <el-input  v-model="ruleForm.remarks" disabled></el-input>
        </el-form-item>
        </el-form>
  </div>
</template>
<script>
  export default {
      inject:['reload'],
      props:["id"],
    data () {
        name:"orderManagerdetails"
      return {
          disabled: true,
          ruleForm:{
            id:"",
            // orderManagename:"",
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
            remarks:"",
          },
      }
    },
    created(){
        if(this.id){
             this.get("orderManage/getOne",(data)=>{
                this.ruleForm=data;
                console.log(this.ruleForm);
            },{id:this.id});
        }
    },
    components: {

    },
    methods:{
    }
  };

</script>

<style scoped>


</style>
