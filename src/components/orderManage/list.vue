<template>
  <div>
    <div style="margin-top: 15px;">
      <el-row>
        <el-col :span="2"><el-button type="primary" @click="add">添加</el-button></el-col>
        <el-col :span="22">
          <el-input placeholder="请输入预定编号" v-model="search.id" class="input-with-select" style="width: 200px">
            <el-button slot="append" icon="el-icon-search" @click="findData"></el-button>
          </el-input>
          <el-input placeholder="请输入房间编号" v-model="search.originalRoomId" class="input-with-select" style="width: 200px">
            <el-button slot="append" icon="el-icon-search" @click="findData"></el-button>
          </el-input>
          <el-input placeholder="请输入预定人姓名" v-model="search.residents" class="input-with-select" style="width: 200px">
            <el-button slot="append" icon="el-icon-search" @click="findData"></el-button>
          </el-input>
<!--          <el-select v-model="search.roomTypeid" filterable placeholder="请选择客房类型" style="width: 200px"  @change="findData">-->
<!--            <el-option-->
<!--              v-for="item in guestTypes"-->
<!--              :key="item.id"-->
<!--              :label="item.typeName"-->
<!--              :value="item.id">-->
<!--            </el-option>-->
<!--          </el-select>-->
          <el-select v-model="search.originalRoomId" filterable placeholder="请选择预定状态" style="width: 200px"  @change="findData">
            <el-option  label="已预定" value="0">已预定</el-option>
            <el-option  label="已取消" value="1">已取消</el-option>
            <el-option  label="已入住" value="2">已入住</el-option>
            <el-option  label="已退房" value="3">已退房</el-option>
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
        label="编号">
      </el-table-column>
      <el-table-column
        prop="originalRoomId"
        label="预定房间编号">
      </el-table-column>
      <el-table-column
        prop="rooms.guestType.typeName"
        label="房间类型">
      </el-table-column>
      <el-table-column
        prop="rooms.normalPrice"
        label="标准价">
      </el-table-column>
      <el-table-column
        prop="rooms.discountPrice"
        label="折后价">
      </el-table-column>
      <el-table-column
        prop="deposit"
        label="押金">
      </el-table-column>
      <el-table-column
        prop="residents"
        label="预定人">
      </el-table-column>
<!--      <el-table-column-->
<!--        prop="credentialsType"-->
<!--        label="证件类型">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="credentialsNum"-->
<!--        label="证件号">-->
<!--      </el-table-column><el-table-column-->
<!--        prop="phone"-->
<!--        label="联系方式">-->
<!--      </el-table-column>-->
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
<!--      <el-table-column-->
<!--        prop="操作员"-->
<!--        label="userId">-->
<!--      </el-table-column>-->
      <el-table-column
        prop="memberId"
        label="会员编号">
      </el-table-column>
<!--      <el-table-column-->
<!--        prop="会员价"-->
<!--        label="memberId">-->
<!--      </el-table-column>-->
      <el-table-column
        prop="bookStatus"
        label="预定状态"
      :formatter="bookStatusformat">
      </el-table-column>
<!--      <el-table-column-->
<!--        prop="remarks"-->
<!--        label="备注">-->
<!--      </el-table-column>-->
      <!--<el-table-column-->
      <!--prop="active"-->
      <!--label="是否有效"-->
      <!--:formatter="activeformat">-->
      <!--</el-table-column>-->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
          <el-button type="text" size="small" @click="del(scope.row)">{{deltext(scope.row.active)}}</el-button>
          <el-button @click="detail(scope.row)" type="text" size="small">详情</el-button>
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
  import EditOrderManage from '@/components/orderManage/edit'
  import DetailOrderManage from '@/components/orderManage/details'

  export default {
    inject:['reload'],
    name:"orderManage",
    data () {
      return {
        search:{
          id:"",
          originalRoomId:"",
          bookStatus:"",
          residents:""
        },
        queryParams:{
          pageNo:1,
          pageSize:10,
          id:"",
          originalRoomId:"",
          bookStatus:"",
          residents:""
        },
        tableData:{},
        guestTypes:{}
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
        this.get("rooms/getAllGuestType",(data)=>{
          this.guestTypes=data;
        });
      },
      bookStatusformat(row, column, cellValue, index){
        if(cellValue==0)
          return "已预定";
        else if(cellValue==1)
          return "已取消";
        else if(cellValue==2)
          return "已入住";
        else if(cellValue==1)
          return "已退房";
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
            content: EditOrderManage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{}//props
          },
          area:['800px','600px'],
          title: '添加预定信息',
          shadeClose: false,
          shade :true
        });
      },
      edit(row){
        this.$layer.iframe({
          content: {
            content: EditOrderManage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{id:row.id}//props
          },
          area:['800px','600px'],
          title: '修改预定信息',
          shadeClose: false,
          shade :true
        });
      },
      detail(row){
        this.$layer.iframe({
          content: {
            content: DetailOrderManage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{id:row.id}//props
          },
          area:['800px','600px'],
          title: '预定信息详情',
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
