const thumbs = document.querySelectorAll('.small-view');
console.log(thumbs);

let thumbClicked = (event)=>{
    thumbs.forEach(function(item,index){
        item.classList.remove('current-image');
        item.classList.add('small-view');
    });
    console.log(event);

    event.target.classList.add('current-image');
    event.target.classList.remove('small-view');

    document.getElementById('big-image').src = event.target.src;
};


thumbs.forEach(function(item,index){
    item.addEventListener("click", thumbClicked);
});


