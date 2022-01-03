// document.querySelector('.neutralArea').addEventListener('click', (e) =>{
//     console.log("Target: " + e.target);
//     console.log("Current Target: " + e.currentTarget);
// })

let areas = {
    a: null,
    b: null,
    c: null
}

// ******************** ITEM **********************

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('dragstart', dragStart);//Quando começa a arrastar
    item.addEventListener('dragend', dragEnd); //Quando termina de Arrastar

})
//Quando começa a arrastar
function dragStart(e){
    //Adiciona a classe enquanto está arrastando o item
    e.currentTarget.classList.add('dragging')
}

//Quando termina de Arrastar
function dragEnd(e){
    e.currentTarget.classList.remove('dragging')
}

// ******************** AREA **********************

document.querySelectorAll('.area').forEach(area => {
    //É rodada sempre que estiver arrastando um item e esse item passar por cima da área que foi adicionado o evento
    area.addEventListener('dragover', dragOver);

    //Quando você sai de uma área que foi adicionado o evento
    area.addEventListener('dragleave', dragLeave);

    //Quando solta na área que foi adicionado o evento
    area.addEventListener('drop', drop);
})

function dragOver(e){
    if(e.currentTarget.querySelector('.item') === null ){
        e.preventDefault(); //O comportamento padrão bloquei a utilização da função "drop"
        e.currentTarget.classList.add('hover');
    }
}
function dragLeave(e){
    e.currentTarget.classList.remove('hover');
}
function drop(e){
    e.currentTarget.classList.remove('hover')
    //Se no elemento com class = "area" não tiver um elemento com class = "item", significa que não tem elemento dentro da caixa.
    if(e.currentTarget.querySelector('.item') === null ){
        //Pega o elemento que está sendo arrastado
        let dragItem = document.querySelector('.item.dragging');
        e.currentTarget.appendChild(dragItem);
        updateAreas();
    }
}

// ***************** NEUTRAL AREA ******************
document.querySelector('.neutralArea').addEventListener('dragover', dragOverNeutral)
document.querySelector('.neutralArea').addEventListener('dragleave', dragLeaveNeutral)
document.querySelector('.neutralArea').addEventListener('drop', dropNeutral)

function dragOverNeutral(e){
    e.preventDefault();
    e.currentTarget.classList.add('hover')
}

function dragLeaveNeutral(e){
    e.currentTarget.classList.remove('hover')
}

function dropNeutral(e){
    e.currentTarget.classList.remove('hover')
    let dragItem = document.querySelector('.item.dragging');
    e.currentTarget.appendChild(dragItem);
    updateAreas();
}


function updateAreas(e){
    document.querySelectorAll('.area').forEach(area => {
        let name = area.getAttribute('data-name');

        //Se tem algum item dentro de area
        if(area.querySelector('.item') !== null){
            areas[name] = area.querySelector('.item').innerHTML;
        } else{
            areas[name] = null;
        }
    })
    if(areas.a === '1' && areas.b === '2' && areas.c === '3' ){
        document.querySelector('.areas').classList.add('correct')
    } else {
        document.querySelector('.areas').classList.remove('correct')
    }
}