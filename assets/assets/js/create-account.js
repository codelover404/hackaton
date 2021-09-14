const createaccount = ()=>{
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var companyname = document.getElementById("companyname").value;
    var password = document.getElementById("password").value;
    var selectcountry = document.getElementById("select-country").value;
    var city = document.getElementById("city").value;
    var accounttype = document.getElementById("accounttype").value;
    console.log(email,password)

    if(username=='' || email=='' || password=='' || companyname=='' || accounttype=='' || selectcountry=="" ||city=="" ){
        alert("Enter Correct Values")
    }
    else{
        firebase.auth().createUserWithEmailAndPassword(email, password )
          .then((result) => {
            var user = result.user;
            console.log("User :",user)
            console.log("User Uid:",user.uid)
            console.log(accounttype);

            var obj = {
                username :username,
                email : email,
                password :password,
                accounttype : accounttype,
                city : city,
                selectcountry : selectcountry,
                uid : user.uid
            }
// console.log(obj)
                firebase.database().ref(`/${accounttype}`).child(user.uid).set(obj)
                .then((data)=>{
                // window.location='dashboard.html';

                })
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage)
                
            });
        }

}


const login = ()=>{
    var email = document.getElementById("email1").value;
    var password = document.getElementById("password1").value;
    var accounttype2 = document.getElementById("select").value;

    console.log(accounttype2)


    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          var user = userCredential.user;

          // Adding current user in local Storage to utilize user info in UI
          localStorage.setItem('Current_user_ID' ,user.uid)
          localStorage.setItem('Current_user_name' ,user.uid)

          var currentUserId = localStorage.getItem('Current_user_ID')

        //   console.log(currentUserId)

          firebase.database().ref().child('BUSINESS').orderByChild('uid').equalTo(currentUserId).once('value')
          .then((snap)=>{
            var data = snap.toJSON();
         
            if(data == null){
                firebase.database().ref().child('USER').orderByChild('uid').equalTo(currentUserId).once('value')
                .then((snap)=>{
                    var data2 = snap.toJSON();

                if(data2==null){
                    console.log("no")
                }
                else{
                    console.log("user:",data2)
                    var value_user = Object.values(data2)
                    console.log(value_user[0].accounttype)
                    console.log(accounttype2)
                    if(value_user[0].accounttype==accounttype2)
                    {
                        // console.log("user_page")

                        window.location="assets/dashboard.html";
                    }
                    else{
                        console.log("no")
                    }
                    // if(user)
                    // if(data2.)
  
                }

                 
                })

            }
            else{
                console.log("bussiness:",data);
                var value_bussiness = Object.values(data)
                console.log(value_bussiness)
                console.log(value_bussiness[0].accounttype)
                console.log(accounttype2)

                if(value_bussiness[0].accounttype==accounttype2)
                {
                    // console.log("dashboard_page")
                    window.location="admin.html";
                }
                else{
                    console.log("no")
                }

                

                // if(/)
            }
          })
        })}

            // console.log(currentUserId)

            // Search ID within Resturant collection
            // firebase.database().ref().child('BUSINESS').orderByChild('uid').equalTo(currentUserId).once('value')
            // .then((snap) => {
            //     var data = snap.toJSON();

                // if (data == null) {
                //     // Search ID within Users collection
                //     // firebase.database().ref().child('USER').orderByChild('uid').equalTo(currentUserId).once('value')
                // //     .then((snap) => {
                // //         var data = snap.toJSON();
                // //          // This is a User so we take it to Ordering page.
                // //         if(data == null){
                // //             console.log("not data")
                // //         }
                // //         else{
                // //             alert("user")

                        
                        
                // //         //  window.location='user-dashboard.html'            
                // //     }
                // // });
                // // }
                // else{
                //     firebase.database().ref().child('BUSINESS').orderByChild('accounttype').equalTo(currentUserId).once('value')
                //     alert("bussiness")
                //     // This is a Resturant owner so we take it to the dashboard
                //     // window.location='assets/dashboard.html' 
                // }


                
            // });


            
    // })

    // .catch((error) => {
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     console.log(errorMessage)
    //     alert(errorMessage)
    //     // ..
    //   });



    
    // console.log(email,password);
    // if(email=='' || password==''){
    //     alert("Enter Correct Values")
    // }
    // else{
    //     if(accounttype==accounttype){

    //     }
    //     firebase.auth().signInWithEmailAndPassword(email, password )
    //     .then((result) => {
    //       var user = result.user;
    //       console.log(user)
    //       console.log("User Email :",user.email)
    //       console.log("User Uid :",user.uid)

    //       localStorage.setItem('Current_user Uid',user.uid);

    //       window.location='assets/dashboard.html'

        //   firebase.database().ref().child('Resturant')
        //   .orderByChild('uid')
        //   .equalTo(user.uid)
        //   .once('value')
        //   .then((snap)=>{
        //       console.log("snap",snap.toJSON())

        //   })



        //   var obj = {
        //       Name : name,
        //       email : email,
        //       password :password,
        //       type : select,
        //       uid : user.uid
        //   }

        //   firebase.database().ref(`/${select}`).child(user.uid).set(obj)
    //     })
        // .catch((error) => {
        //   var errorCode = error.code;
        //   var errorMessage = error.message;
        //   console.log(errorMessage)
        //   alert(errorMessage)
        //   // ..
        // });

    // }

// } 




// log out




const logout=()=>{
    firebase.auth().signOut().then(() => {
        window.location="index.html";
}).catch((error) => {
// An error happened.
});
}






