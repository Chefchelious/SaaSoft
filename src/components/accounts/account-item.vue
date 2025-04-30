<template>
  <div class="row items-center q-col-gutter-md q-mb-lg">
    <div class="col-3">
      <q-input
        v-model="tagInput"
        maxlength="50"
        outlined
        dense
        label="Метка"
        no-error-icon
        :rules="[(val) => !!val.trim() || '']"
        @update:model-value="updateParentRecord"
        class="q-pb-none"
      />
    </div>

    <div class="col-2">
      <q-select
        v-model="localAccount.type"
        :options="typeOptions"
        outlined
        dense
        behavior="menu"
        label="Тип записи"
        @update:model-value="onUpdateAccountType"
        class="q-pb-none"
      />
    </div>

    <div class="col">
      <q-input
        v-model="localAccount.login"
        maxlength="100"
        outlined
        dense
        label="Логин"
        no-error-icon
        :rules="[(val) => !!val.trim() || '']"
        @update:model-value="updateParentRecord"
        class="q-pb-none"
      />
    </div>

    <div v-if="account.type === AccountType.LOCAL" class="col">
      <q-input
        ref="passwordInput"
        v-model="localAccount.password"
        :type="inputType"
        maxlength="100"
        outlined
        dense
        label="Пароль"
        no-error-icon
        lazy-rules
        :rules="[validatePassword]"
        @update:model-value="updateParentRecord"
        class="q-pb-none"
      >
        <template v-slot:append>
          <q-icon
            class="cursor-pointer"
            :name="showPassword ? 'o_visibility_off' : 'o_visibility'"
            size="18px"
            @click="showPassword = !showPassword"
          />
        </template>
      </q-input>
    </div>

    <div>
      <q-btn
        icon="delete"
        flat
        rounded
        color="negative"
        @click="emit('delete-account')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick } from 'vue';
import { IAccount, AccountType } from 'src/types';
import { Notify, validatePassword } from 'src/utils';
import { QInput } from 'quasar';

const props = defineProps<{
  account: IAccount;
  typeOptions: AccountType[];
}>();

const emit = defineEmits(['update-account', 'delete-account']);

const localAccount = ref({ ...props.account });
const showPassword = ref(false);

const passwordInput = ref<QInput | undefined>();

const inputType = computed<'text' | 'password'>(() =>
  showPassword.value ? 'text' : 'password'
);

const validatePasswordInput = async () => {
  const isValid = await passwordInput.value?.validate();
  if (!isValid) {
    Notify.error('Ошибка валидации формы');
    return false;
  }
  return true;
};

const tagInput = computed<string>({
  get: () => localAccount.value.tags.map((t) => t.text).join('; '),
  set: (val) => {
    localAccount.value.tags = val
      .split(';')
      .map((s) => ({ text: s.trim() }))
      .filter((t) => t.text.length > 0);
  },
});

const updateParentRecord = () => {
  emit('update-account', localAccount.value);
};

const onUpdateAccountType = (val: AccountType) => {
  localAccount.value.password = null;
  updateParentRecord();

  nextTick(() => {
    if (val === AccountType.LOCAL) {
      validatePasswordInput();
    }
  });
};
</script>
