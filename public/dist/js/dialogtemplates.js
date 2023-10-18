function dialogAlert(args) {
  ej.base.enableRipple();
  const skipCancellationAction = false;
  const msgTypes = [{"id": "info", "icon": 'fas fa-info-circle fa-3x', "color": "#0d6efd"}, {
      "id": "error",
      "icon": "fas fa-times-circle fa-3x",
      "color": "#dc3545"
  }, {"id": "success", "icon": 'fas fa-info-circle fa-3x', "color": "#198754"}, {
      "id": "warning",
      "icon": 'fas fa-exclamation-triangle fa-3x',
      "color": "#fd7e14"
  }];
  args.type = (args.type ? args.type : "info");
  let icon = msgTypes.find(x => x.id === args.type).icon;
  let color = msgTypes.find(x => x.id === args.type).color;
  let d = ej.popups.DialogUtility.alert({
      target: document.getElementById('mainLayout'),
      position: {
      X: "center",
      Y: "center"
      },
      title: 'Mensagem',
      cssClass: 'customDlgHeader',
      content: `<div class="customDlg" style=" font-size:1.3em;"><div class="row" style="display: flex; align-items: center;"><div class="col-2 col-md-2 text-right" style="color: ${color};" ><i class="${icon}"></i></div><div class="col-10 col-md-10">${args.msg}</div></div></div>`,
      showCloseIcon: false,
      animationSettings: {
      effect: "FadeZoom",
      duration: 500
      },
      okButton: {
      text: args.btnOkText ? args.btnOkText : 'OK',
      icon: 'fas fa-check',
      click: function () {
          // args.okAction();
          if (args.okAction) {
          args.okAction();
          }
          this.hide(skipCancellationAction);
      }
      },
  });
}

function dialogConfirm(args) {
  ej.base.enableRipple();
  const skipCancellationAction = false;
  let d = ej.popups.DialogUtility.confirm({
      target: document.getElementById('mainLayout'),
      position: {
      X: "center",
      Y: "center"
      },
      title: 'Confirmação',
      cssClass: 'customDlgHeader',
      content: `<div class="customDlg" style=" font-size:1.3em;"><div class="row" style="display: flex; align-items: center;"><div class="col-2 col-md-2 text-right" style="color: #ffd303;" ><i class="fas fa-question-circle fa-3x"></i></div><div class="col-10 col-md-10">${args.msg}</div></div></div>`,
      showCloseIcon: false,
      animationSettings: {
      effect: "FadeZoom",
      duration: 500
      },
      okButton: {
      text: args.btnOkText ? args.btnOkText : 'OK',
      icon: 'fas fa-check',
      click: function () {
          args.okAction();
          this.hide(skipCancellationAction);
      }
      },
      cancelButton: {
      text: args.btnOkText ? args.btnCancelText : 'Cancelar',
      icon: 'fas fa-times',
      click: function () {
          args.cancelAction();
          this.hide(skipCancellationAction);
      }
      },
      closeOnEscape: args.closeEsc ? args.closeEsc : false,
      close: function (args) {
      if (args.event !== SkipCancellationAction) {
          //dialogCancel();
      }
      //console.log("closing");
      }
  });
  //d.close = () => { if (args.event !== SkipCancellationAction) { dialogCancel(); } }
}