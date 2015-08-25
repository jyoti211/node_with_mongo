/*$(document).on('click', '#update', function(){
	alert("sjakasas");
});
*/
/*function postAnswer() {
	 $.post('/updateuser');, { message: "hello!"}, function(returnedData) {
        console.log("Post returned data: " + returnedData);
    });
    return false;
}*/

 $(document).ready(function(){
        $("#update").click(function(){
           values=$("#userfrm").serializeArray();
           $.post("/updateuser",values);
         });
   });
 
 function deleteUser(id)
 {
 	alert(id);
 	   var del = confirm("Are you confirm?");
 	   if(del == true) {
 		   $.get('/deleteuser/'+id+'');
 		   $.get('/listuser',function(data){
 			   $(document).find('body').html(data);
 		   });
 	   }
 }
 