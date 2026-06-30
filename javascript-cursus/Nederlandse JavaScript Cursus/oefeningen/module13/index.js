const homeNav = document.getElementById('home-nav')
const collectionNav = document.getElementById('collection-nav')
const homePageElements = document.querySelectorAll('.home-page')
const collectionPAgeElements = document.querySelectorAll('.collection-page')
const artifactsContainer = document.getElementById('artifacts-container')
const searchInput = document.getElementById('search')
const addButton = document.getElementById('add-button')
let artefacten = []

homeNav.addEventListener('click', () => {
    collectionPAgeElements.forEach(e => e.hidden = true)
    homePageElements.forEach(e => e.hidden = false)
})

collectionNav.addEventListener('click', () => {
    collectionPAgeElements.forEach(e => e.hidden = false)
    homePageElements.forEach(e => e.hidden = true)
})

addButton.addEventListener('click', () => {
    addArt()
})

getArtefacten().then(() => {
    renderArtefacten()
})

async function getArtefacten() {
    const response = await fetch("https://vaolhgulafwfxgrqpngy.supabase.co/functions/v1/museum")
    artefacten = await response.json()
}
async function addArt() {
    const responseAdd = await fetch("https://vaolhgulafwfxgrqpngy.supabase.co/functions/v1/museum", { method: 'POST' })
    const addArt = await responseAdd.json()
    console.log(addArt)
    artefacten.push(addArt)
    console.log(artefacten)
    renderArtefacten()
}

searchInput.addEventListener('dblclick', () => {
    searchInput.value = ''
    renderArtefacten()
})

searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        renderArtefacten()
    }
});

function renderArtefacten() {
    const searchValue = searchInput.value.toLowerCase()
    const filterdArtefacten = artefacten.filter((art => art.name.toLowerCase().includes(searchValue) || art.era.toLowerCase().includes(searchValue)))

    artifactsContainer.innerHTML = ''
    filterdArtefacten.forEach(artefact => {
        const art = createArtefact(artefact)
        artifactsContainer.appendChild(art)
    });
}

function createArtefact(artefact) {
    const divArtefact = document.createElement('div')
    divArtefact.className = 'artifact'

    const img = document.createElement('img')
    img.className = 'artifact-img'
    img.src = artefact.imageUrl
    img.alt = artefact.name

    const divStatus = document.createElement('div')
    divStatus.className = 'status'
    divStatus.textContent = artefact.displayStatus

    const divMetadata = document.createElement('div')
    divMetadata.className = 'metadata'

    const divHeader = document.createElement('div')
    divHeader.className = 'header'

    const div = document.createElement('div')

    const h5 = document.createElement('h5')
    h5.textContent = artefact.name

    const p = document.createElement('p')
    p.textContent = artefact.era

    const btn = document.createElement('button')
    btn.className = 'btn'
    btn.type = 'button'
    btn.setAttribute('aria-label', 'Delete artifact')

    const imgBtn = document.createElement('img')
    imgBtn.src = 'images/trash.svg'
    imgBtn.className = 'delete-icon'
    imgBtn.alt = "delete-icon"

    btn.addEventListener('click', () => {
        const index = artefacten.indexOf(artefact)
        if (index > -1) {
            artefacten.splice(index, 1)
        }
        renderArtefacten()
    })

    const pDecription = document.createElement('p')
    pDecription.textContent = artefact.description

    divArtefact.appendChild(img)
    divArtefact.appendChild(divStatus)
    divArtefact.appendChild(divMetadata)
    divMetadata.appendChild(divHeader)
    divHeader.appendChild(div)
    div.appendChild(h5)
    div.appendChild(p)
    divHeader.appendChild(btn)
    btn.appendChild(imgBtn)
    divMetadata.appendChild(pDecription)

    return divArtefact
}