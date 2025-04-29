<template>
  <q-page :class="{ 'q-pa-sm': $q.screen.gt.sm }">
    <div class="row items-center q-gutter-md q-mb-lg">
      <h6 class="text-h6">Учетные записи</h6>

      <q-btn icon="add" rounded color="orange" class="q-pa-sm" />
    </div>

    <q-form ref="form" greedy no-error-focus>
      <div
        v-for="(account, idx) in accountList"
        :key="account.id"
        class="row items-center q-col-gutter-md q-mb-lg"
      >
        <div class="col">
          <q-input
            v-model="rawTagInputs[account.id]"
            maxlength="200"
            outlined
            dense
            label="Метка"
            no-error-icon
          />
        </div>

        <div class="col">
          <q-select
            outlined
            dense
            behavior="menu"
            color="primary"
            v-model="accountList[idx].type"
            label="Тип записи"
            :options="accountTypeOptions"
          />
        </div>

        <div class="col">
          <q-input
            v-model="accountList[idx].login"
            maxlength="200"
            outlined
            dense
            label="Логин"
            no-error-icon
          />
        </div>

        <div class="col">
          <q-input
            v-model="accountList[idx].password"
            maxlength="200"
            outlined
            dense
            label="Пароль"
            no-error-icon
          />
        </div>

        <div>
          <q-btn icon="delete" flat class="q-pa-sm" rounded color="negative" />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { IAccount, AccountType } from 'src/types';

const accountTypeOptions = Object.values(AccountType);

const accountList = ref<IAccount[]>([
  {
    id: '1',
    tags: [
      {
        text: 'XXX',
      },
      {
        text: 'YYYYYYYYY',
      },
      {
        text: 'IIIII',
      },
      {
        text: 'MMMMMMMMMMMM',
      },
    ],
    type: AccountType.LOCAL,
    login: 'dim_dim',
    password: '12345',
  },
  {
    id: '2',
    tags: [
      {
        text: 'EEEWEEWE',
      },
      {
        text: 'TETETTTETE',
      },
    ],
    type: AccountType.LDAP,
    login: 'test_test',
    password: null,
  },
]);

const rawTagInputs = reactive<Record<string, string>>({});

accountList.value.forEach((acc) => {
  rawTagInputs[acc.id] = acc.tags.map((t) => t.text).join('; ');
});
</script>



