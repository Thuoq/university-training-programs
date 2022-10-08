export const SIDE_BAR_MENUS = [
  {
    name: 'Quản lý Danh mục',
    className: 'header',
    children: [
      {
        title: 'Quản lý Khoa',
        to: '/faculty',
        className: 'item -faculty',
      },
      {
        title: 'Quản lý Bộ môn',
        to: '/section',
        className: 'item -section',
      },
      {
        title: 'Quản lý Ngành học',
        to: '/major',
        className: 'item -major',
      },
      {
        title: 'Quản lý Năm học/Khóa',
        to: '/academic-year',
        className: 'item -academic-year',
      },
      {
        title: 'Quản lý Học phần',
        to: '/subject',
        className: 'item -subject',
      },
      {
        title: 'Danh mục Khối kiến thức',
        to: '/knowledge-block',
        className: 'item -knowledge-block',
      },
      {
        title: 'Danh mục Chương trình Đào tạo',
        to: '/training-program',
        className: 'item -training=program',
      },
    ],
  },
  {
    name: 'Quản lý CT Đào tạo',
    className: 'header',
    children: [
      {
        title: 'Quản lý Chương trình Đào tạo',
        to: '#',
        className: 'item',
      },
    ],
  },
  {
    name: 'Quản trị',
    className: 'header',
    children: [
      {
        title: 'Quản lý Nhóm người dùng',
        className: 'item',
        to: '#',
      },
      {
        title: 'Quản lý Người dùng',
        className: 'item',
        to: '#',
      },
      {
        title: 'Quản lý Tài khoản Người dùng',
        className: 'item',
        to: '#',
      },
      {
        title: 'Quản lý Nhóm quyền',
        className: 'item',
        to: '#',
      },
    ],
  },
  {
    name: 'Báo cáo Thống kê',
    className: 'header',
    children: [
      {
        title: 'Báo cáo',
        to: '#',
      },
    ],
  },
];
