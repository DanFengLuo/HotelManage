<template>
  <div>
    <div style="margin-top: 15px;">
      <el-row>
        <el-col :span="2"><el-button type="primary" @click="add">添加</el-button></el-col>
        <el-col :span="22">
          <el-input placeholder="请输入商品名称" v-model="search.goodsName" class="input-with-select" style="width: 200px">
            <el-button slot="append" icon="el-icon-search" @click="findData"></el-button>
          </el-input>
          <el-select v-model="search.goodsTypeid" filterable placeholder="请选择商品类型" style="width: 200px"  @change="findData">
          <el-option
            v-for="item in goodsTypes"
            :key="item.id"
            :label="item.goodsTypename"
            :value="item.id">
          </el-option>
        </el-select>
        </el-col>
      </el-row>
    </div>



    <el-table
      :data="tableData.list"
      border
      style="width: 100%;">
      <el-table-column
        prop="id"
        width="70"
        label="编号">
      </el-table-column>
      <el-table-column
        prop="currentRoomId"
        label="房间编号">
      </el-table-column>
      <el-table-column
        prop="bookStatus"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="roomTypeId"
        label="房间类型">
      </el-table-column>
      <el-table-column
        prop="normalPrice"
        label="标准价">
      </el-table-column>
      <el-table-column
        prop="discountPrice"
        label="折后价">
      </el-table-column>
      <el-table-column
        prop="deposit"
        label="押金">
      </el-table-column>
      <el-table-column
        prop="residents"
        label="入住人">
      </el-table-column>
      <el-table-column
        prop="credentialsType"
        label="证件类别">
      </el-table-column>
      <el-table-column
        prop="credentialsNum"
        label="证件号码">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="联系电话">
      </el-table-column>
      <el-table-column
        prop="arrivalTime"
        label="抵店时间">
      </el-table-column>
      <el-table-column
        prop="leaveTime"
        label="离店时间">
      </el-table-column>
      <el-table-column
        prop="personNum"
        label="入住人数">
      </el-table-column>
      <el-table-column
        prop="userId"
        label="操作员">
      </el-table-column>
      <el-table-column
        prop="memberId"
        label="会员编号">
      </el-table-column>
      <el-table-column
        prop="memberPrice"
        label="会员价">
      </el-table-column>
      <el-table-column
        prop="breakfast"
        label="提供早餐">
      </el-table-column>
      <el-table-column
        prop="timedWakeup"
        label="定时叫醒">
      </el-table-column>
      <el-table-column
        prop="remarks"
        label="备注">
      </el-table-column>
<!--      <el-table-column-->
<!--        prop="active"-->
<!--        label="删除状态">-->
<!--      </el-table-column>-->
      <el-table-column
        prop="createDate"
        label="创建时间">
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
          <el-button type="text" size="small" @click="del(scope.row)">{{deltext(scope.row.active)}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="tableData.total"
      :current-page="this.queryParams.pageNo"
      :page-size="this.queryParams.pageSize"
      @current-change="changePageNo">
    </el-pagination>
  </div>
</template>

<script>
  import EditOrderlist from '@/components/orderlist/edit'
  export default {
    inject:['reload'],
    name:"ordermanage",
    data () {
      return {
        search:{
          id:"",
          originalRoomId:"",
          currentRoomId:"",
          bookStatus:"",
          roomTypeId:"",
          normalPrice:"",
          discountPrice:"",
          deposit:"",
          residents:"",
          credentialsType:"",
          credentialsNum:"",
          phone:"",
          arrivalTime:"",
          leaveTime:"",
          personNum:"",
          userId:"",
          memberId:"",
          memberPrice:"",
          breakfast:"",
          timedWakeup:"",
          remarks:"",
          active:"",
          createDate:"",
          // rooms:"",
          // leaguer:""
        },
        queryParams:{
          pageNo:1,
          pageSize:10,
          id:"",
          originalRoomId:"",
          currentRoomId:"",
          bookStatus:"",
          roomTypeId:"",
          normalPrice:"",
          discountPrice:"",
          deposit:"",
          residents:"",
          credentialsType:"",
          credentialsNum:"",
          phone:"",
          arrivalTime:"",
          leaveTime:"",
          personNum:"",
          userId:"",
          memberId:"",
          memberPrice:"",
          breakfast:"",
          timedWakeup:"",
          remarks:"",
          active:"",
          createDate:"",
          // rooms:"",
          // leaguer:""
        },
        tableData:{}
      }
    },
    created(){
      this.getData();
    },
    watch:{
      queryParams:{
        handler:function(){
          this.getData();
        },
        deep:true
      }
    },
    mounted(){},
    methods:{
      getData(){
        this.get("orderManage/list",(data)=>{
          this.tableData=data;
        },this.queryParams);
        // this.get("orderManage/getAll",(data)=>{
        //   this.goodsTypes=data;
        // });
      },
//        activeformat(row, column, cellValue, index){
//          return cellValue==0?"失效":"有效";
//        },
      changePageNo(i){
        this.queryParams.pageNo=i;
      },
      findData(){
        this.queryParams.pageNo=1;
        this.merge(this.search,this.queryParams);
      },
      add(){
        this.$layer.iframe({
          content: {
            content: EditOrderlist, //传递的组件对象
            parent: this,//当前的vue对象
            data:{}//props
          },
          area:['800px','600px'],
          title: '添加商品类型',
          shadeClose: false,
          shade :true
        });
      },
      edit(row){
        this.$layer.iframe({
          content: {
            content: EditOrderlist, //传递的组件对象
            parent: this,//当前的vue对象
            data:{id:row.id}//props
          },
          area:['800px','600px'],
          title: '修改商品',
          shadeClose: false,
          shade :true
        });
      },
      del(row){
        this.delete("orderManage/del",row.id,row.active);
      },
      deltext(active){
        return active==1?"删除":"恢复"
      }
    }
  }
</script>

<style>
  .el-table .cell {
    text-align: center;
  }
</style>
