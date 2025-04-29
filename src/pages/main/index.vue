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
            v-model.trim="rawTagInputs[account.id]"
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
            v-model.trim="accountList[idx].login"
            maxlength="200"
            outlined
            dense
            label="Логин"
            no-error-icon
          />
        </div>

        <div v-if="isNeedPasswordField(account)" class="col">
          <q-input
            v-model.trim="accountList[idx].password"
            :type="getInputType(account)"
            outlined
            dense
            label="Пароль"
            no-error-icon
          >
            <template v-slot:append>
              <q-icon
                class="cursor-pointer"
                :name="
                  showPassword[account.id] ? 'o_visibility_off' : 'o_visibility'
                "
                color="grey-7"
                size="18px"
                @click="togglePassword(account)"
              /> </template
          ></q-input>
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
import { generateId } from 'src/utils';

const accountTypeOptions = Object.values(AccountType);

const showPassword = reactive<Record<string, boolean>>({});

const togglePassword = (record: IAccount) => {
  showPassword[record.id] = !showPassword[record.id];
};

const getInputType = (record: IAccount): 'text' | 'password' => {
  return showPassword[record.id] ? 'text' : 'password';
};

const accountList = ref<IAccount[]>([
  {
    id: generateId(),
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
    id: generateId(),
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

const isNeedPasswordField = (record: IAccount) => {
  const isLocal = record.type === AccountType.LOCAL;
  if (!isLocal) {
    record.password = null;
  }
  return isLocal;
};
</script>



