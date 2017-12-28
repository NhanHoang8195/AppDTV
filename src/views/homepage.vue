<template>
<div id="hp">
  <form class="form-information">
    <center>
      <h1>Thông tin khách hàng</h1>
    </center>
    <div class="form-group">
      <div class="col-sm-offset-3">
        <label for="address1">Địa chỉ (*) <template v-if="hidden"><p style="color:red">Vui lòng điền thông tin này</p></template></label>
        <input type="text" class="form-control" id="address1" placeholder="Địa chỉ" onfocus="this.placeholder=''" onblur="this.placeholder='Địa chỉ'" v-model="userInfo.address" />
      </div>
    </div>
    <div class="form-group ">
      <div class="col-sm-offset-3 ">
        <label for="address2 ">Số điện thoại (*)<template v-if="hidden "><p style="color:red ">Vui lòng điền thông tin này</p></template></label>
        <input type="text " class="form-control " id="address2 " placeholder="Số điện thoại " onfocus="this.placeholder=''" onblur="this.placeholder='Số điện thoại'" v-model="userInfo.phone" />
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
      <h3>Lịch sử khách hàng</h3> {{value}}
    </center>
    <table class="table table-hover table-bordered">
      <thead>
        <tr>
          <th>#</th>
          <th>Loại xe</th>
          <th>Địa điểm</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(infor, index) in userInfoDb">
          <template v-if="infor.phone===userInfo.phone">
          <td>{{index}}</td>
          <td>{{infor.typeCar}}</td>
          <td>{{infor.address}}</td>
          <td>{{infor.status}}</td>
        </template>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>
 <script>
import Firebase from 'firebase'
 let config = {
   apiKey: "AIzaSyBdayjA3EmnHntCcCA0caJvfUQPESPassM",
   authDomain: "app-ddv.firebaseapp.com",
   databaseURL: "https://app-ddv.firebaseio.com",
   projectId: "app-ddv",
   storageBucket: "app-ddv.appspot.com",
   messagingSenderId: "966606157223"
 }
 let app = Firebase.initializeApp(config);
 let db = app.database();
 let userInfoRef = db.ref('user-info');
export default {
    firebase:{
      userInfoDb:userInfoRef
    },
  data() {
    return {
      userInfo: {
        address: "",
        phone: "",
        typeCar: "REGULAR",
        note: "",
        location:{lat:-1,
          lng:-1
        },
        status:""
      },
      hidden: false,
      value: ""
    }
  },
  methods: {
    checkEmpty: function() {
      if (this.userInfo.address !== '' && this.userInfo.phone !== '') {
        this.hidden = false,
        this.post();
      } else {
        this.hidden = true

      }
    },
    post: function() {
      this.$http.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: this.userInfo.address
        }
      }).then(
        responseGoogle => {

          return this.userInfo.location = responseGoogle.body.results[0].geometry.location;
        }, responseGoogle => {
        //  (console.log(responseGoogle))
        }
      ).then(() =>{
        this.userInfo.status="DA-DINH-VI"
          userInfoRef.push(this.userInfo);
          this.userInfo.address="",
          this.userInfo.note=""
      }, e =>{
        this.userInfo.location={lat:-1, lng:-1},
        this.userInfo.status="CAN-DINH-VI",
        userInfoRef.push(this.userInfo);
        this.userInfo.address="",
        this.userInfo.note=""
      });
    }
  }


}
 </script>
