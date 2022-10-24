<template>
  <div class="add-row">
    <app-button raised class="btn" @click.prevent="openDialog">
      <mwc-icon class="icon">add</mwc-icon>
      Thêm mới
    </app-button>
    <app-dialog :visible="visibleDialog" @closed="closeDialog">
      <role-dialog :resources="resources" @closed="closeDialog" @submit="onSubmit"></role-dialog>
    </app-dialog>
  </div>
</template>
<script>
import RoleDialog from '~/pages/roles/-role-dialog';
import { getListResource } from '~/models/resources.model';
import { pathified } from '~/utils';
const roleStore = pathified('roles');
export default {
  components: { RoleDialog },
  data() {
    return {
      visibleDialog: false,
      resources: [],
    };
  },
  async created() {
    this.resources = await getListResource();
  },
  methods: {
    openDialog() {
      this.visibleDialog = true;
    },
    closeDialog() {
      this.visibleDialog = false;
    },
    async onSubmit(payload) {
      await roleStore.$dispatch('createRoles', payload);
      await roleStore.$dispatch('getListRoles');
    },
  },
};
</script>
<style lang="scss" scoped>
.add-row {
  padding: 12px 48px 12px 25px;
  > .btn {
    width: 200px;
    height: 36px;
    background: #d3d8ea;
    border: 1px solid #000000;
    cursor: pointer;
    --mdc-theme-primary: var(--color-primary);
    --mdc-button-horizontal-padding: 10px;
  }
  --mdc-dialog-min-width: 800px;
  --mdc-dialog-max-height: 800px;
}
</style>
