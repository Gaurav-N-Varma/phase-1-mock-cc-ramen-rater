// write your code here

// setting ramend id
let ramenId = 1

// fetching API data
fetch('http://localhost:3000/ramens')
.then(data => data.json())
.then(data2 => {
    // renders in the details for the first ramen
    // fill in image detail
    const firstRamenImg = document.querySelector('.detail-image')
    firstRamenImg.src = data2[0].image

    // fill in name detail
    const firstRamenName = document.querySelector('.name')
    firstRamenName.textContent = data2[0].name

    // fill in restaurant detail
    const firstRamenRest = document.querySelector('.restaurant')
    firstRamenRest.textContent = data2[0].restaurant

    // fill in rating detail
    const firstRamenRating = document.querySelector('#rating-display')
    firstRamenRating.textContent = data2[0].rating

    // fill in comment detail
    const firstRamenComment = document.querySelector('#comment-display')
    firstRamenComment.textContent = data2[0].comment

    // for each ramen API object, renders image and delete button under #ramen-menu div
    data2.forEach(ramenObject => {
        // create img tag
        const ramenImg = document.createElement('img')

        // fill it with an image from API
        ramenImg.src = ramenObject.image

        // assign id to it, which is the same ID as the API id
        ramenImg.id = ramenObject.id

        // wrap element in #ramen-menu div
        const ramenMenu = document.querySelector('#ramen-menu')
        ramenMenu.append(ramenImg)

        // create delete button
        const deleteBtn = document.createElement('input')
        deleteBtn.type = 'button'
        deleteBtn.value = 'x'
        deleteBtn.id = ramenObject.id

        // wrap element in #ramen-menu div
        ramenMenu.append(deleteBtn)

        // when you click on the img tag, renders details
        ramenImg.addEventListener('click', () => {
            // fill in image detail
            const ramenImg2 = document.querySelector('.detail-image')
            ramenImg2.src = ramenObject.image

            // fill in name detail
            const ramenName = document.querySelector('.name')
            ramenName.textContent = ramenObject.name

            // fill in restaurant detail
            const ramenRest = document.querySelector('.restaurant')
            ramenRest.textContent = ramenObject.restaurant

            // fill in rating detail
            const ramenRating = document.querySelector('#rating-display')
            ramenRating.textContent = ramenObject.rating

            // fill in comment detail
            const ramenComment = document.querySelector('#comment-display')
            ramenComment.textContent = ramenObject.comment

            // updates ramen id
            ramenId = ramenObject.id
        })

        // when you click on delete button, replaces ramen image, delete button, and details
        deleteBtn.addEventListener('click', () => {
            // removes ramen image and delete
            ramenImg.remove()
            deleteBtn.remove()

            // replaces details with first ramen in API
            replaceHandler(deleteBtn.id)
        })
    })
})

// when you hit 'create' submit, wraps new ramen image in #ramen-menu div
const form1 = document.querySelector('#new-ramen')
form1.addEventListener('submit', (e) => {
    e.preventDefault()

    // create img tag for new ramen and assign image input
    const newImg = document.createElement('img')
    newImg.src = e.target.image.value

    // wrap image in #ramen-menu div
    const ramenMenu2 = document.querySelector('#ramen-menu')
    ramenMenu2.append(newImg)

    // persists new ramen created
    fetch('http://localhost:3000/ramens', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({
            image: e.target.image.value
        })
    })
})

// when you hit 'update' submit, updates rating and comment detail with user input
const form2 = document.querySelector('#edit-ramen')
form2.addEventListener('submit', (e) => {
    e.preventDefault()

    // grabs DOM rating detail and updates based on input
    const ratingDetail = document.querySelector('#rating-display')
    ratingDetail.textContent = e.target.rating.value

    // grabs DOM comment detail and updates based on input
    const commentDetail = document.querySelector('#comment-display')
    commentDetail.textContent = e.target['new-comment'].value

    // persists changes
    fetch(`http://localhost:3000/ramens/${ramenId}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            rating: e.target.rating.value,
            comment: e.target['new-comment'].value
        })
    })
})

// replaces the details
function replaceHandler(id){
    // fetches latest API data
    fetch('http://localhost:3000/ramens')
    .then(data => data.json())
    .then(data2 => {
        // replace image detail
        const otherRamenImg2 = document.querySelector('.detail-image')
        otherRamenImg2.src = data2[1].image

        // replace name detail
        const newRamenName = document.querySelector('.name')
        newRamenName.textContent = data2[1].name

        // replace restaurant detail
        const newRamenRest = document.querySelector('.restaurant')
        newRamenRest.textContent = data2[1].restaurant

        // replace rating detail
        const newRamenRating = document.querySelector('#rating-display')
        newRamenRating.textContent = data2[1].rating

        // replace comment detail
        const newRamenComment = document.querySelector('#comment-display')
        newRamenComment.textContent = data2[1].comment
        fetch(`http://localhost:3000/ramens/${id}`, {
            method: 'DELETE'
        })
    })
}

