let allRegData = [];
let url = "";
let Add=document.querySelector("#add-user");
let paginationBox=document.querySelector(".pagination-box");
if (localStorage.getItem("allRegData") != null) {
    allRegData = JSON.parse(localStorage.getItem("allRegData"));
}

document.addEventListener('DOMContentLoaded', function (e) {
    let regForm = document.querySelector(".register-form");
    const allInput = regForm.querySelectorAll('INPUT');
    let allBtn=regForm.querySelectorAll("BUTTON");
    let closeBtn=document.querySelector("#close-btn");
    let searchEl=document.querySelector(".search");
    let delAllBTN=document.querySelector(".delete-all-btn");
    //allBtn[1].disabled=false;
    //allBtn[0].disabled=true;
    regForm.onsubmit = (e) => {
        e.preventDefault();
        allRegData.push({
            name: allInput[0].value,
            email: allInput[1].value,
            mobile: allInput[2].value,
            dob: allInput[3].value,
            password: allInput[4].value,
            profile: url === "" ? "1.png" : url
        });
        localStorage.setItem("allRegData", JSON.stringify(allRegData));
        swal("Data Inserted", "Successfully", "success");
        closeBtn.click();
        regForm.reset('');
        getRegData(); // Re-render the list after insertion
    };

    allInput[5].onchange = () => {
        let freader = new FileReader();
        freader.readAsDataURL(allInput[5].files[0]);
        freader.onload = (e) => {
            url = e.target.result;
            console.log(url);
        };
    };

    //data retrive
    let regList = document.querySelector(".reg-data tbody");
    //console.log(regList);
    const getRegData = () => {
        regList.innerHTML = "";
        allRegData.forEach((data, index) => {
            let dataStr=JSON.stringify(data);
            let finalData=dataStr.replace(/"/g,"'");
            regList.innerHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td><img src="${data.profile}" alt="Profile" width="50" height="50"></td>
                    <td>${data.name}</td>
                    <td>${data.email}</td>
                    <td>${data.dob}</td>
                    <td>${data.mobile}</td>
                    <td>${data.password}</td>
                    <td>
                        <button class="btn btn-danger del-btn" index="${index}"><i class="fa fa-trash"></i></button>
                        <button class="btn btn-primary edit-btn" index="${index}" data="${finalData}"><i class="fa fa-edit"></i></button>
                    </td>
                </tr>
            `;
        });
    
        action(); 
    };

    const action=()=>{
        //delete coding
        let allDelBtn=regList.querySelectorAll(".del-btn");
        for(let btn of allDelBtn){
            btn.onclick=()=>{
                index=btn.getAttribute("index");
                /*allRegData.splice(index,1);
                localStorage.setItem("allRegData",JSON.stringify(allRegData));
                getRegData();*/
                swal({
                    title: "Are you sure?",
                    text: "Once deleted, you will not be able to recover this imaginary file!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  })
                  .then((willDelete) => {
                    if (willDelete) {
                        allRegData.splice(index,1);
                        localStorage.setItem("allRegData",JSON.stringify(allRegData));
                        getRegData();
                        swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                      });
                    } else {
                      swal("Your imaginary file is safe!");
                    }
                  });
            }
        }

        //update coding
        let allEditBtn=regList.querySelectorAll(".edit-btn");
        for(let btn of allEditBtn){
            btn.onclick=()=>{
                let index=btn.getAttribute("index");
                let dataStr=btn.getAttribute("data");
                let finalData=dataStr.replace(/'/g,'"');
                let data=JSON.parse(finalData);
                //console.log(data);
                Add.click();
                allInput[0].value=data.name;
                allInput[1].value=data.email;
                allInput[2].value=data.mobile;
                allInput[3].value=data.dob;
                allInput[4].value=data.password;
                url=data.profile;
                allBtn[0].disabled=false;
                allBtn[1].disabled=true;
                allBtn[0].onclick=()=>{
                    allRegData[index]={
                        name: allInput[0].value,
                        email: allInput[1].value,
                        mobile: allInput[2].value,
                        dob: allInput[3].value,
                        password: allInput[4].value,
                        profile: url === "" ? "1.png" : url
                    }
                    
                    localStorage.setItem("allRegData", JSON.stringify(allRegData));
                    swal("Data updated", "Successfully", "success");
                    closeBtn.click();
                    regForm.reset('');
                    getRegData();
                    allBtn[1].disabled=false;
                    allBtn[0].disabled=true;
                }
            }
        }

    }
    getRegData();


//delete all data
delAllBTN.addEventListener('click',()=>{
    //localStorage.removeItem("allRegData");
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary data!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            allRegData=[];
            localStorage.removeItem("allRegData");
            getRegData();
            swal("Poof! Your Data has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
})
//search coding
 searchEl.oninput=()=>{
    search();
 }
 const search=()=>{
    let value=searchEl.value.toLowerCase();
    let tr=regList.querySelectorAll("TR");
    let i;
    for(i=0;i<tr.length;i++){
        let allTd=tr[i].querySelectorAll("TD");
        let name=allTd[2].innerHTML;
        let email=allTd[3].innerHTML;
        let mobile=allTd[5].innerHTML;
        if(name.toLocaleLowerCase().indexOf(value)!=-1){
            tr[i].style.display="";
        }
        else if(email.toLocaleLowerCase().indexOf(value)!=-1){
            tr[i].style.display="";
        }
        else if(mobile.toLocaleLowerCase().indexOf(value)!=-1){
            tr[i].style.display="";
        }
        else{
            tr[i].style.display="none";
        }
    }
 }
// pagination coding
let length=allRegData.length/5;
let i;
if(length.toString().indexOf(".")!=-1){
   length= length+1;
}
for(i=1;i<length;i++){
    paginationBox.innerHTML+=`
         <button class="btn">${i}</button>
    `;
}
});



