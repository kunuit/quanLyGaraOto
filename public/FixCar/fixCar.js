const arrXe = ["Ford", "Toyota", "vinfast"];

const maxXeTiepNhan = 30;
const soXeDaTiepNhan = 20;

const checkNull = (data, nameTag) => {
  $(`.${nameTag}`).empty();
  if (data.trim() == "" || data == null) {
    $(`.${nameTag}`).append(`! vui lòng nhập`);
    throw new Error({ errForm: "checkNull" });
  }
};

$(document).ready(function () {
  //init DateTimePickers
  materialKit.initFormExtendedDatetimepickers();

  // Sliders Init
  // materialKit.initSliders()
  ;

  arrXe.map((item) => {
    $(".xeSelection").append(`<option>${item}</option>`);
  });

  $(".maxTiepNhan").append(`<span>${maxXeTiepNhan}</span>`);
  $(".soXeDaTiepNhan").append(`<span>${soXeDaTiepNhan}</span>`);
  try {
    $("#xacNhanTiepNhanXe").click(function (e) {
      let tenChuXe = $("#tenChuXe").val();
      let bienSo = $("#bienSo").val();
      let sdt = $("#sdt").val();
      let email = $("#email").val();
      let hieuXe = $("#hieuXe").val();
      let ngayTiepNhan = $("#ngayTiepNhan").val();
      let diaChi = $("#diaChi").val();
      e.preventDefault();
      console.log(
        "data: ",
        tenChuXe,
        bienSo,
        sdt,
        email,
        hieuXe,
        sdt,
        ngayTiepNhan,
        diaChi
      );
      checkNull(tenChuXe, "err-tenChuXe");
      checkNull(bienSo, "err-bienSo");
      checkNull(sdt, "err-sdt");
      checkNull(email, "err-email");
      checkNull(hieuXe, "err-hieuXe");
      checkNull(ngayTiepNhan, "err-ngayTiepNhan");
      checkNull(diaChi, "err-diaChi");
      Toastify({
        text: "Tiếp nhận thành công",
        backgroundColor: "#0000008f",
        className: "info",
      }).showToast();
    });

    $(".buttonNewHieuXe").click(function (e) {
      let newHieuXe = $("#newHieuXe").val();
      e.preventDefault();
      console.log("hieu xe moi: ", newHieuXe);
      checkNull(newHieuXe, "err-newHieuXe");
      Toastify({
        text: "Thêm hiệu xe thành công",
        backgroundColor: "#0000008f",
        className: "info",
      }).showToast();
      $('.buttonNewHieuXe').attr('data-dismiss','modal')
    });

    $(".buttoneditMaxXe").click(function (e) {
      let editMaxXe = $("#editMaxXe").val();
      e.preventDefault();
      console.log("số xe tối đa: ", editMaxXe);
      checkNull(editMaxXe, "err-editMaxXe");
      $('.buttoneditMaxXe').attr('data-dismiss','modal')
      $(".maxTiepNhan").empty()
      Toastify({
        text: "Thay đổi số xe tối đa thành công",
        backgroundColor: "#0000008f",
        className: "info",
      }).showToast();
      $(".maxTiepNhan").append(`<span>${editMaxXe}</span>`);
    });

    $(".themHieuXe").click(function (e) {
      e.preventDefault();
      console.log("xu xy them hieu xe");
    });
  } catch (error) {
    console.log(error);
  }
});
