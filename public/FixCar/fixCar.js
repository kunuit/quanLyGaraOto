//fix đây trước khi thuyết trình
 if(!localStorage.getItem("ngayNay")){
   localStorage.setItem("ngayNay", 24);
 }
function setNewDate() {
  let dateNow = new Date();
  let getDate = dateNow.getDate();
  if (getDate != localStorage.getItem("ngayNay")) {
    localStorage.setItem("soXeTiepNhanTrongNgay", 0);
    localStorage.setItem("ngayNay", getDate);
  }
}

function themMoiHieuXe(hieuXe) {
  console.log(hieuXe);
  oTo.createHX({ hieuXe }).then((data) => {
    if (data.status == 200) {
      main();
      return;
    }
  });
}

function suaTiepNhanXeToiDa(giaTriThamSo) {
  oTo
    .updateMax({ tenThamSo: "soXeSuaChuaToiDa", giaTriThamSo: +giaTriThamSo })
    .then((data) => {
      main();
    });
}

function tiepNhanXe(info) {
  const {
    bienSo,
    tenChuXe,
    sdt,
    diaChi,
    email,
    hieuXe,
    ngayTiepNhan,
    soXeDaTiepNhan,
  } = info;
  oTo
    .createFix({
      bienSoXe: bienSo,
      tenChuXe,
      sdt,
      diaChi,
      email,
      maHX: hieuXe,
      ngayTiepNhan,
    })
    .then(async (data) => {
      console.log(data);
      if (data.data.code == 200) {
        await localStorage.setItem("soXeTiepNhanTrongNgay", soXeDaTiepNhan + 1);
        await Toastify({
          text: "Tiếp nhận thành công",
          backgroundColor: "#0000008f",
          className: "info",
        }).showToast();
        location.reload();
      }
    });
}

async function main() {
  console.log("run main");

  setNewDate();

  const getHX = await oTo.getHX();
  const arrHX = getHX.data.data;
  console.log(arrHX);

  const getMax = await oTo.getMax();
  console.log(getMax);
  const maxXeTiepNhan = getMax.data.data.GiaTriThamSo;
  const soXeDaTiepNhan = +localStorage.getItem("soXeTiepNhanTrongNgay");

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
    $(".xeSelection").empty();
    arrHX.map((item) => {
      $(".xeSelection").append(
        `<option value='${item.MaHX}'>${item.TenHX}</option>`
      );
    });
    $(".maxTiepNhan").empty();
    $(".maxTiepNhan").append(`<span>${maxXeTiepNhan}</span>`);
    $(".soXeDaTiepNhan").empty();
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
        // check sửa xe tối đa
        if (maxXeTiepNhan == soXeDaTiepNhan) {
          Toastify({
            text: "Đã tiếp nhân đủ xe trong ngày",
            backgroundColor: "red",
            className: "info",
          }).showToast();
          throw new Error({ errTiepNhan: "Đã tiếp nhân đủ xe trong ngày" });
        }
        // gửi lên server
        tiepNhanXe({
          tenChuXe,
          bienSo,
          sdt,
          email,
          hieuXe,
          sdt,
          ngayTiepNhan,
          diaChi,
          soXeDaTiepNhan,
        });
        
        return;
      });

      $(".buttonNewHieuXe").click(function (e) {
        e.preventDefault();
        $("#newHieuXe").empty();
        let newHieuXe = $("#newHieuXe").val();
        console.log(newHieuXe);
        checkNull(newHieuXe, "err-newHieuXe");
        themMoiHieuXe(newHieuXe);
        $(".buttonNewHieuXe").attr("data-dismiss", "modal");
        Toastify({
          text: "Thêm hiệu xe thành công",
          backgroundColor: "#0000008f",
          className: "info",
        }).showToast();
        return;
      });

      $(".buttoneditMaxXe").click(function (e) {
        $("#editMaxXe").empty();
        let editMaxXe = $("#editMaxXe").val();
        e.preventDefault();
        checkNull(editMaxXe, "err-editMaxXe");
        $(".buttoneditMaxXe").attr("data-dismiss", "modal");
        suaTiepNhanXeToiDa(editMaxXe);
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
      Toastify({
        text: error,
        backgroundColor: "red",
        className: "info",
      }).showToast();
    }
  });
  return;
}

main();
