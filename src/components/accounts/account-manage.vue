<template>
  <div>
    <div class="row items-center q-gutter-md q-mb-lg">
      <h6 class="text-h6">Учетные записи</h6>
      <q-btn
        icon="add"
        rounded
        color="orange"
        class="q-pa-sm"
        @click="addAccount"
      />
    </div>

    <q-form ref="form" greedy no-error-focus>
      <account-item
        v-for="(acc, idx) in accountList"
        :key="acc.id"
        v-model:account="accountList[idx]"
        :type-options="accountTypeOptions"
        @delete-account="deleteAccount(acc.id)"
        @update-account="updateAccount"
      />
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IAccount, AccountType } from 'src/types';
import { generateId, Notify } from 'src/utils';
import accountItem from './account-item.vue';
import { QForm } from 'quasar';

const form = ref<QForm | undefined>();
const isFormValid = ref(true);

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

const accountTypeOptions = Object.values(AccountType);

const validateForm = async () => {
  isFormValid.value = true;
  const is_valid = await form.value?.validate();

  if (!is_valid) {
    Notify.error('Ошибка валидации формы');
    isFormValid.value = false;
  }
};

const addAccount = async () => {
  await validateForm();

  if (!isFormValid.value) return;
  accountList.value.push({
    id: generateId(),
    tags: [],
    type: AccountType.LOCAL,
    login: '',
    password: '',
  });
};

const updateAccount = (updatedRecord: IAccount) => {
  const item = accountList.value.find((acc) => acc.id === updatedRecord.id);
  if (item) {
    Object.assign(item, updatedRecord);
  }
};

const deleteAccount = (recordId: string) => {
  accountList.value = accountList.value.filter((acc) => acc.id !== recordId);
};
</script>
