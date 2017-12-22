<template>
<div id="app">
  <center>
    <h1>Thông tin khách hàng</h1>
  </center>
  <form class="form-information">
    <div class="form-group">
      <label for="address1" class="col-sm-2 ">Địa chỉ (*)</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" id="address1" placeholder="Địa chỉ" onfocus="this.placeholder=''" onblur="this.placeholder='Địa chỉ'" required v-model="userInfo.address" />
      </div>
    </div>
    <div class="form-group">
      <label for="address2" class="col-sm-2">Số điện thoại (*)</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" id="address2" placeholder="Số điện thoại" onfocus="this.placeholder=''" onblur="this.placeholder='Số điện thoại'" required v-model="userInfo.phone" />
      </div>
    </div>
    <div class=" form-group">
      <label class="col-sm-2 ">Loại xe</label>
      <div class="col-sm-10">
        <select class="form-control" v-model="userInfo.typeCar">
  					<option>REGULAR</option>
  					<option>PREMIUM</option>
  				</select>
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-10 col-sm-offset-2">
        <input type="submit" v-on:click.prevent="checkEmpty" class="form-control btn btn-primary" value="Send" />
      </div>
    </div>
  </form>
  <div>
    {{responsePost.address}}
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
        typeCar: "PREMIUM"
      },
      disabled: true,
      responsePost: {},
    }
  },
  methods: {
    checkEmpty: function() {
      if (this.userInfo.address !== '' && this.userInfo.address !== '') {
        this.post();
      } else {

      }
    },
    post: function() {
      this.$http.post('http://localhost:8080/appdtvapi', {

        address: this.userInfo.address,
        phone: this.userInfo.phone,
        typeCar: this.userInfo.typeCar

      }).then(response => {
        //success
        this.responsePost = response.body;
      }, response => {
        //error
        console.log(response);
      })
    }
  }


}
</script>
