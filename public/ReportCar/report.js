const arrDoanhSo = [
  {
    hieuXe: "Ford",
    soLuotSua: 200,
    thanhTien: 20000000,
    tiLeDoanhSo: 23.8,
  },
  {
    hieuXe: "Toyota",
    soLuotSua: 300,
    thanhTien: 50000000,
    tiLeDoanhSo: 47.62,
  },
  {
    hieuXe: "Vinfast",
    soLuotSua: 100,
    thanhTien: 10000000,
    tiLeDoanhSo: 9.52,
  },
  {
    hieuXe: "Honda",
    soLuotSua: 250,
    thanhTien: 25000000,
    tiLeDoanhSo: 23.8,
  },
  {
    hieuXe: "Honda",
    soLuotSua: 250,
    thanhTien: 25000000,
    tiLeDoanhSo: 23.8,
  },
  {
    hieuXe: "Honda",
    soLuotSua: 250,
    thanhTien: 25000000,
    tiLeDoanhSo: 23.8,
  },
];

const arrVattu = [
  {
    vatTuThuTung: "banh xe 3A",
    tonDau: 200,
    phatSinh: 50,
    tonCuoi: 150,
  },
  {
    vatTuThuTung: "phụt cc",
    tonDau: 500,
    phatSinh: 10,
    tonCuoi: 350,
  },
  {
    vatTuThuTung: "kính AC",
    tonDau: 100,
    phatSinh: 200,
    tonCuoi: 50,
  },
  {
    vatTuThuTung: "phanh abs",
    tonDau: 200,
    phatSinh: 30,
    tonCuoi: 10,
  },
  {
    vatTuThuTung: "banh xe 3A",
    tonDau: 200,
    phatSinh: 50,
    tonCuoi: 150,
  },
  {
    vatTuThuTung: "banh xe 3A",
    tonDau: 200,
    phatSinh: 50,
    tonCuoi: 150,
  },
];

$(document).ready(function () {
  //init DateTimePickers
  // materialKit.initFormExtendedDatetimepickers();

  $("#datepicker").datepicker({
    format: "mm-yyyy",
    viewMode: "months",
    minViewMode: "months",
  });

  $(".btnSearch").click(function (e) {
    let monthSearch = $(".monthSearch").val();
    e.preventDefault();
    
      console.log('xử lý gửi tháng để trả về dữ liệu được xử lý ở back-end')
      // table  table doanh số
      $(".leftTable").empty()
      let tongTien = 0;
      arrDoanhSo.map((item, index) => {
        tongTien+= item.thanhTien
        $(".leftTable").append(`
        <tr>
                  <td class="text-center">${index + 1}</td>
                  <td class="text-center">${item.hieuXe}</td>
                  <td class="text-center">${item.soLuotSua}</td>
                  <td class="text-center">${item.thanhTien}</td>
                  <td class="text-center">${item.tiLeDoanhSo}</td>
        </tr>
        `);
      });
      // add tổng tiền
      $('.tongTien').empty()
      $('.tongTien').append(tongTien)

      // xử lý table vật tư
      $(".rightTable").empty()
      arrVattu.map((item, index) => {
        $(".rightTable").append(`
        <tr>
                  <td class="text-center">${index + 1}</td>
                  <td class="text-center">${item.vatTuThuTung}</td>
                  <td class="text-center">${item.tonDau}</td>
                  <td class="text-center">${item.phatSinh}</td>
                  <td class="text-center">${item.tonCuoi}</td>
        </tr>
        `);
      });
  });
});
