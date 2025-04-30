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
        v-for="(acc, idx) in localList"
        :key="acc.id"
        v-model:account="localList[idx]"
        :type-options="accountTypeOptions"
        @delete-account="deleteAccount(acc.id)"
        @update-account="updateAccount"
      />
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IAccount, AccountType } from 'src/types';
import { generateId, Notify } from 'src/utils';
import accountItem from './account-item.vue';
import { QForm } from 'quasar';
import { useAccountStore } from 'src/stores/account-store';

const accountStore = useAccountStore();
const form = ref<QForm | undefined>();
const isFormValid = ref(true);

const localList = ref<IAccount[]>([]);

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
  localList.value.push({
    id: generateId(),
    tags: [],
    type: AccountType.LOCAL,
    login: '',
    password: '',
  });
};

const updateAccount = (updatedRecord: IAccount) => {
  const idx = localList.value.findIndex(
    (account) => account.id === updatedRecord.id
  );
  if (idx !== -1) localList.value[idx] = updatedRecord;

  const exists = accountStore.accounts.find(
    (account) => account.id === updatedRecord.id
  );
  if (exists) {
    accountStore.updateAccount(updatedRecord);
  } else {
    accountStore.addAccount(updatedRecord);
  }
};

const deleteAccount = (recordId: string) => {
  localList.value = localList.value.filter(
    (account) => account.id !== recordId
  );
  accountStore.deleteAccount(recordId);
};

onMounted(() => {
  localList.value = accountStore.accounts.slice();
});
</script>
