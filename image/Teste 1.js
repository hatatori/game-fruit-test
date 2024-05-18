// get info from profile emoji
// https://emojipedia.org/pt/twitter-emoji-stickers/13.1/rosto-risonho

const ImageUrltoFull = url_thumb => url_thumb.replace('https://em-content.zobj.net/thumbs/60', 'https://em-content.zobj.net/source').replace('.webp', '.png')
const ImageUrltoThumb = url_thumb => url_thumb.replace('https://em-content.zobj.net/source', 'https://em-content.zobj.net/thumbs/60').replace('.png', '.webp')


data = []

function Profile(url){
    // fetch('https://emojipedia.org/twitter-emoji-stickers/13.1/grinning-face')
    fetch(url)
    .then(e=>e.text())
    .then(e=>{
        let div = document.createElement('div')
        div.innerHTML = e
        url = div.querySelector('.Section_section__h8ORA img').src
        
        title = div.querySelector('h1').innerText
        img_url = div.querySelector('.Section_section__h8ORA img').src
        img_url_thumb = ImageUrltoThumb(div.querySelector('.Section_section__h8ORA img').src)
    
        obj = {
            emoji: title.split(' ')[0],
            title: title,
            img: img_url,
            img_thumb: img_url_thumb
        }
        data.push(obj)
    })
}

const list_url = []
window.addEventListener("wheel", g=>{
    Array.from(document.querySelectorAll('[data-index] a')).map(e=>{
        if(!list_url.includes(e.href)){
            list_url.push(e.href)
            Profile(e.href)
        }
    })
    console.log(data)
})