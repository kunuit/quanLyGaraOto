const arrInfoXe = [
  {
    bienSo: "29A-999.90",
    email: "abc@gmail.com",
    sdt: "0123456789",
    tenChuXe: "Vũ Xuân Cường",
    tienNo: "3000000",
  },
  {
    bienSo: "29A-999.91",
    email: "abc@gmail.com",
    sdt: "0123456789",
    tenChuXe: "Vũ Xuân Cường",
    tienNo: "3000000",
  },
  {
    bienSo: "29A-999.92",
    email: "abc@gmail.com",
    sdt: "0123456789",
    tenChuXe: "Vũ Xuân Cường",
    tienNo: "3000000",
  },
  {
    bienSo: "29A-999.93",
    email: "abc@gmail.com",
    sdt: "0123456789",
    tenChuXe: "Vũ Xuân Cường",
    tienNo: "3000000",
  },
  {
    bienSo: "29A-999.94",
    email: "abc@gmail.com",
    sdt: "0123456789",
    tenChuXe: "Vũ Xuân Cường",
    tienNo: "3000000",
  },
  {
    bienSo: "29A-999.95",
    email: "abc@gmail.com",
    sdt: "0123456789",
    tenChuXe: "Vũ Xuân Cường",
    tienNo: "3000000",
  },
  {
    bienSo: "29A-999.96",
    email: "abc@gmail.com",
    sdt: "0123456789",
    tenChuXe: "Vũ Xuân Cường",
    tienNo: "3000000",
  },
  {
    bienSo: "29A-999.97",
    email: "abc@gmail.com",
    sdt: "0123456789",
    tenChuXe: "Vũ Xuân Cường",
    tienNo: "3000000",
  },
  {
    bienSo: "29A-999.98",
    email: "abc@gmail.com",
    sdt: "0123456789",
    tenChuXe: "Vũ Xuân Cường",
    tienNo: "3000000",
  },
  {
    bienSo: "29A-999.99",
    email: "abc@gmail.com",
    sdt: "0123456789",
    tenChuXe: "Vũ Xuân Cường",
    tienNo: "3000000",
  },
];

const checkNull = (data, nameTag) => {
  $(`.${nameTag}`).empty();
  if (data.trim() == "" || data == null) {
    $(`.${nameTag}`).append(`! vui lòng nhập`);
    throw new Error({ errForm: "checkNull" });
  }
};

// trả về 1 object infoXe :v hoi chuoi 1 tý
const timInfo = (bienSoCanTim) => {
  return arrInfoXe.filter((item) => item.bienSo === bienSoCanTim)[0];
};

const themInfo = (info) => {
  $("#tenChuXe").val(info.tenChuXe);
  $("#sdt").val(info.sdt);
  $("#email").val(info.email);
  $("#soTienNo").val(info.tienNo);
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
    $(".bienSoSelection").append(`<option>${item.bienSo}</option>`);
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
      if (soTienThu > info.tienNo) {
        $(`.err-soTienThu`).append(`! tiền thu <= tiền nợ`);
        throw new Error({ errForm: "Thu <= No" });
      }

      console.log("tien hanh gửi qua back-end");
    });
  } catch (error) {
    console.log(error);
  }
});
