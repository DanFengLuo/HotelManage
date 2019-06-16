<template>
  <div style="margin-top: 15px;">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="客房类型" prop="roomTypeid">
          <el-select v-model="ruleForm.roomTypeid" placeholder="客房类型">
            <el-option v-for="entry in guestTypes" :label="entry.typeName" :value="entry.id" :key="entry.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客房状态" prop="status">
            <el-input   v-model="ruleForm.status"></el-input>
        </el-form-item>
        <el-form-item label="楼层" prop="floorId">
        <el-select v-model="ruleForm.floorId" placeholder="请选择楼层信息">
        <el-option v-for="entry in floors" :label="entry.floorName" :value="entry.id" :key="entry.id"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="标准价格" prop="normalPrice">
          <el-input   v-model="ruleForm.normalPrice"></el-input>
        </el-form-item>
        <el-form-item label="折后价" prop="discountPrice">
          <el-input   v-model="ruleForm.discountPrice"></el-input>
        </el-form-item>
        <el-form-item label="普通会员价" prop="gvipPrice">
          <el-input   v-model="ruleForm.gvipPrice"></el-input>
        </el-form-item>
        <el-form-item label="Vip会员价" prop="svipPrice">
          <el-input   v-model="ruleForm.svipPrice"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
            <el-input type="textarea"  v-model="ruleForm.remarks"></el-input>
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
        name:"roomsedit"
      return {
          floors:[],
          guestTypes:[],
          ruleForm:{
            id:"",
            roomTypeid:"",
            status:"",
            floorId:"",
            normalPrice:"",
            discountPrice:"",
            gvipPrice:"",
            svipPrice:null,
            remarks:""
          },
          rules: {
//            roomType: [
//                { required: true, message: '请输入商品名称', trigger: 'blur' },
//                { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
//            ]
        },
        buttonText:"创建"

      }
    },
    created(){
        this.get("rooms/getAllFloor",(data)=>{
          this.floors=data;
        });
      this.get("rooms/getAllGuestType",(data)=>{
        this.guestTypes=data;
      });
        if(this.id){
             this.get("rooms/getOne",(data)=>{
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
            if(this.id){
              url="rooms/update";
              this.post(formName,url,this.ruleForm);
            }
            else{
              url="rooms/add";
              this.post(formName,url,this.ruleForm);
            }

        }
    }
  }
</script>

<style scoped>


</style>
