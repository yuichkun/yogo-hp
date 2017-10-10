const norm = require('normalize.css');
const style = require('./scss/style.scss');
const loaderStyle = require('./scss/loader.scss');
const mobile = require('./scss/mobile.scss');

const toggleButton = document.querySelector('#toggle-button');
const navBar = document.querySelector('#nav-bar');

console.log('Welcome to my website!');
const wrapper = document.getElementById('wrapper');
wrapper.style.display = 'none'; 

toggleButton.onclick = ()=> {
    navBar.classList.toggle('nav-bar-shown');
};
window.onload = ()=>{
    wrapper.style.display = 'block';
};

window.addEventListener('resize', (e)=>{
    // const w = window.innerWidth;
    // const isHidden = navBar.classList.contains('nav-bar-hidden');
    // navBar.classList.add('nav-bar-hidden');
    // if(w > 425 && isHidden){
    //     console.log('this should be fixed');
    //     navBar.classList.remove('nav-bar-hidden');
    // }
});
