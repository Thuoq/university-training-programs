<template>
  <div>
    <div>
      <ul>
        <li class="head-list">
          <span class="text-head">Quản lý danh mục</span>
        </li>
        <li>
          <nuxt-link to="/forgetpassword">Quản lý Khoa</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/forgetpassword">Quản lý Bộ môn</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/forgetpassword">Quản lý Ngành học</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/forgetpassword">Quản lý Năm học/Khóa</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/forgetpassword">Quản lý Học phần</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/forgetpassword">Danh mục Khối kiến thức</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/forgetpassword">Danh mục chương trình đào tạo</nuxt-link>
        </li>
      </ul>
      <ul>
        <li class="head-list">
          <span class="text-head">Quản lý CT Đào tạo</span>
        </li>
        <li>
          <nuxt-link to="/forgetpassword">Quản lý Khối kiến thức</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/forgetpassword">Quản lý Chương trình Đào tạo</nuxt-link>
        </li>
      </ul>
      <ul>
        <li class="head-list">
          <span class="text-head">Quản trị</span>
        </li>
        <li>
          <nuxt-link to="/forgetpassword">Quản lý Nhóm người dùng</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/forgetpassword">Quản lý Người dùng</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/forgetpassword">Quản lý Nhóm quyền</nuxt-link>
        </li>
      </ul>
      <ul>
        <li class="head-list">
          <span class="text-head">Báo cáo</span>
        </li>
        <li>
          <nuxt-link to="/forgetpassword">Báo cáo</nuxt-link>
        </li>
      </ul>
    </div>
    <!-- <nuxt-child/> -->
  </div>
</template>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 257.25px;
}
.head-list {
  height: 38.76px;
  background-color: #454c8e;
  padding-left: 18.75px;
}
li {
  height: 36.6825px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  padding-left: 27px;
}

.text-head {
  font-size: 'Inter';
  color: white;
  font-size: 16.5px;
  font-weight: bold;
}

a {
  font-size: 'Inter';
  font-size: 15px;
  font-weight: 400;
  color: black;
}
</style>
