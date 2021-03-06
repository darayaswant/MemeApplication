        function DeleteMeme(input){
          const memeid =input.getAttribute('data-id');
          if(confirm("Clicking on ok will delete this meme" )){
            fetch('http://xmeme-env.eba-bwbueset.ap-south-1.elasticbeanstalk.com/memes/'+memeid, {
              method: 'DELETE'
            }).then(function(response) {
              if(response.ok) alert("meme succesfully deleted")
            })
          }
          else return;
        }
        function Changeurl(input){
          const memeid =input.getAttribute('data-id');
          var new_url = prompt("Please enter your new url:");
          if(new_url== null) return;
          if(new_url=="") {
            alert("again enter url")
            return;
          }
          const body={
            url : new_url
          }
          fetch('http://xmeme-env.eba-bwbueset.ap-south-1.elasticbeanstalk.com/memeurl/'+memeid,{
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body : JSON.stringify(body)
          }).then(function(response) {
            if(response.ok) alert("meme updated succesfully")
          })

        }
        function Changecaption(input){
          const memeid =input.getAttribute('data-id');
          var new_caption = prompt("Please enter your new caption:");
          if(new_caption==null) return ;
          if(new_caption=="") {
            alert("again enter caption")
            return;
          }
          const body={
            caption : new_caption
          }
          fetch('http://xmeme-env.eba-bwbueset.ap-south-1.elasticbeanstalk.com/memecaption/'+memeid,{
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body : JSON.stringify(body)
          }).then(function(response) {
            if(response.ok) alert("meme updated succesfully")
          })

        }
        mem()
        formId.onsubmit = async (e) => {
            e.preventDefault();
            let fData = new FormData(formId);
            const body = {
                name: fData.get('name'),
                url: fData.get('url'),
                caption: fData.get('caption')
            };
            console.log(typeof(JSON.stringify(body)));
            
             fetch('http://xmeme-env.eba-bwbueset.ap-south-1.elasticbeanstalk.com/memes', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(body)
            }).then(function(response) {
              if(response.ok) alert("meme submitted succesfully")
              return response.json()
            }).then((result)=>{
              console.log(result)
            })
            .catch((error)=> console.log(error));
        }
        function mem(){
          fetch('http://xmeme-env.eba-bwbueset.ap-south-1.elasticbeanstalk.com/memes', {
              method: 'GET'
            }).then(function(response) {
              return response.json()
            }).then((result)=>{
              let row=null;
              for(let i=result.length-1;i>=0;i--){
                row=document.getElementById("showmemes");
                row.innerHTML+=`<div>
                <h2>${result[i]['name']}</h2>
                <p>${result[i]['caption']}</p>
                <p>
                <input  onclick="Changeurl(this)" type="button" id="editurl" style="background-color: lightgrey;color:blue" data-id=${result[i]['id']} value="ChangeUrl">
                <input onclick="Changecaption(this)" type="button" id="editcaption"  style="background-color: lightgrey;color:blue" data-id=${result[i]['id'] } value="ChangeCaption">
                <input onclick="DeleteMeme(this)" type="button" data-id=${result[i]['id']}  value="Delete" style="background-color: lightgrey;color:blue" >
                </p>

                <img src="${result[i]['url']}" height= "400px"
                width="400px" style="border:5px solid black">
              </div>`
              }
            })
            .catch((error)=> console.log(error));
          }
