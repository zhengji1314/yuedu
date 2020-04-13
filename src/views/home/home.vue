<template>
  <el-container>
    <el-aside :width="isCollapse?'65px': '200px'">
        <el-menu
        :collapse="isCollapse"
      default-active="2"
      class="el-menu-vertical-demo"

      background-color="#323745"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse-transition="false"
      router
      >
       <el-menu-item index="/shouye" :style="{width:isCollapse?'65px': '200px'}">
        <i class="el-icon-location"></i>
        <span slot="title">首页</span>
      </el-menu-item>
       <el-submenu index="2" :style="{width:isCollapse?'65px': '200px'}">
           <template slot="title">
          <i class="el-icon-menu"></i>
          <span>作品管理</span>
        </template>
        <el-menu-item index="/articleadd">发布文章</el-menu-item>
        <el-menu-item index="/article">文章列表</el-menu-item>
        <el-menu-item index="2-3">评论列表</el-menu-item>
        <el-menu-item index="/material">素材管理</el-menu-item>
       </el-submenu>

      <el-menu-item index="/fans" :style="{width:isCollapse?'65px': '200px'}">
        <i class="el-icon-location"></i>
        <span slot="title">我的书架</span>
      </el-menu-item>
      <el-menu-item index="/account" :style="{width:isCollapse?'65px': '200px'}">
        <i class="el-icon-location"></i>
        <span slot="title">账户信息</span>
      </el-menu-item>

    </el-menu>
    </el-aside>
    <el-container>
      <!-- 头部 -->
      <el-header>
        <div class="fl">
            <i :class="isCollapse? 'el-icon-s-unfold':'el-icon-s-fold'" @click="isCollapse=!isCollapse"></i>
          <span>悦读中文网</span>
        </div>
        <div class="fr">
          <el-input type="text" placeholder="请输入搜索文章内容" style="width:240px"></el-input>
          <span style="margin:0 25px">消息</span>
          <el-dropdown>
            <span class="el-dropdown-link">
                <img :src="photo" alt="" width="40px" style="margin-right:10px">
                {{name}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item >个人信息</el-dropdown-item>
              <el-dropdown-item >GitHub地址</el-dropdown-item>
              <el-dropdown-item  @click.native="logout()">退出</el-dropdown-item>

            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <!-- 主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data () {
      return {
        isCollapse: false,
        tmpname: '', // 临时账户名称
        tmpphoto: '' // 临时账户头像
      }
    },
    methods: {
      logout () {

    },
    computed: {

    }
  },
 }
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-aside {
    background-color: rgb(50, 55, 69);
  }
  // 头部样式
  .el-header {

    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    min-width: 800px;
    .fl {
      height: 100%;
      width: 40%;

      display: flex;
      align-items: center;
    }
    .fr {
      height: 100%;
      width: 50%;

      display: flex;
      justify-content: flex-end;
      align-items: center;
      .el-dropdown-link {
          display: flex;
          align-items: center;
      }
    }
  }
  .el-main {
    background-color: rgb(242, 243, 245);
  }
}
</style>
