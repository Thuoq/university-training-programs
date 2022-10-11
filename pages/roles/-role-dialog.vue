<template>
  <div class="role-dialog">
    <h2 class="title">Thêm mới Nhóm quyền</h2>
    <div class="cardgroup">
      <div class="form">
        <div class="formcode">
          <div class="role">
            <label class="label">Mã Nhóm quyền</label>
            <app-input v-model.trim="code" type="text" class="input" required></app-input>
          </div>
          <div class="role">
            <label class="label">Tên Nhóm quyền </label>
            <app-input v-model.trim="name" type="text" class="input" required></app-input>
          </div>
        </div>
        <div class="formdesc">
          <label class="label">Mô tả</label>
          <app-input v-model.trim="description" type="text" class="input"></app-input>
        </div>
      </div>
      <div class="resources">
        <table class="table">
          <tr class="row">
            <th class="col">&nbsp;</th>
            <th class="col">Xem</th>
            <th class="col">Thêm</th>
            <th class="col">Sửa</th>
            <th class="col">Xóa</th>
            <th class="col">Import</th>
            <th class="col">Export</th>
            <th class="col">Phê duyệt</th>
          </tr>
          <tr v-for="resource in resources" :key="resource.code" class="row">
            <td class="cell">{{ resource.name }}</td>
            <td class="cell">
              <mwc-checkbox class="checkbox" @change="(event) => onChange(event, resource.id, 'canView')">
              </mwc-checkbox>
            </td>
            <td class="cell">
              <mwc-checkbox class="checkbox" @change="(event) => onChange(event, resource.id, 'canAdd')">
              </mwc-checkbox>
            </td>
            <td class="cell">
              <mwc-checkbox class="checkbox" @change="(event) => onChange(event, resource.id, 'canEdit')">
              </mwc-checkbox>
            </td>
            <td class="cell">
              <mwc-checkbox class="checkbox" @change="(event) => onChange(event, resource.id, 'canDelete')">
              </mwc-checkbox>
            </td>
            <td class="cell">
              <mwc-checkbox class="checkbox" @change="(event) => onChange(event, resource.id, 'canImport')">
              </mwc-checkbox>
            </td>
            <td class="cell">
              <mwc-checkbox class="checkbox" @change="(event) => onChange(event, resource.id, 'canExport')">
              </mwc-checkbox>
            </td>
            <td class="cell">
              <mwc-checkbox class="checkbox" @change="(event) => onChange(event, resource.id, 'canApprove')">
              </mwc-checkbox>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="footer">
      <app-button raised class="btn -delete" @click="onClosed">Huỷ</app-button>
      <app-button raised class="btn -save" @click="onSubmit">Lưu</app-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    resources: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      name: '',
      code: '',
      description: '',
      resourcesRoles: [],
    };
  },
  methods: {
    onChange(event, resourceId, properties) {
      const { checked } = event.target;
      const resourcesRole = this.getResourcesRole(resourceId);
      if (!resourcesRole) {
        this.resourcesRoles.push({
          resourceId,
          [`${properties}`]: checked,
        });
      } else {
        resourcesRole[`${properties}`] = checked;
      }
    },
    getResourcesRole(resourceId) {
      return this.resourcesRoles.find((resourcesRole) => resourcesRole.resourceId === resourceId);
    },
    onClosed() {
      this.$emit('closed');
      this.resourcesRoles = [];
    },
    onSubmit() {
      const payload = this.$data;
      this.$emit('submit', payload);
      this.$emit('closed');
    },
  },
};
</script>

<style lang="scss" scoped>
.role-dialog {
  font-size: 14px;
  > .title {
    text-align: left;
    font-size: 17px;
    margin-bottom: 40px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    line-height: 21px;
    padding: 11px 0 12px 37px;
    color: var(--color-primary);
    background: #ebebeb;
    border-bottom: 1px solid var(--color-back);
  }
  > .cardgroup {
    margin-bottom: 50px;
  }
  > .cardgroup > .form {
    margin-bottom: 40px;
  }
  > .cardgroup > .form > .formcode {
    display: flex;
    margin-bottom: 20px;
    justify-content: space-between;
  }
  > .cardgroup > .form > .formcode > .role {
    display: flex;
    align-items: center;
  }
  > .cardgroup > .form > .formcode > .role > .input {
    width: 182.48px;
  }
  > .cardgroup > .form > .formcode > .role > .label {
    margin-right: 5px;
  }
  > .cardgroup > .form > .formdesc > .label {
    text-align: left;
    display: block;
  }
  > .cardgroup > .form > .formdesc > .input {
    width: 100%;
  }
  > .cardgroup > .resources {
    width: 100%;
  }
  > .cardgroup > .resources > .table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid var(--color-gray-base);
  }
  > .cardgroup > .resources > .table > .row:not(:first-child) {
    border-bottom: 1px solid var(--color-gray-base);
  }
  > .cardgroup > .resources > .table > .row:first-child {
    background-color: var(--color-gray-base);
    padding: 10px 0px 8px 0px;
    text-align: center;
    border: none;
  }
  > .cardgroup > .resources > .table > .row > .cell {
    text-align: center;
  }

  .footer {
    display: flex;
    justify-content: space-around;
    align-content: center;
  }

  > .footer > .btn {
    &.-save {
      --mdc-theme-primary: var(--color-primary);
    }
    &.-delete {
      --mdc-theme-primary: var(--color-gray-base);
      --mdc-theme-on-primary: var(--color-back);
    }
  }
}
</style>
