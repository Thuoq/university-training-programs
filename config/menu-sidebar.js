export const SIDE_BAR_MENUS = [
  {
    name: 'Quản lý Danh mục',
    className: 'header',
    children: [
      {
        title: 'Quản lý Khoa',
        to: '/faculties',
        className: 'item -faculty',
      },
      {
        title: 'Quản lý Bộ môn',
        to: '/sections',
        className: 'item -section',
      },
      {
        title: 'Quản lý Ngành học',
        to: '/majors',
        className: 'item -major',
      },
      {
        title: 'Quản lý Năm học/Khóa',
        to: '/academic-years',
        className: 'item -academic-year',
      },
      {
        title: 'Quản lý Học phần',
        to: '/subjects',
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
        to: '/positions',
      },
      {
        title: 'Quản lý Người dùng',
        className: 'item',
        to: '#',
      },
      {
        title: 'Quản lý Nhóm quyền',
        className: 'item -role',
        to: '/roles',
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
        className: 'item',
      },
    ],
  },
];
