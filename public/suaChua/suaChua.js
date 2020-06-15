// getAndAddData = () => {

//   return {
//     arrbienSo, arrTienCong, arrVatTuPhuTung
//   }
// }

async function main() {
  const getXe = await oTo.getAllXe();
  const arrXe = getXe.data.data;
  const arrbienSo = [];
  arrXe.map((item) => {
    arrbienSo.push(item.BienSoXe);
  });

  const getTienCong = await oTo.getTienCong();
  const getPhuTung = await oTo.getPhuTung();
  console.log(getTienCong, getPhuTung);

  arrTienCong = getTienCong.data.data;
  arrVatTuPhuTung = getPhuTung.data.data;
  console.log(arrTienCong, arrVatTuPhuTung);

  const arrTable = [];

  const checkNull = (data, nameTag) => {
    $(`.${nameTag}`).empty();
    if (data.trim() == "" || data == null) {
      $(`.${nameTag}`).append(`! vui lòng nhập`);
      throw { errForm: "checkNull" };
    }
  };

  const timInfo = (vatTuCanTim) => {
    return arrVatTuPhuTung.filter((item) => item.TenPT === vatTuCanTim)[0];
  };

  const timInfoTC = (TienCongCanTim) => {
    console.log(TienCongCanTim)
    return arrTienCong.filter((item) => item.TenTienCong == TienCongCanTim)[0];
  };

  const themInfo = (info) => {
    $("#themDonGia").val(info.DonGia);
  };

  const addEditVTPTModal = (item) => {
    $(".modalAdd").empty();
    $(".modalAdd").append(`
  <div class="modal fade" id="modalEditVTPT${item.TenPT}" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-small" role="document">
      <div class="modal-content">
        <div class="modal-body text-center text-white">
          <h3>Sửa vật tư phụ tùng</h3>
        </div>
        <div class="form-group mb-2">
          <label for="tenVatTuPhuTung">Tên</label>
          <input type="text" class="form-control" name="tenVatTuPhuTung" id="tenVatTuPhuTung" aria-describedby="helpId"
            placeholder="${item.TenPT}">
          <div class="error err-tenVatTuPhuTung"></div>
        </div>
        <div class="form-group mb-2">
          <label for="donGia">Đơn giá</label>
          <input type="text" class="form-control" name="donGia" id="donGia" aria-describedby="helpId"
            placeholder="${item.DonGia}">
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
  <div class="modal fade" id="modalDeleteVTPT${item.TenPT}" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-small" role="document">
      <div class="modal-content">
        <div class="modal-body text-center text-white">
          <h3>Xóa vật tư phụ tùng</h3>
        </div>
        <p  class="text-center">Bạn vẫn muốn xóa vật tư </p>
        <p  class="text-center font-weight-bold">${item.TenPT} ?</p>
        <div class="modal-footer justify-content-end">
          <button type="button" class="btn btn-white btn-sm mr-2" data-dismiss="modal">Đóng</button>
          <button type="button" class="btn btn-success btn-sm ml-2 buttonDeletePt">xóa</button>
        </div>
      </div>
    </div>
  </div>
  `);
  $('.buttonDeletePt').click(function(e) {
    e.preventDefault()
    $(".buttonDeletePt").attr("data-dismiss", "modal");
    oTo.deletePhuTung({maPhuTung: item.MaPT}).then(data=> {
      if(data.status == 200) {
        main()
      }
    })
  })
  };

  const addEditTCModal = (item) => {
    $(".modalAdd").empty();
    $(".modalAdd").append(`
  <div class="modal fade" id="modalEditTC${item.TenTienCong}" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-small" role="document">
      <div class="modal-content">
        <div class="modal-body text-center text-white">
          <h3>Sửa tiền công</h3>
        </div>
        <div class="form-group mb-2">
          <label for="tenTienCong">Tên</label>
          <input type="text" class="form-control" name="tenTienCong" id="tenTienCong" aria-describedby="helpId"
            placeholder="${item.TenTienCong}">
          <div class="error err-tenTienCong"></div>
        </div>
        <div class="form-group mb-2">
          <label for="TriGia">Giá công</label>
          <input type="text" class="form-control" name="TriGia" id="TriGia" aria-describedby="helpId"
            placeholder="${item.TriGia}">
          <div class="error err-TriGia"></div>
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
    console.log(item)
    $(".modalAdd").empty();
    $(".modalAdd").append(`
  <div class="modal fade" id="modalDeleteTC${item.TenTienCong}" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-small" role="document">
      <div class="modal-content">
        <div class="modal-body text-center text-white">
          <h3>Xóa vật tư phụ tùng</h3>
        </div>
        <p  class="text-center">Bạn vẫn muốn xóa công</p>
        <p  class="text-center font-weight-bold">${item.TenTienCong} ?</p>
        <div class="modal-footer justify-content-end">
          <button type="button" class="btn btn-white btn-sm mr-2" data-dismiss="modal">Đóng</button>
          <button type="button" class="btn btn-success btn-sm ml-2 buttonDeleteTc">xóa</button>
        </div>
      </div>
    </div>
  </div>
  `);
    $('.buttonDeleteTc').click(function(e) {
      e.preventDefault()
      $(".buttonDeleteTc").attr("data-dismiss", "modal");
      oTo.deleteTienCong({maTienCong: item.MaTienCong}).then(data=> {
        if(data.status == 200) {
          main()
        }
      })
    })
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
      console.log(val);
      const info = await timInfo(val);
      if (info) {
        themInfo(info);
      }
    });
    // thêm option biển số
    $(".bienSoSelection").empty()
    $(".themTienCongSelection").empty()
    $(".themNoiDungSelection").empty()
    $(".themVatTuPhuTungSelection").empty()
    arrbienSo.map((item) => {
      $(".bienSoSelection").append(`<option value='${item}'>${item}</option>`);
    });
    // thêm option tiền công
    arrTienCong.map((item) => {
      $(".themTienCongSelection").append(
        `<option value='${item.TriGia}'>${item.TenTienCong}</option>`
      );
      $(".themNoiDungSelection").append(
        `<option value='${item.TenTienCong}'>${item.TenTienCong}</option>`
      );
    });
    // option vật tư phụ tùng
    arrVatTuPhuTung.map((item) => {
      $(".themVatTuPhuTungSelection").append(`<option>${item.TenPT}</option>`);
    });
    // option vtpt vào edit vtpt
    $(".vatTuPhuTungTable").empty();
    arrVatTuPhuTung.map((item, index) => {
      $(".vatTuPhuTungTable").append(`
    <tr>
              <td class="text-center">${index + 1}</td>
              <td class="text-center">${item.TenPT}</td>
              <td class="text-center">${item.DonGia}</td>
              <td class="td-actions text-center">
                <button type="button" rel="tooltip" class="btn btn-success btn-round btn-just-icon btn-sm btnEditVTPT${index}"
                  data-toggle="modal" data-target="#modalEditVTPT${item.TenPT}">
                  <i class="material-icons">edit</i>
                  <div class="ripple-container"></div>
                </button>
                <button type="button" rel="tooltip" class="btn btn-danger btn-round btn-just-icon btn-sm btnDeleteVTPT${index}"
                  data-toggle="modal" data-target="#modalDeleteVTPT${
                    item.TenPT
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
              <td class="text-center">${item.TenTienCong}</td>
              <td class="text-center">${item.TriGia}</td>
              <td class="td-actions text-center">
                <button type="button" rel="tooltip" class="btn btn-success btn-round btn-just-icon btn-sm btnEditTC${index}"
                  data-toggle="modal" data-target="#modalEditTC${item.TenTienCong}">
                  <i class="material-icons">edit</i>
                  <div class="ripple-container"></div>
                </button>
                <button type="button" rel="tooltip" class="btn btn-danger btn-round btn-just-icon btn-sm btnDeleteTC${index}"
                  data-toggle="modal" data-target="#modalDeleteTC${item.TenTienCong}">
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
    $(".soLoaiTienCong").empty()
    $(".soLoaiVatTuPhuTung").empty()
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

      console.log(arrTable);
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
      $("#taoPhieuSuaChua").click( async function (e) {
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
        arrTable.map(async (item) => {
          console.log(item)
          let infoTC = await timInfoTC(item.noiDung)
          console.log(infoTC)
          let thanhTienPT = +(item.donGia * item.soLuong)
          let thanhTien = thanhTienPT + +item.tienCong;
          console.log(ngaySuaChua, bienSo, item.noiDung, thanhTienPT, infoTC.MaTienCong, thanhTien)
          oTo.createSuaChua({
            ngaySuaChua,
            bienSo,
            noiDung: item.noiDung,
            thanhTienPT,
            maTienCong: infoTC.MaTienCong,
            tongTien: thanhTien
          }).then(data => {
            if(data.status == 200) {
              location.reload()
            }
          })
        });
      });
    } catch (error) {
      console.log("loi:", error);
    }

  });
}
// them tien cong
$('.buttonAddTienCong').click( e => {
  e.preventDefault()
  let newTienCong = $('#tenTienCongMoi').val()
  let newTriGia = $('#giaCongMoi').val()
  $(".buttonAddTienCong").attr("data-dismiss", "modal");
  oTo.addTienCong({
    tenTienCong: newTienCong,
    triGia: newTriGia
  }).then(data => {
    if(data.status == 200) {
      main()
    }
  })
})

// them phu tung
$('.buttonAddVatTuPhuTung').click( e => {
  e.preventDefault()
  let newPhuTung = $('#tenVatTuPhuTungMoi').val()
  let newDonGia = $('#donGiaMoi').val()
  $(".buttonAddVatTuPhuTung").attr("data-dismiss", "modal");
  oTo.addPhuTung({
    tenPT: newPhuTung,
    donGia: newDonGia
  }).then(data => {
    if(data.status == 200) {
      main()
    }
  })
})
main();
