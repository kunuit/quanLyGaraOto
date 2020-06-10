var oTo = (function () {
  'use strict';

  const host = 'http://localhost:3000';
  const getHX = function () {
    return new Promise(function (resolve, reject) {
      axios.get(`${host}/xe/hieuXe`).then(data => {
        resolve(data);
      })
        .catch(err => {
          reject(err);
        });
    })
  };
  const createHX = function (info) {
    return new Promise(function (resolve, reject) {
      axios.post(`${host}/xe/hieuXe`, info).then(data => {
        resolve(data);
      })
        .catch(err => {
          reject(err);
        });
    })
  };
  const getMax = function () {
    return new Promise(function (resolve, reject) {
      axios.get(`${host}/thamSo`).then(data => {
        resolve(data);
      })
        .catch(err => {
          reject(err);
        });
    })
  };
  const updateMax = function (info) {
    return new Promise(function (resolve, reject) {
      axios.put(`${host}/thamSo`, info).then(data => {
        resolve(data);
      })
        .catch(err => {
          reject(err);
        });
    })
  };
  const createFix = function(info) {
    return new Promise(function (resolve, reject) {
      axios.post(`${host}/xe`, info).then(data => {
        resolve(data);
      })
        .catch(err => {
          reject(err);
        });
    })
  };

  const getAllXe = function(info) {
    return new Promise(function (resolve, reject) {
      axios.get(`${host}/xe`).then(data => {
        resolve(data);
      })
        .catch(err => {
          reject(err);
        });
    })
  };

  const createBill = function(info) {
    return new Promise(function (resolve, reject) {
      axios.post(`${host}/xe/thuTien`, info).then(data => {
        resolve(data);
      })
        .catch(err => {
          reject(err);
        });
    })
  };

  const getXeby = function(search) {
    return new Promise(function (resolve, reject) {
      axios.get(`${host}/xe/${search}`).then(data => {
        resolve(data);
      })
        .catch(err => {
          reject(err);
        });
    })
  };


  var index = oTo = {
    getHX,
    createHX,
    getMax,
    updateMax,
    createFix,
    getAllXe,
    createBill,
    getXeby
  };

  return index;

}());
