const arrXe = [
  {
    bienSo: '29A-999.90',
    hieuXe: 'Ford',
    tenChuXe: 'Vũ Xuân Cường',
    tienNo: '3.000.000'
  },
  {
    bienSo: '29A-999.91',
    hieuXe: 'Ford',
    tenChuXe: 'Vũ Xuân Cường',
    tienNo: '3.000.000'
  },
  {
    bienSo: '29A-999.92',
    hieuXe: 'Ford',
    tenChuXe: 'Vũ Xuân Cường',
    tienNo: '3.000.000'
  },
  {
    bienSo: '29A-999.93',
    hieuXe: 'Ford',
    tenChuXe: 'Vũ Xuân Cường',
    tienNo: '3.000.000'
  },
  {
    bienSo: '29A-999.94',
    hieuXe: 'Ford',
    tenChuXe: 'Vũ Xuân Cường',
    tienNo: '3.000.000'
  },
  {
    bienSo: '29A-999.95',
    hieuXe: 'Ford',
    tenChuXe: 'Vũ Xuân Cường',
    tienNo: '3.000.000'
  },
  {
    bienSo: '29A-999.96',
    hieuXe: 'Ford',
    tenChuXe: 'Vũ Xuân Cường',
    tienNo: '3.000.000'
  } ,
  {
    bienSo: '29A-999.97',
    hieuXe: 'Ford',
    tenChuXe: 'Vũ Xuân Cường',
    tienNo: '3.000.000'
  } ,
  {
    bienSo: '29A-999.98',
    hieuXe: 'Ford',
    tenChuXe: 'Vũ Xuân Cường',
    tienNo: '3.000.000'
  } ,
  {
    bienSo: '29A-999.99',
    hieuXe: 'Ford',
    tenChuXe: 'Vũ Xuân Cường',
    tienNo: '3.000.000'
  } 
]

const addEditModal = (item) => {
  $('.modalAdd').empty()
  $('.modalAdd').append(`
  <div class="modal fade" id="modalEdit${item.bienSo}" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-small" role="document">
      <div class="modal-content">
        <div class="modal-body text-center text-white">
          <h3>Sửa chi tiết thông tin xe</h3>
          <p>${item.bienSo}</p>
        </div>
        <div class="form-group mb-2">
          <label for="newHieuXe">Hiệu xe</label>
          <input type="text" class="form-control" name="newHieuXe" id="newHieuXe" aria-describedby="helpId"
            placeholder="${item.hieuXe}">
          <div class="error err-newHieuXe"></div>
        </div>
        <div class="form-group mb-2">
          <label for="newTenChuXe">Tên chủ xe</label>
          <input type="text" class="form-control" name="newTenChuXe" id="newTenChuXe" aria-describedby="helpId"
            placeholder="${item.tenChuXe}">
          <div class="error err-newTenChuXe"></div>
        </div>
        <div class="form-group mb-2">
          <label for="newTienNo">Tiền nợ</label>
          <input type="text" class="form-control" name="newTienNo" id="newTienNo" aria-describedby="helpId"
            placeholder="${item.tienNo}">
          <div class="error err-newTienNo"></div>
        </div>
        <div class="modal-footer justify-content-end">
          <button type="button" class="btn btn-white btn-sm mr-2" data-dismiss="modal">Đóng</button>
          <button type="button" class="btn btn-success btn-sm ml-2 buttonNewHieuXe">Sửa</button>
        </div>
      </div>
    </div>
  </div>
  `)
}

const addDeleteModal = (item) => {
  $('.modalAdd').empty()
  $('.modalAdd').append(`
  <div class="modal fade" id="modalDelete${item.bienSo}" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-small" role="document">
      <div class="modal-content">
        <div class="modal-body text-center text-white">
          <h3>Xóa chi tiết xe</h3>
          <p>${item.bienSo}</p>
        </div>
        <p  class="text-center">Bạn vẫn muốn xóa thông tin chi tiết về xe</p>
        <p  class="text-center">${item.bienSo} ?</p>
        <div class="modal-footer justify-content-end">
          <button type="button" class="btn btn-white btn-sm mr-2" data-dismiss="modal">Đóng</button>
          <button type="button" class="btn btn-success btn-sm ml-2 buttonNewHieuXe">xóa</button>
        </div>
      </div>
    </div>
  </div>
  `)
}

$(document).ready(function () {
  arrXe.map((item,index) => {
    $('.tbody').append(`
    <tr>
              <td class="text-center">${index + 1}</td>
              <td class="text-center">${item.bienSo}</td>
              <td class="text-center">${item.hieuXe}</td>
              <td class="text-center">${item.tenChuXe}</td>
              <td class="text-center">${item.tienNo}</td>
              <td class="td-actions text-center">
                <button type="button" rel="tooltip" class="btn btn-success btn-round btn-just-icon btn-sm btnEdit${index}"
                  data-toggle="modal" data-target="#modalEdit${item.bienSo}">
                  <i class="material-icons">edit</i>
                  <div class="ripple-container"></div>
                </button>
                <button type="button" rel="tooltip" class="btn btn-danger btn-round btn-just-icon btn-sm btnDelete${index}"
                  data-toggle="modal" data-target="#modalDelete${item.bienSo}">
                  <i class="material-icons">close</i>
                  <div class="ripple-container">
                  </div>
                </button>
              </td>
            </tr>
    `)

    $(`.btnEdit${index}`).click(function(e) {
      e.preventDefault();
      addEditModal(item)
    })
    $(`.btnDelete${index}`).click(function(e) {
      e.preventDefault();
      addDeleteModal(item)
    })
  })
})
