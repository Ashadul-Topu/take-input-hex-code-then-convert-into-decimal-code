//change background color using JavaScript DOM

// steps


//Global  variables
let toastMsg = null

// 1. create onload handler
window.onload = function() {
    main()
}

//2. random HeXa color generator
// function randomColor(){
//     const r = Math.floor(Math.random() * 256)
//     const g = Math.floor(Math.random() * 256)
//     const b = Math.floor(Math.random() * 256)
    
//     return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`
// }

// function 1 - generate three random decimal number for red, green and blue.
// return as an object

function generateColorDecimal(){
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)

    return {
        r,
        g,
        b,
    }
}

// function 2 - generate hex color code

function randomColor({r, g, b}){
// const {r, g, b} = generateColorDecimal()

// add 0 and make 2 digit color code. but this is also problem
// const twoCodeRed = r <= 9 ?`0${r}` : r.toString(16);
// const twoCodeGreen = g <= 9 ?`0${g}` : g.toString(16);
// const twoCodeBlue = b <= 9 ?`0${b}` : b.toString(16);
// return `#${twoCodeRed}${twoCodeGreen}${twoCodeBlue}`

const getTwoCode = (value) =>{
    const hex = value.toString(16)
    return hex.length == 1? `0${hex}` : hex;
}
    
    return `#${getTwoCode(r)}${getTwoCode(g)}${getTwoCode(b)}`
}

function randomColorRGB({r, g, b}){
    // const {r, g, b} = generateColorDecimal()
    return `rgb(${r}, ${g}, ${b})`
}


// 3. create main function
function main() {
    const root = document.getElementsByClassName('root')[0] // background
    const btn = document.getElementsByClassName('btn')[0] // button
    const output = document.getElementById('output') // output input both 
    const output2 = document.getElementById('output2') // output
    
    btn.addEventListener('click', function(){
        const color = generateColorDecimal();
        const bgColor = randomColor(color)
        const bgColorRGB = randomColorRGB(color)
        root.style.backgroundColor = bgColor // change Background Color
        btn.style.color = bgColor // Change Button Text color 
         output.value = bgColor.toUpperCase().substring(1)
         output2.value = bgColorRGB 

    })

    //step 4: copy color code from output
    const copy = document.getElementById('copy')
    copy.addEventListener('click', function(){
        navigator.clipboard.writeText(`#${output.value}`)

        //remove existing toast message
        if(toastMsg !== null){
            toastMsg.remove();
        }

        // step 11: prevent copying hex code if it is not valid
        if(isValidHex(output.value)){
            generateToastMsg(`#${output.value} copied`)
        }else{
            console.log('Invalid color code');
            alert('Invalid color code');
        }
       
    })

    const copy2 = document.getElementById('copy2')
    copy2.addEventListener('click', function(){
        navigator.clipboard.writeText(output2.value)

        //remove existing toast message
        if(toastMsg !== null){
            toastMsg.remove();
        }
        if(isValidHex(output.value)){
            generateToastMsg(`#${output2.value} copied`)
        }else{
            console.log('Invalid color code');
            alert('Invalid color code');
        }
    })



    // step 5: active toast message
    function generateToastMsg(msg){
        toastMsg = document.createElement('p')

        // step 6: create dynamic toast message (color code)
        toastMsg.innerText = msg
        document.body.appendChild(toastMsg)
        // toastMsg.classList.add("toast-message") // anther way to add class below
        toastMsg.className = 'toast-message toast-msg-in'
        console.log('color copied');

        // remove the toast message when user clicks inside the toast message
        toastMsg.addEventListener('click', function(){
            toastMsg.classList.remove('toast-msg-in');
            toastMsg.classList.add('toast-msg-out');


            // step 7: clear toast message
            // remove toast message permanently when user clicked  it.
            toastMsg.addEventListener("animationend", function(){
                toastMsg.remove();
                toastMsg = null; // remove previous toast message 
            })
        });

        setTimeout(() => {
            document.body.removeChild(toastMsg)
        }, 4000)
    }

    //step 9: create isHexValid function
    function isValidHex(color){
        if(color.length !== 6 ) return false;
        return /^[0-9A-Fa-f]{6}$/i.test(color) // checking color is valid using Regx 
       
    }

    // Step 10: implement change handler on input field
    output.addEventListener('keyup', function(e){
        const color = e.target.value
        // console.log(e);
        if (color){
            output.value = color.toUpperCase()
            if(isValidHex(color)){
                root.style.backgroundColor = `#${color}`
                output2.value = hexToRgb(color)
                // console.log(e);
            }
        }
    })

    // step 12: refactor the color generator function

    // step 13: update the color code to display  RGB color

    // create hex to rgb function

    function hexToRgb(hex){
        const r = parseInt(hex.slice(0,2), 16)
        const g = parseInt(hex.slice(2,4), 16)
        const b = parseInt(hex.slice(4), 16)
        // console.log(r, g, b);
        return `rgb(${r}, ${g}, ${b})`
    }
    console.log(hexToRgb("ffffff"));
    // update change handler
    // implement copy color function 
}