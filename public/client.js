
const socket = io('http://localhost:3000');

const form = document.getElementById('sendcontainer');

const message = document.getElementById('msg');

const messagecontainer = document.querySelector('.container');

var audio = new Audio("iphone_pink.mp3");


var dot = document.querySelector('h2');

var arr={};
    

   
     





const append = (message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('msg');
    messageElement.classList.add(position);
    messagecontainer.append(messageElement);
    let h = messagecontainer.scrollHeight;
   
    messagecontainer.scrollTop = h;
    if(position=='left'){
        audio.play();
    }
}

const append2 = (message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('msg2');
    messageElement.classList.add(position);
    let h = messagecontainer.scrollHeight;
  
    messagecontainer.scrollTop = h;
    messagecontainer.append(messageElement);
        audio.play();
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(message.value==''){
        return;
    }
    const message2 = message.value;
    append('You: '+message2,'right');
 socket.emit('send',message2);
 message.value='';

});

form.addEventListener('keydown',(e)=>{
    if(e.key=="Enter"){
        e.preventDefault();
        if(message.value==''){
            return;
        }
        const message2 = message.value;
        append('You: '+message2,'right');
     socket.emit('send',message2);
     message.value='';
    }

});

const name1 = prompt("Write your name here");

socket.emit('new-user-joined', name1);

socket.on('user-joined',name1 =>{
   append2(name1 +' Joined the chat','right');
   arr.push(name1);
});
socket.on('receive', data =>{
   append(data.name+' :'+data.message,'left');
});
socket.on('Left', name1 =>{
   append2(name1+' Left the chat','right');
});
var para = document.createElement('h4');
const node = document.createTextNode(arr);
para.appendChild(node);
// dot.addEventListener('click', ()=>{
//     document.querySelector('.container').before(para);

//test


