<template>
  <div style="margin-top: 15px;">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
<!--        <el-form-item label="预定编号" prop="id">-->
<!--            <el-input v-model="ruleForm.id"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="预定房间编号" prop="originalRoomId">
          <el-select v-model="ruleForm.originalRoomId" filterable placeholder="请选择预定房间号" style="width: 200px"  >
            <el-option
              v-for="item in rooms"
              :key="item.id"
              :label="item.id"
              :value="item.id">
            </el-option>
          </el-select>
         <!-- <el-select v-model="ruleForm.originalRoomId" placeholder="请选择预定房间号">
            <el-option v-for="entry in rooms" :label="entry.id" :value="entry.id" :key="entry.id"></el-option>
          </el-select>-->
           <!-- <el-input  v-model="ruleForm.originalRoomId"></el-input>-->
        </el-form-item>
        <el-form-item label="押金" prop="deposit">
          <el-input   v-model.number="ruleForm.deposit" size="medium" type="number" :max="99999999" ></el-input>
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
          <el-date-picker
            v-model="ruleForm.arrivalTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions0"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="离店时间" prop="leaveTime">
            <el-date-picker
              v-model="ruleForm.leaveTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="pickerOptions1"
              placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="入住人数" prop="personNum">
          <el-input   v-model.number="ruleForm.leaguerScore" size="medium" type="number" :max="9999" ></el-input>
        </el-form-item>
        <el-form-item label="会员编号" prop="memberId">
          <el-select v-model="ruleForm.memberId" filterable placeholder="请选择预定会员编号" style="width: 200px"  >
            <el-option
              v-for="item in leaguers"
              :key="item.id"
              :label="item.id"
              :value="item.id">
            </el-option>
          </el-select>
          <!--<el-select v-model="ruleForm.memberId" placeholder="请选择会员编号">
            <el-option v-for="entry in leaguers" :label="entry.id" :value="entry.id" :key="entry.id"></el-option>
          </el-select>-->
            <!--<el-input  v-model="ruleForm.memberId"></el-input>-->
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
      /*验证手机号*/
      let checkPhone = (rule, value, callback) => {
        const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
        if (!value) {
          return callback(new Error("电话号码不能为空"))
        }
        setTimeout(() => {
          // Number.isInteger是es6验证数字是否为整数的方法,但是我实际用的时候输入的数字总是识别成字符串
          // 所以在前面加了一个+实现隐式转换
          if (!Number.isInteger(+value)) {
            callback(new Error("请输入数字值"))
          } else {
            if (phoneReg.test(value)) {
              callback()
            } else {
              callback(new Error("电话号码格式不正确"))
            }
          }
        }, 100)
      };
      /*验证身份证号*/
      let checkcredentialsNum = (rule, value, callback) => {
        const credentialsNumReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
        if (!value) {
          return callback(new Error("身份证不能为空"))
        }
        setTimeout(() => {
          // Number.isInteger是es6验证数字是否为整数的方法,但是我实际用的时候输入的数字总是识别成字符串
          // 所以在前面加了一个+实现隐式转换
          if (!Number.isInteger(+value)) {
            callback(new Error("请输入数字值"))
          } else {
            if (credentialsNumReg.test(value)) {
              callback()
            } else {
              callback(new Error("身份证号格式不正确"))
            }
          }
        }, 100)
      };
      return {
        rooms:[],
        leaguers:[],
          ruleForm:{
            id:"",
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
        /*时间选择 */
        // pickerOptions0: {
        //   disabledDate(time) {
        //     return time.getTime() < Date.now();
        //   }
        // },
        pickerOptions0: {
          disabledDate: (time) => {
            if (this.ruleForm.leaveTime != "") {
              return  time.getTime() >(new Date(this.ruleForm.leaveTime).getTime())- 8.64e7||Date.now()>time.getTime() ;
            }else{
              return time.getTime()<Date.now();
            }
          },
        },
        pickerOptions1: {
          disabledDate: (time) => {
            if (this.ruleForm.arrivalTime !== "") {
              return time.getTime() < (new Date(this.ruleForm.arrivalTime).getTime())+24 * 3600 * 1000;
            }else{
              return time.getTime()<Date.now();
            }
          }
        },


        rules: {
          /*验证手机号*/
        phone: [
          { required: true, trigger: 'blur',validator: checkPhone }//设置全局变量
        ],
        credentialsNum: [
          { required: true, trigger: 'blur',validator: checkcredentialsNum }//设置全局变量
        ],

        },
        buttonText:"创建"

      }
    },
    created(){
        /*获取所有的房间编号*/
      this.get("orderManage/getAllRoomsAndLeaguers",(data)=>{
        this.rooms=data.rooms;
        this.leaguers=data.leaguers;
      });
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
