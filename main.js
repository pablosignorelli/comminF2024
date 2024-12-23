

document.getElementById("icono-carrito").addEventListener("click", ()=>{
    document.getElementById("carrito-contenedor").classList.add("on")
})

document.getElementById("boton-cerra").addEventListener("click", ()=>{
    document.getElementById("carrito-contenedor").classList.remove("on")
})


let Carrito = JSON.parse(localStorage.getItem("carrito"))|| []


const Smartphone = document.getElementById("productos")
const CarritoACT = document.getElementById("carrito")
const BotonDeCompra = document.getElementById ("boton-comprar")


BotonDeCompra.addEventListener ("click", () =>{
                                               const total =Carrito.reduce ((acc, el)=>{
                                               return acc + (el.precio*el.cantidad)
                                                                                       }, 0).toFixed(2)

                                                if(total==0){
                                                            return
                                                            }

    Swal.fire({
        title: "El total de la compra es: "+""+"$" + total,
        text:"¿Usted va realizar la compra?",
        showDenyButton: true,
        confirmButtonText: "Agregar",
        denyButtonText: `Cancelar`
              }).then((result) => {
        
                  if (result.isConfirmed) {
                                           Swal.fire({
                                           title:"Por favor agregue su email",
                                           input: "email"
                                           }).then((result)=>{
                                                             Carrito=[]
                                                             actualizadoraDeCarrito()
                                                             })
                  }else if (result.isDenied){
                                            Swal.fire("Compra cancelada.", "", "error"),
                                            Carrito=[]
                                            actualizadoraDeCarrito()
                                            }
                                   });
    })


const actualizadoraDeCarrito = () =>{
                                    CarritoACT.innerHTML = ""
                                   localStorage.setItem("carrito", JSON.stringify(Carrito))
                               
                                   Carrito.forEach(el => {
                                                         const container = document.createElement("div")
                                                         container.classList.add("card-carrito")
                                                         const info = document.createElement("div")
                                                         info.classList.add("info")
                                                         const titulo = document.createElement("h3")
                                                         titulo.classList.add("titulo1")
                                                         const imagen = document.createElement("img")
                                                         const precio = document.createElement("p")  
                                                         titulo.innerText = el.nombre
                                                         imagen.src = el.imagen
                                                         precio.innerText = "$ "+el.precio 
                                                         info.append(titulo, imagen, precio)
                                                         const cantidadContainer = document.createElement("div")
                                                         const botonMas= document.createElement("button")
                                                         const botonMenos= document.createElement("button")
                                                         const cantidad = document.createElement("p")
                                                         botonMas.innerText = "+"
                                                         botonMenos.innerText = "-"
                                                         cantidad.innerText = el.cantidad
                                                         cantidadContainer.append(botonMas, cantidad, botonMenos)
                                                         container.appendChild(info)
                                                         container.appendChild(cantidadContainer)
        
                                                         botonMas.addEventListener("click", ()=>{
                                                                                                 const index =Carrito.findIndex(prod=> prod.id==el.id)
                                                                                                 Carrito[index].cantidad +=1
                                                                                                 actualizadoraDeCarrito()
                                                                                                 })

                                                         botonMenos.addEventListener("click", ()=>{
                                                                                                  const index = Carrito.findIndex(prod => prod.id == el.id)
                                                                                                  if(Carrito[index].cantidad==1){
                                                                                                  Carrito.splice (index,1)
                                                                                                  }else{
                                                                                                       Carrito[index].cantidad -=1
                                                                                                       }
                                                                                                  actualizadoraDeCarrito()
                                                                                                  })

                                                         CarritoACT.appendChild(container)
                                                         }) 
                                    }


const funcionQueCreaCards = (arrayDatas)=>{
                                          arrayDatas.forEach(el=>{
                                                                 const contenedor = document.createElement("div")
                                                                 contenedor.classList.add("producto")
                                                                 const titulo= document.createElement("h2")
                                                                 const imagen = document.createElement ("img")
                                                                 const containerDesc = document.createElement ("div")
                                                                 const desc = document.createElement ("p")
                                                                 const precio = document.createElement("p")
                                                                 const botonDeCompra= document.createElement("button")
                                                                 containerDesc.appendChild(desc)
                                                                 titulo.innerText = el.nombre
                                                                 imagen.src = el.imagen
                                                                 desc.innerText = el.desc
                                                                 precio.innerText = "$" + el.precio
                                                                 botonDeCompra.innerText ="Compra"
                                                                 contenedor.append(titulo, imagen, containerDesc, precio, botonDeCompra)

                                                                 botonDeCompra.addEventListener("click", ()=>{
                                                                                                             const index =Carrito.findIndex (prod => prod.id == el.id)
                                                                                                             if(index==-1){
                                                                                                                          Carrito.push({
                                                                                                                                       nombre:el.nombre,
                                                                                                                                       imagen:el.imagen,
                                                                                                                                       precio:el.precio,
                                                                                                                                       id:el.id,
                                                                                                                                       cantidad:1                
                                                                                                                                       })
                                                                                                                           }else{
                                                                                                                                Carrito[index].cantidad +=1
                                                                                                                                }
                                                                                                              Swal.fire({
                                                                                                                        title: "¿Deseas agregarlo a tu compra?",
                                                                                                                        showDenyButton: true,
                                                                                                                        confirmButtonText: "Agregar",
                                                                                                                        denyButtonText: `Cancelar`
                                                                                                                        }).then((result) => {
                                                                                                                                             if (result.isConfirmed){
                                                                                                                                                                   Swal.fire("Lo ingresaste a tu compra", "", "success");
                                                                                                                                                                   actualizadoraDeCarrito()
                                                                                                                                                                   } else if (result.isDenied){
                                                                                                                                                                                             Swal.fire("¿Deseas cancelar la compra?", "", "question");
                                                                                                                                                                                             }
                                                                                                                                            });
                                                                                                             })
                                                                 Smartphone.appendChild(contenedor)
                                                                })
                                            }

const llamadoraData = async ()=> {
                                 const response = await fetch ("./data.json")
                                 const arrayProductos = await response.json()
                                 return arrayProductos
                                 }

document.addEventListener("DOMContentLoaded", async()=>{
                                                       const arrayData = await llamadoraData()
                                                       funcionQueCreaCards(arrayData) 
                                                       actualizadoraDeCarrito ()
                                                       })