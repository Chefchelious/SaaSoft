import { Notify as Notification } from 'quasar'

function info(message = 'Info', caption = '', timeout = 3000) {
  Notification.create({
    message,
    caption,
    timeout,
    position: 'top-right',
    color: 'info',
    textColor: 'white',
    icon: 'info',
    group: false,
    classes: 'q-pr-xl q-py-sm',
  })
}

function success(message = 'Success', timeout = 3000) {

  Notification.create({
    message,
    timeout,
    position: 'top-right',
    color: 'positive',
    textColor: 'white',
    icon: 'check_circle',
    group: false,
    classes: 'q-pr-xl q-py-sm',
  })
}

function error(message = 'Error', caption = '', timeout = 3000) {
  Notification.create({
    message,
    caption,
    timeout,
    position: 'top-right',
    color: 'negative',
    textColor: 'white',
    icon: 'cancel',
    group: false,
    classes: 'q-pr-xl q-py-sm',
  })
}

export const Notify = { info, success, error }
