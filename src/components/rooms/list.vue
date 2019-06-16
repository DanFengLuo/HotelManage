<template>
  <div>
    <div style="margin-top: 15px;">
      <el-row>
        <el-col :span="2"><el-button type="primary" @click="add">添加</el-button></el-col>
        <el-col :span="22">
          <el-input placeholder="请输入客房编号" v-model="search.id" class="input-with-select" style="width: 200px">
            <el-button slot="append" icon="el-icon-search" @click="findData"></el-button>
          </el-input>
          <el-select v-model="search.floorId" filterable placeholder="请选择楼层信息" style="width: 200px"  @change="findData">
          <el-option
            v-for="item in floors"
            :key="item.id"
            :label="item.floorName"
            :value="item.id">
          </el-option>
        </el-select>
          <el-select v-model="search.roomTypeid" filterable placeholder="请选择类型信息" style="width: 200px"  @change="findData">
            <el-option
              v-for="item in guestTypes"
              :key="item.id"
              :label="item.typeName"
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
        prop="guestType.typeName"
        label="客房类型">
      </el-table-column>
      <el-table-column
        prop="status"
        label="客房状态">
      </el-table-column>
      <el-table-column
        prop="floor.floorName"
        label="楼层">
      </el-table-column>
      <el-table-column
        prop="normalPrice"
        label="标准价格">
      </el-table-column>
      <el-table-column
        prop="discountPrice"
        label="折后价">
      </el-table-column>
      <el-table-column
        prop="gvipPrice"
        label="普通会员价">
      </el-table-column>
      <el-table-column
        prop="svipPrice"
        label="Vip会员价">
      </el-table-column>
      <el-table-column
        prop="remarks"
        label="备注">
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
  import EditRooms from '@/components/rooms/edit'
  export default {
    inject:['reload'],
    name:"rooms",
    data () {
      return {
        search:{
          id:"",
          floorId:"",
          roomTypeid:""
        },
        queryParams:{
          pageNo:1,
          pageSize:10,
          id:"",
          floorId:"",
          roomTypeid:""
        },
        tableData:{},
        floors:{},
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
        this.get("rooms/list",(data)=>{
          this.tableData=data;
        },this.queryParams);
        this.get("rooms/getAllFloor",(data)=>{
          this.floors=data;
        });
        this.get("rooms/getAllGuestType",(data)=>{
          this.guestTypes=data;
        });
      },
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
            content: EditRooms, //传递的组件对象
            parent: this,//当前的vue对象
            data:{}//props
          },
          area:['800px','600px'],
          title: '添加客房信息',
          shadeClose: false,
          shade :true
        });
      },
      edit(row){
        this.$layer.iframe({
          content: {
            content: EditRooms, //传递的组件对象
            parent: this,//当前的vue对象
            data:{id:row.id}//props
          },
          area:['800px','600px'],
          title: '修改客房信息',
          shadeClose: false,
          shade :true
        });
      },
      del(row){
        this.delete("rooms/del",row.id,row.active);
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
