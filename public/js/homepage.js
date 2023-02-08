window.onload = function(){
  setTimeout(() => {
    const text = document.getElementById('autoCodeShow');
    text.innerHTML = text.textContent.replace(/\S/g,"<span>$&</span>");
    const spans = text.querySelectorAll('span');
    spans.forEach((span,index) =>{
      span.style.setProperty('--delay',`${index * 0.1}s`);
    })
  }, 3000)
}