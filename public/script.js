

function js_btn1() {
  document.getElementById('create-btn').style.backgroundColor = '#0e7800';
  document.getElementById('create-btn').textContent = 'Join as a client';
  document.getElementById('create-btn').style.color = 'white';
  document.getElementById('js-btn1').style.background = '#f8f8f8';
  document.getElementById('js-btn1').style.border = '2px solid #108701';
  document.getElementById('js-btn2').style.background = '';
  document.getElementById('js-btn2').style.border = '';
  document.getElementById('create-btn').addEventListener("mouseover", function () {
    document.getElementById('create-btn').style.background = '#119100';
  });
  document.getElementById('create-btn').addEventListener("mouseout", function () {
    document.getElementById('create-btn').style.background = '#0e7800';
  });
  document.getElementById('create-btn').addEventListener("click", function () {
    location.href = '/client/csignup';
  });
  document.getElementById('js-btn1').classList.add('js-btn-style');
  document.querySelector('.radio2').style.color = ''
  document.querySelector('.radio1').style.color = '#108701'
}

function js_btn2() {
  document.getElementById('create-btn').style.backgroundColor = '#0e7800';
  document.getElementById('create-btn').textContent = 'Join as a freelancer';
  document.getElementById('create-btn').style.color = 'white';
  document.getElementById('js-btn2').style.background = '#f8f8f8';
  document.getElementById('js-btn2').style.border = '2px solid #108701';
  document.getElementById('js-btn1').style.background = '';
  document.getElementById('js-btn1').style.border = '';
  document.getElementById('create-btn').addEventListener("mouseover", function () {
    document.getElementById('create-btn').style.background = '#119100';
  });
  document.getElementById('create-btn').addEventListener("mouseout", function () {
    document.getElementById('create-btn').style.background = '#0e7800';
  });
  document.getElementById('create-btn').addEventListener("click", function () {
    window.location.href = '/client/fsignup'
  });
  document.getElementById('js-btn2').classList.add('js-btn-style');
  document.querySelector('.radio1').style.color = ''
  document.querySelector('.radio2').style.color = '#108701'
}


function insertCategory() {
  const form1 = document.getElementById('form1');
  form1.style.display = "block";

  // Create the form content dynamically
  const formContent = `<form action="/auth/admin/category/insert" method="POST" id='closes' class="insert-form" >
    <i onclick='closed1();' class="fa-regular fa-circle-xmark"></i>
    <h2>Add new Category</h2>
    <input type="text" placeholder="Category" name="category">
    <button type="submit">Submit</button>
  </form>`;

  // Set the form content after creation
  form1.innerHTML = formContent;
}

function insertAdmin() {
  const form1 = document.getElementById('form1');
  form1.style.display = "block";

  // Create the form content dynamically
  const formContent = `<form action="/auth/admin/admins/insert" method="POST" id='closes' class="insert-form" >
    <i onclick='closed1();' class="fa-regular fa-circle-xmark"></i>
    <h2>Add new Admin</h2>
    <input type="text" placeholder="Name" name="name">
    <input type="emial" placeholder="Email" name="email">
    <input type="password" placeholder="Password" name="password">
    <button type="submit">Submit</button>
  </form>`;

  // Set the form content after creation
  form1.innerHTML = formContent;
}

function closed1() {
  const form1 = document.getElementById('form1');
  form1.style.display = "none";
}


function updateCategory(cid, type) {
  const form = document.getElementById('form');
  form.style.display = "block";
  const context = `<form action="/auth/admin/category/update/${cid}" method="POST" id='closes' class="insert-form">
  <i onclick="closed();" class="fa-regular fa-circle-xmark"></i>
  <h2>Update Category</h2>
  <input type="text" value="${type}" placeholder="Category" name="type">
  <button type="submit">Submit</button>
</form>`
  form.innerHTML = context;
}

function updateAdmin(aid, name, email) {
  const form = document.getElementById('form');
  form.style.display = "block";
  const context = `<form action="/auth/admin/admins/update/${aid}" method="POST" id='closes' class="insert-form">
  <i onclick='closed();' class="fa-regular fa-circle-xmark"></i>
  <h2>Update Admin Details</h2>
  <input type="text" value="${name}" placeholder="Name" name="name">
  <input type="text" value="${email}" placeholder="Email" name="email">
  <button type="submit">Submit</button>
</form>`
  form.innerHTML = context;
}

function closed() {
  const form = document.getElementById('form');
  form.style.display = "none";
}


setTimeout(function() {
  const divToRemove = document.getElementById("remove");
  divToRemove.style.opacity = 0;
}, 5000);