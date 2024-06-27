const add = document.getElementById("add");
const plu = document.getElementById("plu");
const count = document.getElementById("count");
document.getElementById("print").addEventListener("click", () => {
  window.print();
});
// them phan tu vao bang
add.onclick = () => {
  var pluValue = plu.value.trim(); // Lấy giá trị từ input plu và loại bỏ khoảng trắng thừa
  var countValue = count.value.trim(); // Lấy giá trị từ input count và loại bỏ khoảng trắng thừa

  if (pluValue === "" || countValue === "") {
    alert("CHỊ CHƯA NHẬP ĐỦ DỮ LIỆU MÀ <3");
  } else {
    var table = document.getElementById("myTable");
    var newRow = table.insertRow();
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    cell1.innerHTML = "29" + pluValue;
    cell2.innerHTML = countValue;
    cell3.innerHTML = `<td><button class="del-when-print" onclick="xoaDong(this)">Delete</button></td>`;

    // Lưu dữ liệu vào localStorage
    var savedRows = localStorage.getItem("savedRows");
    if (!savedRows) {
      savedRows = [];
    } else {
      savedRows = JSON.parse(savedRows);
    }

    var rowData = {
      plu: "29" + pluValue,
      count: countValue,
    };

    savedRows.push(rowData);
    localStorage.setItem("savedRows", JSON.stringify(savedRows));

    // Xóa giá trị nhập liệu sau khi thêm vào bảng
    plu.value = "";
    count.value = "";
    plu.focus();
  }
};

document.addEventListener("DOMContentLoaded", function () {
  // Lấy dữ liệu từ localStorage
  var savedRows = localStorage.getItem("savedRows");
  if (savedRows) {
    savedRows = JSON.parse(savedRows);
    var table = document.getElementById("myTable");

    savedRows.forEach(function (rowData) {
      var newRow = table.insertRow();
      var cell1 = newRow.insertCell(0);
      var cell2 = newRow.insertCell(1);
      var cell3 = newRow.insertCell(2);
      cell1.innerHTML = rowData.plu;
      cell2.innerHTML = rowData.count;
      cell3.innerHTML = `<td><button class="del-when-print" onclick="xoaDong(this)">Delete</button></td>`;
    });
  }
});


plu.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault(); 
        count.focus(); 
    }
});

count.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault(); 
        add.click(); 
    }
});

function xoaDong(button) {
  var row = button.parentNode.parentNode;
  row.remove();
}
