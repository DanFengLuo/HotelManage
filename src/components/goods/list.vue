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
        prop="goodsName"
        label="商品名称">
      </el-table-column>
      <el-table-column
        prop="goodsType.goodsTypename"
        label="商品类别">
      </el-table-column>
      <el-table-column
        prop="goodsPrice"
        label="商品价格">
      </el-table-column>
      <el-table-column
        prop="unit"
        label="单位">
      </el-table-column>
      <el-table-column
        prop="notes"
        label="备注">
      </el-table-column>
      <!--<el-table-column-->
        <!--prop="createTime"-->
        <!--label="创建日期">-->
      <!--</el-table-column>-->

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
  import EditGoods from '@/components/goods/edit'
  export default {
    inject:['reload'],
    name:"goods",
    data () {
      return {
        search:{
          goodsName:"",
          goodsTypeid:""
        },
        queryParams:{
          pageNo:1,
          pageSize:10,
          goodsName:"",
          goodsTypeid:""
        },
        tableData:{},
        goodsTypes:{}
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
        this.get("goods/list",(data)=>{
          this.tableData=data;
        },this.queryParams);
        this.get("goods/getAllGoodsType",(data)=>{
          this.goodsTypes=data;
        });
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
            content: EditGoods, //传递的组件对象
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
            content: EditGoods, //传递的组件对象
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
        this.delete("goods/del",row.id,row.active);
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
