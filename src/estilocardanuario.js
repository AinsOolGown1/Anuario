let card = document.querySelector(".card")
let image = document.querySelector(".picture")
card.addEventListener("mouseover",e=>{
  image.style.animation = "_in 0.5s ease forwards "
})
card.addEventListener("mouseout",e=>{
  image.style.animation = "_out 0.5s ease forwards "
})
