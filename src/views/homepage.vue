<template>
<div id="app">
  <form class="form-information">
    <center>
      <h1>Thông tin khách hàng</h1>
    </center>
    <div class="form-group">
      <div class="col-sm-offset-3">
        <label for="address1">Địa chỉ (*) <template v-if="hidden"><p style="color:red">Vui lòng điền thông tin này</p></template></label>
        <input type="text" class="form-control" id="address1" placeholder="Địa chỉ" onfocus="this.placeholder=''" onblur="this.placeholder='Địa chỉ'" required v-model="userInfo.address" />
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-offset-3">
        <label for="address2">Số điện thoại (*)<template v-if="hidden"><p style="color:red">Vui lòng điền thông tin này</p></template></label>
        <input type="text" class="form-control" id="address2" placeholder="Số điện thoại" onfocus="this.placeholder=''" onblur="this.placeholder='Số điện thoại'" required v-model="userInfo.phone" />
      </div>
    </div>
    <div class=" form-group">
      <div class="col-sm-offset-3">
        <label>Loại xe</label>
        <select class="form-control" v-model="userInfo.typeCar">
  					<option>REGULAR</option>
  					<option>PREMIUM</option>
  				</select>
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-offset-3">
        <label for="address3">Thông tin thêm</label>
        <textarea class="form-control"></textarea>
      </div>
    </div>
    <div class="form-group">
      <div class=" col-sm-offset-3">
        <input type="submit" v-on:click.prevent="checkEmpty" class="form-control btn btn-primary" value="Send" />
      </div>
    </div>
  </form>
  <div class="col-sm-offset-3" id="canvas">
    <center>
      <h3>Lịch sử khách hàng</h3>
    </center>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>#</th>
          <th>Loại xe</th>
          <th>Địa điểm</th>
        </tr>
      </thead>
      <tbody>
        <tr id="tableLoop" v-for="(infor, index) in responseInfo">
          <td>{{index}}</td>
          <td>{{infor.typeCar}}</td>
          <td>{{infor.address}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>
<script>
$
</script>
<script>
export default {
  data() {
    return {
      userInfo: {
        address: "",
        phone: "",
        typeCar: "REGULAR",
        note: ""
      },
      hidden: false,
      responseInfo: [],
    }
  },
  methods: {
    checkEmpty: function() {
      if (this.userInfo.address !== '' && this.userInfo.phone !== '') {
        this.hidden = false
        this.post();

      } else {
        this.hidden = true

      }
    },
    post: function() {
      this.$http.post('http://localhost:8080/appdtvapi', {
        address: this.userInfo.address,
        phone: this.userInfo.phone,
        typeCar: this.userInfo.typeCar,
        note: this.userInfo.note
      }).then(response => {
        //success
        this.responseInfo = response.body;

        console.log(response);
      }, response => {
        //error
        console.log(response);
      })
    }
  }


}
</script>
