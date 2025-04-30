<template>
  <div class="row items-center q-col-gutter-md q-mb-lg">
    <div class="col-3">
      <q-input
        ref="tagInputRef"
        v-model="tagInputText"
        maxlength="50"
        outlined
        dense
        label="Метка"
        no-error-icon
        lazy-rules
        :rules="[validateTagInput]"
        @blur="updateParentTag"
        @update:model-value="
          () => {
            console.log(localAccount);
          }
        "
        class="q-pb-none"
      />
    </div>

    <div class="col-2">
      <q-select
        ref="typeSelectRef"
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
        ref="loginInputRef"
        v-model="localAccount.login"
        maxlength="100"
        outlined
        dense
        label="Логин"
        no-error-icon
        lazy-rules
        :rules="[(val) => !!val.trim() || '']"
        @blur="updateParentRecord"
        class="q-pb-none"
      />
    </div>

    <div v-if="localAccount.type === AccountType.LOCAL" class="col">
      <q-input
        ref="passwordInputRef"
        v-model="localAccount.password"
        :type="inputType"
        maxlength="100"
        outlined
        dense
        label="Пароль"
        no-error-icon
        lazy-rules
        :rules="[validatePassword]"
        @blur="updateParentRecord"
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
import { computed, ref, nextTick, onMounted } from 'vue';
import { IAccount, AccountType } from 'src/types';
import { validatePassword, validateTagInput } from 'src/utils';
import { QInput, QSelect } from 'quasar';

const props = defineProps<{
  account: IAccount;
  typeOptions: AccountType[];
}>();

const emit = defineEmits(['update-account', 'delete-account']);

const localAccount = ref({ ...props.account });
const tagInputText = ref('');
const showPassword = ref(false);

const tagInputRef = ref<QInput>();
const typeSelectRef = ref<QSelect>();
const loginInputRef = ref<QInput>();
const passwordInputRef = ref<QInput>();

const inputType = computed<'text' | 'password'>(() =>
  showPassword.value ? 'text' : 'password'
);

const validateAll = async (): Promise<boolean> => {
  const validTag = (await tagInputRef.value?.validate()) ?? false;
  const validType = (await typeSelectRef.value?.validate()) ?? false;
  const validLogin = (await loginInputRef.value?.validate()) ?? false;
  const validPwd =
    localAccount.value.type === AccountType.LOCAL
      ? (await passwordInputRef.value?.validate()) ?? false
      : true;

  return validTag && validType && validLogin && validPwd;
};

const setTagValue = () => {
  tagInputText.value = localAccount.value.tags.map((t) => t.text).join('; ');
};

const updateParentTag = async () => {
  if (await validateAll()) {
    localAccount.value.tags = tagInputText.value
      .split(';')
      .map((s) => ({ text: s.trim() }))
      .filter((t) => t.text.length > 0);

    emit('update-account', localAccount.value);
  }
};

const updateParentRecord = async () => {
  if (await validateAll()) {
    emit('update-account', localAccount.value);
  }
};

const onUpdateAccountType = () => {
  localAccount.value.password = null;

  nextTick(async () => {
    passwordInputRef.value?.resetValidation();
    await updateParentRecord();
  });
};

onMounted(() => {
  setTagValue();
});
</script>
