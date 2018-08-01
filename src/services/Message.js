import toastr from 'toastr';

const options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": true,
  "progressBar": true,
  "positionClass": "toast-top-center",
  "preventDuplicates": true,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

export default class Message{
  constructor(){
    toastr.options = options;
  }

  static warning(title, message) {
    toastr.warning(message, title);
  }

  static success(title, message) {
    toastr.success(message, title);
  }

  static error(title, message) {
    toastr.error(message, title);
  }

  static info(title, message) {
    toastr.info(message, title);
  }
}
