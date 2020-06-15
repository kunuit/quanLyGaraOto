function thuTien(info) {
  const { bienSo, soTienThu } = info;
  oTo
    .createBill({
      bienSo,
      tienThu: +soTienThu,
    })
    .then((data) => {
      console.log(data)
      if (data.data.code == 200)
      location.reload();
    });
}

async function main() {
  const getXe = await oTo.getAllXe();
  const arrInfoXe = getXe.data.data;
  const checkNull = (data, nameTag) => {
    $(`.${nameTag}`).empty();
    if (data.trim() == "" || data == null) {
      $(`.${nameTag}`).append(`! vui lòng nhập`);
      throw new Error({ errForm: "checkNull" });
    }
  };

  // trả về 1 object infoXe :v hoi chuoi 1 tý
  const timInfo = (bienSoCanTim) => {
    return arrInfoXe.filter((item) => item.BienSoXe === bienSoCanTim)[0];
  };

  const themInfo = (info) => {
    $("#tenChuXe").val(info.TenChuXe);
    $("#sdt").val(info.SoDT);
    $("#email").val(info.Email);
    $("#soTienNo").val(info.TienNo);
  };

  $(document).ready(function () {
    //init DateTimePickers
    materialKit.initFormExtendedDatetimepickers();

    // Sliders Init
    // materialKit.initSliders();

    $(function () {
      $("select").selectpicker();
    });

    $("select").on("change", async function (e) {
      const val = this.value;
      const info = await timInfo(val);
      themInfo(info);
    });

    arrInfoXe.map((item) => {
      $(".bienSoSelection").append(`<option>${item.BienSoXe}</option>`);
    });

    try {
      $("#xacNhanThuTien").click(async function (e) {
        let tenChuXe = $("#tenChuXe").val();
        let bienSo = $("#bienSo").val();
        let sdt = $("#sdt").val();
        let email = $("#email").val();
        let ngayThuTien = $("#ngayThuTien").val();
        let soTienThu = $("#soTienThu").val();
        let soTienNo = $("#soTienNo").val();
        e.preventDefault();

        checkNull(tenChuXe, "err-tenChuXe");
        checkNull(bienSo, "err-bienSo");
        checkNull(sdt, "err-sdt");
        checkNull(email, "err-email");
        checkNull(soTienNo, "err-soTienNo");
        checkNull(ngayThuTien, "err-ngayThuTien");
        checkNull(soTienThu, "err-soTienThu");
        
        const info = await timInfo(bienSo);
        if (soTienThu > info.TienNo) {
          $(`.err-soTienThu`).append(`! tiền thu <= tiền nợ`);
          throw ({ errForm: "Thu <= No" });
        }
          // thuTien({ bienSo, soTienThu });
          Toastify({
            text: "Thu tiền thành công",
            backgroundColor: "#0000008f",
            className: "primary",
          }).showToast();

        
      });
    } catch (error) {
      console.log(error);
    }
  });
}

main();
