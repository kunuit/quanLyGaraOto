const arrbienSo = ["29A-999.91", "29A-999.92", "29A-999.93", "29A-999.94"];

const arrTienCong = [
  { giaCong: 100000, name: "bơm xe" },
  { giaCong: 200000, name: "vá xe" },
  { giaCong: 300000, name: "thay nhớt xe" },
  { giaCong: 400000, name: "rửa xe" },
  { giaCong: 500000, name: "sơn xe" },
  { giaCong: 600000, name: "dán xe" },
  { giaCong: 700000, name: "bán xe" },
];

const arrVatTuPhuTung = [
  {
    name: "phanh abs",
    donGia: 1000000,
  },
  {
    name: "phụt CC",
    donGia: 1350000,
  },
  {
    name: "bánh xe AAA",
    donGia: 2500000,
  },
  {
    name: "kính aloa",
    donGia: 1000000,
  },
];

const arrTable = [];

const maxXeTiepNhan = 30;
const soXeDaTiepNhan = 20;

const checkNull = (data, nameTag) => {
  $(`.${nameTag}`).empty();
  if (data.trim() == "" || data == null) {
    $(`.${nameTag}`).append(`! vui lòng nhập`);
    throw { errForm: "checkNull" };
  }
};

const timInfo = (vatTuCanTim) => {
  return arrVatTuPhuTung.filter((item) => item.name === vatTuCanTim)[0];
};

const themInfo = (info) => {
  $("#themDonGia").val(info.donGia);
};

const addEditVTPTModal = (item) => {
  $(".modalAdd").empty();
  $(".modalAdd").append(`
  <div class="modal fade" id="modalEditVTPT${item.name}" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-small" role="document">
      <div class="modal-content">
        <div class="modal-body text-center text-white">
          <h3>Sửa vật tư phụ tùng</h3>
        </div>
        <div class="form-group mb-2">
          <label for="tenVatTuPhuTung">Tên</label>
          <input type="text" class="form-control" name="tenVatTuPhuTung" id="tenVatTuPhuTung" aria-describedby="helpId"
            placeholder="${item.name}">
          <div class="error err-tenVatTuPhuTung"></div>
        </div>
        <div class="form-group mb-2">
          <label for="donGia">Đơn giá</label>
          <input type="text" class="form-control" name="donGia" id="donGia" aria-describedby="helpId"
            placeholder="${item.donGia}">
          <div class="error err-donGia"></div>
        </div>
        <div class="modal-footer justify-content-end">
          <button type="button" class="btn btn-white btn-sm mr-2" data-dismiss="modal">Đóng</button>
          <button type="button" class="btn btn-success btn-sm ml-2 buttonNewHieuXe">Sửa</button>
        </div>
      </div>
    </div>
  </div>
  `);
};

const addDeleteVTPTModal = (item) => {
  $(".modalAdd").empty();
  $(".modalAdd").append(`
  <div class="modal fade" id="modalDeleteVTPT${item.name}" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-small" role="document">
      <div class="modal-content">
        <div class="modal-body text-center text-white">
          <h3>Xóa vật tư phụ tùng</h3>
        </div>
        <p  class="text-center">Bạn vẫn muốn xóa vật tư </p>
        <p  class="text-center font-weight-bold">${item.name} ?</p>
        <div class="modal-footer justify-content-end">
          <button type="button" class="btn btn-white btn-sm mr-2" data-dismiss="modal">Đóng</button>
          <button type="button" class="btn btn-success btn-sm ml-2 buttonNewHieuXe">xóa</button>
        </div>
      </div>
    </div>
  </div>
  `);
};

const addEditTCModal = (item) => {
  $(".modalAdd").empty();
  $(".modalAdd").append(`
  <div class="modal fade" id="modalEditTC${item.name}" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-small" role="document">
      <div class="modal-content">
        <div class="modal-body text-center text-white">
          <h3>Sửa tiền công</h3>
        </div>
        <div class="form-group mb-2">
          <label for="tenTienCong">Tên</label>
          <input type="text" class="form-control" name="tenTienCong" id="tenTienCong" aria-describedby="helpId"
            placeholder="${item.name}">
          <div class="error err-tenTienCong"></div>
        </div>
        <div class="form-group mb-2">
          <label for="giaCong">Giá công</label>
          <input type="text" class="form-control" name="giaCong" id="giaCong" aria-describedby="helpId"
            placeholder="${item.giaCong}">
          <div class="error err-giaCong"></div>
        </div>
        <div class="modal-footer justify-content-end">
          <button type="button" class="btn btn-white btn-sm mr-2" data-dismiss="modal">Đóng</button>
          <button type="button" class="btn btn-success btn-sm ml-2 buttonNewHieuXe">Sửa</button>
        </div>
      </div>
    </div>
  </div>
  `);
};

const addDeleteTCModal = (item) => {
  $(".modalAdd").empty();
  $(".modalAdd").append(`
  <div class="modal fade" id="modalDeleteTC${item.name}" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-small" role="document">
      <div class="modal-content">
        <div class="modal-body text-center text-white">
          <h3>Xóa vật tư phụ tùng</h3>
        </div>
        <p  class="text-center">Bạn vẫn muốn xóa công</p>
        <p  class="text-center font-weight-bold">${item.name} ?</p>
        <div class="modal-footer justify-content-end">
          <button type="button" class="btn btn-white btn-sm mr-2" data-dismiss="modal">Đóng</button>
          <button type="button" class="btn btn-success btn-sm ml-2 buttonNewHieuXe">xóa</button>
        </div>
      </div>
    </div>
  </div>
  `);
};

$(document).ready(function () {
  //init DateTimePickers
  materialKit.initFormExtendedDatetimepickers();

  // Sliders Init
  // materialKit.initSliders()
  $(function () {
    $("select").selectpicker();
  });

  $("select").on("change", async function (e) {
    const val = this.value;
    const info = await timInfo(val);
    if (info) {
      themInfo(info);
    }
  });
  // thêm option biển số
  arrbienSo.map((item) => {
    $(".bienSoSelection").append(`<option>${item}</option>`);
  });
  // thêm option tiền công
  arrTienCong.map((item) => {
    $(".themTienCongSelection").append(
      `<option value='${item.giaCong}'>${item.name}</option>`
    );
  });
  // option vật tư phụ tùng
  arrVatTuPhuTung.map((item) => {
    $(".themVatTuPhuTungSelection").append(`<option>${item.name}</option>`);
  });
  // option vtpt vào edit vtpt
  $(".vatTuPhuTungTable").empty();
  arrVatTuPhuTung.map((item, index) => {
    $(".vatTuPhuTungTable").append(`
    <tr>
              <td class="text-center">${index + 1}</td>
              <td class="text-center">${item.name}</td>
              <td class="text-center">${item.donGia}</td>
              <td class="td-actions text-center">
                <button type="button" rel="tooltip" class="btn btn-success btn-round btn-just-icon btn-sm btnEditVTPT${index}"
                  data-toggle="modal" data-target="#modalEditVTPT${item.name}">
                  <i class="material-icons">edit</i>
                  <div class="ripple-container"></div>
                </button>
                <button type="button" rel="tooltip" class="btn btn-danger btn-round btn-just-icon btn-sm btnDeleteVTPT${index}"
                  data-toggle="modal" data-target="#modalDeleteVTPT${
                    item.name
                  }">
                  <i class="material-icons">close</i>
                  <div class="ripple-container">
                  </div>
                </button>
              </td>
            </tr>
    `);
    // xử lý VTPT click action
    $(`.btnEditVTPT${index}`).click(function (e) {
      e.preventDefault();
      addEditVTPTModal(item);
    });
    $(`.btnDeleteVTPT${index}`).click(function (e) {
      e.preventDefault();
      addDeleteVTPTModal(item);
    });
  });
  // option tiền công vào edit tc
  $(".tienCongTable").empty();
  arrTienCong.map((item, index) => {
    $(".tienCongTable").append(`
    <tr>
              <td class="text-center">${index + 1}</td>
              <td class="text-center">${item.name}</td>
              <td class="text-center">${item.giaCong}</td>
              <td class="td-actions text-center">
                <button type="button" rel="tooltip" class="btn btn-success btn-round btn-just-icon btn-sm btnEditTC${index}"
                  data-toggle="modal" data-target="#modalEditTC${item.name}">
                  <i class="material-icons">edit</i>
                  <div class="ripple-container"></div>
                </button>
                <button type="button" rel="tooltip" class="btn btn-danger btn-round btn-just-icon btn-sm btnDeleteTC${index}"
                  data-toggle="modal" data-target="#modalDeleteTC${item.name}">
                  <i class="material-icons">close</i>
                  <div class="ripple-container">
                  </div>
                </button>
              </td>
            </tr>
    `);
    // xử lý TC click action
    $(`.btnEditTC${index}`).click(function (e) {
      e.preventDefault();
      addEditTCModal(item);
    });
    $(`.btnDeleteTC${index}`).click(function (e) {
      e.preventDefault();
      addDeleteTCModal(item);
    });
  });
  // tag số loại tiền công và tag số loại vật tư phụ tung
  $(".soLoaiTienCong").append(arrTienCong.length);
  $(".soLoaiVatTuPhuTung").append(arrVatTuPhuTung.length);
  // something else
  $(".addNoiDung").click(function (e) {
    e.preventDefault();
  });

  // click thêm mới noi dong
  $(".buttonThemNoiDung").click(function (e) {
    let vatTuPhuTung = $("#themVatTuPhuTung").val();
    let noiDung = $("#themNoiDung").val();
    let donGia = $("#themDonGia").val();
    let soLuong = $("#themSoLuong").val();
    let tienCong = $("#themTienCong").val();
    e.preventDefault();
    checkNull(noiDung, "err-themNoiDung");
    checkNull(donGia, "err-themDonGia");
    checkNull(soLuong, "err-themSoLuong");

    // push arrTable

    arrTable.push({
      noiDung,
      vatTuPhuTung,
      soLuong,
      donGia,
      tienCong,
    });
    // them du lieu vao mainTable
    $(".mainTable").empty();
    let tongTien = 0;
    arrTable.map((item, index) => {
      let thanhTien = +(item.donGia * item.soLuong) + +item.tienCong;
      tongTien += thanhTien;
      $(".mainTable").append(`
        <tr>
              <td class="text-center">${index + 1}</td>
              <td class="text-center">${item.noiDung}</td>
              <td class="text-center">${item.vatTuPhuTung}</td>
              <td class="text-center">${item.soLuong}</td>
              <td class="text-center">${item.donGia}</td>
              <td class="text-center">${item.tienCong}</td>
              <td class="text-center">${thanhTien}</td>
        </tr>
      `);
    });
    // chang Tổng tiền
    $(".tongTien").empty();
    $(".tongTien").append(tongTien);
    // đóng modal
    $(".buttonThemNoiDung").attr("data-dismiss", "modal");
  });

  // xử lý trước khi gửi phiếu sửa chữa qua back-end
  try {
    $("#taoPhieuSuaChua").click(function (e) {
      let bienSo = $("#bienSo").val();
      let ngaySuaChua = $("#ngaySuaChua").val();
      e.preventDefault();
      checkNull(ngaySuaChua, "err-ngaySuaChua");
      console.log(arrTable, bienSo, ngaySuaChua);
      if (arrTable.length == 0) {
        Toastify({
          text: "Chưa có nội dung sửa chữa",
          backgroundColor: "red",
          className: "primary",
        }).showToast();
        throw { errForm: "Nội dung trống" };
      }
      console.log("xử lý gửi phiếu sửa chửa qua cho back-end");
    });
  } catch (error) {
    console.log("loi:", error);
  }

  // click edit vtpt
});
