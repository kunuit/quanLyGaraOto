function themMoiHieuXe(hieuXe) {
  oTo.createHX({hieuXe}).then(data => {
    main()
  })
}

function suaTiepNhanXeToiDa(giaTriThamSo){
  oTo.updateMax({tenThamSo: 'soXeSuaChuaToiDa', giaTriThamSo: +giaTriThamSo}).then(data => {
    main()
  })
}

function tiepNhanXe(info){
  const {bienSo,tenChuXe,sdt,diaChi,email,hieuXe,ngayTiepNhan} = info
  oTo.createFix({
    bienSoXe: bienSo,
    tenChuXe,
    sdt,
    diaChi,
    email,
    maHX: hieuXe,
    ngayTiepNhan
  }).then(data => {
    location.reload()
  })
}

async function main () {
  console.log('run main')

const getHX = await oTo.getHX();
const arrHX = getHX.data.data
console.log(arrHX)

const getMax = await oTo.getMax();
console.log(getMax)
const maxXeTiepNhan = getMax.data.data.GiaTriThamSo;
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
  arrHX.map((item) => {
    $(".xeSelection").append(`<option value='${item.MaHX}'>${item.TenHX}</option>`);
  });
  $(".maxTiepNhan").empty();
  $(".maxTiepNhan").append(`<span>${maxXeTiepNhan}</span>`);
  $(".soXeDaTiepNhan").empty()
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
      tiepNhanXe({tenChuXe,bienSo,sdt,email,hieuXe,sdt,ngayTiepNhan,diaChi})
      Toastify({
        text: "Tiếp nhận thành công",
        backgroundColor: "#0000008f",
        className: "info",
      }).showToast();
    });

    $(".buttonNewHieuXe").click(function (e) {
      let newHieuXe = $("#newHieuXe").val();
      e.preventDefault();
      checkNull(newHieuXe, "err-newHieuXe");
      themMoiHieuXe(newHieuXe)
      Toastify({
        text: "Thêm hiệu xe thành công",
        backgroundColor: "#0000008f",
        className: "info",
      }).showToast();
      $(".buttonNewHieuXe").attr("data-dismiss", "modal");
    });

    $(".buttoneditMaxXe").click(function (e) {
      let editMaxXe = $("#editMaxXe").val();
      e.preventDefault();
      checkNull(editMaxXe, "err-editMaxXe");
      $(".buttoneditMaxXe").attr("data-dismiss", "modal");
      suaTiepNhanXeToiDa(editMaxXe)
      Toastify({
        text: "Thay đổi số xe tối đa thành công",
        backgroundColor: "#0000008f",
        className: "info",
      }).showToast();
    });

    $(".themHieuXe").click(function (e) {
      e.preventDefault();
    });
  } catch (error) {
    console.log(error);
  }
});

}

main();